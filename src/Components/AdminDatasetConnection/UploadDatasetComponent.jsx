import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MysqlFormForConnection from './MysqlFormForConnection';
import PostgresFormForConnection from './PostgresFormForConnection';
import UploadDataset from '../Datasets/UploadDataset';
import AccordionForUploadedFileDetails from './AccordionForUploadedFileDetails';
import ListForUploadedFiles from './ListForUploadedFiles';
const UploadDatasetComponent = ({ handleMetadata, setLocalUploaded, localUploaded, allFiles, setAllFiles, datasetname }) => {
    const [value, setValue] = React.useState('1');


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            {/* <Row style={{ textAlign: "left" }}>
                <Col>Upload files</Col>
            </Row>
            <Row style={{ textAlign: "left" }}>
                <Col lg={12} sm={12}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, eius, doloremque quos quaerat dolore perspiciatis eos hic deserunt quidem ipsum nostrum ratione accusamus culpa blanditiis ab, est repellat magni adipisci! Dolores facilis aut suscipit officiis atque aspernatur consectetur corporis commodi corrupti. Dolore accusamus alias, hic et molestias sapiente unde, impedit numquam rem earum aliquam laborum reiciendis ipsam dolorem blanditiis odio.
                </Col>
            </Row>
            <Row >
                <Col lg={12} sm={12}>
                    <UploadDataset />
                </Col>
            </Row> */}
            <Row style={{ marginTop: "25px" }}>
                <Col lg={12} sm={12}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" >
                                <Tab label="Upload Dataset" value="1">
                                    <a href="#upload_from_tabs"></a>
                                </Tab>
                                <Tab label="MySql" value="2" />
                                <Tab label="Postgres" value="3" />
                                {/* <Tab label="Item Three" value="3" /> */}
                            </TabList>
                        </Box>
                        <TabPanel value="1" >
                            <Row >
                                <Col lg={6} sm={12}>
                                    <UploadDataset localUploaded={localUploaded} setLocalUploaded={setLocalUploaded} handleMetadata={handleMetadata} />
                                </Col>
                                <Col lg={6} sm={12}>
                                    {allFiles.map((eachCat, index) => {
                                        return <AccordionForUploadedFileDetails data={eachCat} />
                                    })}
                                </Col>
                            </Row>
                        </TabPanel>
                        <TabPanel value="2">
                            <MysqlFormForConnection datasetname={datasetname} setAllFiles={setAllFiles} handleMetadata={handleMetadata} /></TabPanel>
                        <TabPanel value="3"><PostgresFormForConnection setAllFiles={setAllFiles} handleMetadata={handleMetadata} /></TabPanel>
                        {/* <TabPanel value="3">Item Three</TabPanel> */}
                    </TabContext>
                </Col>
            </Row>
        </>
    )
}

export default UploadDatasetComponent
