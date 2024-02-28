import React from "react";
import Logo from "../../assets/images/logo.png";
import Styles from "./Login.module.scss";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../services/AppService";
import Loading from "../../components/Loading/Loading";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true); // Set loading to true while waiting for the response

    try {
      const response = await postData('/auth/login', formData);

      if (response.token) {
        // Authentication successful
        console.log('Authentication successful!');
        // console.log(response);
        // Save the token to localStorage
        Cookies.set("token", response.token, { expires: 1 })
        // const addToken = await postData('')
        // Cookies.set('user', response)
        // Redirect to the desired route (e.g., home)
        navigate('/');
      } else {
        // Authentication failed, handle the error (e.g., show an error message)
        setErro('Sai tên đăng nhập hoặc tài khoản.')
        console.error('Authentication failed. Invalid email or password.');
      }
    } catch (error) {
      setErro('Sai tên đăng nhập hoặc tài khoản.')
      console.error('Error during authentication:', error.message);
    }
    // finally {
    //   setLoading(false); // Set loading to false after the response is received
    // }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="vh-100">
      <nav className="navbar navbar-light px-5 mb-5 pt-4">
        <div className="container-fluid">
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
                <h2 className="card-title text-center text-uppercase mb-5 fw-bold fs-5">Đăng nhập</h2>
                {erro == '' ? (<></>) : (<Alert className="mb-3" severity="error">{erro}</Alert>)}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Tên đăng nhập"
                      required
                    />
                  </div>
                  <div className={classNames(Styles.ipt_custom, 'mb-3')}>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Mật khẩu"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button className={classNames(Styles.btn_custom, ' text-uppercase fw-bold')} type="submit">
                      Đăng nhập
                    </button>
                  </div>
                </form>
                {/* 
                <hr className="my-3" />
                <div className="d-grid mb-2">
                  <button
                    className={classNames(Styles.btn_custom, Styles.btn_google, ' text-uppercase fw-bold')}
                    type="submit"
                  >
                    Tiếp tục với Google
                  </button>
                </div> */}
                <hr className="my-3" />
                <Link to="/forgot-password" className="mb-2 d-flex justify-content-center" style={{ color: 'black' }}>
                  Bạn quên mật khẩu?
                </Link>
                <div className="mb-2 d-flex justify-content-center">
                  <p className="form-check-label">
                    Bạn chưa có tài khoản đăng nhập?{' '}
                    <Link to="/register" style={{ color: 'black' }}>
                      Đăng ký
                    </Link>{' '}
                    ngay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;