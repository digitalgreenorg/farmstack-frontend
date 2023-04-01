import React from 'react'
import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import CheckBoxWithText from './CheckBoxWithText'

const StandardiseRow = ({ keyName, index, datapointAttributes, setDatapointAttributes,
    datapointAttribute, setDatapointAttribute, datapointCategories, setDatapointCategories, datapointCategory, setDatapointCategory,
    standardiseNames, setStandardiseNames, standardiseName, setStandardiseName, handleMaskCheckBox, datapointCategoryChange, standardisedColum,
    setStandardisedColumn, maskedColumns
}) => {
    console.log(datapointCategories)
    console.log(datapointCategory)
    return (
        <div className='mt-50'>
            <Box className='d-flex justify-content-between align-items-center w-100 mb-20'>
                <Typography className='ml-16' sx={{
                    fontFamily: "Montserrat !important",
                    fontWeight: "400",
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#000000",
                    textAlign: 'left',
                    width: '100px'
                }}>{keyName}</Typography>
                <Box className=''>
                    <FormControl fullWidth sx={{ width: '273px' }}>
                        <InputLabel>Datapoint category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={datapointCategory?.[index]
                                ? datapointCategory?.[index] :
                                ""}
                            onChange={(e) => datapointCategoryChange(e.target.value, index)}
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
                            label="Datapoint category"
                            placeholder='Datapoint category'
                        >
                            {datapointCategories?.map((item) => (
                                <MenuItem key={item.datapoint_category} value={item}>
                                    {item.datapoint_category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box className=''>
                    <FormControl fullWidth sx={{ width: '273px' }}>
                        <InputLabel>Datapoint Attribute</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={standardisedColum?.[index] ? standardisedColum?.[index] : ""}
                            onChange={(e) => {
                                let tmpArr = [...standardisedColum];
                                tmpArr[index] = e.target.value;
                                setStandardisedColumn(tmpArr);
                            }}
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
                            label="Datapoint Attribute"
                            placeholder='Datapoint Attribute'
                        >
                            {datapointAttributes[index]?.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                {/* <Box className=''>
                    <FormControl fullWidth sx={{ width: '273px' }}>
                        <InputLabel>Standardise name</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={standardiseName}
                            onChange={(e) => setStandardiseName(e.target.value)}
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
                            {standardiseNames?.map((menu) => (
                                <MenuItem value={menu}>{menu}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box> */}
                <Box className='mr-16'>
                    <CheckBoxWithText text={'Mask'} checked={maskedColumns.includes(keyName)} keyName={keyName} handleCheckBox={handleMaskCheckBox} />
                </Box>
            </Box>
            <Divider />
        </div>
    )
}

export default StandardiseRow