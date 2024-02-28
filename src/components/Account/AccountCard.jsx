import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  CardContent,
  Avatar,
  Card,
  CardActions,
  FormControl,
  styled,
} from '@mui/material';
import { account } from './../../mock/mock-data';

import CardProfile from '../../pages/StudentProfile/components/CardProfile';
import BalanceInfo from '../../pages/StudentProfile/components/BalanceInfo';
import WalletCard from '../../pages/StudentProfile/components/WalletCard';
import TableTransactions from '../../pages/StudentProfile/components/TableTransactions';
import { Container } from 'reactstrap';
import Cookies from 'js-cookie';

function AccountCard({ user }) {
  const [userTmp, setUserTmp] = useState([]);

  useEffect(() => {
    setUserTmp(JSON.parse(Cookies.get('user')));
  });

  const isUser = () => {
    return userTmp.id === user.id;
  };

  const BlackTextField = styled(TextField)`
    & label.Mui-focused {
      color: black;
    }
    & .MuiOutlinedInput-root {
      border-radius: 8px;
      &.Mui-focused fieldset {
        border-color: #212b36;
        border-radius: 8px;
      }
    }
  `;

  return (
    user && (
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
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                  <div className="p-5">
                    <div className="d-flex justify-content-center p-2">
                      <div style={{ borderStyle: 'dotted' }} className="p-2 border rounded-circle">
                        <Avatar src={user?.avatar} sx={{ width: 130, height: 130, backgroundColor: '#D7DBFF' }} />
                      </div>
                    </div>
                    <Typography style={{ fontWeight: 700, textAlign: 'center' }}>@{user?.username}</Typography>
                  </div>

                  <Typography style={{ fontWeight: 700, color: 'grey', textAlign: 'center' }}>
                    {info?.account?.role}
                    {/* {info?.account?.role === "ADMIN" ? 'QUẢN TRỊ VIÊN' : 'QUẢN LÝ'} */}
                  </Typography>
                </CardContent>
                <CardActions className="d-flex justify-content-center mb-3">
                  <Button
                    style={{ backgroundColor: '#ffe4de', fontWeight: 700, color: '#c4403d', borderRadius: 8 }}
                    variant="filled"
                    disabled={userTmp.id === user.id}
                  >
                    Khoá tài khoản
                  </Button>
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
                  <FormControl sx={{ gridColumn: '1/-1' }}>
                    <BlackTextField disabled id="first_name" label="Họ và tên" defaultValue={user?.name} />
                  </FormControl>
                  <FormControl>
                    <BlackTextField disabled label="Email" id="email" defaultValue={user?.email} />
                  </FormControl>
                  <FormControl>
                    <BlackTextField disabled label="Số điện thoại" id="phone" defaultValue={user?.phone} />
                  </FormControl>
                  <FormControl sx={{ gridColumn: '1/-1' }}>
                    <BlackTextField disabled label="Địa chỉ" id="address" defaultValue={user?.address} />
                  </FormControl>
                  <FormControl sx={{ gridColumn: '1/-1' }}>
                    <BlackTextField
                      label="Mô tả"
                      id="description"
                      minRows={4}
                      multiline
                      disabled
                      defaultValue={user?.description}
                    />
                  </FormControl>
                </CardContent>
                <div className="d-flex justify-content-end px-2">
                  <CardActions>
                    <button
                      className="btn px-3"
                      style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
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

export default AccountCard;
