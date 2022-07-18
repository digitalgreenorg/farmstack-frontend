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

import { FileUploader } from "react-drag-drop-files";
import UploadDataset from "../../Components/Datasets/UploadDataset";

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
  const [recordsvalue, setrecordsvalue] = React.useState("100k");
  const [availablevalue, setavailablevalue] = React.useState("Available");

  //   date picker
  const [fromdate, setfromdate] = React.useState(null);
  const [todate, settodate] = React.useState(null);

  const fileTypes = ["csv", "xls", "xlsx"];
  const [file, setFile] = useState(null);

  const [screenlabels, setscreenlabels] = useState(labels["en"]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeRecords = (event) => {
    setrecordsvalue(event.target.value);
  };
  const handleChangeAvailable = (event) => {
    setavailablevalue(event.target.value);
  };
  const handleFileChange = (file) => {
    setFile(file);
    // setprofile_pic(file);
    console.log(file);
    // if (file != null && file.size > 2097152) {
    //   //   setBrandingnextbutton(false);
    //   setaccfilesize(true);
    // } else {
    //   setaccfilesize(false);
    // }
  };

  return (
    <div className="datasetform">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="AddDatasetmainheading">
            {/* {props.first_heading} */}
            {props.title}
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
            label={screenlabels.dataset.name}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} className="resolution">
          <TextareaAutosize
            className="description"
            maxRows={4}
            placeholder={screenlabels.dataset.description}
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
            {screenlabels.dataset.Data_Category}
          </span>
        </Col>
      </Row>
      <Row className="checkbox1">
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={<Checkbox />}
            label={screenlabels.dataset.Crop_data}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={<Checkbox />}
            label={screenlabels.dataset.Practice_data}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={<Checkbox />}
            label={screenlabels.dataset.Farmer_profile}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={<Checkbox />}
            label={screenlabels.dataset.Land_records}
          />
        </Col>
      </Row>
      <Row className="checkbox2">
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={<Checkbox />}
            label={screenlabels.dataset.Cultivation_data}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={<Checkbox />}
            label={screenlabels.dataset.Soil_data}
            className="soil"
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={<Checkbox />}
            label={screenlabels.dataset.Weather_data}
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
            label={screenlabels.dataset.Geography}
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
            label={screenlabels.dataset.Corp_Detail}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <span className="AddDatasetageheading">
            {/* {props.first_heading} */}
            {screenlabels.dataset.data}
          </span>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <FormControlLabel
            value="start"
            control={<Switch />}
            label={screenlabels.dataset.Constantly_updating}
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
              label={screenlabels.dataset.three}
            />
            <FormControlLabel
              value="6 months"
              control={<Radio />}
              label={screenlabels.dataset.six}
              className="sixmonth"
            />
            <FormControlLabel
              value="9 months"
              control={<Radio />}
              label={screenlabels.dataset.nine}
              className="ninemonth"
            />
            <FormControlLabel
              value="12 months"
              control={<Radio />}
              label={screenlabels.dataset.twelve}
              className="twelvemonth"
            />
          </RadioGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="AddDatasetsecondaryheading">
            {/* {props.first_heading} */}
            {screenlabels.dataset.Interval}
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} className="FromDate">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              disableFuture
              label={screenlabels.dataset.Start_Date}
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
              label={screenlabels.dataset.End_Date}
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
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="AddDatasetsecondaryheading">
            {/* {props.first_heading} */}
            {screenlabels.dataset.Records}
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="recordradiobtns">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={recordsvalue}
            onChange={handleChangeRecords}>
            <FormControlLabel value="100k" control={<Radio />} label="100k" />
            <FormControlLabel
              value="150k"
              control={<Radio />}
              label="150k"
              className="record2"
            />
            <FormControlLabel
              value="200k"
              control={<Radio />}
              label="200k"
              className="record3"
            />
            <FormControlLabel
              value="+500k"
              control={<Radio />}
              label="+500k"
              className="record4"
            />
          </RadioGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="AddDatasetsecondaryheading">
            {/* {props.first_heading} */}
            {screenlabels.dataset.Availablity}
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="recordradiobtns">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={availablevalue}
            onChange={handleChangeAvailable}>
            <FormControlLabel
              value={screenlabels.dataset.Available}
              control={<Radio />}
              label="Available"
            />
            <FormControlLabel
              value={screenlabels.dataset.Not_Available}
              control={<Radio />}
              label="Not Available"
              className="notavaiable"
            />
          </RadioGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="AddDatasetsecondaryheading">
            {/* {props.first_heading} */}
            {screenlabels.dataset.Upload_dataset}
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <FileUploader
            handleChange={handleFileChange}
            name="file"
            types={fileTypes}
            children={
              <UploadDataset
                uploaddes="Supports: CSV, Excel formats not more than 2MB file size"
                uploadtitle="Upload Dataset"
              />
            }
          />
        </Col>
      </Row>

      <Row xs={12} sm={12} md={12} lg={12}>
        <p className="uploaddatasetname">
          {file ? (file.size ? `File name: ${file.name}` : "") : ""}
        </p>
        <p className="oversizemb-uploadimglogo">
          {file != null && file.size > 2097152
            ? "File uploaded is more than 2MB!"
            : ""}
        </p>
      </Row>
    </div>
  );
}
