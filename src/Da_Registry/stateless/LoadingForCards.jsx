import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingForCards = () => {
  return (
    <div style={{ textAlign: "center", padding: "16px", margin: "auto" }}>
      <CircularProgress color="inherit" />
    </div>
  );
};

export default LoadingForCards;
