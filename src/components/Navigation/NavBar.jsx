import React, { useEffect, useState } from 'react';
import { SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import logo from './../../assets/images/logo.png';
import { navData } from '../../util/Constants';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Cookies from 'js-cookie';

const NavBar = ({ children }) => {
  const { collapseSidebar } = useProSidebar();
  const [userRole, setUserRole] = useState('manager'); // Change role as needed

  // Get the navigation items based on the user's role
  const navItems = navData[userRole] || [];

  useEffect(() => {
    const user = JSON.parse(Cookies.get('user'));
    if (user) {
      setUserRole(String(user?.role).toLowerCase());
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    window.location.href = '/';
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar backgroundColor="white" className="app">
        <Menu>
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                if (level === 0 || level === 1) {
                  return {
                    color: disabled ? '#eee' : '#637381',
                    backgroundColor: active ? '#fff' : undefined,
                    '&:hover': {
                      backgroundColor: '#e5e5e5 !important',
                      color: '#3C454E !important',
                      borderRadius: '8px !important',
                    },
                    '&:focus': {
                      backgroundColor: '#d3d8ff !important',
                      color: '#5263ff !important',
                      borderRadius: '8px !important',
                    },
                  };
                }
              },
            }}
          >
            <MenuItem
              className="menu1 p-2"
              style={{ borderRadius: '10px' }}
              icon={
                <MenuRoundedIcon
                  onClick={() => {
                    collapseSidebar();
                  }}
                />
              }
            >
              <img alt="logo" src={logo} width={150} />
            </MenuItem>
            {navItems.map((item, index) =>
              // Check if the item has subItems to render submenu
              item.subItems ? (
                <SubMenu
                  className="p-2"
                  style={{ borderRadius: '10px', fontWeight: 500 }}
                  key={index}
                  label={item.label}
                  icon={item.icon}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <MenuItem
                      className="p-1"
                      style={{ borderRadius: '10px', fontWeight: 500 }}
                      key={subIndex}
                      icon={subItem.icon}
                      component={<Link to={subItem.path} className="link" />}
                    >
                      {subItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                  className="p-2"
                  style={{ borderRadius: '10px', fontWeight: 500 }}
                  key={index}
                  icon={item.icon}
                  component={<Link to={item.path} className="link" />}
                >
                  {item.label}
                </MenuItem>
              ),
            )}
            <MenuItem
              className="p-2"
              style={{ borderRadius: '10px', fontWeight: 500 }}
              icon={<LogoutRoundedIcon />}
              onClick={handleLogout}
            >
              Đăng xuất
            </MenuItem>
          </Menu>
        </Menu>
      </Sidebar>
      <section style={{ width: '100%', backgroundColor: '#fdfdfd' }}>{children}</section>
    </div>
  );
};

export default NavBar;
