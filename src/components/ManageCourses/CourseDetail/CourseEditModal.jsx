import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import {
  isInRange,
  isInteger,
  validateInputDigits,
  validateInputString,
  isInRangeDynamic,
} from '../../../util/Utilities';
import Swal from 'sweetalert2';

export default function CourseEditModal({ open, onClose, onSave, course }) {
  const [newPrice, setNewPrice] = useState(course?.price);
  const [newDescription, setNewDescription] = useState(course?.description);
  const [courseName, setCourseName] = useState(course?.name);
  const [passingScore, setPassingScore] = useState(course?.averagePoint);
  const [duration, setDuration] = useState(course?.limitTime);

  const handleSave = () => {
    let message = [];
    const isValidString = validateInputString(courseName, newDescription);
    const isValidDigit = validateInputDigits(newPrice, duration, passingScore);

    if (!isInRange(passingScore)) {
      message.push('Chọn điểm trong thang điểm 10');
    }
    if (course?.subject.minPrice !== undefined) {
      if (parseInt(course?.subject.minPrice.minPrice) > parseInt(newPrice)) {
        message.push(`Giá tiền phải lớn hơn  ${course?.subject.minPrice}`);
      }
    }
    if (!isValidString || !isValidDigit) {
      message.push('Điền tất cả các trường và số phải lớn hơn 0');
    }

    if (!isInteger(duration)) {
      message.push('Thời gian học phải là số nguyên');
    }

    if (!isInRangeDynamic(0, 60, duration)) {
      message.push('Thời gian học từ 1-60 tháng');
    }

    if (!isInRangeDynamic(5, 500, courseName.length)) {
      message.push('Tên ít nhất 5 kí tự và nhiều nhất 500 kí tự');
    }

    if (message.length > 0) {
      Swal.fire({
        title: 'Cảnh báo',
        html: message.join('<br>'),
        icon: 'warning',
      });
      onClose();
      return;
    }
    onSave(newPrice, newDescription, courseName, passingScore, duration);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Chỉnh sửa khóa học</DialogTitle>
      <DialogContent>
        <div className="d-flex justify-content-between">
          <TextField
            className="col-6 mx-1"
            label="Tên khóa học"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            sx={{ my: 1 }}
          />
          <TextField
            className="col-6 mx-1"
            label="Giá ( VND )"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            sx={{ my: 1 }}
            type="number"
          />
        </div>
        <div className="d-flex justify-content-between">
          <TextField
            className="col-6 mx-1"
            label="Thời gian ( tháng )"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            sx={{ my: 1 }}
            type="number"
          />
          <TextField
            className="col-6 mx-1"
            label="Điểm qua môn ( 1 - 10 )"
            value={passingScore}
            onChange={(e) => setPassingScore(e.target.value)}
            sx={{ my: 1 }}
            type="number"
          />
        </div>

        <TextField
          className="mt-3"
          fullWidth
          label="Mô tả"
          value={newDescription}
          onChange={(e) => {
            const inputValue = e.target.value;
            // Set a character limit, for example, 200 characters
            if (inputValue.length <= 250) {
              setNewDescription(inputValue);
            }
          }}
          multiline
          rows={4}
          sx={{ my: 1 }}
        />
        <div style={{ textAlign: 'right', color: newDescription.length > 250 ? 'red' : 'inherit' }}>
          {newDescription.length}/250
        </div>
        <Divider sx={{ my: 2 }} />
      </DialogContent>
      <DialogActions>
        <button onClick={onClose} className="btn btn-outline-secondary">
          Hủy bỏ
        </button>
        <button onClick={handleSave} className="btn btn-success">
          Lưu
        </button>
      </DialogActions>
    </Dialog>
  );
}
