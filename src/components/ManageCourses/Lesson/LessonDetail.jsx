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
  Tooltip,
} from '@mui/material';
import { Search } from '@material-ui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import QuizModal from '../Quiz/QuizModal';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import CreateQuizModal from '../Quiz/CreateQuizModal';
import { sortByID, validateInputDigits, validateInputString } from '../../../util/Utilities';
import Swal from 'sweetalert2';
import { invalidInput } from '../../../util/Constants';
import QuizDetailModal from '../Quiz/QuizDetailModal';
import CustomBreadcrumbs from '../../Breadcrumbs';
import ColorLabel, { dangerColor, primaryColor } from '../../../util/ColorLabel/ColorLabel';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { StickyNote2Outlined } from '@mui/icons-material';

export default function LessonDetail() {
  const { courseId, syllabusId, lessonId } = useParams();
  const [data, setData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all'); // Default value
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [totalQuiz, setTotalQuiz] = useState(0);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openQuizDetail, setOpenQuizDetail] = useState(false);
  const [quizId, setQuizId] = useState();
  const [course, setCourse] = useState();
  const [syllabus, setSyllabus] = useState();
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
      fetchData(`/quiz/byLesson?lesson_id=${lessonId}`, token)
        .then((resp) => {
          if (resp) {
            const quizList = sortByID(resp);
            setData(quizList);
            setTotalQuiz(resp.length);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [courseId, syllabusId, lessonId]);

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
      data.filter((quiz) => {
        const statusMatch = status === 'all' || quiz.status === status;
        const searchMatch = searchInput === '' || quiz.title.toLowerCase().includes(searchInput.toLowerCase());
        return statusMatch && searchMatch;
      });

    setFilteredData(filteredData);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseQuiz = () => {
    setOpenQuiz(false);
  };

  const handleUpdateQuiz = (quiz) => {
    setOpenQuiz(true);
    setQuiz(quiz);
  };

  const handleSaveQuiz = async (formData) => {
    const token = Cookies.get('token');
    if (token) {
      const validString = validateInputString(formData.title);
      const validDigit = validateInputDigits(
        formData.passScore,
        formData.duration,
        formData.allowAttempt,
        formData.proportion,
      );
      if (validDigit && validString) {
        const body = {
          ...formData,
          title: formData.title,
          passScore: parseInt(formData.passScore),
          status: formData.status,
          duration: parseInt(formData.duration),
          dateRange: parseInt(formData.dateRange),
          allowAttempt: parseInt(formData.allowAttempt),
          proportion: parseInt(formData.proportion),
          lessonId: parseInt(lessonId),
        };
        await postData('/quiz/save', body, token).then((resp) => {
          if (resp) {
            window.location.reload();
          }
        });
      } else {
        handleCloseQuiz();
        Swal.fire({
          title: 'Cảnh báo',
          text: invalidInput,
          icon: 'warning',
        });
      }
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filterData.length) : 0;

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
      label: 'Danh sách bài kiểm tra',
    },
  ];

  const navigate = useNavigate();

  return (
    data && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row mb-3">
          <div className="col-8">
            <h4 style={{ fontWeight: 'bold' }}>Danh sách bài kiểm tra</h4>
            <CustomBreadcrumbs items={breadcrumbItems} />
          </div>
          <div className="text-end col-4">
            {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' && (
              <div style={{ marginTop: '20px' }}>
                <Button
                  variant="outlined"
                  style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
                  onClick={() => {
                    setOpenQuiz(true);
                    setQuiz(null);
                  }}
                >
                  Tạo bài kiểm tra
                </Button>
              </div>
            )}
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
          {/* <div style={{ marginTop: '20px' }} className="d-flex align-items-center">
            <TextField label="Tổng số bài kiểm tra" autoFocus margin="dense" value={totalQuiz} />
          </div> */}

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
              <MenuItem value="Active">Hoạt động</MenuItem>
              <MenuItem value="Deactive">Không hoạt động</MenuItem>
              {/* Add other statuses as menu items */}
            </Select>
          </div>

          <Table style={{ marginTop: '20px' }}>
            <TableHead style={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tên bài kiểm tra</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Điểm qua môn</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Thời gian làm bài (phút)</TableCell>
                {/* <TableCell>Thời gian có thể làm</TableCell> */}
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Số lần làm lại</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Trạng thái</TableCell>
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
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.title}</TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.passScore}</TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.duration}</TableCell>
                        {/* <TableCell>{s.dateRange}</TableCell> */}
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.allowAttempt}</TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                          {s.status === 'Active' ? (
                            <ColorLabel text={'Hoạt động'} color={primaryColor} />
                          ) : (
                            <ColorLabel text={'Không hoạt động'} color={dangerColor} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Chi tiết">
                            <button
                              className="mx-2"
                              style={{ border: 'none', background: 'none' }}
                              onClick={() => {
                                setOpenQuizDetail(true);
                                setQuizId(s.id);
                              }}
                            >
                              <VisibilityIcon color="disabled" />
                            </button>
                          </Tooltip>
                          <Tooltip title=" Kết quả làm bài của học viên">
                            <button
                              className="mx-2"
                              style={{ border: 'none', background: 'none' }}
                              onClick={() =>
                                navigate(`/courses/${courseId}/syllabus/${syllabusId}/lessons/${lessonId}/quiz/${s.id}`)
                              }
                            >
                              <QuestionAnswerIcon color="primary" />
                            </button>
                          </Tooltip>
                          {'Deactive' === s.status && (
                            <>
                              <Tooltip title=" Thêm câu hỏi">
                                <button
                                  style={{ border: 'none', background: 'none' }}
                                  className="mx-2"
                                  onClick={() =>
                                    navigate(
                                      `/courses/${courseId}/syllabus/${syllabusId}/lessons/${lessonId}/quiz/${s.id}/questions`,
                                    )
                                  }
                                >
                                  <StickyNote2Icon color="success" />
                                </button>
                              </Tooltip>
                              <Tooltip title="Chỉnh sửa">
                                <button
                                  style={{ border: 'none', background: 'none' }}
                                  className="mx-2"
                                  onClick={() => handleUpdateQuiz(s)}
                                >
                                  <EditIcon color="disabled" />
                                </button>
                              </Tooltip>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            labelRowsPerPage="Số hàng trên trang :"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <QuizModal isOpen={open} onClose={handleClose} />
        <CreateQuizModal open={openQuiz} onClose={handleCloseQuiz} onSave={handleSaveQuiz} data={quiz} />
        <QuizDetailModal isOpen={openQuizDetail} onClose={() => setOpenQuizDetail(false)} quizId={quizId} />
      </div>
    )
  );
}
