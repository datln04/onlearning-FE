import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Radio,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchData } from '../../../../services/AppService';
import { useCallback } from 'react';

const QuestionBankModal = ({ isOpen, onSave, onClose, data }) => {
  // State to store the selected items
  const [selectedItems, setSelectedItems] = useState([]);
  const [questions, setQuestions] = useState();
  const [lessonItem, setLessonItem] = useState();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      if (data) {
        fetchData(`/question/byLessonId?lesson_id=${data[0]?.id}`, token).then((resp) => {
          if (resp) {
            setQuestions(resp);
            setLessonItem(data[0]?.id);
          }
        });
      }
    }
  }, [data]);

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

  const handleOnChangeLesson = (id) => {
    const token = Cookies.get('token');
    setLessonItem(id);
    if (token) {
      fetchData(`/question/byLessonId?lesson_id=${id}`, token)
        .then((resp) => {
          if (resp) {
            setQuestions(resp);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    questions && (
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle className="text-center" style={{ fontWeight: 'bold' }}>
          Ngân hàng câu hỏi
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Typography fontWeight={700} variant="caption">
                  Bài học:
                </Typography>
                <Select
                  id="lesson"
                  value={lessonItem}
                  onChange={(e) => handleOnChangeLesson(e.target.value)}
                  className="col-6 "
                >
                  {data &&
                    data.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Table style={{ marginTop: '20px' }}>
              <TableHead style={{ backgroundColor: '#f4f6f8' }}>
                <TableRow>
                  <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                  <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Nội dung câu hỏi</TableCell>
                  <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions && questions.length > 0 ? (
                  questions?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{++index}</TableCell>
                      <TableCell>
                        <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          color="primary"
                          checked={selectedItems?.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <h3 style={{ color: 'grey', fontWeight: 700 }} className="text-center">
                        Chưa có câu hỏi
                      </h3>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button
            variant="outline"
            style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
            onClick={handleSave}
            color="primary"
          >
            Hoàn thành
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default QuestionBankModal;
