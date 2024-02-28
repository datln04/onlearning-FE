import React from 'react';
import { Container } from 'reactstrap';
import Styles from './Footer.module.scss';
import classNames from 'classnames';

const Footer = () => {
  return (
    <footer className={`${classNames(Styles.footer)} mt-5 mb-5`}>
      <Container>
        <div className="row">
          <div className="col-6">
            <h6 style={{ fontWeight: 700 }}>Sơ lược</h6>
            <p className="text-justify">
              OnLearn được phát triển dựa trên mục đích kết nối giảng viên và người học. <br /> Hệ thống hỗ trợ nhu cầu
              giảng dạy, học tập linh hoạt và trực tuyến. <br />
              Hệ thống được thực hiện bởi nhóm đồ án GFA23FE91
            </p>
          </div>

          <div class="col-3">
            <h6 style={{ fontWeight: 700 }}>Onlearn</h6>
            <ul className={classNames(Styles.footer_links)}>
              <li className="mb-1">
                <a className={classNames(Styles.inactiveLink)}>Về chúng tôi</a>
              </li>
              <li className="mb-1">
                <a className={classNames(Styles.inactiveLink)}>Liên hệ</a>
              </li>
              <li className="mb-1">
                <a className={classNames(Styles.inactiveLink)}>Các dự án</a>
              </li>
              <li className="mb-1">
                <a className={classNames(Styles.inactiveLink)}> Đóng góp</a>
              </li>
            </ul>
          </div>

          <div className="col-3">
            <h6 style={{ fontWeight: 700 }}>Liên hệ</h6>
            <ul className={classNames(Styles.footer_links)}>
              <li>
                <a className={classNames(Styles.inactiveLink)}>
                  Địa chỉ: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thủ Đức, Thành phố Hồ Chí Minh
                </a>
              </li>
              <li>
                <a className={classNames(Styles.inactiveLink)}>Điện thoại: 028 7300 5588</a>
              </li>
              <li>
                <a className={classNames(Styles.inactiveLink)}>Hotline: 0236 7300 999</a>
              </li>
              <li>
                <a className={classNames(Styles.inactiveLink)}>Email: onlearn-service@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">Copyright &copy; 2023 Bản quyền thuộc về Onlearn.</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
