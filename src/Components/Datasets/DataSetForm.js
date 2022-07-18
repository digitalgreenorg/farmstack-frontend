import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./DataSetForm.css";

import {
  handleAddressCharacters,
  handleNameFieldEntry,
  preventSpaceKey,
  validateInputField,
} from "../../Utils/Common";
import labels from "../../Constants/labels";
import TextField from "@mui/material/TextField";
import RegexConstants from "../../Constants/RegexConstants";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import HandleSessionTimeout, { handleUnwantedSpace } from "../../Utils/Common";
import THEME_COLORS from "../../Constants/ColorConstants";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import $ from "jquery";

const useStyles = {
  btncolor: {
    color: THEME_COLORS.THEME_COLOR,
    "border-color": THEME_COLORS.THEME_COLOR,
    "border-radius": 0,
  },
  marginrowtop: { "margin-top": "30px" },
  marginrowtop50: { "margin-top": "50px" },
  firstinputwidth: {
    width: "420px",
    "text-align": "left",
    height: "48px",
    color: "#3D4A52",
    "margin-left": "20%",
  },
  headingbold: { fontWeight: "bold" },
};

export default function DataSetForm(props) {
  const [reply, setreply] = useState("");
  const [datasetname, setdatasetname] = useState("");
  const [Geography, setGeography] = useState("");
  const [cropdetail, setCropdetail] = useState("");

  const [value, setValue] = React.useState("3 months");

  //   date picker
  const [fromdate, setfromdate] = React.useState(null);
  const [todate, settodate] = React.useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="datasetform">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="AddDatasetmainheading">
            {/* {props.first_heading} */}
            Add Dataset
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TextField
            // style={useStyles.inputwidth}
            className="name"
            id="filled-basic"
            variant="filled"
            required
            value={datasetname}
            onChange={(e) =>
              validateInputField(e.target.value, RegexConstants.ORG_NAME_REGEX)
                ? setdatasetname(e.target.value)
                : e.preventDefault()
            }
            label="Dataset Name"
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TextareaAutosize
            className="description"
            maxRows={4}
            placeholder="Description *"
            variant="filled"
            defaultValue={reply}
            maxLength={500}
            onKeyDown={(e) => handleUnwantedSpace(reply, e)}
            onChange={(e) => setreply(e.target.value)}
            style={{
              border: "none !important",
              width: "420px",
              "min-height": "50px",
              "border-bottom": "1px solid #9AA1A9 !important",
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="AddDatasetsecondaryheading">
            {/* {props.first_heading} */}
            Data Category
          </span>
        </Col>
      </Row>
      <Row className="checkbox1">
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel control={<Checkbox />} label="Crop data" />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel control={<Checkbox />} label="Practice data" />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel control={<Checkbox />} label="Farmer profile" />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel control={<Checkbox />} label="Land records" />
        </Col>
      </Row>
      <Row className="checkbox2">
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel control={<Checkbox />} label="Cultivation data" />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={<Checkbox />}
            label="Soil data"
            className="soil"
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={<Checkbox />}
            label="Weather data"
            className="soil"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TextField
            // style={useStyles.inputwidth}
            className="name"
            id="filled-basic"
            variant="filled"
            required
            value={Geography}
            onChange={(e) =>
              validateInputField(e.target.value, RegexConstants.ORG_NAME_REGEX)
                ? setGeography(e.target.value)
                : e.preventDefault()
            }
            label="Geography"
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TextField
            // style={useStyles.inputwidth}
            className="crop"
            id="filled-basic"
            variant="filled"
            required
            value={cropdetail}
            onChange={(e) =>
              validateInputField(e.target.value, RegexConstants.ORG_NAME_REGEX)
                ? setCropdetail(e.target.value)
                : e.preventDefault()
            }
            label="Corp Detail"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <span className="AddDatasetageheading">
            {/* {props.first_heading} */}
            Age of Actual Data
          </span>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <FormControlLabel
            value="start"
            control={<Switch />}
            label="Constantly updating"
            labelPlacement="start"
            className="constantswitch"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="radiobtns">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleChange}>
            <FormControlLabel
              value="3 months"
              control={<Radio />}
              label="3 months"
            />
            <FormControlLabel
              value="6 months"
              control={<Radio />}
              label="6 months"
              className="sixmonth"
            />
            <FormControlLabel
              value="9 months"
              control={<Radio />}
              label="9 months"
              className="ninemonth"
            />
            <FormControlLabel
              value="12 months"
              control={<Radio />}
              label="12 months"
              className="twelvemonth"
            />
          </RadioGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="AddDatasetsecondaryheading">
            {/* {props.first_heading} */}
            Data Capture Interval
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} className="FromDate">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              disableFuture
              label="Start Date "
              value={fromdate}
              onChange={(newValue) => {
                settodate(null);
                setfromdate(newValue);
                setTimeout(() => {
                  $(".supportcardtodate input.MuiInputBase-input").attr(
                    "disabled",
                    "disabled"
                  );
                }, 100);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="filled-basic"
                  variant="filled"
                  className="fromtextfield"
                />
              )}
            />
          </LocalizationProvider>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} className="toDate">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              disabled={fromdate ? false : true}
              disableFuture
              label="End Date "
              minDate={fromdate}
              value={todate}
              onChange={(newValue) => {
                settodate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="filled-basic"
                  variant="filled"
                  className="totextfield"
                />
              )}
            />
          </LocalizationProvider>
        </Col>
      </Row>
    </div>
  );
}
