import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { validateInputString } from '../../../util/Utilities';
import Swal from 'sweetalert2';

export default function SyllabusCreateModal({ open, onClose, onCreate, isCopied, onCopy }) {
  const [syllabusName, setSyllabusName] = useState('');

  const handleCreate = () => {
    if (validateInputString(syllabusName)) {
      onCreate(syllabusName);
      onClose();
    } else {
      Swal.fire({
        title: 'Cảnh báo',
        text: 'Vui lòng điền đầy đủ thông tin',
        icon: 'warning',
      });
    }
  };

  const handleCopy = () => {
    if (validateInputString(syllabusName)) {
      onCopy(syllabusName);
      onClose();
    } else {
      Swal.fire({
        title: 'Cảnh báo',
        text: 'Vui lòng điền đầy đủ thông tin',
        icon: 'warning',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {isCopied ? 'Tên giáo trình sao chép' : 'Tạo mới giáo trình'}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tên giáo trình "
          value={syllabusName}
          onChange={(e) => setSyllabusName(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <button onClick={onClose} className="btn btn-outline-secondary">
          Hủy bỏ
        </button>
        <button onClick={isCopied ? handleCopy : handleCreate} className="btn btn-success">
          Tạo
        </button>
      </DialogActions>
    </Dialog>
  );
}
