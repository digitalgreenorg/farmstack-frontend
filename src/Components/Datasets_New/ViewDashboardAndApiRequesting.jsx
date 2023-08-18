import React, { useContext, useEffect, useState } from "react";
import CustomSeparator from "../Table/BreadCrumbs";
import TopNavigationWithToggleButtons from "../Table/TopNavigationWithToggleButtons";
import { Col, Row } from "react-bootstrap";
import ApiRequest from "./API's/ApiRequest";
import Dashboard from "../../Views/Pages/Dashboard";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import style from "./style.module.css";
import NormalDataTable from "../Table/NormalDataTable";
import UrlConstant from "../../Constants/UrlConstants";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom";

import HTTPService from "../../Services/HTTPService";
import { getUserMapId } from "../../Utils/Common";
import { FarmStackContext } from "../Contexts/FarmStackContext";

const ViewDashboardAndApiRequesting = () => {
  const {
    callLoader,
    allDatasetFilesAsPerUsagePolicy,
    setAllDatasetFilesAsPerUsagePolicy,
    setSelectedFileDetails,
  } = useContext(FarmStackContext);

  const { datasetid } = useParams();

  const [activeTab, setActiveTab] = useState("0");
  const [refetcher, setRefetcher] = useState(true);
  const [fileSelectedIndex, setFileSelectedIndex] = useState(0);
  const [allDatasetFiles, setAllDatasetFiles] = useState([]);
  const [previewJsonForFile, setPreviewForJsonFile] = useState(null);
  const [tabOptions, setTabOptions] = useState([
    { label: "Dashboard", value: "0", component: Dashboard },
    { label: "Data table", value: "1", component: NormalDataTable },
    {
      label: "API's",
      value: "2",
      component: ApiRequest,
    },
  ]);
  const handleFileChange = (val) => {
    setFileSelectedIndex(val);
    setSelectedFileDetails(allDatasetFilesAsPerUsagePolicy[val]);
  };

  const handleTabChange = (e, state) => {
    setActiveTab(state ?? 0);
  };
  // let data = [];

  // const getAllDatasetFiles = () => {
  //   callLoader(true);
  //   let url = UrlConstant.base_url + UrlConstant.datasetview + datasetid + "/";
  //   let method = "GET";
  //   HTTPService(method, url, "", false, true)
  //     .then((response) => {
  //       callLoader(false);
  //       //setting all the files for files
  //       let arrayForFileToHandle = [];
  //       for (let i = 0; i < response.data.datasets.length; i++) {
  //         let eachFile = response.data.datasets[i];
  //         if (
  //           eachFile?.file.endsWith("xls") ||
  //           eachFile?.file.endsWith("xlsx") ||
  //           eachFile?.file.endsWith("csv")
  //         ) {
  //           arrayForFileToHandle.push(eachFile);
  //         }
  //       }
  //       setAllDatasetFiles([...arrayForFileToHandle]);
  //     })
  //     .catch((error) => {
  //       callLoader(false);
  //       console.log(error);
  //     });
  // };

  //get all details at user level
  const getAllDatasetFiles_context = () => {
    callLoader(true);
    let url =
      UrlConstant.base_url +
      UrlConstant.datasetview +
      datasetid +
      "/?user_map=" +
      getUserMapId();
    let method = "GET";
    HTTPService(method, url, "", false, true)
      .then((response) => {
<<<<<<< HEAD
        // callLoader(false);
        console.log(
          "🚀 ~ file: ViewDashboardAndApiRequesting.jsx:81 ~ .then ~ response:",
          response
        );
=======
        callLoader(false);
>>>>>>> 6eb648dae0ee0f9b4fd7c5a818294a9452dc6bb0
        //setting all the files for files
        let arrayForFileToHandle = [];
        for (let i = 0; i < response.data.datasets.length; i++) {
          let eachFile = response.data.datasets[i];
          if (
            eachFile?.file.endsWith("xls") ||
            eachFile?.file.endsWith("xlsx") ||
            eachFile?.file.endsWith("csv")
          ) {
            arrayForFileToHandle.push(eachFile);
          }
        }
        //as per user_map level
        setAllDatasetFilesAsPerUsagePolicy([...arrayForFileToHandle]);
        console.log("calling all with user_map");
        setSelectedFileDetails(arrayForFileToHandle[fileSelectedIndex] ?? null);
      })
      .catch((error) => {
        callLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    //to show the select menu with the file available inside the dataset under which user is exploring for dashboard and api consumption
    // getAllDatasetFiles();
    getAllDatasetFiles_context();
  }, [refetcher]);
  //   useEffect(()=>{
  //     let fileType = allDatasetFiles[fileSelectedIndex]

  // {
  //   //first condition is it should not be guest
  //   (isLoggedInUserAdmin() || isLoggedInUserCoSteward() || isLoggedInUserParticipant() )
  //             ? fileType === "public" || fileType === "registered" || !isOther
  //               ? "Download"
  //               : isOther && !Object.keys(usagePolicy).length
  //               ? "Ask to Download"
  //               : getButtonName()
  //             : fileType === "public"
  //             ? "Download"
  //             : "Login to Download"}
  //   },[])

  let props = {
    selectedFile: fileSelectedIndex,
    data: allDatasetFiles,
    setRefetcher: setRefetcher,
    refetcher: refetcher,
    setPreviewForJsonFile: setPreviewForJsonFile,
    previewJsonForFile: previewJsonForFile,
  };

  return (
    <>
      <Row style={{ margin: "0px 40px" }}>
        <Col lg={6} md={6} sm={6} xl={6}>
          <CustomSeparator
            currentToggle={tabOptions[activeTab ?? 0]?.label}
            lastToggle={"Dataset detail"}
          />
        </Col>
        <Col
          lg={6}
          md={6}
          sm={6}
          xl={6}
          style={{ display: "flex", justifyContent: "end", gap: "25px" }}
        >
          <FormControl
            sx={{ minWidth: 190, maxWidth: 250, textOverflow: "ellipsis" }}
            size="small"
          >
            <InputLabel>Select file</InputLabel>
            <Select
              label="Select file"
              value={fileSelectedIndex}
              onChange={(e) => handleFileChange(e.target.value)}
            >
              {allDatasetFilesAsPerUsagePolicy.map((eachFile, index) => {
                return (
                  <MenuItem key={index} value={index}>
                    {" "}
                    {eachFile.file?.split("/")?.at(-1)}
                  </MenuItem>
                );
              })}

              {/* Add more options */}
            </Select>
          </FormControl>

          <TopNavigationWithToggleButtons
            tabOptions={tabOptions}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleTabChange={handleTabChange}
          />
        </Col>
      </Row>
      <Row style={{ margin: "0px 40px" }}>
        <Col>
          <Typography className={style.title} variant="h6">
            Farmer Profile Dataset
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} xl={12}>
          <>{React.createElement(tabOptions[activeTab].component, props)}</>
        </Col>
      </Row>
    </>
  );
};

export default ViewDashboardAndApiRequesting;
