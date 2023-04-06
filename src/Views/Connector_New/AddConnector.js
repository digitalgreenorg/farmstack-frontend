import React, { useState, useEffect } from 'react'
import { Box, Divider, TextField, Typography } from '@mui/material'
import SelectConnector from './SelectConnector';
import EmptyFile from '../../Components/Datasets_New/TabComponents/EmptyFile';
import globalStyle from '../../Assets/CSS/global.module.css'
import style from './connector.module.css'
import IntegrationConnector from './IntegrationConnector';
import JoinLink from './JoinLink';
import JoinedBy from './JoinedBy';
import HTTPService from '../../Services/HTTPService';
import UrlConstant from '../../Constants/UrlConstants';

const textFieldStyle = {
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
const AddConnector = () => {

    const [connectorName, setConnectorName] = useState('');
    const [connectorDescription, setConnectorDescription] = useState('');
    const [organisationName, setOrganisationName] = useState()
    const [dataset, setDataset] = useState()
    const [orgList, setOrgList] = useState([])
    const [completeData, setCompleteData] = useState([])
    const [template, setTemplate] = useState(
        {
            org_id: "", dataset_list: [],
            file_list: [], org_name: "",
            dataset_id: "", dataset_name: "",
            file_name: "", availabeColumns: [],
            columnsSelected: [], left: [],
            right: [], left_on: [], right_on: [],
            type: "", result: []
        },
    )
    const [empty, setEmptyTemplate] = useState(
        {
            org_id: "", dataset_list: [],
            file_list: [], org_name: "",
            dataset_id: "", dataset_name: "", file_name: "", availabeColumns: [],
            columnsSelected: [], left: [], right: [], left_on: [], right_on: [], type: "", result: []
        },
    )
    const [connectorList, setConnectorList] = useState([]);

    const limitChar = 512;

    const handleDescription = (e) => {
        if (e.target.value.toString().length <= limitChar) {
            setConnectorDescription(e.target.value);
        }
    };

    const handleChangeSelector = async (value, type) => {
        console.log(value)
        let url = ""
        let payload = {}
        let list = [value]
        let method = "POST"
        if (type == "dataset") {
            url = UrlConstant.base_url + UrlConstant.get_files_for_selected_datasets
            payload = {
                datasets: [...list]
            }
        } else if (type == "file") {
            url = UrlConstant.base_url + UrlConstant.get_columns_for_selected_files
            payload = {
                files: [...list]
            }
        } else if (type == "org") {
            method = "GET"
            url = UrlConstant.base_url + UrlConstant.get_dataset_name_list + "?org_id=" + value
            payload = {}
        }
        await HTTPService(method, url, payload, false, true, false)
            .then((res) => {
                if (type == "dataset") {
                    setTemplate({ ...template, availabeColumns: [], dataset_name: res.data[0]?.dataset_name ? res.data[0].dataset_name : "N/A", dataset_id: value ? value : "", file_name: "", availabeColumns: [], file_list: [...res.data] })
                }
                else if (type == "file") {
                    let name = list[0]
                    let resArr = []
                    let fileId = res.data?.id ? res.data.id : ""
                    for (var key in res.data) {
                        resArr.push(res.data[key])
                    }
                    setTemplate({ ...template, file_id: fileId, file_name: name, availabeColumns: [...res.data[name]] })
                } else if (type == "org") {
                    console.log(template)
                    setTemplate({ ...template, availabeColumns: [], dataset_name: "", dataset_id: "", file_name: "", file_list: [], dataset_list: [...res.data], org_id: value, org_name: res?.data?.length > 0 ? res.data[0]?.org_name : "" })
                }
            })
            .catch(err => console.log(err))
    }

    const getDataList = (source) => {
        let url = ""
        if (source == "org_names") {
            url = UrlConstant.base_url + UrlConstant.get_org_name_list
        } else if (source == "dataset_names") {
            url = UrlConstant.base_url + UrlConstant.get_dataset_name_list
        }
        HTTPService("GET", url, "", false, true, false).then((res) => {
            if (source == "org_names") {
                setOrgList([...res.data])
            } else if (source == "dataset_names") {
                setTemplate({ ...template, dataset_list: [...res.data] })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getDataList("org_names")
    }, [])
    console.log(template)
    return (
        <Box>
            <Box sx={{ marginLeft: '144px', marginRight: '144px' }}>
                <div className='text-left mt-50'>
                    <span className='add_light_text'>Connectors</span>
                    <span className='add_light_text ml-16'>
                        <img src={require("../../Assets/Img/dot.svg")} />
                    </span>
                    <span className='add_light_text ml-16'>New connectors</span>
                </div>
                <Typography className={`${globalStyle.bold600} ${globalStyle.size32}  ${globalStyle.dark_color} mt-50 text-left`} sx={{
                    fontFamily: "Montserrat !important",
                    lineHeight: "40px",
                }}>Create and integration connector</Typography>
                <TextField
                    fullWidth
                    className='mt-20'
                    sx={textFieldStyle}
                    placeholder='Connector name'
                    label='Connector name'
                    value={connectorName}
                    onChange={(e) => setConnectorName(e.target.value)}
                />
                <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={4}
                    className='mt-30'
                    sx={textFieldStyle}
                    placeholder='Connector description not more that 512 character '
                    label='Connector description not more that 512 character '
                    value={connectorDescription}
                    onChange={(e) => handleDescription(e)}
                />
                <SelectConnector
                    connectorName={connectorName}
                    connectorDescription={connectorDescription}
                    organisations={orgList}
                    template={template}
                    organisationName={organisationName}
                    setOrganisationName={setOrganisationName}
                    dataset={dataset}
                    setDataset={setDataset}
                    handleChangeSelector={handleChangeSelector}
                    empty={empty}
                    setTemplate={setTemplate}
                    completeData={completeData}
                    setCompleteData={setCompleteData}
                />
                <Box className='mt-30'>
                    <Divider />
                </Box>
                {completeData && completeData?.length ?
                    <>
                        <Typography className={`${globalStyle.bold600} ${globalStyle.size32}  ${globalStyle.dark_color} mt-50 mb-20 text-left`} sx={{
                            fontFamily: "Montserrat !important",
                            lineHeight: "40px",
                        }}>Integration Connector</Typography>
                        <Box>
                            {completeData?.map((item, index) => (
                                <IntegrationConnector
                                    orgList={orgList}
                                    completeData={completeData}
                                    setCompleteData={setCompleteData}
                                    data={item}
                                    index={index}
                                />
                            ))}
                        </Box>
                    </>
                    :
                    <Box className={style.mt114 + " " + style.mb139}>
                        <EmptyFile text={'As of now, there is no dataset for connectors'} />
                    </Box>

                }
                {/*
                <JoinLink />
                {/* <JoinedBy /> */}
            </Box>
        </Box>
    )
}

export default AddConnector