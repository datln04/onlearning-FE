import { useEffect, useState } from 'react';
import {
  Typography,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
} from '@mui/material';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';
import moment from 'moment/moment';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';

export default function ListTransactionHistory() {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/transactions`,
      label: `Danh sách lịch sử giao dịch`,
    },
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData('/transaction/transactions', token).then((resp) => {
          if (resp) {
            setData(resp);
            setDataFilter(resp);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  // date function
  const [monthS, setMonthS] = useState([]);
  const [dayS, setDayS] = useState();
  let [monthA, setMonthA] = useState(new Date());
  let fullYearCalendar = {};

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString('en-US', { month: 'long' });
  }

  const handleChangeMonth = (event) => {
    setMonthA(new Date(event.target.value));
    let date = new Date(monthA.getFullYear(), 0, 1);
    let dayLength = 1000 * 60 * 60 * 24;
    let year = date.getFullYear();
    let yearLength = year % 4 || (!(year % 100) && year % 400) ? 365 : 366;
    for (let i = 0; i < yearLength; i++) {
      let month = date.toLocaleDateString('en-US', { month: 'long' });
      let weekday = date.toLocaleDateString('vi-VN', { weekday: 'short' });
      if (!fullYearCalendar[month]) fullYearCalendar[month] = [];
      fullYearCalendar[month].push({
        date: date.getDate(),
        day: weekday,
      });
      date = new Date(date.getTime() + dayLength);
    }
    setMonthS(fullYearCalendar[getMonthName(new Date(event.target.value).getMonth())]);
  };

  const handleFilterPayment = () => {
    if (!monthS) {
      setDataFilter(data);
    } else {
      if (!dayS) {
        const filteredDates = data.filter(
          (d) =>
            new Date(moment(d.dateProcess).format('YYYY'), moment(d.dateProcess).format('MM'), 0) -
            new Date(monthA.getFullYear(), monthA.getMonth() + 1, 0) ===
            0,
        );
        setDataFilter(filteredDates);
      } else {
        const filteredDates = data.filter(
          (d) =>
            new Date(
              moment(d.dateProcess).format('YYYY'),
              moment(d.dateProcess).format('MM'),
              moment(d.dateProcess).format('DD'),
            ) -
            new Date(monthA.getFullYear(), monthA.getMonth() + 1, dayS) ===
            0,
        );
        setDataFilter(filteredDates);
      }
    }
  };

  return (
    data && (
      <div className="px-5 py-3" style={{ overflow: 'auto' }}>
        <div className="mb-3">
          <h4 style={{ fontWeight: 'bold' }}>Lịch sử giao dịch</h4>
          <CustomBreadcrumbs items={breadcrumbItems} />
        </div>
        <Paper
          sx={{
            padding: '20px',
            borderRadius: '20px',
            maxHeight: 'max-content',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
          }}
        >
          <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
            <div className=" py-1 px-3" style={{ backgroundColor: '#f4f6f8', borderRadius: '20px' }}>
              Ngày :
              <Select
                sx={{
                  marginLeft: '10px',
                  marginRight: '20px',
                  width: '10%',
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  '.MuiOutlinedInput-input': { paddingInline: 5 },
                  '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    border: 0,
                  },
                  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 0,
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dayS}
                onChange={(e) => setDayS(e.target.value)}
              >
                <MenuItem value={''}>--</MenuItem>
                {monthS &&
                  monthS.map((s, index) => {
                    return (
                      <MenuItem key={index} value={s.date}>
                        {s.date}
                      </MenuItem>
                    );
                  })}
              </Select>
              Tháng :
              <InputBase
                type="month"
                min="2023-01"
                max={new Date()}
                onChange={(e) => handleChangeMonth(e)}
                style={{
                  borderRadius: '15px',
                  marginLeft: '10px',
                }}
              />
              <button
                className="btn"
                style={{
                  border: 0,
                  marginLeft: '10px',
                  borderRadius: '10px',
                  backgroundColor: '#212b36',
                  fontWeight: 700,
                  color: 'white',
                }}
                onClick={() => handleFilterPayment()}
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          <Table style={{ marginTop: '20px' }}>
            <TableHead style={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                <TableCell width={'10%'}>
                  <Typography style={{ color: '#808d99', fontWeight: 700 }}>Thời gian</Typography>
                  <Typography variant="caption">NGÀY THÁNG NĂM</Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Nội dung</TableCell>
                <TableCell>
                  <Typography style={{ color: '#808d99', fontWeight: 700 }}>Số tiền</Typography>
                  <Typography variant="caption">VNĐ</Typography>
                </TableCell>
                <TableCell width={'18%'} style={{ color: '#808d99', fontWeight: 700 }}>
                  Tài khoản thực hiện
                </TableCell>
                <TableCell width={'18%'} style={{ color: '#808d99', fontWeight: 700 }}>
                  Trạng thái
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataFilter
                .sort((a, b) => {
                  return new Date(b.dateProcess) - new Date(a.dateProcess);
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((s, index) => {
                  return (
                    <TableRow hover={true} key={index}>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        {index + (page * rowsPerPage, page * rowsPerPage) + 1}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 600, color: '#686f77' }}>
                          {moment(s.dateProcess).format('DD/MM/YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell width={'10%'}>
                        <Typography variant="body1" style={{ fontWeight: 600, color: '#686f77' }}>
                          {moment(s.dateProcess).format('hh:mm A')}
                        </Typography>
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.description}</TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#2a9a68' }}>
                          {s.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </Typography>
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        <Typography
                          variant="body1"
                          color="initial"
                          style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                        >
                          {s.accountName}
                        </Typography>
                        {s.student === null ? (
                          <Typography variant="caption">(GIÁO VIÊN)</Typography>
                        ) : (
                          <Typography variant="caption">(HỌC VIÊN)</Typography>
                        )}</TableCell>
                      <TableCell width={'15%'}>
                        {s.transactionStatus === 'COMPLETED' ? (
                          <div
                            className="p-2 text-center"
                            style={{
                              backgroundColor: '#dbf6e5',

                              borderRadius: 20,
                              fontWeight: 700,
                              width: '80%',
                            }}
                          >
                            <Typography style={{ fontWeight: 'bold', color: '#2a9a68' }}>Đã thanh toán</Typography>
                          </div>
                        ) : s.transactionStatus === 'CANCEL' ? (
                          <div
                            className="p-2 text-center"
                            style={{
                              backgroundColor: '#ffe4de',

                              borderRadius: 20,
                              fontWeight: 700,
                              width: '80%',
                            }}
                          >
                            <Typography style={{ fontWeight: 'bold', color: '#c64843' }}>Đã huỷ</Typography>
                          </div>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            component="div"
            count={dataFilter.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Số hàng trên trang :"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    )
  );
}
