import React, { useEffect, useState } from 'react';
import Header from '../../components/Landing/Header/Header';
import StudentIntroSection from '../../components/StudentLanding/IntroSection/StudentIntroSection';
import StudentTabComponent from '../../components/StudentLanding/StudentTabComponent/StudentTabComponent';
import Courses from '../../components/Landing/CourseSection/Courses';
import Features from '../../components/Landing/Features/Features';
import Testimonials from '../../components/Landing/Testimonials/Testimonials';
import ContactUs from '../../components/Landing/ContactUs/ContactUs';
import Footer from '../../components/Landing/Footer/Footer';
import { CourseControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import Cookies from 'js-cookie';
import Course from '../../components/Landing/CourseSection/Courses';
import Loading from '../../components/Loading/Loading';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const StudentLanding = ({ activeTabId }) => {
  const user = JSON.parse(Cookies.get('user'));
  const [courses, setCourses] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);

  const getCourses = () => {
    courseApi.findAllCourseUnEnrolledByStudent(user?.studentId, 'ACTIVE', { value: searchValue }, (err, res) => {
      if (res) {
        setCourses(res);
      }
    });
  };

  useEffect(() => {
    getCourses();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [activeTabId, searchValue]);
  return (
    <>
      <Header setSearchValue={setSearchValue} getCourses={getCourses} />
      <StudentIntroSection />
      <StudentTabComponent tabId={activeTabId} />
      {/* <Courses courses={courses} /> */}
      {loading ? <Loading /> : <Course courses={courses} />}

      <Footer />
    </>
  );
};

export default StudentLanding;
