import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TextField,
  Container,
  TablePagination,
} from '@mui/material';
import { Search } from '@material-ui/icons';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import moment from 'moment';

const ListFeedback = () => {
  const [data, setData] = useState([]);
  const breadcrumbItems = [
    {
      url: '/dashboard',
      label: 'Trang chủ',
    },
    {
      url: '/report-accounts',
      label: 'Báo cáo tài khoản',
    },
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData(`/report/reports`, token)
        .then((resp) => {
          if (resp) {
            setData(resp.responseObject);
            console.log(resp.responseObject);
          }
        })
        .catch((err) => console.log(err));
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
  return (
    data && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row mb-3">
          <h4 style={{ fontWeight: 'bold' }}>Danh sách báo cáo</h4>
          <CustomBreadcrumbs items={breadcrumbItems} />
        </div>

        <Paper
          sx={{
            padding: '20px',
            borderRadius: '20px',
            maxHeight: 'max-content',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          <div style={{ marginTop: '20px' }} className="d-flex align-items-center">
            {/* <InputBase
                                    placeholder="Search"
                                    style={{ marginLeft: '20px' }}
                                    startAdornment={<Search />}
                                // onChange={handleSearchChange}
                                /> */}
          </div>

          <Table style={{ marginTop: '20px' }}>
            <TableHead style={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell width={'5%'} style={{ color: '#808d99', fontWeight: 700 }}>
                  #
                </TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Ngày gửi</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Người báo cáo</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Người bị báo cáo</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Nội dung</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                      <TableCell width={'20%'} style={{ fontWeight: 600, color: '#686f77' }}>
                        {moment(r.createTime).format('DD-MM-YYYY')}
                      </TableCell>
                      {r.reportType === 'STUDENT' ? (
                        <>
                          <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                            {r.student?.account.profile.lastName} {r.student?.account.profile.firstName} <br />
                            <Typography variant="caption" color={'#328cb8'}>
                              (Học viên)
                            </Typography>
                          </TableCell>

                          <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                            {r.teacher?.account.profile.lastName} {r.teacher?.account.profile.firstName} <br />
                            <Typography variant="caption" color={'#ffaf00'}>
                              (Giảng viên)
                            </Typography>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                            {r.teacher?.account.profile.lastName} {r.teacher?.account.profile.firstName} <br />
                            <Typography variant="caption" color={'#ffaf00'}>
                              (Giảng viên)
                            </Typography>
                          </TableCell>
                          <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                            {r.student?.account.profile.lastName} {r.student?.account.profile.firstName} <br />
                            <Typography variant="caption" color={'#328cb8'}>
                              (Học viên)
                            </Typography>
                          </TableCell>
                        </>
                      )}

                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        <div dangerouslySetInnerHTML={{ __html: r.content || '' }} />
                      </TableCell>

                      {/* <TableCell width={'10%'} className="text-center">
                        <button className="btn " style={{ color: '#686f77', border: 0 }}>
                          <VisibilityRoundedIcon />
                        </button>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6}></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            component="div"
            count={data.length}
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
};

export default ListFeedback;
