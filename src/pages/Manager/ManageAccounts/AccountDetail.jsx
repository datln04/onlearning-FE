import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardActions,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import { useEffect } from 'react';
import moment from 'moment';
const AccountModal = ({ isOpen, onClose, account }) => {
  const [editedAccount, setEditedAccount] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: '',
    avatar: '',
    phone: '',
    description: '',
    address: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (account) {
      // Populate the form fields if a account is provided for editing
      setEditedAccount({
        username: account.username,
        firstName: account.profile.firstName,
        lastName: account.profile.lastName,
        email: account.profile.email,
        role: account.role,
        status: account.active,
        avatar: account.profile.avatar,
        phone: account.profile.phone,
        description: account.profile.description,
        address: account.profile.address,
        dateOfBirth: account.profile.dateOfBirth,
      });
    }
  }, [account]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
      <div className="d-flex justify-content-sm-between">
        <DialogTitle>Chi tiết tài khoản</DialogTitle>
        <div className="p-4">
          {editedAccount.status ? (
            <Typography style={{ color: '#00CC00', fontWeight: 'bold', float: 'right' }}>Đang hoạt động</Typography>
          ) : (
            <Typography style={{ color: '#FF0000', fontWeight: 'bold', float: 'right' }}>Ngưng hoạt động</Typography>
          )}
        </div>
      </div>
      {/* <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar style={{ height: '55px', width: '55px' }} alt={editedAccount.avatar} src={editedAccount.avatar} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" style={{ mt: '-30px' }}>
              {editedAccount.lastName} {editedAccount.firstName}
            </Typography>
            <Typography variant="caption">{editedAccount.email} </Typography>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </DialogContent>
      <DialogContent dividers>
        <div style={{ fontSize: '1.2rem' }}>
          <Typography variant="inherit">Họ và tên: </Typography>
          <Typography variant="inherit">
            {' '}
            {editedAccount.lastName} {editedAccount.firstName}
          </Typography>{' '}
          <br />
          <Typography variant="inherit">Email: </Typography>
          <Typography variant="inherit">{editedAccount.email}</Typography> <br />
          <Typography variant="inherit">Ngày sinh: </Typography>
          <Typography variant="inherit">{moment(editedAccount.dateOfBirth).format('DD - MM -YYYY')}</Typography> <br />
          <Typography variant="inherit">Điện thoại: </Typography>
          <Typography variant="inherit">{editedAccount.phone}</Typography> <br />
          <Typography variant="inherit">Địa chỉ: </Typography>
          <Typography variant="inherit">{editedAccount.address}</Typography>
        </div>
      </DialogContent> */}

      <DialogContent>
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
              <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <div className="p-5">
                  <div className="d-flex justify-content-center p-2">
                    <div style={{ border: '1px dashed rgba(145, 158, 171, 0.46)' }} className="p-2  rounded-circle">
                      <Avatar
                        sx={{ width: 130, height: 130, backgroundColor: '#D7DBFF' }}
                        alt={editedAccount?.firstName}
                        src={editedAccount?.avatar}
                      />
                    </div>
                  </div>
                  <Typography style={{ fontWeight: 700, textAlign: 'center' }}>@{editedAccount?.username}</Typography>
                </div>
                <Typography style={{ fontWeight: 700, color: 'grey', textAlign: 'center' }}>
                  {(editedAccount?.role == 'STAFF' && 'QUẢN LÝ') ||
                    (editedAccount?.role == 'ADMIN' && 'QUẢN TRỊ VIÊN') ||
                    (editedAccount?.role == 'TEACHER' && 'GIẢNG VIÊN') ||
                    (editedAccount?.role == 'STUDENT' && 'HỌC VIÊN')}
                </Typography>
              </CardContent>

              {/* <CardActions className="d-flex justify-content-center mb-3">
                <button
                  style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
                  className="btn px-3 "
                  // onClick={() => setIsModalChangeInfo(true)}
                >
                  Đổi ảnh đại diện
                </button>
              </CardActions> */}
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
                    defaultValue={editedAccount?.lastName}
                    // onChange={(e) => {
                    //   const newProfile = {
                    //     ...profile,
                    //     lastName: e.target.value,
                    //   };
                    //   setProfile(newProfile);
                    //   setIsChange(true);
                    // }}
                  />
                </FormControl>
                <FormControl>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="first_name">
                    Tên
                  </Typography>
                  <OutlinedInput
                    id="first_name"
                    defaultValue={editedAccount?.firstName}
                    // onChange={(e) => {
                    //   const newProfile = {
                    //     ...profile,
                    //     firstName: e.target.value,
                    //   };
                    //   setProfile(newProfile);
                    //   setIsChange(true);
                    // }}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="email">
                    Email
                  </Typography>
                  <OutlinedInput
                    id="email"
                    defaultValue={editedAccount?.email}
                    // onChange={(e) => {
                    //   const newProfile = {
                    //     ...profile,
                    //     email: e.target.value,
                    //   };
                    //   setProfile(newProfile);
                    //   setIsChange(true);
                    // }}
                  />
                </FormControl>
                <FormControl>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="phone">
                    Số điện thoại
                  </Typography>
                  <OutlinedInput
                    id="phone"
                    defaultValue={editedAccount?.phone}
                    // onChange={(e) => {
                    //   const newProfile = {
                    //     ...profile,
                    //     phone: e.target.value,
                    //   };
                    //   setProfile(newProfile);
                    //   setIsChange(true);
                    // }}
                  />
                </FormControl>
                <FormControl>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="address">
                    Địa chỉ
                  </Typography>
                  <OutlinedInput
                    id="address"
                    defaultValue={editedAccount?.address}
                    // onChange={(e) => {
                    //   const newProfile = {
                    //     ...profile,
                    //     address: e.target.value,
                    //   };
                    //   setProfile(newProfile);
                    //   setIsChange(true);
                    // }}
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
                    defaultValue={editedAccount?.description}
                    // onChange={(e) => {
                    //   const newProfile = {
                    //     ...profile,
                    //     description: e.target.value,
                    //   };
                    //   setProfile(newProfile);
                    //   setIsChange(true);
                    // }}
                  />
                </FormControl>
              </CardContent>
              {/* <div className="d-flex justify-content-end px-2">
                <CardActions>
                  <button
                    // disabled={!isChange}
                    style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
                    className="btn px-3"
                    // onClick={() => {
                    //   profileApi.saveProfile(profile, (err, res) => {
                    //     if (res) {
                    //       handleCloseModalChangeInfo();
                    //       setIsReloadInfo(!isReloadInfo);
                    //       notifySuccess('Cập nhật thông tin thành công');
                    //     } else {
                    //       notifyErorr(`Cập nhật thông tin không thành công: ${err?.message}`);
                    //     }
                    //   });
                    // }}
                  >
                    Lưu
                  </button>
                </CardActions>
              </div> */}
            </Card>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <div style={{ padding: '1rem' }}>
          <button
            onClick={onClose}
            style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
            className="btn px-3"
          >
            Thoát
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AccountModal;
