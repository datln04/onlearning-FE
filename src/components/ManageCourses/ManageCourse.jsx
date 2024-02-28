import React, { useEffect, useState } from 'react';
import { courseData } from '../../mock/mock-data';
import CourseTabsComponent from './CourseTabComponent/CourseTabsComponent';
import { Container } from 'reactstrap';
import { Box } from '@mui/system';
import { fetchData } from '../../services/AppService';
import Loading from '../Loading/Loading';
import Cookies from 'js-cookie';
import CustomBreadcrumbs from '../Breadcrumbs';

function ManageCourse() {
  const [activeCourses, setActiveCourses] = React.useState([]);
  const [inactiveCourses, setInactiveCourses] = React.useState([]);
  const [pendingCourses, setPendingCourses] = React.useState([]);
  const [draftCourses, setDraftCourses] = React.useState([]);
  const [rejectCourses, setRejectCourses] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/manage-course`,
      label: `Quản lý khóa học`,
    },
  ];

  useEffect(() => {
    const userTmp = JSON.parse(Cookies.get('user'));
    const token = Cookies.get('token');
    if (userTmp !== null && token !== null) {
      setLoading(true);

      try {
        const courseData = fetchData(`/course/byTeacherId?teacher-id=${userTmp?.teacherId}`, token).then((resp) => {
          if (resp) {
            const dataPromises = resp.map(async (c) => {
              try {
                const enroll = await fetchData(`/enroll/byCourseId?course_id=${c.id}`, token);

                // Count the number of elements with status "PROCESSING"
                const count = enroll.reduce((accumulator, e) => {
                  if (e.status === 'PROCESSING') {
                    return accumulator + 1;
                  }
                  return accumulator;
                }, 0);

                return { ...c, enrolling: count };
              } catch (error) {
                console.error(error);
                throw error; // rethrow the error to be caught by the caller
              }
            });

            Promise.all(dataPromises)
              .then((data) => {
                const active = data.filter((course) => course.status === 'ACTIVE');
                const inactive = data.filter((course) => course.status === 'DEACTIVE');
                const pending = data.filter((course) => course.status === 'PENDING');
                const draft = data.filter((course) => course.status === 'DRAFT');
                const reject = data.filter((course) => course.status === 'REJECT');

                setActiveCourses(active);
                setInactiveCourses(inactive);
                setPendingCourses(pending);
                setDraftCourses(draft);
                setRejectCourses(reject);
                setLoading(false);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            // Handle the case when courseData is not an array (e.g., an error occurred)
            console.error('courseData is not an array:', courseData);
          }
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Box mt={2}>
        <CourseTabsComponent
          size={activeCourses.length + inactiveCourses.length + pendingCourses.length + draftCourses.length}
          activeCourses={activeCourses}
          inactiveCourses={inactiveCourses}
          pendingCourses={pendingCourses}
          draftCourses={draftCourses}
          rejectCourses={rejectCourses}
        />
      </Box>
    </>
  );
}

export default ManageCourse;
