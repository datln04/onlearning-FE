import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {
  LessonControllerApi,
  QuizControllerApi,
  QuizResultQuizView,
  ResourceControllerApi,
  ResultQuizControllerApi,
} from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import LearnReading from './components/LearnReading';
import LearnVideo from './components/LearnVideo';
import ReactPlayer from 'react-player';
import { Typography } from '@mui/material';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import 'react-quill/dist/quill.snow.css';
import './index.scss';
import Cookies from 'js-cookie';
import PreviewQuizz from './Quizz';
import SourceIcon from '@mui/icons-material/Source';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';

const resourceApi = new ResourceControllerApi(ApiClientSingleton.getInstance());
const lessonApi = new LessonControllerApi(ApiClientSingleton.getInstance());
const quizApi = new QuizControllerApi(ApiClientSingleton.getInstance());
const quizResultApi = new ResultQuizControllerApi(ApiClientSingleton.getInstance());
function PreviewLesson() {
  const { lessonId, type, id } = useParams();
  const [resources, setResources] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [quizResult, setQuizResult] = useState();
  const [lesson, setLesson] = useState();
  const user = JSON.parse(Cookies.get('user'));
  useEffect(() => {
    lessonApi.getLessonById(lessonId, (err, res) => {
      if (res) {
        setLesson(res);
      }
    });
    if (type === 'Quiz') {
      quizApi.findQuizById(id, (err, res) => {
        setQuiz(res);
      });
    } else {
      resourceApi.getResourceByLesson(lessonId, (err, res) => {
        if (res) {
          setResources(res);
        }
      });
    }
  }, [lessonId, type, id]);

  return (
    <>
      <div className="d-flex ">
        <div className="mb-2 border-bottom p-1" style={{ width: '100%' }}>
          <div className="row">
            {resources?.map((data) => { })}
            {type === 'Quiz' ? (
              <>
                <div className="col-8 d-flex">
                  <div
                    className=" mb-1"
                    style={{
                      backgroundColor: '#ffebc2',
                      color: '#ffab00',
                      width: '20%',
                      borderRadius: '20px',
                      marginRight: '10px',
                    }}
                  >
                    <Typography style={{ fontWeight: 700 }} className="text-center" variant="body1">
                      Kiểm tra
                    </Typography>
                  </div>

                  <Typography style={{ fontWeight: 700 }} variant="subtitle1">
                    {lesson?.name}
                  </Typography>
                </div>
              </>
            ) : type === 'VIDEO' ? (
              <>
                <div className="col-8 d-flex">
                  <div
                    className=" mb-1"
                    style={{
                      backgroundColor: '#d6f1e4',
                      color: '#25955c',
                      width: '20%',
                      borderRadius: '20px',
                      marginRight: '10px',
                    }}
                  >
                    <Typography style={{ fontWeight: 700 }} className="text-center" variant="body1">
                      Video
                    </Typography>
                  </div>

                  <Typography style={{ fontWeight: 700 }} variant="subtitle1">
                    {lesson?.name}
                  </Typography>
                </div>
                {resources?.map((data) => {
                  if (data.resourceType === 'READING') {
                    if (data.content.startsWith('http')) {
                      return (
                        <div className="col-4 d-flex justify-content-end ">
                          <a
                            className="btn"
                            style={{ backgroundColor: '#212b36', color: 'white' }}
                            href={data.content}
                            target="_blank"
                          >
                            <Typography style={{ fontWeight: 700 }} className="text-center" variant="body1">
                              Tài liệu <SourceIcon />
                            </Typography>
                          </a>
                        </div>
                      );
                    }
                    return <div>{data.content}</div>;
                  }
                  return (
                    <div className="col-4 d-flex justify-content-end ">
                      <a
                        className="btn"
                        style={{ backgroundColor: '#212b36', color: 'white' }}
                        href={data.content}
                        target="_blank"
                      >
                        <Typography style={{ fontWeight: 700 }} className="text-center" variant="body1">
                          Tài liệu <SourceIcon />
                        </Typography>
                      </a>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="col-8 d-flex">
                  <div
                    className=" mb-1"
                    style={{
                      backgroundColor: '#d6f4f9',
                      color: '#0d75a2',
                      width: '20%',
                      borderRadius: '20px',
                      marginRight: '10px',
                    }}
                  >
                    <Typography style={{ fontWeight: 700 }} className="text-center" variant="body1">
                      Bài đọc
                    </Typography>
                  </div>
                  <Typography style={{ fontWeight: 700 }} variant="subtitle1">
                    {lesson?.name}
                  </Typography>
                </div>
                {resources?.map((data) => {
                  if (data.resourceType === 'READING') {
                    if (data.content.startsWith('http')) {
                      return (
                        <div className="col-4 d-flex justify-content-end ">
                          <a
                            className="btn"
                            style={{ backgroundColor: '#212b36', color: 'white' }}
                            href={data.content}
                            target="_blank"
                          >
                            <Typography style={{ fontWeight: 700 }} className="text-center" variant="body1">
                              Tài liệu <SourceIcon />
                            </Typography>
                          </a>
                        </div>
                      );
                    }
                    return <div>{data.content}</div>;
                  }
                  return (
                    <div className="col-4 d-flex justify-content-end ">
                      <a
                        className="btn"
                        style={{ backgroundColor: '#212b36', color: 'white', borderRadius: '10px', padding: '2px 8px' }}
                        href={data.content}
                        target="_blank"
                      >
                        <Typography style={{ fontWeight: 700 }} className="text-center" variant="body1">
                          Tài liệu <SourceIcon />
                        </Typography>
                      </a>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      {type === 'VIDEO' ? (
        <div className="d-flex justify-content-center">
          {lesson?.url ? (
            <div className="p-2">
              <div dangerouslySetInnerHTML={{ __html: lesson?.content || '' }} />
              <video key={lesson?.id} controls width={780} height={420}>
                <source src={lesson?.url} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
              <div
                className="p-3"
                style={{ borderRadius: '20px', backgroundColor: '#f4f6f8', height: 110, overflow: 'auto' }}
              >
                <Typography style={{ fontWeight: 700 }}>Nội dung:</Typography>
                <p style={{ color: '#495057' }}>{lesson?.description}</p>
              </div>
            </div>
          ) : (
            <div className="ql-editor cus-video" style={{ padding: 0, marginLeft: '20px', wordBreak: 'break-word' }}>
              <div dangerouslySetInnerHTML={{ __html: lesson?.content || '' }} />
              <div
                className="p-3"
                style={{ borderRadius: '20px', backgroundColor: '#f4f6f8', height: 110, overflow: 'auto' }}
              >
                <Typography style={{ fontWeight: 700 }}>Nội dung:</Typography>
                <p style={{ color: '#495057' }}>{lesson?.description}</p>
              </div>
            </div>
          )}
        </div>
      ) : type === 'READING' ? (
        <LearnReading content={lesson?.content} />
      ) : type === 'Quiz' ? (
        <>
          <div style={{ overflow: 'auto', height: 550 }}>
            <PreviewQuizz />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default PreviewLesson;
