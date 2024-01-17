import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import global_styles from "../../../Assets/CSS/global.module.css";
import styles from "../resources.module.css";
import moment from "moment/moment";
import { Badge, Popconfirm } from "antd";
import CheckIcon from "@mui/icons-material/Check";
import Generate from "../Generate";

function createData(name, file_name, org_name, status, action, view) {
  return { name, file_name, org_name, status, action, view };
}

const rows = [
  createData(
    "Chilli Data",
    "Survey.csv",
    "Digital Green",
    "Requested",
    "action"
  ),
  createData("Anku", "file_agri.csv", "MOA", "Approved", "action"),
];

const RequestTab = () => {
  const [confirmIndex, setConfirmIndex] = useState(-1);
  const [toDate, setToDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [tabType, setTabType] = useState("request");

  const handleToDate = (value) => {
    let currentDate = new Date();
    let formattedDate = moment(value).format("DD/MM/YYYY");

    if (moment(formattedDate, "DD/MM/YYYY", true).isValid()) {
      if (moment(value).isSameOrAfter(currentDate, "day")) {
        setToDate(value);
        setDateError(true);
      } else {
        setDateError(false);
      }
    } else {
      setDateError(false);
    }
  };

  const SubmitHandler = () => {};

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

  return (
    <Box className="mt-30">
      <Box className="mt-30 text-right">
        <Button
          variant="outlined"
          sx={{
            background: tabType === "request" ? "#E9FEF5" : "",
            borderRadius: "100px 0px 0px 100px",
            border: "1px solid var(--M3-sys-light-outline, #79747E)",
            padding: "10px 35px",
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "14px",
            color: "#1D192B",
            textTransform: "none",
            "&:hover": {
              background: "#E9FEF5",
              border: "1px solid var(--M3-sys-light-outline, #79747E)",
            },
          }}
          onClick={() => setTabType("request")}
        >
          {tabType === "request" && (
            <CheckIcon
              sx={{ fill: "#1D192B", fontSize: "22px", marginRight: "5px" }}
            />
          )}
          Request
        </Button>
        <Button
          variant="outlined"
          sx={{
            background: tabType === "generate" ? "#E9FEF5" : "",
            borderRadius: " 0px 100px 100px 0px ",
            border: "1px solid var(--M3-sys-light-outline, #79747E)",
            padding: "10px 35px",
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "14px",
            color: "#1D192B",
            textTransform: "none",
            "&:hover": {
              background: "#E9FEF5",
              border: "1px solid var(--M3-sys-light-outline, #79747E)",
            },
          }}
          onClick={() => setTabType("generate")}
        >
          {tabType === "generate" && (
            <CheckIcon
              sx={{ fill: "#1D192B", fontSize: "22px", marginRight: "5px" }}
            />
          )}
          Generate
        </Button>
      </Box>
      {tabType === "request" ? (
        <TableContainer
          className="mt-30"
          sx={{
            borderRadius: "12px",
          }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead
              sx={{
                "& .MuiTableCell-head": {
                  backgroundColor: "#F6F6F6",
                },
              }}
            >
              <TableRow>
                <TableCell align="left">Content</TableCell>
                <TableCell align="left">File Name</TableCell>
                <TableCell align="left">Organisation Details</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"> Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "#DEFFF1",
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.file_name}</TableCell>
                    <TableCell align="left">{row.org_name}</TableCell>
                    <TableCell align="left">
                      <div>
                        <div
                          className={
                            global_styles.bold600 + " " + global_styles.size16
                          }
                        >
                          <Badge
                            data-testid="approved_and_reject_test_id"
                            style={{
                              backgroundColor:
                                row.approval_status == "rejected"
                                  ? "#ff5630"
                                  : row.approval_status == "approved"
                                  ? "#00A94F"
                                  : "#faad14",
                              width: "80px",
                            }}
                            className={
                              global_styles.bold600 + " " + global_styles.size16
                            }
                            count={"Requested"}
                          ></Badge>
                        </div>

                        <div
                          style={{
                            fontStyle: "italic",
                            width: "112px",
                          }}
                          className={global_styles.ellipses}
                          data-testid="approved-badge-test"
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
                    </TableCell>
                    <TableCell align="left">
                      {
                        <>
                          {row?.approval_status !== "approved" &&
                            row?.approval_status !== "rejected" && (
                              <Popconfirm
                                title={
                                  <span
                                    style={{
                                      color: "#00A94F",
                                      textTransform: "none",
                                      fontFamily: "Arial",
                                    }}
                                  >
                                    Select a Time for Content Accessibility
                                  </span>
                                }
                                icon={<></>}
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
                                            data-testid="dataset-request-recevie-data-field-test"
                                            disabled
                                            {...params}
                                            variant="outlined"
                                            sx={{
                                              width: "300px",
                                              marginTop: "15px",
                                              svg: { color: "#00A94F" },
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
                                                    "Arial !important",
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
                                    <Box
                                      sx={{
                                        marginTop: "10px",
                                      }}
                                    >
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            sx={{
                                              "&.Mui-checked": {
                                                color: "#4759FF !important",
                                              },
                                              "& .MuiSvgIcon-root": {
                                                fill: "#4759FF",
                                              },
                                            }}
                                            defaultChecked={true}
                                          />
                                        }
                                        label={
                                          <span
                                            style={{
                                              color: "#A3B0B8",
                                              fontFamily: `Roboto`,
                                            }}
                                          >
                                            Embeddings
                                          </span>
                                        }
                                      />
                                    </Box>
                                    <Divider
                                      sx={{
                                        marginTop: "10px",
                                        background: "#E5E7EB",
                                      }}
                                    />
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "left",
                                        alignItems: "center",
                                        gap: "20px",
                                        marginTop: "20px",
                                      }}
                                    >
                                      <Button
                                        sx={{
                                          background: "#01A94F",
                                          color: "#FFF",
                                          textTransform: "none",
                                          height: "30px",
                                          fontFamily: "Arial",
                                          width: "100px",
                                          borderRadius: "100px",
                                          ":hover": {
                                            background: "#01A94F",
                                          },
                                        }}
                                        onClick={() =>
                                          handleOk("approved", row.id)
                                        }
                                        id="dataset-request-recevied-approve-btn"
                                        data-testid="dataset-request-recevied-approve-btn-test"
                                        disabled={!dateError || !toDate}
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        sx={{
                                          background: "#FBD5D5",
                                          color: "#E02324",
                                          textTransform: "none",
                                          height: "30px",
                                          width: "100px",
                                          fontFamily: "Arial",
                                          borderRadius: "100px",
                                          ":hover": {
                                            background: "#FBD5D5",
                                          },
                                        }}
                                        onClick={() => handleCancel()}
                                        id="dataset-request-recevied-cancel-btn"
                                        data-testid="dataset-request-recevied-cancel-btn-test"
                                      >
                                        Cancel
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
                              >
                                <Button
                                  sx={{
                                    background: "#01A94F",
                                    color: "#FFF",
                                    textTransform: "none",
                                    height: "30px",
                                    fontFamily: "Arial",
                                    width: "100px",
                                    borderRadius: "100px",
                                    ":hover": {
                                      background: "#01A94F",
                                    },
                                  }}
                                  onClick={() => showPopconfirm(index)}
                                  id="dataset-request-recevied-approve-btn2"
                                  data-testid="dataset-request-recevied-approve-btn2-test"
                                >
                                  Approve
                                </Button>{" "}
                              </Popconfirm>
                            )}
                          {row?.approval_status !== "rejected" && (
                            <Button
                              sx={{
                                background: "#FBD5D5",
                                color: "#E02324",
                                textTransform: "none",
                                height: "30px",
                                width: "100px",
                                fontFamily: "Arial",
                                borderRadius: "100px",
                                ":hover": {
                                  background: "#FBD5D5",
                                },
                              }}
                              onClick={() => SubmitHandler("rejected", row?.id)}
                              id="dataset-request-recevied-recall-reject-btn"
                              data-testid="dataset-request-recevied-recall-reject-btn-test"
                            >
                              {row?.approval_status == "approved"
                                ? "Recall"
                                : "Reject"}
                            </Button>
                          )}
                          {row.approval_status === "rejected" && (
                            <div>No Action available</div>
                          )}
                        </>
                      }
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "32px",
                      fontWeight: "400",
                      lineHeight: 3,
                    }}
                    colSpan={12}
                  >
                    As of now, no request has been recieved.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Generate />
        </Box>
      )}
    </Box>
  );
};

export default RequestTab;
