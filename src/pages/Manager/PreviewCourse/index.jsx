import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@mui/material';
import NavBarLesson from './components/NavBarLesson';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import { CourseControllerApi, SubjectControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import Swal from 'sweetalert2';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const subjectApi = new SubjectControllerApi(ApiClientSingleton.getInstance());
function PreviewCourse() {
  const [course, setCourse] = useState([]);
  const { courseId, subjectId, syllabusId } = useParams();
  const [subjectData, setSubject] = useState();
  const [lessons, setLessons] = useState([]);
  const [reason, setReason] = useState(null);
  const [open, setOpen] = useState(null);

  const breadcrumbItems = [
    {
      url: '/dashboard',
      label: 'Trang chủ',
    },
    {
      url: '/subjects',
      label: 'Danh sách chủ đề',
    },
    {
      url: `/subject/${subjectId}/course/`,
      label: `Chủ đề: ${subjectData?.name}`,
    },
    {
      url: `/subject/${subjectId}/course/${courseId}/syllabus/`,
      label: `Khoá học ${course?.name}`,
    },
    {
      url: `/subject/course/${courseId}/syllabus/`,
      label: `Xem tổng quan`,
    },
  ];

  const getCourseById = () => {
    courseApi.getCourseById(courseId, (err, res) => {
      if (res) {
        console.log(res);
        setCourse(res);
      }
    });
  };
  const getSubjectById = () => {
    subjectApi.findSubjectById(subjectId, (err, res) => {
      if (res) {
        setSubject(res);
      }
    });
  };
  useEffect(() => {
    getCourseById();
    getSubjectById();
    const token = Cookies.get('token');
    fetchData('/lesson/by-syllabus?syllabus_id=' + syllabusId, token).then((resp) => {
      if (resp) {
        setLessons(resp);
      }
    });
  }, [courseId]);

  const handleApproved = (course) => {
    // alert('Xác nhận duyệt ' + course.name + " - ID : " + course.id);
    const token = Cookies.get('token');
    Swal.fire({
      title: 'Bạn muốn duyệt học này?',
      text: 'Hãy đảm bảo rằng khoá học đã đủ yếu tố để triển khai trên nền tảng!',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: `Hủy`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (token) {
          fetchData('/course/approve?course_id=' + course.id, token)
            .then((resp) => {
              if (resp) {
                showSuccess(course);
              }
            })
            .catch((err) => {
              showError(err);
            });
        }
      }
    });
  };

  const handleReject = (course) => {
    alert('Xác nhận từ chối ' + course.name + ' - ID : ' + course.id + ' - reason : ' + reason);
    const token = Cookies.get('token');
    if (token) {
      postData(
        '/course/reject',
        {
          courseId: course.id,
          reason: reason,
        },
        token,
      )
        .then((resp) => {
          if (resp) {
            showDenySuccess(resp);
          }
        })
        .catch((err) => {
          showError(err);
        });
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleClickOpen = (course) => {
    setOpen(true);
  };

  function showSuccess(course) {
    Swal.fire({
      title: 'Duyệt thành công!',
      text: 'Khóa học đã được duyệt.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(function () {
      window.location.reload();
    });
  }

  function showDenySuccess(course) {
    Swal.fire({
      title: 'Đã từ chối khoá học!',
      text: 'Khóa học đã bị từ chối.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(function () {
      window.location.reload();
    });
  }

  function showError(text) {
    Swal.fire({
      title: 'Oops...',
      text: text,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  return (
    <>
      <Dialog open={!!open} onClose={handleClose}>
        <DialogTitle>Từ chối</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sau khi từ chối, khóa học này sẽ không thể hoạt động và giáo viên cần cập nhật hoặc tạo mới để có thể được
            yêu cầu xét duyệt lại.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Lý do từ chối"
            placeholder="VD: Khóa học này chưa đảm bảo nội dung phù hợp với tiêu chuẩn cộng đồng."
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <button
            type="submit"
            title="Approve"
            className="btn btn-success m-1"
            onClick={() => handleClose()}
            // onClick={() => handleApproved(course)}
          >
            Hủy
          </button>
          <button type="submit" title="Approve" className="btn btn-danger m-1" onClick={() => handleReject(course)}>
            Xác nhận từ chối
          </button>
        </DialogActions>
      </Dialog>

      <div className="px-5 py-3">
        <div className="row">
          <div className="col-9">
            <h4 style={{ fontWeight: 'bold' }}>Tổng quan khoá học</h4>
            <CustomBreadcrumbs items={breadcrumbItems} />
          </div>
          <div className="col-3">
            {course?.status === 'PENDING' ? (
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => handleApproved(course)}
                  className="btn m-1"
                  style={{ backgroundColor: '#dbf6e5', color: '#2a9a68', fontWeight: 700 }}
                >
                  Xét duyệt
                </button>
                <button
                  onClick={() => handleClickOpen(course)}
                  className="btn m-1"
                  style={{ backgroundColor: '#ffe4de', color: '#c64843', fontWeight: 700 }}
                >
                  Từ chối
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Container className="mt-4 vh-100" style={{ maxHeight: 800, padding: '10px' }}>
          {lessons?.length === 0 ? (
            <div className="row" style={{ height: 700, overflow: 'auto' }}>
              <h3 className="text-center" style={{ fontWeight: 700, color: '#cdd2d6' }}>
                HIỆN KHÔNG CÓ BÀI HỌC TRONG KHUNG CHƯƠNG TRÌNH
              </h3>
            </div>
          ) : (
            <div
              className="row"
              style={{
                borderRadius: '20px',
                padding: '20px',
                backgroundColor: '#f4f6f8',
              }}
            >
              <div className="col-4 p-2">
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '20px',
                    height: 700,
                    overflow: 'auto',
                  }}
                >
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <NavBarLesson courseId={courseId} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-8 p-2">
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '20px',
                    height: 700,
                    overflow: 'auto',
                  }}
                >
                  <Outlet />
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default PreviewCourse;
