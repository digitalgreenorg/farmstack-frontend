import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataSetForm from "../../../Components/Datasets/DataSetForm";
import {
  GetErrorHandlingRoute,
  getUserMapId,
  GetErrorKey,
  validateInputField,
  handleUnwantedSpace,
  fileUpload

} from "../../../Utils/Common";
import axios from "axios"
import THEME_COLORS from "../../../Constants/ColorConstants";
import RegexConstants from "../../../Constants/RegexConstants";
import { useHistory } from "react-router-dom";
import labels from "../../../Constants/labels";
import Button from "@mui/material/Button";
import HTTPService from "../../../Services/HTTPService";
import UrlConstants from "../../../Constants/UrlConstants";
import Loader from "../../../Components/Loader/Loader";
import Success from "../../../Components/Success/Success";
import $ from "jquery";
import { ContactlessOutlined } from "@mui/icons-material";
import { keys } from "@mui/system";


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

export default function AddDataset(props) {
  const history = useHistory();
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  const [datasetname, setdatasetname] = useState("");
  const [uploadFile, setFile] = useState([]);
  const [fileValid, setfileValid] = useState("");
  const [datasetNameError, setDatasetNameError] = useState(null);
  const [datasetFileError, setDataSetFileError] = useState(null)
  //   loader
  const [isLoader, setIsLoader] = useState(false);
  //   success screen
  const [isSuccess, setisSuccess] = useState(false);

  useEffect(() => {
    setdatasetname(datasetname);
    setFile(uploadFile)
  }, [datasetname, uploadFile])

  const handleAddDatasetFile = (currentFileList) => {
    console.log("clicked on add dataset submit btn11");
    setfileValid(null);
    var bodyFormData = new FormData();
    bodyFormData.append( "dataset_name", datasetname)
    //  var fileList = [...uploadFile]
    //  console.log(fileList)
    currentFileList.forEach(item => {
      bodyFormData.append( "datasets", item )});
    bodyFormData.append("source" , "file")
    HTTPService(
      "POST",
      UrlConstants.base_url + UrlConstants.dataseteth,
      bodyFormData,
      true,
      true
    ).then((response) => {
      setIsLoader(false)
      console.log("files uploaded");
    }).catch((e) => {
          setIsLoader(false);
          console.log(e);
          var returnValues = GetErrorKey(e, bodyFormData.keys());
          var errorKeys = returnValues[0];
          var errorMessages = returnValues[1];
          if (errorKeys.length > 0) {
            for (var i = 0; i < errorKeys.length; i++) {
              switch (errorKeys[i]) { case "dataset_name":
              setDatasetNameError(errorMessages[i]);
              break;
            case "datasets":
              setDataSetFileError(errorMessages[i]);
              break;
              default:
                history.push(GetErrorHandlingRoute(e));
                break;}
            } 
          } else {
          history.push(GetErrorHandlingRoute(e));
          } 
        });
    };

  const handleDeleteDatasetList = (filename, item) => {
    var bodyFormData = new FormData();
   
    bodyFormData.append("file_name", filename )
    bodyFormData.append ("dataset_name", datasetname)
    bodyFormData.append("source", "file")
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
        var filteredArray= uploadFile.filter((item) => item.name !== filename)
        setFile(filteredArray)
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
    var currentFileList =  [...uploadFile, ...fileIncoming]
    if (setdatasetname != null) {
    setFile(currentFileList)
    handleAddDatasetFile(currentFileList)
    console.log(currentFileList);
    }else {
      console.log("no dataset name given")
    };
    
    setfileValid("");
    
  };
  const handleChangedatasetname = (e) => {
    validateInputField(e.target.value, RegexConstants.connector_name)
      ? setdatasetname(e.target.value)
      : e.preventDefault();
  };
  const handledatasetnameKeydown = (e) => {
    handleUnwantedSpace(datasetname, e);
  };
  const handleResetForm = () => {
    setdatasetname("")
    var bodyFormData = new FormData();
     bodyFormData.append ("dataset_name", datasetname)
    HTTPService(
      "DELETE",
      UrlConstants.base_url + UrlConstants.datasetethcancel,
      bodyFormData,
      true,
      true
    )
      .then((response) => {
        console.log("FILE DELETED!");
        if (response.status === 204) {
          setFile(response.data)
           setdatasetname("")
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
  return (
    <>
      {isLoader ? <Loader /> : ""}
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
          <DataSetForm
          handleAddDatasetFile={handleAddDatasetFile}
          handleChangedatasetname={handleChangedatasetname}
          handledatasetnameKeydown={handledatasetnameKeydown}
          handleDeleteDatasetList={handleDeleteDatasetList}
          datasetNameError={datasetNameError}
          datasetFileError={datasetFileError}
          datasetname={datasetname}
            title={"Add Dataset"}
           handleFileChange={handleFileChange}
            uploadFile={uploadFile}
            fileValid={fileValid}
            // handleResetForm={handleResetForm}
          />

          <Row>
            <Col xs={12} sm={12} md={6} lg={3}></Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              {
              (uploadFile.length !== 0 )&& 
              datasetname
              ? 
                (
                <Button
                  onClick={""}
                  variant="contained"
                  className="submitbtn"
                  type="submit"
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  disabled
                  className="disbalesubmitbtn"
                >
                  Next
                </Button>
              )}
            </Col>
          </Row>
          <Row style={useStyles.marginrowtop8px}>
            <Col xs={12} sm={12} md={6} lg={3}></Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button
                onClick={()=> handleResetForm()}
                variant="outlined"
                className="cancelbtn"
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

