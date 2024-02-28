import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  Backdrop,
  InputLabel,
} from '@mui/material';
import { useRef } from 'react';
import ReactQuill from 'react-quill';
import './LessonModal.css';
import { isInteger, isValidSize, validateInputDigits, validateInputString } from '../../../util/Utilities';
import Swal from 'sweetalert2';
import { invalidInput } from '../../../util/Constants';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../../util/firebase';
import Loading from '../../Loading/Loading';

const LessonModal = ({ isOpen, onClose, onSave, onUpdate, lesson, course }) => {
  const [loading, setLoading] = useState(false);
  const reactQuillRef = useRef(null);
  const [editedLesson, setEditedLesson] = useState({
    name: '',
    description: '',
    url: '',
    status: '',
    estimateTime: '',
    content: '',
  });

  useLayoutEffect(() => {
    if (lesson) {
      // Populate the form fields if a lesson is provided for editing
      setEditedLesson({
        id: lesson.id,
        name: lesson.name,
        description: lesson.description,
        url: lesson.url,
        status: lesson.status,
        estimateTime: lesson.estimateTime,
        content: lesson.content,
      });
    } else {
      // Clear the form fields if adding a new lesson
      setEditedLesson({
        name: '',
        description: '',
        url: '',
        status: 'true',
        estimateTime: '',
        content: '',
      });
    }
  }, [lesson]);

  const handleInputChange = (e, fieldName) => {
    let values = fieldName === 'content' ? String(e) : fieldName === 'url' ? e.target.files[0] : e.target.value;
    setEditedLesson({ ...editedLesson, [fieldName]: values });
  };

  const handleSave = () => {
    let message = [];
    const validString = validateInputString(editedLesson.name, editedLesson.description, editedLesson.content);
    const validDigits = validateInputDigits(editedLesson.estimateTime);
    if (!validString || !validDigits) {
      // Show an error message or handle the validation as needed
      message.push(invalidInput);
    }

    if (!isInteger(editedLesson?.estimateTime)) {
      message.push('Thời gian học phải là số nguyên');
    }

    if (typeof editedLesson.url == 'object') {
      const isValidFileSize = isValidSize(25, editedLesson.url);
      if (!isValidFileSize) {
        message.push('Video không được quá 25MB');
      }
    }

    if (message.length > 0) {
      // clearModal();
      Swal.fire({
        title: 'Cảnh báo',
        html: message.join('<br>'),
        icon: 'warning',
      });
      return;
    }

    if (lesson) {
      // If editing an existing lesson, call the onUpdate function
      setLoading(true);
      if (typeof editedLesson.url == 'object') {
        // Creating a reference to the file in Firebase Storage
        const storageRef = ref(storage, `/elearning/text/${editedLesson.url.name}`);

        // Starting the upload task
        const uploadTask = uploadBytesResumable(storageRef, editedLesson.url);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Calculating and updating the progress
            // const percent = Math.round(
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
            // setPercent(percent);
          },
          (err) => {
            console.log(err);
            setLoading(false);
          },
          () => {
            // Getting the download URL after successful upload
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              // handleInputChange(url, 'url');
              const lessonSave = { ...editedLesson, url: url };
              // console.log('hehe', lessonSave);
              onSave(lessonSave);
              setLoading(false);
            });
          },
        );
      } else {
        onSave(editedLesson);
        setLoading(false);
      }
    } else {
      setLoading(true);
      if (typeof editedLesson.url == 'object') {
        // Creating a reference to the file in Firebase Storage
        const storageRef = ref(storage, `/elearning/text/${editedLesson.url.name}`);

        // Starting the upload task
        const uploadTask = uploadBytesResumable(storageRef, editedLesson.url);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Calculating and updating the progress
            // const percent = Math.round(
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
            // setPercent(percent);
          },
          (err) => {
            console.log(err);
            setLoading(false);
          },
          () => {
            // Getting the download URL after successful upload
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              // handleInputChange(url, 'url');
              const lessonSave = { ...editedLesson, url: url };
              onSave(lessonSave);
              setLoading(false);
            });
          },
        );
      } else {
        onSave(editedLesson);
        setLoading(false);
      }
    }

    clearModal();
  };

  // const handleClose = (e, reason) => {
  //     if (reason === 'backdropClick') {
  //         clearModal()
  //     } else {
  //         clearModal()
  //     }
  // }

  const clearModal = () => {
    setEditedLesson({
      name: '',
      description: '',
      url: '',
      status: '',
      estimateTime: '',
      content: '',
    });

    onClose();
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['code-block'],
        ['clean'],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return loading ? (
    <Loading />
  ) : (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth BackdropComponent={Backdrop}>
      <DialogTitle>{lesson ? 'Chỉnh sửa bài học' : 'Thêm bài học'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Tên bài học"
          autoFocus
          margin="dense"
          name="name"
          value={editedLesson.name}
          onChange={(e) => handleInputChange(e, 'name')}
          required
          InputProps={{
            readOnly: course?.status === 'ACTIVE' || course?.status === 'PENDING',
          }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Mô tả"
          autoFocus
          margin="dense"
          name="description"
          value={editedLesson.description}
          onChange={(e) => handleInputChange(e, 'description')}
          required
          InputProps={{
            readOnly: course?.status === 'ACTIVE' || course?.status === 'PENDING',
          }}
        />
        <label className="my-2">Nội dung bài học</label>
        <br />
        <ReactQuill
          name="Nội dung"
          // style={{ height: '300px' }}
          ref={reactQuillRef}
          value={editedLesson.content}
          onChange={(e) => {
            console.log(e);
            const inputValue = String(e);
            // Set a character limit, for example, 200 characters
            if (inputValue.length <= 4000) {
              handleInputChange(e, 'content');
            }
          }}
          modules={modules}
          readOnly={course?.status === 'ACTIVE' || course?.status === 'PENDING'}
        />

        <InputLabel
          style={{ fontWeight: 700, backgroundColor: '#f4f6f8', fontSize: '0.7rem', marginTop: '1rem' }}
          id="status">
          Trạng thái
        </InputLabel>
        <Select
          fullWidth
          autoFocus
          margin="dense"
          name="status"
          value={editedLesson.status}
          onChange={(e) => handleInputChange(e, 'status')}
          disabled={course?.status === 'ACTIVE' || course?.status === 'PENDING'}
        >
          <MenuItem value="true">Hoạt động</MenuItem>
          <MenuItem value="false">Không hoạt động</MenuItem>
        </Select>

        <TextField
          type="number"
          fullWidth
          label="Thời gian học ( phút )"
          autoFocus
          margin="dense"
          name="estimateTime"
          value={editedLesson.estimateTime}
          onChange={(e) => handleInputChange(e, 'estimateTime')}
          InputProps={{
            readOnly: course?.status === 'ACTIVE' || course?.status === 'PENDING',
          }}
        />
        {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' && (
          <>
            <label className="my-3">Video file {'( 25MB )'}</label>
            <input
              type="file"
              className="mx-2"
              autoFocus
              margin="dense"
              name="url"
              accept=".mov, .gif, .mp4, .mpeg, .mkv"
              // value={editedLesson.url}
              onChange={(e) => handleInputChange(e, 'url')}
              required
            />
          </>
        )}

        {lesson?.url && <iframe src={lesson?.url} title="Video" width={500} height={300}></iframe>}
      </DialogContent>
      <DialogActions>
        <button onClick={onClose} className="btn btn-outline-secondary">
          Hủy
        </button>
        {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' ? (
          <button onClick={handleSave} color="primary" className="btn btn-success">
            Hoàn tất
          </button>
        ) : (
          <button onClick={onClose} color="primary" className="btn btn-success">
            Hoàn tất
          </button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default LessonModal;
