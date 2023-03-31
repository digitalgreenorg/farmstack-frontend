import React, { useState } from 'react'
import { Box, Button, Card, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import './DataSetsView.css'
import ControlledAccordion from '../Components/Accordion/Accordion'
import File from '../Components/Datasets/TabComponents/File'
import FileTable from '../Components/Datasets/FileTable'
import FileWithAction from '../Components/Datasets/FileWithAction'
import { useHistory } from 'react-router-dom'
import FooterNew from '../Components/Footer/FooterNew'

const DataSetsView = (props) => {
    const history = useHistory();
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
            details: [
                <Box>
                    <FileWithAction />
                    <Box className='text-left mt-20 w-100 overflow_x_scroll'>
                        <FileTable />
                    </Box>
                </Box>
            ]
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
            <Box sx={{ marginLeft: '144px', marginRight: '144px', marginBottom: '100px' }}>
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
                    <ControlledAccordion data={files} isTables={true} />
                </Box>
                <div className='bold_title mt-50'>{"Organisation Details"}</div>
                <Box>
                    <Card className='organisation_icon_card'>
                        <Box className='d-flex h-100 align-items-center'>
                            <img src={require('../Assets/Img/footer_logo.svg')} alt="footerLogo" />
                        </Box>
                    </Card>
                    <div className='d-flex mt-30'>
                        <div className='text-left w-313'>
                            <Typography className='view_datasets_light_text'>Organisation address</Typography>
                            <Typography className='view_datasets_bold_text'>Graduates Association Off,
                                Meskal Flower Rd Across Commercial,
                                Addis Ababa, Ethiopia.</Typography>
                        </div>
                        <div className='text-left ml-79'>
                            <Typography className='view_datasets_light_text'>Root user details</Typography>
                            <Typography className='view_datasets_bold_text'>Mohammed Husen</Typography>
                            <Typography className='view_datasets_bold_text'>mohammed.husen@ata.govt.et</Typography>
                        </div>
                        <div className='text-left ml-39'>
                            <Typography className='view_datasets_light_text'>Request details</Typography>
                            <Typography className='view_datasets_bold_text'>Ask to download your dataset.</Typography>
                        </div>
                    </div>
                    <div className='bold_title mt-50'>{"Period"}</div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <FormControl fullWidth sx={{ width: '466px' }} >
                                <InputLabel id='test-select-label'>Select period</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={props.period}
                                    onChange={props.setPeriod}
                                    sx={{
                                        textAlign: 'left',
                                        '&.MuiInputBase-root': {
                                            height: '56px'
                                        },
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#919EAB',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#919EAB',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#919EAB',
                                        }
                                    }}
                                    label="Select period"
                                    placeholder='Select period'
                                >
                                    {["1 week", "2 week", "3 week", "4 week"]?.map((menu) => (
                                        <MenuItem value={menu}>{menu}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <Button
                                sx={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    width: "171px",
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
                                variant='outlined'>Reject</Button>
                            <Button
                                sx={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    width: "171px",
                                    height: "48px",
                                    background: "#00AB55",
                                    borderRadius: "8px",
                                    textTransform: 'none',
                                    marginLeft: '30px',
                                    '&:hover': {
                                        backgroundColor: '#00AB55',
                                        color: '#fffff',
                                    }
                                }}
                                variant='contained'>Approve</Button>
                        </div>
                    </div>
                    <Divider className='mt-50' />
                    <div className='d-flex justify-content-end mt-50'>
                        <Button
                            sx={{
                                fontFamily: 'Montserrat',
                                fontWeight: 700,
                                fontSize: '16px',
                                width: "171px",
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
                            variant='outlined' onClick={() => history.push('/participant/new_datasets')} >Back</Button>
                    </div>
                </Box>
            </Box>
            <Divider />
            <FooterNew />
        </Box>
    )
}

export default DataSetsView