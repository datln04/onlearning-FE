import React, { useState, useEffect } from 'react';
import {
  TextField,
  CardContent,
  Card,
  CardActions,
  FormControl,
  styled,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../services/AppService';
import {
  AccountControllerApi,
  PaymentHistoryControllerApi,
  ProfileControllerApi,
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { Container } from 'reactstrap';
import Swal from 'sweetalert2';

const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());
const accountApi = new AccountControllerApi(ApiClientSingleton.getInstance());
const profileApi = new ProfileControllerApi(ApiClientSingleton.getInstance());

function SecurityCard({ user }) {
  const [isReloadInfo, setIsReloadInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profile, setProfile] = useState();
  const [isChange, setIsChange] = useState(false);
  const [changePass, setChangePass] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyErorr = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showSuccess = (msg) => {
    Swal.fire({
      title: 'Mật khẩu đã đổi',
      text: msg,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  const showError = (msg) => {
    if (msg == 'Mật khẩu không trùng') {
      Swal.fire({
        title: 'Oops...',
        text: 'Mật khẩu không đúng',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
    Swal.fire({
      title: 'Oops...',
      text: msg,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  };

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    window.location.href = '/';
  };

  const validatePassword = () => {
    return changePass.newPassword === changePass.confirmPassword;
  };
  const isFill = () => {
    if (changePass.oldPassword == '' || changePass.newPassword == '' || changePass.confirmPassword == '') {
      return false;
    }
    return true;
  };

  // const BlackTextField = styled(TextField)`
  //   & label.Mui-focused {
  //     color: black;
  //   }
  //   & .MuiOutlinedInput-root {
  //     border-radius: 8px;
  //     &.Mui-focused fieldset {
  //       border-color: black;
  //       border-radius: 8px;
  //     }
  //   }
  // `;

  return (
    user && (
      <>
        <Container>
          <div className="row">
            <div className="col-12">
              <Card
                className="p-3"
                sx={{
                  borderRadius: '20px',
                  maxHeight: 'max-content',
                  boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                }}
              >
                <CardContent
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                    gap: 1.5,
                  }}
                >
                  <FormControl sx={{ gridColumn: '1/-1' }}>
                    <InputLabel sx={{ fontWeight: 700 }} htmlFor="password">
                      Mật khẩu
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      label="Mật khẩu"
                      className="mb-2"
                      inputProps={{ style: { borderRadius: '20px' } }}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      required
                      value={changePass.oldPassword}
                      onChange={(e) => {
                        const newChange = {
                          ...changePass,
                          oldPassword: e.target.value,
                        };
                        setChangePass(newChange);
                        setIsChange(true);
                      }}
                    />
                  </FormControl>
                  <FormControl sx={{ gridColumn: '1/-1' }}>
                    <InputLabel sx={{ fontWeight: 700 }} htmlFor="new-password">
                      Mật khẩu mới
                    </InputLabel>
                    <OutlinedInput
                      id="new-password"
                      className="mb-2"
                      type={showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            edge="end"
                          >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Mật khẩu mới"
                      name="newPassword"
                      required
                      helperText="Mật khẩu phải có 8 ký tự trở lên"
                      value={changePass.newPassword}
                      onChange={(e) => {
                        const newChange = {
                          ...changePass,
                          newPassword: e.target.value,
                        };
                        setChangePass(newChange);
                        setIsChange(true);
                      }}
                    />
                  </FormControl>
                  <FormControl sx={{ gridColumn: '1/-1' }}>
                    <InputLabel sx={{ fontWeight: 700 }} htmlFor="new-password">
                      Xác nhận mật khẩu
                    </InputLabel>
                    <OutlinedInput
                      className="mb-2"
                      type={showConfirmPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Xác nhân mật khẩu"
                      name="confirmPassword"
                      required
                      value={changePass.confirmPassword}
                      onChange={(e) => {
                        const newChange = {
                          ...changePass,
                          confirmPassword: e.target.value,
                        };
                        setChangePass(newChange);
                        setIsChange(true);
                      }}
                      error={!validatePassword()}
                    />
                    {!validatePassword() ? (
                      <Typography variant="caption" color={'error'}>
                        Mật khẩu xác nhận không trùng khớp.
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </FormControl>
                </CardContent>
                <div className="d-flex justify-content-end px-2">
                  <CardActions>
                    <button
                      className="btn px-3"
                      style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
                      disabled={!validatePassword() && !isFill()}
                      onClick={() => {
                        if (validatePassword()) {
                          console.log('test');
                          Swal.fire({
                            title: 'Đổi mật khẩu',
                            text: 'Bạn có xác nhận đổi mật khẩu không?',
                            icon: 'question',
                            showCancelButton: true,
                            cancelButtonText: 'Huỷ',
                            confirmButtonText: 'OK',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              accountApi.changePassword(
                                {
                                  oldPassword: changePass.oldPassword,
                                  newPassword: changePass.newPassword,
                                },
                                (err, res) => {
                                  if (res?.code === 200) {
                                    console.log('thắng');
                                    showSuccess('Đổi mật khẩu thành công');
                                  } else {
                                    console.log(`thua ${res?.message}`);
                                    showError(res?.message);
                                  }
                                },
                              );
                            }
                          });
                        }
                      }}
                    >
                      Lưu
                    </button>
                  </CardActions>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </>
    )
  );
}

export default SecurityCard;
