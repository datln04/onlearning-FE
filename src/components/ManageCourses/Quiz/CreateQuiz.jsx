// import React, { useEffect, useState } from 'react';
// import {
//   Button,
//   Typography,
//   InputBase,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TextField,
// } from '@mui/material';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// // import LessonModal from '../../Lesson/LessonModal'; // Import the LessonModal component
// import { courseQuestionBank, lessonSyllabus, lessonsData, syllabusData } from '../../../mock/mock-data';
// import QuestionModel from './ListCourseQuestion/QuestionModel';
// import QuestionBankModal from './ListCourseQuestion/QuestionBankModal';
// import QuizQuestionModel from '../../Lessons/QuestionQuiz/QuizQuestionModal';
// import Cookies from 'js-cookie';
// import { fetchData, postData } from '../../../services/AppService';

// export default function CreateQuiz() {
//   const { courseId, syllabusId, lessonId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBankModalOpen, setIsBankModalOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null); // Track the selected question for editing
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   // Replace this with your actual data fetching logic for questions
//   //   const token = Cookies.get('token');
//   //   if (token) {
//   //     fetchData(`/question/byLessonId?lesson_id=${lessonId}`, token).then(resp => {
//   //       if (resp) {
//   //         setQuestions(resp);
//   //       }
//   //     })
//   //   }

//   // }, []);

//   const openModal = (question) => {
//     if (question) {
//       setSelectedQuestion(question); // Set the selected question for editing
//     }
//     setIsModalOpen(true);
//   };

//   const openBankModal = () => {
//     setIsBankModalOpen(true);
//   };

//   const closeBankModal = () => {
//     setIsBankModalOpen(false);
//   };

//   const closeModal = () => {
//     setSelectedQuestion(null); // Clear the selected question
//     setIsModalOpen(false);
//   };

//   const handleSave = async (newQuestion) => {
//     const token = Cookies.get('token');
//     if (token) {
//       if (selectedQuestion) {
//         // Editing an existing question
//         const indexChange = newQuestion?.answers.findIndex((i) => i.id === newQuestion.correctAnswerId);
//         if (indexChange !== -1) {
//           // If the object with the specified ID is found in the answers
//           const updatedAnswers = newQuestion.answers.map((item, index) => {
//             if (index == indexChange) {
//               // Create a new object for each item in the answers
//               return {
//                 ...item,
//                 isCorrect: true, // Set isCorrect to false for all items
//                 // Add other updated properties here if needed
//               };
//             } else {
//               return {
//                 ...item,
//                 isCorrect: false,
//               };
//             }
//           });

//           newQuestion.answers = updatedAnswers; // Update the answerBank in newQuestion
//         }

//         const updatedQuestions = questions.map((question) =>
//           question.id === selectedQuestion.id ? newQuestion : question,
//         );
//         setQuestions(updatedQuestions);
//       } else {
//         // Adding a new question
//         // setQuestions([...questions, newQuestion]);

//         // const questionBody = { content: newQuestion.content, answers: newAnswers }
//         const body = { ...newQuestion, courseId: parseInt(courseId), lessonId: parseInt(lessonId) };
//         console.log(body);
//         await postData(`/question/save`, body, token).then((resp) => {
//           if (resp) {
//             window.location.reload();
//           }
//         });
//         setQuestions([...questions, body]);
//         console.log(questions);
//       }
//     }
//     closeModal();
//   };
//   console.log(questions);
//   const handleBankSave = (items) => {
//     console.log(items);
//     closeBankModal();
//   };

//   return (
//     questions && (
//       <div className="m-5">
//         <div style={{ margin: '20px' }}>
//           <Paper style={{ padding: '20px' }}>
//             <Typography variant="body1">
//               <Link to={'/'}>Trang chủ </Link>
//               {'>'} <Link to={'/manage-course'}>Quản lý khóa học </Link>
//               {'>'} <Link to={`/courses/${courseId}`}>Khóa học {courseId} </Link>
//               {'>'} <Link to={`/courses/${courseId}/syllabus/${syllabusId}`}>Khung chương trình {syllabusId} </Link>
//               {'>'}{' '}
//               <Link to={`/courses/${courseId}/syllabus/${syllabusId}/lessons/${lessonId}`}> Bài học {lessonId} </Link>{' '}
//               {'>'} Tạo quiz
//             </Typography>
//             {/* <div style={{ marginTop: '20px' }}>
//               <TextField label="Tên giảng viên:" InputProps={{ readOnly: true }} />
//               <TextField label="Môn học:" style={{ marginLeft: '20px' }} InputProps={{ readOnly: true }} />
//               <TextField label="Khóa học:" style={{ marginLeft: '20px' }} InputProps={{ readOnly: true }} />
//               <TextField label="Ngày học:" style={{ marginLeft: '20px' }} InputProps={{ readOnly: true }} />

//             </div>

//             <div style={{ marginTop: '20px', display: 'block' }}>
//               <TextField label="Thời gian làm bài:" /><br />
//               <TextField label="Số lần làm bài:" style={{ marginTop: '20px' }} /><br />
//               <TextField label="Tỉ trọng:" style={{ marginTop: '20px' }} /><br />
//             </div> */}
//             <div style={{ marginTop: '20px' }}>
//               <Button variant="outlined" onClick={() => openModal(null)}>
//                 Tạo mới
//               </Button>
//               <Button variant="outlined" className="mx-3" onClick={openBankModal}>
//                 Thêm từ ngân hàng câu hỏi
//               </Button>
//             </div>

//             <Table style={{ marginTop: '20px' }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>STT</TableCell>
//                   <TableCell>Nội dung câu hỏi</TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {questions.length > 0 &&
//                   questions.map((question, index) => (
//                     <TableRow key={question.id}>
//                       <TableCell>{++index}</TableCell>
//                       <TableCell>{question.content}</TableCell>
//                       <TableCell>
//                         <Button variant="outlined" onClick={() => openModal(question)}>
//                           Chi tiết
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </div>

//         {/* Question Model */}
//         <QuizQuestionModel
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           onSave={handleSave}
//           onUpdate={handleSave}
//           question={selectedQuestion} // Pass the selected question for editing
//         />

//         <QuestionBankModal isOpen={isBankModalOpen} onClose={closeBankModal} onSave={handleBankSave} />
//       </div>
//     )
//   );
// }
