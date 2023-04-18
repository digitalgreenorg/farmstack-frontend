import React, { useContext, useState } from 'react';
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
import HTTPService from '../../../Services/HTTPService';
import UrlConstant from '../../../Constants/UrlConstants';
import { fileUpload, getTokenLocal } from '../../../Utils/Common';
import { FarmStackContext } from '../../Contexts/FarmStackContext';

const accordionTitleStyle = {
    "fontFamily": "'Montserrat' !important",
    "fontWeight": "400 !important",
    "fontSize": "12px !important",
    "lineHeight": "24px !important",
    "color": "#212B36 !important"
}

const UploadFile = ({ files, setFiles, uploadedFiles, setUploadedFiles, sqlFiles, setSqlFiles, postgresFiles, setPostgresFiles, sqLiteFiles, setSqLiteFiles, restApifiles, setRestApiFiles, validator, datasetId, dataSetName }) => {
    const { callLoader, callToast } = useContext(FarmStackContext);
    const [selectedUploadType, setSelectedUploadType] = useState('file_upload');
    const [selectedPanel, setSelectedPanel] = useState();
    const [file, setFile] = useState();


    const [mySqlDbName, setMySqlDbName] = useState()
    const [mySqlUserName, setMySqlUserName] = useState()
    const [mySqlPassword, setMySqlPassword] = useState()
    const [mySqlDbUrl, setMySqlDbUrl] = useState()
    const [mySqlPort, setMySqlPort] = useState()
    const [isMySqlSaveCreds, setIsMySqlSaveCreds] = useState(false)

    const [postgresDbName, setPostgresDbName] = useState()
    const [postgresUserName, setPostgresUserName] = useState()
    const [postgresPassword, setPostgresPassword] = useState()
    const [postgresDbUrl, setPostgresDbUrl] = useState()
    const [postgresPort, setPostgresPort] = useState()
    const [isPostgresSaveCreds, setIsPostgresSaveCreds] = useState(false)

    const [sqLiteDbName, setSqLiteDbName] = useState()
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

    const [mySqlFileName, setMysqlFileName] = useState()
    const [mySqlTableName, setMySqlTableName] = useState()
    const [postgresFileName, setPostgresFileName] = useState()
    const [postgresTableName, setPostgresTableName] = useState()
    const [sqliteFileName, setSqliteFileName] = useState()
    const [sqliteTableName, setSqliteTableName] = useState()

    const [sqlTables, setSqlTables] = useState(["1_Person.csv"])
    const [postgresTables, setPostgresTables] = useState(["1_Cap.csv"])
    const [sqLiteTables, setSqLiteTables] = useState(["1_User.xlsx"])

    const [allColumns, setAllColumns] = useState([])

    const handleFileChange = (file) => {
        setFile(file);
        setFiles(prev => [...prev, file])
    };

    const handleDelete = (index, id, filename, type) => {
        let source = '';
        if (type === 'file_upload') {
            source = 'file'
        } else if (type === 'sqlFiles') {
            source = 'mysql'
        } else if (type === 'postgresFiles') {
            source = 'postgresql'
        } else if (type === 'sqLiteFiles') {
            source = 'sqlite'
        } else if (type === 'restApifiles') {
            source = 'restapi'
        }
        if (id) {
            let accessToken = getTokenLocal() ?? false;
            HTTPService(
                "DELETE",
                UrlConstant.base_url + UrlConstant.upload_files + id + "/",
                "",
                false,
                true,
                accessToken
            ).then((res) => {
                if (res.status === 204) {
                    if (type === 'file_upload') {
                        let filteredElements = uploadedFiles.filter((item, i) => item.id !== id);
                        setUploadedFiles(filteredElements)
                    } else if (type === 'sqlFiles') {
                        let filteredElements = sqlFiles.filter((item, i) => item.name !== filename);
                        setSqlFiles(filteredElements)
                    } else if (type === 'postgresFiles') {
                        let filteredElements = postgresFiles.filter((item, i) => item.name !== filename);
                        setPostgresFiles(filteredElements)
                    } else if (type === 'sqLiteFiles') {
                        let filteredElements = sqLiteFiles.filter((item, i) => item.name !== filename);
                        setSqLiteFiles(filteredElements)
                    } else if (type === 'restApifiles') {
                        let filteredElements = restApifiles.filter((item, i) => item.name !== filename);
                        setRestApiFiles(filteredElements)
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        } else {
            if (type === 'file_upload') {
                let filteredElements = files.filter((item, i) => item.name !== filename);
                setFiles(filteredElements)
            }
        }
    }

    const getTotalSizeInMb = (data) => {
        let total = 0;
        data.forEach(element => {
            let converted = element?.size / Math.pow(1024, 2);
            total = parseFloat(total) + parseFloat(converted?.toFixed(2))
        });
        return total;
    }
    const getAccordionData = () => {
        const prepareFile = (data, type) => {
            if (data) {
                let arr = data?.map((item, index) => {
                    let ind = item?.file?.lastIndexOf('/')
                    let tempFileName = item?.file?.slice(ind + 1)
                    return <File index={index} name={tempFileName} size={item?.size} id={item?.id} handleDelete={handleDelete} type={type} showDeleteIcon={true} />
                })
                return arr;
            } else {
                return [<EmptyFile text={'You have not uploaded any files'} />];
            }
        }
        if (uploadedFiles || sqlFiles || postgresFiles || sqLiteFiles || restApifiles) {
            const data = [
                {
                    panel: 1,
                    title: <>
                        Files upload {uploadedFiles?.length > 0 ? <span style={{ color: "#ABABAB", marginLeft: '4px' }}>(Total Files: {uploadedFiles?.length} | Total size: {getTotalSizeInMb(uploadedFiles)} MB)</span> : <></>}
                    </>,
                    details: uploadedFiles?.length > 0 ? prepareFile(uploadedFiles, 'file_upload') : [<EmptyFile text={'You have not uploaded any files'} />]
                },
                {
                    panel: 2,
                    title: <>
                        MySQL {sqlFiles?.length > 0 ? <span style={{ color: "#ABABAB", marginLeft: '4px' }}>(Total Files: {sqlFiles?.length} | Total size: {getTotalSizeInMb(sqlFiles)} MB)</span> : <></>}
                    </>,
                    details: sqlFiles?.length > 0 ? prepareFile(sqlFiles, 'sqlFiles') : [<EmptyFile text={'You have not uploaded any files'} />]
                },
                {
                    panel: 3,
                    title: <>
                        Postgres {postgresFiles?.length > 0 ? <span style={{ color: "#ABABAB", marginLeft: '4px' }}>(Total Files: {postgresFiles?.length} | Total size: {getTotalSizeInMb(postgresFiles)} MB)</span> : <></>}
                    </>,
                    details: postgresFiles?.length > 0 ? prepareFile(postgresFiles, 'postgresFiles') : [<EmptyFile text={'You have not uploaded any files'} />]
                },
                // {
                //     panel: 4,
                //     title: <>
                //         SQLite {sqLiteFiles?.length > 0 ? <span style={{ color: "#ABABAB", marginLeft: '4px' }}>(Total Files: {sqLiteFiles?.length} | Total size: {getTotalSizeInMb(sqLiteFiles)} MB)</span> : <></>}
                //     </>,
                //     details: sqLiteFiles?.length > 0 ? prepareFile(sqLiteFiles, 'sqLiteFiles') : [<EmptyFile />]
                // },
                {
                    panel: 4,
                    title: <>
                        Rest API {restApifiles?.length > 0 ? <span style={{ color: "#ABABAB", marginLeft: '4px' }}>(Total Files: {restApifiles?.length} | Total size: {getTotalSizeInMb(restApifiles)} MB)</span> : <></>}
                    </>,
                    details: restApifiles?.length > 0 ? prepareFile(restApifiles, 'restApifiles') : [<EmptyFile text={'You have not uploaded any files'} />]
                },
            ]
            return data;
        } else {
            return [];
        }
    }

    const getUpdatedFile = async (fileItem) => {
        let bodyFormData = new FormData();
        bodyFormData.append("dataset", datasetId);
        bodyFormData.append("source", "file");
        bodyFormData.append("file", "")
        bodyFormData.delete("file")
        bodyFormData.append("file", fileItem);
        let accessToken = getTokenLocal() ? getTokenLocal() : false;
        try {
            const response = await HTTPService('POST',
                UrlConstant.base_url + UrlConstant.upload_files,
                bodyFormData,
                true,
                true,
                accessToken
            );
            setUploadedFiles(prev => [...prev, response.data]);
            callLoader(false);
            callToast("file uploaded successfully", "success", true);
            return response?.data;
        } catch (error) {
            console.log(error);
            callLoader(false);
            callToast("something went wrong while uploading the file", "error", true);
        }
    }
    const handleUpload = async () => {
        if (selectedUploadType === 'file_upload') {
            let tempFiles = []
            files.map(fileItem => tempFiles.push(getUpdatedFile(fileItem)));
            Promise.all(tempFiles).then((results) => {
                // results will comes in type of array
                setFiles([])
                console.log(results)
            }).catch((err) => {
                console.log(err);
            });
        }

    }

    const getPanel = () => {
        if (selectedUploadType === 'file_upload') {
            return 1;
        } else if (selectedUploadType === 'mysql') {
            return 2;
        } else if (selectedUploadType === 'postgres') {
            return 3;
        }
        // else if (selectedUploadType === 'sqlite') {
        //     return 4;
        // } 
        else if (selectedUploadType === 'rest_api') {
            return 4;
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
            setMySqlDbName("")
            setMySqlUserName("")
            setMySqlPassword("")
            setMySqlDbUrl("")
            setMySqlPort("")
            setIsMySqlSaveCreds(false)
        } else if (selectedUploadType === 'postgres') {
            setPostgresDbName("")
            setPostgresUserName("")
            setPostgresPassword("")
            setPostgresDbUrl("")
            setPostgresPort("")
            setIsPostgresSaveCreds(false)
        } else if (selectedUploadType === 'sqlite') {
            setSqLiteDbName("")
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
            let bodyData = {
                database: mySqlDbName,
                username: mySqlUserName,
                password: mySqlPassword,
                host: mySqlDbUrl,
                port: mySqlPort,
                "database_type": "mysql"
            }

            let accessToken = getTokenLocal() ? getTokenLocal() : false;
            HTTPService('POST',
                UrlConstant.base_url + UrlConstant.connection_to_db_end_point,
                bodyData,
                false,
                true,
                accessToken
            ).then((res) => {
                setSqlTables([...res.data])
                setIsMySqlConnected(true)
            })
                .catch((err) => { console.log(err) })
        } else if (selectedUploadType === 'postgres') {
            let bodyData = {
                dbname: postgresDbName,
                user: postgresUserName,
                password: postgresPassword,
                host: postgresDbUrl,
                port: postgresPort,
                "database_type": "postgresql"
            }
            let accessToken = getTokenLocal() ?? false;
            HTTPService('POST',
                UrlConstant.base_url + UrlConstant.connection_to_db_end_point,
                bodyData,
                false,
                true,
                accessToken
            ).then((res) => {
                setPostgresTables([...res.data])
                setIsPostgresConnected(true)
            })
                .catch((err) => { console.log(err) })
        } else if (selectedUploadType === 'sqlite') {
            let bodyData = {
                dbname: sqLiteDbName,
                user: sqLiteUserName,
                password: sqLitePassword,
                host: sqLiteDbUrl,
                port: sqLitePort,
                "database_type": "sqlite"
            }
            let accessToken = getTokenLocal() ?? false;
            HTTPService('POST',
                UrlConstant.base_url + UrlConstant.connection_to_db_end_point,
                bodyData,
                false,
                true,
                accessToken
            ).then((res) => {
                setSqLiteTables([...res.data])
                setIsSqLiteConnected(true)
            })
                .catch((err) => { console.log(err) })
        } else if (selectedUploadType === 'rest_api') {
            let bodyFormData = new FormData();
            bodyFormData.append("dataset_name", dataSetName);
            bodyFormData.append("file_name", exportFileName);
            bodyFormData.append("source", "live_api");
            bodyFormData.append("api_key", "Bearer " + authToken);
            bodyFormData.append("url", api);
            let accessToken = getTokenLocal() ?? false;
            HTTPService('POST',
                UrlConstant.base_url + UrlConstant.live_api,
                bodyFormData,
                true,
                true,
                accessToken
            ).then((res) => {
                setRestApiFiles(res.data)
                setIsApiConnected(true)
            })
                .catch((err) => { console.log(err) })
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

    const generateColumns = (data) => {
        let newCol = []
        for (let i = 0; i < data.length; i++) {
            let eachColumn = { checked: false, value: data[i] }
            newCol.push(eachColumn)
        }
        setAllColumns([...newCol])
    }

    const handleCheckBoxCheck = (e, eachCol) => {
        let newColObj = { checked: e.target.checked, value: eachCol.value }
        let newAllCol = []
        for (let i = 0; i < allColumns.length; i++) {
            if (eachCol.value == allColumns[i].value) {
                newAllCol.push(newColObj)
            } else {
                newAllCol.push(allColumns[i])
            }
        }
        setAllColumns([...newAllCol])
    }

    const handleTableChange = (event) => {
        let query = event.target.value;
        let accessToken = getTokenLocal() ?? false;
        if (selectedUploadType === 'mysql') {
            setMySqlTableName(query)
            HTTPService('POST',
                UrlConstant.base_url + UrlConstant.get_column_from_table_name,
                { table_name: query },
                false,
                true,
                accessToken
            ).then((res) => {
                generateColumns([...res.data])
            })
                .catch((err) => { console.log(err) })
        } else if (selectedUploadType === 'postgres') {
            setPostgresTableName(query)
            HTTPService('POST',
                UrlConstant.base_url + UrlConstant.get_column_from_table_name,
                { table_name: query },
                false,
                true,
                accessToken
            ).then((res) => {
                generateColumns([...res.data])
            })
                .catch((err) => { console.log(err) })
        } else if (selectedUploadType === 'sqlite') {
            setSqliteTableName(query)
            HTTPService('POST',
                UrlConstant.base_url + UrlConstant.get_column_from_table_name,
                { table_name: query },
                false,
                true,
                accessToken
            ).then((res) => {
                generateColumns([...res.data])
            })
                .catch((err) => { console.log(err) })
        }

    }

    const handleImport = () => {
        if (selectedUploadType === 'mysql') {
            let query = mySqlFileName;
            let table_name = mySqlTableName
            let selectedColumns = [];
            for (let i = 0; i < allColumns.length; i++) {
                if (allColumns[i].checked) selectedColumns.push(allColumns[i].value)
            }
            let bodyFormData = new FormData()
            bodyFormData.append("col", JSON.stringify(selectedColumns))
            bodyFormData.append("file_name", query)
            bodyFormData.append("dataset_name", dataSetName)
            bodyFormData.append("dataset", datasetId)
            bodyFormData.append("source", "mysql")
            bodyFormData.append("table_name", table_name)
            let accessToken = getTokenLocal() ?? false;
            HTTPService('POST',
                UrlConstant.base_url + UrlConstant.send_columns_to_export,
                bodyFormData,
                true,
                true,
                accessToken
            ).then((res) => {
                setAllColumns([])
                generateColumns([])
                setExportFileName("")
                setMySqlTableName("")
                setSqlFiles([...res.data])
            })
                .catch((err) => { console.log(err) })
        } else if (selectedUploadType === 'postgres') {
            let query = postgresFileName;
            let table_name = postgresTableName
            let selectedColumns = [];
            for (let i = 0; i < allColumns.length; i++) {
                if (allColumns[i].checked) selectedColumns.push(allColumns[i].value)
            }
            let bodyFormData = new FormData()
            bodyFormData.append("col", JSON.stringify(selectedColumns))
            bodyFormData.append("file_name", query)
            bodyFormData.append("dataset_name", dataSetName)
            bodyFormData.append("dataset", datasetId)
            bodyFormData.append("source", "postgresql")
            bodyFormData.append("table_name", table_name)
            let accessToken = getTokenLocal() ?? false;
            HTTPService('POST',
                UrlConstant.base_url + UrlConstant.send_columns_to_export,
                bodyFormData,
                true,
                true,
                accessToken
            ).then((res) => {
                setPostgresFiles(res.data)
            })
                .catch((err) => { console.log(err) })
        }
        // else if (selectedUploadType === 'sqlite') {
        //     let query = sqliteFileName;
        //     let table_name = sqliteTableName
        //     let selectedColumns = [];
        //     for (let i = 0; i < allColumns.length; i++) {
        //         if (allColumns[i].checked) selectedColumns.push(allColumns[i].value)
        //     }
        //     let bodyFormData = new FormData()
        //     bodyFormData.append("col", JSON.stringify(selectedColumns))
        //     bodyFormData.append("file_name", query)
        //     bodyFormData.append("dataset_name", dataSetName)
        //     bodyFormData.append("source", "sqlite")
        //     bodyFormData.append("table_name", table_name)
        //     let accessToken = getTokenLocal() ?? false;
        //     HTTPService('POST',
        //         UrlConstant.base_url + UrlConstant.send_columns_to_export,
        //         bodyFormData,
        //         true,
        //         true,
        //         accessToken
        //     ).then((res) => {
        //         setSqLiteFiles(res.data)
        //     })
        //         .catch((err) => { console.log(err) })
        // }
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
                    {/* <Typography
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
                        }}>SQLite</Typography> */}
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
                                    dbaseName={mySqlDbName}
                                    setDbaseName={setMySqlDbName}
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
                                    tableName={mySqlTableName}
                                    setTableName={setMySqlTableName}
                                    handleTableChange={handleTableChange}
                                    fileName={mySqlFileName}
                                    setFileName={setMysqlFileName}
                                    handleDisconnect={handleDisconnect}
                                    handleImport={handleImport}
                                    validator={validator}
                                    menus={sqlTables}
                                    allColumns={allColumns}
                                    setAllColumns={setAllColumns}
                                    handleCheckBoxCheck={handleCheckBoxCheck}
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
                                    dbaseName={postgresDbName}
                                    setDbaseName={setPostgresDbName}
                                    userName={postgresUserName}
                                    setUserName={setPostgresUserName}
                                    password={postgresPassword}
                                    setPassword={setPostgresPassword}
                                    dbUrl={postgresDbUrl}
                                    setDbUrl={setPostgresDbUrl}
                                    port={postgresPort}
                                    setPort={setPostgresPort}
                                    handleCheckBox={handleCheckBox}
                                    handleClearFields={handleClearFields}
                                    handleConnect={handleConnect}
                                    validator={validator}
                                    dbName={'Postgres'}
                                />
                                : <TableImport
                                    dbName={'Postgres'}
                                    tableName={postgresTableName}
                                    setTableName={setPostgresTableName}
                                    handleTableChange={handleTableChange}
                                    fileName={postgresFileName}
                                    setFileName={setPostgresFileName}
                                    handleDisconnect={handleDisconnect}
                                    handleImport={handleImport}
                                    validator={validator}
                                    menus={postgresTables}
                                    allColumns={allColumns}
                                    setAllColumns={setAllColumns}
                                    handleCheckBoxCheck={handleCheckBoxCheck}
                                />
                            }
                        </>
                        : <></>
                    }
                    {/* for SQLite */}
                    {/* {selectedUploadType === 'sqlite' ?
                        <>
                            {!isSqLiteConnected ?
                                <DbConfiguration
                                    dbaseName={sqLiteDbName}
                                    setDbaseName={setSqLiteDbName}
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
                                    tableName={sqliteTableName}
                                    setTableName={setSqliteTableName}
                                    handleTableChange={handleTableChange}
                                    fileName={sqliteFileName}
                                    setFileName={setSqliteFileName}
                                    handleDisconnect={handleDisconnect}
                                    handleImport={handleImport}
                                    validator={validator}
                                    menus={sqLiteTables}
                                    allColumns={allColumns}
                                    setAllColumns={setAllColumns}
                                    handleCheckBoxCheck={handleCheckBoxCheck}
                                />
                            }
                        </>
                        : <></>
                    } */}
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