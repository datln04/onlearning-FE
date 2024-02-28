import { useNavigate, useParams } from 'react-router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  EnrollControllerApi,
  LessonControllerApi,
  QuizControllerApi,
  QuizResultQuizView,
  ResourceControllerApi,
  ResultQuizControllerApi,
  SystemConfigControllerApi,
  UsedQuestionControllerApi,
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import LearnReading from './components/LearnReading';
import LearnVideo from './components/LearnVideo';
import ReactPlayer from 'react-player';
import { Divider, IconButton, Typography } from '@mui/material';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import 'react-quill/dist/quill.snow.css';
import './index.scss';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PATTERN_DATE, formatDate } from '../../constant';
import TimerIcon from '@mui/icons-material/Timer';
import ModalPreviewQuiz from '../../components/ModalPreviewQuiz';

const resultQuizApi = new ResultQuizControllerApi(ApiClientSingleton.getInstance());
const resourceApi = new ResourceControllerApi(ApiClientSingleton.getInstance());
const lessonApi = new LessonControllerApi(ApiClientSingleton.getInstance());
const quizApi = new QuizControllerApi(ApiClientSingleton.getInstance());
const quizResultApi = new ResultQuizControllerApi(ApiClientSingleton.getInstance());
const usedQuestionApi = new UsedQuestionControllerApi(ApiClientSingleton.getInstance());
const enrollApi = new EnrollControllerApi(ApiClientSingleton.getInstance());
const systemConfigApi = new SystemConfigControllerApi(ApiClientSingleton.getInstance());

function DetailLesson() {
  const { lessonId, type, id, courseId, syllabusId } = useParams();
  const [resources, setResources] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [quizResult, setQuizResult] = useState();
  const [lesson, setLesson] = useState();
  const [results, setResults] = useState([]);
  const [resultSelect, setResultSelect] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [enroll, setEnroll] = useState();

  const user = JSON.parse(Cookies.get('user'));
  const navigate = useNavigate();
  useLayoutEffect(() => {
    enrollApi.findEnrollByStudentIdAndCourse(user.studentId, courseId, (err, res) => {
      if (res) {
        setEnroll(res)
      }
    });

    lessonApi.getLessonById(lessonId, (err, res) => {
      if (res) {
        setLesson(res);
      }
    });

    if (type === 'Quiz') {
      quizApi.findQuizById(id, (err, result) => {
        setQuiz(result);
        quizResultApi.findAllByStudentId(user?.studentId, id, (err, res) => {
          if (res) {
            setQuizResult(res);
          }
        });
      });

      resultQuizApi.findAllByStudentId(user?.studentId, id, (err, res) => {
        if (res) {
          setResults(res);
        }
      });
    } else {
      resourceApi.getResourceByLesson(lessonId, (err, res) => {
        if (res) {
          setResources(res);
        }
      });
    }
  }, [lessonId, type, id]);

  const resultMax = () => {
    if (quizResult) {
      quizResult?.sort((q1, q2) => q2?.lastPoint - q1?.lastPoint);
      return quizResult[0];
    }
    return undefined;
  };
  const checkTimeQuiz = () => {
    const now = new Date().getTime();
    const dateTo = new Date(moment(enroll?.requestDate).add(quiz?.dateRange, 'weeks').format('YYYY-MM-DD')).getTime();
    if (now > dateTo) {
      return false;
    }
    return true;
  };
  const handleStartQuiz = () => {
    usedQuestionApi.checkCanDoQuiz(id, (err, res) => {
      if (res.code === 200) {
        navigate(`/courses/${courseId}/learn/${syllabusId}/${lessonId}/Quiz/${id}/start`);
      } else {
        toast.error(res?.message, { position: 'top-center' });
      }
    });
  };

  const [countdownTime, setCountdownTime] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  // Function to start the timer
  const startTimer = (duration) => {
    setCountdownTime(duration);
    setTimerActive(true);
  };

  // Function to stop the timer
  const stopTimer = () => {
    setCountdownTime(null)
    setTimerActive(false);
  };

  // Fetching the initial countdown time from API
  useEffect(() => {
    if (id) {
      usedQuestionApi.checkCanDoQuiz(id, (err, res) => {
        if (res && res.code === 400) {
          const message = res?.message?.split(' ');
          if (message?.length > 0) {
            const time = message[2]; // Assuming time is at message[2]
            const timestamp = time.split(':').map(Number);
            if (timestamp?.length > 1) {
              startTimer(timestamp[0] * 60 + timestamp[1]);
            }
          }
        } else {
          stopTimer()
        }
      });
    }
  }, [id]);

  // Countdown logic
  useEffect(() => {
    let interval;

    if (timerActive && countdownTime > 0) {
      interval = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (countdownTime === 0) {
      stopTimer();
    }

    return () => clearInterval(interval);
  }, [timerActive, countdownTime]);

  const formatTime = () => {
    if (countdownTime != null) {
      const minutes = Math.floor(countdownTime / 60);
      const seconds = countdownTime % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return '00:00';
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex ">
        <Typography variant="h5" gutterBottom>
          {type === 'Quiz' ? (
            quiz.title
          ) : (
            <>
              {lesson?.name}: <span style={{ color: '#495057' }}>{lesson?.description}</span>
            </>
          )}
        </Typography>
      </div>
      {type === 'VIDEO' ? (
        <div className="justify-content-center">
          {lesson?.url ? (
            <>
              <div className="ql-editor cus-video" style={{ padding: 0, marginLeft: '20px', wordBreak: 'break-word' }}>
                <div dangerouslySetInnerHTML={{ __html: lesson?.content || '' }} />
              </div>

              {/* <LearnVideo url={lesson?.url} /> */}
              <video key={lesson?.id} controls width={780} height={420}>
                <source src={lesson?.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </>
          ) : (
            <div className="ql-editor cus-video" style={{ padding: 0, marginLeft: '20px', wordBreak: 'break-word' }}>
              <div dangerouslySetInnerHTML={{ __html: lesson?.content || '' }} />
            </div>
          )}
        </div>
      ) : type === 'READING' ? (
        <LearnReading content={lesson?.content} />
      ) : type === 'Quiz' ? (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Gửi bài tập của bạn
          </Typography>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-4">
              <div>
                <strong>Ngày đến hạn:</strong>{' '}
                {moment(quiz?.dateCreate).add(quiz?.dateRange, 'days').format('DD/MM/YYYY')}
              </div>
              <div>
                <strong>Số lần làm lại:</strong> {quizResult?.length || 0} / {quiz.allowAttempt}
              </div>
              <div>
                <strong>Điểm:</strong> {resultMax() ? resultMax()?.lastPoint.toFixed(2) : ''} điểm{' - '}
                {resultMax() ? (resultMax()?.resultStatus === 'PASS' ? 'Đạt' : 'Không đạt') : ''}
              </div>
            </div>
            <div>
              {countdownTime != null ? (
                <>
                  <div className="d-flex align-items-center" style={{ color: '#1d7c50' }}>
                    <Typography variant="subtitle1">
                      <TimerIcon />
                      {formatTime()} Còn lại
                    </Typography>
                  </div>
                </>
              ) : (
                checkTimeQuiz() ? (
                  <div
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#00419e',
                      color: '#fff',
                      borderRadius: '6px',
                    }}
                    onClick={handleStartQuiz}
                  >
                    Bắt đầu làm bài
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>

          </div>
          <Divider className="py-2" />
          {results?.length > 0 ? (
            <div style={{ marginTop: '16px' }}>
              <div className="row justify-content-center">
                <div className="col-3">
                  <Typography variant="subtitle1">Ngày nộp</Typography>
                </div>
                <div className="col-2">
                  <Typography variant="subtitle1">Điểm</Typography>
                </div>
                <div className="col-3">
                  <Typography variant="subtitle1">Trạng thái</Typography>
                </div>
                <div className="col-2">
                  <Typography variant="subtitle1">Xem</Typography>
                </div>
              </div>
              <div>
                {results?.map((data) => {
                  return (
                    <div
                      className="row align-items-center justify-content-center py-3"
                      style={{
                        border: '1px solid #e5e7e8',
                      }}
                    >
                      <div className="col-3">
                        <Typography variant="subtitle1">
                          {formatDate(data?.submitTime, PATTERN_DATE.HH_MM_SS_DD_MM_YYYY)}
                        </Typography>
                      </div>
                      <div className="col-2">
                        <Typography variant="subtitle1">{data?.lastPoint?.toFixed(2)}</Typography>
                      </div>
                      <div className="col-3">
                        <Typography variant="subtitle1">
                          {data?.resultStatus === 'PASS' ? 'Đạt' : 'Không đạt'}
                        </Typography>
                      </div>
                      <div className="col-2">
                        <IconButton
                          onClick={() => {
                            setIsOpenModal(true);
                            setResultSelect(data);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}


      {type === 'Quiz' ? (<></>) : (<div className='my-1'>
        {resources?.map((data) => {
          if (data.resourceType === 'READING') {
            if (data.content.startsWith('http')) {
              return (
                <div className="mt-3 d-flex align-items-center gap-2">
                  <div>
                    <CodeIcon /> Link tài liệu:{' '}
                  </div>
                  <div>
                    <a href={data.content} target="_blank" rel="noopener noreferrer" download>
                      {data.content}
                    </a>
                  </div>
                </div>
              );
            }
            return <div>{data.content}</div>;
          }
          return (
            <div className="mt-3 d-flex align-items-center gap-2">
              <div>
                <CodeIcon /> Link tài liệu:{' '}
              </div>
              <div>
                <a href={data.content} target="_blank" rel="noopener noreferrer" download>
                  {data.name}
                </a>
              </div>
            </div>
          );
        })}
      </div>)}

      <ModalPreviewQuiz
        resultInfo={resultSelect}
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      />
    </>
  );
}

export default DetailLesson;
