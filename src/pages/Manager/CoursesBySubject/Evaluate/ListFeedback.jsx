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
  Box,
  Rating,
} from '@mui/material';
import { Search } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchData } from '../../../../services/AppService';
import CustomBreadcrumbs from '../../../../components/Breadcrumbs';
import {
  CourseControllerApi,
  FeedbackControllerApi,
  SubjectControllerApi,
} from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import { Container } from 'reactstrap';
import FeedbackModal from './FeedbackModal';
import StarIcon from '@mui/icons-material/Star';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import moment from 'moment';

const subjectApi = new SubjectControllerApi(ApiClientSingleton.getInstance());
const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const feedbackApi = new FeedbackControllerApi(ApiClientSingleton.getInstance());

const ListFeedback = () => {
  const { courseId, subjectId } = useParams();
  const [searchValue, setSearchValue] = useState('');
  // const [data, setData] = useState();
  const [evaluate, setEvaluate] = useState();
  const [totalRate, setTotalRate] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [rating, setRating] = useState(0);
  const [course, setCourse] = useState();
  const [subjectData, setSubject] = useState();
  const [feedback, setFeedback] = useState();

  const breadcrumbItems = [
    {
      url: '/dashboard',
      label: 'Trang chủ',
    },
    {
      url: '/subjects',
      label: 'Danh sách chủ đề',
    },
    {
      url: `/subject/${subjectId}/course/`,
      label: `Chủ đề: ${subjectData?.name}`,
    },
    {
      url: `/subject/${subjectId}/course/${courseId}/syllabus/`,
      label: `Khoá học: ${course?.name}`,
    },
    {
      url: `/subject/${subjectId}/course/${courseId}/syllabus/evaluate`,
      label: `Danh sách đánh giá`,
    },
  ];

  const getCourseById = () => {
    courseApi.getCourseById(courseId, (err, res) => {
      if (res) {
        setCourse(res);
      }
    });
  };
  const getSubjectById = () => {
    subjectApi.findSubjectById(subjectId, (err, res) => {
      if (res) {
        setSubject(res);
        console.log(res);
      }
    });
  };

  // const getFeedbackByCourse = () => {
  //   feedbackApi.findAllByCourseId(courseId, (err, res) => {
  //     if (res) {
  //       setFeedback(res);
  //       console.log(res);
  //     }
  //   });
  // };

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      getCourseById();
      getSubjectById();
      fetchData(`/feedback/ByCourse?course_id=${courseId}`, token)
        .then((resp) => {
          if (resp) {
            setEvaluate(resp);
            setTotalRate(resp.length);
            const averageRating = calculateAverageRating(resp);
            setRating(averageRating);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function calculateAverageRating(data) {
    let sum = 0;
    let count = 0;

    for (const item of data) {
      for (const feedback of item.feedbackDetails) {
        if (feedback.rate !== undefined) {
          sum += feedback.rate;
          count++;
        }
      }
    }

    const averageRating = count > 0 ? (sum / count).toFixed(2) : 0.0;
    return averageRating;
  }

  function calculateSingleAverageRating(feedbackDetails) {
    let sum = 0;
    let count = 0;

    for (const item of feedbackDetails) {
      if (item.rate !== undefined) {
        sum += item.rate;
        count++;
      }
    }

    const averageRating = count > 0 ? (sum / count).toFixed(2) : 0.0;
    return averageRating;
  }

  const handleOpenModal = (feedback) => {
    feedback?.feedbackDetails.sort((a, b) => {
      if (a.type === 'TEXT') return -1;
      if (b.type === 'TEXT') return 1;
      return 0;
    });
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
  };

  // Filter the evaluate array based on the search input value and username
  const filteredEvaluate =
    evaluate &&
    evaluate.filter((s) => s.enroll.student.account.username.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    evaluate && (
      <div className="px-3 py-1" style={{ overflow: 'auto', height: 850 }}>
        <div className="mb-3" style={{ margin: '20px' }}>
          <h4 style={{ fontWeight: 'bold' }}>Danh sách đánh giá</h4>
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
              className="col-3 m-3"
            >
              <Typography className="text-center" variant="subtitle1" sx={{ fontWeight: 700 }}>
                ĐÁNH GIÁ ({totalRate})
              </Typography>

              <Paper
                style={{
                  borderRadius: '20px',
                  padding: '30px 10px ',
                  maxHeight: 'max-content',
                  minHeight: 100,
                  boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                  margin: '10px 0',
                }}
              >
                <div className="p-2">
                  <Typography
                    className="text-center"
                    variant="subtitle1"
                    sx={{ fontWeight: 700, fontSize: 15, color: '#212b36' }}
                  >
                    Độ uy tín
                  </Typography>
                  <Typography className="text-center" variant="h2" sx={{ fontWeight: 'bold', color: '#212b36' }}>
                    {rating}/5
                  </Typography>
                  <div className="d-flex justify-content-center">
                    <Rating
                      name="text-feedback"
                      value={rating}
                      readOnly
                      precision={0.05}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                  </div>
                  <div className="p-1 m-1 d-flex justify-content-center">
                    <Typography className="text-center" variant="caption" sx={{ fontWeight: 'bold', color: '#75797d' }}>
                      ({totalRate} lượt đánh giá)
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Box>
            <Paper
              className="col-8 m-3"
              style={{
                borderRadius: '20px',
                padding: '20px',
                maxHeight: 'max-content',
                minHeight: 100,
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: '10px 0',
              }}
            >
              <div className="d-flex" style={{ marginTop: '20px' }}>
                <div className=" rounded p-1" style={{ backgroundColor: '#f4f6f8' }}>
                  <InputBase
                    placeholder="Search"
                    style={{ marginLeft: '20px' }}
                    startAdornment={<Search />}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <Table style={{ marginTop: '20px' }}>
                <TableHead style={{ backgroundColor: '#f4f6f8' }}>
                  <TableRow>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tên sinh viên</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Điểm đánh giá</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Ngày Tạo</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredEvaluate.length > 0 ? (
                    <>
                      {filteredEvaluate &&
                        filteredEvaluate.length > 0 &&
                        filteredEvaluate.map((s, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                              <TableCell width={'30%'} style={{ fontWeight: 600, color: '#686f77' }}>
                                {s.enroll.student.account.username}
                              </TableCell>
                              <TableCell width={'20%'} style={{ fontWeight: 600, color: '#686f77' }}>
                                {calculateSingleAverageRating(s?.feedbackDetails) > 3.5 ? (
                                  <div
                                    className="p-2 text-center"
                                    style={{
                                      width: '50%',
                                      backgroundColor: '#dbf6e5',
                                      color: '#2a9a68',
                                      borderRadius: 10,
                                      fontWeight: 700,
                                    }}
                                  >
                                    {calculateSingleAverageRating(s?.feedbackDetails)}/5
                                  </div>
                                ) : calculateSingleAverageRating(s?.feedbackDetails) < 2.5 ? (
                                  <div
                                    className="p-2 text-center"
                                    style={{
                                      width: '50%',
                                      backgroundColor: '#ffe4de',
                                      color: '#c64843',
                                      borderRadius: 10,
                                      fontWeight: 700,
                                    }}
                                  >
                                    {calculateSingleAverageRating(s?.feedbackDetails)}/5
                                  </div>
                                ) : (
                                  <div
                                    className="p-2 text-center"
                                    style={{
                                      width: '50%',
                                      backgroundColor: '#f9f782',
                                      color: '#a99533',
                                      borderRadius: 10,
                                      fontWeight: 700,
                                    }}
                                  >
                                    {calculateSingleAverageRating(s?.feedbackDetails)}/5
                                  </div>
                                )}
                              </TableCell>
                              <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                                {moment(s.createDate).format('DD-MM-YYYY')}
                              </TableCell>
                              <TableCell>
                                <button
                                  style={{ border: 0, color: '#637381', borderRadius: 50 }}
                                  className="btn"
                                  onClick={() => handleOpenModal(s)}
                                >
                                  <VisibilityRoundedIcon />
                                </button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      <TableRow style={{ height: 53 }}>
                        <TableCell colSpan={6}>
                          <div className="text-center">
                            <Typography style={{ fontWeight: 700, color: '#cdd2d6' }} variant="h6">
                              Hiện chưa có đánh giá nào
                            </Typography>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
        <FeedbackModal open={isModalOpen} onClose={handleCloseModal} data={selectedFeedback} />
      </div>
    )
  );
};

export default ListFeedback;
