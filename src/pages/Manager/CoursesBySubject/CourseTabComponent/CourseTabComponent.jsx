import React, { useState } from 'react';
import CourseTableComponent from '../CourseTableComponent/CourseTableComponent';
import { InputBase, Tab, Tabs, Paper, Divider } from '@mui/material';
import { Search } from '@material-ui/icons';

function CourseTabComponent({ activeCourses, pendingCourses, deActiveCourses }) {
  const [tabValue, setTabValue] = useState(1);
  const [searchText, setSearchText] = useState('');

  // Determine the course array based on the selected tab
  let selectedCourses;
  switch (tabValue) {
    case 0:
      selectedCourses = activeCourses;
      break;
    case 1:
      selectedCourses = pendingCourses;
      break;
    case 2:
      selectedCourses = deActiveCourses;
      break;
    default:
      selectedCourses = pendingCourses;
  }

  // Filter courses based on the search text
  const filteredCourses = selectedCourses.filter((course) =>
    course.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper
      style={{
        padding: '20px',
        borderRadius: '20px',
        maxHeight: 'max-content',
        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
      }}
    >
      <Tabs value={tabValue} onChange={handleTabChange} centered className="d-flex ">
        <Tab className="p-3" label="Đang hoạt động" />
        <Tab className="p-3" label="Chờ xét duyệt" />
        <Tab className="p-3" label="Không hoạt động" />
      </Tabs>

      <Divider />

      <div className="d-flex" style={{ margin: '20px 0' }}>
        <div className=" rounded p-1" style={{ backgroundColor: '#f4f6f8' }}>
          <InputBase
            placeholder="Tìm kiếm..."
            className="search-input"
            startAdornment={<Search />}
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <CourseTableComponent courses={filteredCourses} />
    </Paper>
  );
}

export default CourseTabComponent;
