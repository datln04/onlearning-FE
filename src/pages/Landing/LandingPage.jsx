import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import GuessLanding from './GuessLanding';
import StudentLanding from './StudentLanding';
import StaffLanding from './StaffLanding';
import Cookies from 'js-cookie';

const LandingPage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return user && user.role === 'STAFF' ? (
    <StaffLanding />
  ) : user && user.role === 'STUDENT' ? (
    <StudentLanding />
  ) : (
    <GuessLanding />
  );
};

export default LandingPage;
