import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Styles from './Courses.module.scss';
import courseImg2 from '../../../assets/images/graphics-design.png';
import { Link } from 'react-router-dom';


const CourseCard = (props) => {
  const [data, setData] = useState({
    id: "",
    image: "",
    name: "",
    price: "",
    description: "",
    teacher: {
      name: "",
      email: ""
    },
    subject: {
      name: "",
      minPrice: ""
    }
  })
  useEffect(() => {
    if (props) {
      setData({
        id: "",
        image: props.item.image,
        name: props.item.name,
        price: props.item.price,
        description: props.item.description,
        teacher: {
          name: props.item.teacher.account.profile.lastName + " " + props.item.teacher.account.profile.firstName,
          email: ""
        },
        subject: {
          name: props.item.subject.name,
          minPrice: ""
        }
      })
    }
  }, [props])

  return (
    <div className={classNames(Styles.single__course__item)}>
      <div
        className={classNames(Styles.course__img)}
        onClick={() => {
          // navigate(`/overview-course/${id}`);
        }}
      >
        <img src={courseImg2} alt="" className="w-100" />
      </div>

      <div className={classNames(Styles.course__details)}>
        <h6 className={classNames(Styles.course__title, 'mb-4')}>[{data.subject.name} ] - {data.name}</h6>

        <div className="d-flex justify-content-between align-items-center">
          <p className={classNames(Styles.lesson, 'd-flex align-items-center gap-1')}>
            <i className="ri-book-open-line">{data.description}</i>
          </p>

          <p className={classNames(Styles.students, 'd-flex align-items-center gap-1')}>
            <i className={classNames('ri-user-line')}>{data.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</i>  VND
          </p>
        </div>

        <div className=" d-flex justify-content-between align-items-center">
          <p className={classNames(Styles.rating, 'd-flex align-items-center gap-1')}>
            <i className={classNames('ri-star-fill')}>GV: {data.teacher.name}</i>
            {/* <MdFavorite /> */}
          </p>

          <p className={classNames(Styles.enroll, 'd-flex align-items-center gap-1')}>
            <Link to={`/login`}>Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
