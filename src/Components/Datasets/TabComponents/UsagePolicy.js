import React, { useState } from 'react'
import { Box, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material'
import CheckBoxWithText from './CheckBoxWithText';

const UsagePolicy = (props) => {
    const [isPublicChecked, setIsPublicChecked] = useState('');
    const [isRegisteredCheched, setIsRegisteredCheched] = useState('');

    const handleClick = (event, type) => {
        if (type === 'public') {
            if (event.target.value === isPublicChecked) {
                setIsPublicChecked("");
            } else {
                setIsPublicChecked(event.target.value);
            }
        } else if (type === 'private') {
            if (event.target.value === isRegisteredCheched) {
                setIsRegisteredCheched("");
            } else {
                setIsRegisteredCheched(event.target.value);
            }
        }
    };

    const handleCheckBox = () => {

    }

    return (
        <div className='mt-20'>
            <Typography sx={{
                fontFamily: "Montserrat !important",
                fontWeight: "600",
                fontSize: "32px",
                lineHeight: "40px",
                color: "#000000",
                textAlign: 'left'
            }}>Usage policy</Typography>
            <Typography className='mt-50' sx={{
                fontFamily: "Montserrat !important",
                fontWeight: "600",
                fontSize: "20px",
                lineHeight: "24px",
                color: "#000000",
                textAlign: 'left'
            }}>Define who can access your datasets by selecting appropriate usage policy.</Typography>
            <Box className='mt-20 text-left ml-10'>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={isPublicChecked}
                    >
                        <FormControlLabel value={"publicChecked"}
                            control={
                                <Radio
                                    onClick={(e) => handleClick(e, 'public')}
                                    sx={{
                                        color: "#00AB55 !important",
                                        "&.Mui-checked": {
                                            color: "#00AB55 !important"
                                        }
                                    }} />
                            }
                            label={<Typography sx={{
                                fontFamily: "Open Sans !important",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "22px",
                                color: "#212B36",
                                textAlign: 'left'
                            }}>Anyone can download my dataset as it is freely available to public.</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
                <Box className='d-flex' sx={{ marginLeft: '52px' }} >
                    <img style={{ marginTop: '5px' }} src={require('../../../Assets/Img/info.svg')} />
                    <Typography className='mt-10' sx={{
                        fontFamily: "Montserrat !important",
                        fontWeight: "400",
                        fontSize: "12px",
                        lineHeight: "14.63px",
                        color: "#000000",
                        marginLeft: '9px'
                    }}>User does not have to be registered user in the network to download this dataset. You are allowing the user to download it without any restrictions.</Typography>
                </Box>
            </Box>
            <Divider className='mt-20' />
            <Box className='mt-20 text-left ml-10'>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={isRegisteredCheched}
                    >
                        <FormControlLabel value={"isRegisteredCheched"}
                            control={
                                <Radio
                                    onClick={(e) => handleClick(e, 'private')}
                                    sx={{
                                        color: "#00AB55 !important",
                                        "&.Mui-checked": {
                                            color: "#00AB55 !important"
                                        }
                                    }} />
                            }
                            label={<Typography sx={{
                                fontFamily: "Open Sans !important",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "22px",
                                color: "#212B36",
                                textAlign: 'left'
                            }}>Only Registered user can download my dataset as we need authenticate users to access data provided by us.</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
                <Box className='d-flex' sx={{ marginLeft: '52px' }} >
                    <img style={{ marginTop: '5px' }} src={require('../../../Assets/Img/info.svg')} />
                    <Typography className='mt-10' sx={{
                        fontFamily: "Montserrat !important",
                        fontWeight: "400",
                        fontSize: "12px",
                        lineHeight: "14.63px",
                        color: "#000000",
                        marginLeft: '9px'
                    }}>You can apply certain restrictions to the user so that dataset you are providing is accessed by valid users.</Typography>
                </Box>
                <Box sx={{ marginLeft: '52px' }}>
                    <CheckBoxWithText text={"Dataset can be accessed by the registered user."} handleCheckBox={handleCheckBox} isCustomFont={true} />
                </Box>
                <Box sx={{ marginLeft: '107px' }}>
                    <CheckBoxWithText text={"Dataset can be accessed by approval."} handleCheckBox={handleCheckBox} isCustomFont={true} />
                </Box>
                <Box sx={{ marginLeft: '143px' }}>
                    <CheckBoxWithText text={"Dataset can be accessed for certain time period."} handleCheckBox={handleCheckBox} isCustomFont={true} />
                </Box>
                <Box sx={{ marginLeft: '130px' }}>
                    <Typography className='mt-30' sx={{
                        fontFamily: "Montserrat !important",
                        fontWeight: "600",
                        fontSize: "20px",
                        lineHeight: "24px",
                        color: "#000000",
                        textAlign: 'left'
                    }}>Time period</Typography>
                    <FormControl fullWidth sx={{ width: '368px' }} className='mt-30' >
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
                    <Box className='d-flex mt-20'>
                        <img style={{ marginTop: '8px' }} src={require('../../../Assets/Img/info.svg')} />
                        <Typography className='mt-10' sx={{
                            fontFamily: "Montserrat !important",
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#212B36",
                            marginLeft: '9px'
                        }}>1 week - From the date of approval</Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default UsagePolicy