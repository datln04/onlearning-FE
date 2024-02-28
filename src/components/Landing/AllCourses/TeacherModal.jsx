import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Avatar,
  Card,
  CardContent,
  Rating,
  CardMedia,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useEffect } from 'react';
import { fetchData } from '../../../services/AppService';

const TeacherModal = ({ isOpen, onClose, teacher, teacherRating }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (teacher) {
      fetchData('/course/byTeacherId?teacher-id=' + teacher.id).then((resp) => {
        if (resp) {
          setCourses(resp.filter((course) => course.status === "ACTIVE"));
        }
      });
    }
  }, [teacher]);

  return (
    <Dialog sx={{ overflow: 'auto' }} open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle className="text-center" sx={{ fontWeight: 700 }}>
        Thông tin giảng viên
      </DialogTitle>

      <DialogContent>
        <div className="row">
          <div className="col-4">
            <Card
              className="p-3"
              sx={{
                borderRadius: '20px',
                maxWidth: '100%',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
              }}
            >
              <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <div className="p-5">
                  <div className="d-flex justify-content-center p-2">
                    <div style={{ border: '1px dashed rgba(145, 158, 171, 0.46)' }} className="p-2  rounded-circle">
                      <Avatar
                        sx={{ width: 130, height: 130, backgroundColor: '#D7DBFF' }}
                        alt={teacher?.account?.profile?.firstName}
                        src={teacher?.account?.profile?.avatar}
                      />
                    </div>
                  </div>
                  <Typography style={{ fontWeight: 700, textAlign: 'center' }}>
                    @{teacher?.account?.profile?.email}{' '}
                  </Typography>
                </div>
                <Typography style={{ fontWeight: 700, color: 'grey', textAlign: 'center' }}>
                  GIẢNG VIÊN
                </Typography>
              </CardContent>
              <div className="d-flex justify-content-center">
                <Rating
                  name="text-feedback"
                  value={teacherRating}
                  readOnly
                  precision={0.05}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
              <div className="d-flex justify-content-center mb-3">
                {teacherRating ? (
                  <></>
                ) : (
                  <Typography color={'grey'} variant="subtitle1">
                    (Chưa có đánh giá)
                  </Typography>
                )}
              </div>
            </Card>
          </div>

          <div className="col-8">
            <Card
              className="p-3"
              sx={{
                borderRadius: '20px',
                maxHeight: 'max-content',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
              }}
            >
              <CardContent
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                  gap: 1.5,
                }}
              >

                <div>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="last_name">
                    Họ
                  </Typography>
                  {teacher?.account?.profile?.lastName}{''}
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="first_name">
                    Tên
                  </Typography>
                  {teacher?.account?.profile?.firstName}{''}
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="email">
                    Email
                  </Typography>
                  {teacher?.account?.profile?.email}{''}
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="phone">
                    Số điện thoại
                  </Typography>
                  {teacher?.account?.profile?.phone}{''}
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="address">
                    Địa chỉ
                  </Typography>
                  {teacher?.account?.profile?.address}{''}
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgb(99, 115, 129)' }} htmlFor="description">
                    Mô tả
                  </Typography>
                  {teacher?.account?.profile?.description}{''}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="row mt-4">
          <Typography variant="title1" sx={{ fontWeight: 700, fontSize: 27 }} className="text-center">
            Các khoá học
          </Typography>
          {courses?.length > 0 &&
            courses.map((c) => {
              return (
                <Card
                  key={c.id}
                  sx={{
                    marginTop: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                    padding: '20px',
                    borderRadius: '20px',
                    transition: 'box-shadow 0.3s ease', // Add transition for smooth hover effect
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add box-shadow on hover
                      cursor: 'pointer',
                    },
                    boxShadow: 'rgba(117, 123, 129, 0.2) 0px 0px 2px 0px, rgba(88, 91, 94, 0.12) 0px 12px 24px -4px',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={c.image}
                    alt={c.name}
                    sx={{
                      width: '200px !important',
                      height: '140px !important',
                      borderRadius: '8px',
                      marginRight: 2,
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" component="div">
                      {c.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                      {c.description}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#727477' }} component="div">
                      {c.price.toLocaleString()} VNĐ
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                      Thời hạn hoàn thành: {c.limitTime} tháng
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}

          {courses ? (
            <>

            </>) : (<>
              <div style={{ backgroundColor: '#f4f6f8' }} className="p-3 text-center">
                <h5>   Hiện tại chưa có khóa học khác</h5>
              </div>
            </>)}
        </div>
      </DialogContent>

      <DialogActions>
        <div style={{ padding: '1rem' }}>
          <button
            onClick={onClose}
            style={{ backgroundColor: '#212b36', color: 'white', borderRadius: 8, fontWeight: 700 }}
            className="btn px-3"
          >
            Thoát
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherModal;
