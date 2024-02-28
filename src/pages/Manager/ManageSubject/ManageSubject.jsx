import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubjectModal from './SubjectModal';
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
  TablePagination,
  Popover,
  MenuItem,
} from '@mui/material';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import moment from 'moment/moment';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import Swal from 'sweetalert2';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DoDisturbOnRoundedIcon from '@mui/icons-material/DoDisturbOnRounded';
import { Select } from '@mui/material';

export default function ListSubject() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [dataSubmit, setDataSubmit] = useState([]);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [user, setUser] = useState(null);
  const [subjectTmp, setSubjectTmp] = useState([]);
  const [openPop, setOpenPop] = useState(null);
  const navigate = useNavigate();
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/subjects`,
      label: `Danh sách chủ đề`,
    },
  ];

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setUser(JSON.parse(user));
    }
    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData('/subject/subjects', token).then((resp) => {
          if (resp) {
            setData(resp);
            setDataSubmit(resp);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleOpenPop = (subject, event) => {
    setOpenPop(event.currentTarget);
    setSubjectTmp(subject);
  };

  const handleClosePop = () => {
    setOpenPop(null);
  };

  const handleAddSubject = () => {
    setSubjectToEdit(null); // Clear any previous subject data (for editing)
    setIsSubjectModalOpen(true);
  };

  const handleEditSubject = (subjectData) => {
    console.log(subjectData);
    setSubjectToEdit(subjectData);
    handleClosePop(); // Set the subject data to edit
    setIsSubjectModalOpen(true);
  };

  const handleViewSubject = (subjectId) => {
    navigate(`/subject/${subjectId}/course`);
  };

  const handleSubjectModalClose = () => {
    setIsSubjectModalOpen(false);
  };

  const saveOrUpdateSubject = async (subjectData) => {
    const token = Cookies.get('token');
    // console.log('Subject data to save or update:', subjectData);
    const body = {
      ...subjectData,
      createDate: new Date(),
      staffId: user?.id,
    };
    // If subjectData has an "id", it means you are updating an existing subject.
    if (subjectData.id) {
      // Implement your update logic here.
      console.log('Subject data to update:', subjectData);

      const body = {
        ...subjectData,
        createDate: new Date(),
        staffId: user?.id,
      };
      console.log('Subject data to update:', await body);
      await postData('/subject/save', body, token)
        .then((resp) => {
          if (resp) {
            Swal.fire({
              title: 'Thành công!',
              text: 'Bạn đã cập nhật môn' + subjectData.name + ' !',
              icon: 'success',
            });
            window.location.reload();
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Opss..',
            text: err,
            icon: 'warning',
          });
          console.log(err);
        });
    } else {
      // Implement your create logic here for new subject.
      console.log('Subject data to create:', subjectData);

      await postData('/subject/save', body, token)
        .then((resp) => {
          if (resp) {
            Swal.fire({
              title: 'Tạo môn học',
              text: 'Bạn đã tạo thành công môn' + subjectData.name + ' !',
              icon: 'success',
            });
            window.location.reload();
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Opss..',
            text: 'Vui lòng nhập đúng thông tin',
            icon: 'warning',
          });
          console.log(err);
        });
    }

    setIsSubjectModalOpen(false); // Close the SubjectModal
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterData = dataSubmit.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchValue.toLowerCase()),
  );

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    data && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row mb-3">
          <div className="col-8">
            <h4 style={{ fontWeight: 'bold' }}>Danh sách chủ đề</h4>
            <CustomBreadcrumbs items={breadcrumbItems} />
          </div>
          <div className="text-end col-4">
            <Button
              variant="outlined"
              style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
              onClick={handleAddSubject}
            >
              Tạo mới
            </Button>
          </div>
        </div>

        <Paper
          sx={{
            padding: '20px',
            borderRadius: '20px',
            maxHeight: 'max-content',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          <div className="d-flex" style={{ marginTop: '20px' }}>
            <div className="rounded p-2" style={{ backgroundColor: '#f4f6f8' }}>
              <InputBase
                placeholder="Tìm kiếm"
                style={{ marginInline: '10px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              />
            </div>
            <div className="rounded p-2" style={{ marginLeft: '0.5rem', backgroundColor: '#f4f6f8' }}>
              <Select
                disableUnderline
                labelId="subject-status-select-label"
                label="Status"
                defaultValue={'none'}
                style={{ fontWeight: 700, color: '#808d99' }}
                onChange={(e, value) => {
                  setPage(0);
                  switch (value.props.value) {
                    case 'none':
                      setDataSubmit(data);
                      break;
                    case 'true':
                      setDataSubmit(data.filter((subject) => subject.status === true));
                      break;
                    case 'false':
                      setDataSubmit(data.filter((subject) => subject.status === false));
                      break;
                  }
                }}
              >
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="none">
                  Tất cả
                </MenuItem>
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="true">
                  Đang hoạt động
                </MenuItem>
                <MenuItem sx={{ fontWeight: 700, color: '#808d99' }} value="false">
                  Chưa hoạt động
                </MenuItem>
              </Select>
            </div>
          </div>
          <Table style={{ marginTop: '20px' }}>
            <TableHead style={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tên</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Mô tả</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Giá thấp nhất</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Ngày tạo</TableCell>
                {/* <TableCell>Staff ID</TableCell> */}
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Trạng thái</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                return (
                  <TableRow hover={true} key={index}>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      {index + (page * rowsPerPage, page * rowsPerPage) + 1}
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }} width="20%">
                      {s.name}
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }} width="28%">
                      {s.description}
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.minPrice?.toLocaleString()}</TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      {moment(s.createDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell width="11%">
                      {s.status ? (
                        <div
                          className="p-2 text-center"
                          style={{ backgroundColor: '#dbf6e5', color: '#2a9a68', borderRadius: 10, fontWeight: 700 }}
                        >
                          Đang hoạt động
                        </div>
                      ) : (
                        <div
                          className="p-2 text-center"
                          style={{ backgroundColor: '#ffe4de', color: '#c64843', borderRadius: 10, fontWeight: 700 }}
                        >
                          Chưa kích hoạt
                        </div>
                      )}{' '}
                    </TableCell>
                    <TableCell width="10%">
                      {/* <Link className="btn btn-outline-secondary" to={`/subjects/courseBySubject`}> */}
                      <div className="d-flex justify-content-center">
                        <Link
                          to={`/subject/${s.id}/course`}
                          title="Xem"
                          style={{ color: '#637381', border: 0 }}
                          className="btn m-1"
                        >
                          <VisibilityRoundedIcon />
                        </Link>

                        {/* <Button
                          variant="contained"
                          color="primary"
                          title="Chỉnh sửa"
                          onClick={() => handleEditSubject(s)}
                          className="m-1"
                        >
                          <EditRoundedIcon />
                        </Button> */}

                        <button
                          className="btn p-2"
                          style={{ padding: 0, border: 0, borderRadius: '50%', minWidth: '50', color: '#637381' }}
                          onClick={(e) => handleOpenPop(s, e)}
                        >
                          <MoreVertRoundedIcon />
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
                            {/* <MenuItem
                              onClick={() => handleViewSubject(subjectTmp.id)}
                              style={{ borderRadius: '10px', marginBottom: '5px' }}
                            >
                              <div style={{ color: '#212b36' }} className="d-flex p-1">
                                <VisibilityRoundedIcon />
                                <Typography className="mx-2" style={{ fontWeight: 600 }}>
                                  Xem
                                </Typography>
                              </div>
                            </MenuItem> */}

                            <MenuItem style={{ borderRadius: '10px' }} onClick={() => handleEditSubject(subjectTmp)}>
                              <div style={{ color: '#212b36' }} className="d-flex p-1">
                                <EditRoundedIcon />
                                <Typography className="mx-2" style={{ fontWeight: 600 }}>
                                  Sửa
                                </Typography>
                              </div>
                            </MenuItem>

                            {subjectTmp.status ? (
                              <MenuItem
                                color="red"
                                style={{ borderRadius: '10px' }}
                                onClick={() => {
                                  handleClosePop();
                                  const token = Cookies.get('token');
                                  if (token) {
                                    fetchData('/course/bySubjectId?subject-id=' + subjectTmp.id, token).then((resp) => {
                                      if (resp) {
                                        if (resp.length > 0) {
                                          Swal.fire(
                                            'Không đủ điều kiện vô hiệu hóa!',
                                            'Hiện tại đang có ' +
                                              resp.length +
                                              ' khóa học thuộc chủ đề này đang hoạt động.',
                                            'warning',
                                          );
                                        } else {
                                          Swal.fire({
                                            title: 'Bạn chắc rằng muốn vô hiệu hóa chủ đề này?',
                                            text: 'Sau khi vô hiệu hóa, chủ đề này sẽ không còn hoạt động nữa.',
                                            showCancelButton: true,
                                            confirmButtonText: 'Xác nhận',
                                            cancelButtonText: `Hủy`,
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              if (token) {
                                                postData(
                                                  '/subject/update-status',
                                                  {
                                                    subjectId: subjectTmp.id,
                                                    status: false,
                                                  },
                                                  token,
                                                )
                                                  .then((resp) => {
                                                    if (resp) {
                                                      Swal.fire(
                                                        'Đã vô hiệu hóa thành công!',
                                                        'Chủ đề ' + subjectTmp.name + ' đã được vô hiệu hóa.',
                                                        'success',
                                                      );
                                                      window.location.reload();
                                                    }
                                                  })
                                                  .catch((err) => {
                                                    console.log(err);
                                                  });
                                              }
                                            }
                                          });
                                        }
                                      }
                                    });
                                  }
                                }}
                              >
                                <div style={{ color: '#c25d5a' }} className="d-flex p-1">
                                  <DoDisturbOnRoundedIcon />
                                  <Typography className="mx-2" style={{ fontWeight: 600 }}>
                                    Vô hiệu hoá
                                  </Typography>
                                </div>
                              </MenuItem>
                            ) : (
                              <MenuItem
                                style={{ borderRadius: '10px' }}
                                onClick={() => {
                                  handleClosePop();
                                  const token = Cookies.get('token');
                                  Swal.fire({
                                    title: 'Bạn chắc rằng muốn kích hoạt chủ đề này?',
                                    text: 'Sau khi kích hoạt, chủ đề sẽ hoạt động ngay sau đó.',
                                    showCancelButton: true,
                                    confirmButtonText: 'Xác nhận',
                                    cancelButtonText: `Hủy`,
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      if (token) {
                                        postData(
                                          '/subject/update-status',
                                          {
                                            subjectId: subjectTmp.id,
                                            status: true,
                                          },
                                          token,
                                        )
                                          .then((resp) => {
                                            if (resp) {
                                              Swal.fire(
                                                'Đã vô kích hoạt thành công!',
                                                'Chủ đề ' + subjectTmp.name + ' đã được kích hoạt.',
                                                'success',
                                              );
                                              window.location.reload();
                                            }
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                          });
                                      }
                                    }
                                  });
                                }}
                              >
                                <div style={{ color: '#58af86' }} className="d-flex p-1">
                                  <CheckCircleRoundedIcon />
                                  <Typography className="mx-2" style={{ fontWeight: 600 }}>
                                    Kích hoạt
                                  </Typography>
                                </div>
                              </MenuItem>
                            )}
                          </div>
                        </Popover>
                      </div>
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
          <div className="p-1">
            <TablePagination
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={filterData.length}
              onPageChange={handleChangePage}
              labelRowsPerPage="Số hàng trên trang :"
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, { label: 'Tất cả', value: -1 }]}
            />
          </div>
        </Paper>

        <SubjectModal
          isOpen={isSubjectModalOpen}
          onSave={saveOrUpdateSubject}
          onUpdate={saveOrUpdateSubject}
          onClose={handleSubjectModalClose}
          subject={subjectToEdit !== null ? subjectToEdit : null}
        />
      </div>
    )
  );
}
