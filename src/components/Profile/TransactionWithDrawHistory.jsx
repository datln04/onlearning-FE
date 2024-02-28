import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import moment from 'moment/moment';
import React, { useState } from 'react'
import { formatVND } from '../../util/Utilities';

const TransactionWithDrawHistory = ({ items }) => {
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

    const renderStatus = (status) => {
        if (status === 'SUCCESS') {
            return 'Thành công'
        }
        if (status === 'PENDING') {
            return 'Đang chờ'
        }
        if (status === 'CANCEL') {
            return 'Hủy'
        }
    }

    return (
        items && (
            <div style={{ margin: '5px' }}>

                <Paper style={{ padding: '20px' }}>
                    {/* <Typography variant="body1" style={{ color: 'darkblue' }}>
                        <Link to={'/'}>Trang chủ </Link>{'>'} <Link to={'/manage-course'}>Quản lý khóa học </Link>{'>'} <Link to={`/courses/${courseId}`}>Khóa học {courseId} </Link>
                        {'>'} <Link to={`/courses/${courseId}/syllabus/${syllabusId}`}>Khung chương trình {syllabusId} </Link>{'>'} Bài học {lessonId} {'>'} Danh sách bài kiểm tra
                    </Typography> */}
                    <Typography variant="h6">Danh sách giao dịch rút tiền</Typography>
                    {/* <button className='btn btn-outline-primary' onClick={handleRequestWithDraw}>Yêu cầu rút tiền</button> */}
                    <Table style={{ marginTop: '20px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Số tiền</TableCell>
                                <TableCell>Ngày thực hiện</TableCell>
                                <TableCell>Mô tả</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                {/* <TableCell></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items && items.length > 0 && items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                                return (
                                    <>
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{formatVND(s.withdrawalAmount)}</TableCell>
                                            <TableCell>{moment(s.dateProcess).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                            <TableCell>{s.requestComments}</TableCell>
                                            <TableCell>{renderStatus(s.withdrawalRequestStatus)}</TableCell>
                                        </TableRow>
                                        {/* {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )} */}
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        labelRowsPerPage="Số hàng trên trang :"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={items?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

        )
    )
}

export default TransactionWithDrawHistory
