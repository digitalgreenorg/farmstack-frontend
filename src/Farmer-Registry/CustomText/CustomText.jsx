import React from "react";
import { Box, Typography } from "@mui/material";

const CustomText = (props) => {
  return (
    <Box className={props.parentClassName}>
      <Typography
        className={props.className}
        sx={{
          fontFamily: "Montserrat",
          fontSize: props.size,
          fontWeight: props.weight,
          lineHeight: props.lineHeight,
          textAlign: props.Align ? props.Align : "left",
          color: props.color,
        }}
      >
        {props.value}
      </Typography>
    </Box>
  );
};

export default CustomText;
