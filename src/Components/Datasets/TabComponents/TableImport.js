import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'

const TableImport = (props) => {
    return (
        <Box>
            <Typography sx={{
                fontFamily: "Montserrat !important",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "19.42px",
                color: "#3D4A52",
                textAlign: 'left'
            }}>
                Connect to your {props.dbName} database and import tables to XLS files for your dataset. You can select the columns which you want to import. <span style={{ fontWeight: 600 }}>Please make sure that you are connecting to readonly {props.dbName} database.</span>
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat !important",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19.42px",
                    color: "#3D4A52",
                    textAlign: 'left'
                }}
            >
                Please refer <span style={{ textDecoration: 'underline', color: '#0038FF' }}>help</span> section to know how to connect to {props.dbName}.
            </Typography>
            <FormControl fullWidth className='mt-30'>
                <InputLabel>Select table</InputLabel>
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
                    label="Select table"
                    placeholder='Select table'
                >
                    {props.menus?.map((menu) => (
                        <MenuItem value={menu}>{menu}</MenuItem>
                    ))}

                </Select>
            </FormControl>
            <Typography sx={{
                fontFamily: "Montserrat !important",
                fontWeight: "600",
                fontSize: "20px",
                lineHeight: "24px",
                color: "#000000",
                textAlign: 'left',
                marginTop: '30px'
            }}>
                Enter the filename to which you
                want to import the data*
            </Typography>
            <Typography sx={{
                fontFamily: "Montserrat !important",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "19.42px",
                color: "#3D4A52",
                textAlign: 'left',
                marginTop: '10px'
            }}>
                All imports will be XLS file type. If the data being imported exceeds 50 MB then we will create multiple files post fixed with numbering.
                Example: filename_01.xls, filename_01.xls.
            </Typography>
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
                        {(props.fileName !== null && props.fileName !== undefined && props.fileName !== '') ? '' : 'Please select the table.'}
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
                placeholder='File name'
                value={props.fileName}
                onChange={(e) => props.setFileName(e.target.value)}
            />
            <Box sx={{ marginTop: '31px', textAlign: 'end' }}>
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
                    variant='outlined' onClick={() => props.handleImport()}>Import</Button>
            </Box>
        </Box>
    )
}

export default TableImport