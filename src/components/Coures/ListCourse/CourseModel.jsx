import React, { useState } from 'react';
import { Modal, TextField, Typography, Box, Button, Grid } from "@mui/material";

const CourseModel = ({ isOpen, onClose, onSave, teacherId, subjectId }) => {
    const [course, setCourse] = useState({
        name: "",
        description: "",
        status: true,
        image: "",
        createDate: new Date().toISOString(), // Default to current date and time
        price: "",
        limitTime: new Date().toISOString(), // Default to current date and time
        quizTime: "",
        averagePoint: "",
        teacherId: teacherId,
        subjectId: subjectId,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSave = () => {
        if (
            !course.name ||
            !course.description ||
            !course.image ||
            !course.price ||
            !course.quizTime ||
            !course.averagePoint ||
            !course.teacherId ||
            !course.subjectId
        ) {
            // Show an error message or handle the validation as needed
            alert("Please fill in all required fields.");
            return;
        }

        onSave(course);
        setCourse({
            name: "",
            description: "",
            status: true,
            image: "",
            createDate: new Date().toISOString(),
            price: "",
            limitTime: new Date().toISOString(),
            quizTime: "",
            averagePoint: "",
            teacherId: teacherId,
            subjectId: subjectId,
        });
        onClose();
    };

    const handleClose = () => {
        setCourse({
            name: "",
            description: "",
            status: true,
            image: "",
            createDate: new Date().toISOString(),
            price: "",
            limitTime: new Date().toISOString(),
            quizTime: "",
            averagePoint: "",
            teacherId: teacherId,
            subjectId: subjectId,
        });
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Course
                </Typography>
                <TextField
                    fullWidth
                    label="Course Name"
                    variant="outlined"
                    margin="normal"
                    name="name"
                    value={course.name}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Course Description"
                    variant="outlined"
                    margin="normal"
                    name="description"
                    value={course.description}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Course Image"
                    variant="outlined"
                    margin="normal"
                    name="image"
                    value={course.image}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Course Price"
                    variant="outlined"
                    margin="normal"
                    name="price"
                    value={course.price}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Course Quiz Time (minutes)"
                    variant="outlined"
                    margin="normal"
                    name="quizTime"
                    value={course.quizTime}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Average Point/Rating"
                    variant="outlined"
                    margin="normal"
                    name="averagePoint"
                    value={course.averagePoint}
                    onChange={handleInputChange}
                    required
                />

                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default CourseModel;
