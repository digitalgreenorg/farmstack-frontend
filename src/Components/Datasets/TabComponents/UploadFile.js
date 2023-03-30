import React, { useState } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import './UploadFile.css';
import { FileUploader } from 'react-drag-drop-files';
import ControlledAccordion from '../../Accordion/Accordion';
import File from './File';
import EmptyFile from './EmptyFile';
import CheckBoxWithText from './CheckBoxWithText';
import DbConfiguration from './DbConfiguration';
import TableImport from './TableImport';
import ApiConfiguration from './ApiConfiguration';

const accordionTitleStyle = {
    "fontFamily": "'Montserrat' !important",
    "fontWeight": "400 !important",
    "fontSize": "12px !important",
    "lineHeight": "24px !important",
    "color": "#212B36 !important"
}

const UploadFile = ({ files, setFiles, sqlFiles, setSqlFiles, postgresFiles, setPostgresFiles, sqLiteFiles, setSqLiteFiles, restApifiles, setRestApiFiles, validator }) => {
    const [selectedUploadType, setSelectedUploadType] = useState('file_upload');
    const [selectedPanel, setSelectedPanel] = useState();
    const [file, setFile] = useState();

    const [mySqlUserName, setMySqlUserName] = useState()
    const [mySqlPassword, setMySqlPassword] = useState()
    const [mySqlDbUrl, setMySqlDbUrl] = useState()
    const [mySqlPort, setMySqlPort] = useState()
    const [isMySqlSaveCreds, setIsMySqlSaveCreds] = useState(false)

    const [postgresUserName, setPostgresUserName] = useState()
    const [postgresPassword, setPostgresPassword] = useState()
    const [postgresDbUrl, setPostgresDbUrl] = useState()
    const [postgresPort, setPostgresPort] = useState()
    const [isPostgresSaveCreds, setIsPostgresSaveCreds] = useState(false)

    const [sqLiteUserName, setSqLiteUserName] = useState()
    const [sqLitePassword, setSqLitePassword] = useState()
    const [sqLiteDbUrl, setSqLiteDbUrl] = useState()
    const [sqLitePort, setSqLitePort] = useState()
    const [isSqLiteSaveCreds, setIsSqLiteSaveCreds] = useState(false)

    const [api, setApi] = useState();
    const [authToken, setAuthToken] = useState();
    const [exportFileName, setExportFileName] = useState();

    const [isMySqlConnected, setIsMySqlConnected] = useState(false)
    const [isPostgresConnected, setIsPostgresConnected] = useState(false)
    const [isSqLiteConnected, setIsSqLiteConnected] = useState(false)
    const [isApiConnected, setIsApiConnected] = useState(false)

    const [fileName, setFileName] = useState()
    const [tableName, setTableName] = useState()

    const [sqlTables, setSqlTables] = useState(["1_Person.csv"])
    const [postgresTables, setPostgresTables] = useState(["1_Cap.csv"])
    const [sqLiteTables, setSqLiteTables] = useState(["1_User.xlsx"])

    const handleFileChange = (file) => {
        setFile(file);
        setFiles(prev => [...prev, file])
    };

    const handleDelete = (index, type) => {
        if (type === 'file_upload') {
            let filteredElements = files.filter((f, i) => i !== index);
            setFiles(filteredElements)
        } else if (type === 'sqlFiles') {
            let filteredElements = sqlFiles.filter((f, i) => i !== index);
            setFiles(filteredElements)
        } else if (type === 'postgresFiles') {
            let filteredElements = postgresFiles.filter((f, i) => i !== index);
            setFiles(filteredElements)
        } else if (type === 'sqLiteFiles') {
            let filteredElements = sqLiteFiles.filter((f, i) => i !== index);
            setFiles(filteredElements)
        } else if (type === 'restApifiles') {
            let filteredElements = restApifiles.filter((f, i) => i !== index);
            setFiles(filteredElements)
        }
    }

    const getTotalSizeInMb = (data) => {
        let total = 0;
        data.forEach(element => {
            let converted = element.size / Math.pow(1024, 2);
            total = parseFloat(total) + parseFloat(converted.toFixed(2))
        });
        return total;
    }
    const getAccordionData = () => {
        const prepareFile = (data, type) => {
            if (data) {
                let arr = data?.map((item, index) => {
                    return <File index={index} name={item.name} size={item.size} handleDelete={handleDelete} type={type} showDeleteIcon={true} />
                })
                return arr;
            } else {
                return [<EmptyFile />];
            }
        }
        if (files || sqlFiles || postgresFiles || sqLiteFiles || restApifiles) {
            const data = [
                {
                    panel: 1,
                    title: <>
                        Files upload {files?.length > 0 ? <span style={{ color: "#ABABAB", marginLeft: '4px' }}>(Total Files: {files?.length} | Total size: {getTotalSizeInMb(files)} MB)</span> : <></>}
                    </>,
                    details: files?.length > 0 ? prepareFile(files, 'file_upload') : [<EmptyFile />]
                },
                {
                    panel: 2,
                    title: <>
                        MySQL {sqlFiles?.length > 0 ? <span style={{ color: "#ABABAB", marginLeft: '4px' }}>(Total Files: {sqlFiles?.length} | Total size: {getTotalSizeInMb(sqlFiles)} MB)</span> : <></>}
                    </>,
                    details: sqlFiles?.length > 0 ? prepareFile(sqlFiles, 'sqlFiles') : [<EmptyFile />]
                },
                {
                    panel: 3,
                    title: <>
                        Postgres {postgresFiles?.length > 0 ? <span style={{ color: "#ABABAB", marginLeft: '4px' }}>(Total Files: {postgresFiles?.length} | Total size: {getTotalSizeInMb(postgresFiles)} MB)</span> : <></>}
                    </>,
                    details: postgresFiles?.length > 0 ? prepareFile(postgresFiles, 'postgresFiles') : [<EmptyFile />]
                },
                {
                    panel: 4,
                    title: <>
                        SQLite {sqLiteFiles?.length > 0 ? <span style={{ color: "#ABABAB", marginLeft: '4px' }}>(Total Files: {sqLiteFiles?.length} | Total size: {getTotalSizeInMb(sqLiteFiles)} MB)</span> : <></>}
                    </>,
                    details: sqLiteFiles?.length > 0 ? prepareFile(sqLiteFiles, 'sqLiteFiles') : [<EmptyFile />]
                },
                {
                    panel: 5,
                    title: <>
                        Rest API {restApifiles?.length > 0 ? <span style={{ color: "#ABABAB", marginLeft: '4px' }}>(Total Files: {restApifiles?.length} | Total size: {getTotalSizeInMb(restApifiles)} MB)</span> : <></>}
                    </>,
                    details: restApifiles?.length > 0 ? prepareFile(restApifiles, 'restApifiles') : [<EmptyFile />]
                },
            ]
            return data;
        } else {
            return [];
        }
    }

    const handleUpload = () => {

    }

    const getPanel = () => {
        if (selectedUploadType === 'file_upload') {
            return 1;
        } else if (selectedUploadType === 'mysql') {
            return 2;
        } else if (selectedUploadType === 'postgres') {
            return 3;
        } else if (selectedUploadType === 'sqlite') {
            return 4;
        } else if (selectedUploadType === 'rest_api') {
            return 5;
        }
    }

    const handleCheckBox = () => {
        if (selectedUploadType === 'mysql') {
            setIsMySqlSaveCreds(!isMySqlSaveCreds)
        } else if (selectedUploadType === 'postgres') {
            setIsPostgresSaveCreds(!isPostgresSaveCreds)
        } else if (selectedUploadType === 'sqlite') {
            setIsSqLiteSaveCreds(!isSqLiteSaveCreds)
        }
    }

    const handleClearFields = () => {
        if (selectedUploadType === 'mysql') {
            setMySqlUserName("")
            setMySqlPassword("")
            setMySqlDbUrl("")
            setMySqlPort("")
            setIsMySqlSaveCreds(false)
        } else if (selectedUploadType === 'postgres') {
            setPostgresUserName("")
            setPostgresPassword("")
            setPostgresDbUrl("")
            setPostgresPort("")
            setIsPostgresSaveCreds(false)
        } else if (selectedUploadType === 'sqlite') {
            setSqLiteUserName("")
            setSqLitePassword("")
            setSqLiteDbUrl("")
            setSqLitePort("")
            setIsSqLiteSaveCreds(false)
        } else if (selectedUploadType === 'rest_api') {
            setApi("")
            setAuthToken("")
            setExportFileName("")
        }

    }

    const handleConnect = () => {
        if (selectedUploadType === 'mysql') {
            setIsMySqlConnected(true)
        } else if (selectedUploadType === 'postgres') {
            setIsPostgresConnected(true)
        } else if (selectedUploadType === 'sqlite') {
            setIsSqLiteConnected(true)
        } else if (selectedUploadType === 'rest_api') {
            setIsApiConnected(true)
        }
    }

    const handleDisconnect = () => {
        if (selectedUploadType === 'mysql') {
            setIsMySqlConnected(false)
        } else if (selectedUploadType === 'postgres') {
            setIsPostgresConnected(false)
        } else if (selectedUploadType === 'sqlite') {
            setIsSqLiteConnected(false)
        } else if (selectedUploadType === 'rest_api') {
            setIsApiConnected(false)
        }
    }

    const handleImport = () => {
        if (selectedUploadType === 'mysql') {
            setSqlFiles([])
        } else if (selectedUploadType === 'postgres') {
            setPostgresFiles([])
        } else if (selectedUploadType === 'sqlite') {
            setSqLiteFiles([])
        }
    }

    const handleExport = () => {

    }

    return (
        <div className='mt-20'>
            <Typography sx={{
                fontFamily: "Montserrat !important",
                fontWeight: "600",
                fontSize: "32px",
                lineHeight: "40px",
                color: "#000000",
                textAlign: 'left'
            }}>Upload or imports</Typography>
            <Box className='d-flex' sx={{ marginTop: '30px' }}>
                <div className='imports_style'>
                    <Typography
                        onClick={() => setSelectedUploadType('file_upload')}
                        sx={{
                            fontFamily: "Montserrat !important",
                            fontWeight: selectedUploadType === 'file_upload' ? "700" : "500",
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: selectedUploadType === 'file_upload' ? "#00AB55" : "#212B36",
                            textAlign: 'left',
                            marginLeft: '10px',
                            cursor: 'pointer'
                        }}>File upload</Typography>
                    <Typography sx={{
                        fontFamily: "Montserrat !important",
                        fontWeight: "600",
                        fontSize: "32px",
                        lineHeight: "40px",
                        color: "#000000",
                        textAlign: 'left',
                        marginTop: '61px'
                    }}>Imports</Typography>
                    <Typography
                        onClick={() => setSelectedUploadType('mysql')}
                        sx={{
                            fontFamily: "Montserrat !important",
                            fontWeight: selectedUploadType === 'mysql' ? "700" : "500",
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: selectedUploadType === 'mysql' ? "#00AB55" : "#212B36",
                            textAlign: 'left',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            marginTop: '31px'
                        }}>Mysql</Typography>
                    <Typography
                        onClick={() => setSelectedUploadType('postgres')}
                        sx={{
                            fontFamily: "Montserrat !important",
                            fontWeight: selectedUploadType === 'postgres' ? "700" : "500",
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: selectedUploadType === 'postgres' ? "#00AB55" : "#212B36",
                            textAlign: 'left',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            marginTop: '22px'
                        }}>Postgres</Typography>
                    <Typography
                        onClick={() => setSelectedUploadType('sqlite')}
                        sx={{
                            fontFamily: "Montserrat !important",
                            fontWeight: selectedUploadType === 'sqlite' ? "700" : "500",
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: selectedUploadType === 'sqlite' ? "#00AB55" : "#212B36",
                            textAlign: 'left',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            marginTop: '22px'
                        }}>SQLite</Typography>
                    <Typography
                        onClick={() => setSelectedUploadType('rest_api')}
                        sx={{
                            fontFamily: "Montserrat !important",
                            fontWeight: selectedUploadType === 'rest_api' ? "700" : "500",
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: selectedUploadType === 'rest_api' ? "#00AB55" : "#212B36",
                            textAlign: 'left',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            marginTop: '22px'
                        }}>Rest API</Typography>
                </div>
                <div className='browse_style'>
                    {/* for File Upload */}
                    {selectedUploadType === 'file_upload' ?
                        <>
                            <div className='cursor-pointer'>
                                <FileUploader
                                    handleChange={handleFileChange}
                                    children={
                                        <img className='cursor-pointer' src={require("../../../Assets/Img/Upload.svg")} />
                                    }
                                />
                            </div>
                            <div className='list_files mt-20'>
                                {files?.map((item, index) => (
                                    <>
                                        <File index={index} name={item.name} size={item.size} handleDelete={handleDelete} type={"file_upload"} showDeleteIcon={true} />
                                    </>
                                ))}
                                {files && files.length > 0 ?
                                    <Box sx={{ marginTop: '31px', textAlign: 'end' }}>
                                        <Button
                                            sx={{
                                                fontFamily: 'Montserrat',
                                                fontWeight: 700,
                                                fontSize: '16px',
                                                width: "44px",
                                                height: "48px",
                                                border: "none",
                                                borderRadius: "8px",
                                                color: "#00AB55",
                                                textTransform: 'none',
                                                '&:hover': {
                                                    background: 'none',
                                                    border: "none"
                                                }
                                            }}
                                            variant='outlined' onClick={() => setFiles([])}>Clear</Button>
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
                                                marginLeft: '60px',
                                                '&:hover': {
                                                    background: 'none',
                                                    border: "1px solid rgba(0, 171, 85, 0.48)"
                                                }
                                            }}
                                            variant='outlined' onClick={() => handleUpload()}>Upload</Button>
                                    </Box>
                                    : <></>}

                            </div>
                        </>
                        :
                        <></>
                    }
                    {/* for MySql */}
                    {selectedUploadType === 'mysql' ?
                        <>
                            {!isMySqlConnected ?
                                <DbConfiguration
                                    userName={mySqlUserName}
                                    setUserName={setMySqlUserName}
                                    password={mySqlPassword}
                                    setPassword={setMySqlPassword}
                                    dbUrl={mySqlDbUrl}
                                    setDbUrl={setMySqlDbUrl}
                                    port={mySqlPort}
                                    setPort={setMySqlPort}
                                    handleCheckBox={handleCheckBox}
                                    handleClearFields={handleClearFields}
                                    handleConnect={handleConnect}
                                    validator={validator}
                                    dbName={'MySQL'}
                                />
                                : <TableImport
                                    dbName={'MySQL'}
                                    tableName={tableName}
                                    setTableName={setTableName}
                                    fileName={fileName}
                                    setFileName={setFileName}
                                    handleDisconnect={handleDisconnect}
                                    handleImport={handleImport}
                                    validator={validator}
                                    menus={sqlTables}
                                />
                            }
                        </>
                        : <></>
                    }
                    {/* for Postgres */}
                    {selectedUploadType === 'postgres' ?
                        <>
                            {!isPostgresConnected ?
                                <DbConfiguration
                                    userName={postgresUserName}
                                    setUserName={setPostgresUserName}
                                    password={postgresPassword}
                                    setPassword={setPostgresPassword}
                                    dbUrl={postgresDbUrl}
                                    setDbUrl={setPostgresPassword}
                                    port={postgresPort}
                                    setPort={setPostgresPassword}
                                    handleCheckBox={handleCheckBox}
                                    handleClearFields={handleClearFields}
                                    handleConnect={handleConnect}
                                    validator={validator}
                                    dbName={'Postgres'}
                                />
                                : <TableImport
                                    dbName={'Postgres'}
                                    tableName={tableName}
                                    setTableName={setTableName}
                                    fileName={fileName}
                                    setFileName={setFileName}
                                    handleDisconnect={handleDisconnect}
                                    handleImport={handleImport}
                                    validator={validator}
                                    menus={postgresTables}
                                />
                            }
                        </>
                        : <></>
                    }
                    {/* for SQLite */}
                    {selectedUploadType === 'sqlite' ?
                        <>
                            {!isSqLiteConnected ?
                                <DbConfiguration
                                    userName={sqLiteUserName}
                                    setUserName={setSqLiteUserName}
                                    password={sqLitePassword}
                                    setPassword={setSqLitePassword}
                                    dbUrl={sqLiteDbUrl}
                                    setDbUrl={setSqLiteDbUrl}
                                    port={sqLitePort}
                                    setPort={setSqLitePort}
                                    handleCheckBox={handleCheckBox}
                                    handleClearFields={handleClearFields}
                                    handleConnect={handleConnect}
                                    validator={validator}
                                    dbName={'SQLite'}
                                />
                                : <TableImport
                                    dbName={'SQLite'}
                                    tableName={tableName}
                                    setTableName={setTableName}
                                    fileName={fileName}
                                    setFileName={setFileName}
                                    handleDisconnect={handleDisconnect}
                                    handleImport={handleImport}
                                    validator={validator}
                                    menus={sqLiteTables}
                                />
                            }
                        </>
                        : <></>
                    }
                    {/* for Rest API */}
                    {selectedUploadType === 'rest_api' ?
                        <>
                            <ApiConfiguration
                                api={api}
                                setApi={setApi}
                                authToken={authToken}
                                setAuthToken={setAuthToken}
                                exportFileName={exportFileName}
                                setExportFileName={setExportFileName}
                                handleClearFields={handleClearFields}
                                handleConnect={handleConnect}
                                handleDisconnect={handleDisconnect}
                                handleExport={handleExport}
                                validator={validator}
                            />
                        </> : <></>}
                </div>
                <div className='list_upload_style'>
                    <Typography sx={{
                        fontFamily: "Montserrat !important",
                        fontWeight: "600",
                        fontSize: "20px",
                        lineHeight: "24px",
                        color: "#000000",
                        textAlign: 'left',
                        marginBottom: '20px'
                    }}>List of files upload</Typography>
                    <Box>
                        <ControlledAccordion data={getAccordionData()} isCustomStyle={true} width={'466px'} titleStyle={accordionTitleStyle} selectedPanelIndex={getPanel()} />
                    </Box>
                </div>
            </Box>
        </div>
    )
}

export default UploadFile;