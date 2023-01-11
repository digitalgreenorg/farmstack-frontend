import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./DataSetForm.css";
import UploadDataset from "./UploadDataset";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import { FileUploader } from "react-drag-drop-files";
import CancelIcon from "@mui/icons-material/Cancel";
import { TextField } from "@mui/material";
import labels from "../../Constants/labels";


export default function DataSetForm(props) {
  const fileTypes = ["XLS", "xlsx", "CSV", "PDF", "JPEG", "JPG", "PNG", "TIFF"]
  const [value, setValue] = useState("1");
  const [screenlabels, setscreenlabels] = useState(labels["en"]);

  return (
    <Container className="datasetform">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="AddDatasetmainheading">{props.title}</span>
        </Col>
      </Row>
      <Row>
        <Col className="datasetFormTab">
          <Col xs={12} sm={12} md={12} lg={12} className="settingsTabs">
            <Box>
              <TabContext value={value} className="tabstyle">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    //   onChange={handleTabChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Upload dataset" value="1" />
                    <Tab label="Add metadata" value="2" />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </Col>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TextField
             style={{"width" : "1050px"}}
            className="name"
            id="filled-basic"
            variant="filled"
            required
            width="100%"
            value={props.datasetname}
            onKeyDown={props.handledatasetnameKeydown}
            onChange={props.handleChangedatasetname}
            label={screenlabels.dataset.name}
            error={props.nameErrorMessage ? true : false}
            helperText={props.nameErrorMessage}
          />
        </Col>
        </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="uploadfiles">Upload files</span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="headSpace">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} id="FileUploadId">
          <FileUploader
            handleChange={props.handleFileChange}
            disabled={!props.datasetname}
            name="file"
            multiple={true}
            maxSize={50}
            types={fileTypes}
            children={
              <UploadDataset
                uploaddes={`Supports
                XLS, XLSX, CSV, PDF, JPEG, JPG, PNG, TIFF file formats up to 50MB per file
                  `} 
                uploadtitle="Upload Dataset"
              /> 
            }
            classes="fileUpload"
          /> 
        </Col>
      </Row>
      <Row xs={12} sm={12} md={12} lg={12} >
       {props.uploadFile  ?
       ( <ol className="uploaddatasetname" >
        {/* {props.uploadFile.name} */}
         {Object.keys(props.uploadFile).map((key, index) => (
          <li className="uploadList" key={index}> 
          <Row xs={12} sm={12} md={6} lg={6}>
           <Col style={{width: "100px"}}> 
           { props.uploadFile[key].name} 

           </Col>
            
            <Col style={{"marginLeft": "100px" }}>
            {props.uploadFile[key].name &&
            <CancelIcon  
            onClick={()=>props.handleDeleteDatasetList(props.uploadFile[key].name)}/>}
            </Col>
            </Row>
            </li>
        ) )} 
        </ol> )

        :( "" )}
        <p className="oversizemb-uploadimglogo">
          {props.uploadFile != null &&
            props.uploadFile.size > 52428800
            ? `File uploaded is more than 50MB!`
            : ""}
          {props.fileValid}
        </p>
      </Row>
    </Container>
  )
}
