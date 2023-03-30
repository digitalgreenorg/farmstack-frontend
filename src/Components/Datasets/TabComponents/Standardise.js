import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Standardise.css'
import EmptyFile from './EmptyFile'
import StandardiseRow from './StandardiseRow';

const detailsStyle = {
    "fontFamily": "'Montserrat' !important",
    "fontWeight": "400 !important",
    "fontSize": "16px !important",
    "lineHeight": "22px !important",
    "color": "#212B36 !important",
    "textAlign": "left",
    "marginBottom": "24px !important"
}

const accordionTitleStyle = {
    "fontFamily": "'Montserrat' !important",
    "fontWeight": "600 !important",
    "fontSize": "16px !important",
    "lineHeight": "24px !important",
    "color": "#212B36 !important"
}

const Standardise = (props) => {
    const [data, setData] = useState([
        {
            panel: 1,
            title: '1_Soil DataSet',
            details: [""]
        },
        {
            panel: 2,
            title: '1_Rice DataSet',
            details: [""]
        }
    ]);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className='mt-20'>
            <Typography sx={{
                fontFamily: "Montserrat !important",
                fontWeight: "600",
                fontSize: "32px",
                lineHeight: "40px",
                color: "#000000",
                textAlign: 'left'
            }}>Standardise</Typography>
            <Box className='text-left mt-30'>
                <FormControl fullWidth sx={{ width: '368px' }}>
                    <InputLabel>File name</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.tableName}
                        onChange={props.setTableName}
                        sx={{
                            textAlign: 'left',
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
                        label="File name"
                        placeholder='File name'
                    >
                        {props.menus?.map((menu) => (
                            <MenuItem value={menu}>{menu}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box className='mt-50'>
                    {data ? <></> : <EmptyFile />}
                </Box>
                <Box>
                    {
                        data?.map((acc) => (
                            <Accordion
                                sx={{
                                    boxShadow: expanded === acc.panel ? '0px 20px 40px -4px rgba(145, 158, 171, 0.16)' : '',
                                    borderRadius: expanded === acc.panel ? '8px' : '',
                                    border: (expanded === acc.panel) ? '1px solid #919EAB' : '',
                                }}
                                expanded={expanded === acc.panel} onChange={handleChange(acc.panel)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4bh-content"
                                    id="panel4bh-header"
                                    sx={{
                                        '&.MuiAccordionSummary-root': {
                                            borderBottom: expanded === acc.panel ? '1px solid #919EAB' : ''
                                        }
                                    }}
                                >
                                    <Box className='w-100 d-flex justify-content-between' >
                                        <Typography sx={accordionTitleStyle}>{acc.title}</Typography>
                                        <img className='mr-55' src={require('../../../Assets/Img/delete_gray.svg')} />
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box>
                                        <Box className='text-left mt-30 ml-16'>
                                            <FormControl fullWidth sx={{ width: '368px' }}>
                                                <InputLabel>Select template</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={props.tableName}
                                                    onChange={props.setTableName}
                                                    sx={{
                                                        textAlign: 'left',
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
                                                    label="Select template"
                                                    placeholder='Select template'
                                                >
                                                    {props.menus?.map((menu) => (
                                                        <MenuItem value={menu}>{menu}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <StandardiseRow />
                                        {acc?.details?.map((detail) => (
                                            <Box sx={detailsStyle}>
                                                {detail}
                                            </Box>
                                        ))}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </Box>
            </Box>
        </div>
    )
}

export default Standardise