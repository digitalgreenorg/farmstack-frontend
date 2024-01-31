import { Box } from "@mui/material";
import React from "react";
import RetrievalTable from "./RetrievalTable";

const RetrievalTab = ({ data }) => {
  return (
    <Box className="mt-30">
      <RetrievalTable data={data} />
    </Box>
  );
};

export default RetrievalTab;
