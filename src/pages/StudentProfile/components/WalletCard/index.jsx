import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Box, Divider, Modal, Radio, Popover, MenuItem, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import LinkIcon from '@mui/icons-material/Link';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MomoIcon from '../../../../assets/images/Logo MoMo.svg';
import { BsPlusCircle } from 'react-icons/bs';
import { PaymentMethodControllerApi, WalletControllerApi } from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaypalIcon from '../../../../assets/images/paypal-icon.png';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Swal from 'sweetalert2';

const walletApi = new WalletControllerApi(ApiClientSingleton.getInstance());
const paymentMet = new PaymentMethodControllerApi(ApiClientSingleton.getInstance());

function WalletCard({ wallet, onAddWallet, user }) {
  const [isOpenModal, setOpenModal] = useState(false);
  const [radioSelected, setRadioSelected] = useState(false);
  const [openPop, setOpenPop] = useState(null);

  const handleRemovePaypal = () => {
    Swal.fire({
      title: 'Gỡ tài khoản liên kết',
      text: 'Bạn muốn gỡ tài khoản liên kết?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      confirmButtonText: 'Xác nhận',
    }).then((result) => {
      if (result.isConfirmed) {
        paymentMet.deletePaymentMethod(wallet?.id, (err, res) => {
          if (res) {
            Swal.fire({
              title: 'Gỡ tài khoản liên kết',
              text: 'Tài khoản liên kết đã được gỡ.',
              icon: 'success',
              confirmButtonText: 'Xác nhận',
            });
          }
        });
      }
    });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenPop = (event) => {
    setOpenPop(event.currentTarget);
  };

  const handleClosePop = () => {
    setOpenPop(null);
  };

  return (
    <>
      <Card
        className="p-2"
        sx={{
          borderRadius: '20px',
          maxWidth: '100%',
          maxHeight: 'max-content',
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
        }}
      >
        <CardContent>
          {!wallet?.id ? (
            <div style={{ height: '100%' }} onClick={handleOpenModal}>
              <div className="row px-4 justify-content-center align-items-center" style={{ height: '100%' }}>
                <BsPlusCircle style={{ fontSize: 80, cursor: 'pointer' }} />
              </div>
              <div style={{ position: 'absolute', top: 16 }}>Tài khoản liên kết</div>
            </div>
          ) : (
            <>
              <div className="row">
                <div className="d-flex col-10">
                  <div className="rounded-circle p-2">
                    <img src={PaypalIcon} className="p-1 mx-1" style={{ width: 30, height: 30 }} alt="" />
                  </div>
                  <div className=" p-2">
                    <Typography style={{ fontSize: 18, fontWeight: 700, textAlign: 'left', color: '#212b36' }}>
                      Tài khoản liên kết
                    </Typography>
                  </div>
                </div>
                <div className="col-1 text-end">
                  {/* <button
                    className="btn p-2"
                    style={{ padding: 0, border: 0, borderRadius: '50%', minWidth: '50', color: '#637381' }}
                    onClick={(e) => handleOpenPop(e)}
                  >
                    <MoreVertRoundedIcon />
                  </button> */}

                  {/* <IconButton onClick={(e) => handleOpenPop(e)}>
                    <MoreVertRoundedIcon />
                  </IconButton> */}
                </div>
              </div>
              <div className="d-flex my-2">
                <Typography className="pt-1" style={{ fontWeight: 700, color: '#212b36' }}>
                  PAYPAL ID:
                </Typography>
              </div>
              <div className="my-2">
                {wallet?.bankNumber ? (
                  <Typography style={{ fontWeight: 700 }}>{wallet?.bankNumber}</Typography>
                ) : (
                  <Typography style={{ fontWeight: 700, color: 'grey' }}>Chưa có tài khoản liên kết</Typography>
                )}
              </div>
              {/* <div className="row px-4">
                <div className="col-8">
                  <div className="row">Tài khoản liên kết</div>
                  <div className="row">
                    <div className="col-6">Phương thức: </div>
                    <div className="col-6">{wallet.walletType}</div>
                  </div>
                  <div className="row">
                    <div className="col-6">Số tài khoản: </div>
                    <div className="col-6">{wallet.bankNumber}</div>
                  </div>
                  <div className="row">
                    <div className="col-6">Họ và tên: </div>
                    <div className="col-6">{user?.name}</div>
                  </div>
                </div>
              </div> */}
            </>
          )}
        </CardContent>
        <Popover
          className="p-1"
          open={!!openPop}
          anchorEl={openPop}
          onClose={handleClosePop}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              width: 180,
              borderRadius: '15px',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px',
            },
          }}
        >
          <div className="p-2">
            <MenuItem onClick={() => handleRemovePaypal()} style={{ borderRadius: '10px' }}>
              <div style={{ color: '#c25d5a' }} className="d-flex p-1">
                <RemoveCircleOutlineRoundedIcon />
                <Typography className="mx-2" style={{ fontWeight: 600 }}>
                  Gỡ tài khoản
                </Typography>
              </div>
            </MenuItem>
          </div>
        </Popover>

        <Modal open={isOpenModal} onClose={handleCloseModal}>
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
            <Typography style={{ marginBottom: '16px' }} variant="h5" gutterBottom>
              Chọn ví liên kết
            </Typography>
            <div className="d-flex">
              <Radio
                checked={radioSelected}
                onChange={() => setRadioSelected(!radioSelected)}
                value={radioSelected}
                name="radio-buttons"
              />
              <img src={PaypalIcon} alt="paypal logo" className="mx-2" style={{ width: '18rem', height: '5rem' }} />
            </div>
            <div className="text-end">
              <button
                className="btn btn-outline-primary mt-3"
                onClick={() => {
                  if (onAddWallet !== undefined) {
                    onAddWallet();
                  }
                }}
              >
                Liên kết
              </button>
            </div>
          </Box>
        </Modal>
      </Card>
    </>
  );
}

export default WalletCard;
