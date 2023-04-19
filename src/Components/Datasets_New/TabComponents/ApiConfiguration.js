import React from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

const ApiConfiguration = (props) => {
    return (
        <Box>
            <Typography
                sx={{
                    fontFamily: "Montserrat !important",
                    fontWeight: "600",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#212B36",
                    textAlign: 'left'
                }}
            >Connection Name</Typography>
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
                        {(!props.validator && (!props.api !== null || !props.api !== undefined || !props.api !== '')) ? '' : 'Please enter the api is a mandatory field.'}
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
                placeholder='API'
                label='API'
                value={props.api}
                onChange={(e) => props.setApi(e.target.value)}
            />
            <FormControl fullWidth sx={{ marginTop: '30px' }}>
                <InputLabel>File name</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.authType}
                    onChange={(e) => props.setAuthType(e.target.value)}
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
                    {props.authTypes?.map((item) => {
                        return (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            {props.authType && props.authType !== 'no_auth' ?
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
                            {(!props.validator && (!props.authToken !== null || !props.authToken !== undefined || !props.authToken !== '')) ? '' : 'Please enter the auth token is a mandatory field.'}
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
                    placeholder='Auth token'
                    label='Auth token'
                    value={props.authToken}
                    onChange={(e) => props.setAuthToken(e.target.value)}
                />
                : <></>
            }

            <Box sx={{ marginTop: '31px', textAlign: 'end' }}>
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
                        marginLeft: '60px',
                        '&:hover': {
                            background: 'none',
                            border: "1px solid rgba(0, 171, 85, 0.48)"
                        }
                    }}
                    variant='outlined' onClick={() => props.handleConnect()}>Connect</Button>
            </Box>
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
                        {(!props.validator && (!props.exportFileName !== null || !props.exportFileName !== undefined || !props.exportFileName !== '')) ? '' : 'Please enter the export file name is a mandatory field.'}
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
                placeholder='Name of export file'
                label='Name of export file'
                value={props.exportFileName}
                onChange={(e) => props.setExportFileName(e.target.value)}
            />
            <Box sx={{ textAlign: 'end', marginTop: '31px' }}>
                <Button
                    sx={{
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        fontSize: '16px',
                        width: "44px",
                        height: "48px",
                        border: "none",
                        borderRadius: "8px",
                        color: "#00AB55",
                        textTransform: 'none',
                        '&:hover': {
                            background: 'none',
                            border: "none"
                        }
                    }}
                    variant='outlined' onClick={() => props.handleDisconnect()}>Disconnect</Button>
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
                        marginLeft: '60px',
                        '&:hover': {
                            background: 'none',
                            border: "1px solid rgba(0, 171, 85, 0.48)"
                        }
                    }}
                    variant='outlined' onClick={() => props.handleExport()}>Export to json</Button>
            </Box>
        </Box>
    )
}

export default ApiConfiguration