import { useParams } from 'react-router-dom';
import Footer from '../../../../components/Landing/Footer/Footer';
import Header from '../../../../components/Landing/Header/Header';
import { courseData } from '../../../../mock/mock-data';
import { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmsIcon from '@mui/icons-material/Sms';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CourseControllerApi, SyllabusControllerApi } from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import LessonInfo from '../LessonInfo';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const syllabusApi = new SyllabusControllerApi(ApiClientSingleton.getInstance());
function CourseInfo() {
  const [course, setCourse] = useState();
  const [syllabus, setSyllabus] = useState();
  const { courseId } = useParams([]);

  useEffect(() => {
    courseApi.getCourseById(courseId, (error, res) => {
      setCourse(res);
    });
    syllabusApi.findSyllabusByCourseEnrolled(courseId, (err, res) => {
      setSyllabus(res);
    });
  }, [courseId]);

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <Typography variant="h6">Thông tin khóa học</Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <div className="d-flex">
                    <InsertDriveFileIcon />
                    <Typography sx={{ marginInline: 1 }}>{course?.name}</Typography>
                  </div>
                </TableCell>
                <TableCell>{course?.description}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <div className="d-flex">
                    <SchoolOutlinedIcon />
                    <Typography sx={{ marginInline: 1 }}>Điểm qua môn</Typography>
                  </div>
                </TableCell>
                <TableCell>{course?.averagePoint} điểm</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <div className="d-flex">
                    <WorkspacePremiumIcon />
                    <Typography sx={{ marginInline: 1 }}>Cách hoàn thành</Typography>
                  </div>
                </TableCell>
                <TableCell>
                  Trung bình cộng tất cả các bài tập đã được chấm điểm lớn hơn điểm qua môn để hoàn thành khóa học.
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <div className="d-flex">
                    <SmsIcon />
                    <Typography sx={{ marginInline: 1 }}>Ngôn ngữ</Typography>
                  </div>
                </TableCell>
                <TableCell sx={{ marginInline: 1 }}>Tiếng việt</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6">Giáo trình</Typography>
        <Divider />
        <div>
          {syllabus ? (
            <>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>{syllabus?.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <LessonInfo lessonsBySyllabus={syllabus?.lessons} />
                </AccordionDetails>
              </Accordion>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default CourseInfo;
