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
  TextField,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  TableContainer,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Tooltip,
  Box,
} from '@mui/material';
import { Search } from '@material-ui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SyllabusUpdateModal from '../SysllabusModal/SyllabusUpdateModal';
import LessonModal from '../../Lesson/LessonModal';
import { fetchData, postData } from './../../../../services/AppService.js';
import TextTruncate from '../../../../util/Text-Truncate/TextTruncate';
import Loading from '../../../Loading/Loading';
import Cookies from 'js-cookie';
import moment from 'moment/moment';
import ListLessonModal from '../../Lesson/ListLessonModal';
import { sortByID } from '../../../../util/Utilities';
import Swal from 'sweetalert2';
import CustomBreadcrumbs from '../../../Breadcrumbs/index.jsx';
import QuizIcon from '@mui/icons-material/Quiz';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ColorLabel, { dangerColor, primaryColor } from '../../../../util/ColorLabel/ColorLabel.jsx';

export default function SyllabusDetail() {
  const { courseId, syllabusId } = useParams();
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [syllabus, setSyllabus] = useState(null);
  const [isSyllabusEditModalOpen, setIsSyllabusEditModalOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [openSyllabusActiveModal, setOpenSyllabusActiveModal] = useState(false);
  const [listSyllabus, setListSyllabus] = useState();
  const [syllabusDeletedId, setSyllabusDeletedId] = useState();
  const [isChoose, setIsChoose] = useState(null);

  const handleUpdateSyllabus = async (id, status, name) => {
    const token = Cookies.get('token');
    if (token) {
      await fetchData(`/syllabus/byCourseId?course_id=${courseId}`, token).then((resp) => {
        console.log(status);
        if (resp) {
          if (status == 'Deactive') {
            const isExist = resp.filter((r) => r.status !== 'Active');
            if (isExist && isExist.length > 0) {
              setSyllabusDeletedId(id);
              setOpenSyllabusActiveModal(true);
              setListSyllabus(isExist);
            } else {
              Swal.fire({
                title: 'Cảnh báo',
                text: 'Không thể đổi trạng thái vì không có giáo trình thay thế ( bắt buộc có một giáo trình hoạt động )',
                icon: 'warning',
              });
            }
          } else {
            const isExist = resp.filter((r) => r.status === 'Active');
            if (isExist && isExist.length < 1) {
              // setSyllabusDeletedId(id)
              // setOpenSyllabusActiveModal(true)
              // setListSyllabus(isExist)
              fetchData(`/syllabus/byId?id=${id}`, token).then((resp) => {
                if (resp) {
                  const lessonIds = resp.lessons.map((l) => {
                    return l.id;
                  });
                  const body = { ...resp, status: status, name: name, lessonIds: lessonIds, courseId: resp.course.id };
                  postData(`/syllabus/save`, body, token).then((resp) => {
                    if (resp) {
                      window.location.reload();
                    }
                  });
                }
              });
            } else {
              Swal.fire({
                title: 'Cảnh báo',
                text: 'Đã có một giáo trình đang hoạt động ( tại một thời điểm chỉ có 1 giáo trình hoạt động )',
                icon: 'warning',
              });
            }
          }
        }
      });
    }
    setIsSyllabusEditModalOpen(false);
  };

  const handleEditSyllabusClick = () => {
    setIsSyllabusEditModalOpen(true);
  };

  const handleSyllabusEditModalClose = () => {
    setIsSyllabusEditModalOpen(false);
  };

  const handleAddLesson = () => {
    setLessonToEdit(null); // Clear any previous lesson data (for editing)
    setIsLessonModalOpen(true);
  };

  const handleEditLesson = (lessonData) => {
    console.log(lessonData);
    setLessonToEdit(lessonData); // Set the lesson data to edit
    setIsLessonModalOpen(true);
  };

  const handleLessonModalClose = () => {
    setIsLessonModalOpen(false);
  };

  const saveOrUpdateLesson = async (lessonData) => {
    const token = Cookies.get('token');
    if (token) {
      setLoading(true);

      if (lessonData) {
        // Check if lessonData is defined

        // If lessonData has an "id", it means you are updating an existing lesson.
        if (lessonData.id !== null && lessonData.id !== undefined) {
          // Implement your update logic here.
          console.log('Lesson data to update:', lessonData);
          await fetchData(`/lesson/byId?id=${lessonData.id}`, token).then((resp) => {
            if (resp) {
              const syllabusIds = resp.syllabuses.map((s) => {
                return s.id.toString();
              });
              const body = {
                ...lessonData,
                dateTime: moment(new Date()),
                type: lessonData?.url.trim() !== '' ? 'video' : 'reading',
                courseId: parseInt(courseId), // Assuming courseId is defined
                syllabusIds: syllabusIds,
              };

              postData('/lesson/save', body, token)
                .then((resp) => {
                  if (resp) {
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        } else {
          // Implement your create logic here for new lessons.
          // console.log('Lesson data to save', lessonData);
          let arrSyllabus = new Array(syllabusId.toString());
          const body = {
            ...lessonData,
            id: 0,
            dateTime: moment(new Date()),
            type: lessonData?.url.trim() !== '' ? 'video' : 'reading',
            courseId: parseInt(courseId), // Assuming courseId is defined
            syllabusIds: arrSyllabus,
          };
          // console.log(body);
          await postData('/lesson/save', body, token)
            .then((resp) => {
              if (resp) {
                data.push(resp);
                const lessonIds = data.map((d) => d.id);
                const body = {
                  id: syllabus.id,
                  courseId: parseInt(courseId), // Assuming courseId is defined
                  lessonIds: lessonIds,
                  name: syllabus.name,
                  status: syllabus.status,
                };
                postData('/syllabus/save', body, token).then((resp) => {
                  if (resp) {
                    window.location.reload();
                  }
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }

        setIsLessonModalOpen(false); // Close the LessonModal
      }
    }
  };

  const [course, setCourse] = useState();

  useEffect(() => {
    const token = Cookies.get('token');
    setLoading(true);
    if (token) {
      fetchData(`/course/byId?id=${courseId}`, token).then((resp) => {
        if (resp) {
          setCourse(resp);
        }
      });
      fetchData(`/syllabus/byId?id=${syllabusId}`, token)
        .then((resp) => {
          if (resp) {
            setSyllabus(resp);
            const lessonList = sortByID(resp?.lessons);
            setData(lessonList);
            setLoading(false);
            setSearchData(lessonList);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [courseId, syllabusId]);

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
    // Refilter the data when search input changes
    filterData(searchInput);
  };

  const filterData = (searchInput) => {
    // Filter data based on both status and search input
    const filteredData = data.filter((item) => {
      const searchMatch = searchInput === '' || item.name.toLowerCase().includes(searchInput.toLowerCase());
      return searchMatch;
    });

    setSearchData(filteredData);
  };

  const [lessonListModal, setLessonListModal] = useState(false);
  const handleOpenLessonList = () => {
    setLessonListModal(true);
  };

  const handleAddLessonFromCourse = async (items) => {
    const token = Cookies.get('token');
    if (token) {
      await fetchData(`/syllabus/byId?id=${syllabusId}`, token).then((resp) => {
        if (resp) {
          const lessonIdList = resp.lessons.map((l) => l.id).concat(items.map((i) => i.id));
          const body = {
            id: resp.id,
            name: resp.name,
            status: resp.status,
            courseId: resp.course.id,
            lessonIds: lessonIdList,
          };
          postData(`/syllabus/save`, body, token).then((resp) => {
            if (resp) {
              window.location.reload();
            }
          });
        }
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

  const emptyRows = searchData
    ? page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - searchData.length)
      : 0
    : page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - data.length)
      : 0;

  const handleChangeSyllabus = async () => {
    setIsChoose(null);
    const token = Cookies.get('token');
    if (token) {
      await fetchData(`/syllabus/byId?id=${syllabusDeletedId}`, token).then((resp) => {
        if (resp) {
          const lessonIds = resp.lessons.map((l) => {
            return l.id;
          });
          const body = { ...resp, status: 'Deactive', courseId: resp.course.id, lessonIds: lessonIds };
          postData('/syllabus/save', body, token).then((resp) => {
            if (resp) {
              fetchData(`/syllabus/byId?id=${selectedValue}`, token).then((resp) => {
                if (resp) {
                  const lessonIds = resp.lessons.map((l) => {
                    return l.id;
                  });
                  const body = { ...resp, status: 'Active', courseId: resp.course.id, lessonIds: lessonIds };
                  postData('/syllabus/save', body, token).then((resp) => {
                    if (resp) {
                      window.location.reload();
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  };

  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setIsChoose(event);
  };

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
      url: `/syllabus/` + courseId,
      label: `Giáo trình: ${syllabus?.name}`,
    },
  ];

  const navigate = useNavigate();

  return loading ? (
    <Loading />
  ) : (
    syllabus && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row mb-3">
          <div className="col-8">
            <h4 style={{ fontWeight: 'bold' }}>Danh sách bài học</h4>
            <CustomBreadcrumbs items={breadcrumbItems} />
          </div>
          <div className="text-end col-4">
            {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' && (
              <>
                <Button
                  variant="outlined"
                  style={{ border: 0, backgroundColor: '#e0e0e0', color: '#212b36', fontWeight: 700 }}
                  className="mx-2"
                  onClick={handleOpenLessonList}
                >
                  Thêm bài học từ khóa học
                </Button>
                <Button
                  variant="outlined"
                  style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
                  onClick={handleAddLesson}
                >
                  Tạo mới
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="row">
          <div className="mt-3 col-9">
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
                    style={{ marginInline: '10px' }}
                    startAdornment={<Search />}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <Table style={{ marginTop: '20px' }}>
                <TableHead style={{ backgroundColor: '#f4f6f8' }}>
                  <TableRow>
                    <TableCell width={'5%'} style={{ color: '#808d99', fontWeight: 700 }}>
                      #
                    </TableCell>
                    <TableCell width={'15%'} style={{ color: '#808d99', fontWeight: 700 }}>
                      Tên
                    </TableCell>
                    {/* <TableCell style={{ width: '15%' }}>URL</TableCell> */}
                    <TableCell width={'10%'} style={{ color: '#808d99', fontWeight: 700 }}>
                      Ngày tạo
                    </TableCell>
                    <TableCell width={'10%'} style={{ color: '#808d99', fontWeight: 700 }}>
                      Trạng thái
                    </TableCell>
                    <TableCell width={'15%'} style={{ color: '#808d99', fontWeight: 700 }}>
                      Mô tả
                    </TableCell>
                    <TableCell width={'7%'} style={{ color: '#808d99', fontWeight: 700 }}>
                      Thời lượng (phút)
                    </TableCell>
                    <TableCell width={'20%'} style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchData
                    ? searchData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((l, index) => {
                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <TextTruncate text={l?.name} />
                            </TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <TextTruncate text={moment(l.createDate).format('HH:mm DD/MM/YYYY')} />
                            </TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              {l.status === 'true' ? (
                                <ColorLabel text={'Hoạt động'} color={primaryColor} />
                              ) : (
                                <ColorLabel text={'Không hoạt động'} color={dangerColor} />
                              )}
                            </TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <TextTruncate text={l.description} />
                            </TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <TextTruncate text={l.estimateTime} />
                            </TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <Tooltip title="Danh sách bài kiểm tra">
                                <Button
                                  style={{ border: 'none', background: 'none' }}
                                  onClick={() =>
                                    navigate(`/courses/${courseId}/syllabus/${syllabusId}/lessons/${l.id}`)
                                  }
                                >
                                  <QuizIcon color="info" />
                                </Button>
                              </Tooltip>
                              <Tooltip
                                title={
                                  course?.status !== 'ACTIVE' && course?.status !== 'PENDING' ? `Sửa` : 'Chi tiết'
                                }
                              >
                                <Button
                                  style={{ border: 'none', background: 'none' }}
                                  onClick={() => handleEditLesson(l)}
                                >
                                  {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' ? (
                                    <EditIcon color="success" />
                                  ) : (
                                    <VisibilityIcon color="secondary" />
                                  )}
                                </Button>
                              </Tooltip>

                              <Tooltip title="Danh sách tài nguyên">
                                <Button
                                  style={{ border: 'none', background: 'none' }}
                                  onClick={() =>
                                    navigate(`/courses/${courseId}/syllabus/${syllabusId}/lessons/${l.id}/resources`)
                                  }
                                >
                                  <AutoStoriesIcon color="secondary" />
                                </Button>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })
                    : data &&
                    data.length > 0 &&
                    data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((l, index) => {
                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <TextTruncate text={l?.name} />
                            </TableCell>
                            {/* <TableCell><Link to={l.url}><TextTruncate text={l.url} /></Link></TableCell> */}
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <TextTruncate text={moment(l.createDate).format('HH:MM, DD/MM/YYYY')} />
                            </TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              {l.status ? (
                                <ColorLabel text={'Hoạt động'} color={primaryColor} />
                              ) : (
                                <ColorLabel text={'Không hoạt động'} color={dangerColor} />
                              )}
                            </TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <TextTruncate text={l.description} />
                            </TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <TextTruncate text={l.estimateTime} />
                            </TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <Tooltip title="Danh sách bài kiểm tra">
                                <Button
                                  style={{ border: 'none', background: 'none' }}
                                  className="mx-2"
                                  onClick={() =>
                                    navigate(`/courses/${courseId}/syllabus/${syllabusId}/lessons/${l.id}`)
                                  }
                                >
                                  <QuizIcon color="info" />
                                </Button>
                              </Tooltip>
                              <Tooltip
                                title={
                                  course?.status !== 'ACTIVE' && course?.status !== 'PENDING' ? `Sửa` : 'Chi tiết'
                                }
                              >
                                <Button
                                  style={{ border: 'none', background: 'none' }}
                                  className="mx-2"
                                  onClick={() => handleEditLesson(l)}
                                >
                                  {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' ? (
                                    <EditIcon color="success" />
                                  ) : (
                                    <VisibilityIcon color="disabled" />
                                  )}
                                </Button>
                              </Tooltip>

                              <Tooltip title="Danh sách tài nguyên">
                                <Button
                                  style={{ border: 'none', background: 'none' }}
                                  className="mx-2"
                                  onClick={() =>
                                    navigate(`/courses/${courseId}/syllabus/${syllabusId}/lessons/${l.id}/resources`)
                                  }
                                >
                                  <AutoStoriesIcon color="secondary" />
                                </Button>
                              </Tooltip>
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
                </TableBody>

                <Dialog
                  open={openSyllabusActiveModal}
                  onClose={() => setOpenSyllabusActiveModal(false)}
                  maxWidth="md"
                  className="text-center"
                >
                  <DialogTitle>Chọn giáo trình thay thế</DialogTitle>
                  <DialogContent>
                    <div>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                          value={selectedValue}
                          onChange={handleRadioChange}
                        >
                          {listSyllabus &&
                            listSyllabus.map((item, index) => (
                              <div key={index}>
                                {/* <TableCell>{++index}</TableCell> */}
                                <TableCell>
                                  <FormControlLabel value={item.id.toString()} control={<Radio />} label={item?.name} />
                                </TableCell>
                              </div>
                            ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={() => setOpenSyllabusActiveModal(false)} color="secondary">
                      Hủy
                    </Button>
                    <Button disabled={!isChoose} onClick={handleChangeSyllabus} color="primary">
                      Hoàn thành
                    </Button>
                  </DialogActions>
                </Dialog>
              </Table>
              <TablePagination
                labelRowsPerPage="Số hàng trên trang :"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={searchData ? searchData.length : data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
          <Box
            sx={{
              padding: '20px',
              borderRadius: '20px',
              maxHeight: 'max-content',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
              backgroundColor: '#f4f6f8',
            }}
            className="col-3 mt-3"
          >
            <div className="row p-2">
              <div className="col-10">
                <Typography variant="h6" sx={{ fontWeight: 700 }}></Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: 13, color: '#75797d' }}>
                  Khoá học: {course?.name}
                </Typography>
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
              <div className="p-2 row">
                <div className="col-9 ">
                  <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                    Giáo trình:
                  </Typography>
                  <br />
                  <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                    {syllabus?.name}
                  </Typography>
                </div>
                <div className="col-3 text-end">
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
                        color: '#007fbf',
                        backgroundColor: '#e2e2e2',
                      }}
                      onClick={handleEditSyllabusClick}
                    >
                      <EditIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                  Ngày tạo
                </Typography>
                <br />
                <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                  {moment(syllabus.createDate).format('DD-MM-YYYY, HH:MM A')}
                </Typography>
              </div>
              <div className="p-2">
                <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                  Trạng thái
                </Typography>
                <br />
                {syllabus.status === 'Active' ? (
                  <div
                    className="p-2 text-center"
                    style={{
                      backgroundColor: '#dbf6e5',
                      color: '#2a9a68',
                      borderRadius: 10,
                      fontWeight: 700,
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
                    }}
                  >
                    Không hoạt động
                  </div>
                )}
              </div>
            </Paper>
          </Box>
        </div>
        <SyllabusUpdateModal
          open={isSyllabusEditModalOpen}
          onUpdate={handleUpdateSyllabus}
          onClose={handleSyllabusEditModalClose}
          syllabus={syllabus}
          course={course}
        />
        <LessonModal
          isOpen={isLessonModalOpen}
          onSave={saveOrUpdateLesson}
          onUpdate={saveOrUpdateLesson}
          onClose={handleLessonModalClose}
          lesson={lessonToEdit !== null ? lessonToEdit : null}
          course={course}
        />
        <ListLessonModal
          isOpen={lessonListModal}
          onClose={() => setLessonListModal(false)}
          courseId={courseId}
          onSave={handleAddLessonFromCourse}
        />
      </div>
    )
  );
}
