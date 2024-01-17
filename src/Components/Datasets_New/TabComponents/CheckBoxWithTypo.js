import React from "react";
import { Box, Checkbox, Typography } from "@mui/material";

const CheckBoxWithTypo = ({
  categoryId,
  subCategoryId,
  text,
  checked,
  handleCheckBox,
  isDisabled,
  keyIndex,
  fontSize,
  customStyle,
}) => {
  const handleCheck = () => {
    handleCheckBox(categoryId, subCategoryId);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
      <div>
        <Checkbox
          id={`check-box-${keyIndex}`}
          sx={{
            "&.Mui-checked": {
              color: "#00A94F !important",
            },
          }}
          checked={checked}
          disabled={isDisabled ? true : false}
          //   onClick={() => handleCheckBox(categoryId, subCategoryId)}
          onChange={handleCheck}
        />
      </div>
      <Typography
        sx={{
          fontFamily: "Arial !important",
          fontWeight: "400",
          fontSize: fontSize ? fontSize : "16px",
          lineHeight: "22px",
          color: "#212B36",
          textAlign: "left",
        }}
        style={customStyle}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default CheckBoxWithTypo;
