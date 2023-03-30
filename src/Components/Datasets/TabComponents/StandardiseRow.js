import React from 'react'
import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import CheckBoxWithText from './CheckBoxWithText'

const StandardiseRow = (props) => {

    const handleCheckBox = () => {

    }
    return (
        <div className='mt-50'>
            <Box className='d-flex justify-content-between align-items-center w-100 mb-20'>
                <Typography className='ml-16' sx={{
                    fontFamily: "Montserrat !important",
                    fontWeight: "400",
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#000000",
                    textAlign: 'left'
                }}>Name</Typography>
                <Box className='ml-173'>
                    <FormControl fullWidth sx={{ width: '368px' }}>
                        <InputLabel>Standardise name</InputLabel>
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
                            label="Standardise name"
                            placeholder='Standardise name'
                        >
                            {props.menus?.map((menu) => (
                                <MenuItem value={menu}>{menu}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box className='mr-120'>
                    <CheckBoxWithText text={'Mask'} handleCheckBox={handleCheckBox} />
                </Box>
            </Box>
            <Divider />
        </div>
    )
}

export default StandardiseRow