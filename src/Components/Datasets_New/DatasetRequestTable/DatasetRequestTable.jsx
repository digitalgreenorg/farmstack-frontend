import React, { useContext, useEffect, useState } from "react";
import UrlConstant from "../../../Constants/UrlConstants";
import HTTPService from "../../../Services/HTTPService";
import { useHistory } from "react-router-dom";
import {
  GetErrorHandlingRoute,
  GetErrorKey,
  getUserMapId,
} from "../../../Utils/Common";
import { FarmStackContext } from "../../Contexts/FarmStackContext";
import { Col, Container, Row } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./dataset_request_table.module.css";
import global_styles from "../../../Assets/CSS/global.module.css";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { CSSTransition } from "react-transition-group";
import { Badge, Popconfirm, Switch } from "antd";

const DatasetRequestTable = () => {
  const { isLoading, toastDetail, callLoader, callToast } =
    useContext(FarmStackContext);
  const [showRequestSent, setShowRequestSent] = useState(false);
  const [allRequestSentList, setAllRequestSentList] = useState([]);
  const [allRequestReceivedList, setAllRequestReceivedList] = useState([]);
  const [confirmIndex, setConfirmIndex] = useState(-1);
  const [requestSentColumns, setRequestSentColumns] = useState([]);
  const [requestReceivedColumns, setRequestReceivedColumns] = useState([]);
  const [toDate, setToDate] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleToDate = (value) => {
    setToDate(value);
  };
  const confirm = (condition, usagePolicyId) => {};

  const showPopconfirm = (index) => {
    setOpen(true);
    setConfirmIndex(index);
  };

  const handleOk = (condition, usagePolicyId) => {
    setConfirmLoading(true);

    SubmitHandler(condition, usagePolicyId);
  };

  const handleCancel = () => {
    setConfirmIndex(-1);
    setOpen(false);
  };

  const getAllRequestList = () => {
    let url =
      UrlConstant.base_url + "datahub/new_dataset_v2/requested_datasets/";
    let method = "POST";
    let payload = { user_map: getUserMapId() };

    HTTPService(method, url, payload, false, true, false, false, false)
      .then((response) => {
        callLoader(false);
        setAllRequestSentList(response?.data?.sent);
        setAllRequestReceivedList(response?.data?.recieved);
      })
      .catch(async (error) => {
        callLoader(false);
        let response = await GetErrorHandlingRoute(error);
        console.log(response, "response");
        if (response?.toast) {
          //callToast(message, type, action)
          callToast(
            response?.message ?? response?.data?.detail,
            response.status == 200 ? "success" : "error",
            response.toast
          );
        } else {
          history.push(response?.path);
        }
      });
  };

  const SubmitHandler = (condition, usagePolicyId) => {
    // callLoader(true);
    let url =
      UrlConstant.base_url + "datahub/usage_policies/" + usagePolicyId + "/";
    let method = "PATCH";
    let payload;
    if (condition == "approved") {
      payload = {
        approval_status: condition,
        accessibility_time: toDate
          ? new Date(toDate).toISOString().substring(0, 10)
          : null,
      };
    } else {
      payload = { approval_status: condition };
    }
    HTTPService(method, url, payload, false, true, false, false)
      .then((response) => {
        setConfirmLoading(false);
        setOpen(false);
        setConfirmIndex(-1);
        setRefresh(!refresh);
        setToDate(null);
      })
      .catch(async (err) => {
        setConfirmLoading(false);
        setOpen(false);
        setConfirmIndex(-1);
        setRefresh(!refresh);

        var returnValues = GetErrorKey(err, [
          "approval_status",
          "accessibility_time",
        ]);
        var errorKeys = returnValues[0];
        var errorMessages = returnValues[1];
        if (errorKeys.length > 0) {
          for (var i = 0; i < errorKeys.length; i++) {
            switch (errorKeys[i]) {
              case "approval_status":
                callToast(errorMessages[i], "error", true);
                break;
              case "accessibility_time":
                callToast(errorMessages[i], "error", true);
                break;
              default:
                let response = await GetErrorHandlingRoute(err);
                if (response.toast) {
                  //callToast(message, type, action)
                  callToast(
                    response?.message ?? response?.data?.detail ?? "Unknown",
                    response.status == 200 ? "success" : "error",
                    response.toast
                  );
                } else {
                  history.push(response?.path);
                }
                break;
            }
          }
        } else {
          let response = await GetErrorHandlingRoute(err);
          if (response.toast) {
            //callToast(message, type, action)
            callToast(
              response?.message ?? response?.data?.detail ?? "Unknown",
              response.status == 200 ? "success" : "error",
              response.toast
            );
          } else {
            history.push(response?.path);
          }
        }
      });
  };

  useEffect(() => {
    let columnsForSent = [
      "Dataset name",
      "File name",
      "Organization name",
      "Accessibility time",
      "Approval status",
    ];
    let columnsForReceived = [
      "Dataset name",
      "File name",
      "Organization name",
      "Approval status",
      "Accessibility time",
      "Actions",
      "View",
    ];
    // let columnsForReceived = ["dataset_name", "organization_name","approval_status", "accessibility_time", "Action"];
    setRequestReceivedColumns(columnsForReceived);
    setRequestSentColumns(columnsForSent);
  }, [allRequestReceivedList, allRequestSentList]);
  useEffect(() => {
    getAllRequestList();
  }, [refresh, showRequestSent]);
  return (
    <>
      {/* <Container> */}
      <Row>
        <Col
          lg={6}
          sm={12}
          md={12}
          className={
            global_styles.size36 +
            " " +
            global_styles.bold600 +
            " text-left mt-20 mb-20"
          }
        >
          Request {showRequestSent ? "sent" : "received"}
        </Col>
        <Col
          lg={6}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <Typography className={global_styles.bold600}>Requested</Typography>
          <Switch
            style={{ background: "#00ab55" }}
            checked={showRequestSent}
            onChange={setShowRequestSent}
          />
          <Typography className={global_styles.bold600}>Sent</Typography>
        </Col>
      </Row>
      <Row>
        <Col lg={12} sm={12} md={12}></Col>
        <TableContainer component={Paper} style={{}}>
          <CSSTransition
            appear={!showRequestSent}
            in={!showRequestSent}
            timeout={{
              appear: 600,
              enter: 700,
              exit: 100,
            }}
            classNames="step"
            unmountOnExit
          >
            <Table
              sx={{
                "& .MuiTableCell-root": {
                  borderLeft: "1px solid rgba(224, 224, 224, 1)",
                  fontFamily: "Montserrat",
                },
              }}
            >
              <TableHead
                sx={{
                  background: "#F8F8F8 !important",
                  fontFamily: "Montserrat",
                }}
              >
                <TableRow
                  sx={{
                    "& .MuiTableCell-root": {
                      fontFamily: "Montserrat",
                    },
                  }}
                >
                  {requestReceivedColumns.map((eachHead, index) => {
                    return (
                      <TableCell
                        sx={{
                          "& .MuiTableCell-root": {
                            fontFamily: "Montserrat",
                          },
                          textAlign: "center",
                          alignItems: "center",
                        }}
                        className={styles.file_table_column}
                      >
                        {eachHead}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {allRequestReceivedList.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      // "&:last-child td, &:last-child th": { border: 0 },
                      textTransform: "capitalize",
                    }}
                    className={global_styles.bold500}
                  >
                    <TableCell component="th" scope="row">
                      {row.dataset_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.file_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.organization_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.approval_status}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.accessibility_time}
                    </TableCell>
                    {/* <TableCell component="th" scope="row">
                    {row.}
                  </TableCell> */}

                    <TableCell
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                      }}
                      className={styles.table_cell_for_approve_button}
                    >
                      {row.approval_status !== "approved" && (
                        <Popconfirm
                          title={
                            <span
                              style={{
                                color: "#00ab55",
                                textTransform: "none",
                                fontFamily: "Montserrat",
                              }}
                            >
                              Please select the accessibility time
                            </span>
                          }
                          description={
                            <>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DatePicker
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
                                      disabled
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
                                        ></Typography>
                                      }
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "right",
                                  alignItems: "center",
                                  gap: "20px",
                                  marginTop: "20px",
                                }}
                              >
                                <Button
                                  className={global_styles.secondary_button}
                                  onClick={() => handleCancel()}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className={global_styles.primary_button}
                                  onClick={() => handleOk("approved", row.id)}
                                >
                                  Approve
                                </Button>
                              </div>
                            </>
                          }
                          open={open && index == confirmIndex}
                          onOpenChange={() => console.log("open change")}
                          okButtonProps={{
                            ghost: true,
                            type: "text",
                            disabled: true,
                          }}
                          okText={<></>}
                          showCancel={false}
                          className={styles.ant_buttons}
                        >
                          <Button
                            style={{
                              border: "1px solid #00ab55",
                              color: "#00ab55",
                              // color: "white",
                              textTransform: "none",
                              height: "30px",
                              fontFamily: "Montserrat",
                              width: "150px",
                            }}
                            onClick={() => showPopconfirm(index)}
                          >
                            Approve
                          </Button>{" "}
                        </Popconfirm>
                      )}
                      {row.approval_status !== "rejected" && (
                        <Button
                          style={{
                            border: "1px solid #ff5630",
                            color: "#ff5630",
                            // color: "white",
                            textTransform: "none",
                            height: "30px",
                            width: "150px",
                            fontFamily: "Montserrat",
                          }}
                          onClick={() => SubmitHandler("rejected", row.id)}
                        >
                          Reject
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={global_styles.primary_color}
                        onClick={() =>
                          history.push(
                            "/datahub/new_datasets/view/" + row.dataset_id + "/"
                          )
                        }
                        style={{
                          cursor: "pointer",
                          fontFamily: "Montserrat",
                          textAlign: "center",
                        }}
                      >
                        Detail
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CSSTransition>
          <CSSTransition
            appear={showRequestSent}
            in={showRequestSent}
            timeout={{
              appear: 600,
              enter: 700,
              exit: 100,
            }}
            classNames="step"
            unmountOnExit
          >
            <Table
              sx={{
                "& .MuiTableCell-root": {
                  borderLeft: "1px solid rgba(224, 224, 224, 1)",
                  fontFamily: "Montserrat",
                },
              }}
            >
              <TableHead
                sx={{
                  background: "#F8F8F8 !important",
                  fontFamily: "Montserrat",
                }}
              >
                <TableRow>
                  {requestSentColumns.map((eachHead, index) => {
                    return (
                      <TableCell
                        sx={{
                          "& .MuiTableCell-root": {
                            fontFamily: "Montserrat",
                          },
                          alignItems: "center",
                          textAlign: "center",
                        }}
                        className={styles.file_table_column}
                      >
                        {eachHead}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {allRequestSentList.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      // "&:last-child td, &:last-child th": { border: 0 },
                      textTransform: "capitalize",
                    }}
                    className={global_styles.bold500}
                  >
                    <TableCell component="th" scope="row">
                      {row.dataset_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.file_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.organization_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.accessibility_time}
                    </TableCell>

                    <TableCell
                      style={{
                        color:
                          row.approval_status == "rejected"
                            ? "#ff5630"
                            : row.approval_status == "approved"
                            ? "#00ab55"
                            : "#c09507",
                        textAlign: "center",
                      }}
                      component="th"
                      scope="row"
                    >
                      <Badge
                        style={{
                          backgroundColor:
                            row.approval_status == "rejected"
                              ? "#ff5630"
                              : row.approval_status == "approved"
                              ? "#00ab55"
                              : "#faad14",
                        }}
                        count={row.approval_status}
                      ></Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CSSTransition>
        </TableContainer>
      </Row>
      {/* </Container> */}
    </>
  );
};

export default DatasetRequestTable;