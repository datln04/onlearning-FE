import React, { useState, useEffect } from 'react';
import { Modal, Button, Box, Typography, Grid, Paper, TextField } from "@mui/material";

const QuizModel = ({ isOpen, onClose, onSave, onUpdate, quiz }) => {
    const [editedQuiz, setEditedQuiz] = useState({
        title: "",
        timer: "",
        status: "",
        startQuiz: "",
        endQuiz: "",
    });

    useEffect(() => {
        if (quiz) {
            // Populate the form fields if a quiz is provided for editing
            setEditedQuiz({
                title: quiz.title,
                timer: quiz.timer,
                status: quiz.status,
                startQuiz: quiz.startQuiz,
                endQuiz: quiz.endQuiz,
            });
        } else {
            // Clear the form fields if adding a new quiz
            setEditedQuiz({
                title: "",
                timer: "",
                status: "",
                startQuiz: "",
                endQuiz: "",
            });
        }
    }, [quiz]);

    const handleInputChange = (e, fieldName) => {
        const { value } = e.target;
        setEditedQuiz({ ...editedQuiz, [fieldName]: value });
    };

    const handleSave = () => {
        if (!editedQuiz.title || !editedQuiz.timer || !editedQuiz.status || !editedQuiz.startQuiz || !editedQuiz.endQuiz) {
            // Show an error message or handle the validation as needed
            alert("Please fill in all required fields.");
            return;
        }

        if (quiz) {
            // If editing an existing quiz, call the onUpdate function
            onUpdate({ ...quiz, ...editedQuiz });
        } else {
            // If adding a new quiz, call the onSave function
            onSave(editedQuiz);
        }

        clearModal();
    };

    const clearModal = () => {
        setEditedQuiz({
            title: "",
            timer: "",
            status: "",
            startQuiz: "",
            endQuiz: "",
        });

        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h6" gutterBottom>
                    {quiz ? 'Edit Quiz' : 'Add New Quiz'}
                </Typography>
                <TextField
                    fullWidth
                    label="Quiz Title"
                    variant="outlined"
                    margin="normal"
                    name="title"
                    value={editedQuiz.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    required
                />
                <TextField
                    fullWidth
                    label="Timer"
                    variant="outlined"
                    margin="normal"
                    name="timer"
                    value={editedQuiz.timer}
                    onChange={(e) => handleInputChange(e, "timer")}
                    required
                />
                <TextField
                    fullWidth
                    label="Status"
                    variant="outlined"
                    margin="normal"
                    name="status"
                    value={editedQuiz.status}
                    onChange={(e) => handleInputChange(e, "status")}
                    required
                />
                <TextField
                    fullWidth
                    label="Start Quiz Time"
                    variant="outlined"
                    margin="normal"
                    name="startQuiz"
                    value={editedQuiz.startQuiz}
                    onChange={(e) => handleInputChange(e, "startQuiz")}
                    required
                />
                <TextField
                    fullWidth
                    label="End Quiz Time"
                    variant="outlined"
                    margin="normal"
                    name="endQuiz"
                    value={editedQuiz.endQuiz}
                    onChange={(e) => handleInputChange(e, "endQuiz")}
                    required
                />
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleSave}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default QuizModel;
