import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Styles from './Courses.module.scss';
import CourseView from "../AllCourses/CoursePopup";
import Teacher from "../AllCourses/TeacherModal"
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  Avatar,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const CourseCard = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [data, setData] = useState({
    id: '',
    image: '',
    name: '',
    price: '',
    description: '',
    limitTime: '',
    averagePoint: '',
    teacher: {
      name: '',
      email: '',
      avatar: '',
      phone: '',
      firstName: '',
      lastName: '',
      description: '',
      address: '',
      dateOfBirth: '',
      rating: ''
    },
    subject: {
      name: '',
      minPrice: '',
    },
  });
  useEffect(() => {
    if (props) {
      console.log(53, props)
      setData({
        id: props.item.id,
        image: props.item.image,
        name: props.item.name,
        price: props.item.price,
        description: props.item.description,
        limitTime: props.item.limitTime,
        averagePoint: props.item.averagePoint,
        rating: props.item.rating,
        teacher: {
          name: props.item.teacher.account.profile.lastName + ' ' + props.item.teacher.account.profile.firstName,
          email: props.item.teacher.account.profile.email,
          avatar: props.item.teacher.account.profile.avatar,
          phone: props.item.teacher.account.profile.phone,
          firstName: props.item.teacher.account.profile.firstName,
          lastName: props.item.teacher.account.profile.lastName,
          description: props.item.teacher.account.profile.description,
          address: props.item.teacher.account.profile.address,
          dateOfBirth: props.item.teacher.account.profile.dateOfBirth,
        },
        subject: {
          name: props.item.subject.name,
          minPrice: '',
        },
      });
    }

    // fetchData('/feedback/rating-by-teacher?teacher_id=' + props.item.teacher.id).then((resp) => {
    //   setData({ ...data, rating: resp.responseObject });
    // });

  }, [props]);

  const handleOnclickCourse = (course) => {
    const user = Cookies.get('user');
    if (user) { navigate(`/overview-course/${data.id}`); }
    else { setOpen(true) }
  };
  const handleClose = () => {
    setOpen(false);
    setOpenTeacher(false);
  };
  return (
    <>
      <CourseView
        isOpen={open}
        onClose={handleClose}
        props={props}
      />
      <Teacher
        isOpen={openTeacher}
        onClose={handleClose}
        teacherRating={data.rating}
        teacher={props.item.teacher}
      />
      <Card className="mt-5" sx={{ maxWidth: 345, maxHeight: 200 }}>
        <CardActionArea onClick={() => handleOnclickCourse()}>
          <CardMedia component="img" height="200" image={data.image} alt="green iguana" />
          <CardContent style={{ height: 200 }}>
            <div style={{ height: 60 }}>
              <Typography gutterBottom variant="h6" component="div">
                {data.name}
              </Typography>
            </div>

            <Typography gutterBottom variant="caption" className="mt-2" style={{ fontSize: 15 }} component="div">
              <strong>{data.subject.name}</strong>
            </Typography>
            <div style={{ height: 50 }}>
              <Typography className={classNames(Styles.description_style)} variant="body2" color="text.secondary">
                {data.description}
              </Typography>
            </div>
            <Typography className={classNames(Styles.description_style)} variant="body2" color="text.secondary">
              {data.price?.toLocaleString()} VNĐ
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" fullWidth onClick={() => {
            setOpenTeacher(true);
          }}>
            <Avatar
              className="p-2 mx-2"
              style={{ width: 30, height: 30 }}
              alt={data.teacher.name}
              src={data.teacher.avatar}
            />
            {data.teacher.name}

            <div className="col-6">
              {data.rating >= 1 ? (
                <Rating
                  name="text-feedback"
                  value={data.rating}
                  readOnly
                  precision={0.05}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              ) : (
                <Typography color={'grey'} variant="overline">
                  (Chưa có đánh giá)
                </Typography>
              )}
            </div>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CourseCard;
