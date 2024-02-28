import React, { useEffect, useState } from 'react';

import CourseTableComponent from '../CourseTableComponent/CourseTableComponent';
import {
  InputBase,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Typography,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  DialogActions,
} from '@mui/material';
import { fetchData, postData } from '../../../services/AppService';
import moment from 'moment';
import Cookies from 'js-cookie';
import Loading from '../../Loading/Loading';
import { Search } from '@material-ui/icons';
import PolicyRoundedIcon from '@mui/icons-material/PolicyRounded';
import {
  formatVND,
  isInRange,
  isInRangeDynamic,
  isInteger,
  validateInputDigits,
  validateInputString,
} from '../../../util/Utilities';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../../util/firebase';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID } from '../../../util/Constants';
import { Tab, Tabs, Paper } from '@mui/material';
import CustomBreadcrumbs from '../../Breadcrumbs';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

// import firebase from 'firebase/compat/app';

function CourseTabsComponent({ activeCourses, inactiveCourses, pendingCourses, draftCourses, rejectCourses, size }) {
  const [tabValue, setTabValue] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [subject, setSubject] = useState('');
  const [frameProgram, setframeProgram] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [passingScore, setPassingScore] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [isNewSubjectModalOpen, setNewSubjectModalOpen] = useState(false);
  const [isPolicyModalOpen, setPolicyModalOpen] = useState(false);
  const [subjectList, setSubjectList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [latestConfig, setLatestConfig] = useState([]);
  // const navigate = useNavigate()
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/manage-course`,
      label: `Quản lý khóa học`,
    },
  ];

  const handleNewSubjectModalOpen = () => {
    setNewSubjectModalOpen(true);
  };

  const handlePolicyModalOpen = () => {
    setPolicyModalOpen(true);
  };

  const handlePolicyModalClose = () => {
    setPolicyModalOpen(false);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData('/subject/subjects', token).then((resp) => {
          if (resp) {
            const availableSubject = resp.filter((s) => s.status === true);
            setSubjectList(availableSubject);
            setTabValue(2);
          }
        });
      } catch (error) {
        console.log(error);
      }
      fetchData('/system-config/get-last-config', token)
        .then((resp) => {
          if (resp) {
            setLatestConfig(resp);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleNewSubjectModalClose = () => {
    setNewSubjectModalOpen(false);
  };

  const handleCreateNewSubject = async (e) => {
    e.preventDefault();

    const token = Cookies.get('token');
    if (token) {
      fetchData(`/account/byRoleId?role_id=STAFF`, token).then((resp) => {
        if (resp) {
          const user = JSON.parse(Cookies.get('user'));
          resp.forEach((p) => {
            // console.log(p);
            // The object passed here should match your EmailJS template parameters
            const templateParams = {
              from_email: 'onlearn.fpt@gmail.com',
              to_email: p.profile.email,
              user_name: user.username,
              message: newSubjectName,
            };

            emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_USER_ID).then(
              (result) => {
                Swal.fire({
                  title: 'Chúc mừng',
                  text: 'Đề nghị của bạn đã được gửi đến Manager',
                  icon: 'success',
                });
              },
              (error) => {
                console.log('Failed to send email.', error.text);
              },
            );
          });
        }
      });
    }

    setNewSubjectModalOpen(false);
    setNewSubjectName('');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleCreateCourse = async () => {
    const user = JSON.parse(Cookies.get('user'));
    const token = Cookies.get('token');

    if (token && user) {
      try {
        let message = [];
        const isValidString = validateInputString(courseName, status, description, frameProgram);
        const isValidDigit = validateInputDigits(price, duration, passingScore);
        const findSubject = subjectList.find((s) => s.id == subject);
        if (!isInRange(passingScore)) {
          message.push('Chọn điểm trong thang điểm 10');
        }
        if (findSubject !== undefined) {
          if (parseInt(findSubject.minPrice) > parseInt(price)) {
            message.push(`Giá tiền phải lớn hơn  ${findSubject.minPrice}`);
          }
        } else {
          message.push('Chọn chủ đề trước!');
        }
        if (!isValidString || !isValidDigit) {
          message.push('Điền tất cả các trường và số phải lớn hơn 0');
        }

        if (!coverImage) {
          message.push('Chọn tệp ảnh đại diện');
        }
        if (!isInteger(duration)) {
          message.push('Thời gian học phải là số nguyên');
        }

        if (!isInRangeDynamic(0, 60, duration)) {
          message.push('Thời gian học từ 1-60 tháng');
        }

        if (!isInRangeDynamic(5, 500, courseName.length)) {
          message.push('Tên ít nhất 5 kí tự và nhiều nhất 500 kí tự');
        }

        if (message.length > 0) {
          Swal.fire({
            title: 'Cảnh báo',
            html: message.join('<br>'),
            icon: 'warning',
          });
          // handleModalClose()
          return;
        }
        setLoading(true);
        // Creating a reference to the file in Firebase Storage
        const storageRef = ref(storage, `/elearning/text/${coverImage.name}`);

        // Starting the upload task
        const uploadTask = uploadBytesResumable(storageRef, coverImage);

        await uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Calculating and updating the progress
            // const percent = Math.round(
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
            // setPercent(percent);
          },
          (err) => {
            console.log(err);
            // setLoading(false);
          },
          () => {
            // Getting the download URL after successful upload
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              const body = {
                id: 0,
                name: courseName,
                status: status,
                image: url,
                description: description,
                createDate: moment().toDate(),
                price: parseFloat(price),
                limitTime: parseFloat(duration),
                averagePoint: parseFloat(passingScore),
                teacherId: user.teacherId,
                subjectId: parseInt(subject),
              };
              postData('/course/save', body, token).then((resp) => {
                if (resp) {
                  if (frameProgram) {
                    const syllabusBody = {
                      name: frameProgram,
                      courseId: resp.id,
                      lessons: [],
                      status: 'Active',
                      id: 0,
                    };
                    postData('/syllabus/save', syllabusBody, token).then((resp) => {
                      if (resp) {
                        window.location.reload();
                      }
                    });
                  }
                }
              });
            });
          },
        );
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(coverImage)

    setModalOpen(false);
    setCourseName('');
    setSubject('');
    setPrice('');
    setDuration('');
    setPassingScore('');
    setDescription('');
    setCoverImage(null);
    setframeProgram('');
  };

  // Determine the course array based on the selected tab
  let selectedCourses;
  switch (tabValue) {
    case 0:
      selectedCourses = activeCourses;
      break;
    case 1:
      selectedCourses = inactiveCourses;
      break;
    case 2:
      selectedCourses = pendingCourses;
      break;
    case 3:
      selectedCourses = draftCourses;
      break;
    case 4:
      selectedCourses = rejectCourses;
      break;
    default:
      selectedCourses = activeCourses;
  }

  const handleApproveCourse = async (course) => {
    await Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Bạn sẽ không thể thay đổi nếu kiến nghị',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tôi đồng ý',
      cancelButtonText: 'Không đồng ý',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = Cookies.get('token');
        if (token) {
          setLoading(true);
          try {
            const lessons = await fetchData(`/lesson/byCourseId?course_id=${course.id}`, token);
            if (lessons && lessons.length > 0) {
              const notExistActiveLesson = lessons.filter((l) => l.status == 'true');
              if (notExistActiveLesson.length < 1) {
                Swal.fire({
                  title: 'Cảnh báo',
                  text: 'Không có bài học nào đang hoạt động, ít nhất 1 bài học phải hoạt động',
                  icon: 'warning',
                }).then(setLoading(false));
                return;
              }
            }

            const resp = await fetchData(`/auth/byRoleId?role_id=STAFF`, token);

            if (resp) {
              const idList = resp?.map((r) => r.id);
              const deviceTokenPromises = [];

              idList.forEach((id) => {
                const promise = fetchData(`/device/byAccountId?accountId=${id}`, token).then((response) => {
                  if (response) {
                    return response.map((item) => item.token);
                  }
                  return [];
                });

                deviceTokenPromises.push(promise);
              });

              // Wait for all promises to resolve
              const deviceTokensArray = await Promise.all(deviceTokenPromises);

              // Flatten the array of arrays into a single array
              const deviceTokens = [].concat(...deviceTokensArray);

              if (deviceTokens.length > 0) {
                const notificationBody = {
                  title: 'Kiến nghị',
                  message: 'Một khóa học đang chờ để xét duyệt',
                  token: deviceTokens,
                };

                const notificationResp = await postData('/notification/send-notification', notificationBody, token);

                if (notificationResp) {
                  const body = {
                    ...course,
                    teacherId: course.teacher.id,
                    subjectId: course.subject.id,
                    status: 'PENDING',
                  };

                  const courseResp = await postData('/course/save', body, token);

                  if (courseResp) {
                    window.location.reload();
                  }
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  };

  const handleDisableCourse = async (course) => {
    const token = Cookies.get('token');
    if (token) {
      Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: 'Bạn sẽ không thể thay đổi nếu bạn đồng ý',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Tôi đồng ý',
      }).then((result) => {
        if (result.isConfirmed) {
          // If the user clicks "Yes, complete it!"
          setLoading(true);
          try {
            const body = {
              ...course,
              teacherId: course.teacher.id,
              subjectId: course.subject.id,
              status: 'DEACTIVE',
            };

            const resp = postData('/course/save', body, token);

            if (resp) {
              window.location.reload();
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  };

  // Filter courses based on the search text
  const filteredCourses = selectedCourses.filter((course) =>
    course.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleShowReason = async (id) => {
    const token = Cookies.get('token');
    if (token) {
      await fetchData(`/reject-course/reject-courses?course_id=${id}`, token).then((resp) => {
        if (resp) {
          Swal.fire({
            title: 'Lý do',
            text: `${resp[resp.length - 1].reason}`,
            icon: 'question',
          });
        }
      });
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row mb-3">
          <div className="col-8">
            <h4 style={{ fontWeight: 'bold' }}>Danh sách khoá học</h4>
            <CustomBreadcrumbs items={breadcrumbItems} />
          </div>
          <div className="col-4 text-end">
            <Button
              variant="outlined"
              style={{ border: 0, backgroundColor: '#e0e0e0', color: '#212b36', fontWeight: 700 }}
              className="mx-2"
              onClick={handleNewSubjectModalOpen}
            >
              Kiến nghị chủ đề mới
            </Button>
            <Button
              variant="outlined"
              style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
              onClick={handleModalOpen}
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
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange} centered className="d-flex">
            <Tab label="Hoạt động" />
            <Tab label="Không hoạt động" />
            <Tab label="Chờ xét duyệt" />
            <Tab label="Đang soạn" />
            <Tab label="Khóa học bị từ chối" />
          </Tabs>

          <Divider />

          <div className="d-flex row" style={{ margin: '20px 0' }}>
            <div className=" col-11">
              <div className=" rounded p-1" style={{ backgroundColor: '#f4f6f8', width: '20%' }}>
                <InputBase
                  placeholder="Tìm kiếm..."
                  className="search-input"
                  startAdornment={<Search />}
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-1 text-end">
              <IconButton onClick={handlePolicyModalOpen}>
                <Tooltip title="Xem chính sách">
                  <PolicyRoundedIcon />
                </Tooltip>
              </IconButton>
            </div>
          </div>
          <CourseTableComponent
            courses={filteredCourses}
            onApprove={handleApproveCourse}
            onDisable={handleDisableCourse}
            onShowReason={handleShowReason}
          />

          {/* Modal for creating a new course */}
          <Modal open={isModalOpen} onClose={handleModalClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h5">Tạo khóa học</Typography>
              <div className="d-flex my-3">
                <FormControl fullWidth>
                  <InputLabel htmlFor="subject">Chủ đề</InputLabel>
                  <Select
                    id="subject"
                    value={subject}
                    label="Chủ đề"
                    onChange={(e) => setSubject(e.target.value)}
                    className=" mx-1"
                  >
                    {subjectList?.length > 0 &&
                      subjectList.map((s) => {
                        return (
                          <MenuItem key={s.id} value={s.id}>
                            {s.name} - {`Giá tối thiểu: ` + formatVND(s.minPrice)}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>

              <div className="mx-2">
                <label>{courseName?.length + `/` + 500}</label>
              </div>
              <div className="d-flex justify-content-between">
                <TextField
                  className="col-6 mx-1"
                  label="Tên khóa học"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  sx={{ my: 1 }}
                />
                <TextField
                  className="col-6 mx-1"
                  label="Giá ( VND )"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{ my: 1 }}
                  type="number"
                />
              </div>

              <div className="d-flex justify-content-between">
                <TextField
                  className="col-6 mx-1"
                  label="Thời gian ( tháng )"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  sx={{ my: 1 }}
                  type="number"
                />
                <TextField
                  className="col-6 mx-1"
                  label="Điểm qua môn ( 1 - 10 )"
                  value={passingScore}
                  onChange={(e) => setPassingScore(e.target.value)}
                  sx={{ my: 1 }}
                  type="number"
                />
              </div>

              <TextField
                fullWidth
                label="Mô tả"
                value={description}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Set a character limit, for example, 200 characters
                  if (inputValue.length <= 250) {
                    setDescription(inputValue);
                  }
                }}
                multiline
                minRows={4}
                sx={{ my: 1 }}
              />
              <div style={{ textAlign: 'right', color: description.length > 250 ? 'red' : 'inherit' }}>
                {description.length}/250
              </div>
              <Divider sx={{ my: 2 }} />
              <div className="d-flex">
                <label>Ảnh bìa: </label>
                <input
                  type="file"
                  accept=".png,.jpg"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  className="mx-4"
                />
              </div>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5">Chi tiết khóa học</Typography>

              <FormControl fullWidth sx={{ my: 1 }}>
                <div className="d-flex justify-content-between">
                  <InputLabel htmlFor="status">Trạng thái</InputLabel>
                  <Select
                    id="status"
                    value={status}
                    label="Trạng thái"
                    onChange={(e) => setStatus(e.target.value)}
                    className="col-6 mx-1"
                  >
                    {/* <MenuItem value="Active">Active</MenuItem> */}
                    <MenuItem value="DRAFT">Đang soạn</MenuItem>
                  </Select>
                  <TextField
                    className="col-6 mx-1"
                    label="Giáo trình"
                    value={frameProgram}
                    onChange={(e) => setframeProgram(e.target.value)}
                    placeholder="Nhập tên giáo trình"
                  />
                </div>
              </FormControl>

              <Divider sx={{ my: 2 }} />
              <button className="btn btn-success" color="primary" onClick={handleCreateCourse}>
                Tạo khóa học
              </button>
            </Box>
          </Modal>

          <Modal open={isNewSubjectModalOpen} onClose={handleNewSubjectModalClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h5">Kiến nghị chủ đề mới</Typography>
              <form onSubmit={handleCreateNewSubject}>
                <label className="my-1">Gửi kiến nghị chủ đề mới cho quản lý</label>
                <textarea
                  className="my-1 p-2"
                  rows={5}
                  cols={40}
                  fullWidth
                  label="Nội dung"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  sx={{ my: 1 }}
                />
              </form>

              <div className="d-flex justify-content-end">
                <button className="btn btn-outline-secondary" onClick={handleNewSubjectModalClose}>
                  Hủy
                </button>
                <button
                  disabled={newSubjectName == ''}
                  onClick={handleCreateNewSubject}
                  className="mx-2 btn btn-success"
                >
                  Gửi
                </button>
              </div>
            </Box>
          </Modal>

          <Dialog open={isPolicyModalOpen} onClose={handlePolicyModalClose}>
            <DialogTitle>Chính sách hệ thống</DialogTitle>
            <DialogContent style={{ overflow: 'auto' }}>
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
                        <Input
                          id="component-simple"
                          value={latestConfig?.commissionFee + '%'}
                          readOnly
                          disableUnderline
                        />
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
            </DialogContent>

            <DialogActions>
              <Button onClick={handlePolicyModalClose} color="primary">
                Thoát
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </div>
    </>
  );
}

export default CourseTabsComponent;
