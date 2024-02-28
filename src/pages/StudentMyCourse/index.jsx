import React from 'react';
import Header from '../../components/Landing/Header/Header';
import StudentIntroSection from '../../components/StudentLanding/IntroSection/StudentIntroSection';
import StudentTabComponent from '../../components/StudentLanding/StudentTabComponent/StudentTabComponent';
import Courses from '../../components/Landing/CourseSection/Courses';
import Footer from '../../components/Landing/Footer/Footer';

const StudentMyCourse = () => {
  return (
    <>
      <Header />
      <StudentIntroSection />
      <StudentTabComponent tabId={1} />
      <Courses />
      <Footer />
    </>
  );
};

export default StudentMyCourse;
