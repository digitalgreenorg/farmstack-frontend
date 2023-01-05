import { Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import StorageIcon from '@mui/icons-material/Storage';
import FaceIcon from '@mui/icons-material/Face';
import PasswordIcon from '@mui/icons-material/Password';
import LanguageIcon from '@mui/icons-material/Language';
import CableIcon from '@mui/icons-material/Cable';
import NoDatasetCard from '../Datasets/NoDatasetCard';
import Connection from './Connection';
import HTTPService from '../../Services/HTTPService';
import Loader from '../Loader/Loader';
import UrlConstant from '../../Constants/UrlConstants';
const MysqlFormForConnection = ({ handleMetadata }) => {
  const [loader, setLoader] = useState(false)
  const [spinner, setSpinner] = useState(false)
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
  const [dbData, setDbData] = useState({
    tables: [
      { name: "dummy1", columns: [{ col_name: "col1" }, { col_name: "col2" }] },
      { name: "dummy2", columns: [{ col_name: "col3" }, { col_name: "col4" }] },
      { name: "dummy3", columns: [{ col_name: "col5" }, { col_name: "col6" }, { col_name: "col7" }, { col_name: "col8" }, { col_name: "col9" }, { col_name: "col10" }, { col_name: "col10" }, { col_name: "col10" }, { col_name: "col10" }, { col_name: "col10" }, { col_name: "col10" }, { col_name: "col10" }, { col_name: "col10" }, { col_name: "col10" }, { col_name: "col10" }, { col_name: "col10" }, { col_name: "col10" }] },
      { name: "dummy4", columns: [{ col_name: "col5" }, { col_name: "col6" }, { col_name: "col7" }] },
      { name: "dummy5", columns: [{ col_name: "col5" }, { col_name: "col6" }, { col_name: "col7" }] },
      { name: "dummy6", columns: [{ col_name: "col5" }, { col_name: "col6" }, { col_name: "col7" }] },
      { name: "dummy7", columns: [{ col_name: "col5" }, { col_name: "col6" }, { col_name: "col7" }] },
    ]
  })
  const [selectedTable, setSelectedTable] = useState({ name: "", columns: [] })
  //Connection establishment to the given database details
  const tryToConnect = () => {
    // setLoader(true)

    setSpinner(true)
    setTimeout(() => {
      setSpinner(false)

    }, 3000)
    HTTPService('POST',
      UrlConstant.base_url + UrlConstant.connectionToDBEndPoint,
      connectionData,
      true,
      true,
      false).then((res) => {
        setLoader(false)
        // setSpinner(false)
      }).catch((err) => {
        console.log(err)
        setLoader(false)
        // setSpinner(false)
      })

    setIsConnected(false)
  }

  //all tables
  const handleChange = (event) => {
    let arr = dbData?.tables?.filter((eachTable) => eachTable.name == event.target.value)
    console.log(arr)
    setSelectedTable({ name: event.target.value, columns: [...arr[0].columns] });
    console.log(selectedTable)
  };

  //handling connection details
  const handleConnectionData = (e) => {
    setConnectionData({ ...connectionData, [e.target.name]: e.target.value })
  }

  //exported file name
  const [exportedFileName, setExportedFileName] = useState("")
  return (
    <>
      {loader ? <Loader /> : ""}
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
            style={{ width: "80%" }} id="standard-basic" value={connectionData.db_name} onChange={handleConnectionData} label="Database name" variant="standard" name='db_name' />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaceIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="standard-basic" label="User name" value={connectionData.user_name} onChange={handleConnectionData} name='user_name' variant="standard" />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="standard-basic" value={connectionData.password} onChange={handleConnectionData} label="Password" name='password' type={"password"} variant="standard" />

          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="standard-basic" value={connectionData.host_address} onChange={handleConnectionData} label="Host/IP address" name='host_address' variant="standard" />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CableIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="standard-basic" value={connectionData.port} onChange={handleConnectionData} label="Port" name='port' variant="standard" />
        </Col>
        <Col lg={4} sm={12}><Connection isConnected={isConnected} /></Col>
      </Row>
        <Row className='textfield_row' >
          <Col lg={6} sm={12}>
            <Button className='connect_btn' onClick={tryToConnect}>Connect {spinner ? <CircularProgress style={{ height: "15px", width: "15px" }} color='success' /> : ""} </Button>
          </Col>
        </Row></> : <>
        <Row className='textfield_row'>
          <Col lg={6} sm={12} >
            <FormControl style={{ width: "80%" }}>
              <InputLabel id="demo-simple-select-label">Table name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedTable.name}
                label="Table name"
                onChange={handleChange}
              >
                {dbData?.tables?.map((eachtable, index) => {
                  return <MenuItem key={index} value={eachtable.name}> {eachtable.name}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormGroup style={{ height: "200px", overflowY: "scroll" }}>
              {selectedTable?.columns.map((eachCol, index) => {
                return <FormControlLabel key={index} control={<Checkbox />} label={eachCol.col_name} />
              })}
            </FormGroup>
            <TextField style={{ width: "80%" }} id="standard-basic" value={exportedFileName} onChange={(e) => setExportedFileName(e.target.value)} label="Export file name" variant="standard" />

          </Col>
          <Col lg={4} sm={12}>
            <Connection isConnected={isConnected} />
          </Col>
        </Row>
        <Row>
          {!isExported ?
            <Col lg={4} sm={12}>
              <Button onClick={() => setIsExported(true)} className='connect_btn'>Export to XLS</Button>
            </Col> :
            <Col lg={4} sm={12}>
              <Button onClick={(e) => handleMetadata(e, '2')} className='connect_btn'>Add metadata</Button>
            </Col>}
        </Row>
      </>}
    </>
  )
}

export default MysqlFormForConnection 