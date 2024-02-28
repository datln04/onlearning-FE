import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fetchData } from '../../../../services/AppService';
import Swal from 'sweetalert2';
import { removeEmptyPTagsWithBr } from '../../../../util/Utilities';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Radio,
    Typography,
    Paper,
} from '@mui/material';
import Loading from '../../../Loading/Loading';
import { handleImageUpload } from '../../../../util/firebase';
import ReactQuill from 'react-quill';

const QuestionAlternativeModal = ({ isOpen, onClose, onSave, question, subject, course, lesson }) => {
    const [editedQuestion, setEditedQuestion] = useState({
        content: '',
        answers: [
            { id: Math.random(), content: '', isCorrect: false },
        ],
        correctAnswerId: null,
    });
    const [subjectItem, setSubjectItem] = useState(null);
    const [courseItem, setCourseItem] = useState(null);
    const [lessonItem, setLessonItem] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token && subject && course && lesson) {
            try {
                fetchData(`/subject/byId?subject-id=${subject}`, token).then((resp) => {
                    if (resp) {
                        setSubjectItem(resp);
                        fetchData(`/course/byId?id=${course}`, token)
                            .then((resp) => {
                                if (resp) {
                                    setCourseItem(resp);
                                    fetchData(`/lesson/byId?id=${lesson}`, token)
                                        .then((resp) => {
                                            if (resp) {
                                                setLessonItem(resp);
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
                });
            } catch (error) {
                console.log(error);
            }
        }
    }, [subject, course, lesson]);

    useEffect(() => {
        if (question) {
            // If a question is provided for editing
            setEditedQuestion({
                id: question.id,
                content: question.content,
                answers: question.answers.map((answer) => ({ ...answer })), // Create a new array of answers to avoid modifying the original question
                correctAnswerId: question.answers.find((answer) => answer.isCorrect)?.id || null,
            });
        } else {
            // If adding a new question
            setEditedQuestion({
                content: '',
                answers: [
                    { id: Math.random(), content: '', isCorrect: false },
                ],
                correctAnswerId: null,
            });
        }
    }, [question]);

    const addItem = () => {
        let item = { id: Math.random(), content: '', isCorrect: false };
        const list = [...editedQuestion.answers];
        list.push(item);
        setEditedQuestion({ ...editedQuestion, answers: list });
    }
    const deleteItem = (id) => {
        // Filter values and leave value which we need to delete 
        const list = editedQuestion.answers.filter((item) => item.id !== id);
        // Update list in state 
        setEditedQuestion({ ...editedQuestion, answers: list });
    }

    const handleInputChange = async (fieldName, e, answerId) => {
        if (fieldName === 'content') {
            if (editedQuestion.content.length <= 250) {
                // Update question content
                setEditedQuestion({ ...editedQuestion, content: String(e) });
            }
        } else {
            // Update answer content
            const updatedAnswers = editedQuestion.answers.map((answer) => {
                if (answer.id === answerId) {
                    if (answer.content.length <= 250) {
                        return { ...answer, content: String(e) };
                    }
                }
                return answer;
            });
            setEditedQuestion({ ...editedQuestion, answers: updatedAnswers });
        }
    };

    const handleSave = async () => {
        if (
            !editedQuestion.content ||
            removeEmptyPTagsWithBr(editedQuestion.answers[0].content) === '' ||
            editedQuestion.correctAnswerId === null
        ) {
            // Show an error message or handle the validation as needed
            clearModal();
            Swal.fire({
                title: 'Warning',
                text: 'Điền tất cả các trường',
                icon: 'warning',
            });
            return;
        }
        const updatedAnswers = editedQuestion.answers.map((answer, index) => {
            if (answer.id === editedQuestion.correctAnswerId) {
                return { ...answer, isCorrect: true };
            }
            return { ...answer, isCorrect: false };
        });

        onSave({
            ...editedQuestion,
            answers: updatedAnswers,
        });

        clearModal();
    };

    const handleAnswerChange = (id) => {
        setEditedQuestion((prevQuestion) => ({
            ...prevQuestion,
            correctAnswerId: id,
        }));
    };

    const reactQuillRef = useRef();
    const reactQuillAnswerRef = useRef();

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const fileSizeInMB = file.size / (1024 * 1024); // Convert to megabytes
                const maxFileSize = 2; // Maximum allowed file size in megabytes
                if (fileSizeInMB > maxFileSize) {
                    alert('Hình không được quá 2MB');
                    // Clear the file input to prevent uploading the large file
                    input.value = '';
                } else {
                    // Proceed with the image upload logic
                    handleImageUpload(file)
                        .then((url) => {
                            const quill = reactQuillRef.current;
                            if (quill) {
                                const range = quill.getEditorSelection();
                                range && quill.getEditor().insertEmbed(range.index, 'image', url);
                            }
                        })
                        .catch((error) => {
                            console.error('Image upload failed:', error);
                        });
                }
            }
        };
    }, []);

    const imageHandlerAnswer = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const fileSizeInMB = file.size / (1024 * 1024); // Convert to megabytes
                const maxFileSize = 2; // Maximum allowed file size in megabytes
                if (fileSizeInMB > maxFileSize) {
                    alert('Hình không được quá 2MB');
                    // Clear the file input to prevent uploading the large file
                    input.value = '';
                } else {
                    // Proceed with the image upload logic
                    handleImageUpload(file)
                        .then((url) => {
                            const quill = reactQuillAnswerRef.current;
                            if (quill) {
                                const range = quill.getEditorSelection();
                                range && quill.getEditor().insertEmbed(range.index, 'image', url);
                            }
                        })
                        .catch((error) => {
                            console.error('Image upload failed:', error);
                        });
                }
            }
        };
    }, []);


    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: [] }],
                ['image'],
                ['clean'],
                [{ color: [] }],
            ],
            handlers: {
                image: imageHandler, // Pass your desired index here
            },
        },
    };

    const handleOnClose = () => {
        clearModal();
        onClose();
    };

    const clearModal = () => {
        setEditedQuestion({
            content: '',
            answers: [
                { id: Math.random(), content: '', isCorrect: false },
            ],
            correctAnswerId: null,
        });
        onClose();
    };

    return loading ? (
        <Loading />
    ) : (
        <Dialog open={isOpen} onClose={handleOnClose} fullWidth>
            <DialogTitle>
                <Typography variant="h5" gutterBottom>
                    {question ? 'Chi tiết câu hỏi' : 'Thêm mới câu hỏi'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                {subjectItem && courseItem && lessonItem && (
                    <>
                        <Typography variant="subtitle1" gutterBottom>
                            Chủ đề: {subjectItem?.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Khóa học: {courseItem?.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Bài học: {lessonItem?.name}
                        </Typography>
                    </>
                )}
                <Typography variant="subtitle1" gutterBottom color="primary">
                    Câu hỏi:
                </Typography>
                <ReactQuill
                    name="content"
                    ref={reactQuillRef}
                    value={editedQuestion.content}
                    onChange={(e) => handleInputChange('content', e)}
                    modules={modules}
                />

                <Paper
                    sx={{
                        backgroundColor: '#f5f5f5',
                        marginTop: '10px',
                        padding: '20px',
                        borderRadius: '20px',
                        maxHeight: 'max-content',
                        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                    }}
                >
                    <Typography variant="subtitle1" gutterBottom color="primary">
                        Câu trả lời:
                    </Typography>
                    {editedQuestion &&
                        editedQuestion.answers.length > 0 &&
                        editedQuestion.answers.map((answer, index) => {
                            return (
                                <div key={answer.id}>
                                    Câu {index + 1}:
                                    <Button style={{ marginRight: "10px" }}
                                        variant="light"
                                        onClick={() => deleteItem(answer.id)}>
                                        <DeleteForeverIcon />
                                    </Button>
                                    <ReactQuill
                                        name="answer"
                                        ref={reactQuillAnswerRef}
                                        value={answer.content}
                                        onChange={(e) => handleInputChange('answer', e, answer.id)}
                                        modules={{
                                            toolbar: {
                                                container: [
                                                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                                    ['bold', 'italic', 'underline'],
                                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                                    [{ align: [] }],
                                                    ['image'],
                                                    ['clean'],
                                                    [{ color: [] }],
                                                ],
                                                handlers: {
                                                    image: imageHandlerAnswer, // Pass your desired index here
                                                },
                                            },
                                        }
                                        }
                                    />
                                    <div className="my-3 d-flex align-items-center">
                                        <Radio
                                            name="correctAnswer"
                                            value={answer.id.toString()}
                                            checked={editedQuestion.correctAnswerId === answer.id}
                                            onChange={(e) => handleAnswerChange(answer.id)}
                                        />
                                        <label className="">Chọn cho câu trả lời đúng</label>
                                    </div>
                                </div>
                            );
                        })}
                    <Button
                        variant="dark"
                        className="mt-2"
                        onClick={() => addItem()}
                    >
                        <AddCircleOutlineIcon />    Thêm câu trả lời
                    </Button>
                </Paper>
            </DialogContent>
            <DialogActions>
                <button className="btn btn-outline-secondary" onClick={handleOnClose}>
                    Hủy
                </button>
                <button
                    style={{ backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
                    className="btn"
                    onClick={handleSave}
                >
                    Lưu
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default QuestionAlternativeModal;
