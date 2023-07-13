import React, { useContext, useEffect, useState } from "react";
import UrlConstant from "../../../Constants/UrlConstants";
import HTTPService from "../../../Services/HTTPService";
import { useHistory } from "react-router-dom";
import {
  GetErrorHandlingRoute,
  GetErrorKey,
  findType,
  getUserMapId,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
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
import GlobalStyle from "../../../Assets/CSS/global.module.css";
import NoData from "../../NoData/NoData";

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
    let url =
      UrlConstant.base_url + "datahub/usage_policies/" + usagePolicyId + "/";
    let method = "PATCH";
    let payload;
    if (condition == "approved") {
      let date = toDate ? new Date(toDate) : null;
      if (date) {
        let timezoneOffset = date.getTimezoneOffset() * 60 * 1000; // convert to milliseconds
        date = new Date(date.getTime() - timezoneOffset); // adjust for timezone offset
      }
      payload = {
        approval_status: condition,
        accessibility_time: date ? date.toISOString().substring(0, 10) : null,
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
  const handleDetailRoute = (row) => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return {
        pathname: "/datahub/new_datasets/view/" + row.dataset_id + "/",
        state: { tab: "my_organisation" },
      };
    } else if (isLoggedInUserParticipant()) {
      return {
        pathname: "/participant" + "/new_datasets/view/" + row.dataset_id + "/",
        state: { tab: "my_organisation" },
      };
    }
  };
  useEffect(() => {
    let columnsForSent = [
      "Dataset name",
      "File name",
      "Organization name",
      "Accessibility time",
      "Approval status",
      "View",
    ];
    let columnsForReceived = [
      "Dataset details",
      "Organization details",
      "Status",
      "Actions",
      "View",
    ];
    setRequestReceivedColumns(columnsForReceived);
    setRequestSentColumns(columnsForSent);
  }, [allRequestReceivedList, allRequestSentList]);
  useEffect(() => {
    getAllRequestList();
  }, [refresh, showRequestSent]);
  return (
    <>
      {allRequestSentList.length > 0 && allRequestReceivedList.length > 0 ? (
        <>
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
              <Typography
                className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
              >
                {" "}
                {showRequestSent
                  ? "Track the status of your dataset access requests."
                  : "Review requests from organizations seeking access to your dataset."}{" "}
              </Typography>
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
              <Typography className={global_styles.bold600}>
                Received
              </Typography>
              <Switch
                style={{ background: "#00ab55" }}
                checked={showRequestSent}
                onChange={setShowRequestSent}
                id="dataset-requests-receive-and-sent-toggle"
              />
              <Typography className={global_styles.bold600}>Sent</Typography>
            </Col>
          </Row>
          <Row>
            <Col lg={12} sm={12} md={12}></Col>
            <TableContainer
              component={Paper}
              style={{}}
              className="requestTableContainer"
            >
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
                        let alignItems = index == 1 ? "left" : "center";
                        return (
                          <TableCell
                            sx={{
                              "& .MuiTableCell-root": {
                                fontFamily: "Montserrat",
                              },
                              textAlign: alignItems,
                              alignItems: alignItems,
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
                          textTransform: "capitalize",
                        }}
                        className={global_styles.bold500}
                        style={{ width: "100%" }}
                      >
                        <TableCell
                          style={{ width: "30%", maxWidth: "350px" }}
                          component="th"
                          scope="row"
                        >
                          <div style={{ display: "flex", gap: "20px" }}>
                            <span style={{ width: "50%" }}>
                              <div
                                className={
                                  global_styles.bold600 +
                                  " " +
                                  global_styles.size16 +
                                  " " +
                                  global_styles.ellipses
                                }
                              >
                                {row.dataset_name}
                              </div>
                              <div>Dataset name</div>
                            </span>
                            <span style={{ width: "50%" }}>
                              <div
                                className={
                                  global_styles.bold600 +
                                  " " +
                                  global_styles.size16 +
                                  " " +
                                  global_styles.ellipses
                                }
                              >
                                {" "}
                                {row.file_name}
                              </div>
                              <div>File name</div>
                            </span>
                          </div>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <div style={{ display: "flex", gap: "20px" }}>
                            <div>
                              <div
                                style={{ maxWidth: "150px" }}
                                className={
                                  global_styles.bold600 +
                                  " " +
                                  global_styles.size16 +
                                  " " +
                                  global_styles.ellipses
                                }
                              >
                                {row.organization_name}
                              </div>
                              <div>Organization name</div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              justifyContent: "left",
                            }}
                          >
                            <div>
                              <div
                                className={
                                  global_styles.bold600 +
                                  " " +
                                  global_styles.size16
                                }
                              >
                                <Badge
                                  style={{
                                    backgroundColor:
                                      row.approval_status == "rejected"
                                        ? "#ff5630"
                                        : row.approval_status == "approved"
                                        ? "#00ab55"
                                        : "#faad14",
                                    width: "80px",
                                  }}
                                  className={
                                    global_styles.bold600 +
                                    " " +
                                    global_styles.size16
                                  }
                                  count={row.approval_status}
                                ></Badge>
                              </div>

                              <div
                                style={{ fontStyle: "italic", width: "112px" }}
                                className={global_styles.ellipses}
                              >
                                {row.approval_status == "approved"
                                  ? `Till : ${row.accessibility_time ?? "NA"}`
                                  : ""}
                              </div>
                            </div>

                            <div>
                              <div
                                className={
                                  global_styles.bold600 +
                                  " " +
                                  global_styles.size16 +
                                  " " +
                                  global_styles.ellipses
                                }
                                style={{ maxWidth: "112px" }}
                              >
                                {row.updated_at?.substring(0, 10)}
                              </div>
                              Last updated
                            </div>
                          </div>
                        </TableCell>

                        <TableCell
                          className={styles.table_cell_for_approve_button}
                        >
                          {row.approval_status !== "approved" &&
                            row.approval_status !== "rejected" && (
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
                                        disablePast
                                        inputFormat="dd/MM/yyyy"
                                        placeholder="Till"
                                        label="Till"
                                        value={toDate}
                                        onChange={(value) =>
                                          handleToDate(value)
                                        }
                                        PaperProps={{
                                          sx: {
                                            borderRadius: "16px !important",
                                            "& .MuiPickersDay-root": {
                                              "&.Mui-selected": {
                                                backgroundColor:
                                                  "#007B55 !important",
                                              },
                                            },
                                          },
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            id="dataset-request-recevie-data-field"
                                            disabled
                                            {...params}
                                            variant="outlined"
                                            sx={{
                                              width: "300px",
                                              svg: { color: "#00AB55" },
                                              "& .MuiInputBase-input": {
                                                height: "20px",
                                              },
                                              "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                  borderColor:
                                                    "#919EAB !important",
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
                                                  fontFamily:
                                                    "Montserrat !important",
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
                                        className={
                                          global_styles.secondary_button
                                        }
                                        onClick={() => handleCancel()}
                                        id="dataset-request-recevied-cancel-btn"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        className={global_styles.primary_button}
                                        onClick={() =>
                                          handleOk("approved", row.id)
                                        }
                                        id="dataset-request-recevied-approve-btn"
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
                                    textTransform: "none",
                                    height: "30px",
                                    fontFamily: "Montserrat",
                                    width: "100px",
                                  }}
                                  onClick={() => showPopconfirm(index)}
                                  id="dataset-request-recevied-approve-btn2"
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
                                textTransform: "none",
                                height: "30px",
                                width: "100px",
                                fontFamily: "Montserrat",
                              }}
                              onClick={() => SubmitHandler("rejected", row.id)}
                              id="dataset-request-recevied-recall-reject-btn"
                            >
                              {row.approval_status == "approved"
                                ? "Recall"
                                : "Reject"}
                            </Button>
                          )}
                          {row.approval_status === "rejected" && (
                            <div>No Action available</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <span
                            className={global_styles.primary_color}
                            onClick={() => history.push(handleDetailRoute(row))}
                            style={{
                              cursor: "pointer",
                              fontFamily: "Montserrat",
                              textAlign: "center",
                            }}
                            id="dataset-request-detail"
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
                              textAlign: "left",
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
                          textTransform: "capitalize",
                        }}
                        className={global_styles.bold500}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "20%", maxWidth: "150px" }}
                          className={global_styles.ellipses}
                        >
                          {row.dataset_name}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "20%", maxWidth: "150px" }}
                          className={global_styles.ellipses}
                        >
                          {row.file_name}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "15%", maxWidth: "150px" }}
                          className={global_styles.ellipses}
                        >
                          {row.organization_name}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "15%", maxWidth: "150px" }}
                          className={global_styles.ellipses}
                        >
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
                            textAlign: "left",
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
                              width: "80px",
                            }}
                            count={row.approval_status}
                          ></Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={global_styles.primary_color}
                            onClick={() =>
                              history.push(
                                `/${findType()}/new_datasets/view/` +
                                  row.dataset_id +
                                  "/"
                              )
                            }
                            style={{
                              cursor: "pointer",
                              fontFamily: "Montserrat",
                              textAlign: "center",
                            }}
                            id="dataset-request-detail2"
                          >
                            Detail
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CSSTransition>
            </TableContainer>
          </Row>
        </>
      ) : (
        <NoData
          title={"There is no datasets"}
          subTitle={"As of now there is no request"}
        />
      )}
    </>
  );
};

export default DatasetRequestTable;
