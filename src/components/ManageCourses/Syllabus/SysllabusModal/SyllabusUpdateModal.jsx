import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';

export default function SyllabusUpdateModal({ open, onClose, onUpdate, syllabus, course }) {
  const [syllabusStatus, setSyllabusStatus] = useState('');
  const [syllabusName, setSyllabusName] = useState('');
  const [syllabusId, setSyllabusId] = useState(0);

  useEffect(() => {
    setSyllabusName(syllabus.name);
    setSyllabusStatus(syllabus.status);
    setSyllabusId(syllabus.id);
  }, [syllabus.id]);

  const handleUpdate = () => {
    onUpdate(syllabusId, syllabusStatus, syllabusName);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Cập nhật giáo trình</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' && (
            <TextField
              fullWidth
              label="Tên giáo trình"
              autoFocus
              margin="dense"
              name="name"
              value={syllabusName}
              onChange={(e) => setSyllabusName(e.target.value)}
              required
            />
          )}
          {/* <InputLabel id="syllabus-status-label">Trạng thái</InputLabel> */}
          <Select
            label="Trạng thái"
            labelId="syllabus-status-label"
            id="syllabus-status"
            value={syllabusStatus}
            onChange={(e) => setSyllabusStatus(e.target.value)}
          >
            {/* <MenuItem value="New">Mới</MenuItem> */}
            <MenuItem value="Active">Hoạt động</MenuItem>
            <MenuItem value="Deactive">Không hoạt động</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <button onClick={onClose} className="btn btn-outline-secondary">
          Hủy bỏ
        </button>
        <button onClick={handleUpdate} className="btn btn-success">
          Lưu
        </button>
      </DialogActions>
    </Dialog>
  );
}
