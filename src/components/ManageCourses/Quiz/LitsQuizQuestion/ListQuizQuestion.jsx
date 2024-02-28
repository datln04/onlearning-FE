import Cookies from 'js-cookie';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchData, postData } from '../../../../services/AppService';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import QuestionBankModal from '../ListCourseQuestion/QuestionBankModal';
import Swal from 'sweetalert2';
import CustomBreadcrumbs from '../../../Breadcrumbs';
import QuestionAlternativeModal from '../ListCourseQuestion/QuestionAlternativeModal';
import './../../../Questions/QuestionBanks/ListQuestionBank.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const ListQuizQuestion = () => {
  const { courseId, syllabusId, lessonId, quizId } = useParams();
  const [questions, setQuestions] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Track the selected question for editing
  const [data, setData] = useState();
  const [quiz, setQuiz] = useState();
  const navigate = useNavigate();
  const [course, setCourse] = useState();
  const [syllabus, setSyllabus] = useState();
  const [lesson, setLesson] = useState();

  function sortAnswersById(questions) {
    for (const question of questions) {
      question.usedAnswers.sort((a, b) => a.id - b.id);
      if (question.content.indexOf('https://') == 0) {
        question.type = 'image';
      }
    }
  }

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
      fetchData(`/lesson/byId?id=${lessonId}`, token).then((resp) => {
        if (resp) {
          setLesson(resp);
        }
      });

      fetchData(`/quiz/byId?quiz_id=${quizId}`, token).then((resp) => {
        setQuiz(resp);
        if (resp && resp.status === 'Active') {
          navigate(-1);
        } else {
          fetchData(`/used-question/by-quiz?quiz_id=${quizId}`, token).then((resp) => {
            if (resp) {
              sortAnswersById(resp);
              setQuestions(resp);
              console.log(resp);
            }
          });
        }
      });
    }
  }, [quizId]);

  const openModal = (question) => {
    const selectQuestion = question ? { ...question, answers: question.usedAnswers } : null;
    setSelectedQuestion(selectQuestion); // Set the selected question for editing
    setIsModalOpen(true);
  };

  const openBankModal = async () => {
    const token = Cookies.get('token');
    await fetchData(`/lesson/byCourseId?course_id=${courseId}`, token).then((resp) => {
      if (resp) {
        setData(resp);
      }
    });
    setIsBankModalOpen(true);
  };

  const closeBankModal = () => {
    setIsBankModalOpen(false);
  };

  const closeModal = () => {
    setSelectedQuestion(null); // Clear the selected question
    setIsModalOpen(false);
  };

  const handleSave = (newQuestion) => {
    const token = Cookies.get('token');

    if (token) {
      if (selectedQuestion) {
        // Editing an existing question
        const indexChange = newQuestion?.answers.findIndex((i) => i.id === newQuestion.correctAnswerId);
        if (indexChange !== -1) {
          // If the object with the specified ID is found in the answerBank
          const updatedAnswerBank = newQuestion.answers.map((item, index) => {
            if (index == indexChange) {
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

          newQuestion.usedAnswers = updatedAnswerBank; // Update the answerBank in newQuestion
        }

        const updatedQuestions = questions.map((question) =>
          question.id === selectedQuestion.id ? newQuestion : null,
        );
        const questionBody = updatedQuestions.find((tmp) => tmp && tmp);

        postData(`/used-answer/saveAll`, questionBody.answers, token).then((resp) => {
          if (resp) {
            const idList = resp.map((item) => item.id);
            const body = {
              id: questionBody.id,
              content: newQuestion?.content,
              quizId: quizId,
              usedAnswers: idList,
              status: true,
            };
            postData(`/used-question/save`, body, token).then((resp) => {
              if (resp) {
                window.location.reload();
              }
            });
          }
        });
      } else {
        const newAnswers = newQuestion?.answers.map(({ id, ...rest }) => rest);

        postData(`/used-answer/saveAll`, newAnswers, token).then((resp) => {
          if (resp) {
            const idList = resp.map((item) => item.id);
            const body = {
              content: newQuestion?.content,
              quizId: quizId,
              usedAnswers: idList,
              status: true,
            };
            postData(`/used-question/save`, body, token).then((resp) => {
              if (resp) {
                window.location.reload();
              }
            });
          }
        });
      }
    }
    closeModal();
  };

  const handleBankSave = async (items) => {
    console.log(items);
    const token = Cookies.get('token');
    if (token) {
      await items.forEach((element) => {
        const body = element?.answers.map((answer) => ({
          ...answer,
          id: 0,
        }));
        postData(`/used-answer/saveAll`, body, token).then((resp) => {
          if (resp) {
            const idList = resp.map((item) => item.id);
            const body = {
              content: element?.content,
              quizId: quizId,
              usedAnswers: idList,
              status: true,
            };
            postData(`/used-question/save`, body, token).then((resp) => {
              if (resp) {
                window.location.reload();
              }
            });
          }
        });
      });
    }
    closeBankModal();
  };

  const handleComplete = async () => {
    const token = Cookies.get('token');
    if (token) {
      fetchData(`/quiz/byId?quiz_id=${quizId}`, token).then((resp) => {
        if (resp) {
          const body = {
            ...resp,
            lessonId: resp.lesson.id,
            status: 'Active',
          };
          postData('/quiz/save', body, token).then((resp) => {
            if (resp) {
              navigate(-1);
            }
          });
        }
      });
    }
  };

  const showConfirmationDialog = () => {
    Swal.fire({
      title: 'Bạn muốn kích hoạt bài kiểm tra?',
      text: 'Sau khi kích hoạt bạn sẽ không thể sửa hoặc huỷ kích hoạt',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Xác nhận',
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "Yes, complete it!"
        handleComplete(); // Call the function to handle completion
      }
    });
  };

  const handleDeleteQuestion = async (id) => {
    await Swal.fire({
      title: 'Xác nhận xoá?',
      text: 'Bạn sẽ không thể hoàn tác sau khi xác nhận.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Xác nhận',
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "Yes, complete it!"
        const token = Cookies.get('token');
        if (token) {
          fetchData(`/used-question/disable?used_question_id=${id}`, token, 'DELETE')
            .then((resp) => {
              if (resp) {
                window.location.reload();
              }
            })
            .catch((err) => console.log(err));
        }
      }
    });
  };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questions.length) : 0;

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
      label: `Danh sách bài kiểm tra: ${lesson?.name}`,
    },
    {
      url:
        `/courses/` + courseId + `/syllabus/` + syllabusId + `/lessons/` + lessonId + `/quiz/` + quizId + `questions`,
      label: `${quiz?.title}`,
    },
  ];

  return (
    questions && (
      <div className="m-5">
        <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
          <div className="row mb-3">
            <div className="col-8">
              <h4 style={{ fontWeight: 'bold' }}>Danh sách câu hỏi</h4>
              <CustomBreadcrumbs items={breadcrumbItems} />
            </div>
            <div className="text-end col-4">
              <Button
                variant="outlined"
                style={{ border: 0, backgroundColor: '#e0e0e0', color: '#212b36', fontWeight: 700 }}
                className="mx-2"
                onClick={openBankModal}
              >
                Thêm từ ngân hàng câu hỏi
              </Button>
              <Button
                variant="outline"
                style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
                onClick={() => openModal(null)}
              >
                Tạo mới
              </Button>
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
            <h5 className="text-center" style={{ fontWeight: 'bold' }}>
              {quiz?.title}
            </h5>
            <Table style={{ marginTop: '20px' }}>
              <TableHead style={{ backgroundColor: '#f4f6f8' }}>
                <TableRow>
                  <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                  <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Câu hỏi</TableCell>
                  <TableCell width={'20%'} style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((question, index) => (
                  <>
                    <TableRow hover={true} key={question.id} className="list-question-bank">
                      <TableCell>{++index}</TableCell>
                      {question?.type ? (
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                          <img src={question.content} alt="img" width={200} height={200} />
                        </TableCell>
                      ) : (
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                          <div dangerouslySetInnerHTML={{ __html: question?.content }}></div>
                        </TableCell>
                      )}
                      <TableCell className="text-end" style={{ fontWeight: 600, color: '#686f77' }}>
                        <Tooltip title="Chi tiết">
                          <button
                            style={{ color: '#637381', border: 0 }}
                            className="btn m-1"
                            variant="outlined"
                            onClick={() => openModal(question)}
                          >
                            <VisibilityIcon />
                          </button>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <button
                            style={{ color: '#637381', border: 0 }}
                            className="btn mx-1"
                            onClick={() => handleDeleteQuestion(question?.id)}
                          >
                            <DeleteIcon color="error" />
                          </button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
                {questions?.length == 0 && (
                  <TableRow>
                    <TableCell className="text-center" colSpan={6}>
                      <h3 style={{ fontWeight: 700, color: 'grey' }}>Chưa có câu hỏi</h3>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {questions && questions.length > 0 && (
              <TablePagination
                labelRowsPerPage="Số hàng trên trang :"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={questions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
            {questions && questions.length > 0 && (
              <div className="text-end ">
                <button
                  style={{ marginTop: '20px', fontWeight: 700 }}
                  className="btn btn-success"
                  onClick={showConfirmationDialog}
                >
                  Mở bài kiểm tra
                </button>
              </div>
            )}
          </Paper>
        </div>

        <QuestionAlternativeModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          onUpdate={handleSave}
          question={selectedQuestion} // Pass the selected question for editing
        />
        <QuestionBankModal isOpen={isBankModalOpen} onClose={closeBankModal} onSave={handleBankSave} data={data} />
      </div>
    )
  );
};

export default ListQuizQuestion;
