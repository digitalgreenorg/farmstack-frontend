import { Card } from "@mui/material";
import React from "react";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

export default function SupportFilterStatus({
  statusFilter,
  handleFilterByStatus,
}) {
  return (
    <>
      <Card
        sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "15px",
          width: "500px",
          marginTop: "10px",
          marginLeft: "500px",
        }}
      >
        <FormControl fullWidth sx={{ width: "330px" }} className="mt-30">
          <InputLabel id="test-select-label">Select Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="dataset-filter-by-country-id"
            onChange={(e) => handleFilterByStatus(e,false)}
            sx={{
              textAlign: "left",
              "&.MuiInputBase-root": {
                height: "56px",
              },
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
            label="Select Country"
            placeholder="Select Country"
            value={statusFilter}
          >
            <MenuItem value={"open"} id="open">
              Open
            </MenuItem>
            <MenuItem value={"closed"} id="closed">
              Closed
            </MenuItem>
          </Select>
        </FormControl>
      </Card>
    </>
  );
}
