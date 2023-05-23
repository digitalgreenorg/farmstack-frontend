import React from "react";
import { Box } from "@mui/system";
import localStyle from "./customGraph.module.css";

function CustomGraph(props) {
  const { title } = props;
  return (
    <Box className={`${localStyle.container}`}>
      <div>
        <p>{title}</p>

        <div>chart</div>
      </div>
    </Box>
  );
}

export default CustomGraph;
