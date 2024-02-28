import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import moment from 'moment';

const SubjectModal = ({ isOpen, onClose, onSave, onUpdate, subject }) => {
  useEffect(() => {
    if (subject) {
      // Populate the form fields if a subject is provided for editing
      setEditedSubject({
        name: subject.name,
        description: subject.description,
        minPrice: subject.minPrice,
        createDate: subject.createDate,
        status: subject.status,
      });
    } else {
      // Clear the form fields if adding a new subject
      setEditedSubject({
        name: '',
        description: '',
        minPrice: '',
        status: false,
      });
    }
  }, [subject]);

  const [editedSubject, setEditedSubject] = useState({
    name: '',
    description: '',
    minPrice: '',
    status: false,
  });

  const [length] = useState({
    name: 50,
    description: 150,
    minPrice: 100000,
  })

  const [editedSubjectError] = useState({
    name: 'Không được để trống hoặc quá dài quá ' + length.name + ' ký tự!',
    description: 'Không được để trống hoặc quá dài quá ' + length.description + ' ký tự!',
    minPrice: 'Không được để trống hoặc giá dưới ' + length.minPrice + ' VNĐ!',
    status: false,
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedSubject({ ...editedSubject, [fieldName]: value });
  };

  const handleSave = () => {
    if (subject) {
      // If editing an existing subject, call the onUpdate function
      onUpdate({ ...subject, ...editedSubject });
    } else {
      // If adding a new subject, call the onSave function
      onSave(editedSubject);
      clearModal();
    }
  };

  const clearModal = () => {
    setEditedSubject({
      name: '',
      description: '',
      minPrice: '',
      createDate: new Date(),
      status: false,
    });

    onClose();
  };

  const invalidSubject = () => {
    return editedSubject.name == "" || editedSubject.name.length > length.name ||
      editedSubject.description == "" || editedSubject.description.length > length.description ||
      editedSubject.minPrice == "" || editedSubject.minPrice < length.minPrice
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="d-flex justify-content-sm-between">
        <DialogTitle style={{ fontWeight: 700 }}>{subject ? 'Cập nhật chủ đề' : 'Tạo mới chủ đề'}</DialogTitle>
        <div className="p-3">
          <Typography variant="overline" display="block">
            Ngày khởi tạo:  {moment(editedSubject.createDate).format('DD/MM/YYYY')}
          </Typography>
        </div>
      </div>
      <DialogContent>


        <TextField
          variant='filled'
          fullWidth
          label="Tên chủ đề"
          autoFocus
          margin="dense"
          name="name"
          value={editedSubject.name}
          onChange={(e) => handleInputChange(e, 'name')}
          {
          ...(!editedSubject.name || editedSubject.name.length > length.name) && { helperText: editedSubjectError.name, error: false }
          }
        />


        <TextField
          variant='filled'
          fullWidth
          multiline
          minRows={4}
          label="Chú thích"
          autoFocus
          margin="dense"
          name="description"
          value={editedSubject.description}
          onChange={(e) => handleInputChange(e, 'description')}
          {
          ...(!editedSubject.description || editedSubject.description.length > length.description) && { helperText: editedSubjectError.description, error: false }
          }
        />

        <TextField
          variant='filled'
          fullWidth
          label="Giá thấp nhất"
          autoFocus
          margin="dense"
          name="minPrice"
          type='number'
          value={editedSubject.minPrice}
          onChange={(e) => handleInputChange(e, 'minPrice')}
          {
          ...(!editedSubject.minPrice || editedSubject.minPrice.length < length.minPrice) && { helperText: editedSubjectError.minPrice, error: false }
          }
        />

      </DialogContent>
      <DialogActions>
        <div style={{ paddingRight: '1rem', paddingBottom: '1rem' }}>
          <button onClick={onClose}
            className='btn'
          >
            Hủy
          </button>
          <button disabled={invalidSubject()}
            onClick={handleSave}
            className="btn px-3"
            style={{ backgroundColor: 'blue', color: 'white', borderRadius: 8, fontWeight: 700 }}>
            Lưu
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default SubjectModal;
