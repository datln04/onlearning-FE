import React, { useEffect, useState } from 'react';
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
  Select,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import { Search } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import FeedbackModal from './Feedback/FeedbackModal';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';
import CustomBreadcrumbs from '../../Breadcrumbs';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Evaluate = () => {
  const { courseId } = useParams();
  const [searchValue, setSearchValue] = useState('');
  // const [data, setData] = useState();
  const [evaluate, setEvaluate] = useState();
  const [totalRate, setTotalRate] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [rating, setRating] = useState(0);
  const [course, setCourse] = useState();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData(`/course/byId?id=${courseId}`, token).then((resp) => {
        if (resp) {
          setCourse(resp);
        }
      });
      fetchData(`/feedback/ByCourse?course_id=${courseId}`, token)
        .then((resp) => {
          if (resp) {
            setEvaluate(resp);
            setTotalRate(resp.length);
            const averageRating = calculateAverageRating(resp);
            setRating(averageRating);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function calculateAverageRating(data) {
    let sum = 0;
    let count = 0;

    for (const item of data) {
      for (const feedback of item.feedbackDetails) {
        if (feedback.rate !== undefined && feedback.type === 'radio') {
          sum += feedback.rate;
          count++;
        }
      }
    }

    const averageRating = count > 0 ? (sum / count).toFixed(2) : 0.0;
    return averageRating;
  }

  function calculateSingleAverageRating(feedbackDetails) {
    let sum = 0;
    let count = 0;

    for (const item of feedbackDetails) {
      if (item.rate !== undefined && item.type === 'radio') {
        sum += item.rate;
        count++;
      }
    }

    const averageRating = count > 0 ? (sum / count).toFixed(2) : 0.0;
    return averageRating;
  }

  const handleOpenModal = (feedback) => {
    feedback?.feedbackDetails.sort((a, b) => {
      if (a.type === 'text') return -1;
      if (b.type === 'radio') return 1;
      return 0;
    });
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
  };

  // Filter the evaluate array based on the search input value and username
  const filteredEvaluate =
    evaluate &&
    evaluate.filter((s) => s.enroll.student.account.username.toLowerCase().includes(searchValue.toLowerCase()));

  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/manage-course`,
      label: `Quản lý khóa học`,
    },
    {
      url: `/courses/` + courseId,
      label: `Khoá học: ${course?.name}`,
    },
    {
      url: `/courses/` + courseId + `/evaluate/`,
      label: 'Đánh giá',
    },
  ];

  return (
    evaluate && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row mb-3">
          <h4 style={{ fontWeight: 'bold' }}>Danh sách đánh giá</h4>
          <CustomBreadcrumbs items={breadcrumbItems} />
        </div>

        <Paper
          sx={{
            padding: '20px',
            borderRadius: '20px',
            maxHeight: 'max-content',
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          <div style={{ marginTop: '20px' }}>
            <TextField label="Tổng lượt đánh giá:" value={totalRate} />
            <TextField label="Độ uy tín trung bình:" style={{ marginLeft: '20px' }} value={rating} />
          </div>

          <div style={{ marginTop: '20px' }} className="d-flex">
            <div className="rounded p-2" style={{ backgroundColor: '#f4f6f8' }}>
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
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Tên học viên</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Điểm đánh giá</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Ngày Tạo</TableCell>
                <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvaluate &&
                filteredEvaluate.length > 0 &&
                filteredEvaluate.map((s, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        {s.enroll.student.account.username}
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                        {calculateSingleAverageRating(s?.feedbackDetails)} / 5
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{s.createDate}</TableCell>
                      <TableCell>
                        <Tooltip title="Chi tiết">
                          <button style={{ border: 'none', background: 'none' }} onClick={() => handleOpenModal(s)}>
                            <VisibilityIcon color="disabled" enableBackground={false} />
                          </button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {filteredEvaluate?.length == 0 && (
                <TableRow>
                  <TableCell className="text-center" colSpan={6}>
                    <h3 style={{ fontWeight: 700, color: 'grey' }}>Chưa có lượt đánh giá</h3>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>

        <FeedbackModal open={isModalOpen} onClose={handleCloseModal} data={selectedFeedback} />
      </div>
    )
  );
};

export default Evaluate;
