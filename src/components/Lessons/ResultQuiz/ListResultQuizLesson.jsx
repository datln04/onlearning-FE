import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { resultQuizLessonData } from './../../../mock/mock-data'; // Import your result data here

const ListResultQuizLesson = () => {
    const { quizId } = useParams(); // Extract the quizId from the route parameters
    const navigate = useNavigate();

    // Filter the resultQuizLessonData based on the quizId
    const filteredResults = resultQuizLessonData.filter((result) => result.quizId === parseInt(quizId));

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <div className="container text-center">
            <h2 className="my-4">Danh sách kết quả bài kiểm tra</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="outlined" onClick={handleBackButton} style={{ marginBottom: '20px' }}>Quay lại</Button>
                {/* <Button variant="outlined" onClick={() => openModal(null)} style={{ marginBottom: '20px' }}>Thêm Bài Kiểm Tra</Button> */}
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Student ID</TableCell>
                            <TableCell>Quiz ID</TableCell>
                            <TableCell>Enroll ID</TableCell>
                            <TableCell>Submit Time</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>Result Status</TableCell>
                            <TableCell>Last Point</TableCell>
                            <TableCell>Fail Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredResults.map((result) => (
                            <TableRow key={result.id}>
                                <TableCell>{result.id}</TableCell>
                                <TableCell>{result.studentId}</TableCell>
                                <TableCell>{result.quizId}</TableCell>
                                <TableCell>{result.enrollId}</TableCell>
                                <TableCell>{result.submitTime}</TableCell>
                                <TableCell>{result.startTime}</TableCell>
                                <TableCell>{result.resultStatus}</TableCell>
                                <TableCell>{result.lastPoint}</TableCell>
                                <TableCell>{result.failCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ListResultQuizLesson;
