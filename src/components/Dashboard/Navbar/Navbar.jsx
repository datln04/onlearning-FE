import Styles from './Navbar.module.scss';
import classNames from 'classnames';
import 'boxicons';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../services/AppService';
import { Avatar, Typography } from '@mui/material';

const Navbar = () => {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const user = JSON.parse(Cookies.get('user'));
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

  return (
    <div style={{ background: 'transparent' }} className={classNames(Styles.navbar)}>
      <div className={classNames(Styles.logo)}>
        {/* <img src="logo.svg" alt="" />
         */}
        <span className="mx-3">Bảng điều khiển</span>
      </div>
      <div className={classNames(Styles.icons)}>
        {/* <div className={classNames(Styles.notification)}>
          <box-icon
            name="bell"
            type="solid"
            animation="tada-hover"
            flip="horizontal"
            color="rgba(0,0,0,0.71)"
          ></box-icon>
          <span>1</span>
        </div> */}
        <div className={classNames(Styles.user, 'mx-4')}>
          <div style={{ backgroundColor: 'rgba(145, 158, 171, 0.17)' }} className="rounded-circle p-1">
            <div style={{ border: '2px  solid rgb(255, 255, 255)' }} className="rounded-circle">
              <Avatar alt={profile?.name}
                src={profile?.avatar} />
            </div>
          </div>
          <div>
            <Typography style={{ fontWeight: 700, margin: 0 }}>{profile?.name}</Typography>
            <Typography style={{ fontWeight: 700, margin: 0, color: 'grey' }} variant="caption">
              Giảng viên
            </Typography>
          </div>
        </div>
        {/* <box-icon
          name="cog"
          type="solid"
          animation="spin-hover"
          color="rgba(0, 0, 0, 0.611)"
        ></box-icon> */}
      </div>
    </div>
  );
};

export default Navbar;
