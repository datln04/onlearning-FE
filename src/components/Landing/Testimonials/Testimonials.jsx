import React from "react";
import Styles from "./Testimonials.module.scss";
import classNames from "classnames";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.css";

import img from "../../../assets/images/testimonial01.png";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };
  return (
    <section>
      <Container className="vw-100">
        <Row>
          <Col lg="10" md="12">
            <div
              className={classNames(
                Styles.testimonial__wrapper,
                "d-flex justify-content-between align-items-center "
              )}
            >
              <div className={classNames(Styles.testimonial__img, "w-50")}>
                <img src={img} alt="" className="w-100" />
              </div>

              <div className={classNames(Styles.testimonial__content, " w-50")}>
                <h2 className="mb-4">Our Students Voice</h2>

                <Slider {...settings}>
                  <div>
                    <div className={classNames(Styles.single__testimonial)}>
                      <h6 className="mb-3 fw-bold">
                        Excellent course of materials
                      </h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis saepe id voluptas molestiae. Aperiam corrupti
                        voluptas earum at molestiae neque!
                      </p>

                      <div className={classNames(Styles.student__info, "mt-4")}>
                        <h6 className="fw-bold">Jhon Doe</h6>
                        <p>California, United State</p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
