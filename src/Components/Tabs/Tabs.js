import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/system/Box";

const CustomTabs = (props) => {
  // this component expects 3 things in props
  const { tabValue, setTabValue, TabLabels } = props;

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
          },
          "& .Mui-selected": { color: "#00AB55 !important" },
        }}
        value={tabValue}
        onChange={handleChange}
        aria-label="tabs"
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
