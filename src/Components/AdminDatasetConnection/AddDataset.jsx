import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Admin_upload_dataset from './UploadDatasetComponent';
import Admin_add_metadata from './AddMetadata';
import "./admin-add-dataset.css"
import { TextField } from '@material-ui/core';
import { handleUnwantedSpace, validateInputField } from '../../Utils/Common';
import RegexConstants from '../../Constants/RegexConstants';
import ListForUploadedFiles from './ListForUploadedFiles';
const AddDataset = () => {
    const [value, setValue] = React.useState('1');
    const [nameErrorMessage, setnameErrorMessage] = useState(null);
    const [datasetname, setdatasetname] = useState("");
    const [localUploaded, setLocalUploaded] = useState(
        {
            title: "Files uploaded",
            data: ["first_file.csv", "second_file.pdf", "third_file.xlsx", "asas", "Qwqwqwqwqw", "qwqwqwqw", "qwqwqwqwq", "qwqwqwq"]
        },
    )
    const [allFiles, setAllFiles] = useState([localUploaded])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangedatasetname = (e) => {
        validateInputField(e.target.value, RegexConstants.connector_name)
            ? setdatasetname(e.target.value)
            : e.preventDefault();
    };
    const handledatasetnameKeydown = (e) => {
        handleUnwantedSpace(datasetname, e);
    };
    return (
        <Container id='admin_add_dataset_main_container'>
            <Row className='main_heading_row'>
                <Col lg={3} sm={6}>
                    <span className='Main_heading_add_dataset'>Add dataset</span>
                </Col>

            </Row>
            <Row style={{ margin: "20px 0px", padding: "0px" }}>
                <Col style={{ margin: "0px", padding: "0px" }} lg={3} sm={6}>
                    <TextField
                        value={datasetname}
                        onKeyDown={handledatasetnameKeydown}
                        onChange={handleChangedatasetname}
                        error={nameErrorMessage ? true : false}
                        helperText={nameErrorMessage}
                        label="Dataset name" variant='standard' className='dataset_name_class' id='dataset_name' placeholder='Enter the dataset name' />
                </Col>
            </Row>
            <Row>
                <Col lg={12} sm={12}>
                    <TabContext value={value}>

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList aria-label="lab API tabs example">
                                <Tab onClick={(e) => handleChange(e, '1')} label="Upload dataset" value="1" />
                                <Tab disabled label="Add metadata" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><Admin_upload_dataset datasetname={datasetname} setAllFiles={setAllFiles} allFiles={allFiles} localUploaded={localUploaded} setLocalUploaded={setLocalUploaded} handleMetadata={handleChange} /></TabPanel>
                        <TabPanel value="2"><Admin_add_metadata /></TabPanel>
                        {/* <TabPanel value="3">Item Three</TabPanel> */}
                    </TabContext>
                </Col>
            </Row>
            {/* <Row>
                {allFiles.map((eachCat, index) => {
                    return <Col lg={4} sm={12}>
                        {eachCat.title}
                        <ListForUploadedFiles data={eachCat} />
                    </Col>

                })}
            </Row> */}

        </Container>
    )
}

export default AddDataset