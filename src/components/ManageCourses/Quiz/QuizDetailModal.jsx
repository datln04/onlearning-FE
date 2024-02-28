import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../services/AppService';
import './../../Questions/QuestionBanks/ListQuestionBank.css';

const QuizDetailModal = ({ isOpen, onClose, quizId }) => {
  const [quiz, setQuiz] = useState();
  const [question, setQuestion] = useState();

  function sortAnswersById(questions) {
    for (const question of questions) {
      question.usedAnswers.sort((a, b) => a.id - b.id);
      if (question.content.indexOf('https://') == 0) {
        question.type = 'image';
      }
    }
  }

  useEffect(() => {
    const token = Cookies.get('token');
    if (token && quizId) {
      fetchData(`/quiz/byId?quiz_id=${quizId}`, token).then((resp) => {
        if (resp) {
          setQuiz(resp);
          fetchData(`/used-question/by-quiz?quiz_id=${quizId}`, token).then((resp) => {
            if (resp) {
              sortAnswersById(resp);
              setQuestion(resp);
            }
          });
        }
      });
    }
  }, [quizId]);

  return (
    quiz && (
      <Dialog maxWidth={'md'} open={isOpen} onClose={onClose}>
        <DialogTitle>Chi tiết bài kiểm tra</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Điền đầy đủ thông tin phía dưới</DialogContentText> */}

          <TextField
            fullWidth
            sx={{ px: 1 }}
            margin="dense"
            label="Tên bài kiểm tra"
            type="text"
            name="title"
            // style={{ width: '45%', margin: '0 .5rem' }}
            value={quiz.title}
          />
          <TextField
            sx={{ width: '50%', px: 1 }}
            margin="dense"
            label="Điểm qua bài kiểm tra ( 0 - 10 )"
            type="number"
            name="passScore"
            value={quiz.passScore}
          />

          <TextField
            sx={{ width: '50%', px: 1 }}
            margin="dense"
            label="Thời hạn hoàn thành bài kiểm tra (tuần)"
            type="number"
            name="dateRange"
            value={quiz.dateRange}
          />
          <TextField
            margin="dense"
            label="Thời gian làm bài ( phút ) "
            type="number"
            name="duration"
            sx={{ width: '50%', px: 1 }}
            value={quiz.duration}
          />

          <TextField
            margin="dense"
            label="Số lần làm bài"
            type="number"
            name="allowAttempt"
            sx={{ width: '50%', px: 1 }}
            value={quiz.allowAttempt}
          />
          <TextField
            sx={{ px: 1 }}
            margin="dense"
            label="Tỉ trọng %"
            type="number"
            name="proportion"
            fullWidth
            value={quiz.proportion}
          />
          <DialogContentText className="my-3">Danh sách câu hỏi</DialogContentText>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Nội dung câu hỏi</TableCell>
                <TableCell>Đáp án</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {question &&
                question.map((question, index) => (
                  <>
                    <TableRow key={question.id} className="list-question-bank">
                      <TableCell>{++index}</TableCell>
                      <TableCell>
                        <div dangerouslySetInnerHTML={{ __html: question?.content }}></div>
                      </TableCell>
                      {question.usedAnswers.map((a, index) => {
                        if (a.isCorrect) {
                          return (
                            <TableCell key={index}>
                              <TableCell>
                                <div dangerouslySetInnerHTML={{ __html: a?.content }}></div>
                              </TableCell>
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default QuizDetailModal;
