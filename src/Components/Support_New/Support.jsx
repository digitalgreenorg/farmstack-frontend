import React from "react";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import {InputAdornment,   IconButton,} from "@mui/material";
import "./Support.css";
import SupportTittleView from "./SupportTittleView";
import SupportCard from "./SupportCard";
import { Row, Col } from "react-bootstrap";


export default function Support(props) {
    return(<>
            <TextField
          id="dataset-search-input-id"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#919EAB",
                borderRadius: "30px",
              },
              "&:hover fieldset": {
                borderColor: "#919EAB",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#919EAB",
              },
            },
          }}
          className={ "input_field"}
          placeholder="Search tickets.."
        //   value={searchDatasetsName}
        //   onChange={(e) => setSearchDatasetsName(e.target.value.trim())}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <img
                    src={require("../../Assets/Img/input_search.svg")}
                    alt="search"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          />
        <SupportTittleView />
    </>)
}