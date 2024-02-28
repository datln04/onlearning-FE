import 'bootstrap/dist/css/bootstrap.css';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import { Container } from 'reactstrap';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Avatar, Divider, Typography } from '@mui/material';
import LeftNavBar from './Components/LeftNavBar';
import { CourseControllerApi, EnrollControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import CustomBreadcrumbs from '../../components/Breadcrumbs';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const CourseDetail = () => {
  const [course, setCourse] = useState();
  const { courseId } = useParams();
  const breadcrumbItems = [
    {
      url: '/student-home',
      label: 'Trang chủ',
    },
    {
      url: '/my-course',
      label: 'Khóa học của tôi',
    },
    {
      url: `/courses/${courseId}`,
      label: `Thông tin khóa học`,
    },
  ];

  useEffect(() => {
    courseApi.getCourseById(courseId, (error, res) => {
      setCourse(res);
    });
  }, [courseId]);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <CustomBreadcrumbs items={breadcrumbItems} />
      </div>
      <Container className="mt-1">
        <Divider className="my-4" />
        <div className="row">
          <div className="col-3">
            <div className="d-flex flex-column gap-3">
              <Avatar variant="rounded" alt={course?.name} src={course?.image} sx={{ width: 114, height: 114 }} />
              <Typography variant="h5">{course?.name}</Typography>
              <div>
                <LeftNavBar courseId={courseId} />
              </div>
            </div>
          </div>
          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default CourseDetail;
