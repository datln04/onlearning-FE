import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from '@mui/material';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';

const ListLessonModal = ({ isOpen, onSave, onClose, courseId }) => {
  // State to store the selected items
  const [selectedItems, setSelectedItems] = useState([]);
  const [lessons, setLessons] = useState();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      if (courseId) {
        fetchData(`/lesson/byCourseId?course_id=${courseId}`, token).then((resp) => {
          if (resp) {
            setLessons(resp);
            // setLessonItem(data[0].id)
          }
        });
      }
    }
  }, [courseId]);

  const handleCheckboxChange = (item) => {
    // Check if the item is already selected
    const isItemSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);

    if (!isItemSelected) {
      // Item is not selected, add it to the selectedItems array
      setSelectedItems([...selectedItems, item]);
    } else {
      // Item is already selected, remove it from the selectedItems array
      const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
      setSelectedItems(updatedSelectedItems);
    }
  };

  // Function to handle the "Hoàn thành" (Submit) button click
  const handleSave = () => {
    // Call the onSave function and pass the selectedItems if needed
    onSave(selectedItems);
    // console.log(selectedItems);
    setSelectedItems([]);
    // Close the dialog
    onClose();
  };

  const handleClose = () => {
    setSelectedItems([]);
    onClose();
  };

  return (
    lessons && (
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Thông tin</DialogTitle>
        <DialogContent>
          <Grid container>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Tên bài học</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lessons &&
                    lessons.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{++index}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <Checkbox
                            color="primary"
                            checked={selectedItems?.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  {lessons.length == 0 && (
                    <TableRow>
                      <TableCell className="text-center" colSpan={6}>
                        <h3 style={{ fontWeight: 700, color: 'grey' }}>Chưa có bài học trong khóa này</h3>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </DialogContent>

        <DialogActions>
          <button onClick={onClose} className="btn btn-outline-secondary">
            Hủy
          </button>
          <button onClick={handleSave} color="primary" className="btn btn-success">
            Hoàn tất
          </button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default ListLessonModal;
