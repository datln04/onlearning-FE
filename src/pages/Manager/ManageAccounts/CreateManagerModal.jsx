import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';
import moment from 'moment';
import Cookies from 'js-cookie';
import emailjs from 'emailjs-com';
import { YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID } from '../../../util/Constants';
import { postData } from '../../../services/AppService';
import Swal from 'sweetalert2';
const AccountModal = ({ isOpen, onClose }) => {
    const [account, setAccount] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: 'onlearn/123@123a',
        email: '',
        role: '',
        status: '',
    });
    const [length] = useState({
        username: 50,
        firstName: 50,
        lastName: 50,
        email: 50,
    })

    const [inputError] = useState({
        username: 'Không được để trống hoặc quá dài quá ' + length.username + ' ký tự!',
        firstName: 'Không được để trống hoặc quá dài quá ' + length.firstName + ' ký tự!',
        lastName: 'Không được để trống hoặc quá dài quá ' + length.lastName + ' ký tự!',
        email: 'Không được để trống hoặc quá dài quá ' + length.email + ' ký tự!',
    })

    const handleInputChange = (e, fieldName) => {
        const { value } = e.target;
        setAccount({ ...account, [fieldName]: value });
    }

    const invalidSubmit = () => {
        return (!account.username || account.username.length > length.username ||
            !account.firstName || account.firstName.length > length.firstName ||
            !account.lastName || account.lastName.length > length.lastName ||
            !account.email || account.email.length > length.email)
    }

    const handleSave = async () => {
        const token = Cookies.get('token');
        console.log('Account data to save:', account);
        const body = {
            ...account,
            dateTime: moment(new Date()),
        };
        await postData('/account/manager-account', body, token)
            .then((resp) => {
                if (resp) {
                    const templateParams = {
                        from_email: 'onlearn@gmail.com',
                        to_name: account.firstName,
                        to_email: account.email,
                        user_name: 'Onlearn',
                        message:
                            'Đây là thông tin tài khoản quản lý của bạn: \n Tài khoản: ' +
                            account.username +
                            ' \n Mật khẩu: ' +
                            account.password +
                            ' .',
                    };

                    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_USER_ID).then(
                        (result) => {
                            Swal.fire({
                                title: 'Chúc mừng',
                                text:
                                    'Thực hiện thành công tạo tài khoản ' +
                                    account.username +
                                    '\n Thông tin đã được gửi về địa chỉ email ' +
                                    account.email,
                                icon: 'success',
                            }).then(window.location.reload());
                        },
                        (error) => {
                            console.log('Gửi mail thất bại.', error.text);
                        },
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
        clearModal();
    };

    const clearModal = () => {
        setAccount({
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            email: '',
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <div className="d-flex justify-content-sm-between">
                <DialogTitle>{'Thêm mới tài khoản quản lý'}</DialogTitle>
                <div className="p-3">
                    <Typography variant="overline" display="block">
                        Ngày khởi tạo:  {moment(account.createDate).format('DD/MM/YYYY')}
                    </Typography>
                </div>
            </div>

            <DialogContent>

                <TextField
                    variant='filled'
                    fullWidth
                    label="Tài khoản"
                    autoFocus
                    margin="dense"
                    value={account.username}
                    onChange={(e) => handleInputChange(e, 'username')}
                    {
                    ...(!account.username || account.username.length >= length.username) && { helperText: inputError.username, error: false }
                    }
                />


                <TextField
                    variant='filled'
                    fullWidth
                    multiline
                    label="Tên"
                    autoFocus
                    margin="dense"
                    value={account.firstName}
                    onChange={(e) => handleInputChange(e, 'firstName')}
                    {
                    ...(!account.firstName || account.firstName.length >= length.firstName) && { helperText: inputError.firstName, error: false }
                    }
                />


                <TextField
                    variant='filled'
                    fullWidth
                    label="Họ"
                    autoFocus
                    margin="dense"
                    value={account.lastName}
                    onChange={(e) => handleInputChange(e, 'lastName')}
                    {
                    ...(!account.lastName || account.lastName.length >= length.lastName) && { helperText: inputError.lastName, error: false }
                    }
                />

                <TextField
                    variant='filled'
                    fullWidth
                    label="Email"
                    autoFocus
                    type="email"
                    margin="dense"
                    value={account.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    {
                    ...(!account.email || account.email.length >= length.email) && { helperText: inputError.email, error: false }
                    }
                />

                <TextField
                    fullWidth
                    label="Vai trò"
                    autoFocus
                    variant='filled'
                    margin="dense"
                    value={'Quản lý'}
                    disabled={true}
                />

            </DialogContent>
            <DialogActions>
                <div style={{ paddingRight: '1rem', paddingBottom: '1rem' }}>
                    <button onClick={onClose}
                        className='btn'
                    >
                        Hủy
                    </button>
                    <button
                        disabled={invalidSubmit()}
                        onClick={handleSave}
                        className="btn px-3"
                        style={{ backgroundColor: 'blue', color: 'white', borderRadius: 8, fontWeight: 700 }}>
                        Xác nhận
                    </button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default AccountModal;
