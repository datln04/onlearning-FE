import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment/moment';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, TextField, Typography } from '@mui/material';
import { PATTERN_DATE, PAYMENT_STATUS, PAYMENT_TYPE, formatDate } from '../../../../constant';
import DateRangePicker from '../../../../components/DateRangePicker';
import { useContext } from 'react';
import { FilterContext as StudentFilerContext } from '../../../StudentProfile';
import Cookies from 'js-cookie';
import { FilterContext } from '../../../Teacher/TeacherPage';

function createData(transactionId, courseName, price, transactionDate) {
  return {
    transactionId,
    courseName,
    price,
    transactionDate,
  };
}

const rows = [
  createData('Transaction 1', 'Khóa học 1', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 2', 'Khóa học 2', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 3', 'Khóa học 3', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 4', 'Khóa học 4', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 5', 'Khóa học 5', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 6', 'Khóa học 6', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 7', 'Khóa học 7', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 8', 'Khóa học 8', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 9', 'Khóa học 9', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 10', 'Khóa học 10', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 11', 'Khóa học 11', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 12', 'Khóa học 12', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
  createData('Transaction 13', 'Khóa học 13', 88888, moment(new Date()).format('DD/MM/YYYY hh:mm:ss')),
];

const headCells = [
  {
    id: 'index',
    numeric: true,
    disablePadding: false,
    label: '#',
  },
  {
    id: 'cardDetails',
    numeric: false,
    disablePadding: false,
    label: 'Thông tin thẻ',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Số tiền',
  },
  {
    id: 'paymentMethod',
    numeric: false,
    disablePadding: false,
    label: 'Phương thức thanh toán',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Loại giao dịch',
  },
  {
    id: 'transactionDate',
    numeric: false,
    disablePadding: false,
    label: 'Ngày giao dịch',
  },
];

function EnhancedTableHead() {
  return (
    <TableHead style={{ backgroundColor: '#f4f6f8' }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell style={{ color: '#808d99', fontWeight: 700 }} key={headCell.id}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function TableTransactions({ transactions }) {
  const user = JSON.parse(Cookies.get('user'));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { filterPaymentHis, setFilterPaymentHis } = useContext(user?.studentId ? StudentFilerContext : FilterContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Paper
      sx={{
        padding: '20px',
        borderRadius: '20px',
        maxHeight: 'max-content',
        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
      }}
    >
      <div className="d-flex  justify-content-between align-items-center  py-3">
        <h4 style={{ fontWeight: 'bold' }}>Lịch sử nạp/rút</h4>
        <div style={{ minWidth: '400px' }}>
          <DateRangePicker
            onChangeEndDate={(date) => {
              setFilterPaymentHis({
                ...filterPaymentHis,
                endDate: date,
              });
            }}
            onChangeStartDate={(date) => {
              setFilterPaymentHis({
                ...filterPaymentHis,
                startDate: date,
              });
            }}
          />
        </div>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead />
          {transactions && transactions.length > 0 ? (
            <TableBody>
              {transactions?.map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.name}>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{row?.cardDetails}</TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      {row?.amount.toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{row?.paymentMethod}</TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      {PAYMENT_STATUS[row?.paymentHistoryStatus]}
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      {PAYMENT_TYPE[row?.paymentHistoryType]}
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      {formatDate(row?.transactionDate, PATTERN_DATE.HH_MM_SS_DD_MM_YYYY)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <tr>
              <td colspan="7">
                <div
                  className="d-flex  justify-content-center align-items-center"
                  style={{
                    width: '100%',
                    height: '320px',
                    fontWeight: 600,
                    color: '#384256',
                  }}
                >
                  Bảng giao dịch
                </div>
              </td>
            </tr>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
}
