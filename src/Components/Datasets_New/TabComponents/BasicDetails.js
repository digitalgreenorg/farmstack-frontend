import React, { useState } from "react";
import { Box, Checkbox, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CheckBoxWithText from "./CheckBoxWithText";
import moment from "moment";
import { isDateSame } from "../../../Utils/Common";

const BasicDetails = ({
  datasetIdForEdit,
  dataSetName,
  setDataSetName,
  errorDataSetName,
  seteErrorDataSetName,
  dataSetDescription,
  setDataSetDescription,
  errorDataSetDescription,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  isUpdating,
  setIsUpdating,
  validator,
  checkDataSet,
  toDateError,
  setToDateError,
  fromDateError,
  setFromDateError,
}) => {
  const limitChar = 100;
  const limitCharDesc = 512;

  const handleDatasetName = (e) => {
    seteErrorDataSetName("");
    if (e.target.value.toString().length <= limitChar) {
      setDataSetName(e.target.value);
    }
  };

  const handleDescription = (e) => {
    if (e.target.value.toString().length <= limitCharDesc) {
      setDataSetDescription(e.target.value);
    }
  };

  const handleFromDate = (value) => {
    let currentDate = new Date();
    let formattedDate = moment(value).format("DD/MM/YYYY");

    if (
      moment(formattedDate, "DD/MM/YYYY", true).isValid() &&
      moment(value).isSameOrBefore(currentDate)
    ) {
      setFromDateError(false);
      setFromDate(value);
    } else {
      setFromDateError(true);
      setFromDate("");
    }
  };

  const handleToDate = (value) => {
    let formattedDate = moment(value).format("DD/MM/YYYY");

    if (
      moment(formattedDate, "DD/MM/YYYY", true).isValid() &&
      moment(value).isSameOrAfter(fromDate) &&
      moment(value).isSameOrBefore(new Date())
    ) {
      setToDateError(false);
      setToDate(value);
    } else {
      setToDateError(true);
      setToDate("");
    }
  };

  const handleCheckBox = () => {
    setIsUpdating(!isUpdating);
  };

  return (
    <div className="mt-20">
      <Typography
        sx={{
          fontFamily: "Montserrat !important",
          fontWeight: "600",
          fontSize: "32px",
          lineHeight: "40px",
          color: "#000000",
          textAlign: "left",
        }}
      >
        {datasetIdForEdit ? "Edit dataset" : "Add new dataset"}
      </Typography>
      <TextField
        fullWidth
        error={errorDataSetName ? true : false}
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
            {errorDataSetName ? errorDataSetName : ""}
            {/* {(validator && (dataSetName === null || dataSetName == undefined || dataSetName === '')) ? 'Please enter the dataset name is a mandatory field.' : ''} */}
          </Typography>
        }
        sx={{
          marginTop: "30px",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#919EAB",
            },
            "&:hover fieldset": {
              borderColor: "#919EAB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#919EAB",
            },
          },
        }}
        placeholder="Dataset name"
        label="Dataset name"
        value={dataSetName}
        required
        onChange={(e) => handleDatasetName(e)}
        disabled={datasetIdForEdit ? true : false}
        id="add-dataset-name"
      />
      <TextField
      id="add-dataset-description"
        fullWidth
        multiline
        minRows={4}
        maxRows={4}
        error={errorDataSetDescription ? true : false}
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
            {errorDataSetDescription ? errorDataSetDescription : ""}
          </Typography>
        }
        sx={{
          marginTop: "12px",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#919EAB",
            },
            "&:hover fieldset": {
              borderColor: "#919EAB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#919EAB",
            },
          },
        }}
        placeholder="Dataset description not more that 512 character "
        label="Dataset description not more that 512 character "
        value={dataSetDescription}
        required
        onChange={(e) => handleDescription(e)}
      />
      <Typography
        sx={{
          fontFamily: "Montserrat !important",
          fontWeight: "600",
          fontSize: "32px",
          lineHeight: "40px",
          color: "#000000",
          textAlign: "left",
          marginTop: "50px",
        }}
      >
        Data capture interval
      </Typography>
      <Box sx={{ display: "flex", marginTop: "20px" }}>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              placeholder="Start Date"
              label="Start Date"
              maxDate={new Date()}
              value={fromDate}
              disableFuture
              onChange={(value) => handleFromDate(value)}
              disabled={isUpdating}
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
                  id="add-dataset-capture-interval-from-date"
                  variant="outlined"
                  sx={{
                    width: "468px",
                    svg: { color: "#00AB55" },
                    "& .MuiInputBase-input": {
                      height: "36px",
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
                  required={isUpdating ? false : true}
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
                      {fromDateError
                        ? "Please enter the valid start date of the data capture interval."
                        : ""}
                    </Typography>
                  }
                />
              )}
              // error={props.dataCaptureStartErrorMessage ? true : false}
            />
          </LocalizationProvider>
        </div>

        <div style={{ marginLeft: "24px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              label="End Date"
              minDate={fromDate}
              maxDate={new Date()}
              value={toDate}
              onChange={(value) => handleToDate(value)}
              disabled={isUpdating || !fromDate}
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
                  id="add-dataset-capture-interval-to-date"
                  
                  variant="outlined"
                  required={isUpdating ? false : true}
                  sx={{
                    width: "468px",
                    svg: { color: "#00AB55" },
                    "& .MuiInputBase-input": {
                      height: "36px",
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
                    >
                      {toDateError
                        ? "Please enter the valid end date of the data capture interval."
                        : ""}
                    </Typography>
                  }
                />
              )}
              // error={props.dataCaptureStartErrorMessage ? true : false}
            />
          </LocalizationProvider>
        </div>
      </Box>
      <CheckBoxWithText
      id="add-dataset-coustanly-updating"
        text={"Constantly updating"}
        checked={isUpdating}
        handleCheckBox={handleCheckBox}
      />
    </div>
  );
};

export default BasicDetails;
