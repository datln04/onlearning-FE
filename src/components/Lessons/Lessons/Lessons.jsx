import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
// import LessonModal from './LessonModal'; // Import the LessonModal component
import { lessonsData } from '../../../mock/mock-data'; // Replace with your actual lesson data
import { Link, useNavigate, useParams } from 'react-router-dom';
import ResourceModal from './ResourceModal'; // Import the ResourceModal component

const Lessons = () => {
    const { courseId } = useParams(); // Get courseId from URL params
    const [lessons, setLessons] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null); // Track the selected lesson for editing
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null); // Track the selected resource for editing
    const navigate = useNavigate();

    useEffect(() => {
        // Replace this with your actual data fetching logic for lessons
        setLessons(lessonsData);
    }, []);

    const openModal = (lesson) => {
        setSelectedLesson(lesson); // Set the selected lesson for editing
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedLesson(null); // Clear the selected lesson
        setIsModalOpen(false);
    };

    const openResourceModal = (resource) => {
        setSelectedResource(resource); // Set the selected resource for editing
        setIsResourceModalOpen(true);
    };

    const closeResourceModal = () => {
        setSelectedResource(null); // Clear the selected resource
        setIsResourceModalOpen(false);
    };

    const handleSave = (newLesson) => {
        if (selectedLesson) {
            // Editing an existing lesson
            const updatedLessons = lessons.map((lesson) =>
                lesson.id === selectedLesson.id ? newLesson : lesson
            );
            setLessons(updatedLessons);
        } else {
            // Adding a new lesson
            newLesson.id = lessons.length + 1;
            setLessons([...lessons, newLesson]);
        }
        closeModal();
    };

    const handleSetStudyTime = (resourceId, studyTime) => {
        if (selectedLesson) {
            // Update the study time of the selected resource
            const updatedResources = selectedLesson.resources.map((resource) =>
                resource.id === resourceId ? { ...resource, studyTime } : resource
            );

            // Update the resources for the selected lesson
            const updatedLesson = {
                ...selectedLesson,
                resources: updatedResources,
            };

            // Update the lessons state with the updated lesson
            const updatedLessons = lessons.map((lesson) =>
                lesson.id === selectedLesson.id ? updatedLesson : lesson
            );

            setLessons(updatedLessons);
        }
        closeResourceModal();
    };

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <div className='container-fluid text-center'>
            <h2 className='my-5'>Danh sách bài học</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="outlined" onClick={handleBackButton} style={{ marginBottom: '20px' }}>Quay lại</Button>
                <Button variant="outlined" onClick={() => openModal(null)} style={{ marginBottom: '20px' }}>Thêm Bài Học</Button>
            </div>

            {/* Table view for lessons */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Asset</TableCell>
                            <TableCell>Date/Time</TableCell>
                            <TableCell>Duration (minutes)</TableCell>
                            <TableCell className='text-center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lessons.map((lesson) => (
                            <TableRow key={lesson.id}>
                                <TableCell>{lesson.name}</TableCell>
                                <TableCell>{lesson.description}</TableCell>
                                <TableCell>{lesson.url}</TableCell>
                                <TableCell>{lesson.status}</TableCell>
                                <TableCell>{lesson.asset}</TableCell>
                                <TableCell>{lesson.date_time}</TableCell>
                                <TableCell>{lesson.time}</TableCell>
                                <TableCell className='d-flex justify-content-evenly'>
                                    <button className='btn btn-outline-success mx-1' onClick={() => openResourceModal(null)}>
                                        Set Study Time
                                    </button>
                                    <button className='btn btn-outline-success mx-1' onClick={() => openModal(lesson)}>
                                        Cập nhật bài học
                                    </button>
                                    {/* Replace the link destination with your actual URL */}
                                    <Link to={`/lessons/${lesson.id}/quizs`} className='btn btn-outline-primary'>
                                        D.sách quiz
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Lesson Modal */}
            {/* <LessonModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSave}
                onUpdate={handleSave}
                lesson={selectedLesson} // Pass the selected lesson for editing
            /> */}

            {/* Resource Modal */}
            <ResourceModal
                isOpen={isResourceModalOpen}
                onClose={closeResourceModal}
                onSave={handleSetStudyTime}
                resourceId={selectedResource ? selectedResource.id : null}
                studyTime={selectedResource ? selectedResource.studyTime : null}
            />
        </div>
    );
};

export default Lessons;
