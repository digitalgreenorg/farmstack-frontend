import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataSetForm from "../../../Components/Datasets/DataSetForm";

import $ from "jquery";
import {
  validateInputField,
  handleUnwantedSpace,
  HandleSessionTimeout,
} from "../../../Utils/Common";
import RegexConstants from "../../../Constants/RegexConstants";
import THEME_COLORS from "../../../Constants/ColorConstants";

export default function AddDataset(props) {
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

  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  const handleChangeRecords = (event) => {
    console.log(event.target.value);
    setrecordsvalue(event.target.value);
  };
  const handleChangeAvailable = (event) => {
    console.log(event.target.value);
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
  const handleChangedatasetname = (e) => {
    validateInputField(e.target.value, RegexConstants.ORG_NAME_REGEX)
      ? setdatasetname(e.target.value)
      : e.preventDefault();
  };
  const handleChangedescription = (e) => {
    console.log(e.target.value);
    setreply(e.target.value);
  };
  const handledescriptionKeydown = (e) => {
    handleUnwantedSpace(reply, e);
  };
  const handleChangeGeography = (e) => {
    console.log(e.target.value);
    validateInputField(e.target.value, RegexConstants.ORG_NAME_REGEX)
      ? setGeography(e.target.value)
      : e.preventDefault();
  };
  const handleChangecropdetail = (e) => {
    console.log(e.target.value);
    validateInputField(e.target.value, RegexConstants.ORG_NAME_REGEX)
      ? setCropdetail(e.target.value)
      : e.preventDefault();
  };
  const handleChangeFromDate = (newValue) => {
    console.log(newValue);
    settodate(null);
    setfromdate(newValue);
    setTimeout(() => {
      $(".supportcardtodate input.MuiInputBase-input").attr(
        "disabled",
        "disabled"
      );
    }, 100);
  };

  const handleChangeToDate = (newValue) => {
    console.log(newValue);
    settodate(newValue);
  };
  //   switch
  const [Switchchecked, setSwitchchecked] = React.useState(false);

  const handleChangeSwitch = (event) => {
    console.log(event.target.checked);
    setSwitchchecked(event.target.checked);
  };

  //   checkbox
  const [Crop_data, setCrop_data] = React.useState(false);
  const [Practice_data, setPractice_data] = React.useState(false);
  const [Farmer_profile, setFarmer_profile] = React.useState(false);
  const [Land_records, setLand_records] = React.useState(false);
  const [Cultivation_data, setCultivation_data] = React.useState(false);
  const [Soil_data, setSoil_data] = React.useState(false);
  const [Weather_data, setWeather_data] = React.useState(false);

  const handleChangeCropData = (event) => {
    console.log(event.target.checked);
    setCrop_data(event.target.checked);
  };
  const handleChangePracticeData = (event) => {
    console.log(event.target.checked);
    setPractice_data(event.target.checked);
  };
  const handleChangeFarmer_profile = (event) => {
    console.log(event.target.checked);
    setFarmer_profile(event.target.checked);
  };
  const handleChangeLand_records = (event) => {
    console.log(event.target.checked);
    setLand_records(event.target.checked);
  };
  const handleChangeCultivationData = (event) => {
    console.log(event.target.checked);
    setCultivation_data(event.target.checked);
  };
  const handleChangeSoilData = (event) => {
    console.log(event.target.checked);
    setSoil_data(event.target.checked);
  };
  const handleChangeWeatherData = (event) => {
    console.log(event.target.checked);
    setWeather_data(event.target.checked);
  };
  return (
    <>
      <DataSetForm
        title={"Add Dataset"}
        reply={reply}
        datasetname={datasetname}
        handleChangedatasetname={handleChangedatasetname}
        handleChangedescription={handleChangedescription}
        handledescriptionKeydown={handledescriptionKeydown}
        Crop_data={Crop_data}
        handleChangeCropData={handleChangeCropData}
        Practice_data={Practice_data}
        handleChangePracticeData={handleChangePracticeData}
        Farmer_profile={Farmer_profile}
        handleChangeFarmer_profile={handleChangeFarmer_profile}
        Land_records={Land_records}
        handleChangeLand_records={handleChangeLand_records}
        Cultivation_data={Cultivation_data}
        handleChangeCultivationData={handleChangeCultivationData}
        Soil_data={Soil_data}
        handleChangeSoilData={handleChangeSoilData}
        Weather_data={Weather_data}
        handleChangeWeatherData={handleChangeWeatherData}
        Geography={Geography}
        handleChangeGeography={handleChangeGeography}
        cropdetail={cropdetail}
        handleChangecropdetail={handleChangecropdetail}
        Switchchecked={Switchchecked}
        handleChangeSwitch={handleChangeSwitch}
        value={value}
        handleChange={handleChange}
        fromdate={fromdate}
        handleChangeFromDate={handleChangeFromDate}
        todate={todate}
        handleChangeToDate={handleChangeToDate}
        recordsvalue={recordsvalue}
        handleChangeRecords={handleChangeRecords}
        availablevalue={availablevalue}
        handleChangeAvailable={handleChangeAvailable}
        handleFileChange={handleFileChange}
        file={file}
      />
    </>
  );
}
