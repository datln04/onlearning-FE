import React from 'react';
import Style from './StudentIntroSection.module.scss';
import classNames from 'classnames';

const StudentIntroSection = () => {
  return (
    <div style={{ color: '#fff' }} className={classNames(Style.main, 'col-12 text-center')}>
      <h2>Xin chào</h2>
    </div>
  );
};

export default StudentIntroSection;
