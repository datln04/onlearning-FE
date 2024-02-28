import React, { useEffect, useState } from 'react';
import { Modal, TextField, Typography, Box, Button, Grid } from "@mui/material";

const CoursePriceModel = ({ isOpen, onClose, onSave, teacherId, subjectId, courseId, initialPrice }) => {
    const [newPrice, setNewPrice] = useState(initialPrice);

    useEffect(() => {
        setNewPrice(initialPrice)
    }, [courseId])

    const handleSave = () => {
        onSave(courseId, newPrice); // Pass the courseId and new price to the parent component
        onClose();
    };

    return (
        newPrice && (
            <Modal open={isOpen} onClose={onClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Chỉnh sửa giá khóa học
                    </Typography>
                    <TextField
                        fullWidth
                        label="Giá mới"
                        variant="outlined"
                        margin="normal"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                    />

                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="outlined" onClick={onClose}>Hủy bỏ</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleSave}>Lưu</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        )
    );
};

export default CoursePriceModel;
