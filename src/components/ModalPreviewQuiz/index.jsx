import { Box, FormControlLabel, FormLabel, Icon, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import HeaderQuiz from '../../pages/Quizz/components/Header';
import { Container } from 'reactstrap';
import { QuizControllerApi, ResultDetailControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import { useEffect, useState } from 'react';
import './style.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const resultQuizDetailApi = new ResultDetailControllerApi(ApiClientSingleton.getInstance());
const quizApi = new QuizControllerApi(ApiClientSingleton.getInstance());
function ModalPreviewQuiz({ isOpen, onClose, resultInfo }) {
  const [results, setResults] = useState([]);
  const [quiz, setQuiz] = useState();
  useEffect(() => {
    if (resultInfo) {
      console.log(resultInfo);
      resultQuizDetailApi.findAllByResultQuiz(resultInfo?.id, (err, res) => {
        if (res) {
          setResults(res);
        }
      });
      quizApi.findQuizById(resultInfo?.quiz?.id, (err, res) => {
        if (res) {
          setQuiz(res);
        }
      });
    }
  }, [resultInfo]);
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => {
          if (onClose !== undefined) {
            onClose();
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '80vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            padding: '16px',
          }}
        >
          <>
            <div className={`d-flex align-items-center`}>
              <div
                className="d-flex flex-grow-1 align-items-center justify-content-between"
                style={{ margin: '0 1rem', height: '90%' }}
              >
                <div className="">
                  <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                    {resultInfo?.quiz?.title}
                  </Typography>
                  <Typography variant="subtitle2">
                    Thời gian: {quiz?.duration} phút • Điểm hoàn thành {quiz?.passScore}/10
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle1">
                    <strong>Điểm: </strong> {resultInfo?.lastPoint.toFixed(2)}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle1">
                    <strong>Kết quả:</strong>{' '}
                    <span style={{ color: resultInfo?.resultStatus === 'FAIL' ? 'red' : 'green' }}>
                      {resultInfo?.resultStatus === 'FAIL' ? 'Không đạt' : 'Đạt'}
                    </span>
                  </Typography>
                </div>
              </div>
            </div>
            <hr className="m-0" />
            <div style={{ overflow: 'auto', height: 'calc(100% - 82px)' }}>
              <>
                <Container style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '50%' }}>
                    {results?.map((data, index) => {
                      return (
                        <>
                          <div>
                            <FormLabel style={{ color: '#1f1f1f' }} id="demo-radio-buttons-group-label">
                              <div
                                className="ql-editor "
                                style={{
                                  padding: 0,
                                  // marginLeft: '20px',
                                  wordBreak: 'break-word',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <div>
                                  <strong>{index + 1}: </strong>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: data?.usedQuestion.content || '' }} />
                              </div>
                            </FormLabel>
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                              <>
                                {data?.usedAnswerResponses?.map((question) => {
                                  return (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      {question?.isChoose ? (
                                        <div style={{ color: data?.isCorrect ? 'green' : 'red', marginLeft: '-36px' }}>
                                          {data?.isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                                        </div>
                                      ) : (
                                        <></>
                                      )}

                                      <FormControlLabel
                                        value={123}
                                        control={<Radio disabled checked={question?.isChoose} />}
                                        label={
                                          <div
                                            className="render-quill"
                                            style={{ margin: 0, color: '#000' }}
                                            dangerouslySetInnerHTML={{ __html: question?.content || '' }}
                                          />
                                        }
                                      />
                                    </div>
                                  );
                                })}
                              </>
                            </RadioGroup>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </Container>
              </>
            </div>
          </>
        </Box>
      </Modal>
    </>
  );
}

export default ModalPreviewQuiz;
