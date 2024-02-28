import PropTypes from 'prop-types';
import { Box, Tabs, Tab, Typography, styled } from '@mui/material';
import AccountCard from './AccountCard';
import { Container } from 'reactstrap';
import BillingCard from './BillingCard';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import SecurityCard from './SecurityCard';
import React, { useState, useEffect } from 'react';
import { fetchData, postData } from '../../services/AppService';
import Cookies from 'js-cookie';
import { PaymentHistoryControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';

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

export default function AccountTabComponent({ isSecurity, isBilling }) {
  const [value, setValue] = useState(0);
  //data from API
  const [user, setUser] = useState([]);
  const [wallet, setWallet] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setUser(JSON.parse(user));
      const token = Cookies.get('token');
      if (token) {
        fetchData(`/wallet/by-account?account_id=${JSON.parse(user).id}`, token).then((resp) => {
          console.log(resp);
          if (resp) {
            setWallet(resp);
          }
        });
        paymentHisApi.getPaymentHistoryByTeacher(JSON.parse(user).teacherId, (err, res) => {
          if (res) {
            setTransactions(res);
          }
        });
      }
    }
  }, []);

  const handleAddWallet = async () => {
    const token = Cookies.get('token');
    if (token) {
      const body = {
        amount: 0,
        bankNumber: '',
        bankName: '',
        accountId: user.id,
        walletType: 'paypal',
      };
      await postData(`/wallet/save`, body, token).then((resp) => {
        if (resp) {
          window.location.reload();
        }
      });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="px-5" sx={{ width: '100%' }}>
      <Box className="px-3">
        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab icon={<BadgeRoundedIcon />} iconPosition="start" label="General" {...a11yProps(0)}></StyledTab>
          {isSecurity ? (
            <StyledTab icon={<VpnKeyRoundedIcon />} iconPosition="start" label="Security" {...a11yProps(1)}></StyledTab>
          ) : (
            <></>
          )}
          {isBilling ? (
            <StyledTab icon={<ReceiptRoundedIcon />} iconPosition="start" label="Billing" {...a11yProps(2)}></StyledTab>
          ) : (
            <></>
          )}
        </StyledTabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AccountCard user={user} />
      </CustomTabPanel>
      {isSecurity ? (
        <CustomTabPanel value={value} index={1}>
          <SecurityCard user={user} />
        </CustomTabPanel>
      ) : (
        <></>
      )}
      {isBilling ? (
        <CustomTabPanel value={value} index={2}>
          <BillingCard isStudent={true} userId={11} />
        </CustomTabPanel>
      ) : (
        <></>
      )}
    </Box>
  );
}
