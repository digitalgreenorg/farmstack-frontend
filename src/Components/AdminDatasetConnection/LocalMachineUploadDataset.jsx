import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  GetErrorHandlingRoute,
  getUserMapId,
  GetErrorKey,
  validateInputField,
  handleUnwantedSpace,

} from "../../Utils/Common";
import THEME_COLORS from "../../Constants/ColorConstants";
import RegexConstants from "../../Constants/RegexConstants";
import { useHistory } from "react-router-dom";
import labels from "../../Constants/labels";
import { Button } from 'react-bootstrap'
import HTTPService from "../../Services/HTTPService";
import UrlConstants from "../../Constants/UrlConstants";
import Loader from "../../Components/Loader/Loader"
import Success from "../../Components/Success/Success";
import "./LocalMachineUploadDataset.css"
import "./admin-add-dataset.css"
import CancelIcon from "@mui/icons-material/Cancel";
import { TextField } from "@mui/material";
import UploadDataset from "../Datasets/UploadDataset"
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import { TabContext } from "@mui/lab";
import { FileUploader } from "react-drag-drop-files";
import ConnectionProgressGif from "./ConnectionProgressGif";


const useStyles = {
  btncolor: {
    color: "white",
    "border-color": THEME_COLORS.THEME_COLOR,
    "background-color": THEME_COLORS.THEME_COLOR,
    float: "right",
    "border-radius": 0,
  },
  marginrowtop: { "margin-top": "20px" },
  marginrowtop8px: { "margin-top": "0px" },
};

export default function LocalMachineUploadDataset(props) {
  const { datasetname, setdatasetname, handleMetadata, setLocalUploaded, localUploaded, postgresFileList, mysqlFileList, deleteFunc, cancelForm } = props

  const history = useHistory();
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  // const [datasetname, setdatasetname] = useState("");
  const [uploadFile, setFile] = useState([]);
  const [fileValid, setfileValid] = useState("");
  const [datasetNameError, setDatasetNameError] = useState(null);
  const [datasetFileError, setDataSetFileError] = useState(null)
  //   loader
  const [isLoader, setIsLoader] = useState(false);
  //   success screen
  const [isSuccess, setisSuccess] = useState(false);
  const fileTypes = ["XLS", "xlsx", "CSV", "PDF", "JPEG", "JPG", "PNG", "TIFF"]
  const [value, setValue] = useState("1");

  useEffect(() => {
    setdatasetname(datasetname);
    setFile(uploadFile)
  }, [datasetname, uploadFile])

  const handleAddDatasetFile = (currentFileList) => {
    console.log("clicked on add dataset submit btn11");
    setIsLoader(true)
    setfileValid(null);
    var bodyFormData = new FormData();
    bodyFormData.append("dataset_name", datasetname)
    //  var fileList = [...uploadFile]
    //  console.log(fileList)
    currentFileList.forEach(item => {
      bodyFormData.append("datasets", item)
    });
    bodyFormData.append("source", "file")
    HTTPService(
      "POST",
      UrlConstants.base_url + UrlConstants.dataseteth,
      bodyFormData,
      true,
      true
    ).then((response) => {
      setIsLoader(false)
      setLocalUploaded([...localUploaded, ...response.data.datasets])
      // setLocalUploaded([response.datasets])
      console.log("files uploaded");
    }).catch((e) => {
      setIsLoader(false);
      console.log(e);
      var returnValues = GetErrorKey(e, bodyFormData.keys());
      var errorKeys = returnValues[0];
      var errorMessages = returnValues[1];
      if (errorKeys.length > 0) {
        for (var i = 0; i < errorKeys.length; i++) {
          switch (errorKeys[i]) {
            case "dataset_name":
              setDatasetNameError(errorMessages[i]);
              break;
            case "datasets":
              setDataSetFileError(errorMessages[i]);
              break;
            default:
              history.push(GetErrorHandlingRoute(e));
              break;
          }
        }
      } else {
        history.push(GetErrorHandlingRoute(e));
      }
    });
  };

  const handleDeleteDatasetList = (filename, source, datasetname) => {
    var bodyFormData = new FormData();

    bodyFormData.append("file_name", filename)
    bodyFormData.append("dataset_name", datasetname)
    bodyFormData.append("source", source)
    HTTPService(
      "DELETE",
      UrlConstants.base_url + UrlConstants.dataseteth,
      bodyFormData,
      true,
      true
    )
      .then((response) => {
        console.log("FILE DELETED!");
        if (response.status === 204) {
          console.log("file deleted")
          var filteredArray = uploadFile.filter((item) => item.name !== filename)
          setFile(filteredArray)
          setLocalUploaded(filteredArray)
        }
        // setFile(null)
      })
      .catch((e) => {
        setIsLoader(false);
        console.log(e);
        history.push(GetErrorHandlingRoute(e));
      }
      );
  };

  const handleFileChange = (fileIncoming) => {
    var currentFileList = [...uploadFile, ...fileIncoming]
    if (setdatasetname != null) {
      setFile(currentFileList)
      handleAddDatasetFile(currentFileList)
      currentFileList = []
      setFile([])
      console.log(currentFileList);
    } else {
      console.log("no dataset name given")
    };

    setfileValid("");

  };
  // const handleResetForm = () => {
  //   setdatasetname("")
  //   var bodyFormData = new FormData();
  //   bodyFormData.append("dataset_name", datasetname)
  //   HTTPService(
  //     "DELETE",
  //     UrlConstants.base_url + UrlConstants.datasetethcancel,
  //     bodyFormData,
  //     true,
  //     true
  //   )
  //     .then((response) => {
  //       console.log("FILE DELETED!");
  //       if (response.status === 204) {
  //         setFile(response.data)
  //         setdatasetname("")
  //         history.push("/datahub/datasets")
  //       }
  //       // setFile(null)
  //     })
  //     .catch((e) => {
  //       setIsLoader(false);
  //       console.log(e);
  //       history.push(GetErrorHandlingRoute(e));
  //     }
  //     );
  // };
  return (
    <>
      {/* {isLoader ? <Loader /> : ""} */}
      {isSuccess ? (
        <Success
          okevent={() => history.push("/datahub/datasets")}
          route={"datahub/participants"}
          imagename={"success"}
          btntext={"ok"}
          heading={"You added a new dataset"}
          imageText={"Added Successfully!"}
          msg={"Your dataset added in database."}
        ></Success>
      ) : (
        <div noValidate autoComplete="off">
          <Row style={{ height: "236px" }}>
            <Col xs={12} sm={12} md={12} lg={6}>
              <span className="AddDatasetmainheading">{props.title}</span>
              <FileUploader
                handleChange={handleFileChange}
                disabled={!datasetname}
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
            <Col xs={12} sm={12} md={12} lg={6}>
              <ConnectionProgressGif loader={isLoader} datasetname={datasetname} deleteFunc={deleteFunc} postgresFileList={postgresFileList} mysqlFileList={mysqlFileList} localUploaded={localUploaded} />
            </Col>
          </Row>
          <Row >
            <p className="oversizemb-uploadimglogo">
              {uploadFile != null &&
                uploadFile.size > 52428800
                ? `File uploaded is more than 50MB!`
                : ""}
              {fileValid}
            </p>
          </Row>

          {/* <Row> */}
          {/* <Col xs={12} sm={12} md={6} lg={6}>
              {
                (localUploaded?.length !== 0) &&
                  datasetname
                  ?
                  (
                    <Button
                      className="connect_btn"
                      type="submit"
                      onClick={(e) => handleMetadata(e, '2')}
                    >
                      Add metadata
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="connect_btn"
                    >
                      Add metadata
                    </Button>
                  )}
            </Col> */}
          {/* </Row> */}
          <Row style={useStyles.marginrowtop8px}>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button
                onClick={() => cancelForm()}
                className="connect_btn"
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

