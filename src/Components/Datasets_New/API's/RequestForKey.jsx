import React, { useEffect, useState } from "react";
import HTTPService from "../../../Services/HTTPService";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import GeneratedKeyCopySystem from "./GeneratedKeyCopySystem";
import local_style from "./generate_key_copy_sysytem.module.css";
import { Col, Row } from "react-bootstrap";

let data = [
  {
    file_id: "file_3478",
    dataset_name: "Customer Records",
    file_name: "customer_data.csv",
    api_key: "a1b2c3d4e5f6",
  },
  {
    file_id: "file_5821",
    dataset_name: "Product Inventory",
    file_name: "inventory_list.xlsx",
    api_key: "p8q7r9s2t4u3",
  },
  {
    file_id: "file_1496",
    dataset_name: "Financial Transactions",
    file_name: "transactions_data.csv",
    api_key: "",
  },
  {
    file_id: "file_7623",
    dataset_name: "Sensor Readings",
    file_name: "sensor_readings.json",
    api_key: "s6e5n4s3o2r1",
  },
  {
    file_id: "file_9235",
    dataset_name: "Employee Directory",
    file_name: "employee_records.xlsx",
    api_key: "",
  },
];

const RequestForKey = () => {
  //Main component for handling api request for consumer

  const [listOfAllRequest, setListOfAllRequest] = useState([]);
  const [currentViewingFileForApi, setCurrentViewingFileForApi] = useState(0);
  const getDetailsOfDataset = () => {
    let method = "";
    let url = "";
    HTTPService()
      .then((response) => {
        console.log(response);
        setListOfAllRequest(data);
      })
      .catch((error) => {
        setListOfAllRequest(data);
        console.log(error);
      });
  };
  let mobile;
  useEffect(() => {
    getDetailsOfDataset();
  }, []);
  return (
    <>
      <Row>
        <Col lg={3}>
          <FormControl
            fullWidth
            sx={{ width: mobile ? "100%" : "250px", margin: "10px auto" }}
          >
            <InputLabel>File name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="standardi-seselect-file-name"
              value={currentViewingFileForApi}
              onChange={(e) => setCurrentViewingFileForApi(e.target.value)}
              sx={{
                textAlign: "left",
                color: "rgb(0, 171, 85)",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#919EAB",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#919EAB",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#919EAB",
                },
              }}
              label="File name"
              placeholder="File name"
            >
              {listOfAllRequest?.length > 0 &&
                listOfAllRequest?.map((item, index) => {
                  return (
                    <MenuItem
                      id={`standardise-file-name-${index}`}
                      key={index}
                      value={index}
                    >
                      {item?.file_name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Col>
        <Col lg={6}>
          {listOfAllRequest[currentViewingFileForApi ?? 0]?.api_key && (
            <GeneratedKeyCopySystem
              data={listOfAllRequest[currentViewingFileForApi ?? 0]}
            />
          )}
          {!listOfAllRequest[currentViewingFileForApi ?? 0]?.api_key && (
            <div style={{ margin: "100px auto" }}>
              <div style={{ margin: "30px auto" }}>
                {
                  "You got access for this dataset, copy the API key for further process!"
                }
              </div>

              <Button className={local_style.request_access}>
                Request access
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default RequestForKey;
