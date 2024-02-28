import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import CustomBreadcrumbs from '../../components/Breadcrumbs';
import { Container } from 'reactstrap';
import classNames from 'classnames';
import Styles from './OverviewCourse.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Modal,
  Tab,
  Typography,
  Rating,
  Card,
  CardActions,
  CardActionArea,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import ApiClientSingleton from '../../api/apiClientImpl';
import {
  CourseControllerApi,
  EnrollControllerApi,
  FeedbackControllerApi,
  LessonControllerApi,
  SyllabusControllerApi,
  TeacherControllerApi,
  WalletControllerApi,
} from '../../api/generated/generate-api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import StarIcon from '@mui/icons-material/Star';
import courseImg1 from '../../assets/images/web-design.png';
import { BsInfoCircleFill } from 'react-icons/bs';
import moment from 'moment/moment';
import TeacherModal from '../../components/Landing/AllCourses/TeacherModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 950,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
};

const enrollApi = new EnrollControllerApi(ApiClientSingleton.getInstance());
const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const lessonApi = new LessonControllerApi(ApiClientSingleton.getInstance());
const teacherApi = new TeacherControllerApi(ApiClientSingleton.getInstance());
const walletApi = new WalletControllerApi(ApiClientSingleton.getInstance());
const syllabusApi = new SyllabusControllerApi(ApiClientSingleton.getInstance());
const feedbackApi = new FeedbackControllerApi(ApiClientSingleton.getInstance());
const OverviewCourse = () => {
  const breadcrumbItems = [
    {
      url: '/student-home',
      label: 'Trang chủ',
    },
    {
      url: 'overview-course',
      label: 'Thông tin khóa học',
    },
  ];
  const notifySuccess = () => {
    toast.success('Đăng ký thành công !', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyErorr = (msg) => {
    toast.error(`Đăng ký không thành công: ${msg}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const userTmp = JSON.parse(Cookies.get('user'));
  const { courseId } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenTeacherModal, setIsOpenTeacherModal] = useState(false);
  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);
  const [syllabus, setSyllabus] = useState();
  const [teacher, setTeacher] = useState();
  const [wallet, setWallet] = useState();
  const [teacherRating, setTeacherRating] = useState([]);
  const [countEnroll, setCountEnroll] = useState(0);
  const [value, setValue] = useState('2');
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState([]);

  const handleChangeAcc = (panel) => (event, newExpanded) => {
    const newExp = [...expanded];
    newExp[panel] = newExpanded;
    setExpanded(newExp);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (courseId) {
      courseApi.getCourseById(courseId, (err, res) => {
        if (res) {
          setCourse(res);
          teacherApi.getTeacherById(res.teacher.id, (err, res) => {
            if (res) {
              console.log(res);
              setTeacher(res);
              feedbackApi.getRatingByTeacher(res?.id, (err, res) => {
                console.log(res.responseObject);
                setTeacherRating(res.responseObject);
              });
            }
          });
        }
      });
      lessonApi.findLessonByCourseId(courseId, (err, res) => {
        if (res) {
          setLessons(res);
        }
      });
      courseApi.getCountEnrolledByCourse(courseId, (err, res) => {
        if (res) {
          setCountEnroll(res.responseObject);
        }
      });
    }
    walletApi.getByAccountId(userTmp?.id, (err, res) => {
      if (res && res.id) {
        setWallet(res);
      }
    });
    syllabusApi.findSyllabusByCourseId(courseId, (err, res) => {
      if (res) {
        const tmp = res?.filter((data) => data?.status === 'Active');
        if (tmp && tmp.length > 0) {
          setSyllabus(tmp[0]);
          setExpanded(tmp[0]?.lessons?.map(() => true) || []);
        }
      }
    });
  }, [courseId]);

  return (
    <>
      <ToastContainer />
      <Header />

      <div className="container">
        <CustomBreadcrumbs items={breadcrumbItems} />
      </div>
      <div className={classNames(Styles.info__common)}>
        <Container>
          <div className="py-48" style={{ padding: '48px 0' }}>
            <div className="row ">
              <div className="col-8">
                <div className={`${classNames(Styles.course__img)} col-6`}>
                  <img src={course?.image} alt="" className="w-100" style={{ height: '260px' }} />
                </div>
                <Typography variant="h4" gutterBottom>
                  {course?.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Giá: {course?.price?.toLocaleString()} VNĐ
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  {course?.description}
                </Typography>

                <div className="mt-4">
                  <Button
                    variant="contained"
                    size="large"
                    style={{ height: '64px' }}
                    onClick={() => setIsOpenModal(true)}
                  >
                    <Typography style={{ fontWeight: 600 }} variant="button">
                      Đăng ký ngay
                    </Typography>
                  </Button>
                </div>
                <div className="mt-4">
                  <Typography variant="subtitle1">
                    Số lượng đã đăng ký: <strong>{countEnroll}</strong>
                  </Typography>
                </div>
              </div>
              <div className="col-4 position-relative">
                <div className="position-sticky" style={{ zIndex: 999 }}>
                  <div
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '0.5rem',
                      boxShadow: '0 0 32px -8px rgb(0 0 0 / 50%)',
                    }}
                  >
                    <div className="px-4 py-3">
                      <div className=" py-3">
                        <Typography style={{ fontWeight: 600 }} variant="subtitle1">
                          {course?.name}
                        </Typography>

                        <Typography variant="body2">{course?.description}</Typography>
                      </div>
                      <Divider />
                      <div
                        style={{
                          overflowX: 'auto',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <div>
                          <strong>Môn học: </strong>
                          {course?.name}
                        </div>
                        <div>
                          <strong>Thời gian học: </strong>
                          {course?.limitTime} tháng
                        </div>
                        <div>
                          <strong>Điểm trung bình qua môn: </strong>
                          {course?.averagePoint}
                        </div>
                        <div>
                          <strong>Giảng viên:</strong>
                        </div>
                      </div>

                      <div className="mt-2 p-3 rounded">
                        <div className="d-flex align-items-start gap-2">
                          <Avatar alt={teacher?.account?.profile?.firstName} src={teacher?.account?.profile?.avatar} />
                          <div style={{ gap: '8px' }}>
                            <Typography sx={{ fontWeight: 700 }} variant="subtitle1">
                              {teacher?.account?.profile?.firstName} {teacher?.account?.profile?.lastName}{' '}
                            </Typography>
                            <Typography color={'grey'} variant="caption">
                              {teacher?.account?.profile?.phone}
                            </Typography>
                            <Typography color={'grey'} variant="subtitle1">
                              {teacher?.account?.profile?.email}
                            </Typography>
                            <Rating
                              name="text-feedback"
                              value={teacherRating}
                              readOnly
                              precision={0.05}
                              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            {teacherRating ? (
                              <></>
                            ) : (
                              <Typography color={'grey'} variant="subtitle1">
                                (Chưa có đánh giá)
                              </Typography>
                            )}
                          </div>
                        </div>
                      </div>
                      <Divider />
                      <div className=" py-3">
                        <button
                          style={{ border: 'none', background: 'none' }}
                          onClick={() => {
                            const el = document.getElementById('lessons');
                            if (el) {
                              el.scrollIntoView();
                            }
                          }}
                        >
                          <Typography style={{ fontWeight: 600 }} variant="body2">
                            Xem tất cả bài học
                          </Typography>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container id="lessons">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Typography style={{ fontWeight: 600, marginBottom: '8px ' }} variant="subtitle1">
            Chương trình: {syllabus?.name}
          </Typography>
          {syllabus?.lessons?.map((lesson, index) => {
            return (
              <>
                <Accordion key={index} expanded={expanded[index]} onChange={handleChangeAcc(index)}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>{lesson.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <li>{lesson.description}</li>
                  </AccordionDetails>
                </Accordion>
              </>
            );
          })}
        </Box>
      </Container>
      <Footer />

      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: 'flex',
              height: '75px',
              backgroundColor: '#6DA743',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ color: '#fff', fontSize: '24px' }}>Thanh Toán</p>
          </div>
          <Box sx={{ padding: 4 }}>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'space-between' }}>
              <div style={{ border: '1px #B5B5B5 solid', width: '60%', borderRadius: '4px' }}>
                <div style={{ padding: '20px' }}>
                  <div
                    style={{
                      width: '100%',
                      border: '1px #B5B5B5 solid',
                      borderRadius: '4px',
                      display: 'flex',
                      gap: '24px',
                      padding: '12px',
                    }}
                  >
                    <div>
                      <img
                        src={course?.image}
                        alt={course?.name}
                        style={{ width: 100, height: 100, objectFit: 'contain' }}
                      />
                    </div>
                    <div style={{ flex: '1' }}>
                      <div>
                        <strong>{course?.name}</strong>
                      </div>
                      <div>Môn học: {course?.name}</div>
                      <div>Thời gian học: {course?.limitTime} tháng</div>
                      <div>Điểm trung bình qua môn: {course?.averagePoint}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <div>Khóa học của</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <div>
                        <Avatar alt={teacher?.account?.profile?.firstName} src={teacher?.account?.profile?.avatar} />
                      </div>
                      <div>{`${teacher?.account?.profile?.firstName} ${teacher?.account?.profile?.lastName}`}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: '35%' }}>
                <div style={{ padding: '16px' }}>
                  <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Thông tin thanh toán</div>
                  <hr />
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>Ví tài khoản</div>
                      <div>{wallet?.amount ? wallet.amount.toLocaleString() : 0} VNĐ</div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '8px',
                      }}
                    >
                      <div>Giá khóa học</div>
                      <div>{course?.price?.toLocaleString()} VNĐ</div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '8px',
                      }}
                    >
                      <div>Ngày mua</div>
                      <div>{moment(new Date()).format('DD/MM/YYYY')}</div>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>Tổng cộng</div>
                      <div>{course?.price?.toLocaleString()} VNĐ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', color: '#6DA743' }}>
              <div>
                <BsInfoCircleFill />
              </div>
              <div>Bạn chỉ được hoàn tiền huỷ khoá học trong vòng 7 ngày kể từ ngày đăng ký thành công.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
              <Button
                variant="contained"
                size="medium"
                style={{ height: '36px', marginTop: '8px', minWidth: '110px', backgroundColor: '#909090' }}
                onClick={() => {
                  setIsOpenModal(false);
                }}
              >
                <Typography style={{ fontWeight: 600 }} variant="button">
                  Hủy
                </Typography>
              </Button>
              <Button
                variant="contained"
                size="medium"
                style={{ height: '36px', marginTop: '8px', minWidth: '110px' }}
                onClick={() => {
                  enrollApi.saveEnroll1(
                    {
                      studentId: userTmp.studentId,
                      courseId: Number(courseId),
                    },
                    (err, res) => {
                      if (res) {
                        setIsOpenModal(false);
                        notifySuccess();
                        setTimeout(() => navigate('/my-course'), 2000);
                      } else {
                        notifyErorr(err?.message);
                      }
                    },
                  );
                }}
              >
                <Typography style={{ fontWeight: 600 }} variant="button">
                  Xác nhận
                </Typography>
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
      {/* <TeacherModal
        isOpen={isOpenTeacherModal}
        onClose={() => setIsOpenTeacherModal(false)}
        teacherRating={teacherRating}
        teacher={teacher}
      /> */}
    </>
  );
};

export default OverviewCourse;
