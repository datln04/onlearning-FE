import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Styles from './Courses.module.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router';
import CourseCard from './CourseCard';
import { fetchData } from '../../../services/AppService';
import Loading from '../../Loading/Loading';

const Courses = ({ courses }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const list = [];
    for (const obj of courses) {
      fetchData('/feedback/rating-by-teacher?teacher_id=' + obj?.teacher?.id).then((resp) => {
        list.push({ ...obj, rating: resp.responseObject });
        setData(list);
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [courses]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container className="pt-5 pb-5">
          <Row>
            <Col lg="12" className="mb-5">
              <div className="d-flex justify-content-between align-items-center">
                <div className={classNames(Styles.course__top)}>
                  <div className={classNames(Styles.course__top__left, 'w-70')}>
                    <h2>Khóa học phổ biến</h2>
                  </div>
                </div>

                <div className={classNames('w-50 text-end')}>
                  <button onClick={() => navigate('/all-courses')} className={classNames('btn', Styles.course__btn)}>
                    Xem tất cả
                  </button>
                </div>
              </div>
            </Col>
            {data?.slice(0, 3).map((item) => (
              <Col key={item.id} lg="4" md="6" sm="6">
                <CourseCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Courses;
