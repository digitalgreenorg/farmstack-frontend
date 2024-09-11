import React from "react";
import Typography from "@mui/material/Typography";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const NoDataAvailable = () => {
  return (
    <div style={{ textAlign: "center", padding: "16px", margin: "auto" }}>
      <ReportProblemIcon style={{ fontSize: 32, color: "gray" }} />
      <Typography variant="h6" color="textSecondary">
        No Data Available
      </Typography>
    </div>
  );
};

export default NoDataAvailable;
