import React from 'react';
import Header from '../../components/Landing/Header/Header';
import IntroSection from '../../components/Landing/IntroSection/IntroSection';
import AboutUs from '../../components/Landing/AboutUs/AboutUs';
import Courses from '../../components/Landing/CourseSection1/Courses';
import Features from '../../components/Landing/Features/Features';
import Testimonials from '../../components/Landing/Testimonials/Testimonials';
import ContactUs from '../../components/Landing/ContactUs/ContactUs';
import Footer from '../../components/Landing/Footer/Footer';
import { Fragment } from 'react';

const GuessLanding = () => {
  return (
    <Fragment>
      <Header />
      <IntroSection />
      {/* <AboutUs /> */}
      <Courses />
      {/* <Features /> */}
      {/* <Testimonials /> */}
      <ContactUs />
      <Footer />
    </Fragment>
  );
};

export default GuessLanding;
