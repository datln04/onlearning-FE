import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TimerIcon from '@mui/icons-material/Timer';

const Timer = ({ timeMinute, onAutoSubmit }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(timeMinute * 60);
  }, [timeMinute]);
  useEffect(() => {
    const timer = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
    if (seconds === 0 && onAutoSubmit !== undefined && timeMinute !== undefined) {
      console.log('da xong');
      onAutoSubmit();
    }
    return () => clearInterval(timer);
  }, [seconds]);
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };
  return (
    <div className="d-flex align-items-center" style={{ color: '#1d7c50' }}>
      <Typography variant="subtitle1">
        <TimerIcon />
        {formatTime(seconds)} Còn lại
      </Typography>
    </div>
  );
};

export default Timer;
