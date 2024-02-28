import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';
const ConfigModal = ({ isOpen, onClose, onSave, onUpdate, config }) => {
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

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedConfig({ ...editedConfig, [fieldName]: value });
  };

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
      <DialogTitle>Cập nhật chính sách</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Version"
          autoFocus
          margin="dense"
          name="name"
          value={editedConfig.version}
          onChange={(e) => handleInputChange(e, 'name')}
          required
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Mô tả"
          autoFocus
          margin="dense"
          name="description"
          value={editedConfig.projectName}
          onChange={(e) => handleInputChange(e, 'firstName')}
          required
        />
        <TextField
          fullWidth
          label="Ngày tạo"
          autoFocus
          margin="dense"
          name="min_price"
          value={editedConfig.lastName}
          onChange={(e) => handleInputChange(e, 'lastName')}
          disabled={true}
        />
        <TextField
          fullWidth
          label="Thời gian học mặc định"
          autoFocus
          margin="dense"
          name="staff_id"
          value={editedConfig.studyingTime}
          onChange={(e) => handleInputChange(e, 'email')}
        />
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          label="Thời gian làm quiz mặc định"
          name="asset"
          value={editedConfig.defaultQuizTime}
          onChange={(e) => handleInputChange(e, 'defaultQuizTime')}

        />
        <TextField
          fullWidth
          label="Số lần làm lại Quiz"
          autoFocus
          margin="dense"
          name="created_date"
          value={editedConfig.retryTestTime}
          onChange={(e) => handleInputChange(e, 'role')}

        />
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          label="Thumbnail mặc định"
          name="asset"
          value={editedConfig.defaultImage}
          onChange={(e) => handleInputChange(e, 'defaultImage')}

        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigModal;
