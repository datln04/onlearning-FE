import React, { Fragment } from 'react';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import { Col, Container, Row } from 'reactstrap';
import { YOUR_SERVICE_ID, YOUR_TEMPLATE_CONTACT_US_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID } from '../../util/Constants';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { Button, Typography } from '@mui/material';

export default function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Implement code to send mail
    // alert(formData.name + " - " + formData.email + " - aaa" + formData.message)
    const templateParams = {
      from_email: formData.email,
      from_name: formData.name,
      to_name: formData.name,
      to_email: formData.email,
      user_name: 'Onlearn',
      message: formData.message,
    };

    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_CONTACT_US_ID, templateParams, YOUR_USER_ID).then(
      (result) => {
        Swal.fire({
          title: 'Chúc mừng',
          text: 'Thông tin yêu cầu của bạn đã được gửi.',
          icon: 'success',
        }).then((result) => {
          navigate('/');
        });
      },
      (error) => {
        console.log('Gửi mail thất bại.', error.text);
      },
    );
  };

  return (
    <Fragment>
      <Header />
      < div
        className="mt-2 mr-3 ml-3 p-5 d-flex justify-content-between align-items-center "
        style={{ backgroundColor: '#5871fe', height: 200 }}
      >
        <div className="w-100">
          <Typography className="text-center" style={{ color: 'black', fontFamily: 'revert' }} variant="h4">
            <strong>Liên hệ</strong>
          </Typography>
        </div>
      </div>
      <Container>
        <hr className="t_border my-4 ml-0 text-left" />
        <Row className="mb-5 mt-3">
          <Col lg="8">{/* <h1 className="display-4 mb-4">Liên hệ chúng tôi</h1> */}</Col>
        </Row>
        <Row
          style={{
            padding: '20px',
            borderRadius: '20px',
            maxHeight: '700px',
            backgroundColor: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Onlearn</h3>
            <address>
              <strong>Email:</strong> onlearnservice@gmail.com
              <br />
              <br />
              <p>
                <strong>Phone:</strong> (555)123-4567
              </p>
            </address>
            Bắt đầu, chuyển đổi hoặc thăng tiến trong sự nghiệp của bạn với hơn 5.800 khóa học, nội dung chuyên môn và
            đẳng cấp từ các chuyên gia, trường đại học và công ty đẳng cấp thế giới.
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form className="contact__form w-100" onSubmit={handleSubmit}>
              <Row className="mb-2">
                <Col lg="6" className="form-group">
                  <label style={{ fontWeight: 600, color: 'grey' }}>Họ và tên</label>
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <label style={{ fontWeight: 600, color: 'grey' }}>Email</label>
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                  />
                </Col>
              </Row>
              <label style={{ fontWeight: 600, color: 'grey' }}>Nội dung</label>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <Button
                    variant="outlined"
                    style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
                    type="submit"
                  >
                    Xác nhận gửi
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
}
