import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { courseFeedbacks } from '../../../mock/mock-data';
import { useNavigate } from 'react-router-dom';

const ListCourseFeedback = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        // Simulate fetching user data from local storage
        const storedUser = JSON.parse(Cookies.get('user'));
        setUser(storedUser);

        // Simulate fetching feedback data (replace this with your actual data fetching logic)
        setFeedbackData(courseFeedbacks);
    }, []);

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <div className='container mt-5'>
            <Typography variant="h5" className='text-center'>Đánh giá khóa học</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="outlined" onClick={handleBackButton} style={{ marginBottom: '20px' }}>Quay lại</Button>

            </div>
            {feedbackData.length === 0 ? (
                <Typography variant="body1">No feedback available.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Course ID</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Content</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feedbackData.map((feedback) => (
                                feedback.status === 'completed' ? (
                                    <TableRow key={feedback.id}>
                                        <TableCell>{feedback.courseId}</TableCell>
                                        <TableCell>{feedback.status}</TableCell>
                                        <TableCell>{feedback.content}</TableCell>
                                    </TableRow>
                                ) : null
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ListCourseFeedback;
