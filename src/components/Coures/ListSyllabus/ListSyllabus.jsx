import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import PDFTemplate from '../../../util/PDFTemplate';

const ListSyllabus = () => {
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1)
    };

    function downloadPdf() {
        const blob = new Blob([<PDFTemplate />], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'example.pdf';
        a.click();
    }

    return (
        <div className='container text-center'>
            <h2 className='my-4'>Danh sách khóa học</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="outlined" onClick={handleBackButton} style={{ marginBottom: '20px' }}>Quay lại</Button>
                <Button variant="outlined" onClick={downloadPdf} style={{ marginBottom: '20px' }}>Download Template</Button>
                {/* <Button variant="outlined" onClick={openModal} style={{ marginBottom: '20px' }}>Thêm Khóa Học</Button> */}
            </div>
        </div>
    )
}

export default ListSyllabus
