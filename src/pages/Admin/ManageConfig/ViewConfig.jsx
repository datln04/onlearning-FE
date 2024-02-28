import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from '@material-ui/core';
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
        dateCreate: config.dateCreate,
        studyingTime: config.studyingTime,
        retryTestTime: config.retryTestTime,
        defaultImage: config.defaultImage,
        defaultQuizTime: config.defaultQuizTime,
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

  // const handleSave = () => {
  //   if (!editedConfig.name || !editedConfig.description) {
  //     // Show an error message or handle the validation as needed
  //     alert('Please fill in all required fields.');
  //     return;
  //   }

  //   if (config) {
  //     // If editing an existing config, call the onUpdate function
  //     onUpdate({ ...config, ...editedConfig });
  //     alert(editedConfig.name);
  //   } else {
  //     // If adding a new config, call the onSave function
  //     onSave(editedConfig);
  //     // add function api here
  //     alert(editedConfig.name);
  //     //-- end function add new
  //     clearModal();
  //   }
  // };

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
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm">
      <div className="d-flex justify-content-sm-between">
        <DialogTitle>Cấu hình hệ thống </DialogTitle>
        <div className="p-3">
          <Typography style={{ color: '#bdc3c7', fontWeight: 'bold' }} variant="overline" display="block">
            <b>v{editedConfig.version}</b>
          </Typography>
        </div>
      </div>
      <DialogContent dividers>
        <div className="d-flex justify-content-sm-between">
          <Typography sx={{ mt: 2 }}>Mô tả cập nhật: </Typography>
          <Typography>{editedConfig.projectName}</Typography>
        </div>
        <div className="d-flex justify-content-sm-between">
          <Typography sx={{ mt: 2 }}>Ngày tạo: </Typography>
          <Typography>{editedConfig.dateCreate} </Typography>
        </div>
        <div className="d-flex justify-content-sm-between">
          <Typography sx={{ mt: 2 }}>Thời gian học mặc định: </Typography>
          <Typography> {editedConfig.studyingTime}</Typography>
        </div>
        <div className="d-flex justify-content-sm-between">
          <Typography sx={{ mt: 2 }}>Số lần làm quiz mặc định: </Typography>
          <Typography>{editedConfig.retryTestTime}</Typography>
        </div>
        <Typography sx={{ mt: 2 }}>Ảnh bìa mặc định: </Typography>
        <img src={editedConfig.defaultImage} style={{ width: 400, borderRadius: 8 }} alt="" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewConfig;
