import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  styled,
  Modal,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router';
import { CourseControllerApi, EnrollControllerApi, FeedbackControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment/moment';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { rating } from '../../../util/Constants';
import Swal from 'sweetalert2';

const CustomCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  padding: '20px',
  borderRadius: '20px',
  transition: 'box-shadow 0.3s ease', // Add transition for smooth hover effect
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add box-shadow on hover
    cursor: 'pointer',
  },
  boxShadow: 'rgba(117, 123, 129, 0.2) 0px 0px 2px 0px, rgba(88, 91, 94, 0.12) 0px 12px 24px -4px',
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  minWidth: '480px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  height: '35vw',
};

const ImageContainer = styled(CardMedia)(({ theme }) => ({
  width: '200px !important',
  height: '140px !important',
  borderRadius: '8px',
  marginRight: theme.spacing(2),
}));

const ContentContainer = styled(CardContent)(({ theme }) => ({
  flex: 1,
}));

const ButtonContainer = styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
}));

const TypographyWithPadding = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2), // Add more margin (padding) between Typography components
}));

const enrollApi = new EnrollControllerApi(ApiClientSingleton.getInstance());
const feedbackApi = new FeedbackControllerApi(ApiClientSingleton.getInstance());
const TabCourse = ({ courseData, courseAccount, type }) => {
  const navigate = useNavigate();
  const user = JSON.parse(Cookies.get('user'));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const isCompleted = type === 'đã hoàn thành';
  const [courses, setCourses] = useState([]);
  const [courseSelect, setCourseSelect] = useState();
  const [isReload, setIsReload] = useState(false);
  const [feedbackContent, setFeedContent] = useState([]);
  const [value, setValue] = useState('');
  const [enroll, setEnroll] = useState();
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    enrollApi.getCourseEnroll(
      { status: type === 'đã hoàn thành' ? 'DONE' : 'PROCESSING', page: 0, size: 20 },
      (err, res) => setCourses(res.contents),
    );
  }, [isReload]);

  useEffect(() => {
    enrollApi.findEnrollByStudentId(user?.studentId, (err, res) => {
      if (res) {
        console.log(res);
        setEnroll(res?.filter((data) => data?.course?.id === courseSelect?.id && data.status === 'DONE')[0]);
      }
    });
    if (isCompleted) {
      feedbackApi.getAllFeedContent((err, res) => {
        if (res) {
          setFeedContent(res);
        }
      });
      if (courseSelect) {
        feedbackApi.getAllFeedByStudentAndCourse(courseSelect?.id, (err, res) => {
          if (res) {
            setFeedback(res);
            res[0]?.feedbackDetails?.forEach((data) => {
              if (data?.type === 'text') {
                setValue(data?.text);
              }
            });
          }
        });
      }
    }
  }, [isCompleted, courseSelect]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalFeeback, setIsOpenModalFeeback] = useState(false);

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyErorr = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const onSubmitFeedback = (data) => {
    const feedbackReq = feedbackContent?.map((feedback) => {
      return {
        id: 0,
        feedContentId: feedback?.id,
        rate: data[feedback?.id],
        type: 'radio',
      };
    });
    if (value) {
      feedbackReq.push({
        id: 0,
        type: 'text',
        text: value,
      });
    }
    if (enroll) {
      feedbackApi.doFeedback(
        {
          content: 'Student feedback',
          status: true,
          enrollId: enroll.id,
          feedbackDetailRequests: feedbackReq,
        },
        (err, res) => {
          if (res?.code === 200) {
            notifySuccess('Gửi nhận xét thành công !');
            setIsOpenModalFeeback(false);
            setCourseSelect(undefined);
            setValue('');
            reset();
          } else {
            notifyErorr(`Gửi nhận xét thất bại: ${res?.message}`);
          }
        },
      );
    }
  };

  const getRate = (feedbacks, id) => {
    for (let i = 0; i < feedbacks?.length; i++) {
      if (feedbacks[i]?.feedContent?.id === id) {
        return feedbacks[i]?.rate;
      }
    }
    return undefined;
  };

  return (
    <div className="container">
      <ToastContainer />
      <div>
        {courses?.length > 0 ? (
          courses?.map((course) => {
            return (
              <div key={course.id} className="my-5">
                <CustomCard>
                  <ImageContainer component="img" image={course.image} alt={course.name} />
                  <ContentContainer>
                    <TypographyWithPadding variant="h6" component="div">
                      {course.name}
                    </TypographyWithPadding>
                    <TypographyWithPadding variant="body2" color="text.secondary">
                      {course.description}
                    </TypographyWithPadding>
                    <TypographyWithPadding variant="body2" color="text.secondary">
                      Thời gian kết thúc: {course?.finishDate ? moment(course?.finishDate).format('DD/MM/YYYY') : '--'}
                    </TypographyWithPadding>
                  </ContentContainer>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <ButtonContainer
                      className="rounded p-2"
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: 'rgb(25, 118, 210)' }}
                      onClick={() => {
                        navigate(`/courses/${course.id}`);
                      }}
                    >
                      Đi đến khóa học
                    </ButtonContainer>
                    <ButtonContainer
                      className="rounded p-2"
                      variant="contained"
                      color={isCompleted ? 'success' : 'error'}
                      style={{
                        backgroundColor: isCompleted ? 'rgb(46, 125, 50)' : 'rgb(211, 47, 47)',
                        color: '#fff',
                      }}
                      onClick={() => {
                        setCourseSelect(course);
                        if (isCompleted) {
                          setIsOpenModalFeeback(true);
                          setValue('');
                        } else {
                          setIsOpenModal(true);
                        }
                      }}
                    >
                      {isCompleted ? 'Nhận xét' : ' Hoàn tiền'}
                    </ButtonContainer>
                  </div>
                </CustomCard>
              </div>
            );
          })
        ) : (
          <>
            <div>
              <h2 style={{ textAlign: 'center' }}>Không có dữ liệu khóa học</h2>
            </div>
          </>
        )}
      </div>
      {/* // Modal Hoàn Tiền */}
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30vw',
            minWidth: '480px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '8px',
            height: '10vw',
          }}
        >
          <div
            style={{
              display: 'flex',
              height: '48px',
              backgroundColor: '#6DA743',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ color: '#fff', fontSize: '20px', margin: '0' }}>Hoàn tiền</p>
          </div>
          <Box sx={{ padding: 2 }}>
            <div>Xác nhận hoàn tiền khóa học: {courseSelect?.name} ?</div>
            <div style={{ color: '#327FF2' }}>
              <InfoIcon fontSize="small" />
              <Typography sx={{ mx: 2 }} variant="caption">
                Tài khoản sẽ bị hạn chế nếu hoàn tiền cùng khoá học quá 2 lần
              </Typography>
            </div>
          </Box>
          <div className="d-flex p-3 row justify-content-end ">
            <Button
              className="mx-2"
              variant="contained"
              size="medium"
              style={{ height: '36px', marginTop: '8px', minWidth: '110px', backgroundColor: '#909090', width: '30%' }}
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              <Typography style={{ fontWeight: 600 }} variant="button">
                Hủy
              </Typography>
            </Button>
            <Button
              className="mx-2"
              variant="contained"
              size="medium"
              style={{ height: '36px', marginTop: '8px', minWidth: '110px', width: '30%' }}
              onClick={() => {
                enrollApi.refundEnroll(
                  {
                    studentId: user?.studentId,
                    courseId: courseSelect?.id,
                  },
                  (err, res) => {
                    if (res?.code == 200) {
                      setIsReload(!isReload);
                      setIsOpenModal(false);
                      notifySuccess('Hoàn tiền thành công !');
                    } else {
                      notifyErorr(`Hoàn tiền thất bại: ${res?.message}`);
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
      </Modal>
      {/* //Modal Feedback */}
      <Modal
        open={isOpenModalFeeback}
        onClose={() => setIsOpenModalFeeback(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: 'flex',
              height: '48px',
              backgroundColor: '#6DA743',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ color: '#fff', fontSize: '20px', margin: '0' }}>
              {'Nhận xét'}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmitFeedback)}>
            <Box sx={{ padding: 2, height: '30vw', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {feedbackContent?.map((data) => {
                return (
                  <>
                    <div style={{ alignItems: 'start', gap: '16px', margin: '12px 0' }} className="row">
                      <div className="col-12">
                        <div style={{ whiteSpace: 'initial' }}>
                          {data?.content} <span style={{ color: 'red' }}>* </span>
                          {errors[data.id] && <span style={{ color: 'red' }}>Vui lòng chọn nhận xét</span>}
                        </div>
                      </div>
                      <div className="col-12 row d-flex">
                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                          {rating.map((r, index) => {
                            const count = index++;
                            const rate = getRate(feedback[0]?.feedbackDetails, data.id);
                            return (
                              <div className="col-4">
                                <FormControlLabel
                                  key={count}
                                  {...register(`${data.id}`, { required: true })}
                                  value={r.rate}
                                  checked={feedback?.length > 0 ? rate === r.rate : undefined}
                                  control={<Radio />}
                                  label={r.label}
                                />
                              </div>
                            );
                          })}

                          {/* <FormControlLabel
                            {...register(`${data.id}`, { required: true })}
                            value={2}
                            checked={feedback?.length > 0 ? 2 === getRate(feedback[0]?.feedbackDetails, 2) : undefined}
                            control={<Radio />}
                            label="2"
                          />
                          <FormControlLabel
                            {...register(`${data.id}`, { required: true })}
                            value={3}
                            checked={feedback?.length > 0 ? 3 === getRate(feedback[0]?.feedbackDetails, 3) : undefined}
                            control={<Radio />}
                            label="3"
                          />
                          <FormControlLabel
                            {...register(`${data.id}`, { required: true })}
                            checked={feedback?.length > 0 ? 4 === getRate(feedback[0]?.feedbackDetails, 4) : undefined}
                            value={4}
                            control={<Radio />}
                            label="4"
                          />
                          <FormControlLabel
                            {...register(`${data.id}`, { required: true })}
                            value={5}
                            checked={feedback?.length > 0 ? 5 === getRate(feedback[0]?.feedbackDetails, 5) : undefined}
                            control={<Radio />}
                            label="5"
                          /> */}
                        </RadioGroup>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
              <ReactQuill style={{ height: '240px' }} theme="snow" value={value} onChange={setValue} />
            </Box>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 0 24px 24px' }}>
              <Button
                variant="contained"
                size="medium"
                style={{ height: '36px', marginTop: '8px', minWidth: '110px', backgroundColor: '#909090' }}
                onClick={() => {
                  setIsOpenModalFeeback(false);
                }}
              >
                <Typography style={{ fontWeight: 600 }} variant="button">
                  Hủy
                </Typography>
              </Button>
              {feedback?.length > 0 ? (
                <></>
              ) : (
                <Button
                  variant="contained"
                  size="medium"
                  style={{ height: '36px', marginTop: '8px', minWidth: '110px' }}
                  type="submit"
                >
                  <Typography style={{ fontWeight: 600 }} variant="button">
                    Xác nhận
                  </Typography>
                </Button>
              )}
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default TabCourse;
