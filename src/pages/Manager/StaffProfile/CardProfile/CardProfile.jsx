import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import {
  Divider,
  Button,
  Modal,
  Box,
  TextField,
  CardActions,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import moment from 'moment/moment';
// import './profile.css';
import { AccountControllerApi, ProfileControllerApi } from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import { set } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'reactstrap';
import CoverImg from '../../../../assets/images/profile-cover.jpg';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../../../util/firebase';
import { fetchData } from '../../../../services/AppService';
import Cookies from 'js-cookie';

const profileApi = new ProfileControllerApi(ApiClientSingleton.getInstance());
const accountApi = new AccountControllerApi(ApiClientSingleton.getInstance());
function CardProfile({ user }) {
  const [isModalChangePass, setIsModalChangePass] = useState(false);
  const [isModalChangeInfo, setIsModalChangeInfo] = useState(false);
  const [isReloadInfo, setIsReloadInfo] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [profile, setProfile] = useState();
  const [info, setInfo] = useState();
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState();
  const [changePass, setChangePass] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const handleCloseModalChangePass = () => {
    setIsModalChangePass(false);
    setChangePass({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleChangeAvatar = (file) => {
    console.log(file);
    setAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleSaveAvatar = async () => {
    const storageRef = ref(storage, `/elearning/text/${avatar.name}`);

    const uploadTask = uploadBytesResumable(storageRef, avatar);

    try {
      await uploadTask.on(
        'state_changed',
        (snapshot) => { },
        (error) => {
          console.log('Error', error);
        },
        () => {
          // When the image uploaded, we get it's link.
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const newProfile = {
              ...profile,
              avatar: url,
            };
            setProfile(newProfile);
            profileApi.saveProfile(newProfile, (err, res) => {
              if (res) {
                handleCloseModalChangeInfo();
                setIsReloadInfo(!isReloadInfo);
                notifySuccess('Cập nhật avtar thành công');
              } else {
                notifyErorr(`Cập nhật avatar không thành công: ${err?.message}`);
              }
            });
          });
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModalChangeInfo = () => {
    setIsModalChangeInfo(false);
  };
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

  useEffect(() => {
    setAvatar(null);
    const token = Cookies.get('token');
    const user = JSON.parse(Cookies.get('user'));
    if (token && user) {
      fetchData(`/account/profile?account-id=${user?.id}`, token)
        .then((resp) => {
          if (resp) {
            setInfo(resp);
            console.log(resp);
            setProfile({
              id: resp?.responseObject?.profile?.id,
              avatar: resp?.responseObject?.profile?.avatar,
              phone: resp?.responseObject?.profile?.phone,
              firstName: resp?.responseObject?.profile?.firstName,
              lastName: resp?.responseObject?.profile?.lastName,
              email: resp?.responseObject?.profile?.email,
              description: resp?.responseObject?.profile?.description,
              address: resp?.responseObject?.profile?.address,
              dateOfBirth: resp?.responseObject?.profile?.dateOfBirth,
              status: resp?.responseObject?.profile?.status,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isReloadInfo]);
  const validatePassword = () => {
    return changePass.newPassword === changePass.confirmPassword;
  };
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-4">
            <Card
              className="p-3"
              sx={{
                borderRadius: '20px',
                maxWidth: '100%',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
              }}
            >
              <ToastContainer />
              <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <div className="p-5">
                  <div className="d-flex justify-content-center p-2">
                    <div style={{ border: '1px dashed rgba(145, 158, 171, 0.46)' }} className="p-2  rounded-circle">
                      <Avatar
                        sx={{ width: 130, height: 130, backgroundColor: '#D7DBFF' }}
                        alt={info?.responseObject?.profile?.firstName}
                        src={info?.responseObject?.profile?.avatar}
                      />
                    </div>
                  </div>
                  <Typography style={{ fontWeight: 700, textAlign: 'center' }}>
                    @{info?.responseObject?.username}
                  </Typography>
                </div>
                <Typography style={{ fontWeight: 700, color: 'grey', textAlign: 'center' }}>
                  {info?.responseObject?.role === "ADMIN" ? 'QUẢN TRỊ VIÊN' : 'QUẢN LÝ'}
                </Typography>
              </CardContent>

              <CardActions className="d-flex justify-content-center mb-3">
                <button
                  style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
                  className="btn px-3 "
                  onClick={() => setIsModalChangeInfo(true)}
                >
                  Đổi ảnh đại diện
                </button>
              </CardActions>
            </Card>
          </div>

          <div className="col-8">
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
                <FormControl>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="last_name">
                    Họ
                  </Typography>
                  <OutlinedInput
                    id="last_name"
                    value={profile?.lastName}
                    onChange={(e) => {
                      const newProfile = {
                        ...profile,
                        lastName: e.target.value,
                      };
                      setProfile(newProfile);
                      setIsChange(true);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="first_name">
                    Tên
                  </Typography>
                  <OutlinedInput
                    id="first_name"
                    value={profile?.firstName}
                    onChange={(e) => {
                      const newProfile = {
                        ...profile,
                        firstName: e.target.value,
                      };
                      setProfile(newProfile);
                      setIsChange(true);
                    }}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="email">
                    Email
                  </Typography>
                  <OutlinedInput
                    id="email"
                    value={profile?.email}
                    onChange={(e) => {
                      const newProfile = {
                        ...profile,
                        email: e.target.value,
                      };
                      setProfile(newProfile);
                      setIsChange(true);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="phone">
                    Số điện thoại
                  </Typography>
                  <OutlinedInput
                    id="phone"
                    value={profile?.phone}
                    onChange={(e) => {
                      const newProfile = {
                        ...profile,
                        phone: e.target.value,
                      };
                      setProfile(newProfile);
                      setIsChange(true);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="address">
                    Địa chỉ
                  </Typography>
                  <OutlinedInput
                    id="address"
                    value={profile?.address}
                    onChange={(e) => {
                      const newProfile = {
                        ...profile,
                        address: e.target.value,
                      };
                      setProfile(newProfile);
                      setIsChange(true);
                    }}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="description">
                    Mô tả
                  </Typography>
                  <OutlinedInput
                    id="description"
                    minRows={3}
                    multiline
                    value={profile?.description}
                    onChange={(e) => {
                      const newProfile = {
                        ...profile,
                        description: e.target.value,
                      };
                      setProfile(newProfile);
                      setIsChange(true);
                    }}
                  />
                </FormControl>
              </CardContent>
              <div className="d-flex justify-content-end px-2">
                <CardActions>
                  <button
                    disabled={!isChange}
                    style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
                    className="btn px-3"
                    onClick={() => {
                      profileApi.saveProfile(profile, (err, res) => {
                        if (res) {
                          handleCloseModalChangeInfo();
                          setIsReloadInfo(!isReloadInfo);
                          notifySuccess('Cập nhật thông tin thành công');
                        } else {
                          notifyErorr(`Cập nhật thông tin không thành công: ${err?.message}`);
                        }
                      });
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
      <Modal open={isModalChangeInfo} onClose={handleCloseModalChangeInfo}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Typography className="text-center" variant="h5" gutterBottom>
            Cập nhật ảnh đại diện
          </Typography>

          <div className="d-flex justify-content-center ">
            <Avatar
              sx={{ width: 300, height: 300, backgroundColor: '#D7DBFF' }}
              alt="Avatar"
              src={previewAvatar ? previewAvatar : ''}
              onClick={() => document.getElementById('file').click()}
            />
            <input
              id="file"
              style={{ display: 'none' }}
              type="file"
              accept=".png,.jpg"
              onChange={(e) => handleChangeAvatar(e.target.files[0])}
              className="mx-4"
            />
          </div>

          <div className="text-end mt-5">
            <button className="btn btn-outline-secondary px-3 mx-2" onClick={handleCloseModalChangeInfo}>
              Hủy
            </button>
            <button
              disabled={!avatar}
              style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
              className="btn px-3"
              onClick={() => handleSaveAvatar()}
            >
              Lưu
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default CardProfile;
