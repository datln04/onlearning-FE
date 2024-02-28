import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Typography,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  Avatar,
} from '@mui/material';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';
import moment from 'moment/moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SourceIcon from '@mui/icons-material/Source';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import { CardContent, Divider } from '@mui/material';
import AccountDetailModal from '../ManageAccounts/AccountDetail';
import FeedbackIcon from '@mui/icons-material/Feedback';

export default function SyllabusByCourse() {
  const { courseId } = useParams();
  const { subjectId } = useParams();

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [numEnroll, setNumEnroll] = useState('');
  const [subjectData, setSubjectData] = useState({});
  const [courseData, setCourseData] = useState({});
  const [accountData, setAccountData] = useState(null);
  const [teacherData, setTeacherData] = useState({
    fullName: '',
    email: '',
    avatar: '',
    rating: '',
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData('/enroll/byCourseId?course_id=' + courseId, token).then((resp) => {
        setNumEnroll(resp.length);
        console.log(numEnroll);
      });
      fetchData('/subject/byId?subject-id=' + subjectId, token).then((resp) => {
        setSubjectData(resp);
      });
      fetchData('/course/byId?id=' + courseId, token).then((resp) => {
        if (resp) {
          setCourseData(resp);
          fetchData('/teacher/byId?teacher_id=' + resp.teacher.id, token).then((resp1) => {
            if (resp1) {
              setAccountData(resp1.account);
              setTeacherData({
                fullName: resp1.account.profile.lastName + ' ' + resp1.account.profile.firstName,
                email: resp1.account.profile.email,
                avatar: resp1.account.profile.avatar,
                rating: resp1.rating,
              });
            }
          });
          fetchData('/syllabus/byCourseId?course_id=' + resp.id, token).then((resp1) => {
            if (resp1) {
              setData(resp1);
            }
          });
        }
      });
    }
  }, [courseId]);

  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/subjects`,
      label: `Danh sách chủ đề`,
    },
    {
      url: `/subject/${subjectId}/course/`,
      label: `Chủ đề: ` + subjectData.name,
    },
    {
      url: `/subject/${subjectId}/course/${courseId}/syllabus`,
      label: 'Khóa học: ' + courseData.name,
    },
  ];

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterData = data.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
  const [isAccountDetailModalOpen, setIsAccountDetailModalOpen] = useState(false);

  const handleAccountDetailModalClose = () => {
    setIsAccountDetailModalOpen(false);
  };

  return (
    data && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <h4 style={{ fontWeight: 700 }}>Khoá học</h4>
        <CustomBreadcrumbs items={breadcrumbItems} />
        <div className="row">
          <Box
            sx={{
              padding: '20px',
              borderRadius: '20px',
              maxHeight: 'max-content',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
              backgroundColor: '#f4f6f8',
            }}
            className="col-4 mt-3"
          >
            <div className="row p-2">
              <div className="col-10">
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {courseData.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: 13, color: '#75797d' }}>
                  Chủ đề: {subjectData.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 13, color: '#75797d' }}>
                  Ngày tạo: {moment(courseData.createDate).format('DD-MM-YYYY')}
                </Typography>
              </div>
              <div className="col-2 text-end">
                <Link
                  to={`/subject/${subjectId}/course/${courseData?.id}/evaluate`}
                  title="Đánh giá"
                  aria-label="Đánh giá"
                  className="btn rounded-pill"
                  style={{ backgroundColor: '#ffffff', color: '#ffb41f', border: 0 }}
                >
                  <FeedbackIcon />
                </Link>
              </div>
            </div>

            <Paper
              sx={{
                padding: '20px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                minHeight: 100,
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: '10px 0',
              }}
            >
              <div className="p-2">
                <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                  Giảng viên :
                </Typography>
                <Button className="d-flex m-2 rounded" onClick={() => setIsAccountDetailModalOpen(true)}>
                  <Avatar alt={teacherData.fullName} src={teacherData.avatar} />
                  <div style={{ fontWeight: 700, color: '#515961' }} className="p-2">
                    {teacherData.fullName}{' '}
                  </div>
                </Button>
                <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                  Giá
                </Typography>
                <br />
                <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                  {courseData.price?.toLocaleString()} VNĐ
                </Typography>
              </div>
            </Paper>

            <Paper
              sx={{
                borderRadius: '20px',
                padding: '10px',
                maxHeight: 'max-content',
                minHeight: 100,
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: '10px 0',
              }}
            >
              <img style={{ borderRadius: '20px' }} width={'100%'} src={courseData.image} alt="" />
              <div className="p-2">
                <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                  Điểm qua môn
                </Typography>
                <br />
                <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                  {courseData.averagePoint}/10
                </Typography>
              </div>
            </Paper>

            <Paper
              sx={{
                padding: '20px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                minHeight: 100,
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: '10px 0',
              }}
            >
              <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                Mô tả
              </Typography>
              <br />
              <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                <div style={{ overflow: 'auto', height: 100 }}>{courseData.description}</div>
              </Typography>
            </Paper>

            <Paper
              sx={{
                padding: '20px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: '10px 0',
              }}
            >
              <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                Lượt đăng ký
              </Typography>
              <br />
              <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                {numEnroll}
              </Typography>
            </Paper>
          </Box>
          <div className="mt-3 col-8">
            <Paper
              sx={{
                padding: '20px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
              }}
            >
              <div className="d-flex justify-content-center mt-1">
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  Danh sách khung chương trình
                </Typography>
              </div>

              <div className="d-flex" style={{ margin: '20px 0' }}>
                <div className=" rounded p-1" style={{ backgroundColor: '#f4f6f8' }}>
                  <InputBase
                    placeholder="Tìm kiếm"
                    style={{ marginLeft: '20px' }}
                    startAdornment={<Search />}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <Table style={{ marginTop: '20px' }}>
                <TableHead style={{ backgroundColor: '#f4f6f8' }}>
                  <TableRow>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tên</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Ngày tạo</TableCell>
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Trạng thái</TableCell>
                    {/* <TableCell>Tài liệu</TableCell> */}
                    <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterData.map((s, index) => {
                    return (
                      <TableRow hover={true} key={index}>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.name}</TableCell>

                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                          {moment(s.createDate).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell width={'20%'} style={{ fontWeight: 600, color: '#686f77' }}>
                          {s.status === 'Active' ? (
                            <div
                              className="p-2 text-center"
                              style={{
                                backgroundColor: '#dbf6e5',
                                color: '#2a9a68',
                                borderRadius: 10,
                                fontWeight: 700,
                              }}
                            >
                              Đang hoạt động
                            </div>
                          ) : (
                            <div
                              className="p-2 text-center"
                              style={{
                                backgroundColor: '#ffe4de',
                                color: '#c64843',
                                borderRadius: 10,
                                fontWeight: 700,
                              }}
                            >
                              Không hoạt động
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/subject/${subjectId}/course/${courseId}/syllabus/preview/${s.id}`}
                            aria-label="Xem"
                            className="btn m-1"
                            style={{ color: '#637381', border: 0 }}
                          >
                            <VisibilityIcon />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
            <AccountDetailModal
              isOpen={isAccountDetailModalOpen}
              onClose={handleAccountDetailModalClose}
              account={accountData !== null ? accountData : null}
            />
          </div>
        </div>
      </div>
    )
  );
}
