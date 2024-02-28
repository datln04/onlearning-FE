import Footer from '../../components/Landing/Footer/Footer';
import Header from '../../components/Landing/Header/Header';
import CardProfile from './components/CardProfile';
import WalletCard from './components/WalletCard';
import BalanceInfo from './components/BalanceInfo';
import PropTypes from 'prop-types';
import TableTransactions from './components/TableTransactions';
import Cookies from 'js-cookie';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  styled,
  Tabs,
  Tab,
  Card,
  Paper,
  Divider,
} from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import {
  PaymentHistoryControllerApi,
  ProfileControllerApi,
  TransactionControllerApi,
  WalletControllerApi,
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import { toast, ToastContainer } from 'react-toastify';
import TableTransactionsEnroll from './components/TableTransactionsEnroll';
import PaginatePaymentTransaction from './components/PaginatePaymentTransaction';
import PaginateTransaction from './components/PaginateTransaction';
import CustomBreadcrumbs from '../../components/Breadcrumbs';
import moment from 'moment/moment';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import WalletIcon from '@mui/icons-material/Wallet';
import SecurityCard from '../../components/Account/SecurityCard';
import TopBox from '../../components/Dashboard/TopBox/TopBox';

const FilterContext = createContext(null);

const paymentHisApi = new PaymentHistoryControllerApi(ApiClientSingleton.getInstance());
const walletApi = new WalletControllerApi(ApiClientSingleton.getInstance());
const transactionApi = new TransactionControllerApi(ApiClientSingleton.getInstance());

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

function StudentProfile() {
  const userTmp = JSON.parse(Cookies.get('user'));
  const [transactions, setTransactions] = useState([]);
  const [transactionsEnroll, setTransactionsEnroll] = useState([]);
  const [wallet, setWallet] = useState();
  const [value, setValue] = useState(0);
  const [isReload, setIsReload] = useState(false);
  const [filterPaymentHis, setFilterPaymentHis] = useState({
    startDate: '',
    endDate: '',
  });
  const [filterHis, setFilterHis] = useState({
    startDate: '',
    endDate: '',
  });
  const breadcrumbItems = [
    {
      url: '/student-home',
      label: 'Trang chủ',
    },
    {
      url: '',
      label: 'Thông tin cá nhân',
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    walletApi.getByAccountId(userTmp?.id, (err, res) => {
      if (res && res.id) {
        setWallet(res);
      }
    });
  }, [isReload]);

  useEffect(() => {
    paymentHisApi.getPaymentHistoryByStudent(
      {
        studentId: userTmp?.studentId,
        startDate: filterPaymentHis.startDate ? moment(filterPaymentHis.startDate).format('YYYY-MM-DD') : null,
        endDate: filterPaymentHis.endDate ? moment(filterPaymentHis.endDate).format('YYYY-MM-DD') : null,
      },
      (err, res) => {
        if (res) {
          setTransactions(res);
        }
      },
    );
  }, [isReload, filterPaymentHis]);
  useEffect(() => {
    transactionApi.getByStudentId(
      {
        studentId: userTmp?.studentId,
        startDate: filterHis.startDate ? moment(filterHis.startDate).format('YYYY-MM-DD') : null,
        endDate: filterHis.endDate ? moment(filterHis.endDate).format('YYYY-MM-DD') : null,
      },
      (err, res) => {
        if (res) {
          setTransactionsEnroll(res);
        }
      },
    );
  }, [isReload, filterHis]);

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

  const addWallet = () => {
    walletApi.saveWallet(
      {
        amount: 0,
        bankName: 'PayPal',
        accountId: userTmp?.id,
        walletType: 'Student',
      },
      (err, res) => {
        if (res) {
          setIsReload(!isReload);
          notifySuccess('Liên kết thành công !');
        }
        if (err) {
          notifyErorr('Liên kết không thành công !');
        }
      },
    );
  };

  return (
    <>
      <FilterContext.Provider value={{ filterPaymentHis, setFilterPaymentHis, filterHis, setFilterHis }}>
        <ToastContainer />
        <Header />

        <Divider className="mb-2 mt-2" />

        <Box sx={{ width: '100%', paddingInline: 35 }}>
          <CustomBreadcrumbs items={breadcrumbItems} />
          <Box className="px-3 mt-2">
            <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <StyledTab
                icon={<BadgeRoundedIcon />}
                iconPosition="start"
                label="Thông tin"
                {...a11yProps(0)}
              ></StyledTab>
              <StyledTab icon={<WalletIcon />} iconPosition="start" label="Ví tài khoản" {...a11yProps(1)}></StyledTab>

              <StyledTab
                icon={<VpnKeyRoundedIcon />}
                iconPosition="start"
                label="Bảo mật"
                {...a11yProps(2)}
              ></StyledTab>
            </StyledTabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <CardProfile user={userTmp} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            {wallet && (
              <>
                <div className="row">
                  <div className="col-8">
                    <div className="row">
                      <div className="col-6 ">
                        <BalanceInfo user={userTmp} wallet={wallet} setIsReload={setIsReload} isReload={isReload} />
                      </div>
                      <div className="col-6 ">
                        <WalletCard wallet={wallet} onAddWallet={addWallet} isEmpty={true} user={userTmp} />
                      </div>
                    </div>
                    <div className="mt-4">
                      {/* <PaginatePaymentTransaction items={transactions} itemsPerPage={10} /> */}
                      <PaginateTransaction items={transactionsEnroll} itemsPerPage={5} />
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
          <CustomTabPanel value={value} index={2}>
            <div style={{ paddingInline: 100 }}>
              <SecurityCard user={userTmp} />
            </div>
          </CustomTabPanel>

          {/* <div className="row gap-4">
              <div className="row">
                <div className="col-12 flex-shrink-1">
                  <CardProfile user={userTmp} />
                </div>
                <div className="col-5 ">
                  {wallet ? (
                    <BalanceInfo user={userTmp} wallet={wallet} setIsReload={setIsReload} isReload={isReload} />
                  ) : (
                    <WalletCard onAddWallet={addWallet} isEmpty={true} user={userTmp} />
                  )}
                </div>
              </div>
              <div className="row">
                <PaginatePaymentTransaction items={transactions} itemsPerPage={10} />
              </div>
              <div className="row">
                <PaginateTransaction items={transactionsEnroll} itemsPerPage={10} />
              </div>
            </div> */}
        </Box>
        <Footer />
      </FilterContext.Provider>
    </>
  );
}
export { FilterContext };

export default StudentProfile;
