// import moment from 'moment';
// import React from 'react'
// import { useState } from 'react';
// import { courseData } from '../../../mock/mock-data';
// import { useNavigate } from 'react-router-dom';

// const InsertCourse = () => {

//     const navigate = useNavigate()

//     const [formData, setFormData] = useState({
//         name: "",
//         status: "",
//         image: "",
//         description: "",
//         limit_time: "",
//         quiz_time: "",
//         price: "",
//     });


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Validation: Price greater than 0
//         if (formData.price <= 0) {
//             alert("Price must be greater than 0.");
//             return;
//         }

//         // Validation: Limit time not smaller than today
//         const today = moment().startOf("day");
//         const limitTime = moment(formData.limit_time, "YYYY-MM-DD").startOf("day");

//         if (limitTime.isBefore(today)) {
//             alert("Limit time cannot be earlier than today.");
//             return;
//         }

//         // Create a new course object
//         const newCourse = {
//             id: courseData.length + 1, // Generate a new ID
//             name: formData.name,
//             status: formData.status,
//             image: formData.image,
//             description: formData.description,
//             limit_time: formData.limit_time,
//             create_date: moment().format("YYYY-MM-DDTHH:mm:ss"), // Current date and time
//             quiz_time: formData.quiz_time,
//             price: formData.price,
//             average_point: 0, // Initialize with 0
//             account_id: JSON.parse(Cookies.get('user'))?.id, // Assuming the account ID is fixed for now
//         };

//         courseData.push(newCourse);
//         // console.log(courseData);
//         // window.location.href = "/courses";
//         navigate('/courses', { state: courseData })
//     };

//     return (
//         <div className="container">
//             <div className='col-12 d-flex justify-content-center'>
//                 <div className='col-8'>
//                     <h2 className="text-center mt-4 mb-4">Create New Course</h2>
//                     <form method='POST'>
//                         <div className="mb-3">
//                             <label htmlFor="name" className="form-label">
//                                 Course Name
//                             </label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="status" className="form-label">
//                                 Status
//                             </label>
//                             <input
//                                 type="text"
//                                 name="status"
//                                 value={formData.status}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="image" className="form-label">
//                                 Image URL
//                             </label>
//                             <input
//                                 type="text"
//                                 name="image"
//                                 value={formData.image}
//                                 onChange={handleChange}
//                                 className="form-control"
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="description" className="form-label">
//                                 Description
//                             </label>
//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 rows="4"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="limit_time" className="form-label">
//                                 Limit Time
//                             </label>
//                             <input
//                                 type="date"
//                                 name="limit_time"
//                                 value={formData.limit_time}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="quiz_time" className="form-label">
//                                 Quiz Time (minutes)
//                             </label>
//                             <input
//                                 type="number"
//                                 name="quiz_time"
//                                 value={formData.quiz_time}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="price" className="form-label">
//                                 Price
//                             </label>
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>

//                         <div className="d-grid">
//                             <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={handleSubmit}>
//                                 Create Course
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default InsertCourse


import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { courseData } from '../../../mock/mock-data';
import Cookies from 'js-cookie';

const InsertCourse = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        status: '',
        image: '',
        description: '',
        limit_time: '',
        quiz_time: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation: Price greater than 0
        if (formData.price <= 0) {
            alert('Price must be greater than 0.');
            return;
        }

        // Validation: Limit time not smaller than today
        const today = moment().startOf('day');
        const limitTime = moment(formData.limit_time, 'YYYY-MM-DD').startOf('day');

        if (limitTime.isBefore(today)) {
            alert('Limit time cannot be earlier than today.');
            return;
        }

        // Create a new course object
        const newCourse = {
            id: courseData.length + 1, // Generate a new ID
            name: formData.name,
            status: formData.status,
            image: formData.image,
            description: formData.description,
            limit_time: formData.limit_time,
            create_date: moment().format('YYYY-MM-DDTHH:mm:ss'), // Current date and time
            quiz_time: formData.quiz_time,
            price: formData.price,
            average_point: 0, // Initialize with 0
            account_id: JSON.parse(Cookies.get('user'))?.id, // Assuming the account ID is fixed for now
        };

        courseData.push(newCourse);
        navigate('/courses', { state: courseData });
    };

    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8}>
                    <Typography variant="h4" align="center" mt={4} mb={4}>
                        Create New Course
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Course Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Image URL"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Limit Time"
                            name="limit_time"
                            type="date"
                            value={formData.limit_time}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Quiz Time (minutes)"
                            name="quiz_time"
                            type="number"
                            value={formData.quiz_time}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth mt={2}>
                            Create Course
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default InsertCourse;
