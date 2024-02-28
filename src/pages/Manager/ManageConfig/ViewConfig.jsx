import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, TextField } from '@material-ui/core';
import moment from 'moment/moment';
const ViewConfig = ({ isOpen, onClose, onSave, onUpdate, config }) => {
  const [editedConfig, setEditedConfig] = useState({
    version: '',
    projectName: '',
    dateCreate: '',
    studyingTime: '',
    retryTestTime: '',
    defaultImage: '',
    defaultQuizTime: '',
  });

  useEffect(() => {
    if (config) {
      // Populate the form fields if a config is provided for editing
      setEditedConfig({
        version: config.version,
        projectName: config.projectName,
        dateCreate: moment(config.dateCreate).format('DD-MM-YYYY'),
        studyingTime: config.studyingTime,
        description: config.description,
        waitingQuizTime: config.waitingQuizTime,
        defaultQuizTime: config.defaultQuizTime,
        commissionFee: config.commissionFee,
        teacherCommissionFee: config.teacherCommissionFee,
        refundedTime: config.refundedTime,
      });
    } else {
      // Clear the form fields if adding a new config
      setEditedConfig({
        version: '',
        projectName: '',
        dateCreate: '',
        studyingTime: '',
        retryTestTime: '',
        defaultImage: '',
        defaultQuizTime: '',
      });
    }
  }, [config]);

  const handleSave = () => {
    if (!editedConfig.name || !editedConfig.description) {
      // Show an error message or handle the validation as needed
      alert('Please fill in all required fields.');
      return;
    }

    if (config) {
      // If editing an existing config, call the onUpdate function
      onUpdate({ ...config, ...editedConfig });
      // add function api here
      alert(editedConfig.name);

      //-- end function update
    } else {
      // If adding a new config, call the onSave function
      onSave(editedConfig);
      // add function api here
      alert(editedConfig.name);
      //-- end function add new
      clearModal();
    }
  };

  const clearModal = () => {
    setEditedConfig({
      version: '',
      projectName: '',
      dateCreate: '',
      studyingTime: '',
      retryTestTime: '',
      defaultImage: '',
      defaultQuizTime: '',
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <Typography className="text-end p-3" variant="caption">
        VERSION {editedConfig.version}
      </Typography>
      <div className="d-flex justify-content-center">
        <DialogTitle>Chi tiết cấu hình - {editedConfig.projectName}</DialogTitle>
      </div>

      <DialogContent>
        <TextField
          disabled={true}
          className="p-1 w-100"
          label="Mô tả cập nhật"
          value={editedConfig.description}
          id="demo-helper-text-aligned-no-helper"
          variant="filled"
          multiline
          minRows={4}
          fullWidth
        />
        <div className="d-flex">
          <TextField
            disabled={true}
            className="p-1 w-50"
            label="Thời gian học mặc định"
            margin="dense"
            name="studyingTime"
            value={editedConfig.studyingTime + ' tháng'}
            variant="filled"
          />
          <TextField
            disabled={true}
            className="p-1 w-50"
            label="Thời gian hoàn tiền"
            margin="dense"
            name="refundedTime"
            value={editedConfig.refundedTime + ' ngày'}
            variant="filled"
          />
        </div>

        <div className="d-flex">
          <TextField
            disabled={true}
            fullWidth
            label="Thời gian kiểm tra"
            className="p-1 w-50"
            margin="dense"
            name="defaultQuizTime"
            value={editedConfig.defaultQuizTime + ' phút'}
            variant="filled"
          />
          <TextField
            fullWidth
            disabled={true}
            className="p-1 w-50"
            label="Thời gian khoá kiểm tra"
            margin="dense"
            name="waitingQuizTime"
            value={editedConfig.waitingQuizTime + ' phút'}
            variant="filled"
          />
        </div>
        <div className="d-flex">
          <TextField
            disabled={true}
            className="p-1 w-50"
            fullWidth
            margin="dense"
            label="Phí hoa hồng"
            name="commissionFee"
            value={editedConfig.commissionFee + ' %'}
            variant="filled"
          />
          <TextField
            fullWidth
            disabled={true}
            className="p-1 w-50"
            label="Phí xét duyệt"
            margin="dense"
            name="teacherCommissionFee"
            value={editedConfig.teacherCommissionFee + ' %'}
            variant="filled"
          />
        </div>
        <div className="d-flex">
          <TextField
            disabled={true}
            className="p-1 w-100"
            label="Ngày tạo"
            value={editedConfig.dateCreate}
            id="demo-helper-text-aligned-no-helper"
            variant="filled"
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearModal} color="primary" variant="contained">
          Huỷ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewConfig;
