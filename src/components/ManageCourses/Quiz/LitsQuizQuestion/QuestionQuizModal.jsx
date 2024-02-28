import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
  Button,
  Radio,
} from '@material-ui/core';
import { fetchData } from '../../../../services/AppService';
import Cookies from 'js-cookie';

const QuestionQuizModal = ({ isOpen, onClose, onSave, question, onUpdate }) => {
  const [editedQuestion, setEditedQuestion] = useState({
    content: '',
    usedAnswers: [
      { id: 1, content: '', isCorrect: false },
      { id: 2, content: '', isCorrect: false },
      { id: 3, content: '', isCorrect: false },
      { id: 4, content: '', isCorrect: false },
    ],
    correctAnswerId: null,
  });

  useEffect(() => {
    console.log(question);
    if (question) {
      // If a question is provided for editing
      setEditedQuestion({
        content: question.content,
        usedAnswers: question.usedAnswers.map((answer) => ({ ...answer })), // Create a new array of usedAnswers to avoid modifying the original question
        correctAnswerId: question.usedAnswers.find((answer) => answer.isCorrect)?.id || null,
      });
    } else {
      // If adding a new question
      setEditedQuestion({
        content: '',
        usedAnswers: [
          { id: 0, content: '', isCorrect: false },
          { id: 1, content: '', isCorrect: false },
          { id: 2, content: '', isCorrect: false },
          { id: 3, content: '', isCorrect: false },
        ],
        correctAnswerId: null,
      });
    }
  }, [question]);

  const handleInputChange = (e, answerId) => {
    const { name, value, checked } = e.target;
    if (name === 'content') {
      // Update question content
      setEditedQuestion({ ...editedQuestion, content: value });
    } else {
      // Update answer content
      const updatedAnswers = editedQuestion?.usedAnswers.map((answer) => {
        if (answer.id === answerId) {
          return { ...answer, content: value };
        }
        return answer;
      });
      setEditedQuestion({ ...editedQuestion, usedAnswers: updatedAnswers });
    }
  };

  const handleSave = () => {
    if (!editedQuestion.content || editedQuestion.usedAnswers.length < 2 || editedQuestion.correctAnswerId === null) {
      // Show an error message or handle the validation as needed
      alert('Please fill in all required fields.');
      return;
    }

    if (question) {
      // If editing an existing question, call the onUpdate function
      onUpdate({ ...question, ...editedQuestion });
    } else {
      // If adding a new question, call the onSave function
      // Set isCorrect: true for the correct answer
      const updatedAnswers = editedQuestion.usedAnswers.map((answer) => {
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
      content: '',
      usedAnswers: [
        { id: 1, content: '', isCorrect: false },
        { id: 2, content: '', isCorrect: false },
        { id: 3, content: '', isCorrect: false },
        { id: 4, content: '', isCorrect: false },
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
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" gutterBottom>
          Thêm mới câu hỏi
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Câu hỏi"
          autoFocus
          margin="normal"
          name="content"
          value={editedQuestion.content}
          onChange={handleInputChange}
          required
        />
        {/* <Typography variant="subtitle1" gutterBottom>
                    Câu trả lời
                </Typography> */}
        {editedQuestion &&
          editedQuestion.usedAnswers.length > 0 &&
          editedQuestion.usedAnswers.map((answer, index) => (
            <div key={answer.id}>
              <TextField
                fullWidth
                // style={{ height: '2.2em !important' }}
                label={`Đáp án ${index + 1}`}
                autoFocus
                margin="dense"
                name={`answer_${answer.id}`}
                value={answer.content}
                onChange={(e) => handleInputChange(e, answer.id)}
                required
              />
              <div className="my-3 d-flex align-items-center">
                <Radio
                  name="correctAnswer"
                  value={answer.id.toString()}
                  checked={editedQuestion.correctAnswerId === answer.id}
                  onChange={handleAnswerChange}
                />
                <label className="">Check nếu đây là câu đúng</label>
              </div>
            </div>
          ))}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Huỷ
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionQuizModal;
