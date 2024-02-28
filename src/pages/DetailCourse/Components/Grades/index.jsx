import { Divider, IconButton, Typography } from '@mui/material';
import Footer from '../../../../components/Landing/Footer/Footer';
import Header from '../../../../components/Landing/Header/Header';
import { Container } from 'reactstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'moment/moment';
import { ResultQuizControllerApi } from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PATTERN_DATE, formatDate } from '../../../../constant';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModalPreviewQuiz from '../../../../components/ModalPreviewQuiz';

const resultQuizApi = new ResultQuizControllerApi(ApiClientSingleton.getInstance());
function Grades() {
  const user = JSON.parse(Cookies.get('user'));
  const { courseId } = useParams();
  const [results, setResults] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [resultQuiz, setResultQuiz] = useState();

  useEffect(() => {
    resultQuizApi.findAllByStudentAndCourse(user?.studentId, courseId, (err, res) => {
      if (res) {
        // Group elements based on referenceId
        const groupedObjects = res.reduce((acc, obj) => {
          const referenceId = obj?.quiz?.id;
          acc[referenceId] = acc[referenceId] || [];
          acc[referenceId].push(obj);
          return acc;
        }, {});
        // Find the object with the highest point in each subarray
        const arrayOfObjectsWithHighestPoints = Object.values(groupedObjects).map((arr) => {
          const objectWithHighestPoint = arr.reduce((max, obj) => (obj?.lastPoint > max?.lastPoint ? obj : max), arr[0]);
          return objectWithHighestPoint;
        });

        setResults(arrayOfObjectsWithHighestPoints);
      }
    });
  }, [courseId]);
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-1"></div>
        <div className="col-3">
          <Typography variant="subtitle1">Bài kiểm tra</Typography>
        </div>
        <div className="col-1">
          <Typography variant="subtitle1">Điểm</Typography>
        </div>
        <div className="col-2">
          <Typography variant="subtitle1">Trạng thái</Typography>
        </div>
        <div className="col-2">
          <Typography variant="subtitle1">Ngày nộp</Typography>
        </div>
        <div className="col-1">
          <Typography variant="subtitle1">Xem</Typography>
        </div>
      </div>
      <Divider className="py-2" />
      {results?.map((grade) => {
        if (grade) {
          return (
            <>
              <div
                className="row align-items-center justify-content-center py-3"
                style={{
                  border: '1px solid #e5e7e8',
                }}
              >
                <div className="col-1  d-flex justify-content-end">
                  {grade?.resultStatus === 'PASS' ? (
                    <IconButton style={{ color: '#1d7c50' }}>
                      <CheckCircleIcon />
                    </IconButton>
                  ) : (
                    <IconButton style={{ color: '#ff173d' }}>
                      <CancelIcon />
                    </IconButton>
                  )}
                </div>
                <div className="col-3">
                  <Typography variant="subtitle1">{grade?.quiz.title}</Typography>
                </div>
                <div className="col-1">
                  <Typography variant="subtitle1">{grade?.lastPoint.toFixed(2)}</Typography>
                </div>
                <div className="col-2">
                  <Typography variant="subtitle1">{grade?.resultStatus === 'PASS' ? 'Đạt' : 'Không đạt'}</Typography>
                </div>
                <div className="col-2">
                  <Typography variant="subtitle1">
                    {formatDate(grade?.submitTime, PATTERN_DATE.HH_MM_SS_DD_MM_YYYY)}
                  </Typography>
                </div>
                <div className="col-1">
                  <IconButton
                    onClick={() => {
                      setIsOpenModal(true);
                      setResultQuiz(grade);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </div>
              </div>
            </>
          );
        }
      })}
      <ModalPreviewQuiz
        resultInfo={resultQuiz}
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      />
    </>
  );
}

export default Grades;
