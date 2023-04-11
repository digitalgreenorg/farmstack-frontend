import React, { useState } from 'react'
import { Box, Button, Divider, Tab, Tabs } from '@mui/material';
import { useHistory } from "react-router-dom";
import { GetErrorKey, getTokenLocal, getUserMapId, isLoggedInUserAdmin, isLoggedInUserParticipant } from "../../Utils/Common";
import './AddDataSet.css';
import FooterNew from '../Footer/Footer_New';
import BasicDetails from '../Datasets_New/TabComponents/BasicDetails';
import UploadFile from '../Datasets_New/TabComponents/UploadFile';
import Categorise from '../Datasets_New/TabComponents/Categorise';
import UsagePolicy from '../Datasets_New/TabComponents/UsagePolicy';
import Standardise from '../Datasets_New/TabComponents/Standardise';
import UrlConstant from '../../Constants/UrlConstants';
import HTTPService from '../../Services/HTTPService';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const AddDataSetParticipantNew = () => {
    const history = useHistory();
    const [value, setValue] = useState(0);
    const [validator, setValidator] = useState(false)

    // Basic Details
    const [errorDataSetName, seteErrorDataSetName] = useState("")
    const [errorDataSetDescription, setDescriptionErrorMessage] = useState("")

    const [dataSetName, setDataSetName] = useState('');
    const [dataSetDescription, setDataSetDescription] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // Upload File
    const [files, setFiles] = useState([]);
    const [sqlFiles, setSqlFiles] = useState([]);
    const [postgresFiles, setPostgresFiles] = useState([]);
    const [sqLiteFiles, setSqLiteFiles] = useState([]);
    const [restApifiles, setRestApiFiles] = useState([]);

    // Standardise
    const [allStandardisedFile, setAllStandardisedFile] = useState({})
    const [standardisedFileLink, setStandardisedFileLink] = useState({})

    // Categories
    const [categorises, setCategorises] = useState({})
    const [geography, setGeography] = useState()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleNext = () => {
        if (value >= 0 && value < 4) {
            setValue(value + 1)
        }
    }

    const isDisabled = () => {
        if (value === 0) {
            if (dataSetName && dataSetDescription && !errorDataSetName && !errorDataSetDescription && (isUpdating || (fromDate && toDate))) {
                return false;
            } else {
                return true;
            }
        } else if (value === 1) {
            if (files || sqlFiles || postgresFiles || sqLiteFiles || restApifiles) {
                return false;
            } else {
                return true;
            }
        } else if (value === 3) {
            if (geography) {
                return false;
            } else {
                return true;
            }
        }
    }

    const checkDataSet = () => {
        let bodyFormData = new FormData();
        bodyFormData.append("dataset_name", dataSetName);
        bodyFormData.append("description", dataSetDescription);
        let accessToken = getTokenLocal() ?? false;
        let url = UrlConstant.base_url + UrlConstant.check_dataset_name_and_description_in_database
        if (dataSetName && dataSetDescription) {
            HTTPService(
                "POST",
                url,
                bodyFormData,
                false,
                true,
                accessToken
            ).then((response) => {
                seteErrorDataSetName('')
                setDescriptionErrorMessage('')
            }).catch((e) => {
                let returnValues = GetErrorKey(e, bodyFormData.keys());
                let errorKeys = returnValues[0];
                let errorMessages = returnValues[1];

                if (errorKeys.length > 0) {
                    for (var i = 0; i < errorKeys.length; i++) {
                        switch (errorKeys[i]) {
                            case "dataset_name":
                                seteErrorDataSetName(errorMessages[i])
                                break;
                            case "description":
                                setDescriptionErrorMessage(errorMessages[i]);
                        }
                    }
                }
                console.log(e);
            });
        }
    }
    const handleSubmit = () => {
        let bodyFormData = new FormData();
        bodyFormData.append("name", dataSetName);
        bodyFormData.append("description", dataSetDescription);
        bodyFormData.append("category", JSON.stringify(categorises));
        bodyFormData.append("user_map", getUserMapId());
        bodyFormData.append("geography", geography);
        bodyFormData.append("constantly_update", isUpdating);
        bodyFormData.append("data_capture_start", (!isUpdating && fromDate) ? fromDate.toISOString() : "");
        bodyFormData.append("data_capture_end", (!isUpdating && toDate) ? toDate.toISOString() : "");
        bodyFormData.append("standardisation_template", JSON.stringify(standardisedFileLink));
        bodyFormData.append("standardisation_config", JSON.stringify(allStandardisedFile));

        let url = UrlConstant.base_url + UrlConstant.datasetview
        let checkforAcess = getTokenLocal() ?? false;
        HTTPService(
            "POST",
            url,
            bodyFormData,
            false,
            true,
            checkforAcess,
        ).then((response) => {
            if (isLoggedInUserParticipant() && getTokenLocal()) {
                history.push('/participant/new_datasets')
            } else if (isLoggedInUserAdmin() && getTokenLocal()) {
                history.push('/datahub/new_datasets')
            }

        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <Box>
            <Box sx={{ marginLeft: '144px', marginRight: '144px' }}>
                <div className='text-left mt-50'>
                    <span className='add_light_text'>Datasets</span>
                    <span className='add_light_text ml-16'>
                        <img src={require("../../Assets/Img/dot.svg")} />
                    </span>
                    <span className='add_light_text ml-16'>Add new dataset</span>
                </div>
                <Box sx={{ marginTop: '63px', borderBottom: 1, borderColor: 'divider', borderBottom: '1px solid #3D4A52 !important' }}>
                    <Tabs
                        className='tabs'
                        sx={{
                            '& .MuiTabs-indicator': { backgroundColor: "#00AB55 !important" },
                            '& .MuiTab-root': {
                                color: "#637381 !important",
                                borderLeft: 'none !important',
                                borderTop: 'none !important',
                                borderRight: 'none !important',
                            },
                            '& .Mui-selected': { color: "#00AB55 !important" },
                        }}
                        value={value} onChange={handleChange}>
                        <Tab label={<span className={value == 0 ? 'tab_header_selected' : 'tab_header'}>Basic details</span>} />
                        <Tab
                            sx={{
                                '&.MuiButtonBase-root': {
                                    minWidth: '182.5px'
                                }
                            }}
                            label={<span className={value == 1 ? 'tab_header_selected' : 'tab_header'}>Upload or import</span>} />
                        <Tab label={<span className={value == 2 ? 'tab_header_selected' : 'tab_header'}>Standardise</span>} />
                        <Tab label={<span className={value == 3 ? 'tab_header_selected' : 'tab_header'}>Categorise</span>} />
                        <Tab label={<span className={value == 4 ? 'tab_header_selected' : 'tab_header'}>Usage policy</span>} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <BasicDetails
                        dataSetName={dataSetName}
                        setDataSetName={setDataSetName}
                        dataSetDescription={dataSetDescription}
                        setDataSetDescription={setDataSetDescription}
                        fromDate={fromDate}
                        setFromDate={setFromDate}
                        toDate={toDate}
                        setToDate={setToDate}
                        isUpdating={isUpdating}
                        setIsUpdating={setIsUpdating}
                        validator={validator}
                        checkDataSet={checkDataSet}
                        errorDataSetName={errorDataSetName}
                        errorDataSetDescription={errorDataSetDescription}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UploadFile
                        dataSetName={dataSetName}
                        files={files}
                        setFiles={setFiles}
                        sqlFiles={sqlFiles}
                        setSqlFiles={setSqlFiles}
                        postgresFiles={postgresFiles}
                        setPostgresFiles={setPostgresFiles}
                        sqLiteFiles={sqLiteFiles}
                        setSqLiteFiles={setSqLiteFiles}
                        restApifiles={restApifiles}
                        setRestApiFiles={setRestApiFiles}
                        validator={validator}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Standardise
                        dataSetName={dataSetName}
                        allStandardisedFile={allStandardisedFile}
                        setAllStandardisedFile={setAllStandardisedFile}
                        standardisedFileLink={standardisedFileLink}
                        setStandardisedFileLink={setStandardisedFileLink}
                        validator={validator}
                    />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Categorise
                        categorises={categorises}
                        setCategorises={setCategorises}
                        geography={geography}
                        setGeography={setGeography}
                        validator={validator}
                    />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <UsagePolicy />
                </TabPanel>
                <Divider sx={{ border: '1px solid #ABABAB', marginTop: '59px' }} />
                <Box className='d-flex justify-content-end' sx={{ marginTop: '50px', marginBottom: '100px' }}>
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
                            '&:hover': {
                                background: 'none',
                                border: "1px solid rgba(0, 171, 85, 0.48)"
                            }
                        }}
                        variant='outlined' onClick={() => history.push('/participant/new_datasets')}>Cancel</Button>
                    <Button
                        disabled={isDisabled()}
                        sx={{
                            fontFamily: 'Montserrat',
                            fontWeight: 700,
                            fontSize: '16px',
                            width: "171px",
                            height: "48px",
                            background: "#00AB55",
                            borderRadius: "8px",
                            textTransform: 'none',
                            marginLeft: '50px',
                            '&:hover': {
                                backgroundColor: '#00AB55',
                                color: '#fffff',
                            }
                        }}
                        variant='contained' onClick={() => { value === 4 ? handleSubmit() : handleNext() }}>{value === 4 ? 'Submit' : 'Next'}</Button>
                </Box>
            </Box>
            {/* <Divider />
            <FooterNew /> */}
        </Box>
    )
}

export default AddDataSetParticipantNew