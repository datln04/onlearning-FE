import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Container, Typography, Grid, Box, styled, Tabs, Tab, Card, Paper } from '@mui/material';
import Cookies from 'js-cookie';
import CardProfile from './CardProfile/CardProfile';
import BalanceInfo from '../../StudentProfile/components/BalanceInfo';
import WalletCard from '../../StudentProfile/components/WalletCard';
import { postData } from '../../../services/AppService';
import {
  PaymentHistoryControllerApi,
  TransactionControllerApi,
  WalletControllerApi,
} from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import WalletIcon from '@mui/icons-material/Wallet';
import SecurityCard from '../../../components/Account/SecurityCard';
import moment from 'moment';

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

function StaffProfile() {
  const userTmp = JSON.parse(Cookies.get('user'));
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="px-3" sx={{ width: '100%' }}>
      <Container>
        <Box className="px-3">
          <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <StyledTab icon={<BadgeRoundedIcon />} iconPosition="start" label="Thông tin" {...a11yProps(0)}></StyledTab>

            <StyledTab icon={<VpnKeyRoundedIcon />} iconPosition="start" label="Bảo mật" {...a11yProps(1)}></StyledTab>
          </StyledTabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <CardProfile user={userTmp} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <SecurityCard user={userTmp} />
        </CustomTabPanel>
      </Container>
    </Box>
  );
}

export default StaffProfile;
