import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Divider, Tab, Tabs } from '@mui/material';
import { useHistory } from "react-router-dom";
import { GetErrorKey, getTokenLocal, getUserMapId, isLoggedInUserAdmin, isLoggedInUserParticipant } from "../../Utils/Common";
import './AddDataSet.css';
import BasicDetails from '../Datasets_New/TabComponents/BasicDetails';
import UploadFile from '../Datasets_New/TabComponents/UploadFile';
import Categorise from '../Datasets_New/TabComponents/Categorise';
import UsagePolicy from '../Datasets_New/TabComponents/UsagePolicy';
import Standardise from '../Datasets_New/TabComponents/Standardise';
import UrlConstant from '../../Constants/UrlConstants';
import HTTPService from '../../Services/HTTPService';
import { FarmStackContext } from '../Contexts/FarmStackContext';

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

const AddDataSet = (props) => {
    const history = useHistory();
    const { callLoader, callToast } = useContext(FarmStackContext);
    const [value, setValue] = useState(0);
    const [validator, setValidator] = useState(false)

    // Basic Details
    const [errorDataSetName, seteErrorDataSetName] = useState("")
    const [errorDataSetDescription, setDescriptionErrorMessage] = useState("")

    const [datasetId, setDatasetId] = useState()
    const [dataSetName, setDataSetName] = useState('');
    const [dataSetDescription, setDataSetDescription] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // Upload File
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [files, setFiles] = useState([]);
    const [sqlFiles, setSqlFiles] = useState([]);
    const [postgresFiles, setPostgresFiles] = useState([]);
    const [sqLiteFiles, setSqLiteFiles] = useState([]);
    const [restApifiles, setRestApiFiles] = useState([]);

    // Standardise
    const [allStandardisedFile, setAllStandardisedFile] = useState({})
    const [standardisedFiles, setStandardisedFiles] = useState([])
    const [standardisedFileLink, setStandardisedFileLink] = useState({})

    // Categories
    const [categorises, setCategorises] = useState({})
    const [geography, setGeography] = useState({ country: null, state: null, city: null })

    // Usage Policy
    const [allFilesAccessibility, setAllFilesAccessibility] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleNext = () => {
        if (value === 0) {
            let body = {
                user_map: getUserMapId(),
                name: dataSetName,
                description: dataSetDescription,
                constantly_update: isUpdating,
                data_capture_start: isUpdating ? null : fromDate,
                data_capture_end: isUpdating ? null : toDate,
            }
            let accessToken = getTokenLocal() ?? false;
            let url = ''
            let method = ''
            if (props.isEditModeOn && props.datasetIdForEdit) {
                url = UrlConstant.base_url + UrlConstant.add_basic_dataset + props.datasetIdForEdit + "/"
                method = 'PUT'
            } else {
                url = UrlConstant.base_url + UrlConstant.add_basic_dataset
                method = "POST"
            }
            callLoader(true)
            HTTPService(method, url,
                body,
                false,
                true,
                accessToken).then((res) => {
                    callLoader(false)
                    if (!props.isEditModeOn && !props.datasetIdForEdit) {
                        setDatasetId(res?.data?.id)
                    }
                    setValue(value + 1)
                }).catch((err) => {
                    callLoader(false)
                    callToast("Something went wrong!", "error", true)
                })
        } else if (value >= 1 && value < 4) {
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

    const handleClickRoutes = () => {
        if (isLoggedInUserParticipant() && getTokenLocal()) {
            return '/participant/new_datasets'
        } else if (isLoggedInUserAdmin() && getTokenLocal()) {
            return "/datahub/new_datasets"
        }
    }

    const handleSubmit = () => {
        let body = {
            user_map: getUserMapId(),
            name: dataSetName,
            description: dataSetDescription,
            category: JSON.stringify(categorises),
            geography: geography,
            constantly_update: isUpdating,
            data_capture_start: (!isUpdating && fromDate) ? fromDate.toISOString() : null,
            data_capture_end: (!isUpdating && toDate) ? toDate.toISOString() : null,
        }
        let url = ''
        let method = ''
        if (props.isEditModeOn && props.datasetIdForEdit) {
            url = UrlConstant.base_url + UrlConstant.add_basic_dataset + props.datasetIdForEdit + "/"
            method = 'PUT'
        } else {
            url = UrlConstant.base_url + UrlConstant.add_basic_dataset + datasetId + "/"
            method = "PUT"
        }
        let checkforAcess = getTokenLocal() ?? false;
        callLoader(true)
        HTTPService(
            method,
            url,
            body,
            false,
            true,
            checkforAcess,
        ).then((response) => {
            callLoader(false)
            if (props.isEditModeOn && props.datasetIdForEdit) {
                callToast("Dataset updated successfully!", "success", true)

            } else {
                callToast("Dataset added successfully!", "success", true)
            }
            if (isLoggedInUserParticipant() && getTokenLocal()) {
                history.push('/participant/new_datasets')
            } else if (isLoggedInUserAdmin() && getTokenLocal()) {
                history.push('/datahub/new_datasets')
            }

        }).catch((e) => {
            callLoader(false)
            if (props.isEditModeOn && props.datasetIdForEdit) {
                callToast("Something went wrong while updating dataset!", "error", false)

            } else {
                callToast("Something went wrong while adding dataset!", "error", false)
            }
            console.log(e);
        });
    }

    useEffect(() => {
        // edit Dataset API call
        if (props.datasetIdForEdit) {
            (() => {
                let accessToken = getTokenLocal() ?? false;
                let url = UrlConstant.base_url + UrlConstant.datasetview + props.datasetIdForEdit + "/";
                callLoader(true)
                HTTPService("GET", url, "", false, true, accessToken)
                    .then((response) => {
                        callLoader(false)
                        setDataSetName(response.data.name);
                        setGeography(response.data?.geography);
                        setIsUpdating(response.data.constantly_update);
                        setFromDate(
                            response.data.data_capture_start
                                ? response.data.data_capture_start
                                : ""
                        );
                        setToDate(
                            response.data.data_capture_end
                                ? response.data.data_capture_end
                                : ""
                        );
                        setDataSetDescription(response.data.description);
                        // preparing files for edit
                        let newArr = [...files];
                        let tempFiles = response.data.datasets?.filter(
                            (dataset) => dataset.source === "file"
                        );
                        let tempSqlFiles = response.data.datasets?.filter(
                            (dataset) => dataset.source === "mysql"
                        );
                        let tempPostgresFiles = response.data.datasets?.filter(
                            (dataset) => dataset.source === "postgres"
                        );
                        let tempRestApiFiles = response.data.datasets?.filter(
                            (dataset) => dataset.source === "restApi"
                        );
                        let tempUploadedFiles = [];
                        if (tempFiles && tempFiles?.length > 0) {
                            tempFiles.forEach((tempFile, index) => {
                                tempUploadedFiles.push({ id: tempFile.id, file: tempFile.file, source: tempFile.source });
                            });
                        }
                        setUploadedFiles(tempFiles)

                        // preparing Standardisation
                        let tempStandardisedFiles = []
                        response.data.datasets.forEach((dset) => {
                            tempStandardisedFiles.push({ id: dset.id, file: dset.standardised_file, standardisation_config: dset.standardisation_config })
                        })
                        setStandardisedFiles(tempStandardisedFiles)

                        // preparing categories for accordion
                        let prepareArr = [];
                        let tempcategoryJson = JSON.parse(response?.data?.category)
                        for (const [key, value] of Object.entries(tempcategoryJson)) {
                            let obj = {};
                            obj[key] = value;
                            prepareArr.push(obj);
                        }
                        setCategorises(tempcategoryJson)

                        // prepare accesibility for all files in usage policy
                        let tempAccessibilities = []
                        response.data.datasets.forEach((dset) => {
                            tempAccessibilities.push({ id: dset.id, file: dset.file, accessibility: dset.accessibility })
                        })
                        setAllFilesAccessibility(tempAccessibilities)
                    })
                    .catch((e) => {
                        callLoader(false)
                        callToast("Something went wrong while loading dataset!", "error", true)
                        console.log("error while loading dataset", e);
                    });
            })();
        }
    }, [])
    return (
        <Box>
            <Box sx={{ marginLeft: '144px', marginRight: '144px' }}>
                <div className='text-left mt-50'>
                    <span className='add_light_text cursor-pointer' onClick={() => history.push(handleClickRoutes())}>Datasets</span>
                    <span className='add_light_text ml-16'>
                        <img src={require("../../Assets/Img/dot.svg")} />
                    </span>
                    <span className='add_light_text ml-16'>{props.datasetIdForEdit ? "Edit dataset" : "Add new dataset"}</span>
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
                        datasetIdForEdit={props.datasetIdForEdit}
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
                        errorDataSetName={errorDataSetName}
                        errorDataSetDescription={errorDataSetDescription}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UploadFile
                        datasetId={props.isEditModeOn && props.datasetIdForEdit ? props.datasetIdForEdit : datasetId}
                        dataSetName={dataSetName}
                        files={files}
                        setFiles={setFiles}
                        uploadedFiles={uploadedFiles}
                        setUploadedFiles={setUploadedFiles}
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
                        datasetId={props.isEditModeOn && props.datasetIdForEdit ? props.datasetIdForEdit : datasetId}
                        isEditModeOn={props.isEditModeOn}
                        standardisedUpcomingFiles={standardisedFiles}
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
                        datasetId={props.isEditModeOn && props.datasetIdForEdit ? props.datasetIdForEdit : datasetId}
                        isEditModeOn={props.isEditModeOn}
                        categorises={categorises}
                        setCategorises={setCategorises}
                        geography={geography}
                        setGeography={setGeography}
                        validator={validator}
                    />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <UsagePolicy
                        datasetId={props.isEditModeOn && props.datasetIdForEdit ? props.datasetIdForEdit : datasetId}
                        allFilesAccessibility={allFilesAccessibility}
                        isEditModeOn={props.isEditModeOn}
                    />
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
        </Box>
    )
}

export default AddDataSet