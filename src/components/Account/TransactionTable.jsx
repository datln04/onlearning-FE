import { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
} from '@mui/material';
import moment from 'moment/moment';

export default function ListTransactionHistory({ data }) {
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(data);
  });

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
      <div>
        <>
          <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
            Ngày :
            <Select
              style={{ marginLeft: '10px', marginRight: '20px', width: '10%' }}
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
                      {s.date + ', ' + s.day}
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
            <Button
              style={{
                marginLeft: '10px',
                borderRadius: '10px',
                backgroundColor: '#DDDDDD',
              }}
              onClick={() => handleFilterPayment()}
            >
              Tìm kiếm
            </Button>
          </div>

          <Table style={{ marginTop: '20px' }}>
            <TableHead>
              <TableRow>
                <TableCell>Ngày giao dịch</TableCell>
                <TableCell>Lý do</TableCell>
                <TableCell>
                  Số tiền <br /> (vnd)
                </TableCell>
                <TableCell>Trạng thái</TableCell>
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
                      <TableCell>
                        <Typography variant="body1" color="primary">
                          {moment(s.dateProcess).format('DD/MM/YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>{s.description}</TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" color="primary">
                          {s.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </Typography>
                      </TableCell>
                      <TableCell width={'15%'}>
                        {s.transactionStatus === 'COMPLETED' ? (
                          <Typography variant="body2" style={{ color: 'green', fontWeight: 'bold' }}>
                            ĐÃ THANH TOÁN
                          </Typography>
                        ) : s.transactionStatus === 'CANCEL' ? (
                          <Typography variant="body2" style={{ color: 'red', fontWeight: 'bold' }}>
                            ĐÃ HUỶ
                          </Typography>
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
        </>
      </div>
    )
  );
}
