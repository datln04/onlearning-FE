// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Typography, Button, Radio, MenuItem } from "@material-ui/core";
// import { fetchData } from '../../../../services/AppService';
// import Cookies from 'js-cookie';
// import { Select } from '@mui/material';
// import { isValidEditSize, isValidEditedSize, isValidSize } from '../../../../util/Utilities';
// import Swal from 'sweetalert2';
// import Loading from '../../../Loading/Loading';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import storage from '../../../../util/firebase';

// const QuestionModel = ({ isOpen, onClose, onSave, onUpdate, question, subject, course, lesson }) => {
//     const [selectedType, setSelectedType] = useState('text')
//     const [editedQuestion, setEditedQuestion] = useState({
//         content: "",
//         answers: [
//             { id: 0, content: "", isCorrect: false },
//             { id: 1, content: "", isCorrect: false },
//             { id: 2, content: "", isCorrect: false },
//             { id: 3, content: "", isCorrect: false },
//         ],
//         correctAnswerId: null,
//     });

//     const [editedQuestionImage, setEditedQuestionImage] = useState({
//         content: "",
//         answers: [
//             { id: 0, content: "", isCorrect: false },
//             { id: 1, content: "", isCorrect: false },
//             { id: 2, content: "", isCorrect: false },
//             { id: 3, content: "", isCorrect: false },
//         ],
//         correctAnswerId: null,
//     });


//     const [subjectItem, setSubjectItem] = useState(null)
//     const [courseItem, setCourseItem] = useState(null)
//     const [lessonItem, setLessonItem] = useState(null)
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const token = Cookies.get('token');
//         if (token && subject && course && lesson) {
//             try {
//                 fetchData(`/subject/byId?subject-id=${subject}`, token).then(resp => {
//                     if (resp) {
//                         setSubjectItem(resp);
//                         fetchData(`/course/byId?id=${course}`, token).then(resp => {
//                             if (resp) {
//                                 setCourseItem(resp)
//                                 fetchData(`/lesson/byId?id=${lesson}`, token).then(resp => {
//                                     if (resp) {
//                                         setLessonItem(resp)
//                                     }
//                                 }).catch(err => {
//                                     console.log(err)
//                                 })
//                             }
//                         }).catch(err => {
//                             console.log(err)
//                         })
//                     }
//                 })
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     }, [subject, course, lesson])

//     useEffect(() => {
//         if (question) {
//             // If a question is provided for editing
//             setEditedQuestion({
//                 id: question.id,
//                 content: question.content,
//                 answers: question.answers.map((answer) => ({ ...answer })), // Create a new array of answers to avoid modifying the original question
//                 correctAnswerId: question.answers.find((answer) => answer.isCorrect)?.id || null,
//             });

//             setEditedQuestionImage({
//                 id: question.id,
//                 content: question.content,
//                 answers: question.answers.map((answer) => ({ ...answer })), // Create a new array of answers to avoid modifying the original question
//                 correctAnswerId: question.answers.find((answer) => answer.isCorrect)?.id || null,
//             });

//             if (question.content.indexOf("https://") == 0) {
//                 setSelectedType('image')
//             } else {
//                 setSelectedType('text')
//             }
//         } else {
//             // If adding a new question
//             setEditedQuestion({
//                 content: "",
//                 answers: [
//                     { id: 0, content: "", isCorrect: false },
//                     { id: 1, content: "", isCorrect: false },
//                     { id: 2, content: "", isCorrect: false },
//                     { id: 3, content: "", isCorrect: false },
//                 ],
//                 correctAnswerId: null,
//             });
//         }
//     }, [question]);

//     const handleInputChange = async (e, answerId) => {
//         const { name, value, checked } = e.target;
//         if (name === "content") {
//             if (editedQuestion.content.length <= 250) {
//                 // Update question content
//                 setEditedQuestion({ ...editedQuestion, content: value });
//             }
//         } else {
//             // Update answer content
//             const updatedAnswers = editedQuestion.answers.map((answer) => {
//                 if (answer.id === answerId) {
//                     if (answer.content.length <= 250) {
//                         return { ...answer, content: value };
//                     }
//                 }
//                 return answer;
//             });
//             setEditedQuestion({ ...editedQuestion, answers: updatedAnswers });
//         }
//     };

//     const handleSave = async () => {

//         if (!editedQuestion.content || !editedQuestion.answers[0].content
//             || editedQuestion.answers[0].content === ''
//             || editedQuestion.answers[1].content === ''
//             || editedQuestion.answers[2].content === ''
//             || editedQuestion.answers[3].content === ''
//             || editedQuestion.correctAnswerId === null) {
//             // Show an error message or handle the validation as needed
//             clearModal();
//             Swal.fire({
//                 title: "Cảnh báo",
//                 text: "Điền tất cả các trường",
//                 icon: "warning"
//             });
//             return;
//         }

//         if (question) {
//             const isValidEditedSize = isValidEditSize(2, editedQuestionImage)
//             if (!isValidEditedSize) {
//                 clearModal();
//                 Swal.fire({
//                     title: "Cảnh báo",
//                     text: "Hình không được quá 2MB",
//                     icon: "warning"
//                 });
//                 return;
//             }
//             // If editing an existing question, call the onUpdate function
//             if (selectedType == 'text') {
//                 const updatedAnswers = editedQuestion.answers.map((answer, index) => {
//                     if (answer.id === editedQuestion.correctAnswerId) {
//                         return { ...answer, isCorrect: true };
//                     }
//                     return { ...answer, isCorrect: false };
//                 });
//                 // console.log({
//                 //     ...editedQuestion,
//                 //     answers: updatedAnswers
//                 // });
//                 onUpdate({
//                     ...editedQuestion,
//                     answers: updatedAnswers
//                 });
//                 // onUpdate({ ...question, ...editedQuestion });
//             }
//             if (selectedType == 'image') {
//                 setLoading(true);
//                 // Create an array to store upload tasks for both content and answers
//                 const uploadTasks = [];

//                 // Function to upload a single file
//                 const uploadFile = (file, path) => {
//                     return new Promise((resolve, reject) => {
//                         const storageRef = ref(storage, path);
//                         const uploadTask = uploadBytesResumable(storageRef, file);

//                         uploadTask.on(
//                             "state_changed",
//                             (snapshot) => {
//                                 // Handle progress if needed
//                             },
//                             (err) => {
//                                 console.log(err);
//                                 reject(err);
//                             },
//                             () => {
//                                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//                                     resolve(url);
//                                 });
//                             }
//                         );
//                     });
//                 };
//                 console.log(editedQuestionImage);
//                 // Upload content file
//                 if (editedQuestionImage.content instanceof File) {
//                     uploadTasks.push(uploadFile(editedQuestionImage.content, `/elearning/text/${editedQuestionImage.content.name}`));
//                 }

//                 // Upload answer files
//                 await editedQuestionImage.answers.forEach((answer) => {
//                     if (answer.content instanceof File) {
//                         uploadTasks.push(uploadFile(answer.content, `/elearning/text/${answer.content.name}`));
//                     }
//                 });

//                 try {
//                     // Wait for all upload tasks to complete
//                     const urls = await Promise.all(uploadTasks);

//                     // 'urls' is an array containing the download URLs of all uploaded files
//                     // If adding a new question, call the onSave function
//                     // Set isCorrect: true for the correct answer
//                     const updatedAnswers = editedQuestionImage.answers.map((answer, index) => {
//                         let count = 0;
//                         let tmp = answer.content;
//                         let isCorrect = answer.isCorrect;

//                         if (typeof answer.content == 'object') {
//                             // let tmp = urls[count]
//                             tmp = urls[count];
//                             ++count;
//                         }

//                         if (answer.id === editedQuestionImage.correctAnswerId) {
//                             isCorrect = true;
//                         }
//                         return { ...answer, isCorrect: isCorrect, content: tmp }
//                     });

//                     // console.log({
//                     //     ...editedQuestionImage,
//                     //     answers: updatedAnswers,
//                     //     content: typeof editedQuestionImage.content == 'object' ? urls[0] : editedQuestionImage.content
//                     // });
//                     onSave({
//                         ...editedQuestionImage,
//                         answers: updatedAnswers,
//                         content: typeof editedQuestionImage.content == 'object' ? urls[0] : editedQuestionImage.content
//                     });

//                     clearModal();
//                 } catch (error) {
//                     console.log(error);
//                     setLoading(false);
//                 }

//             }
//         } else {

//             const isValidFileSize = isValidSize(2, editedQuestion.content, editedQuestion.answers[0].content, editedQuestion.answers[1].content, editedQuestion.answers[2].content, editedQuestion.answers[3].content);
//             if (!isValidFileSize) {
//                 clearModal()
//                 Swal.fire({
//                     title: "Cảnh báo",
//                     text: "Hình không được quá 2MB",
//                     icon: "warning"
//                 });
//                 return;
//             }

//             if (selectedType == 'text') {
//                 const updatedAnswers = editedQuestion.answers.map((answer, index) => {
//                     if (answer.id === editedQuestion.correctAnswerId) {
//                         return { ...answer, isCorrect: true };
//                     }
//                     return { ...answer };
//                 });
//                 onSave({
//                     ...editedQuestion,
//                     answers: updatedAnswers
//                 });
//             } else {
//                 setLoading(true);
//                 // Create an array to store upload tasks for both content and answers
//                 const uploadTasks = [];

//                 // Function to upload a single file
//                 const uploadFile = (file, path) => {
//                     return new Promise((resolve, reject) => {
//                         const storageRef = ref(storage, path);
//                         const uploadTask = uploadBytesResumable(storageRef, file);

//                         uploadTask.on(
//                             "state_changed",
//                             (snapshot) => {
//                                 // Handle progress if needed
//                             },
//                             (err) => {
//                                 console.log(err);
//                                 reject(err);
//                             },
//                             () => {
//                                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//                                     resolve(url);
//                                 });
//                             }
//                         );
//                     });
//                 };

//                 // Upload content file
//                 if (editedQuestion.content instanceof File) {
//                     uploadTasks.push(uploadFile(editedQuestion.content, `/elearning/text/${editedQuestion.content.name}`));
//                 }

//                 // Upload answer files
//                 await editedQuestion.answers.forEach((answer) => {
//                     if (answer.content instanceof File) {
//                         uploadTasks.push(uploadFile(answer.content, `/elearning/text/${answer.content.name}`));
//                     }
//                 });

//                 try {
//                     // Wait for all upload tasks to complete
//                     const urls = await Promise.all(uploadTasks);

//                     // 'urls' is an array containing the download URLs of all uploaded files
//                     // If adding a new question, call the onSave function
//                     // Set isCorrect: true for the correct answer
//                     const updatedAnswers = editedQuestion.answers.map((answer, index) => {
//                         if (answer.id === editedQuestion.correctAnswerId) {
//                             return { ...answer, isCorrect: true, content: urls[++index] };
//                         }
//                         return { ...answer, content: urls[++index] };
//                     });
//                     onSave({
//                         ...editedQuestion,
//                         answers: updatedAnswers,
//                         content: urls[0]
//                     });

//                     clearModal();
//                 } catch (error) {
//                     console.log(error);
//                     setLoading(false);
//                 }

//             }
//         }

//         clearModal();
//     };



//     // const uploadFileToFireBase = (file) => {
//     //     // Creating a reference to the file in Firebase Storage
//     //     const storageRef = ref(storage, `/elearning/text/${file.name}`);

//     //     // Starting the upload task
//     //     const uploadTask = uploadBytesResumable(storageRef, file);

//     //     uploadTask.on(
//     //         "state_changed",
//     //         (snapshot) => {
//     //             // Calculating and updating the progress
//     //             // const percent = Math.round(
//     //             //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//     //             // );
//     //             // setPercent(percent);
//     //         },
//     //         (err) => {
//     //             console.log(err);
//     //             setLoading(false);
//     //         },
//     //         () => {
//     //             // Getting the download URL after successful upload
//     //             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//     //                 // handleInputChange(url, 'url');
//     //                 const lessonSave = { ...editedLesson, url: url }
//     //                 onSave(lessonSave);
//     //                 setLoading(false);
//     //             });
//     //         }
//     //     );
//     // }

//     const clearModal = () => {
//         setEditedQuestion({
//             content: "",
//             answers: [
//                 { id: 0, content: "", isCorrect: false },
//                 { id: 1, content: "", isCorrect: false },
//                 { id: 2, content: "", isCorrect: false },
//                 { id: 3, content: "", isCorrect: false },
//             ],
//             correctAnswerId: null,
//         });
//         setSelectedType('text')
//         onClose();
//     };

//     const handleAnswerChange = (e) => {
//         if (question && selectedType == 'image') {
//             setEditedQuestionImage((prevQuestion) => ({
//                 ...prevQuestion,
//                 correctAnswerId: parseInt(e.target.value),
//             }));
//         } else {
//             setEditedQuestion((prevQuestion) => ({
//                 ...prevQuestion,
//                 correctAnswerId: parseInt(e.target.value),
//             }));
//         }

//     };

//     return (
//         loading ? <Loading /> : <Dialog open={isOpen} onClose={onClose} fullWidth>
//             <DialogTitle>
//                 <Typography variant="h5" gutterBottom>
//                     {question ? 'Chi tiết câu hỏi' : 'Thêm mới câu hỏi'}
//                 </Typography>
//             </DialogTitle>
//             <DialogContent>
//                 {subjectItem && courseItem && lessonItem && <>
//                     <Typography variant="subtitle1" gutterBottom>
//                         Tên môn học: {subjectItem?.name}
//                     </Typography>
//                     <Typography variant="subtitle1" gutterBottom>
//                         Tên khóa học: {courseItem?.name}
//                     </Typography>
//                     <Typography variant="subtitle1" gutterBottom>
//                         Tên bài học: {lessonItem?.name}
//                     </Typography>
//                 </>}
//                 <Select
//                     fullWidth
//                     value={selectedType}
//                     onChange={(e) => setSelectedType(e.target.value)}
//                     style={{ padding: '10px' }}
//                     disabled={question}
//                 >
//                     <MenuItem value="text">Dạng văn bản</MenuItem>
//                     <MenuItem value="image">Dạng hình</MenuItem>
//                 </Select>
//                 {selectedType === 'text' ? <TextField
//                     fullWidth
//                     multiline
//                     rows={4}
//                     label="Nội dung câu hỏi"
//                     autoFocus
//                     margin="normal"
//                     name="content"
//                     value={editedQuestion.content}
//                     onChange={handleInputChange}
//                     required
//                 /> : question ?
//                     <>
//                         <label className='my-2'>Câu hỏi </label><br />
//                         <img className='mx-5' src={editedQuestion.content} alt='img' width={200} height={200} /><br />
//                         <label className='my-2'>Đổi câu hỏi </label>
//                         <input className='mx-2' type='file' accept='.png, .jpg, .jpeg' onChange={(e) => setEditedQuestionImage({ ...editedQuestion, content: e.target.files[0] })} />
//                     </> : <>
//                         <label className='my-2'>Câu hỏi </label>
//                         <input className='mx-2' type='file' accept='.png, .jpg, .jpeg' onChange={(e) => setEditedQuestion({ ...editedQuestion, content: e.target.files[0] })} />
//                     </>
//                 }
//                 <Typography variant="subtitle1" gutterBottom>
//                     Câu trả lời:
//                 </Typography>
//                 {editedQuestion && editedQuestion.answers.length > 0 && editedQuestion.answers.map((answer, index) => (
//                     <div key={answer.id}>
//                         {selectedType === 'text' ? <TextField
//                             fullWidth
//                             // style={{ height: '2.2em !important' }}
//                             label={`Câu trả lời ${index + 1}`}
//                             autoFocus
//                             margin="dense"
//                             name={`answer_${answer.id}`}
//                             value={answer.content}
//                             onChange={(e) => handleInputChange(e, answer.id)}
//                             required

//                         /> : question ?
//                             <>
//                                 <label className='my-2'>Câu trả lời: {index + 1}</label><br />
//                                 <img className='mx-5' src={answer.content} alt='img' width={200} height={200} /><br />
//                                 <label className='my-2'>Đổi câu trả lời {index + 1}</label>
//                                 <input className='mx-2' type='file' accept='.png, .jpg, .jpeg' onChange={(e) => {
//                                     const updatedAnswers = editedQuestionImage.answers.map((a) => {
//                                         if (a.id === answer.id) {
//                                             return { ...a, content: e.target.files[0] };
//                                         }
//                                         return a;
//                                     });
//                                     setEditedQuestionImage({ ...editedQuestionImage, answers: updatedAnswers });
//                                 }} />
//                             </> : <>
//                                 <label className='my-2'>Câu trả lời: {index + 1} </label>
//                                 <input className='mx-2' type='file' accept='.png, .jpg, .jpeg' onChange={(e) => {
//                                     const updatedAnswers = editedQuestion.answers.map((a) => {
//                                         if (a.id === answer.id) {
//                                             return { ...a, content: e.target.files[0] };
//                                         }
//                                         return a;
//                                     });
//                                     setEditedQuestion({ ...editedQuestion, answers: updatedAnswers });
//                                 }} />

//                             </>
//                         }
//                         <div className='my-3 d-flex align-items-center'>
//                             <Radio
//                                 name="correctAnswer"
//                                 value={answer.id.toString()}
//                                 checked={question && selectedType == 'image' ? editedQuestionImage.correctAnswerId === answer.id : editedQuestion.correctAnswerId === answer.id}
//                                 onChange={handleAnswerChange}
//                             />
//                             <label className=''>Chọn cho câu trả lời đúng</label>
//                         </div>
//                     </div>
//                 ))}
//             </DialogContent>
//             <DialogActions>
//                 <Button variant="outlined" onClick={onClose}>
//                     Hủy
//                 </Button>
//                 <Button variant="contained" onClick={handleSave}>
//                     Lưu
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default QuestionModel;
