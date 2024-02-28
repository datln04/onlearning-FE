import { useEffect, useState } from 'react';
import ViewConfig from './ViewConfig';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';

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
  Input,
  InputLabel,
  FormControl,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import moment from 'moment/moment';
import ConfigModal from './ConfigModal';
import { TablePagination } from '@mui/material';

export default function ListConfig() {
  const [data, setData] = useState([]);
  const [dataSubmit, setDataSubmit] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configToEdit, setConfigToEdit] = useState(null);
  const [isViewConfigModalOpen, setIsViewConfigModalOpen] = useState(false);
  const [latestConfig, setLatestConfig] = useState([]);
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/configs`,
      label: `Cài đặt cấu hình`,
    },
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData('/system-config/configs', token).then((resp) => {
          if (resp) {
            setData(resp);
            setDataSubmit(resp);
          }
        });
      } catch (error) {
        console.log(error);
      }
      try {
        fetchData('/system-config/get-last-config', token).then((resp) => {
          if (resp) {
            setLatestConfig(resp);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleAddConfig = () => {
    setConfigToEdit(null); // Clear any previous config data (for editing)
    setIsConfigModalOpen(true);
  };

  const handleViewConfig = (configData) => {
    console.log(configData);
    setConfigToEdit(configData); // Set the config data to edit
    setIsViewConfigModalOpen(true);
  };

  const handleConfigModalClose = () => {
    setIsConfigModalOpen(false);
  };

  const handleViewConfigModalClose = () => {
    setIsViewConfigModalOpen(false);
  };

  const saveOrUpdateConfig = async (configData) => {
    const token = Cookies.get('token');
    console.log('Config data to save or update:', configData);
    // If setIsConfigModalOpen has an "id", it means you are updating an existing config.
    // Implement your create logic here for new config.
    console.log('Config data to create:', configData);
    const body = {
      ...configData,
    };
    console.log('Config data to update:', await body);
    await postData('/system-config/save', body, token)
      .then((resp) => {
        if (resp) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setIsConfigModalOpen(false); // Close the ConfigModal
  };

  //search
  const filterData = dataSubmit.filter(
    (cconfig) =>
      cconfig.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      cconfig.version.toLowerCase().includes(searchValue.toLowerCase()),
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSubmit.length) : 0;
  return (
    data && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row mb-3">
          <div className="col-8">
            <h4 style={{ fontWeight: 'bold' }}>Cài đặt cấu hình</h4>
            <CustomBreadcrumbs items={breadcrumbItems} />
          </div>
          <div className="text-end col-4">
            <Button
              variant="outlined"
              style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
              onClick={handleAddConfig}
            >
              Cập nhật
            </Button>
          </div>
        </div>

        <Paper
          sx={{
            padding: '20px',
            borderRadius: '20px',
            marginBottom: '20px',
            maxHeight: 'max-content',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          <div className="row p-3">
            <div className="d-flex justify-content-center">
              <div className="row rounded p-2 mb-4">
                <h4 className="text-center" style={{ fontWeight: 'bold' }}>
                  Phiên bản {latestConfig?.version}
                </h4>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-center">
                <div className="row rounded p-2 mb-4" style={{ backgroundColor: '#f4f6f8', width: '100%' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, padding: 0, color: '#626263' }}>
                    Ngày cập nhật:
                  </Typography>
                  <FormControl variant="standard">
                    <Input
                      id="component-simple"
                      value={moment(latestConfig?.dateCreate).format('DD-MM-YYYY')}
                      readOnly
                      disableUnderline
                    />
                  </FormControl>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="row rounded p-2 mb-4" style={{ backgroundColor: '#f4f6f8', width: '100%' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, padding: 0, color: '#626263' }}>
                    Thời gian học mặc định:
                  </Typography>
                  <FormControl variant="standard">
                    <Input
                      id="component-simple"
                      value={latestConfig?.studyingTime + ' tháng'}
                      readOnly
                      disableUnderline
                    />
                  </FormControl>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="row rounded p-2" style={{ backgroundColor: '#f4f6f8', width: '100%' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, padding: 0, color: '#626263' }}>
                    Thời gian khoá bài kiểm tra:
                  </Typography>
                  <FormControl variant="standard">
                    <Input
                      id="component-simple"
                      value={latestConfig?.waitingQuizTime + ' phút'}
                      readOnly
                      disableUnderline
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="col-6 ">
              <div className="d-flex justify-content-center">
                <div className="row  rounded p-2 mb-4" style={{ backgroundColor: '#f4f6f8', width: '100%' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, padding: 0, color: '#626263' }}>
                    Phí hoa hồng:
                  </Typography>
                  <FormControl variant="standard">
                    <Input id="component-simple" value={latestConfig?.commissionFee + '%'} readOnly disableUnderline />
                  </FormControl>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="row rounded p-2 mb-4" style={{ backgroundColor: '#f4f6f8', width: '100%' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, padding: 0, color: '#626263' }}>
                    Phí xét duyệt khoá học:
                  </Typography>
                  <FormControl variant="standard">
                    <Input
                      id="component-simple"
                      value={latestConfig?.teacherCommissionFee + '%'}
                      readOnly
                      disableUnderline
                    />
                  </FormControl>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="row rounded p-2" style={{ backgroundColor: '#f4f6f8', width: '100%' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, padding: 0, color: '#626263' }}>
                    Thời gian cho phép hoàn tiền khoá học:
                  </Typography>
                  <FormControl variant="standard">
                    <Input
                      id="component-simple"
                      value={latestConfig?.refundedTime + ' ngày'}
                      readOnly
                      disableUnderline
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-3">
            <div className="d-flex justify-content-center">
              <div className="row rounded p-2 mb-4" style={{ backgroundColor: '#f4f6f8', width: '100%' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, padding: 0, color: '#626263' }}>
                  Mô tả cập nhật
                </Typography>
                <FormControl variant="standard">
                  {/* <InputLabel sx={{ fontWeight: 700 }}>Mô tả cập nhật </InputLabel> */}
                  <Input
                    id="component-simple"
                    multiline
                    minRows={4}
                    value={latestConfig?.description}
                    readOnly
                    disableUnderline
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </Paper>
        <h4 style={{ fontWeight: 'bold' }}>Lịch sử cấu hình</h4>
        <Paper
          sx={{
            padding: '20px',
            borderRadius: '20px',
            maxHeight: 'max-content',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
            <div className="rounded p-2" style={{ backgroundColor: '#f4f6f8' }}>
              <InputBase
                placeholder="Tìm kiếm"
                style={{ marginLeft: '10px' }}
                startAdornment={<Search />}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>
          </div>

          <Table style={{ marginTop: '20px' }}>
            <TableHead style={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Phiên bản</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Mô tả cập nhật</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Ngày tạo</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((c, index) => {
                return (
                  <TableRow hover={true} key={index}>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{c.version}</TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      <div style={{ overflow: 'auto', height: '35px', textOverflow: 'ellipsis' }}>
                        <p>{c.description}</p>{' '}
                      </div>
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                      {moment(c.dateCreate).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell>
                      <button
                        className="btn"
                        style={{ color: '#686f77', border: 0 }}
                        onClick={() => handleViewConfig(c)}
                      >
                        <VisibilityRoundedIcon />
                      </button>
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
            rowsPerPageOptions={[5, 10, 25, { label: 'Tất cả', value: -1 }]}
            component="div"
            count={filterData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Số hàng trên trang :"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <ConfigModal
          isOpen={isConfigModalOpen}
          onSave={saveOrUpdateConfig}
          onUpdate={saveOrUpdateConfig}
          onClose={handleConfigModalClose}
          config={latestConfig}
        />
        <ViewConfig
          isOpen={isViewConfigModalOpen}
          onSave={saveOrUpdateConfig}
          onUpdate={saveOrUpdateConfig}
          onClose={handleViewConfigModalClose}
          config={configToEdit !== null ? configToEdit : null}
        />
      </div>
    )
  );
}
