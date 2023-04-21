import { Box, Button, Card, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

const FilterDate = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  dates,
  setDates,
  setShowFilter,
  callApply,
}) => {
  const handleClose = () => {
    callApply();
    setShowFilter(false);
  };
  const handleFromDate = (value) => {
    let tempDates = [...dates];
    tempDates[0].fromDate = value;
    setDates(tempDates);
    setFromDate(value);
  };

  const handleToDate = (value) => {
    let tempDates = [...dates];
    tempDates[0].toDate = value;
    setDates(tempDates);
    setToDate(value);
  };
  return (
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
                  inputFormat="dd/MM/yyyy"
                  placeholder="Start Date"
                  label="Start Date"
                  maxDate={new Date()}
                  value={fromDate}
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
                  maxDate={new Date()}
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
              onClick={() => setShowFilter(false)}
            >
              Close
            </Button>
            <Button
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
              variant="contained"
              onClick={() => handleClose()}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default FilterDate;
