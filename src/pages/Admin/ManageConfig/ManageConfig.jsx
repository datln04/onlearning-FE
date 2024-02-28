import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
  TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import moment from 'moment/moment';
import ConfigModal from './ConfigModal';

export default function ListConfig() {
  const { configId } = useParams();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configToEdit, setConfigToEdit] = useState(null);
  const [config, setConfig] = useState(null);

  //   useEffect(() => {
  //     const token = Cookies.get('token');
  //     if (token) {
  //       try {
  //         fetchData('/subject/subjects', token).then((resp) => {
  //           if (resp) {
  //             setSubject(resp.find((s) => s.id == subjectId));
  //             setData(resp);
  //           }
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }, []);

  const handleAddConfig = () => {
    setConfigToEdit(null); // Clear any previous config data (for editing)
    setIsConfigModalOpen(true);
  };

  const handleEditConfig = (configData) => {
    console.log(configData);
    setConfigToEdit(configData); // Set the config data to edit
    setIsConfigModalOpen(true);
  };

  const handleConfigModalClose = () => {
    setIsConfigModalOpen(false);
  };

  const saveOrUpdateConfig = async (configData) => {
    // Here you should implement logic to either save a new config or update an existing one.
    // You may need to call an API or update your local data.
    // After saving or updating, you can close the ConfigModal.
    // For this example, we'll just log the config data.
    const token = Cookies.get('token');
    console.log('Config data to save or update:', configData);

    // If setIsConfigModalOpen has an "id", it means you are updating an existing config.
    if (configData.id) {
      // Implement your update logic here.
      console.log('Config data to update:', configData);

      const body = {
        ...configData,
        dateTime: moment(new Date()),
      };
      console.log('Config data to update:', await body);
      // await postData('##', body, token)
      //   .then(resp => {
      //     if (resp) {
      //       window.location.reload();
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    } else {
      // Implement your create logic here for new config.

      console.log('Config data to create:', configData);
      const body = {
        ...configData,
        dateTime: moment(new Date()),
      };
      console.log('Config data to update:', await body);
      // await postData('##', body, token)
      //   .then(resp => {
      //     if (resp) {
      //       window.location.reload();
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }

    setIsConfigModalOpen(false); // Close the ConfigModal
  };

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
    // Refilter the data when search input changes
    filterData(searchInput);
  };

  const filterData = (searchInput) => {
    // Filter data based on both status and search input
    const filteredData = data.filter((item) => {
      const searchMatch = searchInput === '' || item.name.toLowerCase().includes(searchInput.toLowerCase());
      return searchMatch;
    });

    setData(filteredData);
  };

  return (
    data && (
      <div className="m-5">
        <div style={{ margin: '20px' }}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="body1">Trang chủ {'>'} Quản lý cấu hình</Typography>

            <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
              <Typography variant="subtitle1">Lịch sử cấu hình</Typography>

              <InputBase
                placeholder="Tìm kiếm"
                style={{ marginLeft: '20px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              />
              <div className="text-end col-8">
                <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={handleAddConfig}>
                  Cập nhật
                </Button>
              </div>
            </div>

            <Table style={{ marginTop: '20px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Phiên bản</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((c, index) => {
                  return (
                    <TableRow hover={true} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{c.version}</TableCell>
                      <TableCell>{c.projectName}</TableCell>
                      <TableCell>{c.dateCreate}</TableCell>
                      <TableCell>
                        <Link className="btn btn-outline-secondary" to={`##`}>
                          Xem
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
        <ConfigModal
          isOpen={isConfigModalOpen}
          onSave={saveOrUpdateConfig}
          onUpdate={saveOrUpdateConfig}
          onClose={handleConfigModalClose}
          config={configToEdit !== null ? configToEdit : null}
        />
      </div>
    )
  );
}
