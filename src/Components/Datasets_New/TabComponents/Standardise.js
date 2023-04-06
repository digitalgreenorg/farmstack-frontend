import React, { useState, useEffect } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Standardise.css'
import EmptyFile from './EmptyFile'
import StandardiseRow from './StandardiseRow';
import UrlConstant from '../../../Constants/UrlConstants';
import HTTPService from '../../../Services/HTTPService';
import { getTokenLocal } from '../../../Utils/Common';

const detailsStyle = {
    "fontFamily": "'Montserrat' !important",
    "fontWeight": "400 !important",
    "fontSize": "16px !important",
    "lineHeight": "22px !important",
    "color": "#212B36 !important",
    "textAlign": "left",
    "marginBottom": "24px !important"
}

const accordionTitleStyle = {
    "fontFamily": "'Montserrat' !important",
    "fontWeight": "600 !important",
    "fontSize": "16px !important",
    "lineHeight": "24px !important",
    "color": "#212B36 !important"
}

const Standardise = ({ dataSetName, allStandardisedFile, setAllStandardisedFile, standardisedFileLink, setStandardisedFileLink
}) => {
    const [data, setData] = useState([
        {
            panel: 1,
            title: '1_Soil DataSet',
            details: [""]
        },
        {
            panel: 2,
            title: '1_Rice DataSet',
            details: [""]
        }
    ]);
    const [expanded, setExpanded] = useState(false);
    const [standardisedColum, setStandardisedColumn] = useState([]);
    const [maskedColumns, setMaskedColumns] = useState([]);
    const [standardiseFiles, setStandardiseFiles] = useState([])
    const [standardiseFile, setStandardiseFile] = useState()
    const [templates, setTemplates] = useState([])
    const [template, setTemplate] = useState()
    const [keysInUploadedDataset, setKeysInUploadedDataset] = useState([])
    const [datapointCategories, setDatapointCategories] = useState([])
    const [datapointCategory, setDatapointCategory] = useState()
    const [datapointAttributes, setDatapointAttributes] = useState([])
    const [datapointAttribute, setDatapointAttribute] = useState()
    const [standardiseNames, setStandardiseNames] = useState([])
    const [standardiseName, setStandardiseName] = useState()
    const [alreadyStandardizedFiles, setAlreadyStandardizedFiles] = useState([]);

    const handleChange = () => (event, isExpanded) => {
        setExpanded(isExpanded ? true : false);
    };

    const getAllFileNames = () => {
        let url = UrlConstant.base_url + UrlConstant.standardization_get_all_file_name + dataSetName;
        let accessToken = getTokenLocal() ?? false;
        HTTPService("GET", url, false, false, accessToken)
            .then((response) => {
                console.log("response", response);
                let tmpAllFileName = [...standardiseFiles, ...response.data]
                setStandardiseFiles(tmpAllFileName);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const getFileColumnNames = () => {
        let url = UrlConstant.base_url + UrlConstant.standardization_get_file_columns;
        let accessToken = getTokenLocal() ?? false;
        let payload = {
            file_path: standardiseFile
        };

        HTTPService("POST", url, payload, false, accessToken)
            .then((response) => {
                setKeysInUploadedDataset(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const getStandardiziedTemplate = () => {
        let url = UrlConstant.base_url + UrlConstant.standardization_get_data;
        HTTPService("GET", url, false, false, true)
            .then((response) => {
                if (response.status == 200) {
                    setDatapointCategories(response?.data);
                    let tmpArr = new Array(response?.data.length);
                    tmpArr.fill({});
                    setDatapointCategory(tmpArr);

                    let tmpStandardisedColum = [...standardisedColum];
                    tmpStandardisedColum.fill("");
                    setStandardisedColumn(tmpStandardisedColum);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const datapointCategoryChange = (value, index) => {

        let tmpStandardisedColum = [...standardisedColum]
        tmpStandardisedColum[index] = ""
        setStandardisedColumn(tmpStandardisedColum)


        let tmpArr = [...datapointCategory];
        tmpArr[index] = value;
        setDatapointCategory(tmpArr);

        let tmpColumn = [...datapointAttributes];
        tmpArr.forEach((attribute, index) => {
            if (attribute?.datapoint_attributes)
                tmpColumn[index] = Object.keys(attribute.datapoint_attributes);
        });
        setDatapointAttributes(tmpColumn);
    };
    const handleMaskCheckBox = (columnName) => {
        let tmpMaskedColumns = [...maskedColumns];
        if (!tmpMaskedColumns.includes(columnName)) {
            tmpMaskedColumns.push(columnName)
        } else {
            const index = tmpMaskedColumns.indexOf(columnName);
            if (index > -1) {
                tmpMaskedColumns.splice(index, 1);
            }
        }
        setMaskedColumns(tmpMaskedColumns);
    }
    const handleStandaiseFile = () => {
        // saving standardised config
        let tmpAllStandardisedFile = { ...allStandardisedFile }
        tmpAllStandardisedFile[standardiseFile] = {
            standardised_templete_category: datapointCategory,
            standardised_column: standardisedColum,
            masked_columns: maskedColumns
        }
        setAllStandardisedFile(tmpAllStandardisedFile)
        // preparing payload
        let standardisationConfiguration = {}
        keysInUploadedDataset.forEach((column, index) => {
            if (standardisedColum[index]) {
                standardisationConfiguration[column] = standardisedColum[index]
            }
        })

        let payload = {
            "mask_columns": maskedColumns,
            "standardisation_configuration": standardisationConfiguration,
            "file_path": standardiseFile
        }

        let url = UrlConstant.base_url + UrlConstant.standardise_file
        HTTPService("POST", url, payload, false, true)
            .then((response) => {
                let tmpStandardisedFileLink = { ...standardisedFileLink }
                tmpStandardisedFileLink[standardiseFile] = response?.data?.standardised_file_path
                setStandardisedFileLink(tmpStandardisedFileLink);
            })
            .catch((e) => {
                console.log(e);
            });

    }
    useEffect(() => {
        getAllFileNames()
    }, [])

    useEffect(() => {
        getFileColumnNames();
        getStandardiziedTemplate();
        setStandardisedColumn([])
        setMaskedColumns([])
        setStandardisedColumn(standardiseFiles[standardiseFile]?.standardised_column)
    }, [standardiseFile])
    return (
        <div className='mt-20'>
            <Typography sx={{
                fontFamily: "Montserrat !important",
                fontWeight: "600",
                fontSize: "32px",
                lineHeight: "40px",
                color: "#000000",
                textAlign: 'left'
            }}>Standardise</Typography>
            <Box className='text-left mt-30'>
                <FormControl fullWidth sx={{ width: '368px' }}>
                    <InputLabel>File name</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={standardiseFile}
                        onChange={(e) => setStandardiseFile(e.target.value)}
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
                        {standardiseFiles?.map((item) => {
                            let index = item.lastIndexOf("/");
                            let fileName = item.slice(index + 1);
                            return (
                                <MenuItem key={item} value={item}>{fileName}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <Box className='mt-50'>
                    {data ? <></> : <EmptyFile text={'You have not uploaded any files'} />}
                </Box>
                <Box>
                    {/* {
                        data?.map((acc) => ( */}
                    {standardiseFile ?
                        <Accordion
                            sx={{
                                boxShadow: expanded ? '0px 20px 40px -4px rgba(145, 158, 171, 0.16)' : '',
                                borderRadius: expanded ? '8px' : '',
                                border: (expanded) ? '1px solid #919EAB' : '',
                            }}
                            expanded={expanded} onChange={handleChange()}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                                sx={{
                                    '&.MuiAccordionSummary-root': {
                                        borderBottom: expanded ? '1px solid #919EAB' : ''
                                    }
                                }}
                            >
                                <Box className='w-100 d-flex justify-content-between' >
                                    <Typography sx={accordionTitleStyle}>{standardiseFile.slice(standardiseFile.lastIndexOf("/") + 1)}</Typography>
                                    <img className='mr-55' src={require('../../../Assets/Img/delete_gray.svg')} />
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    {/* <Box className='text-left mt-30 ml-16'>
                                        <FormControl fullWidth sx={{ width: '368px' }}>
                                            <InputLabel>Select template</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={template}
                                                onChange={(e) => setTemplate(e.target.value)}
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
                                                label="Select template"
                                                placeholder='Select template'
                                            >
                                                {templates?.map((menu) => (
                                                    <MenuItem value={menu}>{menu}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box> */}
                                    {keysInUploadedDataset?.map((keyName, index) => (
                                        <StandardiseRow
                                            keyName={keyName}
                                            index={index}
                                            templates={templates}
                                            setTemplates={setTemplates}
                                            template={template}
                                            setTemplate={setTemplate}
                                            datapointAttributes={datapointAttributes}
                                            datapointCategories={datapointCategories}
                                            datapointCategory={datapointCategory}
                                            standardiseNames={standardiseNames}
                                            setStandardiseNames={setStandardiseNames}
                                            standardiseName={standardiseName}
                                            setStandardiseName={setStandardiseName}
                                            standardisedColum={standardisedColum}
                                            setStandardisedColumn={setStandardisedColumn}
                                            maskedColumns={maskedColumns}
                                            datapointCategoryChange={datapointCategoryChange}
                                            handleMaskCheckBox={handleMaskCheckBox}
                                        />
                                    ))}
                                    {/* {acc?.details?.map((detail) => (
                                    <Box sx={detailsStyle}>
                                        {detail}
                                    </Box>
                                ))} */}
                                    <Box className='text-right mt-30 mb-26'>
                                        <Button
                                            sx={{
                                                fontFamily: 'Montserrat',
                                                fontWeight: 700,
                                                fontSize: '14px',
                                                width: "86px",
                                                height: "36px",
                                                background: "#00AB55",
                                                borderRadius: "8px",
                                                textTransform: 'none',
                                                '&:hover': {
                                                    backgroundColor: '#00AB55',
                                                    color: '#fffff',
                                                }
                                            }}
                                            variant='contained' onClick={() => handleStandaiseFile()}>Apply</Button>
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        : <></>}
                    {/* ))
                    } */}
                </Box>
            </Box>
        </div>
    )
}

export default Standardise