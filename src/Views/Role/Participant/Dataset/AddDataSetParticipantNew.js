import React, { useState } from 'react'
import { Box, Button, Divider, Tab, Tabs } from '@mui/material';
import { useHistory } from "react-router-dom";
import { getTokenLocal } from "../../../../Utils/Common";
import './AddDataSetParticipantNew.css';
import FooterNew from '../../../../Components/Footer/FooterNew';
import BasicDetails from '../../../../Components/Datasets/TabComponents/BasicDetails';
import UploadFile from '../../../../Components/Datasets/TabComponents/UploadFile';
import Categorise from '../../../../Components/Datasets/TabComponents/Categorise';
import UsagePolicy from '../../../../Components/Datasets/TabComponents/UsagePolicy';
import Standardise from '../../../../Components/Datasets/TabComponents/Standardise';

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleNext = () => {
        if (value >= 0 && value < 4) {
            setValue(value + 1)
        }
    }

    const handleSubmit = () => {
        // history.push('/participant/new_datasets')
    }

    return (
        <Box>
            <Box sx={{ marginLeft: '144px', marginRight: '144px' }}>
                <div className='text-left mt-50'>
                    <span className='add_light_text'>Dataset</span>
                    <span className='add_light_text ml-16'>
                        <img src={require("../../../../Assets/Img/dot.svg")} />
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
                        <Tab label={<span className={value == 1 ? 'tab_header_selected' : 'tab_header'}>Upload or import</span>} />
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
                        standardiseFiles={standardiseFiles}
                        setStandardiseFiles={setStandardiseFiles}
                        standardiseFile={standardiseFile}
                        setStandardiseFile={setStandardiseFile}
                        templates={templates}
                        setTemplates={setTemplates}
                        template={template}
                        setTemplate={setTemplate}
                        keysInUploadedDataset={keysInUploadedDataset}
                        setKeysInUploadedDataset={setKeysInUploadedDataset}
                        datapointAttributes={datapointAttributes}
                        setDatapointAttributes={setDatapointAttributes}
                        datapointAttribute={datapointAttribute}
                        setDatapointAttribute={setDatapointAttribute}
                        datapointCategories={datapointCategories}
                        setDatapointCategories={setDatapointCategories}
                        datapointCategory={datapointCategory}
                        setDatapointCategory={setDatapointCategory}
                        standardiseNames={standardiseNames}
                        setStandardiseNames={setStandardiseNames}
                        standardiseName={standardiseName}
                        setStandardiseName={setStandardiseName}
                    />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Categorise />
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
            <Divider />
            <FooterNew />
        </Box>
    )
}

export default AddDataSetParticipantNew