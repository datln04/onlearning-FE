import React from "react";
import { Container, Row, Col } from "reactstrap";
import Styles from "./Features.module.scss";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css";

const FeatureData = [
  {
    title: "Quick Learning",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum molestias, aperiam doloribus aut sapiente praesentium eos iste dicta amet itaque!",
    icon: "ri-draft-line",
  },

  {
    title: "All Time Support",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum molestias, aperiam doloribus aut sapiente praesentium eos iste dicta amet itaque!",
    icon: "ri-discuss-line",
  },

  {
    title: "Certification",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum molestias, aperiam doloribus aut sapiente praesentium eos iste dicta amet itaque!",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section className="mt-5 mb-5">
      <Container className="pt-5 pb-5">
        <h2>OUR FEATURES</h2>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div
                className={classNames(
                  Styles.single__feature,
                  "text-center px-4"
                )}
              >
                <h2 className="mb-3">
                  <i className={item.icon}></i>
                </h2>
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
