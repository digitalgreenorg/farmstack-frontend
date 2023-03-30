import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import './DataSetsView.css'
import ControlledAccordion from '../Components/Accordion/Accordion'
import File from '../Components/Datasets/TabComponents/File'
import FileTable from '../Components/Datasets/FileTable'

const DataSetsView = ({ }) => {
    const [categories, setCategories] = useState([
        {
            panel: 1,
            title: 'Rice',
            details: [
                "Brown Rice",
                "White Rice",
                "Samba Rice",
                "Susi Rice",
                "Jasmine Rice"
            ]
        },
        {
            panel: 2,
            title: 'Wheat',
            details: [
                "Brown Wheat",
                "White Wheat",
                "Samba Wheat",
                "Susi Wheat",
                "Jasmine Wheat"
            ]
        }
    ])
    const [files, setFiles] = useState([
        {
            panel: 1,
            title: 'Uploaded Files',
            details: []
        },
        {
            panel: 2,
            title: 'MySQL imports',
            details: []
        },
        {
            panel: 3,
            title: 'Postgres imports',
            details: []
        },
        {
            panel: 4,
            title: 'API imports',
            details: []
        }
    ])
    return (
        <Box>
            <Box sx={{ marginLeft: '144px', marginRight: '144px' }}>
                <div className='text-left mt-50'>
                    <span className='add_light_text'>Dataset</span>
                    <span className='add_light_text ml-16'>
                        <img src={require("../Assets/Img/dot.svg")} />
                    </span>
                    <span className='add_light_text ml-16'>My organisation dataset</span>
                </div>
                <div className='bold_title mt-50'>{"Authentication required"}</div>
                <div className='bold_title mt-50'>{"Dataset details"}</div>
                <Box className='d-flex mt-38'>
                    <Box sx={{ width: '638px' }}>
                        <Typography className='view_agriculture_heading text-left'>{"Agriculture practice video dissemination data"}</Typography>
                        <Typography className='view_datasets_light_text text-left mt-20'>Description</Typography>
                        <Typography className='view_datasets_bold_text text-left mt-3'>Chilli farmer producer group information is having details of the farmer members and their estimated yield information. Chilli farmer producer group information is having details of the farmer members and their estimated yield information.</Typography>
                    </Box>
                    <Box className='ml-134' >
                        <Box className='text-left'>
                            <Button
                                sx={{
                                    fontFamily: 'Public Sans !important',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    lineHeight: '26px',
                                    width: "153px",
                                    height: "48px",
                                    background: 'rgba(0, 184, 217, 0.16)',
                                    borderRadius: "6px",
                                    textTransform: 'none',
                                    color: '#006C9C',
                                    '&:hover': {
                                        background: 'rgba(0, 184, 217, 0.16)',
                                        color: '#006C9C',
                                    }
                                }}
                                variant='contained'
                            >Public dataset</Button>
                        </Box>
                        <Typography className='view_datasets_light_text text-left mt-20'>Data Capture Interval</Typography>
                        <Typography className='view_datasets_bold_text text-left mt-3'>{"02/03/2022 - Present"}</Typography>
                        <Typography className='view_datasets_light_text text-left mt-25'>Geography</Typography>
                        <Typography className='view_datasets_bold_text text-left mt-3'>{"Village name, District, Addis, Ethiopia"}</Typography>
                        <Typography className='view_datasets_light_text text-left mt-25'>Constantly updating </Typography>
                        <Typography className='view_datasets_bold_text text-left mt-3'>{"Yes"}</Typography>
                    </Box>
                </Box>
                <div className='bold_title mt-50'>{"Dataset category"}</div>
                <Box className='mt-20'>
                    <ControlledAccordion data={categories} />
                </Box>
                <div className='bold_title mt-50'>{"Dataset files"}</div>
                <Typography className='view_datasets_light_text text-left mt-20'><span className='view_datasets_bold_text'>Note: </span>This dataset is solely meant to be used as a source of information. Even through accuracy is the goal, the steward is not accountable for
                    the information. Please let the admin know if you have any information you think is inaccurate.
                </Typography>
                <Box className='mt-20'>
                    <ControlledAccordion data={files} />
                </Box>
                <Box className='mt-20'>
                    <Box className='d-flex'>
                        <File index={1} name={'DataSet.csv'} size={657489} showDeleteIcon={false} type={'file_upload'} />
                        <Box>
                            <Button
                                sx={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    width: "220px",
                                    height: "48px",
                                    border: "1px solid rgba(0, 171, 85, 0.48)",
                                    borderRadius: "8px",
                                    color: "#00AB55",
                                    textTransform: 'none',
                                    marginLeft: '100px',
                                    '&:hover': {
                                        background: 'none',
                                        border: "1px solid rgba(0, 171, 85, 0.48)"
                                    }
                                }}
                                variant='outlined'>Login to Download</Button>
                        </Box>
                    </Box>
                    <Box className='text-left ml-20 mt-20'>
                        <FileTable />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default DataSetsView