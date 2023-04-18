import React, { useContext, useState } from "react";
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
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { daysSincePublish } from "../NewOnboarding/utils";
import { Badge } from "antd";
const RequestCardForApprovalOrReject = (props) => {
  const { data, setApprovalStatus, approvalStatus } = props;
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [toDate, setToDate] = useState(null);

  const SubmitHandler = (condition, usagePolicyId) => {
    callLoader(true);
    let url =
      UrlConstant.base_url + "datahub/usage_policies/" + usagePolicyId + "/";
    let method = "PATCH";
    let payload;
    if (condition == "approved") {
      payload = {
        approval_status: condition,
        accessibility_time: new Date(toDate).toISOString().substring(0, 10),
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
        setToDate(null);
      })
      .catch((error) => {
        callLoader(false);
        callToast("Request unsuccessfull", "error", true);
        // console.log(error);
      });
  };

  const handleToDate = (value) => {
    setToDate(value);
    // console.log(value);
  };

  return (
    <>
      <Row className="mt-20">
        <Col lg={12} md={12} sm={12}>
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
      </Row>
      {data?.map((eachDatasetFile, index) => {
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
                                eachUsagePolicy.approval_status == "rejected"
                                  ? false
                                  : true
                              }
                              inputFormat="dd/MM/yyyy"
                              placeholder="Till"
                              label="Till"
                              value={toDate}
                              onChange={(value) => handleToDate(value)}
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
                              disabled={toDate ? false : true}
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
