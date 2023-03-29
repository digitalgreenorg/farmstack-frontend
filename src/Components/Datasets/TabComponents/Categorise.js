import React, { useState } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import ControlledAccordion from '../../Accordion/Accordion'
import CheckBoxWithText from './CheckBoxWithText'

const Categorise = (props) => {
    const handleCheckBox = () => {

    }
    const [data, setData] = useState([
        {
            panel: 1,
            title: 'Rice',
            details: [
                <CheckBoxWithText text={"Brown Rice"} handleCheckBox={handleCheckBox} />,
                <CheckBoxWithText text={"White Rice"} handleCheckBox={handleCheckBox} />,
                <CheckBoxWithText text={"Samba Rice"} handleCheckBox={handleCheckBox} />,
                <CheckBoxWithText text={"Susi Rice"} handleCheckBox={handleCheckBox} />,
                <CheckBoxWithText text={"Jasmine Rice"} handleCheckBox={handleCheckBox} />
            ]
        },
        {
            panel: 2,
            title: 'Tomato',
            details: [<CheckBoxWithText text={"Brown Rice"} handleCheckBox={handleCheckBox} />]
        },
        {
            panel: 3,
            title: 'Wheat',
            details: [<CheckBoxWithText text={"Brown Rice"} handleCheckBox={handleCheckBox} />]
        }
    ])
    return (
        <div className='mt-20'>
            <Typography sx={{
                fontFamily: "Montserrat !important",
                fontWeight: "600",
                fontSize: "32px",
                lineHeight: "40px",
                color: "#000000",
                textAlign: 'left'
            }}>Categories</Typography>
            <div className='mt-30'>
                <ControlledAccordion data={data} customBorder={true} showDeleteIcon={true} customPadding={true} />
            </div>
            <Box className='d-flex mt-50'>
                <Box>
                    <Typography sx={{
                        fontFamily: "Montserrat !important",
                        fontWeight: "600",
                        fontSize: "32px",
                        lineHeight: "40px",
                        color: "#000000",
                        textAlign: 'left'
                    }}>Geography</Typography>
                    <FormControl fullWidth sx={{ width: '368px' }} className='mt-30' >
                        <InputLabel id='test-select-label'>Select Geography</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.geography}
                            onChange={props.setGeography}
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
                            label="Select Geography"
                            placeholder='Select Geography'
                        >
                            {props.menus?.map((menu) => (
                                <MenuItem value={menu}>{menu}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ marginLeft: '122px' }}>
                    <Typography sx={{
                        fontFamily: "Montserrat !important",
                        fontWeight: "600",
                        fontSize: "32px",
                        lineHeight: "40px",
                        color: "#000000",
                        textAlign: 'left'
                    }}>Value chain</Typography>
                    <FormControl fullWidth sx={{ width: '368px' }} className='mt-30' >
                        <InputLabel id='test-select-label'>Select value chain</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.valueChain}
                            onChange={props.setValueChain}
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
                            label="Select value chain"
                            placeholder='Select value chain'
                        >
                            {props.menus?.map((menu) => (
                                <MenuItem value={menu}>{menu}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </div>
    )
}

export default Categorise