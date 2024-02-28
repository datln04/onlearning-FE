import React, { useState } from 'react';
import Logo from '../../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames';
import Styles from './Register.module.scss';
import Loading from '../../components/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../services/AppService';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeat: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    checkbox: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.checkbox === 'OK' &&
      formData.username !== '' &&
      formData.password !== '' &&
      formData.email !== '' &&
      formData.phone !== '' &&
      formData.firstName !== '' &&
      formData.lastName !== ''
    ) {
      const response = await postData('/auth/register', formData);
      if (response) {
        alert('Đăng ký thành công');
        navigate('/login');
      }
    } else {
      alert('Để tiếp tục, vui lòng đồng ý với Điều khoản sử dụng và Chính sách bảo mật của chúng tôi');
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className=" vh-100 ">
      <nav className="navbar navbar-light px-5 mb-5 pt-4">
        <div className="container-fluid p-0">
          <Link className="navbar-brand" to="/">
            <img src={Logo} style={{ height: 30 }} alt="" />
          </Link>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow-lg rounded-3 my-5">
              <div className="card-body p-4 p-sm-5 ">
                <h2 className="card-title text-center text-uppercase mb-5 fw-bold fs-5">Đăng ký tài khoản</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Tên"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Họ"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={classNames(Styles.ipt_custom, 'mb-3')}>
                    <input
                      type="text"
                      minlength="6"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Tên tài khoản"
                    />
                  </div>
                  <div className={classNames(Styles.ipt_custom, 'mb-3')}>
                    <input
                      type="password"
                      minlength="6"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Mật khẩu"
                    />
                  </div>
                  <div className={classNames(Styles.ipt_custom, 'mb-5')}>
                    <input
                      type="password"
                      minlength="6"
                      id="repeat"
                      name="repeat"
                      value={formData.repeat}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
                  <hr className="my-4" />
                  <div className={classNames(Styles.ipt_custom, 'mb-3')}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className={classNames(Styles.ipt_custom, 'mb-3')}>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Số điện thoại"
                    />
                  </div>
                  <input type="checkbox" id="checkbox" name="checkbox" value="OK" onClick={handleChange} />
                  <label style={{ marginLeft: 5 }}> Tiếp tục nghĩa là bạn đồng ý với </label>{' '}
                  <Link to="/term-of-use" style={{ color: 'black', textDecoration: 'underline' }}>
                    Điều khoản sử dụng
                  </Link>{' '}
                  và{' '}
                  <Link to="/privacy-policy" style={{ color: 'black', textDecoration: 'underline' }}>
                    Chính sách bảo mật
                  </Link>{' '}
                  của chúng tôi.
                  <div className="d-grid mt-3">
                    <button
                      className={classNames(Styles.btn_custom, 'btn text-uppercase fw-bold')}
                      type="submit"
                      disabled={formData.checkbox != 'OK'}
                    >
                      Đăng ký
                    </button>
                  </div>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-center">
                    <div className="form-check-label">
                      Bạn đã có tài khoản?{' '}
                      <Link to="/login" style={{ color: 'black' }}>
                        Đăng nhập
                      </Link>{' '}
                      ngay.
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
