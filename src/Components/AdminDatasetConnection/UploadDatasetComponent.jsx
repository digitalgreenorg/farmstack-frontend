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
import LocalMachineUploadDataset from './LocalMachineUploadDataset';
import ConnectionProgressGif from './ConnectionProgressGif';
const UploadDatasetComponent = ({ handleMetadata, setLocalUploaded, localUploaded, allFiles, setAllFiles, datasetname, setdatasetname, setPostgresFileList, setMysqlFileList, mysqlFileList, postgresFileList, deleteFunc, cancelForm }) => {
    //tab handler ---> local machine upload, mysql and posgres
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
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
                            </TabList>
                        </Box>
                        <TabPanel value="1" >
                            <Row style={{ marginTop: "50px" }} >
                                <Col lg={12} sm={12}>
                                    <LocalMachineUploadDataset
                                        cancelForm={cancelForm}
                                        deleteFunc={deleteFunc}
                                        datasetname={datasetname} postgresFileList={postgresFileList} mysqlFileList={mysqlFileList} setdatasetname={setdatasetname} localUploaded={localUploaded} setLocalUploaded={setLocalUploaded} handleMetadata={handleMetadata} />
                                </Col>

                            </Row>
                        </TabPanel>
                        <TabPanel value="2">
                            <MysqlFormForConnection
                                cancelForm={cancelForm}
                                deleteFunc={deleteFunc}
                                localUploaded={localUploaded}
                                mysqlFileList={mysqlFileList} setMysqlFileList={setMysqlFileList} postgresFileList={postgresFileList} setPostgresFileList={setPostgresFileList}
                                datasetname={datasetname} setAllFiles={setAllFiles} handleMetadata={handleMetadata} /></TabPanel>
                        <TabPanel value="3"><PostgresFormForConnection
                            cancelForm={cancelForm}
                            deleteFunc={deleteFunc}
                            localUploaded={localUploaded}
                            mysqlFileList={mysqlFileList} setMysqlFileList={setMysqlFileList} postgresFileList={postgresFileList} setPostgresFileList={setPostgresFileList}
                            setAllFiles={setAllFiles} handleMetadata={handleMetadata} /></TabPanel>
                    </TabContext>
                </Col>
            </Row>
        </>
    )
}

export default UploadDatasetComponent
