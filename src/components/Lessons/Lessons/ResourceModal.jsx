import React, { useState, useEffect } from 'react';
import { Modal, Button, Box, Typography, Grid, Paper, TextField } from "@mui/material";

const ResourceModal = ({ isOpen, onClose, onSave, resourceId, studyTime }) => {
    const [resourceData, setResourceData] = useState({
        studyTime: studyTime || '', // Use an empty string for the date and time
        // Add other resource properties here
    });

    useEffect(() => {
        setResourceData({
            ...resourceData,
            studyTime: studyTime || '', // Use an empty string for the date and time
        });
    }, [studyTime]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResourceData({
            ...resourceData,
            [name]: value,
        });
    };

    const handleSaveResource = () => {
        if (!resourceData.studyTime) {
            alert('Please select a study date.');
            return;
        }

        onSave(resourceId, resourceData);

        setResourceData({
            studyTime: '', // Reset to an empty string
            // Reset other resource properties as needed
        });
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px' }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h6">Resource Details</Typography>
                    <TextField
                        fullWidth
                        label="Study Date"
                        variant="outlined"
                        margin="normal"
                        type="date" // Use input type "date" for date selection
                        name="studyTime"
                        value={resourceData.studyTime}
                        onChange={handleInputChange}
                        required
                    />
                    {/* Add additional input fields for other resource properties here */}
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="outlined" onClick={onClose}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleSaveResource}>Save</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Modal>
    );
};

export default ResourceModal;
