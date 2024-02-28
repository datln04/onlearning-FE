import Styles from './Navbar.module.scss';
import classNames from 'classnames';
import 'boxicons';

import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, IconButton, InputBase, Paper, Typography, Avatar } from '@mui/material';
import Cookies from 'js-cookie';
import { CourseControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';
import { fetchData } from '../../../services/AppService';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());

const Navbar = () => {
  const menuRef = useRef();
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState();
  const [pendingCourses, setPendingCourses] = useState();
  const [profile, setProfile] = useState([]);

  const getCourses = () => {
    courseApi.getAllCourses((err, res) => {
      if (res) {
        setCourses(res);
        const pending = res.filter((course) => course.status === 'PENDING');
        setPendingCourses(pending);
      }
    });
  };

  useEffect(() => {
    getCourses();
    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData(`/auth/me`, token).then((resp) => {
          if (resp) {
            setProfile(resp);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle('active__menu');

  const toggleDropdown = () => {
    const dropdown = document.getElementById('myDropdown');
    dropdown.classList.toggle(Styles.show__dropdown);
  };

  const toggleDropdownNoti = () => {
    const dropdown = document.getElementById('myDropdownNoti');
    dropdown.classList.toggle(Styles.show__dropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className={classNames(Styles.navbar)}>
      <div className={classNames(Styles.logo)}>
        <img src="logo.svg" alt="" />
        <span>Bảng điều khiển</span>
      </div>
      <div className={classNames(Styles.icons, 'mx-5')}>
        {profile?.role == 'STAFF' ? (
          <div className={classNames(Styles.notification, classNames(Styles.dropdown__container))}>
            <IconButton onClick={toggleDropdownNoti}>
              <box-icon name="bell" type="solid" animation="tada-hover" flip="horizontal" color="rgba(0,0,0,0.71)" />
            </IconButton>
            {pendingCourses != 0 ? (
              <>
                <span style={{ backgroundColor: 'red' }}>{pendingCourses?.length}</span>
                <div className={Styles.dropdown} id="myDropdownNoti">
                  <div style={{ color: 'black', backgroundColor: '#f6f6f6' }} className="p-3">
                    <Typography> Thông báo </Typography>
                  </div>
                  <Divider />
                  <ul>
                    <Link to="/courses">
                      <li>{pendingCourses?.length} khoá học đang chờ được duyệt.</li>
                    </Link>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className={Styles.dropdown} id="myDropdownNoti">
                  <div style={{ color: 'black' }} className="p-3">
                    <Typography> Thông báo </Typography>
                  </div>
                  <Divider />
                  <ul>
                    <li>Không có kiến nghị mới</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        ) : (
          <></>
        )}

        <div className={classNames(Styles.user, 'mx-4')}>
          <div style={{ backgroundColor: 'rgba(145, 158, 171, 0.17)' }} className="rounded-circle p-1">
            <div style={{ border: '2px  solid rgb(255, 255, 255)' }} className="rounded-circle">
              <img src={profile?.avatar} alt="" />
            </div>
          </div>
          <div>
            <Typography style={{ fontWeight: 700, margin: 0 }}>{profile?.name}</Typography>
            {profile?.role == 'ADMIN' ? (
              <Typography style={{ fontWeight: 700, margin: 0, color: 'grey' }} variant="caption">
                Quản trị viên
              </Typography>
            ) : (
              <Typography style={{ fontWeight: 700, margin: 0, color: 'grey' }} variant="caption">
                Quản lý
              </Typography>
            )}
          </div>
        </div>
        {/* <box-icon name="cog" type="solid" animation="spin-hover" color="rgba(0, 0, 0, 0.611)"></box-icon> */}
      </div>
    </div>
  );
};

export default Navbar;
