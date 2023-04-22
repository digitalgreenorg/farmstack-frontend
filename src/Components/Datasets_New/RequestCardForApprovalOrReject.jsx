import React, { useContext, useEffect, useState } from "react";
import global_style from "../../Assets/CSS/global.module.css";
import local_style from "./request_card.module.css";
import { Col, Row } from "react-bootstrap";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { daysSincePublish } from "../NewOnboarding/utils";
import { Badge } from "antd";
const RequestCardForApprovalOrReject = (props) => {
  const { data, setApprovalStatus, approvalStatus } = props;
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [toDate, setToDate] = useState({});
  const [requestToShow, setRequestsToShow] = useState([]);
  const SubmitHandler = (condition, usagePolicyId) => {
    callLoader(true);
    let url =
      UrlConstant.base_url + "datahub/usage_policies/" + usagePolicyId + "/";
    let method = "PATCH";
    let payload;
    if (condition == "approved") {
      payload = {
        approval_status: condition,
        accessibility_time: toDate[usagePolicyId]
          ? new Date(toDate[usagePolicyId]).toISOString().substring(0, 10)
          : null,
      };
    } else {
      payload = { approval_status: condition };
    }
    HTTPService(method, url, payload, false, true, false, false)
      .then((response) => {
        callLoader(false);
        // console.log(response);
        callToast("Request successfull", "success", true);
        setApprovalStatus(!approvalStatus);
        // setToDate([]);
      })
      .catch((error) => {
        callLoader(false);
        callToast("Request unsuccessfull", "error", true);
        // console.log(error);
      });
  };
  const [filter, setFilter] = useState("all");
  const [filterOptions, setFilterOptions] = useState([
    { label: "All", value: "all" },
    { label: "Approved", value: "approved" },
    { label: "Pending", value: "requested" },
    { label: "Rejected", value: "rejected" },
  ]);
  const handleFilterChange = (event, filterSelected) => {
    setFilter(filterSelected);
    console.log(data, "data");
    if (filterSelected == "all" || !filterSelected) {
      console.log(filterSelected, data);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i]?.accessibility == "private") {
          arr = [...arr, data[i]];
        }
      }
      // console.log(arr);
      setRequestsToShow([...arr]);
      return;
    }
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].accessibility == "private") {
        let obj = { ...data[i] };
        let eachArr = obj["usage_policy"].filter((eachUsagePolicy, index) => {
          console.log(eachUsagePolicy.approval_status, filterSelected);
          return eachUsagePolicy.approval_status == filterSelected;
        });
        obj["usage_policy"] = [...eachArr];
        arr.push(obj);
      }
    }
    setRequestsToShow([...arr]);
  };
  const handleToDate = (value, policyId) => {
    let allDates = { ...toDate, [policyId]: value };
    setToDate({ ...allDates });
    console.log(allDates);
  };

  useEffect(() => {
    console.log("use Effect calling");
    if (filter == "all" || !filter) {
      console.log(filter, data);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i]?.accessibility == "private") {
          arr = [...arr, data[i]];
        }
      }
      // console.log(arr);
      setRequestsToShow([...arr]);
      return;
    }
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].accessibility == "private") {
        let obj = { ...data[i] };
        let eachArr = obj["usage_policy"].filter((eachUsagePolicy, index) => {
          console.log(eachUsagePolicy.approval_status, filter);
          return eachUsagePolicy.approval_status == filter;
        });
        obj["usage_policy"] = [...eachArr];
        arr.push(obj);
      }
    }
    setRequestsToShow([...arr]);
  }, [data]);

  return (
    <>
      {data?.length > 0 && (
        <Row className="mt-20">
          <Col lg={6} md={12} sm={12}>
            <div
              className={
                global_style.bold600 +
                " " +
                global_style.size32 +
                " " +
                local_style.text_left
              }
            >
              List of requests
            </div>
          </Col>
          <Col lg={6} md={12} sm={12} style={{ textAlign: "right" }}>
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilterChange}
              aria-label="text alignment"
              sx={{
                textTransform: "capitalize",
                "& .Mui-selected": {
                  backgroundColor: "#00ab55 !important",
                  color: "white !important",
                  // textTransform: "none !important",
                },
              }}
            >
              {filterOptions.map((eachFilter, index) => {
                return (
                  <ToggleButton
                    value={eachFilter.value}
                    aria-label="left aligned"
                  >
                    {eachFilter.label}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Col>
        </Row>
      )}
      {requestToShow?.map((eachDatasetFile, index) => {
        if (eachDatasetFile?.accessibility == "private")
          return (
            <span>
              {eachDatasetFile?.usage_policy.map(
                (eachUsagePolicy, usagePolicyIndex) => {
                  return (
                    <Box className={local_style.request_card}>
                      <Badge.Ribbon
                        text={
                          eachUsagePolicy.approval_status == "rejected"
                            ? "Rejected"
                            : eachUsagePolicy.approval_status == "approved"
                            ? "Approved"
                            : "Pending"
                        }
                        color={
                          eachUsagePolicy.approval_status == "rejected"
                            ? "#ff5630"
                            : eachUsagePolicy.approval_status == "approved"
                            ? "#00ab55"
                            : "yellow"
                        }
                      >
                        <Row>
                          <Col
                            lg={6}
                            md={12}
                            sm={12}
                            className={
                              global_style.bold600 +
                              " " +
                              global_style.size32 +
                              " " +
                              local_style.text_left
                            }
                          >
                            <div>{eachUsagePolicy.organization?.name}</div>
                          </Col>
                          <Col lg={6} md={12} sm={12}>
                            <div
                              className={
                                global_style.bold400 + " " + global_style.size16
                              }
                            >
                              {eachUsagePolicy.approval_status ==
                                "approved" && (
                                <div
                                  style={{
                                    fontStyle: "italic",
                                    textAlign: "right",
                                    paddingRight: "75px",
                                    paddingTop: "5px",
                                  }}
                                >
                                  For{" "}
                                  {daysSincePublish(eachUsagePolicy.updated_at)}{" "}
                                  day
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Badge.Ribbon>
                      <Row className="mt-20">
                        <Col lg={4} md={12} sm={12}>
                          <div
                            className={
                              global_style.bold400 +
                              " " +
                              global_style.size16 +
                              " " +
                              local_style.text_left
                            }
                          >
                            Dataset file name
                          </div>
                          <div
                            className={
                              global_style.bold600 +
                              " " +
                              global_style.size16 +
                              " " +
                              local_style.text_left
                            }
                          >
                            <img
                              src={require("../../Assets/Img/file.svg")}
                              alt=""
                            />{" "}
                            <span className={local_style.link_name}>
                              {eachDatasetFile.file?.split("/").at(-1)}
                            </span>
                          </div>
                        </Col>

                        <Col lg={4} md={12} sm={12}>
                          <div
                            className={
                              global_style.bold400 +
                              " " +
                              global_style.size16 +
                              " " +
                              local_style.text_left
                            }
                          >
                            Request by
                          </div>
                          <div
                            className={
                              global_style.bold600 +
                              " " +
                              global_style.size16 +
                              " " +
                              local_style.text_left
                            }
                          >
                            {eachUsagePolicy.user.first_name}
                          </div>
                          <div
                            className={
                              global_style.bold600 +
                              " " +
                              global_style.size16 +
                              " " +
                              local_style.text_left
                            }
                          >
                            {eachUsagePolicy.user.email}
                          </div>
                        </Col>
                        <Col
                          lg={4}
                          sm={12}
                          md={12}
                          style={{ textAlign: "left" }}
                        >
                          <div
                            className={
                              global_style.bold600 +
                              " " +
                              global_style.size20 +
                              " " +
                              local_style.text_left
                            }
                          >
                            Period
                          </div>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              disabled={
                                eachUsagePolicy.approval_status !== "approved"
                                  ? false
                                  : true
                              }
                              disablePast
                              inputFormat="dd/MM/yyyy"
                              placeholder="Till"
                              label="Till"
                              value={toDate[eachUsagePolicy?.id ?? ""] ?? null}
                              onChange={(value) =>
                                handleToDate(value, eachUsagePolicy.id)
                              }
                              PaperProps={{
                                sx: {
                                  borderRadius: "16px !important",
                                  "& .MuiPickersDay-root": {
                                    "&.Mui-selected": {
                                      backgroundColor: "#007B55 !important",
                                    },
                                  },
                                },
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  id="filled-basic"
                                  variant="outlined"
                                  sx={{
                                    width: "300px",
                                    svg: { color: "#00AB55" },
                                    "& .MuiInputBase-input": {
                                      height: "20px",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                      "& fieldset": {
                                        borderColor: "#919EAB !important",
                                      },
                                      "&:hover fieldset": {
                                        borderColor: "#919EAB",
                                      },
                                      "&.Mui-focused fieldset": {
                                        borderColor: "#919EAB",
                                      },
                                    },
                                  }}
                                  required={
                                    eachUsagePolicy.approval_status ==
                                    "approved"
                                      ? false
                                      : true
                                  }
                                  helperText={
                                    <Typography
                                      sx={{
                                        fontFamily: "Montserrat !important",
                                        fontWeight: "400",
                                        fontSize: "12px",
                                        lineHeight: "18px",
                                        color: "#FF0000",
                                        textAlign: "left",
                                      }}
                                    >
                                      {/* {!validator &&
                                      (!fromDate !== null ||
                                        !fromDate !== undefined ||
                                        !fromDate !== "")
                                        ? ""
                                        : "Please enter the start date of the data capture interval."} */}
                                    </Typography>
                                  }
                                />
                              )}
                              // error={props.dataCaptureStartErrorMessage ? true : false}
                            />
                          </LocalizationProvider>
                        </Col>
                      </Row>
                      <hr className="mt-20" />
                      <Row className="mt-20">
                        <Col
                          lg={6}
                          sm={12}
                          md={12}
                          style={{ textAlign: "left" }}
                        ></Col>
                        <Col
                          lg={6}
                          sm={12}
                          md={12}
                          className={local_style.button_grp}
                        >
                          {eachUsagePolicy.approval_status !== "rejected" && (
                            <Button
                              className={
                                global_style.outlined_button +
                                " " +
                                local_style.reject_button
                              }
                              onClick={() =>
                                SubmitHandler("rejected", eachUsagePolicy.id)
                              }
                            >
                              Reject
                            </Button>
                          )}
                          {eachUsagePolicy.approval_status !== "approved" && (
                            <Button
                              // disabled={toDate ? false : true}
                              className={
                                global_style.primary_button +
                                " " +
                                local_style.approve_button
                              }
                              onClick={() =>
                                SubmitHandler("approved", eachUsagePolicy.id)
                              }
                            >
                              Approve
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Box>
                  );
                }
              )}
            </span>
          );
      })}
    </>
  );
};

export default RequestCardForApprovalOrReject;
