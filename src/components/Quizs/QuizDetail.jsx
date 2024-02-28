import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TextField,
  TablePagination,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Search } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchData } from '../../services/AppService';
import QuizModal from '../ManageCourses/Quiz/QuizModal';
import CustomBreadcrumbs from '../Breadcrumbs';
import { PATTERN_DATE, formatDate } from '../../constant';
import ColorLabel, { dangerColor, primaryColor } from '../../util/ColorLabel/ColorLabel';
import moment from 'moment';

export default function QuizDetail() {
  const { courseId, syllabusId, lessonId, quizId } = useParams();
  const [data, setData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all'); // Default value
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [totalStudentJoin, setTotalStudentJoin] = useState(0);
  const [averagePoint, setTotalAveragePoint] = useState(0);
  const [proportion, setProportion] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [course, setCourse] = useState();
  const [syllabus, setSyllabus] = useState();
  const [lesson, setLesson] = useState();
  const [quiz, setQuiz] = useState();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData(`/course/byId?id=${courseId}`, token).then((resp) => {
        if (resp) {
          setCourse(resp);
        }
      });
      fetchData(`/syllabus/byId?id=${syllabusId}`, token).then((resp) => {
        if (resp) {
          setSyllabus(resp);
        }
      });
      fetchData(`/lesson/byId?id=${lessonId}`, token).then((resp) => {
        if (resp) {
          setLesson(resp);
        }
      });
      fetchData(`/quiz/byId?quiz_id=${quizId}`, token).then((resp) => {
        if (resp) {
          setQuiz(resp);
        }
      });
      fetchData(`/result-quiz/by-quiz?quiz_id=${quizId}`, token)
        .then((resp) => {
          if (resp) {
            setData(resp);
            if (resp.length > 0) {
              setTotalStudentJoin(resp.length);
              setTotalAveragePoint(calculateAveragePoint(resp));
              setProportion(calculateProportion(resp));
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [courseId, syllabusId, lessonId, quizId]);

  const calculateAveragePoint = (obj) => {
    // Calculate the average point from the lastPoint
    const totalPoints = obj.reduce((total, item) => total + item.lastPoint, 0);
    return (totalPoints / obj.length).toFixed(2);
  };

  const calculateProportion = (obj) => {
    // Count how many students have a resultStatus of "pass"
    const studentPassList = obj.filter((item) => item.resultStatus.toLowerCase() === 'pass').length;
    return ((studentPassList / obj.length) * 100).toFixed(2);
  };

  useEffect(() => {
    filterData(selectedStatus, searchValue);
  }, [data, selectedStatus, searchValue]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterData = (status, searchInput) => {
    const filteredData =
      data &&
      data.filter((resultQuiz) => {
        const statusMatch = status === 'all' || resultQuiz.resultStatus.toLowerCase() === status;
        const searchMatch =
          searchInput === '' ||
          resultQuiz?.student?.account?.username.toLowerCase().includes(searchInput.toLowerCase());
        return statusMatch && searchMatch;
      });

    setFilteredData(filteredData); // Update filteredData, not data
  };

  const [open, setOpen] = useState(false);

  const handleOpen = (s) => {
    setSelectedQuiz(s);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData?.length) : 0;

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
      url: `/courses/` + courseId + `/syllabus/` + syllabusId,
      label: `Giáo trình: ${syllabus?.name}`,
    },
    {
      url: `/courses/` + courseId + `/syllabus/` + syllabusId + `/lessons/` + lessonId,
      label: `${lesson?.name}: Danh sách bài kiểm tra`,
    },
    {
      url: `/courses/` + courseId + `/syllabus/` + syllabusId + `/lessons/` + lessonId + `/quiz/` + quizId,
      label: 'Kết quả bài kiểm tra của học viên',
    },
  ];

  return (
    data && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row mb-3">
          <h4 style={{ fontWeight: 'bold' }}>Danh sách học viên đã làm bài kiểm tra</h4>
          <CustomBreadcrumbs items={breadcrumbItems} />
        </div>
        <Paper
          sx={{
            padding: '20px',
            borderRadius: '20px',
            maxHeight: 'max-content',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          <Typography style={{ fontWeight: 700 }} variant="title1">
            Tên bài kiểm tra: {quiz?.title}{' '}
          </Typography>
          <div style={{ marginTop: '20px' }} className="d-flex align-items-center">
            <TextField label="Số lượt làm bài" autoFocus value={totalStudentJoin} margin="dense" />
            <TextField
              label="Điểm trung bình:"
              style={{ marginLeft: '20px' }}
              autoFocus
              value={averagePoint}
              margin="dense"
            />
            {/* <TextField
                                label="Tỷ trọng:"
                                style={{ marginLeft: '20px' }}
                                autoFocus
                                value={proportion + "%"}
                                margin="dense"
                            /> */}
          </div>

          <div style={{ marginTop: '20px' }} className="d-flex align-items-center">
            <div className="rounded p-2" style={{ backgroundColor: '#f4f6f8' }}>
              <InputBase
                placeholder="Tìm kiếm bằng tên"
                style={{ marginInline: '10px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              />
            </div>
            <Select value={selectedStatus} onChange={handleStatusChange} style={{ marginLeft: '20px' }}>
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="fail">Không đạt</MenuItem>
              <MenuItem value="pass">Đạt</MenuItem>
              {/* Add other statuses as menu items */}
            </Select>
          </div>

          <Table style={{ marginTop: '20px' }}>
            <TableHead style={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tên học viên</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Điểm</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Trạng thái</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Ngày làm</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData.length > 0 &&
                filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                          {s?.student?.account?.username}
                        </TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s?.lastPoint}</TableCell>
                        <TableCell>
                          {s?.resultStatus === 'FAIL' ? (
                            <div
                              className="p-2 text-center"
                              style={{
                                backgroundColor: '#ffe4de',
                                color: '#c64843',
                                borderRadius: 10,
                                fontWeight: 700,
                                width: '80%',
                              }}
                            >
                              Không đạt
                            </div>
                          ) : (
                            <div
                              className="p-2 text-center"
                              style={{
                                backgroundColor: '#dbf6e5',
                                color: '#2a9a68',
                                borderRadius: 10,
                                fontWeight: 700,
                                width: '80%',
                              }}
                            >
                              Đạt
                            </div>
                          )}
                        </TableCell>
                        {/* <TableCell>{  ? '' : ''}</TableCell> */}
                        <TableCell>{moment(s?.startTime).format('hh:mm, DD-MM-YYYY')}</TableCell>
                        <TableCell>
                          <button style={{ color: '#686f77' }} className="btn " onClick={() => handleOpen(s)}>
                            <VisibilityRoundedIcon />
                          </button>
                        </TableCell>
                      </TableRow>
                      {/* {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )} */}
                    </>
                  );
                })}
              {filteredData?.length == 0 && (
                <TableRow>
                  <TableCell className="text-center" colSpan={6}>
                    <h3 style={{ fontWeight: 700, color: 'grey' }}>Chưa có dữ liệu</h3>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {filteredData && (
            <TablePagination
              labelRowsPerPage="Số hàng trên trang :"
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>

        <QuizModal isOpen={open} onClose={handleClose} quizDetail={selectedQuiz} onSave={handleClose} />
      </div>
    )
  );
}
