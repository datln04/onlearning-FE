import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import moment from 'moment';
const ConfigModal = ({ isOpen, onClose, onSave, onUpdate, config }) => {
  const [editedConfig, setEditedConfig] = useState({
    version: '',
    projectName: '',
    dateCreate: '',
    studyingTime: '',
    defaultQuizTime: '',
    waitingQuizTime: '',
    description: '',
    commissionFee: '',
    teacherCommissionFee: '',
    refundedTime: '',
  });
  // const [lastestConfig, setLastestConfig] = useState({
  //   version: '',
  //   projectName: '',
  //   dateCreate: '',
  //   studyingTime: '',
  //   defaultQuizTime: '',
  //   waitingQuizTime: '',
  //   description: '',
  //   commissionFee: '',
  //   teacherCommissionFee: '',
  //   refundedTime: '',
  // });

  useEffect(() => {
    if (config) {
      // Populate the form fields if a config is provided for editing
      setEditedConfig({
        version: config.version,
        projectName: config.projectName,
        dateCreate: moment(new Date()),
        studyingTime: config.studyingTime,
        description: config.description,
        waitingQuizTime: config.waitingQuizTime,
        defaultQuizTime: config.defaultQuizTime,
        commissionFee: config.commissionFee,
        teacherCommissionFee: config.teacherCommissionFee,
        refundedTime: config.refundedTime,
      });
    }
  }, [config]);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedConfig({ ...editedConfig, [fieldName]: value });
  };

  const isNotValidInput = () => {
    return (
      !editedConfig.version &&
      !editedConfig.description &&
      !editedConfig.dateCreate &&
      !editedConfig.studyingTime &&
      !editedConfig.waitingQuizTime &&
      !editedConfig.defaultQuizTime &&
      !editedConfig.commissionFee &&
      !editedConfig.teacherCommissionFee &&
      !editedConfig.refundedTime
    );
  };

  const notThingChange = () => {
    return (
      editedConfig.version === config.version ||
      (editedConfig.studyingTime === config.studyingTime &&
        editedConfig.waitingQuizTime === config.waitingQuizTime &&
        editedConfig.defaultQuizTime === config.defaultQuizTime &&
        editedConfig.commissionFee === config.commissionFee &&
        editedConfig.teacherCommissionFee === config.teacherCommissionFee &&
        editedConfig.refundedTime === config.refundedTime)
    );
  };

  const handleSave = () => {
    if (
      !editedConfig.version ||
      !editedConfig.description ||
      !editedConfig.dateCreate ||
      !editedConfig.studyingTime ||
      !editedConfig.waitingQuizTime ||
      !editedConfig.commissionFee ||
      !editedConfig.defaultQuizTime ||
      !editedConfig.teacherCommissionFee ||
      !editedConfig.refundedTime
    ) {
      // Show an error message or handle the validation as needed
      alert('Please fill in all required fields.');
      return;
    }

    if (config) {
      // If editing an existing config, call the onUpdate function
      onUpdate(editedConfig);
      // add function api here
      // alert(editedConfig.version);

      //-- end function update
    } else {
      // If adding a new config, call the onSave function
      onSave(editedConfig);
      // add function api here
      alert(
        editedConfig.version +
          ' ' +
          editedConfig.projectName +
          ' ' +
          !editedConfig.dateCreate +
          ' ' +
          editedConfig.studyingTime +
          ' ' +
          editedConfig.retryTestTime +
          ' ' +
          editedConfig.defaultImage +
          ' ' +
          editedConfig.defaultQuizTime,
      );
      //-- end function add new
      clearModal();
    }
  };

  const clearModal = () => {
    setEditedConfig({
      version: config.version,
      projectName: config.projectName,
      dateCreate: moment(new Date()),
      studyingTime: config.studyingTime,
      description: config.description,
      waitingQuizTime: config.waitingQuizTime,
      defaultQuizTime: config.defaultQuizTime,
      commissionFee: config.commissionFee,
      teacherCommissionFee: config.teacherCommissionFee,
      refundedTime: config.refundedTime,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Cập nhật cấu hình</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          className="p-1"
          label="Phiên bản"
          margin="dense"
          name="name"
          value={editedConfig.version}
          onChange={(e) => handleInputChange(e, 'version')}
          required
          variant="filled"
        />
        <div className="d-flex">
          <TextField
            className="p-1 w-50"
            label="Thời gian học mặc định"
            margin="dense"
            name="studyingTime"
            type="number"
            value={editedConfig.studyingTime}
            onChange={(e) => handleInputChange(e, 'studyingTime')}
            variant="filled"
            helperText="Thời gian học mặc định của mỗi khoá học (tháng)"
          />
          <TextField
            className="p-1 w-50"
            label="Thời gian hoàn tiền"
            margin="dense"
            name="refundedTime"
            type="number"
            value={editedConfig.refundedTime}
            onChange={(e) => handleInputChange(e, 'refundedTime')}
            helperText="Thời gian cho phép hoàn tiền khoá học (ngày)"
            variant="filled"
          />
        </div>

        <div className="d-flex">
          <TextField
            fullWidth
            label="Thời gian kiểm tra"
            className="p-1 w-50"
            margin="dense"
            name="defaultQuizTime"
            type="number"
            value={editedConfig.defaultQuizTime}
            onChange={(e) => handleInputChange(e, 'defaultQuizTime')}
            variant="filled"
            helperText="Thời gian kiểm tra mặc định (phút)"
          />
          <TextField
            fullWidth
            className="p-1 w-50"
            label="Thời gian khoá kiểm tra"
            margin="dense"
            name="waitingQuizTime"
            type="number"
            value={editedConfig.waitingQuizTime}
            onChange={(e) => handleInputChange(e, 'waitingQuizTime')}
            variant="filled"
            helperText="Thời gian khoá bài kiểm tra sau khi quá giới hạn số lần làm bài thất bại (phút)"
          />
        </div>
        <div className="d-flex">
          <TextField
            className="p-1 w-50"
            fullWidth
            margin="dense"
            label="Phí hoa hồng"
            name="commissionFee"
            type="number"
            value={editedConfig.commissionFee}
            onChange={(e) => handleInputChange(e, 'commissionFee')}
            variant="filled"
            helperText="Phí hoa hồng trên mỗi khoá học được bán (%)"
          />
          <TextField
            fullWidth
            className="p-1 w-50"
            label="Phí xét duyệt"
            margin="dense"
            name="teacherCommissionFee"
            type="number"
            value={editedConfig.teacherCommissionFee}
            onChange={(e) => handleInputChange(e, 'teacherCommissionFee')}
            variant="filled"
            helperText="Phí xét duyệt khoá học (%)"
          />
        </div>
        <TextField
          className="p-1"
          fullWidth
          multiline
          minRows={4}
          label="Mô tả"
          margin="dense"
          name="description"
          variant="filled"
          value={editedConfig.description}
          onChange={(e) => handleInputChange(e, 'description')}
          helperText="Ghi rõ nội dung cập nhật cho mỗi phiên bản"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={clearModal} color="primary">
          Huỷ
        </Button>
        <Button disabled={isNotValidInput && notThingChange()} onClick={handleSave} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigModal;
