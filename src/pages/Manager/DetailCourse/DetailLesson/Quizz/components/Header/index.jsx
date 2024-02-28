import classNames from 'classnames';
import Styles from './HeaderQuiz.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function HeaderQuiz({ name, timeMinute, point, due, onAutoSubmit, lesson }) {
  const { courseId, lessonId, id } = useParams();
  const user = JSON.parse(Cookies.get('user'));
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{ backgroundColor: '#f4f6f8', borderRadius: '20px' }}
        className={`d-flex ${classNames(Styles.header__quiz)} align-items-center`}
      >
        <div
          className="d-flex flex-grow-1 align-items-center justify-content-between"
          style={{ margin: '0 1rem', height: '90%' }}
        >
          <div className="">
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              {name}
            </Typography>
            <Typography variant="subtitle2">
              Kiểm tra: {name} • {timeMinute} phút • Điểm đạt là {point}/10 tổng điểm
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <bold>Ngày hết hạn:</bold> {due} tuần.
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderQuiz;
