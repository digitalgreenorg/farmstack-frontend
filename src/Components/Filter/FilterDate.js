import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ClickAwayListener from "@mui/base/ClickAwayListener";

const FilterDate = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  dates,
  setDates,
  setShowFilter,
  callApply,
  handleClickAway,
  setUpdate,
}) => {
  const [fromDateError, setFromDateError] = useState(false);
  const [toDateError, setToDateError] = useState(false);

  const handleClose = () => {
    callApply();
    setShowFilter(false);
  };
  const handleFromDate = (value) => {
    let currentDate = new Date();
    let formattedDate = moment(value).format("DD/MM/YYYY");
    if (
      moment(formattedDate, "DD/MM/YYYY", true).isValid() &&
      moment(value).isSameOrBefore(currentDate)
    ) {
      let tempDates = [...dates];
      tempDates[0].fromDate = value;
      setDates(tempDates);
      setFromDate(value);
      setFromDateError(false);
      // setUpdate((prev) => prev + 1);
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
      let tempDates = [...dates];
      tempDates[0].toDate = value;
      setDates(tempDates);
      setToDate(value);
      setToDateError(false);
      setUpdate((prev) => prev + 1);
    } else {
      setToDateError(true);
      setToDate("");
    }
  };
  // useEffect(() => {
  //   callApply();
  // }, [dates]);

  console.log(fromDate, "fromDate", toDate);
  return (
    // <ClickAwayListener onClickAway={handleClickAway}>
    <div style={{ marginLeft: "144px", marginRight: "144px" }}>
      <Card
        sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "15px",
        }}
      >
        <Box className="pt-20">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  key={fromDate}
                  inputFormat="dd/MM/yyyy"
                  placeholder="Start Date"
                  label="Start Date"
                  maxDate={new Date()}
                  value={fromDate ?? null}
                  onChange={(value) => handleFromDate(value)}
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
                  key={toDate}
                  inputFormat="dd/MM/yyyy"
                  label="End Date"
                  maxDate={new Date()}
                  minDate={fromDate}
                  value={toDate ?? null}
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
          <Box className="text-right mt-20 mb-20 mr-20">
            <Button
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "14px",
                border: "1px solid rgba(0, 171, 85, 0.48)",
                color: "#00AB55",
                width: "86px",
                height: "36px",
                borderRadius: "8px",
                textTransform: "none",
                marginRight: "30px",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(0, 171, 85, 0.48)",
                },
              }}
              variant="outlined"
              onClick={() => {
                if (
                  !dates[0]?.fromDate ||
                  !dates[0]?.toDate ||
                  fromDateError ||
                  toDateError
                ) {
                  setDates([{ fromDate: null, toDate: null }]);
                  setFromDate("");
                  setToDate("");
                }
                setShowFilter(false);
              }}
            >
              Close
            </Button>
            {/* <Button
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "14px",
                width: "86px",
                height: "36px",
                background: "#00AB55",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#00AB55",
                  color: "#fffff",
                },
              }}
              disabled={fromDate && toDate ? false : true}
              variant="contained"
              onClick={() => handleClose()}
            >
              Apply
            </Button> */}
          </Box>
        </Box>
      </Card>
    </div>
    // </ClickAwayListener>
  );
};

export default FilterDate;
