import React from 'react';
import CourseTabComponent from './CourseTabComponent/CourseTabComponent';
import { Container } from 'reactstrap';
import { Paper, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import { fetchData } from '../../../services/AppService';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';

const ManageAllCourse = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [activeCourses, setActiveCourses] = useState([]);
  const [deActiveCourses, setDeActiveCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [subject, setSubject] = useState();
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/courses`,
      label: `Danh sách khoá học`,
    },
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData('/course/courses', token).then((resp) => {
        if (resp) {
          console.log(resp)
          // Filter courses based on their status
          const active = resp.filter((course) => course.status === 'ACTIVE');
          const deactive = resp.filter((course) => course.status === 'DEACTIVE');
          const pending = resp.filter((course) => course.status === 'PENDING');

          setActiveCourses(active);
          setDeActiveCourses(deactive);
          setPendingCourses(pending);

          const data = new Map();
          for (const obj of resp) {
            data.set(obj.subject, obj.subject);
          }

          const unique = [...data.values()];

          const key = 'name';
          const arrayUniqueByKey = [...new Map(unique.map((item) => [item[key], item])).values()];

          setSubjectData(arrayUniqueByKey);
        }
      });
    }
  }, []);

  return (
    subjectData && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row">
          <h4 style={{ fontWeight: 'bold' }}>Danh sách khoá học</h4>
          <CustomBreadcrumbs items={breadcrumbItems} />

          <div className=" mt-3">
            <CourseTabComponent
              activeCourses={activeCourses}
              pendingCourses={pendingCourses}
              deActiveCourses={deActiveCourses}
              subject={subjectData}
            />
          </div>

        </div>
      </div>
    )
  );
};

export default ManageAllCourse;
