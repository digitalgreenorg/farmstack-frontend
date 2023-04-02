import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import './DataSetsListView.css'
import { dateTimeFormat } from '../../Utils/Common'

const DataSetsListView = ({ datasets, history }) => {
    return (
        <div className='mt-50'>
            <Box className='d-flex justify-content-between mb-20'>
                <Typography className='datasets_list_view_title w-100 text-left ml-20'>DataSet name</Typography>
                <Typography className='datasets_list_view_title w-100 text-left ml-90'>Organisation</Typography>
                <Typography className='datasets_list_view_title w-100 text-left'>Category</Typography>
                <Typography className='datasets_list_view_title w-100 text-left'>Geography</Typography>
                <Typography className='datasets_list_view_title w-100 text-left'>Age of dataset</Typography>
                <Typography className='datasets_list_view_title w-100 text-center'>Published on</Typography>
            </Box>
            <Divider />
            {datasets?.map((item) => (
                <>
                    <Box className='d-flex justify-content-between mb-20 mt-20 cursor-pointer' onClick={() => history.push('/participant/new_datasets/view')}>
                        <Typography className='datasets_list_view_text green_text w-100 text-left ml-20'>{item?.name}</Typography>
                        <Typography className='datasets_list_view_text w-100 text-left ml-90'>{item?.organization?.name}</Typography>
                        <Typography className='datasets_list_view_text w-100 text-left'>{"Wheat"}</Typography>
                        <Typography className='datasets_list_view_text w-100 text-left'>{item?.geography}</Typography>
                        <Typography className='datasets_list_view_text w-100 text-left'>{item?.age_of_date ? item.age_of_date : 'NA'}</Typography>
                        <Typography className='datasets_list_view_text w-100 text-center'>{dateTimeFormat(item?.created_at, false)}</Typography>
                    </Box>
                    <Divider />
                </>
            ))}
        </div>
    )
}

export default DataSetsListView