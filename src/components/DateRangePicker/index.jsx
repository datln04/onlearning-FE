import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS của Bootstrap
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của react-datepicker
import DatePicker from 'react-datepicker';
const DateRangePicker = ({ onChangeStartDate, onChangeEndDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (onChangeStartDate !== undefined) {
      onChangeStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (onChangeEndDate !== undefined) {
      onChangeEndDate(date);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div>Từ ngày:</div>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </div>
        <div className="col">
          <div>Đến ngày:</div>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
