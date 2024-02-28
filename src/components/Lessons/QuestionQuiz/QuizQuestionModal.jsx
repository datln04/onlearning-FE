import React, { useState, useEffect } from 'react';
import { Modal, TextField, Typography, Box, Button, Grid, Radio, FormControl, FormControlLabel, RadioGroup, Paper } from "@mui/material";

const QuizQuestionModel = ({ isOpen, onClose, onSave, onUpdate, question }) => {
    const [editedQuestion, setEditedQuestion] = useState({
        content: "",
        answers: [
            { id: 1, content: "", isCorrect: false },
            { id: 2, content: "", isCorrect: false },
            { id: 3, content: "", isCorrect: false },
            { id: 4, content: "", isCorrect: false },
        ],
        correctAnswerId: null,
    });

    useEffect(() => {
        if (question) {
            // Populate the form fields if a question is provided for editing
            setEditedQuestion({
                content: question.content,
                answers: [...question.answers],
                correctAnswerId: question?.answers.find(i => i.isCorrect).id,
            });
        } else {
            // Clear the form fields if adding a new question
            setEditedQuestion({
                content: "",
                answers: [
                    { id: 1, content: "", isCorrect: false },
                    { id: 2, content: "", isCorrect: false },
                    { id: 3, content: "", isCorrect: false },
                    { id: 4, content: "", isCorrect: false },
                ],
                correctAnswerId: null,
            });
        }
    }, [question]);

    const handleInputChange = (e, answerId) => {
        const { name, value, checked } = e.target;
        if (name === "content") {
            // Update question content
            setEditedQuestion({ ...editedQuestion, content: value });
        } else {
            // Update answer content
            const updatedAnswers = editedQuestion.answers.map((answer) => {
                if (answer.id === answerId) {
                    return { ...answer, content: value };
                }
                return answer;
            });
            setEditedQuestion({ ...editedQuestion, answers: updatedAnswers });
        }
    };

    const handleSave = () => {
        if (!editedQuestion.content || editedQuestion.answers.length < 2 || !editedQuestion.correctAnswerId) {
            // Show an error message or handle the validation as needed
            alert("Please fill in all required fields.");
            return;
        }

        if (question) {
            // If editing an existing question, call the onUpdate function
            onUpdate({ ...question, ...editedQuestion });
        } else {
            // If adding a new question, call the onSave function
            // Set isCorrect: true for the correct answer
            const updatedAnswers = editedQuestion.answers.map((answer) => {
                if (answer.id === editedQuestion.correctAnswerId) {
                    return { ...answer, isCorrect: true };
                }
                return answer;
            });

            onSave({
                ...editedQuestion,
                answers: updatedAnswers,
            });
        }

        clearModal();
    };

    const clearModal = () => {
        setEditedQuestion({
            content: "",
            answers: [
                { id: 1, content: "", isCorrect: false },
                { id: 2, content: "", isCorrect: false },
                { id: 3, content: "", isCorrect: false },
                { id: 4, content: "", isCorrect: false },
            ],
            correctAnswerId: null,
        });

        onClose();
    };

    const handleAnswerChange = (e) => {
        setEditedQuestion((prevQuestion) => ({
            ...prevQuestion,
            correctAnswerId: parseInt(e.target.value),
        }));
    };

    return (
        <Modal open={isOpen} onClose={onClose} >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    {question ? 'Edit Question' : 'Add New Question'}
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Question Content"
                    variant="outlined"
                    margin="normal"
                    name="content"
                    value={editedQuestion.content}
                    onChange={handleInputChange}
                    required

                />
                <Typography variant="subtitle1" gutterBottom>
                    Answers:
                </Typography>
                {editedQuestion.answers.map((answer, index) => (
                    <Paper key={answer.id} elevation={3} sx={{ p: 2, mb: 2 }}>
                        <TextField
                            fullWidth
                            label={`Answer ${index + 1}`}
                            variant="outlined"
                            margin="normal"
                            name={`answer_${answer.id}`}
                            value={answer.content}
                            onChange={(e) => handleInputChange(e, answer.id)}
                            required
                        />
                        <Radio
                            name="correctAnswer"
                            value={answer.id.toString()}
                            checked={editedQuestion.correctAnswerId === answer.id}
                            onChange={handleAnswerChange}
                        />
                        <label>Correct Answer for Answer {index + 1}</label>
                    </Paper>
                ))}

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

export default QuizQuestionModel;
