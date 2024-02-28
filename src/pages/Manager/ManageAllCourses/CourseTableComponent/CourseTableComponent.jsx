import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  TablePagination,
  MenuItem,
  Popover,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DoNotDisturbOnRoundedIcon from '@mui/icons-material/DoNotDisturbOnRounded';
import RuleFolderRoundedIcon from '@mui/icons-material/RuleFolderRounded';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../../services/AppService';
import Swal from 'sweetalert2';

function CourseTableComponent({ courses }) {
  const { subjectId } = useParams();
  const [course, setCourse] = useState(null);
  const [open, setOpen] = useState(null);
  const [reason, setReason] = useState(null);
  const [openPop, setOpenPop] = useState(null);
  const [courseTmp, setCourseTmp] = useState([]);

  const handleClickOpen = (course) => {
    handleClosePop();
    setCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleOpenPop = (course, event) => {
    setOpenPop(event.currentTarget);
    setCourseTmp(course);
  };

  const handleClosePop = () => {
    setOpenPop(null);
  };

  function showSuccess(course) {
    Swal.fire({
      title: 'Duyệt thành công!',
      text: 'Khóa học : ' + courseTmp.name + ' đã được duyệt.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(function () {
      window.location.reload();
    });
  }

  function showDenySuccess(course) {
    Swal.fire({
      title: 'Đã từ chối khoá học!',
      text: 'Khóa học : ' + courseTmp.name + ' đã bị từ chối.',
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

  const handleApproved = (course) => {
    const token = Cookies.get('token');
    handleClosePop();
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
              if (resp.code === 200) {
                showSuccess(resp);
              } else {
                showError(resp.message);
              }
            })
            .catch((err) => {
              console.log(err);
              showError(err);
            });
        }
      }
    });
  };

  const handleReject = (course) => {
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
            if (resp.code === 200) {
              showDenySuccess(resp);
            } else {
              showError(resp.message);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          showError(err);
        });
      handleClose();
    }
  };

  // State to keep track of the current page and the number of rows per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Change the number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courses.length) : 0;

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

      <div className="mt-2">
        <>
          <Table>
            <TableHead style={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell width={'2%'} style={{ color: '#808d99', fontWeight: 700 }}>
                  #
                </TableCell>
                <TableCell width={'20%'} style={{ color: '#808d99', fontWeight: 700 }}>
                  Khoá học
                </TableCell>
                <TableCell width={'40%'} style={{ color: '#808d99', fontWeight: 700 }}>
                  Mô tả
                </TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Giá</TableCell>
                <TableCell width={'15%'} style={{ color: '#808d99', fontWeight: 700 }}>
                  Ngày tạo
                </TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.length > 0 ? (
                <>
                  {courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course, index) => (
                    <TableRow hover={true} key={course.id}>
                      <TableCell style={{ fontWeight: 600, color: '#5a6068' }}>{index + 1}</TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}> {course.name}</TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        <div style={{ overflow: 'auto', height: '35px', textOverflow: 'ellipsis' }}>
                          <p>{course.description}</p>{' '}
                        </div>
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }} width={'23%'}>
                        {course.price?.toLocaleString()} VNĐ
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        {moment(course.createDate).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell>
                        <div className="d-flex">
                          <Link
                            to={`/subject/${course.subject.id}/course/${course.id}/syllabus`}
                            title="Xem"
                            className="btn m-1"
                            style={{ color: '#79858f', border: 0 }}
                          >
                            <VisibilityIcon />
                          </Link>

                          {course?.status === 'PENDING' ? (
                            <>
                              <button
                                className="btn p-2"
                                style={{ padding: 0, border: 0, borderRadius: '50%', minWidth: '50', color: '#2a9a68' }}
                                onClick={(e) => handleOpenPop(course, e)}
                              >
                                <RuleFolderRoundedIcon />
                              </button>

                              <Popover
                                className="p-1"
                                open={!!openPop}
                                anchorEl={openPop}
                                onClose={handleClosePop}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                PaperProps={{
                                  sx: {
                                    border: 0,
                                    width: 180,
                                    borderRadius: '15px',
                                    boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px',
                                  },
                                }}
                              >
                                <div className="p-2">
                                  <MenuItem
                                    onClick={() => handleApproved(courseTmp)}
                                    style={{ borderRadius: '10px', marginBottom: '5px' }}
                                  >
                                    <div className="d-flex p-1">
                                      <CheckCircleRoundedIcon style={{ color: '#03a13d' }} />
                                      <Typography className="mx-2" style={{ fontWeight: 600, color: '#23c55f' }}>
                                        Xét Duyệt
                                      </Typography>
                                    </div>
                                  </MenuItem>

                                  <MenuItem onClick={() => handleClickOpen(courseTmp)} style={{ borderRadius: '10px' }}>
                                    <div className="d-flex p-1">
                                      <DoNotDisturbOnRoundedIcon style={{ color: '#d32903' }} />
                                      <Typography className="mx-2" style={{ fontWeight: 600, color: '#ff5630' }}>
                                        Từ Chối
                                      </Typography>
                                    </div>
                                  </MenuItem>
                                </div>
                              </Popover>
                            </>
                          ) : course?.status === 'ACTIVE' ? (
                            <>
                              {/* <div className="d-flex justify-content-center">
                                <Link
                                  to={`/subject/${subjectId}/course/${course?.id}/evaluate`}
                                  title="Đánh giá"
                                  aria-label="Đánh giá"
                                  className="btn m-1"
                                  style={{ color: '#ffab00', border: 0 }}
                                >
                                  <FeedbackIcon />
                                </Link>
                              </div> */}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </TableCell>

                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6}>
                    <div className="text-center">
                      <Typography style={{ fontWeight: 700, color: '#cdd2d6' }} variant="h6">
                        Hiện chưa có khoá học
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'Tất cả', value: -1 }]}
            component="div"
            count={courses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Số hàng trên trang :"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      </div>
    </>
  );
}

export default CourseTableComponent;
