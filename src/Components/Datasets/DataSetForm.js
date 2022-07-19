import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./DataSetForm.css";
import labels from "../../Constants/labels";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { FileUploader } from "react-drag-drop-files";
import UploadDataset from "../../Components/Datasets/UploadDataset";

export default function DataSetForm(props) {
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  const fileTypes = ["csv", "xls", "xlsx"];

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
            value={props.datasetname}
            onChange={props.handleChangedatasetname}
            label={screenlabels.dataset.name}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} className="resolution">
          <TextareaAutosize
            className="description"
            maxRows={4}
            placeholder={screenlabels.dataset.description}
            variant="filled"
            defaultValue={props.reply}
            maxLength={500}
            onKeyDown={props.handledescriptionKeydown}
            onChange={props.handleChangedescription}
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
            control={
              <Checkbox
                checked={props.Crop_data}
                onChange={props.handleChangeCropData}
              />
            }
            label={screenlabels.dataset.Crop_data}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.Practice_data}
                onChange={props.handleChangePracticeData}
              />
            }
            label={screenlabels.dataset.Practice_data}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.Farmer_profile}
                onChange={props.handleChangeFarmer_profile}
              />
            }
            label={screenlabels.dataset.Farmer_profile}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.Land_records}
                onChange={props.handleChangeLand_records}
              />
            }
            label={screenlabels.dataset.Land_records}
          />
        </Col>
      </Row>
      <Row className="checkbox2">
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.Cultivation_data}
                onChange={props.handleChangeCultivationData}
              />
            }
            label={screenlabels.dataset.Cultivation_data}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.Soil_data}
                onChange={props.handleChangeSoilData}
              />
            }
            label={screenlabels.dataset.Soil_data}
            className="soil"
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.Weather_data}
                onChange={props.handleChangeWeatherData}
              />
            }
            label={screenlabels.dataset.Weather_data}
            className="weather"
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
            value={props.Geography}
            onChange={props.handleChangeGeography}
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
            value={props.cropdetail}
            onChange={props.handleChangecropdetail}
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
            control={
              <Switch
                checked={props.Switchchecked}
                onChange={props.handleChangeSwitch}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={screenlabels.dataset.Constantly_updating}
            labelPlacement="start"
            className="constantswitch"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="radiobtns">
          {props.Switchchecked ? (
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              //   value={value}
              //   onChange={handleChange}
            >
              <FormControlLabel
                disabled
                value="3 months"
                control={<Radio />}
                label={screenlabels.dataset.three}
              />
              <FormControlLabel
                disabled
                value="6 months"
                control={<Radio />}
                label={screenlabels.dataset.six}
                className="sixmonth"
              />
              <FormControlLabel
                disabled
                value="9 months"
                control={<Radio />}
                label={screenlabels.dataset.nine}
                className="ninemonth"
              />
              <FormControlLabel
                disabled
                value="12 months"
                control={<Radio />}
                label={screenlabels.dataset.twelve}
                className="twelvemonth"
              />
            </RadioGroup>
          ) : (
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={props.value}
              onChange={props.handleChange}>
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
          )}
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
              value={props.fromdate}
              onChange={props.handleChangeFromDate}
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
              disabled={props.fromdate ? false : true}
              disableFuture
              label={screenlabels.dataset.End_Date}
              minDate={props.fromdate}
              value={props.todate}
              onChange={props.handleChangeToDate}
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
            value={props.recordsvalue}
            onChange={props.handleChangeRecords}>
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
            value={props.availablevalue}
            onChange={props.handleChangeAvailable}>
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
            handleChange={props.handleFileChange}
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
          {props.file
            ? props.file.size
              ? `File name: ${props.file.name}`
              : ""
            : ""}
        </p>
        <p className="oversizemb-uploadimglogo">
          {props.file != null && props.file.size > 2097152
            ? "File uploaded is more than 2MB!"
            : ""}
        </p>
      </Row>
    </div>
  );
}
