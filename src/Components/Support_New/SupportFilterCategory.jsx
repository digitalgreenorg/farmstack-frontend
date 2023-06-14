import { Card } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { dateTimeFormat } from "../../Utils/Common";
import LocalStyle from "./Support.module.css";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import {
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
  Button,
} from "@material-ui/core";

export default function SupportFilterCategory({
  showFilter,
  setShowFilter,
  categoryFilter,
  setCategoryFilter,
  handleFilterByCategory,
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
          <InputLabel id="test-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="dataset-filter-by-country-id"
            onChange={handleFilterByCategory}
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
            value={categoryFilter}
          >
            <MenuItem value={"certificate"} id="Certificate">
              Certificate
            </MenuItem>
            <MenuItem value={"connectors"} id="connectors">
              Connectors
            </MenuItem>
            <MenuItem value={"datasets"} id="datasets">
              Datasets
            </MenuItem>
            <MenuItem value={"user_accounts"} id="User_accounts">
              User_accounts
            </MenuItem>
            <MenuItem value={"usage_policy"} id="Usage_policy">
              Usage_policy
            </MenuItem>
            <MenuItem value={"others"} id="Others">
              Others
            </MenuItem>
          </Select>
        </FormControl>
      </Card>
    </>
  );
}
