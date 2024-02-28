import moment from 'moment/moment';
import HeaderQuiz from './components/Header';
import { Box, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, Typography } from '@mui/material';
import { Container } from 'reactstrap';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {
  EnrollControllerApi,
  LessonControllerApi,
  QuizControllerApi,
  UsedQuestionControllerApi,
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import { Controller, useForm } from 'react-hook-form';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import './Quiz.css';
import { PATTERN_DATE, formatDate } from '../../constant';

const questionApi = new UsedQuestionControllerApi(ApiClientSingleton.getInstance());
const quizApi = new QuizControllerApi(ApiClientSingleton.getInstance());
const enrollApi = new EnrollControllerApi(ApiClientSingleton.getInstance());
const lessonApi = new LessonControllerApi(ApiClientSingleton.getInstance());
function Quizz() {
  const { courseId, lessonId, id, syllabusId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState();
  const [lesson, setLesson] = useState();
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [result, setResult] = useState();
  const notifyError = (msg) => {
    toast.error(msg, {
      position: 'top-center',
    });
  };
  const [user, setUser] = useState();
  const userStr = Cookies.get('user');
  const startTime = new Date();

  useEffect(() => {
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      navigate('/login');
    }
  }, [userStr]);

  useEffect(() => {
    quizApi.findQuizById(id, (err, res) => {
      if (res) {
        setQuiz(res);
      }
    });
    questionApi.findAllUsedQuestionByDoQuizId(id, (err, res) => {
      if (res) {
        console.log(res);
        setQuestions(res);
      }
    });
    lessonApi.getLessonById(lessonId, (err, res) => {
      if (res) {
        setLesson(res);
      }
    });
  }, [id]);
  const onSubmitQuiz = (data) => {
    if (user) {
      enrollApi.findEnrollByStudentIdAndCourse(user.studentId, courseId, (err, res) => {
        if (res) {
          const enrollId = res?.id;
          // đán án thực hiện
          const params = {
            quizId: id,
            enrollId: enrollId,
            startTime: moment(startTime).format('YYYY-MM-DDTHH:mm:ss.SSS'),
            doQuizDetailRequests: questions
              ?.map((item) => {
                if (data[`${item.id}`])
                  return {
                    questionId: item.id,
                    answerIds: [Number(data[`${item.id}`])],
                  };
              })
              ?.filter((item) => item),
          };
          quizApi.doQuiz(params, (err, res) => {
            if (res.code === 200) {
              console.log(res?.responseObject);
              setResult(res?.responseObject);
              setIsOpenModal(true);
            } else {
              notifyError(res.message);
            }
          });
        } else {
          notifyError(err?.message);
        }
      });
    }
  };
  return (
    <>
      <HeaderQuiz
        name={quiz?.title}
        timeMinute={quiz?.duration}
        point={quiz?.passScore}
        due={quiz ? moment(quiz?.dateCreate).add(quiz?.dateRange, 'days').format('DD/MM/YYYY') : undefined}
        onAutoSubmit={handleSubmit(onSubmitQuiz)}
        lesson={lesson}
      />
      <Container className="my-4">
        <form onSubmit={handleSubmit(onSubmitQuiz)}>
          <FormControl>
            {questions?.map((question, index) => (
              <div key={question.id}>
                <FormLabel style={{ color: '#1f1f1f' }} id="demo-radio-buttons-group-label">
                  <div
                    className="ql-editor"
                    style={{
                      padding: 0,
                      wordBreak: 'break-word',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <strong>{index + 1}: </strong>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: question.content || '' }} />
                  </div>
                </FormLabel>
                <Container>
                  <Controller
                    name={`${question.id}`}
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Đáp án không được để trống' }}
                    render={({ field }) => (
                      <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group" {...field}>
                        {question?.usedAnswers?.map((option) => (
                          <FormControlLabel
                            key={option.id}
                            value={option.id}
                            control={<Radio />}
                            label={
                              <div className="cus-option" dangerouslySetInnerHTML={{ __html: option.content || '' }} />
                            }
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />
                  {errors[question.id] && <p style={{ color: 'red' }}>{errors[question.id].message}</p>}
                </Container>
              </div>
            ))}
          </FormControl>
          <br />
          <button
            type="submit"
            style={{
              padding: '8px 20px',
              backgroundColor: '#00419e',
              color: '#fff',
              borderRadius: '6px',
            }}
          >
            Nộp bài
          </button>
        </form>
        <Modal open={isOpenModal}>
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
              p: 4,
              borderRadius: '8px',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Kết quả
            </Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: result?.resultStatus === 'PASS' ? '#2eb610' : '#ef3636',
                }}
              >
                <div>{result?.resultStatus ? <CheckCircleIcon /> : <CancelIcon />}</div>
                <div>
                  {result?.resultStatus === 'PASS' ? 'Hoàn thành' : 'Chưa hoàn thành'} - Điểm: {result?.lastPoint || 0}{' '}
                  điểm
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {/* <div>Thời gian bắt đầu: {result?.startTime ? moment(result?.startTime).format('HH:mm:ss') : '--'}</div> */}
                <div>
                  Thời gian nộp bài:{' '}
                  {result?.submitTime ? formatDate(result?.submitTime, PATTERN_DATE.HH_MM_SS_DD_MM_YYYY) : '--'}
                </div>
              </div>
            </div>
            <div className="text-end">
              <button
                onClick={() => {
                  setIsOpenModal(false);
                  navigate(`/courses/${courseId}/learn/${syllabusId}/${lessonId}/Quiz/${id}`);
                }}
                className="btn btn-outline-primary mt-3"
              >
                Xác nhận
              </button>
            </div>
          </Box>
        </Modal>
      </Container>
    </>
  );
}

export default Quizz;
