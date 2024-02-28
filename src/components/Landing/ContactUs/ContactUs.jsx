import React from "react";
import { Container, Row, Col } from "reactstrap";
import imgContact from "../../../assets/images/contact-us.png";
import Styles from "./ContactUs.module.scss";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css";

const ContactUs = () => {
  return (
    <section className="mt-5 mb-5">
      <Container className="pt-5 pb-5">
        <Row
          className={classNames(Styles.contact__us)}
          style={{ opacity: 1, transform: "none" }}
        >
          <Col lg="12" className="text-start">
            <div className="mb-4 z-3 position-relative ">
              <div>
                <h2
                  className="mb-4 fw-bold fs-1"
                  style={{ opacity: 1, transform: "none" }}
                >
                  BẮT ĐẦU NÀO
                </h2>
                <p
                  className="fw-bolder"
                  style={{ opacity: 1, transform: "none" }}
                >
                  OnLearn được phát triển dựa trên mục đích học tập linh hoạt
                  thời gian, các khóa học sẽ được chia theo lớp và có người sẵn sàng
                  hỗ trợ hướng dẫn nội dung bài học.
                </p>
              </div>
              <a
                href="/about-us"
                className={classNames(
                  Styles.contact__btn,
                  "mt-4 btn fw-bold text-body-tertiary"
                )}
              >
                Liên hệ chúng tôi
              </a>
            </div>

            <div
              className={classNames(
                Styles.contact__img,
                "position-absolute bottom-100 start-100 translate-middle"
              )}
            >
              <img src={imgContact} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;
