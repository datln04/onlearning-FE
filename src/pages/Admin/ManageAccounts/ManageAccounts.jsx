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
import AccountModal from './AccountModal';

export default function ListAccount() {
  const { accountId } = useParams();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);
  const [account, setAccount] = useState(null);

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

  const handleAddAccount = () => {
    setAccountToEdit(null); // Clear any previous account data (for editing)
    setIsAccountModalOpen(true);
  };

  const handleEditAccount = (accountData) => {
    console.log(accountData);
    setAccountToEdit(accountData); // Set the account data to edit
    setIsAccountModalOpen(true);
  };

  const handleAccountModalClose = () => {
    setIsAccountModalOpen(false);
  };

  const saveOrUpdateAccount = async (accountData) => {
    // Here you should implement logic to either save a new account or update an existing one.
    // You may need to call an API or update your local data.
    // After saving or updating, you can close the AccountModal.
    // For this example, we'll just log the account data.
    const token = Cookies.get('token');
    console.log('Account data to save or update:', accountData);

    // If setIsAccountModalOpen has an "id", it means you are updating an existing account.
    if (accountData.id) {
      // Implement your update logic here.
      console.log('Account data to update:', accountData);

      const body = {
        ...accountData,
        dateTime: moment(new Date()),
      };
      console.log('Account data to update:', await body);
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
      // Implement your create logic here for new account.

      console.log('Account data to create:', accountData);
      const body = {
        ...accountData,
        dateTime: moment(new Date()),
      };
      console.log('Account data to update:', await body);
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

    setIsAccountModalOpen(false); // Close the AccountModal
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
            <Typography variant="body1">Trang chủ {'>'} Quản lý tài khoản</Typography>

            <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
              <Typography variant="subtitle1">Danh sách tài khoản</Typography>

              <InputBase
                placeholder="Tìm kiếm"
                style={{ marginLeft: '20px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              />
              <div className="text-end col-8">
                <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={handleAddAccount}>
                  Tạo mới
                </Button>
              </div>
            </div>

            <Table style={{ marginTop: '20px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên tài khoản</TableCell>
                  <TableCell>Họ và Tên</TableCell>
                  <TableCell>Vai trò</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Vai trò</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((a, index) => {
                  return (
                    <TableRow hover={true} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{a.username}</TableCell>
                      <TableCell>
                        {a.lastName} {a.firstName}
                      </TableCell>
                      <TableCell>{a.role}</TableCell>
                      <TableCell>{a.email}</TableCell>
                      <TableCell>{a.status}</TableCell>
                      <TableCell>
                        <Link className="btn btn-outline-secondary" to={`##`}>
                          Xem
                        </Link>
                        <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => handleEditAccount(a)}>
                          Chỉnh sửa
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
        <AccountModal
          isOpen={isAccountModalOpen}
          onSave={saveOrUpdateAccount}
          onUpdate={saveOrUpdateAccount}
          onClose={handleAccountModalClose}
          account={accountToEdit !== null ? accountToEdit : null}
        />
      </div>
    )
  );
}
