import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import moment from 'moment';
import React, { useState } from 'react';
import { postData } from '../../services/AppService';

const TransactionRequestWithDraw = ({ items }) => {
  const userTmp = JSON.parse(Cookies.get('user'));
  // State to keep track of the current page and the number of rows per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    // Check if the item is already selected
    const isItemSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);

    if (!isItemSelected) {
      // Item is not selected, add it to the selectedItems array
      setSelectedItems([...selectedItems, item]);
    } else {
      // Item is already selected, remove it from the selectedItems array
      const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
      setSelectedItems(updatedSelectedItems);
    }
  };

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
    if (status === 'COMPLETED') {
      return 'Thành công';
    }
    if (status === 'PENDING') {
      return 'Đang chờ';
    }
    if (status === 'CANCEL') {
      return 'Hủy';
    }
  };

  const handleRequestWithDraw = () => {
    setIsOpen(true);
  };

  const handleSave = async () => {
    //todo call api
    const token = Cookies.get('token');
    const transactions = selectedItems.map((s) => {
      return s.id;
    });
    if (token && transactions.length > 0) {
      const body = {
        teacherId: userTmp.teacherId,
        transactions: transactions,
      };
      await postData(`/withdraw-request/withdraw-trasaction`, body, token).then((resp) => {
        if (resp) {
          window.location.reload();
        }
      });
    }
    setIsOpen(false);
  };

  return (
    items && (
      <div style={{ margin: '5px' }}>
        <Paper
          sx={{
            padding: '20px',
            borderRadius: '20px',
            maxHeight: 'max-content',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          <div className="row py-3">
            <div className="col-8">
              <h4 style={{ fontWeight: 'bold' }}>Danh sách giao dịch thành công</h4>
            </div>
            <div className="text-end col-4">
              <button style={{ fontWeight: 700 }} className="btn btn-primary" onClick={handleRequestWithDraw}>
                Chuyển vào ví
              </button>
            </div>
          </div>
          <Table style={{ marginTop: '20px' }}>
            <TableHead style={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tài khoản</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Ngày thực hiện</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Mô tả</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Trạng thái</TableCell>
                {/* <TableCell></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.length > 0 &&
                items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.accountName}</TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                          {moment(s.dateProcess).format('YYYY-MM-DD')}
                        </TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.description}</TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                          {renderStatus(s.transactionStatus)}
                        </TableCell>
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
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="md">
            <DialogTitle>Chọn giao dịch để chuyển vào ví</DialogTitle>
            <DialogContent>
              <Grid container>
                <TableContainer>
                  <Table>
                    <TableHead style={{ backgroundColor: '#f4f6f8' }}>
                      <TableRow>
                        <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                        <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tài khoản</TableCell>
                        <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Mô tả</TableCell>
                        <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items &&
                        items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{++index}</TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{item.accountName}</TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{item.description}</TableCell>
                            <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                              <Checkbox
                                color="primary"
                                checked={selectedItems?.includes(item)}
                                onChange={() => handleCheckboxChange(item)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setIsOpen(false)} color="secondary">
                Hủy
              </Button>
              <Button onClick={handleSave} color="primary">
                Hoàn thành
              </Button>
            </DialogActions>
          </Dialog>

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
  );
};

export default TransactionRequestWithDraw;
