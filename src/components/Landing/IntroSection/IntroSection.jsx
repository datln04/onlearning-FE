import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import introImg from '../../../assets/images/intro__image.png';
import Styles from './IntroSection.module.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const IntroSection = () => {
  return (
    <section className="mt-5 mb-5">
      <Container className="pt-5 pb-5">
        <Row>
          <Col lg="6" md="6">
            <div className={classNames(Styles.intro__content)}>
              <h2 className={classNames(Styles.intro__title, 'mb-4')}>
                Bất kỳ đâu, bất kỳ lúc nào <br /> Việc học với lịch trình phù hợp <br />
              </h2>
              <p className="mb-5 w-75">
                Bắt đầu, chuyển đổi hoặc thăng tiến trong sự nghiệp của bạn với hơn 1.000 khóa học, nội dung các khoá
                học chuyên môn được kiểm duyệt kỹ càng từ các chuyên gia và công ty đẳng cấp thế giới.
              </p>
            </div>
            <div className={classNames(Styles.intro__button)}>
              <Link to="/login" className={classNames('btn btn-lg', Styles.btn__custom)}>
                Trải nghiệm ngay
              </Link>
            </div>
          </Col>

          <Col lg="6" md="6">
            <img src={introImg} alt="" className="w-100 intro__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default IntroSection;
