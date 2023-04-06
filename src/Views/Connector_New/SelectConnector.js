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

const SelectConnector = ({ organisations, organisationName, setOrganisationName, template, dataset, setDataset, datasets,
    file, setFile, files, handleChangeSelector, connectorName, connectorDescription, empty, setTemplate, completeData, setCompleteData
}) => {

    const handleAddConnector = () => {
        let arr = [...completeData]
        console.log("template", template, arr)
        arr.push(template)
        setCompleteData([...arr])
        setTemplate({ ...empty })
        console.log(arr, "ARR NEW")
    }
    return (
        <Box>
            <Typography className={`${globalStyle.bold600} ${globalStyle.size32}  ${globalStyle.dark_color} mt-50 text-left`} sx={{
                fontFamily: "Montserrat !important",
                lineHeight: "40px",
            }}>Select datasets for connector</Typography>
            <Box className='d-flex justify-content-between align-items-baseline mt-20'>
                <FormControl fullWidth sx={{ width: '270px', height: '54px' }}>
                    <InputLabel>Select organisation</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={template?.org_id}
                        onChange={(e) => {
                            setOrganisationName(e.target.value)
                            handleChangeSelector(e.target.value, 'org')
                        }}
                        sx={selectStyle}
                        label="Select Organisation"
                        placeholder='Select Organisation'
                    >
                        {organisations?.map((item) => {
                            return (
                                <MenuItem key={item?.id} value={item?.id}>{item?.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ width: '368px', height: '56px' }}>
                    <InputLabel>Select dataset</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={template?.dataset_id}
                        onChange={(e) => {
                            setDataset(e.target.value)
                            handleChangeSelector(e.target.value, 'dataset',)
                        }}
                        autoFocus={template?.dataset_list?.length > 0 ? true : false}
                        disabled={template?.dataset_list?.length > 0 ? false : true}
                        sx={selectStyle}
                        label="Select Dataset"
                        placeholder='Select Dataset'
                    >
                        {template?.dataset_list?.map((item, index) => {
                            return (
                                <MenuItem key={item?.id} value={item?.id}>{item?.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ width: '270px', height: '56px' }}>
                    <InputLabel>Select file</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={template?.file_name}
                        onChange={(e) => {
                            handleChangeSelector(e.target.value, 'file')
                        }}
                        autoFocus={template?.file_list?.length > 0 ? true : false}
                        disabled={template?.file_list?.length > 0 ? false : true}
                        sx={selectStyle}
                        label="Select file"
                        placeholder='Select file'
                    >
                        {template?.file_list?.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item?.file}>{item?.file_name}</MenuItem>
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
                    disabled={connectorName && connectorDescription && template?.availabeColumns?.length > 0 ? false : true}
                    handleClick={handleAddConnector}
                />
            </Box>
        </Box>
    )
}

export default SelectConnector