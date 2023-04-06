import React from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import globalStyle from '../../Assets/CSS/global.module.css'
import ContainedButton from '../../Components/Button/ContainedButton'

const textFieldStyle = {
    width: '270px',
    height: '54px',
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
        }
    },
}

const selectStyle = {
    textAlign: 'left',
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#919EAB',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#919EAB',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#919EAB',
    },
    '.MuiSvgIcon-root': {
        fill: '#637381 !important'
    }
}

const SelectConnector = ({ organisationName, setOrganisationName, dataset, setDataset, datasets,
    file, setFile, files
}) => {

    const handleAddDataSets = () => {

    }
    return (
        <Box>
            <Typography className={`${globalStyle.bold600} ${globalStyle.size32}  ${globalStyle.dark_color} mt-50 text-left`} sx={{
                fontFamily: "Montserrat !important",
                lineHeight: "40px",
            }}>Select datasets for connector</Typography>
            <Box className='d-flex justify-content-between align-items-baseline mt-20'>
                <TextField
                    fullWidth
                    className='mt-20'
                    sx={textFieldStyle}
                    placeholder='Search organisation'
                    label='Search organisation'
                    value={organisationName}
                    onChange={(e) => setOrganisationName(e.target.value)}
                />
                <FormControl fullWidth sx={{ width: '368px', height: '56px' }}>
                    <InputLabel>Select dataset</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dataset}
                        onChange={(e) => setDataset(e.target.value)}
                        sx={selectStyle}
                        label="Select Dataset"
                        placeholder='Select Dataset'
                    >
                        {datasets?.map((item) => {
                            return (
                                <MenuItem key={item} value={item}>{item?.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ width: '270px', height: '56px' }}>
                    <InputLabel>Select file</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={file}
                        onChange={(e) => setFile(e.target.value)}
                        sx={selectStyle}
                        label="Select file"
                        placeholder='Select file'
                    >
                        {files?.map((item) => {
                            return (
                                <MenuItem key={item} value={item}>{item?.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <ContainedButton
                    text={"Add"}
                    fontWeight={"700"}
                    fontSize={"16px"}
                    width={"171px"}
                    height={"48px"}
                    handleClick={handleAddDataSets}
                />
            </Box>
        </Box>
    )
}

export default SelectConnector