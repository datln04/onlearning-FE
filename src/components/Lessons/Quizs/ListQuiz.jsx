import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import QuizModel from './QuizModal'; // Import the QuizModel component
import { quizLessons } from '../../../mock/mock-data'; // Replace with your actual quiz data
import { useNavigate, Link } from 'react-router-dom';

const ListQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null); // Track the selected quiz for editing
    const navigate = useNavigate();

    useEffect(() => {
        // Replace this with your actual data fetching logic for quizzes
        setQuizzes(quizLessons);
    }, []);

    const openModal = (quiz) => {
        setSelectedQuiz(quiz); // Set the selected quiz for editing
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedQuiz(null); // Clear the selected quiz
        setIsModalOpen(false);
    };

    const handleSave = (newQuiz) => {
        if (selectedQuiz) {
            // Editing an existing quiz
            const updatedQuizzes = quizzes.map((quiz) =>
                quiz.id === selectedQuiz.id ? newQuiz : quiz
            );
            setQuizzes(updatedQuizzes);
        } else {
            // Adding a new quiz
            setQuizzes([...quizzes, newQuiz]);
        }
        closeModal();
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <div className='container text-center'>
            <h2 className='my-4'>Danh sách bài kiểm tra cho bài học</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="outlined" onClick={handleBackButton} style={{ marginBottom: '20px' }}>Quay lại</Button>
                <Button variant="outlined" onClick={() => openModal(null)} style={{ marginBottom: '20px' }}>Thêm Bài Kiểm Tra</Button>
            </div>

            {/* Table view for quizzes */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên Bài Kiểm Tra</TableCell>
                            <TableCell>Thời gian làm bài</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Thời gian bắt đầu</TableCell>
                            <TableCell>Thời gian kết thúc</TableCell>
                            <TableCell className='text-center'>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quizzes.map((quiz) => (
                            <TableRow key={quiz.id}>
                                <TableCell>{quiz.title}</TableCell>
                                <TableCell>{quiz.timer}</TableCell>
                                <TableCell>{quiz.status}</TableCell>
                                <TableCell>{quiz.startQuiz}</TableCell>
                                <TableCell>{quiz.endQuiz}</TableCell>
                                <TableCell className='d-flex justify-content-evenly'>
                                    <button className='btn btn-outline-info' onClick={() => openModal(quiz)}>Chỉnh sửa</button>
                                    <Link to={`/quizs/${quiz.id}/quizQuestion`} className='btn btn-outline-primary'>
                                        D.sách câu hỏi
                                    </Link>
                                    <Link to={`/quizs/${quiz.id}/student-grade`} className='btn btn-outline-secondary'>
                                        D.sách điểm
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Quiz Model */}
            <QuizModel
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSave}
                onUpdate={handleSave}
                quiz={selectedQuiz} // Pass the selected quiz for editing
            />
        </div>
    );
};

export default ListQuiz;
