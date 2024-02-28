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
import LessonControllerApi from '../../../../api/generated/generate-api/api/LessonControllerApi';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import {
  QuizControllerApi,
  ResourceControllerApi,
  SyllabusControllerApi,
} from '../../../../api/generated/generate-api';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const lessonApi = new LessonControllerApi(ApiClientSingleton.getInstance());
const resourceApi = new ResourceControllerApi(ApiClientSingleton.getInstance());
const syllabusApi = new SyllabusControllerApi(ApiClientSingleton.getInstance());
const quizApi = new QuizControllerApi(ApiClientSingleton.getInstance());

function NavBarLesson({ courseId, syllabusId }) {
  const { lessonId } = useParams();
  const [lessons, setLessons] = useState([]);
  const localtion = useLocation();
  const [expanded, setExpanded] = useState(lessonId);
  const [lessonIdSelect, setLessonIdSelect] = useState(lessonId);
  const [resources, setResources] = useState([]);
  const [quiz, setQuiz] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setLessonIdSelect(panel);
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    lessonApi.findLessonBySyllabusId(syllabusId, (err, res) => {
      if (res) {
        setLessons(res.filter((lesson) => lesson.status === "true"));
      }
    });
  }, []);
  useEffect(() => {
    if (lessonIdSelect) {
      resourceApi.getResourceByLesson(lessonIdSelect, (err, res) => {
        if (res) {
          setResources(res);
        }
      });
      quizApi.findAllQuizByLessonId(lessonIdSelect, { status: 'Active' }, (err, res) => {
        setQuiz(res);
      });
    }
  }, [lessonId, lessonIdSelect]);
  return (
    <>
      <div>
        {lessons.map((data) => {
          return (
            <>
              <Accordion expanded={expanded === data.id} onChange={handleChange(data.id)}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
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
                      <Link style={{ color: 'black' }} to={`/courses/${courseId}/learn/${syllabusId}/${data?.id}/${data?.type}`}>
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
                          <Link style={{ color: 'black' }} to={`/courses/${courseId}/learn/${syllabusId}/${data.id}/Quiz/${item.id}`}>
                            <strong>Quiz</strong>: {item.title}
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
