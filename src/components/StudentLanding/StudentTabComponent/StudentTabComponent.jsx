import React, { useEffect, useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';
import InProcessCourses from '../InProcessCourse/TabCourse';
import { courseAccount, courseData } from '../../../mock/mock-data';
import TabCourse from '../InProcessCourse/TabCourse';
import { CourseControllerApi, EnrollControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const StudentTabComponent = ({ tabId }) => {
  const [value, setValue] = useState(tabId ? tabId : 0);
  const [courses, setCourses] = useState([]);
  const enrollApi = new EnrollControllerApi(ApiClientSingleton.getInstance());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => { }, []);

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            backgroundColor: 'white', // White background
            '& .MuiTab-textColorInherit': {
              color: 'black', // Black text color for all tabs
            },
            '& .Mui-selected': {
              borderBottom: '2px solid blue', // Blue underline for the active tab
              padding: '16px 24px', // Add more padding to the active tab (top and bottom)
            },
          }}
        >
          <Tab style={{ padding: '12px 16px' }} label="Trang chủ" />
          <Tab style={{ padding: '12px 16px' }} label="Đang học" />
          <Tab style={{ padding: '12px 16px' }} label="Hoàn Thành" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* Add your home content here */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabCourse courseAccount={courseAccount} courseData={courseData} type={'đang học'} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabCourse courseAccount={courseAccount} courseData={courseData} type={'đã hoàn thành'} />
      </TabPanel>
    </div>
  );
};

export default StudentTabComponent;
