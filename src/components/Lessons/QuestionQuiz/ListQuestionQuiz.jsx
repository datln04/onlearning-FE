import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import QuizQuestionModel from './QuizQuestionModal'; // Import the QuizQuestionModel component
import { quizLessons } from '../../../mock/mock-data'; // Replace with your actual question data
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ListQuestionQuiz = () => {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null); // Track the selected question for editing
    const navigate = useNavigate();

    useEffect(() => {
        // Replace this with your actual data fetching logic for quiz questions
        const quiz = quizLessons.find(q => q.id === parseInt(quizId));
        if (quiz) {
            setQuestions(quiz.questions);
        }
    }, [quizId]);

    const openModal = (question) => {
        setSelectedQuestion(question); // Set the selected question for editing
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedQuestion(null); // Clear the selected question
        setIsModalOpen(false);
    };

    // Debug statements
    console.log("questions:", questions);
    console.log("selectedQuestion:", selectedQuestion);

    const handleSave = (newQuestion) => {
        if (selectedQuestion) {
            // Editing an existing question
            const indexChange = newQuestion?.answers.findIndex((i) => i.id === newQuestion.correctAnswerId);
            if (indexChange !== -1) {
                // If the object with the specified ID is found in the answers
                const updatedAnswers = newQuestion.answers.map((item, index) => {
                    if (index === indexChange) {
                        // Create a new object for each item in the answers
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

                newQuestion.answers = updatedAnswers; // Update the answers in newQuestion
            }

            const updatedQuestions = questions.map((question) =>
                question.id === selectedQuestion.id ? newQuestion : question
            );
            setQuestions(updatedQuestions);
        } else {
            // Adding a new question
            newQuestion.id = questions.length + 1
            newQuestion.quizId = parseInt(quizId)
            setQuestions([...questions, newQuestion]);
        }
        closeModal();
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <div className='container text-center'>
            <h2 className='my-4'>Danh sách câu hỏi cho bài kiểm tra</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="outlined" onClick={handleBackButton} style={{ marginBottom: '20px' }}>Quay lại</Button>
                <Button variant="outlined" onClick={() => openModal(null)} style={{ marginBottom: '20px' }}>Thêm Câu Hỏi</Button>
            </div>

            {/* Table view for questions */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Câu Hỏi</TableCell>
                            <TableCell>Đáp Án 1</TableCell>
                            <TableCell>Đáp Án 2</TableCell>
                            <TableCell>Đáp Án 3</TableCell>
                            <TableCell>Đáp Án 4</TableCell>
                            <TableCell>Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions && questions.map((question) => (
                            <TableRow key={question?.id}>
                                <TableCell>{question?.content}</TableCell>
                                {question?.answers.map((answer, index) => (
                                    <TableCell key={answer.id} style={{ fontWeight: answer.isCorrect ? 'bold' : 'normal' }}>
                                        {answer.content}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <button className='btn btn-outline-info' onClick={() => openModal(question)}>Chỉnh sửa</button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Quiz Question Modal */}
            <QuizQuestionModel
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSave}
                onUpdate={handleSave}
                quizId={quizId}
                question={selectedQuestion} // Pass the selected question for editing
            />
        </div>
    );
};

export default ListQuestionQuiz;
