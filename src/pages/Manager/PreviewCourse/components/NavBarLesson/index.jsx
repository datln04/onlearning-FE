import { Link, useLocation, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import QuizIcon from '@mui/icons-material/Quiz';
import LessonControllerApi from '../../../../../api/generated/generate-api/api/LessonControllerApi';
import ApiClientSingleton from '../../../../../api/apiClientImpl';
import { fetchData } from '../../../../../services/AppService';
import Cookies from 'js-cookie';
import {
  QuizControllerApi,
  ResourceControllerApi,
  SyllabusControllerApi,
} from '../../../../../api/generated/generate-api';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '20px',
  margin: '5px',
  padding: ' 0',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '&:hover': {
    backgroundColor: 'hsla(0, 0%, 99%, 0.8)',
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(({ theme }) => ({
  backgroundColor: 'rgba(145, 158, 171, 0.08);',
  borderRadius: '20px',

  padding: '10px',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  '&:focus': {
    backgroundColor: 'rgba(82, 84, 86, 0.16)',
  },
  '&:hover': {
    backgroundColor: 'rgba(123, 134, 146, 0.16)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  margin: '5px',
  padding: '10px',
  borderRadius: '20px',
  backgroundColor: 'rgba(183, 187, 190, 0.08);',
  padding: theme.spacing(2),
}));

const lessonApi = new LessonControllerApi(ApiClientSingleton.getInstance());
const resourceApi = new ResourceControllerApi(ApiClientSingleton.getInstance());
const syllabusApi = new SyllabusControllerApi(ApiClientSingleton.getInstance());
const quizApi = new QuizControllerApi(ApiClientSingleton.getInstance());

function NavBarLesson(props) {
  const { courseId } = props;
  const { subjectId, syllabusId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [expanded, setExpanded] = useState();
  const [lessonId, setLessonId] = useState();
  const [resources, setResources] = useState([]);
  const [quiz, setQuiz] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setLessonId(panel);
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    fetchData('/lesson/by-syllabus?syllabus_id=' + syllabusId, token).then((resp) => {
      if (resp) {
        setLessons(resp);
      }
    });
  }, []);

  useEffect(() => {
    if (lessonId) {
      resourceApi.getResourceByLesson(lessonId, (err, res) => {
        if (res) {
          setResources(res);
        }
      });
      quizApi.findAllQuizByLessonId(lessonId, { status: 'Active' }, (err, res) => {
        setQuiz(res);
      });
    }
  }, [lessonId]);

  //Custom accordion

  return (
    <>
      <div>
        {lessons?.map((data) => {
          return (
            <>
              <Accordion key={data.id} expanded={expanded === data.id} onChange={handleChange(data.id)}>
                <AccordionSummary className aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>{data.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-start gap-2">
                      {data?.type === 'VIDEO' ? (
                        <PlayCircleOutlineIcon />
                      ) : data?.type === 'READING' ? (
                        <CodeIcon />
                      ) : (
                        ''
                      )}
                      <Link
                        to={`/subject/${subjectId}/course/${courseId}/syllabus/preview/${syllabusId}/${data?.id}/${data?.type}`}
                        style={{ color: 'black' }}
                      >
                        <strong>{data?.type}</strong>: {data.name}
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex flex-column gap-3">
                    {quiz?.map((item) => {
                      return (
                        <div className="d-flex align-items-start gap-2">
                          <QuizIcon />
                          <Link
                            to={`/subject/${subjectId}/course/${courseId}/syllabus/preview/${syllabusId}/${data.id}/Quiz/${item.id}`}
                            style={{ color: 'black' }}
                          >
                            <strong>Trắc Nghiệm</strong>: {item.title}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
      </div>
    </>
  );
}

export default NavBarLesson;
