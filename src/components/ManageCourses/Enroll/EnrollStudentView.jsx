import {
  Button,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchData } from '../../../services/AppService';
import CustomBreadcrumbs from '../../Breadcrumbs';
import { Search } from '@material-ui/icons';

const EnrollStudentView = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState();
  const [course, setCourse] = useState();
  const [filterDataInfo, setFilterDataInfor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all'); // Default value
  const [searchValue, setSearchValue] = useState('');

  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/manage-course`,
      label: `Quản lý khóa học`,
    },
    {
      url: `/courses/` + courseId,
      label: `Khoá học: ${course?.name}`,
    },
    {
      url: `/enroll-student`,
      label: 'Danh sách đăng ký',
    },
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData(`/course/byId?id=${courseId}`, token).then((resp) => {
        if (resp) {
          setCourse(resp);
        }
      });
      fetchData(`/enroll/byCourseId?course_id=${courseId}`, token).then((resp) => {
        if (resp && resp.length > 0) {
          const enroll = resp.filter((r) => r.status === 'PROCESSING' || r.status === 'DONE');
          setStudents(enroll);
        }
      });
    }
  }, []);

  // State to keep track of the current page and the number of rows per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Change the number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = filterDataInfo
    ? page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filterDataInfo.length)
      : 0
    : page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - students.length)
      : 0;

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    // Refilter the data when status changes
    filterData(event.target.value, searchValue);
  };

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
    // Refilter the data when search input changes
    filterData(selectedStatus, searchInput);
  };

  const filterData = (status, searchInput) => {
    // Filter data based on both status and search input
    const filteredData = students.filter((item) => {
      const statusMatch = status === 'all' || item.status === status;
      const searchMatch =
        searchInput === '' || item.student.account.username.toLowerCase().includes(searchInput.toLowerCase());
      return statusMatch && searchMatch;
    });

    setFilterDataInfor(filteredData);
  };

  return (
    <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
      <div className="row mb-3">
        <div className="col-8">
          <h4 style={{ fontWeight: 'bold' }}>Danh sách học viên đăng ký</h4>
          <CustomBreadcrumbs items={breadcrumbItems} />
        </div>
      </div>
      <Paper
        sx={{
          padding: '20px',
          borderRadius: '20px',
          maxHeight: 'max-content',
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
        }}
      >
        <div style={{ marginTop: '20px' }} className="d-flex align-items-center">
          <div className="rounded p-2" style={{ backgroundColor: '#f4f6f8' }}>
            <InputBase
              placeholder="Tìm kiếm bằng tên"
              style={{ marginLeft: '20px' }}
              startAdornment={<Search />}
              onChange={handleSearchChange}
            />
          </div>
          <Select value={selectedStatus} onChange={handleStatusChange} style={{ marginLeft: '20px' }}>
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="PROCESSING">Đang học</MenuItem>
            <MenuItem value="DONE">Hoàn thành</MenuItem>
            {/* <MenuItem value="Deactive">Không hoạt động</MenuItem> */}
            {/* Add other statuses as menu items */}
          </Select>
        </div>
        <Table style={{ marginTop: '20px' }}>
          <TableHead style={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
              <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tên</TableCell>
              <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Giáo trình</TableCell>
              <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Email</TableCell>
              <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterDataInfo
              ? filterDataInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                return (
                  <>
                    <TableRow key={index}>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        {s.student.account.username}
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.syllabus.name}</TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        {s.student.account.profile.email}
                      </TableCell>
                      <TableCell>
                        {s.status === 'PROCESSING' ? (
                          <div
                            className="p-2 text-center"
                            style={{
                              width: '80%',
                              backgroundColor: '#d6f4f9',
                              color: '#328cb2',
                              borderRadius: 10,
                              fontWeight: 700,
                            }}
                          >
                            Đang học
                          </div>
                        ) : (
                          <div
                            className="p-2 text-center"
                            style={{
                              width: '80%',
                              backgroundColor: '#dbf6e5',
                              color: '#2a9a68',
                              borderRadius: 10,
                              fontWeight: 700,
                            }}
                          >
                            Hoàn thành
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })
              : students &&
              students?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                return (
                  <>
                    <TableRow key={index}>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        {s.student.account.username}
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.syllabus.name}</TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        {s?.student.account.profile.email}
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        {s.status === 'PROCESSING' ? (
                          <div
                            className="p-2 text-center"
                            style={{
                              width: '80%',
                              backgroundColor: '#d6f4f9',
                              color: '#328cb2',
                              borderRadius: 10,
                              fontWeight: 700,
                            }}
                          >
                            Đang học
                          </div>
                        ) : (
                          <div
                            className="p-2 text-center"
                            style={{
                              width: '80%',
                              backgroundColor: '#dbf6e5',
                              color: '#2a9a68',
                              borderRadius: 10,
                              fontWeight: 700,
                            }}
                          >
                            Hoàn thành
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            {students ? (
              <></>
            ) : (
              <TableRow>
                <TableCell className="text-center" colSpan={6}>
                  <h3 style={{ fontWeight: 700, color: 'grey' }}>Chưa có học viên tham gia</h3>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* {students && students.length > 0 && ( */}
        <TablePagination
          labelRowsPerPage="Số hàng trên trang :"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={students ? students.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* )} */}
      </Paper>
    </div>
  );
};

export default EnrollStudentView;
