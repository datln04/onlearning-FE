// CourseTableComponent.js
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { TablePagination } from '@mui/material';
import { Paper, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

function CourseTableComponent({ courses, onApprove, onShowReason, onDisable }) {
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
      <Table>
        <TableHead style={{ backgroundColor: '#f4f6f8' }}>
          <TableRow>
            <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
            <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tên khoá học</TableCell>
            <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Học viên đang học</TableCell>
            <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Chủ đề</TableCell>
            <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses &&
            courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={course.id}>
                <TableCell style={{ fontWeight: 600, color: '#5a6068' }}>{index + 1}</TableCell>
                <TableCell style={{ fontWeight: 600, color: '#5a6068' }}>{course.name}</TableCell>
                <TableCell style={{ fontWeight: 600, color: '#5a6068' }}>{course.enrolling}</TableCell>
                <TableCell style={{ fontWeight: 600, color: '#5a6068' }}>{course.subject.name}</TableCell>
                <TableCell style={{ fontWeight: 600, color: '#5a6068' }}>
                  {/* <a href='' className='btn btn-outline-primary'>Chi tiết</a> */}
                  <Link to={`/courses/${course.id}`} className="btn m-1" style={{ color: '#79858f', border: 0 }}>
                    <VisibilityIcon />
                  </Link>
                  {((course.status === 'ACTIVE' && course.enrolling < 1) ||
                    course.status === 'DRAFT' ||
                    course.status === 'REJECT') && (
                    <Button
                      style={{
                        border: 0,
                        backgroundColor: '#fcb8a8',
                        color: '#c64843',
                        fontWeight: 700,
                        borderRadius: '8px',
                      }}
                      className=" mx-2"
                      onClick={() => onDisable(course)}
                    >
                      Tắt hoạt động
                    </Button>
                  )}
                  {course.status === 'REJECT' && (
                    <Button
                      style={{
                        border: 0,
                        backgroundColor: '#fff2d8',
                        color: '#ffab00',
                        fontWeight: 700,
                        borderRadius: '8px',
                      }}
                      className="mx-2"
                      onClick={() => onShowReason(course.id)}
                    >
                      Xem lý do
                    </Button>
                  )}
                  {(course.status === 'DRAFT' || course.status === 'REJECT' || course.status === 'DEACTIVE') && (
                    <Button
                      style={{
                        border: 0,
                        backgroundColor: '#d6f4f9',
                        color: '#328cb2',
                        fontWeight: 700,
                        borderRadius: '8px',
                      }}
                      className=" mx-2"
                      onClick={() => onApprove(course)}
                    >
                      {course.status === 'REJECT' || course.status === 'DEACTIVE'
                        ? `Kiến nghị lại khóa học`
                        : `Kiến nghị khóa học`}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          {courses.length == 0 && (
            <TableRow>
              <TableCell className="text-center" colSpan={6}>
                <h3 style={{ fontWeight: 700, color: 'grey' }}>Chưa có khoá học</h3>
              </TableCell>
            </TableRow>
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        labelRowsPerPage="Số hàng trên trang :"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={courses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default CourseTableComponent;
