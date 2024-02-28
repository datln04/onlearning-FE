import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button } from "@mui/material";
import CourseModel from './CourseModel';
import { courseData } from '../../../mock/mock-data';
import CoursePriceModel from './CoursePriceModel';

const ListCourse = () => {
    const { subjectId } = useParams(); // Get subjectId from URL params
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCoursePriceModalOpen, setIsCoursePriceModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = courseData.filter(course => course.subjectId == subjectId);
        setCourses(data);
    }, [subjectId]);

    const saveCourse = (newCourse) => {
        // Add the new course to the courseData array
        newCourse.id = courseData.length + 1;
        courseData.push(newCourse);
        setCourses([...courseData]);
    };

    const openModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const openPriceModal = (course) => {
        setSelectedPrice(course);
        setIsCoursePriceModalOpen(true)
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsCoursePriceModalOpen(false)
    };

    const handleBackButton = () => {
        navigate(-1)
    };

    const handleUpdatePrice = (courseId, newPrice) => {
        // Update the course's price in your data source (e.g., courseData)
        // Update the UI with the new price
        const updatedCourses = courses.map(course => {
            if (course.id === courseId) {
                course.price = newPrice;
            }
            return course;
        });
        setCourses(updatedCourses);

        setIsModalOpen(false); // Close the modal after updating
    };

    return (
        courses !== null && courses.length > 0 && (
            <div className='container text-center'>
                <h2 className='my-4'>Danh sách khóa học</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button variant="outlined" onClick={handleBackButton} style={{ marginBottom: '20px' }}>Quay lại</Button>
                    <Button variant="outlined" onClick={openModal} style={{ marginBottom: '20px' }}>Thêm Khóa Học</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Course Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Limit Time</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell className='text-center'>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell>{course.name}</TableCell>
                                    <TableCell>{course.status ? "Active" : "Inactive"}</TableCell>
                                    <TableCell>{course.description}</TableCell>
                                    <TableCell>{course.limitTime}</TableCell>
                                    <TableCell>{course.price}</TableCell>
                                    <TableCell className='d-flex justify-content-evenly'>
                                        <button className='btn btn-outline-primary' onClick={() => openPriceModal(course)}>Chỉnh sửa giá</button>
                                        <Link to={`/courses/${course.id}/courseQuestions`} className='btn btn-outline-success'>
                                            D.sách câu hỏi
                                        </Link>
                                        <Link to={`/courses/${course.id}/lessons`} className='btn btn-outline-info'>
                                            Q.lý bài học
                                        </Link>
                                        <Link to={`/courses/${course.id}/syllabus`} className='btn btn-outline-secondary'>
                                            D.sách giáo trình
                                        </Link>
                                        <Link to={`/courses/${course.id}/feedbacks`} className='btn btn-outline-warning'>
                                            Feedback
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {selectedCourse && (
                    <CourseModel
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onSave={saveCourse}
                        teacherId={1}
                        subjectId={subjectId}
                        courseId={selectedCourse.id}
                        initialPrice={selectedPrice}
                    />
                )}
                {selectedPrice && (
                    <CoursePriceModel
                        isOpen={isCoursePriceModalOpen}
                        onClose={closeModal}
                        onSave={handleUpdatePrice}
                        teacherId={1}
                        subjectId={subjectId}
                        courseId={selectedPrice.id}
                        initialPrice={selectedPrice.price}
                    />
                )}
            </div>
        )
    );
};

export default ListCourse;
