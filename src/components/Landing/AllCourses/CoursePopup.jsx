import React, { useState } from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';
import { Avatar, Dialog, Divider, Rating, Typography } from '@mui/material';
import Styles from '../../../pages/OverviewCourse/OverviewCourse.module.scss';
import { Button, Container } from 'reactstrap';
import StarIcon from '@mui/icons-material/Star';
import { fetchData } from '../../../services/AppService';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const CoursePopup = ({ isOpen, onClose, props }) => {
    const [data, setData] = useState({
        id: '',
        image: '',
        name: '',
        price: '',
        description: '',
        limitTime: '',
        averagePoint: '',
        enrols: '',
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
            fetchData('/course/count-enrolled?course_id=' + props.item.id).then((resp) => {
                if (resp) {
                    setData({
                        id: props.item.id,
                        image: props.item.image,
                        name: props.item.name,
                        price: props.item.price,
                        description: props.item.description,
                        limitTime: props.item.limitTime,
                        averagePoint: props.item.averagePoint,
                        rating: props.item.rating,
                        enrols: resp.responseObject,
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
                        }
                    });
                }
            })
        }
    }, [props]);
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
            <Button sx={{ display: 'flex', float: 'right' }} onClick={onClose}>
                <ExitToAppIcon />
            </Button>
            <div >
                <Container>
                    <div className="py-48" style={{ padding: '48px 15px' }}>
                        <div className="row ">
                            <div className="col-8">
                                <div className={`${classNames(Styles.course__img)} col-6`}>
                                    <img src={data.image} alt="" className="w-100" style={{ height: '260px' }} />
                                </div>
                                <Typography variant="h4" gutterBottom>
                                    {data.name}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Giá: {data.price?.toLocaleString()} VNĐ
                                </Typography>

                                <Typography variant="subtitle1" gutterBottom>
                                    {data.description}
                                </Typography>
                                <div className="mt-4 ">

                                </div>
                                <div className="mt-4">
                                    <Typography variant="subtitle1">
                                        Số lượng đã đăng ký:
                                        {data.enrols >= 1 ? (
                                            <strong>{data.enrols}</strong>
                                        ) : (
                                            <strong>{'Chưa có đăng ký'}</strong>
                                        )}
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-4 position-relative">
                                <div className="position-sticky" style={{ zIndex: 999 }}>
                                    <div
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '0.5rem',
                                            boxShadow: '0 0 32px -8px rgb(0 0 0 / 50%)',
                                        }}
                                    >
                                        <div className="px-4 py-3">
                                            <div className=" py-3">
                                                <Typography style={{ fontWeight: 600 }} variant="subtitle1">
                                                    {data.name}
                                                </Typography>

                                                <Typography variant="body2">{data.description}</Typography>
                                            </div>
                                            <Divider />
                                            <div
                                                style={{
                                                    height: '300px',
                                                    overflowX: 'auto',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                <div><strong>Chủ đề: </strong>{data.subject.name}</div>
                                                {/* <div><strong>Khóa học: </strong>{data.name}</div> */}
                                                <div><strong>Thời gian học: </strong>{data.limitTime} tháng</div>
                                                <div><strong>Điểm bắt buộc hoàn thành khóa: </strong>{data.averagePoint}</div>
                                            </div>

                                            <div style={{ marginTop: '-10rem', marginBottom: '1rem' }}>
                                                <div className="d-flex align-items-start gap-2">
                                                    <Avatar alt={data.teacher.name} src={data.teacher.avatar} />
                                                    <div style={{ gap: '8px' }}>
                                                        <Typography sx={{ fontWeight: 700 }} variant="subtitle1">
                                                            {data.teacher.name}{' '}
                                                        </Typography>
                                                        <Typography color={'grey'} variant="caption">
                                                            {data.teacher.phone}
                                                        </Typography>
                                                        <Typography color={'grey'} variant="subtitle1">
                                                            {data.teacher.email}
                                                        </Typography>
                                                        <Rating
                                                            name="text-feedback"
                                                            value={data.rating}
                                                            readOnly
                                                            precision={0.05}
                                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                        />
                                                        {data.rating >= 1 ? (
                                                            <></>
                                                        ) : (
                                                            <Typography color={'grey'} variant="subtitle1">
                                                                (Chưa có đánh giá)
                                                            </Typography>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div >
        </Dialog >
    );
};

export default CoursePopup;
