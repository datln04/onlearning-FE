import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CourseCard from '../AllCourses/CourseCard';
import Styles from './Courses.module.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { fetchData } from '../../../services/AppService';
import { useNavigate } from 'react-router';
import Loading from '../../Loading/Loading';

const Courses = () => {
  const [dataCourse, setDataCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchData('/course/by-status-active').then((resp) => {
      if (resp) {
        const list = [];
        for (const obj of resp) {
          fetchData('/feedback/rating-by-teacher?teacher_id=' + obj?.teacher?.id).then((resp) => {
            list.push({ ...obj, rating: resp.responseObject });
            setDataCourse(list);
            setTimeout(() => {
              setLoading(false);
            }, 500);
          });
        }
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="mt-5 mb-5">
          <Container className="pt-5 pb-5">
            <Row>
              <Col lg="12" className="mb-5">
                <div className="d-flex justify-content-between align-items-center">
                  <div className={classNames(Styles.course__top)}>
                    <div className={classNames(Styles.course__top__left, 'w-70')}>
                      <h2>Các khóa học phổ biến của chúng tôi</h2>
                      <p>
                        Khóa học trực tuyến đang là hình thức phổ biến nhất của hệ thống đào tạo E-Learning. Ở hình thức
                        học này, giáo viên sẽ xây dựng nội dung bài giảng theo từng từng môn học, từng chủ đề, từng lĩnh
                        vực cụ thể cùng các giáo trình, tài liệu và slide bài giảng, video hướng dẫn,… Giúp người học
                        tiếp cận kiến thức và kỹ năng thuận tiện, hiệu quả nhất!
                      </p>
                    </div>
                  </div>

                  <div className={classNames('w-50 text-end')}>
                    <button className={classNames('btn', Styles.course__btn)} onClick={() => navigate('/all-courses')}>
                      Xem tất cả
                    </button>
                  </div>
                </div>
              </Col>
              {dataCourse?.map((item, index) => (
                <>
                  {index < 3 ? (
                    <Col key={item.id} lg="4" md="6" sm="6">
                      <CourseCard item={item} />
                    </Col>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default Courses;
