import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../../util/firebase';
import Loading from '../../Loading/Loading';
import { isValidSize } from '../../../util/Utilities';
import Swal from 'sweetalert2';

const ResourceModal = ({ isOpen, onClose, onSave }) => {
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');

  // Handles input change event and updates state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleOnSave = () => {
    setLoading(true);

    if (!file) {
      alert('Please choose a file first!');
      setLoading(false);
      return;
    }

    const isValidFileSize = isValidSize(25, file);
    if (!isValidFileSize) {
      onClose();
      setLoading(false);
      Swal.fire({
        title: 'Cảnh báo',
        text: 'Tài nguyên không được quá 25MB',
        icon: 'warning',
      });
      return;
    }

    // Creating a reference to the file in Firebase Storage
    const storageRef = ref(storage, `/elearning/text/${file.name}`);

    // Starting the upload task
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Calculating and updating the progress
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(percent);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      },
      () => {
        // Getting the download URL after successful upload
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          onSave(file.name, url);
          setLoading(false);
        });
      },
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Thêm mới tài nguyên</DialogTitle>
        <DialogContent style={{ overflow: 'auto' }}>
          <div className="d-flex align-items-center col-12 row">
            <input type="file" accept="/*" onChange={handleChange} />
            {percent > 0 && <p>{percent} % done</p>}
          </div>
        </DialogContent>

        <DialogActions>
          <button className="btn btn-success" onClick={handleOnSave}>
            Hoàn thành
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResourceModal;
