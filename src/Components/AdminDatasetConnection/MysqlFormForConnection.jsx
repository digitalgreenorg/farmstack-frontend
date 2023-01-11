import { Avatar, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, InputAdornment, InputLabel, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, TextField, List, IconButton, Snackbar, Alert, Chip, Paper, Divider, Tooltip, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import StorageIcon from '@mui/icons-material/Storage';
import FaceIcon from '@mui/icons-material/Face';
import PasswordIcon from '@mui/icons-material/Password';
import LanguageIcon from '@mui/icons-material/Language';
import CableIcon from '@mui/icons-material/Cable';
import NoDatasetCard from '../Datasets/NoDatasetCard';
import Connection from './ConnectionProgressGif';
import HTTPService from '../../Services/HTTPService';
import Loader from '../Loader/Loader';
import UrlConstant from '../../Constants/UrlConstants';
import { useEffect } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { getTokenLocal, validateInputField } from '../../Utils/Common';
import RegexConstants from '../../Constants/RegexConstants';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import circleloader from "../../Assets/Img/circleloader.gif"
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import databasegif from "../../Assets/Img/database.gif"
import bellboygif from "../../Assets/Img/bellboy.gif"
import Tree from '../Catergories/Tree';
import Axios from 'axios';
const MysqlFormForConnection = ({ handleMetadata, setAllFiles, datasetname, allFiles, setPostgresFileList, setMysqlFileList, mysqlFileList, postgresFileList }) => {
  const history = useHistory();
  //exported file name
  const [exportedFileName, setExportedFileName] = useState("")

  //states for the alert if any error occurs at any point in the form of snackbar
  const [messageForSnackBar, setMessageForSnackBar] = useState("")
  const [errorOrSuccess, setErrorOrSuccess] = useState("error") //options --> "error", "info", "success", "warning"
  //loaders states
  const [loader, setLoader] = useState(true)
  const [spinner, setSpinner] = useState(true)


  //connection details
  const [connectionData, setConnectionData] = useState({
    db_name: "",
    user_name: "",
    db_password: "",
    host_address: "",
    port: ""
  })

  //state to toggle the form to export state
  const [isConnected, setIsConnected] = useState(false)
  const [isExported, setIsExported] = useState(false)
  const [exportedFiles, setExportedFiles] = useState([
  ])

  //List of tables after successfull connection to DB
  const [dbData, setDbData] = useState([])

  //selected table name
  const [selectedTable, setSelectedTable] = useState("")

  //columns of selected table name after making a http request
  const [allColumns, setAllColumns] = useState([])

  //A function to create the object with status of checked on the basis of selection accepting the data as a list of columns
  const generateColumns = (data) => {
    let newCol = []
    for (let i = 0; i < data.length; i++) {
      let eachColumn = { checked: false, value: data[i] }
      newCol.push(eachColumn)
    }
    setAllColumns([...newCol])
  }

  //Connection establishment to the given database details
  const tryToConnect = () => {
    setLoader(true)
    setSpinner(true)

    //building the body for request object
    let bodyData = {
      database: connectionData.db_name,
      username: connectionData.user_name,
      password: connectionData.db_password,
      host: connectionData.host_address,
      port: connectionData.port,
      "database_type": "mysql"
    }

    //Making the post request for getting all the table list
    HTTPService('POST',
      UrlConstant.base_url + UrlConstant.connection_to_db_end_point,
      bodyData,
      false,
      true,
      false).then((res) => {

        // var now = new Date();
        // now.setTime(now.getTime() + 1 * 3600 * 1000);
        // document.cookie = "db_name=" + connectionData.db_name + '; expires=' + now.toUTCString() + '; path=/';
        // document.cookie = "db_password=" + connectionData.db_password + '; expires=' + now.toUTCString() + '; path=/';
        // document.cookie = "user_name=" + connectionData.user_name + '; expires=' + now.toUTCString() + '; path=/';
        // document.cookie = "host=" + connectionData.host_address + '; expires=' + now.toUTCString() + '; path=/';
        // document.cookie = "port=" + connectionData.port + '; expires=' + now.toUTCString() + '; path=/';

        // let cookiesData = {
        //   database: connectionData.db_name,
        //   username: connectionData.user_name,
        //   password: connectionData.db_password,
        //   host: connectionData.host_address,
        //   port: connectionData.port
        // }
        // handleCookies(cookiesData)

        console.log(res)
        setDbData([...res.data])
        setIsConnected(true)
        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("Connection establishment done!")
        setErrorOrSuccess("success")
        setLoader(false)
        setSpinner(false)


      }).catch((err) => {
        //if any error occurs displaying the error toast 
        console.log(err)
        setLoader(false)
        setSpinner(false)
        // console.log(connectionData)

        //setting the cookies upon the successfull response with the validity of 1 hour or till the time metadata and dataset upload done
        let cookiesData = {
          database: "",
          username: "",
          password: "",
          host: "",
          port: ""
        }

        //clear input fields
        // setConnectionData({
        //   ...connectionData, ...cookiesData
        // })
        //setting the cookies with the cookiesData object
        // handleCookies(cookiesData)

        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("Connection establishment failed!")
        setErrorOrSuccess("error")
        handleClick() //toggling toast
        setIsConnected(false) // move to table form
      })
  }

  //toast for error
  const [open, setOpen] = React.useState(false);
  //handling toast
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //action for toast
  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );



  //on change of table name from a particular table name from select drop down
  const handleChange = (event) => {

    //making a get request for a particular table name to get the list of columns for rendering and selecting purpose
    let query = event.target.value;
    let method = 'POST'
    setLoader(true)
    setSelectedTable(query);
    // generateColumns(["cl112121212", "cl1212122", "cl12121213", "cl12124", "cl12125", "cl12126", "cl12127", "cl12128", "cl91212", "cl10"])

    // HTTPService(
    //   method,
    //   UrlConstant.base_url + UrlConstant.get_column_from_table_name,
    //   { table_name: query },
    //   false,
    //   true,
    //   false
    // )



    let token = getTokenLocal();
    Axios({
      method: method,
      url: UrlConstant.base_url + UrlConstant.get_column_from_table_name,
      data: { table_name: query },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res, "changed")
        generateColumns([...res.data])
        setLoader(false)
      }).catch((err) => {
        console.log(err)
        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("Columns fetching failed. Please try again!") //error message set
        setErrorOrSuccess("error") //error type set 
        handleClick() //toggling toast
        setLoader(false)
      })


  };

  //sending the list of columns selected by admin/participant along with the xlsx/xls name (btn:export to xls)
  const sendingColumnsSelected = () => {

    let query = exportedFileName;
    let method = 'POST'
    let table_name = selectedTable
    setLoader(true)
    let selectedColumns = [];
    for (let i = 0; i < allColumns.length; i++) {
      if (allColumns[i].checked) selectedColumns.push(allColumns[i].value)
    }
    // HTTPService(
    //   method,
    //   UrlConstant.base_url + UrlConstant.send_columns_to_export,
    //   // { col: [...selectedColumns], xls_file_name: query },
    //   false,
    //   true,
    //   false
    // )
    let newFormData = new FormData({
      col: [...selectedColumns],
      file_name: query,
      dataset_name: datasetname,
      source: "mysql",
      table_name: table_name
    })

    let token = getTokenLocal();
    Axios({
      method: method,
      url: UrlConstant.base_url + UrlConstant.send_columns_to_export,
      data: newFormData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    })
      .then((res) => {
        setAllColumns([])
        generateColumns([])
        console.log(res)
        setExportedFileName("")
        setSelectedTable("")

        setExportedFiles([...res.data])
        setMysqlFileList([...res.data])
        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("File exported successfully!")
        setErrorOrSuccess("success")
        handleClick()
        setLoader(false)
        setIsExported(true)


      }).catch((err) => {
        //after suucess
        // setExportedFiles([...exportedFiles, query])
        setIsExported(false)
        setLoader(false)
        console.log(err)
        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("File export failed!")
        setErrorOrSuccess("error")
        handleClick()
      })
  }

  //handling connection details
  const handleConnectionData = (e) => {
    setConnectionData({ ...connectionData, [e.target.name]: e.target.value })
    console.log(connectionData)
  }

  //handling check for columns
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


  //reset column selected
  const resetColumnSelected = () => {
    let newAllCol = []
    for (let i = 0; i < allColumns.length; i++) {
      let newColObj = { checked: false, value: allColumns[i].value }
      newAllCol.push(newColObj)
    }
    setAllColumns([...newAllCol])
  }

  // disconnect the databse and remove the creds from cookies
  const disconnectTheDatabase = () => {
    // var now = new Date();
    // now.setTime(now.getTime() + 1 * 3600 * 1000);
    // document.cookie = "db_name=" + "" + '; expires=' + now.toUTCString() + '; path=/';
    // document.cookie = "db_password=" + "" + '; expires=' + now.toUTCString() + '; path=/';
    // document.cookie = "user_name=" + "" + '; expires=' + now.toUTCString() + '; path=/';
    // document.cookie = "port=" + "" + '; expires=' + now.toUTCString() + '; path=/';
    setIsConnected(false)

  }

  //function to clear or set the cookies
  function handleCookies(data) {
    // for (const [key, value] of Object.entries(data)) {
    // var now = new Date();
    // now.setTime(now.getTime() + 1 * 3600 * 1000);
    // document.cookie = "conn_details" + "=" + data + '; expires=' + now.toUTCString() + '; path=/';
    // }
  }

  //delete the exported filesf
  function handleDeleteExportedFile(item) {
    let method = "DELETE"
    let query = item
    //taking token for authorization
    let token = getTokenLocal();
    Axios({
      method: method,
      url: UrlConstant.base_url + UrlConstant.send_columns_to_export,
      data: { xls_file_name: query },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        setExportedFiles([...res.data])

        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("File deleted successfully!")
        setErrorOrSuccess("success")
        handleClick()
        setLoader(false)
      }).catch((err) => {
        //after suucess
        // setExportedFiles([...exportedFiles, query])
        setLoader(false)
        console.log(err)
        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("Deletion failed!")
        setErrorOrSuccess("error")
        handleClick()
      })
  }

  useEffect(() => {
    // var cookies = document.cookie.split(';');
    // for (let i = 0; i < cookies.length; i++) {
    //   let key = cookies[i].split("=")[0]
    //   let value = cookies[i].split("=")[1];
    //   if (key.trim() == "db_name" && value.length > 0) {
    //     setIsConnected(true);
    //     return
    //   } else {
    //   }
    // }
    setLoader(false)
  }, [])
  return (
    <>
      {loader && isConnected ? <Loader /> : ""}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
      >
        <Alert autoHideDuration={4000} onClose={handleClose} sx={{ width: '100%' }} severity={errorOrSuccess}>{messageForSnackBar}</Alert>
      </Snackbar>

      <Row >
        <Col lg={6} sm={12} style={{ textAlign: "left" }}>
          Please provide the database credentials
        </Col>
        <Col lg={6} sm={12} style={{ textAlign: "center" }}>
          <>
            {isConnected ? <> Connected to <span style={{ fontWeight: "600", }}>  {connectionData.db_name} </span> database <span></span> </> : <>Not connected to any database</>}
            <img style={{ height: "30px", width: "30px" }} src={bellboygif} alt="database" />
            <span style={{ textDecoration: "line-through", color: isConnected ? "green" : "red", transition: "all 3s", background: isConnected ? "green" : "red", minWidth: isConnected ? "40px" : "50px", display: "inline-block", minHeight: "3px" }}></span>
            {isConnected ? <CheckIcon color='success' /> : <ClearIcon color='warning' />}
            <span style={{ textDecoration: "line-through", color: isConnected ? "green" : "red", transition: "all 3s", background: isConnected ? "green" : "red", minWidth: isConnected ? "40px" : "50px", display: "inline-block", minHeight: "3px" }}></span>
            {/* <span style={{ textDecoration: "line-through", width: "20px", color: isConnected ? "green" : "red", transition: "all 3s" }}>..........</span> */}
            <img style={{ height: "30px", width: "30px" }} src={databasegif} alt="database" />
          </>
        </Col>

      </Row>
      {!isConnected ? <> <Row className='textfield_row'>
        <Col lg={6} sm={12}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StorageIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="db_name" value={connectionData.db_name} onChange={handleConnectionData} label="Database name" variant="standard" name='db_name' />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaceIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="user_name" label="User name" value={connectionData.user_name} onChange={handleConnectionData} name='user_name' variant="standard" />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="db_password" name="db_password" value={connectionData.db_password} onChange={handleConnectionData} label="Password" type={"password"} variant="standard" />

          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="host_address" value={connectionData.host_address} onChange={handleConnectionData} label="Host/IP address" name='host_address' variant="standard" />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CableIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="port" value={connectionData.port} onChange={handleConnectionData} label="Port" name='port' variant="standard" />
        </Col>
        <Col lg={6} sm={12}> <Connection loader={loader} isConnected={isConnected} /></Col>
      </Row>
        <Row className='textfield_row' >
          <Col lg={6} sm={12}>
            <Button
              id='connect_btn_id'
              disabled={(connectionData.db_name.trim() != "" && connectionData.db_password.trim() != "" && connectionData.host_address.trim() != "" && connectionData.port.trim() != "" && connectionData.user_name.trim() != "") ? false : true}
              className='connect_btn green_btn_for_connect' onClick={tryToConnect}>Connect </Button>
            <Button id='cancel_btn_id' className='connect_btn' onClick={() => history.push("/datahub/datasets")}> Cancel </Button>
          </Col>
        </Row></> : <>
        <Row className='textfield_row'>
          <Col lg={6} sm={12} >
            <FormControl style={{ width: "80%" }}>
              <InputLabel id="demo-simple-select-label">Table name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="select_table_name"
                value={selectedTable}
                label="Table name"
                onChange={handleChange}
              >
                {dbData?.map((eachtableName, index) => {
                  return <MenuItem id={eachtableName + index} key={index} value={eachtableName}> {eachtableName}</MenuItem>
                })}
              </Select>
            </FormControl>
            {selectedTable ? <label htmlFor="">Select the columns:</label> : ""}
            <FormGroup style={{ height: "160px", overflow: "scroll", width: "80%" }}>
              {allColumns.length > 0 && allColumns.map((eachCol, index) => {
                console.log(eachCol)
                return <FormControlLabel control={<Checkbox key={index} onChange={(e) => handleCheckBoxCheck(e, eachCol)} checked={eachCol.checked} />} label={eachCol.value} />
              })}
            </FormGroup>
            <label htmlFor="">Columns selected :</label>
            <div style={{ width: "400px", overflowX: "scroll", margin: "5px 0px", height: "65px" }}>
              {allColumns?.map((eachColSelected) => {
                return (eachColSelected.checked ? <Chip label={eachColSelected.value} /> : "")
              })}
            </div>
            <TextField style={{ width: "80%" }} id="exportedFileName" value={exportedFileName} onChange={(e) => {
              validateInputField(e.target.value, RegexConstants.NO_SPACE_REGEX)
                ? setExportedFileName(e.target.value)
                : e.preventDefault()
            }} label="Export file name" variant="standard" />

          </Col>
          <Col lg={6} sm={12} style={{ textAlign: "center" }} >
            {/* <Row>
              <Col lg={3} sm={12}>
                {isConnected ? <Paper className="paperForTotal" sx={{ padding: "10px", display: "inline" }} elevation={3} >Total no of tables : {dbData.length}</Paper> : ""}
              </Col>
              <Col lg={6} sm={12}>
                {isConnected && selectedTable ? <Paper className="paperForTotal" sx={{ padding: "10px", display: "inline", marginLeft: "0px" }} elevation={3} >No of columns in {selectedTable} : {allColumns.length} </Paper> : ""}
              </Col>
              <Col lg={3} sm={12}>
              {isConnected && selectedTable ? <Paper className="paperForTotal" sx={{ padding: "10px", display: "inline", marginLeft: "0px" }} elevation={3} >No of columns in {selectedTable} : {allColumns.length} </Paper> : ""}
              </Col>

              <Col lg={1} sm={12}>
                <Tooltip title={isConnected ? "Connected" : "Not connected"}>
                  {isConnected ? <div className="statusInsidePaper" elevation={1} >
                    <span style={{ backgroundColor: isConnected ? "green" : "red", borderRadius: "50%", textAlign: "center" }}> {loader ? <img height="20px" width="20px" src={circleloader} alt="loading" /> : isConnected ? <CheckOutlinedIcon style={{ color: "white" }} /> : <CloseOutlinedIcon style={{ color: "white" }} />} </span>
                  </div> : ""}
                </Tooltip>
              </Col>
            </Row> */}
            <Row>
            </Row>
            {/* {isConnected ? <Paper elevation={3} ></Paper> : ""} */}
            {isConnected && loader ? <>
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
              <Skeleton variant="rectangular" width={210} height={60} />
            </>
              : ""}
            {!isExported ? <Connection isConnected={isConnected} /> :
              <List>
                {mysqlFileList?.map((item, index) => {
                  return <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DescriptionOutlinedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item} secondary="Jan 9, 2014" />
                    <IconButton edge="end" aria-label="delete">
                      <DeleteOutlinedIcon onClick={() => handleDeleteExportedFile(item, index)} color='warning' />
                    </IconButton>
                    <Divider />
                  </ListItem>
                })}

              </List>
            }
          </Col>
        </Row>
        <Row className='textfield_row'>
          {!isExported ?
            <Col lg={6} sm={12}>
              <Button disabled={(exportedFileName != "" && selectedTable.name != "" && datasetname != "") ? false : true} onClick={() => {
                sendingColumnsSelected()
              }} className='connect_btn'>Export to XLS</Button>
              <Button onClick={(e) => { disconnectTheDatabase() }} className='disconnect_btn'>Disconnect</Button>
            </Col> :
            <Col lg={6} sm={12}>
              <Button disabled={(exportedFileName != "" && selectedTable != "" && datasetname != "") ? false : true} onClick={() => {
                sendingColumnsSelected()
              }} className='connect_btn'>Export to XLS</Button>
              <Button onClick={(e) => handleMetadata(e, '2')} className='connect_btn'>Add metadata</Button>
              <Button onClick={(e) => { disconnectTheDatabase() }} className='disconnect_btn'>Disconnect</Button>
            </Col>}
        </Row>
      </>}
      {/* <Tree /> */}
    </>
  )
}

export default MysqlFormForConnection 