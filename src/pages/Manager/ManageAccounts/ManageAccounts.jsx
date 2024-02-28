import { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Popover,
  MenuItem,
  Avatar,
  InputLabel,
  Select,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';
import moment from 'moment/moment';
import AccountModal from './AccountModal';
import AccountAdminModal from './CreateAdminModal';
import AccountManagerModal from './CreateManagerModal';
import AccountDetailModal from './AccountDetail';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID } from '../../../util/Constants';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export default function ListAccount() {
  const [data, setData] = useState([]);
  const [dataSubmit, setDataSubmit] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [statusSelect, setStatusSelect] = useState('none');
  const [roleSelect, setRoleSelect] = useState('none');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState({
    teacher: false,
    admin: false,
    manager: false,
  });
  const [isAccountDetailModalOpen, setIsAccountDetailModalOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);
  const [openPop, setOpenPop] = useState(null);
  const [accountTmp, setAccountTmp] = useState([]);
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/accounts`,
      label: `Danh sách tài khoản`,
    },
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData('/account/accounts', token).then((resp) => {
          if (resp) {
            setData(resp);

            setDataSubmit(resp);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleOpenPop = (account, event) => {
    setOpenPop(event.currentTarget);
    setAccountTmp(account);
  };

  const handleClosePop = () => {
    setOpenPop(null);
  };

  const handleAddAccount = (role) => {
    setAccountToEdit(null); // Clear any previous account data (for editing)
    switch (role) {
      case "teacher": setIsAccountModalOpen({ admin: false, manager: false, teacher: true })
        break;
      case "admin": setIsAccountModalOpen({ teacher: false, manager: false, admin: true })
        break;
      case "manager": setIsAccountModalOpen({ teacher: false, admin: false, manager: true })
        break;
    }
  };

  const handleAccountModalClose = (role) => {
    setIsAccountModalOpen({ teacher: false, admin: false, manager: false });
  };

  const handleViewDetail = (accountData) => {
    console.log(accountData);
    setAccountToEdit(accountData);
    setIsAccountDetailModalOpen(true);
  };

  const handleAccountDetailModalClose = () => {
    setIsAccountDetailModalOpen(false);
  };


  // Enable/Disable Account
  const handleEnable = (account) => {
    handleClosePop();
    const token = Cookies.get('token');
    if (token) {
      Swal.fire({
        title: 'Bạn có chắc muốn kích hoạt tài khoản ' + account.username + '?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: `Hủy`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let res = await fetchData('/account/enable?account_id=' + account.id, token);
          if (res) {
            const templateParams = {
              from_email: 'onlearn@gmail.com',
              to_name: account.profile.firstName,
              to_email: account.profile.email,
              user_name: 'Onlearn',
              message: 'Tài khoản của bạn đã được kích hoạt lại.\n Chúng tôi rất vui vì có sự tham gia của bạn.',
            };

            emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_USER_ID).then(
              (result) => {
                Swal.fire({
                  title: 'Chúc mừng',
                  text: 'Thông tin khóa tài khoản đã được gửi email',
                  icon: 'success',
                }).then((result) => {
                  window.location.reload();
                });
              },
              (error) => {
                console.log('Gửi mail thất bại.', error.text);
              },
            );
          }
          // Swal.fire("Saved!", "", "success");
        }
      });
    }
  };

  const handleDisable = (account) => {
    handleClosePop();
    const token = Cookies.get('token');
    if (token) {
      Swal.fire({
        title: 'Bạn có chắc muốn vô hiệu hóa tài khoản ' + account.username + '?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: `Hủy`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let res = await fetchData('/account/disable?account_id=' + account.id, token);
          if (res) {
            Swal.fire({
              title: 'Thành công!',
              text: 'Đã vô hiệu hoá thành công',
              icon: 'success',
              footer: '<a href="#">Tại sao tôi gặp vấn đề này?</a>',
            }).then((result) => {
              const templateParams = {
                from_email: 'onlearn@gmail.com',
                to_name: account.profile.firstName,
                to_email: account.profile.email,
                user_name: 'Onlearn',
                message: 'Tài khoản của bạn hiện đã bị khóa vì một số lý do. ',
              };

              emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_USER_ID).then(
                (result) => {
                  Swal.fire({
                    title: 'Chúc mừng',
                    text: 'Thông tin khóa tài khoản đã được gửi email',
                    icon: 'success',
                  }).then((result) => {
                    window.location.reload();
                  });
                },
                (error) => {
                  console.log('Gửi mail thất bại.', error.text);
                },
              );
            });
          }
        }
      });
    }
  };

  // Search
  const filterData = dataSubmit.filter(
    (account) =>
      account.profile.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
      account.profile.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      account.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      account.profile.email.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // State to keep track of the current page and the number of rows per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Change the number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSubmit.length) : 0;
  return (
    data && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row mb-3">
          <div className="col-5">
            <h4 style={{ fontWeight: 'bold' }}>Danh sách tài khoản</h4>
            <CustomBreadcrumbs items={breadcrumbItems} />
          </div>
          <div className="text-end col-3">
            <Button
              variant="outlined"
              style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
              onClick={() => handleAddAccount("admin")}
            >
              Thêm quản trị viên
            </Button>
          </div>
          <div className="text-end col-2">
            <Button
              variant="outlined"
              style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
              onClick={() => handleAddAccount("manager")}
            >
              Thêm quản lý
            </Button>
          </div>
          <div className="text-end col-2">
            <Button
              variant="outlined"
              style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
              onClick={() => handleAddAccount("teacher")}
            >
              Thêm giáo viên
            </Button>
          </div>
        </div>

        <Paper
          sx={{
            padding: '20px',
            borderRadius: '20px',
            maxHeight: 'max-content',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          <div className="d-flex" style={{ marginTop: '20px' }}>
            <div className="rounded pt-3 p-2" style={{ backgroundColor: '#f4f6f8' }}>
              <InputBase
                placeholder="Tìm kiếm"
                style={{ marginInline: '10px' }}
                startAdornment={<Search />}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setPage(0);
                }}
              />
            </div>

            <div className="rounded p-2" style={{ marginLeft: '0.5rem', backgroundColor: '#f4f6f8' }}>
              <InputLabel
                style={{ fontWeight: 700, backgroundColor: '#f4f6f8', fontSize: '0.7rem' }}
                id="account-status-select-label"
              >
                Trạng thái
              </InputLabel>
              <Select
                style={{ fontWeight: 700, color: '#808d99' }}
                labelId="account-status-select-label"
                label="Status"
                defaultValue={statusSelect}
                onChange={(e, value) => {
                  setStatusSelect(value.props.value);
                  setPage(0);
                  switch (value.props.value) {
                    case 'none':
                      if (roleSelect === 'none') {
                        setDataSubmit(data);
                      } else {
                        setDataSubmit(data.filter((account) => account.role === roleSelect));
                      }
                      break;
                    case 'true':
                      if (roleSelect === 'none') {
                        setDataSubmit(data.filter((account) => account.active === true));
                      } else {
                        setDataSubmit(data.filter((account) => account.active === true && account.role === roleSelect));
                      }
                      break;
                    case 'false':
                      if (roleSelect === 'none') {
                        setDataSubmit(data.filter((account) => account.active === false));
                      } else {
                        setDataSubmit(
                          data.filter((account) => account.active === false && account.role === roleSelect),
                        );
                      }
                      break;
                  }
                }}
              >
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="none">
                  Tất cả
                </MenuItem>
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="true">
                  Đang hoạt động
                </MenuItem>
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="false">
                  Chưa hoạt động
                </MenuItem>
              </Select>
            </div>
            <div className="rounded p-2" style={{ marginLeft: '0.5rem', backgroundColor: '#f4f6f8' }}>
              <InputLabel
                style={{ fontWeight: 700, backgroundColor: '#f4f6f8', fontSize: '0.7rem' }}
                id="account-role-select-label"
              >
                Vai trò
              </InputLabel>
              <Select
                style={{ fontWeight: 700, color: '#808d99' }}
                labelId="account-role-select-label"
                defaultValue={roleSelect}
                onChange={(e, value) => {
                  setRoleSelect(value.props.value);
                  setPage(0);
                  switch (value.props.value) {
                    case 'none':
                      if (statusSelect === 'none') {
                        setDataSubmit(data);
                      } else {
                        switch (statusSelect) {
                          case 'true':
                            setDataSubmit(data.filter((account) => account.active === true));
                            break;
                          case 'false':
                            setDataSubmit(data.filter((account) => account.active === false));
                            break;
                        }
                      }
                      break;
                    case 'ADMIN':
                      if (statusSelect === 'none') {
                        setDataSubmit(data.filter((account) => account.role === 'ADMIN'));
                      } else {
                        switch (statusSelect) {
                          case 'true':
                            setDataSubmit(
                              data.filter((account) => account.active === true && account.role === 'ADMIN'),
                            );
                            break;
                          case 'false':
                            setDataSubmit(
                              data.filter((account) => account.active === false && account.role === 'ADMIN'),
                            );
                            break;
                        }
                      }
                      break;
                    case 'STAFF':
                      if (statusSelect === 'none') {
                        setDataSubmit(data.filter((account) => account.role === 'STAFF'));
                      } else {
                        switch (statusSelect) {
                          case 'true':
                            setDataSubmit(
                              data.filter((account) => account.active === true && account.role === 'STAFF'),
                            );
                            break;
                          case 'false':
                            setDataSubmit(
                              data.filter((account) => account.active === false && account.role === 'STAFF'),
                            );
                            break;
                        }
                      }
                      break;
                    case 'TEACHER':
                      if (statusSelect === 'none') {
                        setDataSubmit(data.filter((account) => account.role === 'TEACHER'));
                      } else {
                        switch (statusSelect) {
                          case 'true':
                            setDataSubmit(
                              data.filter((account) => account.active === true && account.role === 'TEACHER'),
                            );
                            break;
                          case 'false':
                            setDataSubmit(
                              data.filter((account) => account.active === false && account.role === 'TEACHER'),
                            );
                            break;
                        }
                      }
                      break;
                    case 'STUDENT':
                      if (statusSelect === 'none') {
                        setDataSubmit(data.filter((account) => account.role === 'STUDENT'));
                      } else {
                        switch (statusSelect) {
                          case 'true':
                            setDataSubmit(
                              data.filter((account) => account.active === true && account.role === 'STUDENT'),
                            );
                            break;
                          case 'false':
                            setDataSubmit(
                              data.filter((account) => account.active === false && account.role === 'STUDENT'),
                            );
                            break;
                        }
                      }
                      break;
                  }
                }}
              >
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="none">
                  Tất cả
                </MenuItem>
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="ADMIN">
                  Quản trị viên
                </MenuItem>
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="STAFF">
                  Quản lý
                </MenuItem>
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="TEACHER">
                  Giảng viên
                </MenuItem>
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="STUDENT">
                  Học viên
                </MenuItem>
              </Select>
            </div>
          </div>

          <Table style={{ marginTop: '20px' }}>
            <TableHead style={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                <TableCell width={'5%'} style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }} width={'10%'}>
                  Tên tài khoản
                </TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Họ và Tên</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Vai trò</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Ngày tạo</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Email</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Trạng thái</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
                {/* <TableCell>Hành động</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((a, index) => {
                return (
                  <TableRow hover={true} key={index}>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      {index + (page * rowsPerPage, page * rowsPerPage) + 1}
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      <Avatar src={a?.profile?.avatar} />
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{a.username}</TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      {a.profile.lastName} {a.profile.firstName}
                    </TableCell>
                    <TableCell width={'11%'} style={{ fontWeight: 600, color: '#686f77' }}>
                      {a.role === 'STUDENT' ? (
                        <div
                          className="p-2 text-center"
                          style={{ backgroundColor: '#b5d8f4', color: '#1e7cc9', borderRadius: 10, fontWeight: 700 }}
                        >
                          HỌC VIÊN
                        </div>
                      ) : a.role === 'TEACHER' ? (
                        <div
                          className="p-2 text-center"
                          style={{ backgroundColor: '#ffebce', color: '#ff9800', borderRadius: 10, fontWeight: 700 }}
                        >
                          GIẢNG VIÊN
                        </div>
                      ) : a.role === 'ADMIN' ? (
                        <div
                          className="p-2 text-center"
                          style={{ backgroundColor: '#deb3e5', color: '#9c27b0', borderRadius: 10, fontWeight: 700 }}
                        >
                          QUẢN TRỊ VIÊN
                        </div>
                      ) : (
                        <div
                          className="p-2 text-center"
                          style={{ backgroundColor: '#dbf6e5', color: '#2a9a68', borderRadius: 10, fontWeight: 700 }}
                        >
                          QUẢN LÝ
                        </div>
                      )}
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      {moment(a.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{a.profile.email}</TableCell>
                    <TableCell width="11%">
                      {a.active ? (
                        <div
                          className="p-2 text-center"
                          style={{ backgroundColor: '#dbf6e5', color: '#2a9a68', borderRadius: 10, fontWeight: 700 }}
                        >
                          Đang hoạt động
                        </div>
                      ) : (
                        <div
                          className="p-2 text-center"
                          style={{ backgroundColor: '#ffe4de', color: '#c64843', borderRadius: 10, fontWeight: 700 }}
                        >
                          Chưa kích hoạt
                        </div>
                      )}
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      <div>
                        <button
                          className="btn"
                          style={{ marginLeft: '10px', color: '#637381', border: 0 }}
                          onClick={() => handleViewDetail(a)}
                        >
                          <VisibilityRoundedIcon />
                        </button>

                        <button
                          className="btn p-2"
                          style={{ padding: 0, border: 0, borderRadius: '50%', minWidth: '50', color: '#637381' }}
                          onClick={(e) => handleOpenPop(a, e)}
                        >
                          <MoreVertRoundedIcon />
                        </button>

                        <Popover
                          className="p-1"
                          open={!!openPop}
                          anchorEl={openPop}
                          onClose={handleClosePop}
                          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          PaperProps={{
                            sx: {
                              border: 0,
                              width: 180,
                              borderRadius: '15px',
                              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px',
                            },
                          }}
                        >
                          <div className="p-2">
                            {accountTmp.role !== 'ADMIN' ? (
                              !accountTmp.active ? (
                                <>
                                  <MenuItem onClick={() => handleEnable(accountTmp)} style={{ borderRadius: '10px' }}>
                                    <div style={{ color: '#58af86' }} className="d-flex p-1">
                                      <CheckCircleOutlineIcon />
                                      <Typography className="mx-2" style={{ fontWeight: 600 }}>
                                        Kích hoạt
                                      </Typography>
                                    </div>
                                  </MenuItem>
                                </>
                              ) : (
                                <>
                                  <MenuItem onClick={() => handleDisable(accountTmp)} style={{ borderRadius: '10px' }}>
                                    <div style={{ color: '#c25d5a' }} className="d-flex p-1">
                                      <DoNotDisturbAltIcon />
                                      <Typography className="mx-2" style={{ fontWeight: 600 }}>
                                        Vô hiệu hoá
                                      </Typography>
                                    </div>
                                  </MenuItem>
                                </>
                              )
                            ) : (
                              <>
                                <MenuItem disabled style={{ borderRadius: '10px' }}>
                                  <div style={{ color: '#c25d5a' }} className="d-flex p-1">
                                    <DoNotDisturbAltIcon />
                                    <Typography className="mx-2" style={{ fontWeight: 600 }}>
                                      Vô hiệu hoá
                                    </Typography>
                                  </div>
                                </MenuItem>
                              </>
                            )}
                          </div>
                        </Popover>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'Tất cả', value: -1 }]}
            component="div"
            count={filterData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Số hàng trên trang :"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* </div> */}
        <AccountModal
          isOpen={isAccountModalOpen.teacher}
          onClose={handleAccountModalClose}
        />
        <AccountAdminModal
          isOpen={isAccountModalOpen.admin}
          onClose={handleAccountModalClose}
        />
        <AccountManagerModal
          isOpen={isAccountModalOpen.manager}
          onClose={handleAccountModalClose}
        />
        <AccountDetailModal
          isOpen={isAccountDetailModalOpen}
          onClose={handleAccountDetailModalClose}
          account={accountToEdit !== null ? accountToEdit : null}
        />
      </div>
    )
  );
}
