import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
} from '@mui/material';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';
import moment from 'moment';
import '../../Questions/QuestionBanks/ListQuestionBank.css';

function QuizModal({ isOpen, onClose, onSave, quizDetail }) {
  const [resultDetail, setResultDetail] = useState(null);
  useEffect(() => {
    const token = Cookies.get('token');
    if (token && quizDetail) {
      fetchData(`/result-detail/by-result-quiz?result_quiz_id=${quizDetail.id}`, token)
        .then((resp) => {
          if (resp) {
            const data = optimizeData(resp);
            // const result = data[1];
            setResultDetail(data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [quizDetail]);

  function optimizeData(data) {
    const optimizedData = {};

    for (const item of data) {
      const { resultQuiz, usedQuestion, usedAnswer, isCorrect } = item;

      if (!optimizedData[usedQuestion.id]) {
        optimizedData[usedQuestion.id] = {
          content: usedQuestion.content,
          answers: [],
        };
      }

      optimizedData[usedQuestion.id].answers.push({
        id: usedAnswer.id,
        content: usedAnswer.content,
        isCorrect: usedAnswer.isCorrect,
      });

      optimizedData[usedQuestion.id].resultQuiz = resultQuiz;
      optimizedData[usedQuestion.id].isCorrect = isCorrect;
    }

    return optimizedData;
  }

  return (
    quizDetail && (
      <div>
        <Dialog open={isOpen} onClose={onClose}>
          <DialogTitle>Thông tin</DialogTitle>
          <DialogContent style={{ overflow: 'auto' }}>
            <div className="d-flex align-items-center col-12 row">
              <TextField
                className="col-5 mx-2"
                label="Tên sinh viên"
                autoFocus
                value={quizDetail?.student?.account?.username}
                margin="dense"
              />
              <TextField
                className="col-5 mx-2"
                label="Mã số"
                autoFocus
                value={quizDetail?.student?.studentNumber}
                margin="dense"
              />
              <TextField
                className="col-5 mx-2"
                label="Điểm số"
                autoFocus
                value={quizDetail?.lastPoint}
                margin="dense"
              />
              <TextField
                className="col-5 mx-2"
                label="Tình trạng"
                autoFocus
                value={quizDetail?.resultStatus === 'FAIL' ? 'Không đạt' : 'Đạt'}
                margin="dense"
              />
              <TextField
                className="col-5 mx-2"
                label="Ngày làm"
                autoFocus
                value={moment(quizDetail?.startTime).format('DD-MM-YYYY HH:mm:ss')}
                margin="dense"
              />
            </div>
            {resultDetail &&
              Object.keys(resultDetail).map((resultId, index) => {
                const question = resultDetail[resultId];

                return (
                  <FormControl component="fieldset" margin="normal" className="col-12" key={index}>
                    <label>{`Câu hỏi ${++index}: `}</label>
                    <span
                      dangerouslySetInnerHTML={{ __html: question?.content }}
                      style={{ width: 'fit-content' }}
                    ></span>
                    <RadioGroup className="list-question-bank">
                      {question.answers.map((answer, answerIndex) => {
                        return (
                          <FormControlLabel
                            value={answer?.id}
                            control={<Radio />}
                            label={<div dangerouslySetInnerHTML={{ __html: answer?.content }} />}
                            key={answerIndex}
                            checked={answer?.isCorrect}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                );
              })}
          </DialogContent>

          <DialogActions>
            <Button onClick={onSave} color="primary">
              Hoàn thành
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
}

export default QuizModal;
