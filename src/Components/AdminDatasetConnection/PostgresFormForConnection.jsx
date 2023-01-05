import { Checkbox, FormControl, FormControlLabel, FormGroup, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import StorageIcon from '@mui/icons-material/Storage';
import FaceIcon from '@mui/icons-material/Face';
import PasswordIcon from '@mui/icons-material/Password';
import LanguageIcon from '@mui/icons-material/Language';
import CableIcon from '@mui/icons-material/Cable';
import NoDatasetCard from '../Datasets/NoDatasetCard';
import Connection from './ConnectionProgressGif';
const PostgresFormForConnection = ({ handleMetadata }) => {
  //state to toggle the form to export state
  const [isConnected, setIsConnected] = useState(false)
  const [isExported, setIsExported] = useState(false)
  const [dbData, setDbData] = useState({
    tables: [
      { name: "dummy1", columns: [{ col_name: "col1" }, { col_name: "col2" }] },
      { name: "dummy2", columns: [{ col_name: "col3" }, { col_name: "col4" }] },
      { name: "dummy3", columns: [{ col_name: "col5" }, { col_name: "col6" }, { col_name: "col7" }] },
    ]
  })
  const [selectedTable, setSelectedTable] = useState({ name: "", columns: [] })
  //Connection establishment to the given database details
  const tryToConnect = () => {
    setIsConnected(true)
  }

  //all tables


  const handleChange = (event) => {
    let arr = dbData?.tables?.filter((eachTable) => eachTable.name == event.target.value)
    console.log(arr)
    setSelectedTable({ name: event.target.value, columns: [...arr[0].columns] });
    console.log(selectedTable)
  };
  return (
    <>
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
            style={{ width: "80%" }} id="standard-basic" label="Database name" variant="standard" />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaceIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="standard-basic" label="User name" variant="standard" />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="standard-basic" label="Password" type={"password"} variant="standard" />

          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="standard-basic" label="Host" variant="standard" />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CableIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="standard-basic" label="Port" variant="standard" />
        </Col>
        <Col lg={4} sm={12}><Connection isConnected={isConnected} /></Col>
      </Row>
        <Row className='textfield_row' >
          <Col lg={6} sm={12}>
            <Button className='connect_btn' onClick={tryToConnect}>Connect</Button>
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
            <FormGroup>
              {selectedTable?.columns.map((eachCol, index) => {
                console.log(eachCol)
                return <FormControlLabel key={index} control={<Checkbox />} label={eachCol.col_name} />
              })}
            </FormGroup>
            <TextField style={{ width: "80%" }} id="standard-basic" label="Export file name" variant="standard" />

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

export default PostgresFormForConnection 