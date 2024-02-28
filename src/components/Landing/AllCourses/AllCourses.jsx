import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CourseCard from './CourseCard';
import Styles from './Courses.module.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { fetchData } from '../../../services/AppService';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CourseControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';
import Cookies from 'js-cookie';
import Loading from '../../Loading/Loading';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const AllCourses = () => {
  const userStr = Cookies.get('user');
  const [data, setData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [dataSubmit, setDataSubmit] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [subject, setSubject] = useState('');
  const [money, setMoney] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userStr) {
      const user = JSON.parse(userStr);
      courseApi.findAllCourseUnEnrolledByStudent(user?.studentId, 'ACTIVE', { value: searchValue }, (err, res) => {
        if (res) {
          const list = [];
          for (const obj of res) {
            fetchData('/feedback/rating-by-teacher?teacher_id=' + obj?.teacher?.id).then((resp) => {
              list.push({ ...obj, rating: resp.responseObject });
              setData(list);
              setDataSubmit(list);
            });
          }
        }
      });
    } else {
      fetchData('/course/by-status-active').then((resp) => {
        if (resp) {
          const list = [];
          for (const obj of resp) {
            fetchData('/feedback/rating-by-teacher?teacher_id=' + obj?.teacher?.id).then((resp) => {
              list.push({ ...obj, rating: resp.responseObject });
              setData(list);
              setDataSubmit(list);
            });
          }
        }
      });
    }
    fetchData('/subject/subjects').then((resp) => {
      setSubjectData(resp.filter((subject) => subject.status === true));
    });
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // Search
  const filterData = dataSubmit.filter(
    (course) =>
      course.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      course.subject.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      (course.teacher.account.profile.firstName + ' ' + course.teacher.account.profile.lastName)
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
  );

  // State to keep track of the current page and the number of rows per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="mt-5 d-flex justify-content-between align-items-center">
          <Container className="pt-5 pb-5">
            <Row>
              <div className="d-flex justify-content-between align-items-center" style={{ backgroundColor: 'white' }}>
                <div className={classNames(Styles.course__top)}>
                  <div className={classNames(Styles.course__top__left, 'w-100')}>
                    <div className="d-flex justify-content-center">
                      <Paper
                        component="form"
                        sx={{
                          p: 2,
                          ml: 7,
                          display: 'flex',
                          alignItems: 'center',
                          width: '81rem',
                        }}
                      >
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Bạn muốn tìm hiểu về nội dung gì?"
                          inputProps={{ 'aria-label': 'Bạn muốn tìm hiểu về nội dung gì?' }}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            setPage(0);
                          }}
                          startAdornment={<SearchIcon />}
                        />
                      </Paper>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <Col lg="12" className="mb-5">
                <div
                  className="d-flex justify-content-between align-items-center p-5"
                  style={{ backgroundColor: 'white' }}
                >
                  <div className={classNames(Styles.course__top)}>
                    <div className={classNames(Styles.course__top__left, 'w-100')}>
                      <div className="d-flex justify-content-center">
                        <Box className="border rounded mx-2" style={{ width: '40rem' }}>
                          <FormControl fullWidth>
                            <InputLabel id="subject-select-label">Chủ đề</InputLabel>
                            <Select
                              labelId="subject-select-label"
                              onChange={(e, value) => {
                                setSubject(value.props.value);
                                setPage(0);
                                if (
                                  money !== '0' &&
                                  money !== '' &&
                                  value.props.value !== 'None' &&
                                  value.props.value !== ''
                                ) {
                                  //chọn đủ các field
                                  switch (money) {
                                    case '0':
                                      setDataSubmit(data);
                                      break;
                                    case '1':
                                      setDataSubmit(
                                        data.filter(
                                          (course) =>
                                            course.price <= 1500000 && course.subject.name === value.props.value,
                                        ),
                                      );
                                      break;
                                    case '2':
                                      setDataSubmit(
                                        data.filter(
                                          (course) =>
                                            course.price >= 1500000 &&
                                            course.price <= 5000000 &&
                                            course.subject.name === value.props.value,
                                        ),
                                      );
                                      break;
                                    case '3':
                                      setDataSubmit(
                                        data.filter(
                                          (course) =>
                                            course.price >= 5000000 &&
                                            course.price <= 1000000 &&
                                            course.subject.name === value.props.value,
                                        ),
                                      );
                                      break;
                                    case '4':
                                      setDataSubmit(
                                        data.filter(
                                          (course) =>
                                            course.price >= 1000000 && course.subject.name === value.props.value,
                                        ),
                                      );
                                      break;
                                  }
                                } else {
                                  if (money !== '0' && money !== '') {
                                    //chỉ chọn tiền
                                    switch (money) {
                                      case '0':
                                        setDataSubmit(data);
                                        break;
                                      case '1':
                                        setDataSubmit(data.filter((course) => course.price <= 1500000));
                                        break;
                                      case '2':
                                        setDataSubmit(
                                          data.filter((course) => course.price >= 1500000 && course.price <= 5000000),
                                        );
                                        break;
                                      case '3':
                                        setDataSubmit(
                                          data.filter((course) => course.price >= 5000000 && course.price <= 10000000),
                                        );
                                        break;
                                      case '4':
                                        setDataSubmit(data.filter((course) => course.price >= 10000000));
                                        break;
                                    }
                                  } else {
                                    if (value.props.value !== 'None' && value.props.value !== '') {
                                      //chỉ chọn môn học
                                      setDataSubmit(data.filter((course) => course.subject.name === value.props.value));
                                    } else {
                                      //không chọn gì
                                      setDataSubmit(data);
                                    }
                                  }
                                }
                              }}
                              label="Môn học"
                            >
                              <MenuItem value="None">Tất cả</MenuItem>
                              {subjectData?.map((subject) =>
                                subject.status === true ? (
                                  <MenuItem value={subject.name}>{subject.name}</MenuItem>
                                ) : (
                                  <></>
                                ),
                              )}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box className="border rounded mx-2" style={{ width: '40rem' }}>
                          <FormControl fullWidth>
                            <InputLabel id="subject-select-label">Giá tiền</InputLabel>
                            <Select
                              labelId="subject-select-label"
                              onChange={(e, value) => {
                                setMoney(value.props.value);
                                setPage(0);
                                if (
                                  value.props.value !== '0' &&
                                  value.props.value !== '' &&
                                  subject !== 'None' &&
                                  subject !== ''
                                ) {
                                  //chọn đủ các field
                                  switch (value.props.value) {
                                    case '0':
                                      setDataSubmit(data);
                                      break;
                                    case '1':
                                      setDataSubmit(
                                        data.filter(
                                          (course) => course.price <= 1500000 && course.subject.name === subject,
                                        ),
                                      );
                                      break;
                                    case '2':
                                      setDataSubmit(
                                        data.filter(
                                          (course) =>
                                            course.price >= 1500000 &&
                                            course.price <= 5000000 &&
                                            course.subject.name === subject,
                                        ),
                                      );
                                      break;
                                    case '3':
                                      setDataSubmit(
                                        data.filter(
                                          (course) =>
                                            course.price >= 5000000 &&
                                            course.price <= 1000000 &&
                                            course.subject.name === subject,
                                        ),
                                      );
                                      break;
                                    case '4':
                                      setDataSubmit(
                                        data.filter(
                                          (course) => course.price >= 1000000 && course.subject.name === subject,
                                        ),
                                      );
                                      break;
                                  }
                                } else {
                                  if (value.props.value !== '0' && value.props.value !== '') {
                                    //chỉ chọn tiền
                                    switch (value.props.value) {
                                      case '0':
                                        setDataSubmit(data);
                                        break;
                                      case '1':
                                        setDataSubmit(data.filter((course) => course.price <= 1500000));
                                        break;
                                      case '2':
                                        setDataSubmit(
                                          data.filter((course) => course.price >= 1500000 && course.price <= 5000000),
                                        );
                                        break;
                                      case '3':
                                        setDataSubmit(
                                          data.filter((course) => course.price >= 5000000 && course.price <= 10000000),
                                        );
                                        break;
                                      case '4':
                                        setDataSubmit(data.filter((course) => course.price >= 10000000));
                                        break;
                                    }
                                  } else {
                                    if (subject !== 'None' && subject !== '') {
                                      //chỉ chọn môn học
                                      setDataSubmit(data.filter((course) => course.subject.name === subject));
                                    } else {
                                      //không chọn gì
                                      setDataSubmit(data);
                                    }
                                  }
                                }
                              }}
                              label="Giá tiền"
                            >
                              <MenuItem value="0">Tất cả</MenuItem>
                              <MenuItem value="1">0 - 1,500,000 VNĐ</MenuItem>
                              <MenuItem value="2">1,500,000 VNĐ - 5,000,000 VNĐ</MenuItem>
                              <MenuItem value="3">5,000,000 VNĐ - 10,000,000 VNĐ</MenuItem>
                              <MenuItem value="4">10,000,000 VNĐ - Không giới hạn</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Divider style={{ color: 'black', height: 2 }} />
              {filterData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <>
                  <Col key={item.id} lg="4" md="6" sm="6">
                    <CourseCard item={item} />
                  </Col>
                </>
              ))}
            </Row>

            <div className="mt-5 p-2">
              <div className="w-100 d-flex justify-content-center">
                <Stack spacing={2}>
                  <Pagination
                    onChange={(e, value) => setPage(value - 1)}
                    count={Math.ceil(filterData.length / rowsPerPage)}
                    page={page + 1}
                    size="large"
                  />
                </Stack>
                {/* <Box className="border rounded mx-2" style={{ width: 60 }}>
              <FormControl fullWidth>
                <Select
                  labelId="rows-per-page"
                  value={rowsPerPage}
                  label="RowsPerPage"
                  onChange={(e, value) => setRowsPerPage(value.props.value)}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default AllCourses;
