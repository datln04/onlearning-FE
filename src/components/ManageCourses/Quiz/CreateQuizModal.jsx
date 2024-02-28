import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import Cookies from 'js-cookie';
import { Calendar, DateRangePicker } from 'react-date-range';
import moment from 'moment';
import { useEffect } from 'react';
import {
  isInRange,
  isInRangePercent,
  isInteger,
  validateInputDigits,
  validateInputString,
} from '../../../util/Utilities';
import Swal from 'sweetalert2';

function CreateQuizModal({ open, onClose, data, onSave }) {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!data) {
      setFormData({
        title: '',
        passScore: 0,
        status: 'Deactive',
        duration: 0,
        dateRange: 0,
        allowAttempt: 0,
        proportion: 0,
      });
    } else {
      setFormData(data);
    }
  }, [data]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    const validString = validateInputString(formData.title);
    const validDigit = validateInputDigits(
      formData.passScore,
      formData.duration,
      formData.allowAttempt,
      formData.proportion,
      formData.dateRange,
    );
    let message = [];
    if (!validString || !validDigit) {
      message.push('Điền tất cả các trường và số phải lớn hơn 0');
    }

    if (!isInRangePercent(formData.proportion)) {
      message.push('Tỷ trọng trong khoảng 1...100');
    }
    if (message.length > 0) {
      // onClose();
      Swal.fire({
        title: 'Cảnh báo',
        html: message.join('<br>'),
        icon: 'warning',
      });
      return;
    }

    onSave(formData);
  };
  return (
    formData && (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo bài kiểm tra</DialogTitle>
        <DialogContent>
          <DialogContentText>Điền đầy đủ thông tin phía dưới</DialogContentText>
          <TextField
            margin="dense"
            label="Tên bài kiểm tra"
            type="text"
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Điểm qua bài kiểm tra ( 0 - 10 )"
            type="number"
            fullWidth
            name="passScore"
            value={formData.passScore}
            InputProps={{ inputProps: { min: 0, max: 10 } }}
            onChange={handleChange}
          />


          <TextField
            margin="dense"
            label="Thời hạn hoàn thành bài kiểm tra (tuần)"
            type="number"
            fullWidth
            name="dateRange"
            value={formData.dateRange}
            onChange={handleChange}
          />
          {/* <label className='my-2'>Thời hạn hoàn thành bài kiểm tra (tuần)</label><br />
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleDateRangeChange}
                /> */}
          <TextField
            margin="dense"
            label="Thời gian làm bài ( phút ) "
            type="number"
            fullWidth
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Số lần làm bài"
            type="number"
            fullWidth
            name="allowAttempt"
            value={formData.allowAttempt}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Tỉ trọng %"
            type="number"
            fullWidth
            name="proportion"
            value={formData.proportion}
            onChange={handleChange}
          />

          <InputLabel
            style={{ fontWeight: 700, backgroundColor: '#f4f6f8', fontSize: '0.7rem' }}
            id="status"
          >
            Trạng thái
          </InputLabel>
          <Select label="Trạng thái"
            fullWidth name="status"
            value={formData.status}
            onChange={handleChange} disabled>
            {/* <MenuItem value="Active">Active</MenuItem> */}
            <MenuItem value="Deactive">Không hoạt động</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <button onClick={onClose} className="btn btn-outline-secondary">
            Hủy
          </button>
          <button onClick={handleSave} className="btn btn-success">
            Lưu
          </button>
        </DialogActions>
      </Dialog>
    )
  );
}

export default CreateQuizModal;
