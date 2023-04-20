import React, { useContext, useEffect, useState } from "react";
import UrlConstant from "../../../Constants/UrlConstants";
import HTTPService from "../../../Services/HTTPService";
import { useHistory } from "react-router-dom";
import { GetErrorHandlingRoute, getUserMapId } from "../../../Utils/Common";
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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { CSSTransition } from "react-transition-group";
import { Popconfirm } from "antd";

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
        accessibility_time: new Date(toDate).toISOString().substring(0, 10),
      };
    } else {
      payload = { approval_status: condition };
    }
    HTTPService(method, url, payload, false, true, false, false)
      .then((response) => {
        setConfirmLoading(false);
        setOpen(false);
        setConfirmIndex(-1);
        // callLoader(false);
        // console.log(response);
        // callToast("Re", "success", true);
        // setApprovalStatus(!approvalStatus);
        setRefresh(!refresh);
        setToDate(null);
      })
      .catch((error) => {
        setConfirmLoading(false);
        setOpen(false);
        setConfirmIndex(-1);
        // callLoader(false);
        setRefresh(!refresh);
        callToast("Request unsuccessfull", "error", true);
        // console.log(error);
      });
  };

  useEffect(() => {
    let columnsForSent = [
      "Dataset name",
      "Organization name",
      "Approval status",
      "Accessibility time",
    ];
    let columnsForReceived = [
      "Dataset name",
      "Organization name",
      "Approval status",
      "Accessibility time",
      "Actions",
    ];
    // let columnsForReceived = ["dataset_name", "organization_name","approval_status", "accessibility_time", "Action"];
    setRequestReceivedColumns(columnsForReceived);
    setRequestSentColumns(columnsForSent);
  }, [allRequestReceivedList, allRequestSentList]);
  useEffect(() => {
    getAllRequestList();
  }, [refresh]);
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
          <Typography>Requested</Typography>
          <Switch
            checked={showRequestSent}
            onChange={(e) => setShowRequestSent(e.target.checked)}
            // inputProps={{ "aria-label": "ant design" }}
          />
          <Typography>Sent</Typography>
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
                        justifyContent: "left",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      {row.approval_status !== "approved" && (
                        <Popconfirm
                          title="Please select the accessibility time"
                          description={
                            <>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DatePicker
                                  // disabled={
                                  //   eachUsagePolicy.approval_status ==
                                  //   "rejected"
                                  //     ? false
                                  //     : true
                                  // }
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
                            </>
                          }
                          open={open && index == confirmIndex}
                          onConfirm={() => handleOk("approved", row.id)}
                          onOpenChange={() => console.log("open change")}
                          onCancel={() => handleCancel()}
                          okButtonProps={{ loading: confirmLoading }}
                          okText="Accept"
                          cancelText="Cancel"
                        >
                          <Button
                            style={{
                              border: "1px solid #00ab55",
                              color: "#00ab55",
                              // color: "white",
                              textTransform: "none",
                              height: "30px",
                              fontFamily: "Montserrat",
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
                        style={{ cursor: "pointer", fontFamily: "Montserrat" }}
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
