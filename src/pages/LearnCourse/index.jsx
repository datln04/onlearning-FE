import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { courseData } from '../../mock/mock-data';
import Footer from '../../components/Landing/Footer/Footer';
import Header from '../../components/Landing/Header/Header';
import { Container } from 'reactstrap';
import { Divider } from '@mui/material';
import NavBarLesson from './components/NavBarLesson';
import CustomBreadcrumbs from '../../components/Breadcrumbs';
import { CourseControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
function LearnCourse() {
  const [course, setCourse] = useState();
  const { courseId, syllabusId } = useParams();
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
    {
      url: ``,
      label: `Khóa học: ${course?.name}`,
    },
  ];

  const getCourseById = () => {
    courseApi.getCourseById(courseId, (err, res) => {
      if (res) {
        setCourse(res);
      }
    });
  };
  useEffect(() => {
    getCourseById();
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
              <div>
                <NavBarLesson courseId={courseId} syllabusId={syllabusId} />
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
}

export default LearnCourse;
