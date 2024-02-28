/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  TablePagination,
  Divider,
  Tooltip,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import { useCallback } from 'react';
import QuestionAlternativeModal from '../../ManageCourses/Quiz/ListCourseQuestion/QuestionAlternativeModal';
import './ListQuestionBank.css';
import CustomBreadcrumbs from '../../Breadcrumbs';

export default function ListQuestionBank() {
  const urlParams = new URLSearchParams(window.location.search);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Track the selected question for editing
  const [subjectItem, setSubjectItem] = useState(null);
  const [course, setCourse] = useState();
  const [courseItem, setCourseItem] = useState();
  const [subject, setSubject] = useState();
  const [subjectCheck, setSubjectCheck] = useState(false);
  const [lesson, setLesson] = useState();
  const [lessonItem, setLessonItem] = useState();
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/question-banks`,
      label: `Ngân hàng câu hỏi`,
    },
  ];

  function sortAnswersById(questions) {
    for (const question of questions) {
      question.answers.sort((a, b) => a.id - b.id);
      if (question.content.indexOf('https://') === 0) {
        question.type = 'image';
      }
    }
  }

  useEffect(() => {
    // Replace this with your actual data fetching logic for questions
    // Function to get the value of a specific query parameter from the URL
    const getQueryParamValue = (param) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    };

    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData(`/subject/subjects`, token).then((resp) => {
          setSubjectCheck(true);
        });

        const userTmp = JSON.parse(Cookies.get('user'));
        if (userTmp !== null && token !== null) {
          // const courseData =
          fetchData(`/course/byTeacherId?teacher-id=${userTmp?.teacherId}`, token)
            .then((resp) => {
              if (resp && resp.length > 0) {
                const data = new Map();
                for (const obj of resp) {
                  data.set(obj.subject, obj.subject);
                }

                const unique = [...data.values()];

                const key = 'name';
                const arrayUniqueByKey = [...new Map(unique.map((item) => [item[key], item])).values()];

                setSubject(arrayUniqueByKey);
                // Get the value of the 'yourQueryParam' after the page reloads
                const subjectId = getQueryParamValue('subjectId');
                const courseId = getQueryParamValue('courseId');
                const lessonId = getQueryParamValue('lessonId');
                setSubjectItem(subjectId ? subjectId : arrayUniqueByKey[0]?.id);
                fetchData(`/course/bySubjectId?subject-id=${subjectId ? subjectId : arrayUniqueByKey[0]?.id}`, token)
                  .then((resp) => {
                    if (resp && resp.length > 0) {
                      let data = resp?.filter((course) => course.teacher.id === userTmp?.teacherId);
                      setCourse(data);
                      setCourseItem(courseId ? courseId : data[0]?.id);
                      fetchData(`/lesson/byCourseId?course_id=${courseId ? courseId : data[0]?.id}`, token)
                        .then((resp) => {
                          if (resp && resp.length > 0) {
                            setLesson(resp);
                            setLessonItem(lessonId ? lessonId : resp[0]?.id);
                            fetchData(`/question/byLessonId?lesson_id=${lessonId ? lessonId : resp[0]?.id}`, token)
                              .then((resp) => {
                                if (resp && resp.length > 0) {
                                  sortAnswersById(resp);
                                  setQuestions(resp);
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const openModal = (question) => {
    setSelectedQuestion(question); // Set the selected question for editing
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedQuestion(null); // Clear the selected question
    setIsModalOpen(false);
  };

  const handleSave = (newQuestion) => {
    const token = Cookies.get('token');
    if (selectedQuestion) {
      // Editing an existing question
      const indexChange = newQuestion?.answers.findIndex((i) => i.id === newQuestion.correctAnswerId);
      if (indexChange !== -1) {
        // If the object with the specified ID is found in the answerBank
        const updatedAnswerBank = newQuestion.answers.map((item, index) => {
          if (index === indexChange) {
            // Create a new object for each item in the answerBank
            return {
              ...item,
              isCorrect: true, // Set isCorrect to false for all items
              // Add other updated properties here if needed
            };
          } else {
            return {
              ...item,
              isCorrect: false,
            };
          }
        });

        newQuestion.answers = updatedAnswerBank; // Update the answerBank in newQuestion
      }

      const body = {
        id: newQuestion.id,
        content: newQuestion.content,
        courseId: courseItem,
        lessonId: lessonItem,
        answers: newQuestion.answers,
      };
      // console.log(body);
      postData('/question/save', body, token)
        .then((resp) => {
          if (resp) {
            // Set or update the desired query parameter
            urlParams.set('subjectId', subjectItem);
            urlParams.set('courseId', courseItem);
            urlParams.set('lessonId', lessonItem);

            // Replace the current URL with the updated URL containing the new query parameter
            const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
            window.history.replaceState({}, '', newUrl);
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
      // setQuestions(updatedQuestions);
    } else {
      // Adding a new question
      // remove answer id to 0 for adding purpose
      const updatedItems = newQuestion.answers.map((item) => ({ ...item, id: 0 }));
      const body = {
        id: 0,
        content: newQuestion.content,
        courseId: courseItem,
        lessonId: lessonItem,
        answers: updatedItems,
      };
      // console.log(body);
      postData('/question/save', body, token)
        .then((resp) => {
          if (resp) {
            // Set or update the desired query parameter
            urlParams.set('subjectId', subjectItem);
            urlParams.set('courseId', courseItem);
            urlParams.set('lessonId', lessonItem);

            // Replace the current URL with the updated URL containing the new query parameter
            const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
            window.history.replaceState({}, '', newUrl);
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    }
    closeModal();
  };

  const handleOnChangeSubject = useCallback((id) => {
    const token = Cookies.get('token');
    setQuestions(null);
    setSubjectItem(id);
    if (token) {
      fetchData(`/course/bySubjectId?subject-id=${id}`, token)
        .then((resp) => {
          if (resp && resp.length > 0) {
            setCourse(resp);
            setCourseItem(resp[0]?.id);
            fetchData(`/lesson/byCourseId?course_id=${resp[0]?.id}`, token)
              .then((resp) => {
                if (resp && resp.length > 0) {
                  setLesson(resp);
                  setLessonItem(resp[0]?.id);
                  fetchData(`/question/byLessonId?lesson_id=${resp[0]?.id}`, token)
                    .then((resp) => {
                      if (resp && resp.length > 0) {
                        sortAnswersById(resp);
                        setQuestions(resp);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            setCourse(resp);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleOnChangeLesson = useCallback(
    (id) => {
      setQuestions(null);
      const token = Cookies.get('token');
      setLessonItem(id);
      if (token) {
        fetchData(`/question/byLessonId?lesson_id=${id}`, token)
          .then((resp) => {
            if (resp) {
              setQuestions(resp);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [courseItem],
  );

  const handleOnChangeCourse = useCallback(
    (id) => {
      setQuestions(null);
      const token = Cookies.get('token');
      setCourseItem(id);
      if (token) {
        fetchData(`/lesson/byCourseId?course_id=${id}`, token)
          .then((resp) => {
            if (resp && resp.length > 0) {
              setLesson(resp);
              if (resp[0].id) {
                setLessonItem(resp[0]?.id);
                fetchData(`/question/byLessonId?lesson_id=${resp[0]?.id}`, token)
                  .then((resp) => {
                    if (resp && resp.length > 0) {
                      sortAnswersById(resp);
                      setQuestions(resp);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            } else {
              setLesson(resp);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [subjectItem],
  );

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questions?.length) : 0;

  return (
    subjectCheck && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 'max-content' }}>
        <div className="row mb-3">
          <div className="col-8">
            <h4 style={{ fontWeight: 'bold' }}>Ngân hàng câu hỏi</h4>
            <CustomBreadcrumbs items={breadcrumbItems} />
          </div>
        </div>
        <div className="row">
          <div style={{ padding: '20px' }} className="col-4">
            <Typography style={{ fontWeight: 700 }} variant="h5">
              Chọn danh sách câu hỏi:
            </Typography>
            <Typography style={{ fontWeight: 700, color: '#9ba5ae', fontSize: 15 }} variant="caption">
              Theo chủ đề • khoá học • bài học
            </Typography>
          </div>
          <div className="col-8">
            <Paper
              sx={{
                marginBottom: '20px',
                padding: '10px 40px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
              }}
            >
              <div style={{ marginTop: '20px' }}>
                {subject && subject?.length > 0 ? (
                  <div>
                    <InputLabel style={{ fontWeight: 700, color: '#323232', marginBottom: '5px' }} htmlFor="subject">
                      Chủ đề
                    </InputLabel>
                    <Select
                      id="subject"
                      value={subjectItem}
                      onChange={(e) => handleOnChangeSubject(e.target.value)}
                      fullWidth
                      style={{ fontWeight: 700, color: '#5a6065' }}
                    >
                      {subject.map((s) => (
                        <MenuItem style={{ fontWeight: 700, color: '#5a6065' }} key={s.id} value={s.id}>
                          {s.name}
                        </MenuItem>
                      ))}
                    </Select>

                    {course && course?.length > 0 ? (
                      <div style={{ marginTop: '20px' }}>
                        <div>
                          <InputLabel
                            style={{ fontWeight: 700, color: '#323232', marginBottom: '5px' }}
                            htmlFor="subject"
                          >
                            Khoá học
                          </InputLabel>
                          <Select
                            id="course"
                            value={courseItem}
                            label="Khóa học"
                            onChange={(e) => {
                              handleOnChangeCourse(e.target.value);
                            }}
                            fullWidth
                            style={{ fontWeight: 700, color: '#5a6065' }}
                          >
                            {course.map((s) => (
                              <MenuItem style={{ fontWeight: 700, color: '#5a6065' }} key={s.id} value={s.id}>
                                {s.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    ) : (
                      <div style={{ margin: '20px 0' }}>
                        <InputLabel
                          style={{ fontWeight: 700, color: '#323232', marginBottom: '5px' }}
                          htmlFor="subject"
                        >
                          Khóa học
                        </InputLabel>
                        <div style={{ backgroundColor: '#f4f6f8' }} className="p-3 text-center">
                          <h5>Chưa có khóa học cho chủ đề này</h5>
                        </div>
                      </div>
                    )}

                    {lesson && lesson?.length > 0 ? (
                      <>
                        <div style={{ marginTop: '20px' }}>
                          <div>
                            <InputLabel
                              style={{ fontWeight: 700, color: '#323232', marginBottom: '5px' }}
                              htmlFor="subject"
                            >
                              Bài học
                            </InputLabel>
                            <Select
                              id="lesson"
                              value={lessonItem}
                              label="Bài học"
                              onChange={(e) => handleOnChangeLesson(e.target.value)}
                              fullWidth
                              style={{ fontWeight: 700, color: '#5a6065' }}
                            >
                              {lesson.map((s) => (
                                <MenuItem style={{ fontWeight: 700, color: '#5a6065' }} key={s.id} value={s.id}>
                                  {s.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </div>
                        <div className="text-end" style={{ margin: '20px 0' }}>
                          <button
                            style={{ backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
                            className="btn"
                            onClick={() => openModal(null)}
                          >
                            Tạo mới
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ margin: '20px 0' }}>
                          <InputLabel
                            style={{ fontWeight: 700, color: '#323232', marginBottom: '5px' }}
                            htmlFor="subject"
                          >
                            Bài học
                          </InputLabel>
                          <div style={{ backgroundColor: '#f4f6f8' }} className="p-3 text-center">
                            <h5>Chưa có bài học cho khóa học này</h5>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <div style={{ margin: '20px 0' }}>
                      <InputLabel style={{ fontWeight: 700, color: '#323232', marginBottom: '5px' }} htmlFor="subject">
                        Chủ đề
                      </InputLabel>
                      <div style={{ backgroundColor: '#f4f6f8' }} className="p-3 text-center">
                        <h5>Hiện tại bạn chưa có khóa học nào.</h5>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Paper>
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
          {questions && questions?.length > 0 ? (
            <>
              <h4 className="text-center" style={{ fontWeight: 700 }}>
                Danh sách câu hỏi
              </h4>
              <Divider />
              <Table style={{ marginTop: '20px' }}>
                <TableHead style={{ backgroundColor: '#f4f6f8' }}>
                  <TableRow>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Nội dung câu hỏi</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((question, index) => (
                    <>
                      <TableRow key={question.id} className="list-question-bank">
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                          {index + (page * rowsPerPage, page * rowsPerPage) + 1}
                        </TableCell>
                        {question?.type ? (
                          <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                            <img src={question.content} alt="img" width={200} height={200} />
                          </TableCell>
                        ) : (
                          <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                            <div dangerouslySetInnerHTML={{ __html: question?.content }}></div>
                          </TableCell>
                        )}
                        <TableCell width={'10%'} style={{ fontWeight: 600, color: '#686f77' }}>
                          <Tooltip title="Chỉnh sửa">
                            <button
                              className="btn"
                              style={{ color: '#686f77', border: 0 }}
                              onClick={() => openModal(question)}
                            >
                              <EditRoundedIcon />
                            </button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                      {/* {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )} */}
                    </>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                labelRowsPerPage="Số hàng trên trang :"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={questions?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          ) : (
            <div className="text-center py-5">
              <h3 style={{ fontWeight: 700, color: 'grey' }}>Chưa có câu hỏi nào</h3>
            </div>
          )}
        </Paper>
        <QuestionAlternativeModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          onUpdate={handleSave}
          question={selectedQuestion} // Pass the selected question for editing
          subject={subjectItem}
          course={courseItem}
          lesson={lessonItem}
        />
      </div>
    )
  );
}
