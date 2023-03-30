import React from 'react'
import { Box } from '@mui/material'
import './FileTable.css'

const FileTable = () => {
    return (
        <Box className='b-1'>
            <Box className='d-flex justify-content-between file_table_column_bg'>
                <div className='file_table_column p-10 w-100'>ID</div>
                <div className='file_table_column b_left p-10 w-100'>State</div>
                <div className='file_table_column b_left p-10 w-100'>District</div>
                <div className='file_table_column b_left p-10 w-100'>Taluk</div>
                <div className='file_table_column b_left p-10 w-100'>Village</div>
                <div className='file_table_column  b_left p-10 w-100'>Development group</div>
                <div className='file_table_column b_left p-10 w-100'>Plot Information</div>
            </Box>
            <Box className='d-flex justify-content-between file_table_row_bg'>
                <div className='file_table_row p-10  w-100'>{"ID"}</div>
                <div className='file_table_row b_left p-10 w-100'>{"State"}</div>
                <div className='file_table_row b_left p-10 w-100'>{"District"}</div>
                <div className='file_table_row b_left p-10 w-100'>{"Taluk"}</div>
                <div className='file_table_row b_left p-10 w-100'>{"Village"}</div>
                <div className='file_table_row  b_left p-10 w-100'>{"Development group"}</div>
                <div className='file_table_row b_left p-10 w-100'>{"Plot Information"}</div>
            </Box>
        </Box>
    )
}

export default FileTable