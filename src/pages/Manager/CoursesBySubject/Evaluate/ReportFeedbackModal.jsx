import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

export default function ReportFeedbackModal({ open, onClose, onComplete }) {
  const [reason, setReason] = React.useState('');

  const handleComplete = () => {
    // Pass the reason to the parent component
    onComplete(reason);
    // Close the modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Báo cáo</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Lí do"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleComplete} variant="outlined" style={{ marginLeft: '10px' }}>
          Hoàn thành
        </Button>
      </DialogActions>
    </Dialog>
  );
}
