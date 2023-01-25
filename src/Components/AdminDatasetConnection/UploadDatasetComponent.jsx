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
import { List, ListItem, ListItemText } from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';

const UploadDatasetComponent = ({ setMessageForSnackBar,
    setErrorOrSuccess, seteErrorDatasetName, handleTab,
    handleClick, isDatasetEditModeOn, handleDeleteDatasetFileInFrontend, listOfFilesExistInDbForEdit, handleMetadata, setLocalUploaded, localUploaded, allFiles, setAllFiles, datasetname, setdatasetname, setPostgresFileList, setMysqlFileList, mysqlFileList, postgresFileList, deleteFunc, cancelForm }) => {
    //tab handler ---> local machine upload, mysql and posgres
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log("ListItem", listOfFilesExistInDbForEdit)
    console.log("ITEM is hereeee")
    return (
        <>
            <Row style={{ marginTop: "25px" }}>
                <Col lg={12} sm={12}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" >
                                <Tab id='local_upload_tab' label="Upload Dataset" value="1">
                                    <a href="#upload_from_tabs"></a>
                                </Tab>
                                <Tab id='mysql_tab' label="MySql" value="2" />
                                <Tab id='postgresql_tab' label="Postgres" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" >
                            <Row style={{ marginTop: "50px" }} >
                                <Col lg={12} sm={12}>
                                    <LocalMachineUploadDataset
                                        handleTab={handleTab}
                                        seteErrorDatasetName={seteErrorDatasetName}
                                        setMessageForSnackBar={setMessageForSnackBar}
                                        setErrorOrSuccess={setErrorOrSuccess}
                                        handleClick={handleClick}
                                        isDatasetEditModeOn={isDatasetEditModeOn}
                                        cancelForm={cancelForm}
                                        deleteFunc={deleteFunc}
                                        datasetname={datasetname} postgresFileList={postgresFileList} mysqlFileList={mysqlFileList} setdatasetname={setdatasetname} localUploaded={localUploaded} setLocalUploaded={setLocalUploaded} handleMetadata={handleMetadata} />
                                </Col>

                            </Row>
                        </TabPanel>
                        <TabPanel value="2">
                            <MysqlFormForConnection
                                handleTab={handleTab}
                                seteErrorDatasetName={seteErrorDatasetName}
                                cancelForm={cancelForm}
                                deleteFunc={deleteFunc}
                                localUploaded={localUploaded}
                                mysqlFileList={mysqlFileList} setMysqlFileList={setMysqlFileList} postgresFileList={postgresFileList} setPostgresFileList={setPostgresFileList}
                                datasetname={datasetname} setAllFiles={setAllFiles} handleMetadata={handleMetadata} /></TabPanel>
                        <TabPanel value="3"><PostgresFormForConnection
                            handleTab={handleTab}
                            seteErrorDatasetName={seteErrorDatasetName}
                            isDatasetEditModeOn={isDatasetEditModeOn}
                            cancelForm={cancelForm}
                            datasetname={datasetname}
                            deleteFunc={deleteFunc}
                            localUploaded={localUploaded}
                            mysqlFileList={mysqlFileList} setMysqlFileList={setMysqlFileList} postgresFileList={postgresFileList} setPostgresFileList={setPostgresFileList}
                            setAllFiles={setAllFiles} handleMetadata={handleMetadata} /></TabPanel>
                    </TabContext>

                </Col>
            </Row>
            {listOfFilesExistInDbForEdit.length > 0 ? <Row>
                <Col lg={6} sm={12}>
                    <label htmlFor="">Files associated</label>
                    <List style={{ maxHeight: "300px", overflowY: "scroll", }}>
                        {listOfFilesExistInDbForEdit.map((item, index) => {
                            console.log("ListItem", listOfFilesExistInDbForEdit)
                            let nameOfFile = item.file.split("/")
                            return <ListItem style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}> <span>

                                <ListItemText primary={nameOfFile[nameOfFile.length - 1]} secondary={item.source ? `Source - ${item.source}` : ""} />
                            </span>
                                <span>
                                    <DeleteOutlined onClick={(e) => handleDeleteDatasetFileInFrontend(e, item.id ? item.id : index)} style={{ color: "red", marginLeft: "30px" }} />
                                </span>
                            </ListItem>
                        })}
                    </List>
                </Col>
            </Row> : ""}
        </>
    )
}

export default UploadDatasetComponent
