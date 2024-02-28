import React from "react";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../../assets/images/about-us.png";
import CountUp from "react-countup";
import Styles from "./AboutUs.module.scss";
import classNames from "classnames";

const AboutUs = () => {
  return (
    <section className="mt-5 mb-5">
      <Container className="pt-5 pb-5">
        <Row>
          <Col lg="6" md="6">
            <div className={classNames(Styles.about__img)}>
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className={classNames(Styles.about__content)}>
              <h2>About Us</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Excepturi cupiditate animi deserunt libero nesciunt corporis
                explicabo nobis ex quo molestiae!
              </p>

              <div className={classNames(Styles.about__counter)}>
                <div className=" d-flex gap-5 align-items-center">
                  <div className={classNames(Styles.single__counter)}>
                    <span className={classNames(Styles.counter)}>
                      <CountUp start={0} end={25} duration={2} suffix="K" />
                    </span>

                    <p className={classNames(Styles.counter__title)}>
                      Completed Projects
                    </p>
                  </div>

                  <div className={classNames(Styles.single__counter)}>
                    <span className={classNames(Styles.counter)}>
                      <CountUp start={0} end={12} duration={2} suffix="M" />
                    </span>

                    <p className={classNames(Styles.counter__title)}>
                      Patient Around World
                    </p>
                  </div>
                </div>

                <div className=" d-flex gap-5 align-items-center">
                  <div className={classNames(Styles.single__counter)}>
                    <span className={classNames(Styles.counter)}>
                      <CountUp start={0} end={95} duration={2} suffix="M" />
                    </span>

                    <p className={classNames(Styles.counter__title)}>
                      Ideas Raised Funds
                    </p>
                  </div>

                  <div className={classNames(Styles.single__counter)}>
                    <span className={classNames(Styles.counter)}>
                      <CountUp start={0} end={5} duration={2} suffix="K" />
                    </span>

                    <p className={classNames(Styles.counter__title)}>
                      Categories Served
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
