import React, { useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CheckBoxWithText from "./CheckBoxWithText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const StandardiseRow = ({
  keyName,
  index,
  datapointAttributes,
  setDatapointAttributes,
  templates,
  setTemplates,
  template,
  setTemplate,
  datapointCategories,
  datapointCategory,
  setDatapointCategory,
  handleMaskCheckBox,
  datapointCategoryChange,
  standardisedColum,
  setStandardisedColumn,
  maskedColumns,
}) => {
  // console.log(datapointCategory?.[index], "rowfow");
  const [isSelectorOpen, setisSelectorOpen] = useState(false);
  const clearCategory = (index) => {
    let tmpStandardisedColum = [...standardisedColum];
    tmpStandardisedColum[index] = "";
    setStandardisedColumn(tmpStandardisedColum);

    let tmpArr = [...datapointCategory];
    tmpArr[index] = "";
    setDatapointCategory(tmpArr);

    let tempAttr = [...datapointAttributes];
    tempAttr[index] = [];
    setDatapointAttributes(tempAttr);
  };

  return (
    <div className="mt-50" key={index}>
      <Box className="d-flex justify-content-between align-items-center w-100 mb-20">
        <Typography
          className="ml-16"
          sx={{
            fontFamily: "Montserrat !important",
            fontWeight: "400",
            fontSize: "20px",
            lineHeight: "24px",
            color: "#000000",
            textAlign: "left",
            width: "100px",
          }}
        >
          {keyName}
        </Typography>
        <Box className="">
          <FormControl fullWidth sx={{ width: "273px" }}>
            <InputLabel>Datapoint category</InputLabel>
            <Select
            id={`standardise-datapoint-category${index}`}
              labelId="demo-simple-select-label"
              key={index}
              value={
                datapointCategory?.[index] ? datapointCategory?.[index] : ""
              }
              renderValue={() =>
                datapointCategory?.[index].datapoint_category
                  ? datapointCategory?.[index].datapoint_category
                  : ""
              }
              onChange={(e) => datapointCategoryChange(e.target.value, index)}
              open={isSelectorOpen}
              onClose={() => setisSelectorOpen(false)}
              sx={{
                textAlign: "left",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#919EAB",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#919EAB",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#919EAB",
                },
                ".MuiOutlinedInput-input": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "185px",
                },
                ".MuiPopover-root": {
                  display: isSelectorOpen ? "block" : "none",
                },
              }}
              label="Datapoint category"
              placeholder="Datapoint category"
              endAdornment={
                <InputAdornment position="end">
                  {datapointCategory?.[index]?.datapoint_category ? (
                    <HighlightOffIcon
                      sx={{
                        // marginRight: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => clearCategory(index)}
                    />
                  ) : (
                    <></>
                  )}
                  <span onBlur={() => setisSelectorOpen(!isSelectorOpen)}>
                    <ExpandMoreIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => setisSelectorOpen(!isSelectorOpen)}
                    />
                  </span>
                </InputAdornment>
              }
              IconComponent={(props) => {
                return <></>;
              }}
            >
              {datapointCategories?.map((item) => (
                <MenuItem 
                id={`standardise-datapoint-category-option-${index+item?.datapoint_category}`}
                key={item.datapoint_category} value={item}>
                  {item?.datapoint_category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className="">
          <FormControl fullWidth sx={{ width: "273px" }}>
            <InputLabel>Datapoint Attribute</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id={`standardise-datapoint-attribute${index}`}
              key={index}
              value={
                standardisedColum?.[index] ? standardisedColum?.[index] : ""
              }
              onChange={(e) => {
                let tmpArr = [...standardisedColum];
                tmpArr[index] = e.target.value;
                setStandardisedColumn(tmpArr);
              }}
              sx={{
                textAlign: "left",
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
              label="Datapoint Attribute"
              placeholder="Datapoint Attribute"
              IconComponent={(props) => {
                return <ExpandMoreIcon {...props} />;
              }}
            >
              {datapointAttributes[index]?.map((item) => (
                <MenuItem 
                id={`standardise-datapoint-attribute-${index+item}`}
                 key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className="mr-16">
          <CheckBoxWithText
            text={"Mask"}
            checked={maskedColumns.includes(keyName)}
            keyName={keyName}
            keyIndex={index}
            keyIndexPassed={true}
            handleCheckBox={handleMaskCheckBox}
            id={`standardise-column}`}
          />
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default StandardiseRow;
