import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/system/Box";

const CustomTabs = (props) => {
  // this component expects 3 things in props
  const { tabValue, setTabValue, TabLabels, orientation, filledBackground } =
    props;
  console.log("in cutom tab", tabValue, setTabValue, TabLabels);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
      <Tabs
        sx={{
          "& .MuiTabs-indicator": { backgroundColor: "#00AB55 !important" },
          "& .MuiTab-root": {
            color: "#637381 !important",
            borderLeft: "none !important",
            borderTop: "none !important",
            borderRight: "none !important",
            alignItems: "baseline",
            width: "260px",
          },
          "& .Mui-selected": {
            alignItems: "baseline",
            color: filledBackground
              ? "#ffffff !important"
              : "#00AB55 !important",
            backgroundColor: filledBackground
              ? " #00AB55 !important"
              : "#ffffff !important",
            width: "260px",
          },
        }}
        value={tabValue}
        onChange={handleChange}
        aria-label="tabs"
        orientation={orientation ?? "horizontal"}
      >
        {TabLabels?.map((label, index) => (
          <Tab id={label + index} label={label} />
        ))}
        {/* <Tab label="Co-Steward" />
          <Tab label="Participant" />
          <Tab label="New Participant Requests" /> */}
      </Tabs>
      {/* </Box> */}
    </>
  );
};

export default CustomTabs;
