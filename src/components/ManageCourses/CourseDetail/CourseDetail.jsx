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
  TablePagination,
  Tooltip,
  Box,
  Popover,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Search } from '@material-ui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { courseData, syllabusData } from '../../../mock/mock-data';
import CourseEditModal from './CourseEditModal';
import SyllabusCreateModal from '../Syllabus/SyllabusCreateModal';
import { fetchData, postData } from '../../../services/AppService';
import Loading from '../../Loading/Loading';
import Cookies from 'js-cookie';
import { formatDate, sortByID, validateInputString } from '../../../util/Utilities';
import Swal from 'sweetalert2';
import { invalidInput } from '../../../util/Constants';
import moment from 'moment';
import CustomBreadcrumbs from '../../Breadcrumbs';
import ColorLabel, { dangerColor, primaryColor } from '../../../util/ColorLabel/ColorLabel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
export default function CourseDetail() {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all'); // Default value
  const [searchValue, setSearchValue] = useState('');
  const [course, setCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyllabusCreateModalOpen, setIsSyllabusCreateModalOpen] = useState(false);
  const [syllabusCopy, setSyllabusCopy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterDataInfo, setFilterDataInfor] = useState(null);
  const [openPop, setOpenPop] = useState(null);

  const handleClosePop = () => {
    setOpenPop(null);
  };

  const handleOpenPop = (event) => {
    setOpenPop(event.currentTarget);
  };

  const handleCreateSyllabusClick = () => {
    setIsSyllabusCreateModalOpen(true);
  };

  const handleSyllabusModalClose = () => {
    setIsSyllabusCreateModalOpen(false);
    setSyllabusCopy(null);
  };

  const handleCreateSyllabus = (syllabusName) => {
    const token = Cookies.get('token');

    const syllabusBody = {
      name: syllabusName,
      courseId: courseId,
      lessonIds: [],
      status: 'Deactive',
    };
    postData('/syllabus/save', syllabusBody, token).then((resp) => {
      if (resp) {
        window.location.reload();
      }
    });

    // Close the modal
    handleSyllabusModalClose();
  };

  const handleEditClick = () => {
    handleClosePop();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token = Cookies.get('token');
    const user = JSON.parse(Cookies.get('user'));
    if (token && user) {
      fetchData(`/course/byId?id=${courseId}`, token)
        .then((resp) => {
          if (resp) {
            setCourse(resp);
            fetchData(`/syllabus/byCourseId?course_id=${courseId}`, token).then((resp) => {
              if (resp) {
                const courseList = sortByID(resp);
                setData(courseList);
                setLoading(false);
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [courseId]);

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
    const filteredData = data.filter((item) => {
      const statusMatch = status === 'all' || item.status === status;
      const searchMatch = searchInput === '' || item.name.toLowerCase().includes(searchInput.toLowerCase());
      return statusMatch && searchMatch;
    });

    setFilterDataInfor(filteredData);
  };

  const handleSaveCourseDetails = async (newPrice, newDescription, courseName, passingScore, duration) => {
    setLoading(true);
    // Update the course details in your state
    const token = Cookies.get('token');
    const body = {
      ...course,
      price: newPrice,
      description: newDescription,
      name: courseName,
      averagePoint: passingScore,
      limitTime: duration,
      teacherId: course?.teacher.id,
      subjectId: course?.subject.id,
    };
    postData('/course/save', body, token)
      .then((resp) => {
        if (resp) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Close the modal
    handleModalClose();
  };

  const handleOpenSyllabusCopy = (syllabusId) => {
    const syllabusCopy = data.find((c) => c.id === syllabusId);
    if (syllabusCopy) {
      // Clone the syllabusCopy to ensure it's a new object
      const newSyllabusCopy = { ...syllabusCopy };

      // Generate a new unique ID for the syllabus copy
      newSyllabusCopy.id = data.length + 1; // Replace with your unique ID generation logic
      setIsSyllabusCreateModalOpen(true);
      setSyllabusCopy(newSyllabusCopy);
    }
  };

  const handleCreateSyllabusCopy = (syllabusName) => {
    const token = Cookies.get('token');
    setLoading(true);
    const isValidString = validateInputString(syllabusName);
    if (token && isValidString) {
      const lessonIds = syllabusCopy?.lessons.map((item) => item.id);
      const body = {
        name: syllabusName,
        courseId: parseInt(courseId),
        lessonIds: lessonIds,
        status: 'Deactive',
      };
      postData('/syllabus/save', body, token)
        .then((resp) => {
          if (resp) {
            setLoading(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // Close the modal
      handleSyllabusModalClose();
    } else {
      Swal.fire({
        title: 'Cảnh báo',
        text: invalidInput,
        icon: 'warning',
      });
    }
  };

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
    ? Math.max(0, (1 + page) * rowsPerPage - data.length)
    : 0;

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
  ];

  const handleRenderStatusCourse = (status) => {
    switch (status) {
      case 'DRAFT':
        return 'Đang soạn';
      case 'PENDING':
        return 'Chờ xử lí';
      case 'REJECT':
        return 'Bị từ chối';
      case 'DEACTIVE':
        return 'Không hoạt động';
      case 'ACTIVE':
        return 'Hoạt động';
      default:
        return 'Đang soạn';
    }
  };

  return loading ? (
    <Loading />
  ) : (
    data && course && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <h4 style={{ fontWeight: 700 }}>Khoá học</h4>
        <CustomBreadcrumbs items={breadcrumbItems} />

        <div className="row">
          <Box
            sx={{
              padding: '20px',
              borderRadius: '20px',
              maxHeight: 'max-content',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
              backgroundColor: '#f4f6f8',
            }}
            className="col-4 mt-3"
          >
            <div className="row p-2">
              <div className="col-10">
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {courseData.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: 13, color: '#75797d' }}>
                  Chủ đề: {course.subject.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 13, color: '#75797d' }}>
                  Ngày tạo: {moment(course.createDate).format('DD/MM/YYYY')}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 13, color: '#75797d' }}>
                  Thời gian học: {course.limitTime} tháng
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 13, color: '#75797d' }}>
                  Trạng thái: {handleRenderStatusCourse(course.status)}
                </Typography>
              </div>
              <div className="col-2 text-end">
                <div className="d-flex">
                  <button
                    className="btn "
                    style={{
                      width: 40,
                      height: 40,
                      padding: 0,
                      border: 0,
                      borderRadius: '50%',
                      minWidth: '50',
                      color: '#637381',
                      backgroundColor: '#ffffff',
                    }}
                    onClick={(e) => handleOpenPop(e)}
                  >
                    <MoreVertRoundedIcon />
                  </button>
                </div>
              </div>
            </div>

            <Paper
              sx={{
                padding: '20px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                minHeight: 100,
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: '10px 0',
              }}
            >
              <div className="p-2">
                <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                  Giá
                </Typography>
                <br />
                <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                  {course.price?.toLocaleString()}VNĐ
                </Typography>
              </div>
            </Paper>

            <Paper
              sx={{
                borderRadius: '20px',
                padding: '10px',
                maxHeight: 'max-content',
                minHeight: 100,
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: '10px 0',
              }}
            >
              <img style={{ borderRadius: '20px' }} width={'100%'} src={course.image} alt="" />
              <div className="p-2">
                <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                  Điểm qua môn
                </Typography>
                <br />
                <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                  {course.averagePoint}/10
                </Typography>
              </div>
            </Paper>

            <Paper
              sx={{
                padding: '20px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                minHeight: 100,
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: '10px 0',
              }}
            >
              <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                Mô tả
              </Typography>
              <br />
              <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                <div style={{ overflow: 'auto', height: 100 }}>{course.description}</div>
              </Typography>
            </Paper>

            <Paper
              sx={{
                padding: '20px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: '10px 0',
              }}
            >
              <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                Lượt đăng ký
              </Typography>
              <br />
              <Link to={`/courses/${courseId}/enroll-student`} style={{ fontSize: 15, color: '#0f7eed' }}>
                Xem danh sách
              </Link>
            </Paper>
          </Box>

          <div className="mt-3 col-8">
            <Paper
              sx={{
                padding: '20px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
              }}
            >
              {/* <div style={{ marginTop: '20px' }}>
                {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' && (
                  <button className="btn btn-outline-success" style={{ marginLeft: '20px' }} onClick={handleEditClick}>
                    Chỉnh sửa
                  </button>
                )}
              </div> */}
              <Typography align="center" variant="h6">
                Danh sách giáo trình
              </Typography>

              <div style={{ marginTop: '20px', width: '100%' }}>
                <div className="row">
                  <div className="col-8 d-flex">
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
                      <MenuItem value="Active">Hoạt động</MenuItem>
                      <MenuItem value="Deactive">Không hoạt động</MenuItem>
                      {/* Add other statuses as menu items */}
                    </Select>
                  </div>

                  <div className="col-4 text-end">
                    {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' && (
                      <Button
                        variant="outlined"
                        style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
                        onClick={handleCreateSyllabusClick}
                      >
                        Tạo mới
                      </Button>
                    )}
                  </div>
                </div>

                {/* <Link
                  className="btn btn-outline-primary"
                  style={{ marginLeft: '20px' }}
                  to={`/courses/${courseId}/evaluate`}
                >
                  Xem đánh giá
                </Link>
                <Link
                  className="btn btn-outline-primary"
                  style={{ marginLeft: '20px' }}
                  to={`/courses/${courseId}/enroll-student`}
                >
                  Xem danh sách sinh viên đã đăng kí
                </Link> */}
              </div>

              <Table style={{ marginTop: '20px' }}>
                <TableHead style={{ backgroundColor: '#f4f6f8' }}>
                  <TableRow>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>STT</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tên</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Trạng thái</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterDataInfo
                    ? filterDataInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                        return (
                          <>
                            <TableRow key={index}>
                              <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                              <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.name}</TableCell>
                              <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                                {s.status === 'Active' ? (
                                  <div
                                    className="p-2 text-center"
                                    style={{
                                      backgroundColor: '#dbf6e5',
                                      color: '#2a9a68',
                                      borderRadius: 10,
                                      fontWeight: 700,
                                      width: '60%',
                                    }}
                                  >
                                    Đang hoạt động
                                  </div>
                                ) : (
                                  <div
                                    className="p-2 text-center"
                                    style={{
                                      backgroundColor: '#ffe4de',
                                      color: '#c64843',
                                      borderRadius: 10,
                                      fontWeight: 700,
                                      width: '60%',
                                    }}
                                  >
                                    Không hoạt động
                                  </div>
                                )}
                              </TableCell>
                              <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                                {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' && (
                                  <Tooltip title="Tạo bản sao">
                                    <Button
                                      // variant="outlined"
                                      style={{ border: 'none', background: 'none', marginRight: '10px' }}
                                      onClick={() => handleOpenSyllabusCopy(s.id)}
                                    >
                                      <FileCopyIcon color="success" />
                                    </Button>
                                  </Tooltip>
                                )}
                                <Tooltip title="Xem chi tiết">
                                  <Link to={`/courses/${courseId}/syllabus/${s.id}`}>
                                    <VisibilityIcon color="disabled" />
                                  </Link>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </>
                        );
                      })
                    : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                        return (
                          <>
                            <TableRow key={index}>
                              <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                              <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.name}</TableCell>
                              <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                                {s.status === 'Active' ? (
                                  <div
                                    className="p-2 text-center"
                                    style={{
                                      backgroundColor: '#dbf6e5',
                                      color: '#2a9a68',
                                      borderRadius: 10,
                                      fontWeight: 700,
                                      width: '60%',
                                    }}
                                  >
                                    Đang hoạt động
                                  </div>
                                ) : (
                                  <div
                                    className="p-2 text-center"
                                    style={{
                                      backgroundColor: '#ffe4de',
                                      color: '#c64843',
                                      borderRadius: 10,
                                      fontWeight: 700,
                                      width: '60%',
                                    }}
                                  >
                                    Chưa kích hoạt
                                  </div>
                                )}
                              </TableCell>
                              <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                                {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' && (
                                  <Tooltip title="Tạo bản sao">
                                    <Button
                                      // variant="outlined"
                                      style={{ border: 'none', background: 'none', marginRight: '10px' }}
                                      onClick={() => handleOpenSyllabusCopy(s.id)}
                                    >
                                      <FileCopyIcon color="success" />
                                    </Button>
                                  </Tooltip>
                                )}
                                <Tooltip title="Xem chi tiết">
                                  <Link to={`/courses/${courseId}/syllabus/${s.id}`}>
                                    <VisibilityIcon color="disabled" />
                                  </Link>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </>
                        );
                      })}
                  {data.length == 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6}>
                        <h3 style={{ fontWeight: 700, color: 'grey' }}>Chưa có giáo trình</h3>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                labelRowsPerPage="Số hàng trên trang :"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filterDataInfo ? filterDataInfo.length : data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
          <CourseEditModal
            open={isModalOpen}
            onClose={handleModalClose}
            onSave={handleSaveCourseDetails}
            course={course}
          />
          <SyllabusCreateModal
            open={isSyllabusCreateModalOpen}
            onClose={handleSyllabusModalClose}
            onCreate={handleCreateSyllabus}
            isCopied={syllabusCopy}
            onCopy={handleCreateSyllabusCopy}
          />
          <Popover
            className="p-1"
            open={!!openPop}
            anchorEl={openPop}
            onClose={handleClosePop}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                border: 0,
                width: 250,
                borderRadius: '15px',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px',
              },
            }}
          >
            <div className="p-2">
              <MenuItem style={{ borderRadius: '10px' }} com>
                <Link style={{ color: '#ffb41f' }} to={`/courses/${courseId}/evaluate`}>
                  <div className="d-flex p-1">
                    <FeedbackIcon />
                    <Typography className="mx-2" style={{ fontWeight: 600 }}>
                      Xem đánh giá
                    </Typography>
                  </div>
                </Link>
              </MenuItem>
              <MenuItem style={{ borderRadius: '10px' }} com>
                <Link style={{ color: '#2a9a68' }} to={`/courses/${courseId}/enroll-student`}>
                  <div className="d-flex p-1">
                    <HowToRegRoundedIcon />
                    <Typography className="mx-2" style={{ fontWeight: 600 }}>
                      Danh sách đăng ký
                    </Typography>
                  </div>
                </Link>
              </MenuItem>

              {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' && (
                <MenuItem style={{ borderRadius: '10px' }} onClick={handleEditClick}>
                  <div style={{ color: '#2b6da3' }} className="d-flex p-1">
                    <EditRoundedIcon />
                    <Typography className="mx-2" style={{ fontWeight: 600 }}>
                      Chỉnh sửa
                    </Typography>
                  </div>
                </MenuItem>
              )}
              {course?.status === 'ACTIVE' && course?.status === 'PENDING' && (
                <MenuItem disabled style={{ borderRadius: '10px' }} onClick={handleEditClick}>
                  <div style={{ color: '#2b6da3' }} className="d-flex p-1">
                    <EditRoundedIcon />
                    <Typography className="mx-2" style={{ fontWeight: 600 }}>
                      Chỉnh sửa
                    </Typography>
                  </div>
                </MenuItem>
              )}
            </div>
          </Popover>
        </div>
      </div>
    )
  );
}
