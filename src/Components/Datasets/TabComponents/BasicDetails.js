import React, { useState } from 'react';
import { Box, Checkbox, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CheckBoxWithText from './CheckBoxWithText';

const BasicDetails = ({ dataSetName, setDataSetName, dataSetDescription, setDataSetDescription, fromDate, setFromDate, toDate, setToDate, isUpdating, setIsUpdating, validator }) => {

    const limitChar = 512;

    const handleDescription = (e) => {
        if (e.target.value.toString().length <= limitChar) {
            setDataSetDescription(e.target.value);
        }
    };

    const handleFromDate = (value) => {
        setFromDate(value);
    }

    const handleToDate = (value) => {
        setToDate(value);
    }

    const handleCheckBox = () => {
        setIsUpdating(!isUpdating)
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
            }}>Add new dataset</Typography>
            <TextField
                fullWidth
                helperText={
                    <Typography
                        sx={{
                            fontFamily: "Montserrat !important",
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "18px",
                            color: "#FF0000",
                            textAlign: 'left'
                        }}
                    >
                        {(validator && (dataSetName === null || dataSetName == undefined || dataSetName === '')) ? 'Please enter the dataset name is a mandatory field.' : ''}
                    </Typography>}
                sx={{
                    marginTop: '30px',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#919EAB'
                        },
                        '&:hover fieldset': {
                            borderColor: '#919EAB'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#919EAB'
                        },
                    }
                }}
                placeholder='Dataset name'
                label='Dataset name'
                value={dataSetName}
                onChange={(e) => setDataSetName(e.target.value)}
            />
            <TextField
                fullWidth
                multiline
                minRows={4}
                maxRows={4}
                sx={{
                    marginTop: '12px',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#919EAB'
                        },
                        '&:hover fieldset': {
                            borderColor: '#919EAB'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#919EAB'
                        },
                    }
                }}
                placeholder='Dataset description not more that 512 character '
                label='Dataset description not more that 512 character '
                value={dataSetDescription}
                onChange={(e) => handleDescription(e)}
            />
            <Typography sx={{
                fontFamily: "Montserrat !important",
                fontWeight: "600",
                fontSize: "32px",
                lineHeight: "40px",
                color: "#000000",
                textAlign: 'left',
                marginTop: '50px'
            }}>Data capture interval</Typography>
            <Box sx={{ display: 'flex', marginTop: '20px' }}>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            inputFormat="dd/MM/yyyy"
                            placeholder="Start Date"
                            label="Start Date"
                            value={fromDate}
                            onChange={(value) => handleFromDate(value)}
                            disabled={isUpdating}
                            PaperProps={{
                                sx: {
                                    borderRadius: '16px !important',
                                    "& .MuiPickersDay-root": {
                                        "&.Mui-selected": {
                                            backgroundColor: "#007B55 !important",
                                        },
                                    },
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="filled-basic"
                                    variant="outlined"
                                    sx={{
                                        width: '468px',
                                        svg: { color: '#00AB55' },
                                        "& .MuiInputBase-input": {
                                            height: "36px"
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#919EAB !important'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#919EAB'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#919EAB'
                                            },
                                        }
                                    }}
                                    helperText={
                                        <Typography
                                            sx={{
                                                fontFamily: "Montserrat !important",
                                                fontWeight: "400",
                                                fontSize: "12px",
                                                lineHeight: "18px",
                                                color: "#FF0000",
                                                textAlign: 'left'
                                            }}
                                        >
                                            {(!validator && (!fromDate !== null || !fromDate !== undefined || !fromDate !== '')) ? '' : 'Please enter the start date of the data capture interval.'}
                                        </Typography>
                                    }
                                />
                            )}
                        // error={props.dataCaptureStartErrorMessage ? true : false}
                        />
                    </LocalizationProvider>
                </div>

                <div style={{ marginLeft: '24px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            inputFormat="dd/MM/yyyy"
                            label="End Date"
                            value={toDate}
                            onChange={(value) => handleToDate(value)}
                            disabled={isUpdating}
                            PaperProps={{
                                sx: {
                                    borderRadius: '16px !important',
                                    "& .MuiPickersDay-root": {
                                        "&.Mui-selected": {
                                            backgroundColor: "#007B55 !important",
                                        },
                                    },
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="filled-basic"
                                    variant="outlined"
                                    sx={{
                                        width: '468px',
                                        svg: { color: '#00AB55' },
                                        "& .MuiInputBase-input": {
                                            height: "36px"
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#919EAB !important'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#919EAB'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#919EAB'
                                            },
                                        }
                                    }}
                                    helperText={
                                        <Typography
                                            sx={{
                                                fontFamily: "Montserrat !important",
                                                fontWeight: "400",
                                                fontSize: "12px",
                                                lineHeight: "18px",
                                                color: "#FF0000",
                                                textAlign: 'left'
                                            }}
                                        >
                                            {(!validator && (!toDate !== null || !toDate !== undefined || !toDate !== '')) ? '' : 'Please enter the end date of the data capture interval.'}
                                        </Typography>
                                    }
                                />
                            )}
                        // error={props.dataCaptureStartErrorMessage ? true : false}

                        />
                    </LocalizationProvider>
                </div>
            </Box>
            <CheckBoxWithText text={'Constantly updating'} handleCheckBox={handleCheckBox} />
        </div>
    )
}

export default BasicDetails