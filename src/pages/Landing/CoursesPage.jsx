import React, { Fragment } from 'react';
import Header from '../../components/Landing/Header/Header';
import ContactUs from '../../components/Landing/ContactUs/ContactUs';
import Footer from '../../components/Landing/Footer/Footer';
import AllCourses from '../../components/Landing/AllCourses/AllCourses';
import { Typography } from '@material-ui/core';

const CoursesPage = () => {
  return (
    <Fragment>
      <Header />
      <div
        className="mt-2 p-5 d-flex justify-content-between align-items-center "
        style={{ backgroundColor: '#535CE8', height: 200 }}
      >
        <div className="w-100">
          <Typography className="text-center" style={{ color: 'white' }} variant="h4">
            <strong>DANH SÁCH KHÓA HỌC</strong>
          </Typography>
        </div>
      </div>
      <AllCourses />
      <ContactUs />
      <Footer />
    </Fragment>
  );
};

export default CoursesPage;