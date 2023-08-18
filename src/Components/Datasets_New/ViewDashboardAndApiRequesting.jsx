import React, { useContext, useEffect, useState } from "react";
import CustomSeparator from "../Table/BreadCrumbs";
import TopNavigationWithToggleButtons from "../Table/TopNavigationWithToggleButtons";
import { Col, Container, Row } from "react-bootstrap";
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
  const { callLoader, callToast } = useContext(FarmStackContext);

  const history = useHistory();
  const { datasetid } = useParams();
  // let data = [
  //   {
  //     file_id: "file_3478",
  //     dataset_name: "Customer Records",
  //     file_name: "customer_data.csv",
  //     api_key: "a1b2c3d4e5f6",
  //   },
  //   {
  //     file_id: "file_5821",
  //     dataset_name: "Product Inventory",
  //     file_name: "inventory_list.xlsx",
  //     api_key: "p8q7r9s2t4u3",
  //   },
  //   {
  //     file_id: "file_1496",
  //     dataset_name: "Financial Transactions",
  //     file_name: "transactions_data.csv",
  //     api_key: "",
  //   },
  //   {
  //     file_id: "file_7623",
  //     dataset_name: "Sensor Readings",
  //     file_name: "sensor_readings.json",
  //     api_key: "s6e5n4s3o2r1",
  //   },
  //   {
  //     file_id: "file_9235",
  //     dataset_name: "Employee Directory",
  //     file_name: "employee_records.xlsx",
  //     api_key: "",
  //   },
  // ];
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
  };

  const handleTabChange = (e, state) => {
    setActiveTab(state ?? 0);
  };
  // let data = [];

  const getAllDatasetFiles = () => {
    callLoader(true);

    let url = UrlConstant.base_url + UrlConstant.datasetview + datasetid + "/";
    console.log(url, "url");
    let method = "GET";
    HTTPService(method, url, "", false, true)
      .then((response) => {
        // callLoader(false);
        console.log(
          "🚀 ~ file: ViewDashboardAndApiRequesting.jsx:81 ~ .then ~ response:",
          response
        );
        //setting all the files for files
        setAllDatasetFiles([...response.data.datasets]);
      })
      .catch((error) => {
        callLoader(false);

        console.log(error);
      });
  };

  useEffect(() => {
    //to show the select menu with the file available inside the dataset under which user is exploring for dashboard and api consumption
    getAllDatasetFiles();
  }, [refetcher]);
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
              {allDatasetFiles.map((eachFile, index) => {
                if (
                  eachFile?.file.endsWith("xls") ||
                  eachFile?.file.endsWith("xlsx") ||
                  eachFile?.file.endsWith("csv")
                ) {
                  return (
                    <MenuItem key={index} value={index}>
                      {" "}
                      {eachFile.file?.split("/")?.at(-1)}
                    </MenuItem>
                  );
                }
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
