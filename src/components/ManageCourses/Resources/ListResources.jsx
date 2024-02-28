import {
  Button,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TextTruncate from '../../../util/Text-Truncate/TextTruncate';
import { Search } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import ResourceModal from './ResourceModal';
import CustomBreadcrumbs from '../../Breadcrumbs';

const ListResources = () => {
  const { courseId, syllabusId, lessonId } = useParams();
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [course, setCourse] = useState();
  const [syllabus, setSyllabus] = useState();
  const [lesson, setLesson] = useState();

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
    // Refilter the data when search input changes
    filterData(searchInput);
  };

  const filterData = (searchInput) => {
    // Filter data based on both status and search input
    const filteredData = data.filter((item) => {
      const searchMatch = searchInput === '' || item.content.toLowerCase().includes(searchInput.toLowerCase());
      return searchMatch;
    });

    setSearchData(filteredData);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData(`/course/byId?id=${courseId}`, token).then((resp) => {
        if (resp) {
          setCourse(resp);
        }
      });
      fetchData(`/syllabus/byId?id=${syllabusId}`, token).then((resp) => {
        if (resp) {
          setSyllabus(resp);
        }
      });
      fetchData(`/lesson/byId?id=${lessonId}`, token).then((resp) => {
        if (resp) {
          setLesson(resp);
        }
      });
      fetchData(`/resource/by-lesson?lesson_id=${lessonId}`, token).then((resp) => {
        if (resp) {
          setData(resp);
        }
      });
    }
  }, []);

  const handleAddResource = async (name, url) => {
    const token = Cookies.get('token');
    if (token) {
      const body = { name: name, content: url, resourceType: 'file', lessonId: lessonId };
      await postData(`/resource/save`, body, token).then((resp) => {
        if (resp) {
          window.location.reload();
        }
      });
    }
  };

  // State to keep track of the current page and the number of rows per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Change the number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = searchData
    ? page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - searchData?.length)
      : 0
    : page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - data?.length)
    : 0;

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
      url: `/courses/` + courseId + `/syllabus/` + syllabusId,
      label: `Giáo trình: ${syllabus?.name}`,
    },
    {
      url: `/courses/` + courseId + `/syllabus/` + syllabusId + `/lessons/` + lessonId,
      label: 'Tài nguyên',
    },
  ];

  return (
    <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
      <div className="row mb-3">
        <div className="col-8">
          <h4 style={{ fontWeight: 'bold' }}>Danh sách tài nguyên</h4>
          <CustomBreadcrumbs items={breadcrumbItems} />
        </div>
        <div className="text-end col-4">
          {course?.status !== 'ACTIVE' && course?.status !== 'PENDING' && (
            <Button
              variant="outlined"
              style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }}
              onClick={() => setIsResourceModalOpen(true)}
            >
              Tạo mới
            </Button>
          )}
        </div>
      </div>

      <Paper
        sx={{
          padding: '20px',
          borderRadius: '20px',
          maxHeight: 'max-content',
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
        }}
      >
        <div style={{ marginTop: '20px' }} className="d-flex">
          <div className="rounded p-2" style={{ backgroundColor: '#f4f6f8' }}>
            <InputBase
              placeholder="Tìm kiếm"
              style={{ marginInline: '10px' }}
              startAdornment={<Search />}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <Table style={{ marginTop: '20px' }}>
          <TableHead style={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell style={{ color: '#808d99', fontWeight: 700 }}>#</TableCell>
              <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Nội dung</TableCell>
              <TableCell style={{ color: '#808d99', fontWeight: 700 }}>Loại tài nguyên</TableCell>
              <TableCell style={{ color: '#808d99', fontWeight: 700 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchData
              ? searchData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((l, index) => {
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {l.content.startsWith('https') ? (
                            <a href={l.content} target="_blank" rel="noopener noreferrer">
                              <TextTruncate text={l.name} />
                            </a>
                          ) : (
                            <TextTruncate text={l.name} />
                          )}
                        </TableCell>

                        <TableCell>
                          <TextTruncate text={l.resourceType} />
                        </TableCell>
                      </TableRow>
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </>
                  );
                })
              : data &&
                data?.length > 0 &&
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((l, index) => {
                  return (
                    <>
                      <TableRow hover={true} key={index}>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>{index + 1}</TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                          {l.content.startsWith('https') ? (
                            <a href={l.content} target="_blank" rel="noopener noreferrer">
                              <TextTruncate text={l.name} />
                            </a>
                          ) : (
                            <TextTruncate text={l.name} />
                          )}
                        </TableCell>

                        <TableCell style={{ fontWeight: 600, color: '#686f77' }}>
                          <TextTruncate text={l.resourceType} />
                        </TableCell>
                      </TableRow>

                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </>
                  );
                })}
            {searchData
              ? searchData.length == 0
              : data?.length == 0 && (
                  <TableRow>
                    <TableCell className="text-center" colSpan={6}>
                      <h3 style={{ fontWeight: 700, color: 'grey' }}>Chưa có tài nguyên</h3>
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
        {/* {data && searchData && ( */}
        <TablePagination
          labelRowsPerPage="Số hàng trên trang :"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={searchData ? searchData.length : data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* )} */}
        <ResourceModal
          isOpen={isResourceModalOpen}
          onClose={() => setIsResourceModalOpen(false)}
          onSave={handleAddResource}
        />
      </Paper>
    </div>
  );
};

export default ListResources;
