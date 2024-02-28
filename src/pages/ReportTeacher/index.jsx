import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CourseControllerApi, ReportControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const reportApi = new ReportControllerApi(ApiClientSingleton.getInstance());
function ReportTeacher() {
  const user = JSON.parse(Cookies.get('user'));
  const [value, setValue] = useState('');
  const [course, setCourse] = useState();
  const { courseId } = useParams();

  useEffect(() => {
    courseApi.getCourseById(courseId, (error, res) => {
      setCourse(res);
    });
  }, [courseId]);

  const reportSuccess = () => {
    toast.success('Báo cáo thành công !', {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const reportError = (msg) => {
    toast.success(`Báo cáo thành công: ${msg}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <>
      <ToastContainer />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div>
          <ReactQuill style={{ height: '240px' }} theme="snow" value={value} onChange={setValue} />
        </div>
        <div>
          <Button
            variant="contained"
            size="medium"
            style={{ height: '36px', marginTop: '8px', minWidth: '110px' }}
            onClick={() => {
              reportApi.saveReport(
                {
                  content: value,
                  status: true,
                  teacherId: course?.teacher?.id,
                  studentId: user?.studentId,
                },
                (err, res) => {
                  if (res) {
                    reportSuccess();
                    setValue('');
                  } else {
                    reportError(err?.message);
                  }
                },
              );
            }}
          >
            <Typography style={{ fontWeight: 600 }} variant="button">
              Báo cáo
            </Typography>
          </Button>
        </div>
      </div>
    </>
  );
}

export default ReportTeacher;
