import React, { useState, useEffect } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import ControlledAccordion from '../../Accordion/Accordion'
import CheckBoxWithText from './CheckBoxWithText'
import { getTokenLocal } from '../../../Utils/Common'
import HTTPService from '../../../Services/HTTPService'
import UrlConstant from '../../../Constants/UrlConstants'

const Categorise = (props) => {

    const [allCategories, setAllCategories] = useState([])
    const [tempCategoryJson, setTempCategoryJson] = useState({})
    const [geographies, setGeographies] = useState(
        [{ value: "India", label: "India" },
        { value: "Ethiopia", label: "Ethiopia" },
        { value: "Kenya", label: "Kenya" }]
    )

    const handleCheckBox = (keyName, value,) => {
        console.log(tempCategoryJson, "refData")
        console.log(keyName)
        console.log(value)
        // let tempCategories = { ...tempCategoryJson }
        // let tempJson = Object.keys(tempCategoryJson);
        // console.log(tempCategories)
        // console.log(tempJson)

        // if (tempJson.includes(keyName)) {
        //     if (tempCategories[keyName].includes(value)) {
        //         let index = tempCategories[keyName].indexOf(value)
        //         tempCategories[keyName].splice(index, 1);
        //     } else {
        //         tempCategories[keyName].push(value)
        //     }
        // } else {
        setTempCategoryJson(currentState => {
            return { ...currentState, [keyName]: [value] }
        })
        // }
    }
    console.log(tempCategoryJson)

    const getAllCategoryAndSubCategory = () => {
        let checkforAccess = getTokenLocal() ?? false;
        HTTPService(
            "GET",
            UrlConstant.base_url + UrlConstant.add_category_edit_category,
            "",
            true,
            true,
            checkforAccess
        ).then((response) => {
            let prepareArr = []
            for (const [key, value] of Object.entries(response.data)) {
                let obj = {}
                obj[key] = value
                prepareArr.push(obj)
            }
            let tempCategories = []
            prepareArr.forEach((item, index) => {
                let keys = Object.keys(item)
                let prepareCheckbox = item?.[keys[0]]?.map((res, ind) => {
                    return (<CheckBoxWithText key={ind} text={res} categoryKeyName={keys[0]} keyName={res} refData={tempCategoryJson} handleCheckBox={handleCheckBox} />)
                })
                let obj = {
                    panel: index + 1,
                    title: keys[0],
                    details: prepareCheckbox ? prepareCheckbox : []
                }
                tempCategories.push(obj)
            })
            setAllCategories(tempCategories)
        }).catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        getAllCategoryAndSubCategory()
    }, [])

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
                <ControlledAccordion data={allCategories} customBorder={true} showDeleteIcon={true} customPadding={true} />
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
                            onChange={(e) => props.setGeography(e.target.value)}
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
                            {geographies?.map((item) => (
                                <MenuItem key={item} value={item.value}>{item.label}</MenuItem>
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