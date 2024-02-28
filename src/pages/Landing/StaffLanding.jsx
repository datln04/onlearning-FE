import React from 'react';
import Courses from '../../components/Landing/CourseSection/Courses';
import Features from '../../components/Landing/Features/Features';
import Testimonials from '../../components/Landing/Testimonials/Testimonials';
import ContactUs from '../../components/Landing/ContactUs/ContactUs';
import Footer from '../../components/Landing/Footer/Footer';
import StaffIntroSection from '../../components/StaffLanding/StaffIntroSection/StaffIntroSection';
import StaffHeader from '../../components/StaffLanding/StaffHeader/StaffHeader';

const StaffLanding = () => {
  return (
    <>
      <StaffHeader />
      <StaffIntroSection />
      <Courses />
      <Footer />
    </>
  );
};

export default StaffLanding;
