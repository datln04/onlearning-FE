import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Container, Typography, Grid, Box, styled, Tabs, Tab, Card, Paper } from '@mui/material';
import { account } from './../../mock/mock-data';
import Cookies from 'js-cookie';
import CardProfile from '../../pages/StudentProfile/components/CardProfile';
import BalanceInfo from '../../pages/StudentProfile/components/BalanceInfo';
import WalletCard from '../../pages/StudentProfile/components/WalletCard';
import { postData } from '../../services/AppService';
import {
  PaymentHistoryControllerApi,
  TransactionControllerApi,
  WalletControllerApi,
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import WalletIcon from '@mui/icons-material/Wallet';
import SecurityCard from '../Account/SecurityCard';
import TransactionRequestWithDraw from './TransactionRequestWithDraw';
import moment from 'moment';
import TopBox from '../Dashboard/TopBox/TopBox';

const walletApi = new WalletControllerApi(ApiClientSingleton.getInstance());
const transactionApi = new TransactionControllerApi(ApiClientSingleton.getInstance());
const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const StyledTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 80,
    width: '100%',
    backgroundColor: '#212b36',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: '#212b36',
  opacity: '70%',
  '&.Mui-selected': {
    color: '#212b36',
    opacity: '1',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#212b36',
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Profile() {
  const userTmp = JSON.parse(Cookies.get('user'));
  const [wallet, setWallet] = useState();
  const [isReload, setIsReload] = useState(false);
  const [value, setValue] = useState(0);
  const [transactionWithDraw, setTransactionWithDraw] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filterPaymentHis, setFilterPaymentHis] = useState({
    startDate: '',
    endDate: '',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    transactionApi.getTransactionForWithdraw(parseInt(userTmp?.teacherId), (err, res) => {
      if (res) {
        setTransactionWithDraw(res);
      }
    });
    walletApi.getByAccountId(userTmp?.id, (err, res) => {
      if (res && res.id) {
        setWallet(res);
        paymentHisApi.getPaymentHistoryByTeacher(
          {
            teacherId: userTmp?.teacherId,
            startDate: filterPaymentHis.startDate ? moment(filterPaymentHis.startDate).format('YYYY-MM-DD') : null,
            endDate: filterPaymentHis.endDate ? moment(filterPaymentHis.endDate).format('YYYY-MM-DD') : null,
          },
          (err, res) => {
            if (res) {
              setTransactions(res);
            }
          },
        );
      }
    });
  }, [isReload]);

  const handleAddWallet = async () => {
    const token = Cookies.get('token');
    if (token) {
      const body = {
        amount: 0,
        bankNumber: '',
        bankName: '',
        accountId: userTmp.id,
        walletType: 'paypal',
      };
      await postData(`/wallet/save`, body, token).then((resp) => {
        if (resp) {
          window.location.reload();
        }
      });
    }
  };

  return (
    <Box className="px-3" sx={{ width: '100%' }}>
      <Container>
        <Box className="px-3">
          <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <StyledTab icon={<BadgeRoundedIcon />} iconPosition="start" label="Thông tin" {...a11yProps(0)}></StyledTab>

            <StyledTab icon={<VpnKeyRoundedIcon />} iconPosition="start" label="Bảo mật" {...a11yProps(1)}></StyledTab>

            <StyledTab icon={<WalletIcon />} iconPosition="start" label="Ví tài khoản" {...a11yProps(2)}></StyledTab>
          </StyledTabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <CardProfile user={userTmp} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <SecurityCard user={userTmp} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          {wallet && (
            <>
              <div className="row">
                <div className="col-8">
                  <div className="row">
                    <div className="col-6 ">
                      <BalanceInfo user={userTmp} wallet={wallet} setIsReload={setIsReload} isReload={isReload} />
                    </div>
                    <div className="col-6 ">
                      <WalletCard wallet={wallet} onAddWallet={handleAddWallet} isEmpty={true} user={userTmp} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <TransactionRequestWithDraw items={transactionWithDraw} />
                  </div>
                </div>
                <div className="col-4 ">
                  <Paper
                    sx={{
                      '::-webkit-scrollbar': { display: 'none' },
                      overflowY: 'scroll',
                      padding: '20px',
                      borderRadius: '20px',
                      maxHeight: '700px',
                      boxShadow:
                        'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                    }}
                  >
                    <TopBox title={'Lịch sử nạp/rút'} transactions={transactions} />
                  </Paper>
                </div>
              </div>
            </>
          )}
        </CustomTabPanel>
      </Container>
    </Box>
  );
}

export default Profile;
