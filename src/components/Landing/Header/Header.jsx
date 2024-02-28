import React, { useRef } from 'react';
import { Container } from 'reactstrap';
import Logo from '../../../assets/images/logo.png';
import Styles from './Header.module.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useState } from 'react';
import profile_image from './../../../assets/images/mask-group.png';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, IconButton, InputBase, Paper, Typography } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';

const navLinks = [
  {
    display: 'Trang chủ',
    url: '/',
  },
  {
    display: 'Danh sách khóa học',
    url: '/all-courses',
  },
  {
    display: 'Liên hệ',
    url: '/about-us',
  },
];

const Header = ({ setSearchValue, getCourses }) => {
  const menuRef = useRef();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData('/auth/me', token).then((resp) => {
        if (resp) {
          setUser(resp);
        }
      });
    }
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle('active__menu');

  const toggleDropdown = () => {
    const dropdown = document.getElementById('myDropdown');
    dropdown.classList.toggle(Styles.show__dropdown);
  };

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    window.location.href = '/';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <header className={classNames(Styles.header_custom)}>
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-4">
            <div className="logo">
              <Link className="navbar-brand" to="/">
                <img src={Logo} style={{ height: 30 }} alt="" />
              </Link>
            </div>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className={classNames(Styles.nav__menu)} ref={menuRef} onClick={menuToggle}>
              <ul className={classNames(Styles.nav__list)}>
                {navLinks.map((item, index) => (
                  <li key={index} className={classNames(Styles.nav__item)}>
                    <Link to={item.url}>{item.display}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={classNames(Styles.nav__right)}>
              {user ? (
                <>
                  <div
                    className={classNames('d-flex align-items-center', Styles.dropdown__container)}
                    onClick={toggleDropdown}
                  >
                    <div style={{ border: '2px  solid rgb(255, 255, 255)' }} className="rounded-circle">
                      <Avatar alt={`${user?.name}`} src={user?.avatar} />
                    </div>
                    <div className="p-1">
                      <Typography style={{ fontWeight: 700, margin: 0, color: 'black' }}>{user?.name}</Typography>
                      <Typography style={{ fontWeight: 700, margin: 0, color: 'grey' }} variant="caption">
                        Học viên
                      </Typography>
                    </div>
                  </div>
                  <div className={Styles.dropdown} id="myDropdown">
                    <ul>
                      <Link to="/my-course">
                        <li>Khóa học của tôi </li>
                      </Link>
                      <Link to="/my-profile">
                        <li>Trang cá nhân </li>
                      </Link>
                      <li onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="mb-0 d-flex align-items-center gap-2">
                  <Link to="/login" className={classNames(Styles.nav__btn, 'btn')}>
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className={classNames(Styles.mobile__menu)}>
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
