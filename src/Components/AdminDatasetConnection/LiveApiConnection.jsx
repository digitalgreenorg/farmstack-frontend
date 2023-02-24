import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { TextField, InputAdornment, Snackbar, Alert, Chip, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import Axios from 'axios';
import { GetErrorHandlingRoute, getTokenLocal, validateInputField } from "../../Utils/Common";
import Loader from "../Loader/Loader";
import { BodyText } from "react-bootstrap-icons";
import UrlConstant from "../../Constants/UrlConstants";
import ConnectionProgressGif from "./ConnectionProgressGif";
import { UserOutlined } from "@ant-design/icons";
import Person2Icon from '@mui/icons-material/Person2';
import RegexConstants from "../../Constants/RegexConstants";

export default function LiveApiConnection(props) {
  const { isDatasetEditModeOn, LiveApiFileList, setLiveApiFileList, cancelForm, datasetname, deleteFunc, localUploaded, mysqlFileList,
    setPostgresFileList, setMysqlFileList, postgresFileList, setAllFiles, handleMetadata, progress, setProgress, uploadFile, setFile, key, isaccesstoken } = props
  const [apifield, setApifield] = useState("")
  const [authkey, setAuthKey] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isExported, setIsExported] = useState(false)
  const [loader, setLoader] = useState(true)
  const [messageForSnackBar, setMessageForSnackBar] = useState("")
  const [errorOrSuccess, setErrorOrSuccess] = useState("error")
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = useState("")

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

  useEffect(() => {

    setLoader(false)
  }, [])
  const action = (
    <React.Fragment>
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

  const handleconnectLiveAPI = () => {

    var method = "POST"
    setLoader(true)
    let bodyFormData = new FormData()
    bodyFormData.append("dataset_name", datasetname)
    bodyFormData.append("file_name", fileName)
    bodyFormData.append("source", "live_api")
    bodyFormData.append("api_key", "Bearer "+ authkey)
    bodyFormData.append("url", apifield)
    let accesstoken = isaccesstoken || getTokenLocal();
    let url = ""
    if (isDatasetEditModeOn) {
      url = UrlConstant.base_url + UrlConstant.live_api + "?dataset_exists=True"
    } else {
      url = UrlConstant.base_url + UrlConstant.live_api
    }
    Axios({
      method: method,
      url,
      data: bodyFormData,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accesstoken,
      },
    }).then((response) => {
      console.log(response)
      setLoader(false)
      setMessageForSnackBar("File exported successfully!")
      setErrorOrSuccess("success")
      handleClick()
      setLiveApiFileList(response.data)
      setIsConnected(true)
    }).catch((error) => {
      console.log(error)
      setLoader(false)
      setMessageForSnackBar("File export failed!")
      setErrorOrSuccess("error")
      handleClick()
      setIsConnected(false)
    })
  }


  return (
    <>
      {loader ? <Loader /> : ""}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
      >
        <Alert autoHideDuration={4000} onClose={handleClose} sx={{ width: '100%' }} severity={errorOrSuccess}>{messageForSnackBar}</Alert>
      </Snackbar>

      <Row>
        <Col lg={6} sm={12} style={{ textAlign: "left" }}>
          Please provide the Live API credentials
        </Col>
      </Row>
      <Row className='textfield_row'>
        <Col lg={6} sm={12}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person2Icon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%", marginTop: "20px" }} id="api"
            value={fileName}
            onChange={(e) => setFileName(e.target.value.trim())}
            label="File name" name='file_name' variant="standard"
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HubOutlinedIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%", marginTop: "20px" }} id="api"
            value={apifield}
            onChange={(e) => setApifield(e.target.value)}
            label="API" name='host_address' variant="standard"
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyOutlinedIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%", marginTop: "20px" }} id="auth_key"
            value={authkey}
            onChange={(e) => setAuthKey(e.target.value)}
            label="Authentication Key" name='host_address' variant="standard" />
          <Col lg={6} sm={12} className='textfield_row' style={{ "marginTop": "100px", "marginLeft": "-10px" }}>
            <Button
              id='connect_btn_id'
              disabled={(apifield && authkey && fileName) ? false : true}
              className='connect_btn green_btn_for_connect'
              onClick={() => { handleconnectLiveAPI() }}
              style={{ width: "180%", marginRight: "-25px" }}
            >
              Fetch data </Button>
          </Col>
        </Col>
        <Col>
          <ConnectionProgressGif LiveApiFileList={LiveApiFileList} setLiveApiFileList={setLiveApiFileList}
            cancelForm={cancelForm}
            datasetname={datasetname}
            deleteFunc={deleteFunc}
            localUploaded={localUploaded}
            mysqlFileList={mysqlFileList} setMysqlFileList={setMysqlFileList} postgresFileList={postgresFileList} setPostgresFileList={setPostgresFileList}
            setAllFiles={setAllFiles} handleMetadata={handleMetadata}
            progress={progress} setProgress={setProgress} uploadFile={uploadFile} setFile={setFile} key={key} />

        </Col>

      </Row>
    </>
  )
}