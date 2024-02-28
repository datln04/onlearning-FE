import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Modal, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { postData } from '../../../../services/AppService';
import { PaypalV2ControllerApi } from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import Swal from 'sweetalert2';
import Loading from '../../../../components/Loading/Loading';
import { toast, ToastContainer } from 'react-toastify';

const paypalApi = new PaypalV2ControllerApi(ApiClientSingleton.getInstance());
function BalanceInfo({ wallet, user, setIsReload, isReload }) {
  const [loading, setLoading] = useState(false);
  const [isDepositModal, setDepositModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [isWithDraw, setIsWithDraw] = useState(false);

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const notifyError = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleOpenDeposit = () => {
    setIsWithDraw(false);
    setDepositModal(true);
  };

  const handleCloseDeposit = () => {
    setDepositModal(false);
    setPrice(0);
  };

  const handleDeposit = async () => {
    setLoading(true);
    const body = {
      accountId: user.id,
      value: price.toString(),
    };
    paypalApi.createOrders(body, (err, res) => {
      if (res) {
        res?.responseObject?.links?.forEach((element) => {
          if (element?.rel === 'approve') {
            if (setIsReload !== undefined) {
              window.open(element?.href, 'blank');
            }
          }
        });
      }
      setLoading(false);
    });
  };

  const handleWithDraw = async () => {
    const token = Cookies.get('token');
    if (parseFloat(price) <= wallet.amount && parseFloat(price) > 0) {
      if (token) {
        setLoading(true);
        const body = {
          accountId: user.id,
          amountValue: price.toString(),
        };
        await postData('/paypal/payout', body, token)
          .then((resp) => {
            if (resp?.code === 200) {
              if (setIsReload !== undefined) {
                setIsReload(!isReload);
              }
              setIsWithDraw(false);
              setDepositModal(false);
              setPrice(0);
            } else {
              notifyError(resp?.message);
            }
          })
          .finally(() => setLoading(false));
      }
    } else {
      setIsWithDraw(false);
      setDepositModal(false);
      Swal.fire({
        title: 'Warning',
        text: 'Số tiền phải lớn hơn 0 và nhỏ hơn số tiền trong ví',
        icon: 'warning',
      });
    }
  };

  const handleWithdrawOpenModal = () => {
    setIsWithDraw(true);
    setDepositModal(true);
  };

  const isValidNumber = (str) => {
    if (!str) {
      return true;
    }
    return /^\d+(\.\d+)?$/.test(str);
  };
  const validateAmount = (amount) => {
    const number = Number(amount);
    return number >= 250_000 && number <= 10_000_000;
  };

  return loading ? (
    <Loading />
  ) : (
    wallet && wallet.id && (
      <Card
        className="p-2"
        sx={{
          borderRadius: '20px',
          maxWidth: '100%',
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
          background: ' linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <ToastContainer />
        <CardContent>
          <div className="row">
            <div className="col-8 d-flex">
              <div style={{ color: '#3d444a' }} className="rounded-circle p-2">
                <AccountBalanceWalletIcon />
              </div>
              <div className="p-2">
                <Typography style={{ fontSize: 18, fontWeight: 700, textAlign: 'left', color: '#3d444a' }}>
                  Ví tài khoản
                </Typography>
              </div>
            </div>
            <div className="col-4">
              <Typography className="text-end" style={{ fontWeight: 700, color: 'white', opacity: '80%' }}>
                {' '}
                # {wallet?.id}
              </Typography>
            </div>
          </div>
          <div className="d-flex my-2 p-2">
            <Typography style={{ fontSize: 30, fontWeight: 700, textAlign: 'center', color: 'white' }}>
              {wallet?.amount ? wallet.amount.toLocaleString() : 0} VNĐ
            </Typography>
          </div>
          {/* <div className="d-flex my-2 justify-content-end">
            <img src={PaypalIcon} className="p-1 mx-1" style={{ width: 30, height: 30 }} alt="" />
            <Typography style={{ fontWeight: 600, color: 'white', overflow: 'hidden' }}>
              {wallet?.bankNumber}
            </Typography>
          </div> */}

          <div className="row">
            <div className="col-6  justify-content-center align-items-center d-flex">
              <Button
                variant="outline"
                style={{ border: 0, borderRadius: '8px', backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
                onClick={handleOpenDeposit}
              >
                Nạp tiền
              </Button>
            </div>
            <div className="col-6 justify-content-center align-items-center d-flex ">
              <Button
                variant="outline"
                style={{ border: 0, borderRadius: '8px', backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
                onClick={handleWithdrawOpenModal}
              >
                Rút tiền
              </Button>
            </div>
          </div>
        </CardContent>
        <Modal open={isDepositModal} onClose={handleCloseDeposit}>
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
            <Typography variant="h5" gutterBottom>
              {isWithDraw ? 'Nhập số tiền muốn rút' : 'Nhập số tiền muốn nạp'}
            </Typography>
            <TextField
              fullWidth
              label="Số tiền"
              variant="outlined"
              margin="normal"
              name="name"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              error={!isValidNumber(price) || !validateAmount(price)}
              helperText={
                !isValidNumber(price)
                  ? 'Số tiền không hợp lệ'
                  : !validateAmount(price)
                  ? 'Số tiền phải từ 250.000VND đến 10.000.000VND'
                  : ''
              }
            />
            <div className="text-end">
              {isWithDraw ? (
                <button
                  className="btn btn-outline-primary mt-3"
                  onClick={handleWithDraw}
                  disabled={!isValidNumber(price) || !validateAmount(price)}
                >
                  Rút tiền
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary mt-3"
                  onClick={handleDeposit}
                  disabled={!isValidNumber(price) || !validateAmount(price)}
                >
                  Nạp tiền
                </button>
              )}
            </div>
          </Box>
        </Modal>
      </Card>
    )
  );
}

export default BalanceInfo;
