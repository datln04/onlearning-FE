import React, { useEffect, useState } from 'react';
import CourseTableComponent from '../CourseTableComponent/CourseTableComponent';
import { InputBase, Tab, Tabs, Paper, Divider, Select, MenuItem, InputLabel } from '@mui/material';
import { Search } from '@material-ui/icons';

function CourseTabComponent({ activeCourses, pendingCourses, deActiveCourses, subject }) {
  const [tabValue, setTabValue] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectData, setSelectData] = useState([]);
  const [item, setItem] = useState("all");

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

  const filteredCourses = selectedCourses.filter((course) =>
    course.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper
      sx={{
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
        <div className=" rounded p-2 col-4" style={{ backgroundColor: '#f4f6f8' }}>
          <InputBase
            placeholder="Tìm kiếm..."
            className="search-input"
            startAdornment={<Search />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
          />
        </div>
        {/* <div className="rounded p-2" style={{ marginLeft: '0.5rem', backgroundColor: '#f4f6f8' }}>
          <InputLabel
            style={{ fontWeight: 700, backgroundColor: '#f4f6f8', fontSize: '0.7rem' }}
            id="subject-select-label"
          >
            Chủ đề
          </InputLabel>
          <Select
            labelId="subject-select-label"
            value={item}
            style={{ fontWeight: 700, color: '#5a6065' }}
            onChange={(e, value) => {
              switch (value.props.value) {
                case 'all':
                  setItem('all');
                  setSelectData(selectedCourses);
                  break;
                default:
                  setItem(value.props.value);
                  setSelectData(selectedCourses.filter((course) => course.subject.id === value.props.value));
              }
            }}
          >
            <MenuItem style={{ fontWeight: 700, color: '#5a6065' }} value={"all"}>
              Tất cả
            </MenuItem>
            {subject?.length > 0 &&
              subject.map((s) => (
                <MenuItem style={{ fontWeight: 700, color: '#5a6065' }} key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
          </Select>
        </div> */}
      </div>
      <CourseTableComponent courses={filteredCourses} />
    </Paper >
  );
}

export default CourseTabComponent;
