/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataSetForm from "../../../Components/Datasets/DataSetForm";

import $ from "jquery";
import GetErrorHandlingRoute, {
  validateInputField,
  handleUnwantedSpace,
  HandleSessionTimeout,
  getUserMapId,
} from "../../../Utils/Common";
import RegexConstants from "../../../Constants/RegexConstants";
import THEME_COLORS from "../../../Constants/ColorConstants";
import { useHistory } from "react-router-dom";
import labels from "../../../Constants/labels";
import Button from "@mui/material/Button";
import HTTPService from "../../../Services/HTTPService";
import UrlConstants from "../../../Constants/UrlConstants";
import Loader from "../../../Components/Loader/Loader";
import Success from "../../../Components/Success/Success";

const useStyles = {
  btncolor: {
    color: "white",
    "border-color": THEME_COLORS.THEME_COLOR,
    "background-color": THEME_COLORS.THEME_COLOR,
    float: "right",
    "border-radius": 0,
  },
  marginrowtop: { "margin-top": "20px" },
  marginrowtop8px: { "margin-top": "0px" },
};

export default function AddDataset(props) {
  useEffect(() => {
    setTimeout(() => {
      $(".addDatasetFromdate input.MuiInputBase-input").attr(
        "disabled",
        "disabled"
      );
      $(".addDatasetTodate input.MuiInputBase-input").attr(
        "disabled",
        "disabled"
      );
    }, 100);
  }, []);
  const history = useHistory();
  const [screenlabels, setscreenlabels] = useState(labels["en"]);

  const [reply, setreply] = useState("");
  const [datasetname, setdatasetname] = useState("");
  const [Geography, setGeography] = useState("");
  const [cropdetail, setCropdetail] = useState("");

  const [value, setValue] = React.useState("");
  const [recordsvalue, setrecordsvalue] = React.useState("");
  const [availablevalue, setavailablevalue] = React.useState("");

  //   const [value, setValue] = React.useState("3 months");
  //   const [recordsvalue, setrecordsvalue] = React.useState("100k");
  //   const [availablevalue, setavailablevalue] = React.useState("available");

  //   date picker
  const [fromdate, setfromdate] = React.useState(null);
  const [todate, settodate] = React.useState(null);

  const [file, setFile] = useState(null);

  //   loader
  const [isLoader, setIsLoader] = useState(false);
  //   success screen
  const [isSuccess, setisSuccess] = useState(false);

  const handleAddDatasetSubmit = (e) => {
    e.preventDefault();
    console.log("clicked on add dataset submit btn");
    var id = getUserMapId();
    console.log("user id", id);

    var bodyFormData = new FormData();
    bodyFormData.append("name", datasetname);
    bodyFormData.append("description", reply);
    bodyFormData.append(
      "category",
      JSON.stringify({
        crop_data: Crop_data,
        practice_data: Practice_data,
        farmer_profile: Farmer_profile,
        land_records: Land_records,
        cultivation_data: Cultivation_data,
        soil_data: Soil_data,
        weather_data: Weather_data,
        research_data: Research_data,
      })
    );
    bodyFormData.append("geography", Geography);
    bodyFormData.append("crop_detail", cropdetail);
    bodyFormData.append("constantly_update", Switchchecked);
    bodyFormData.append("age_of_date", value);
    if (fromdate != null) {
      bodyFormData.append("data_capture_start", fromdate.toISOString());
    }
    if (todate != null) {
      bodyFormData.append("data_capture_end", todate.toISOString());
    }
    if (file != null) {
      bodyFormData.append("sample_dataset", file);
    }
    bodyFormData.append("connector_availability", availablevalue);
    bodyFormData.append("dataset_size", recordsvalue);
    bodyFormData.append("user_map", id);

    console.log("add dataset", bodyFormData);
    setIsLoader(true);
    HTTPService(
      "POST",
      UrlConstants.base_url + UrlConstants.dataset,
      bodyFormData,
      true,
      true
    )
      .then((response) => {
        setIsLoader(false);
        setisSuccess(true);
        console.log("dataset uploaded!");
      })
      .catch((e) => {
        setIsLoader(false);
        // history.push(GetErrorHandlingRoute(e));
      });
  };

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
    console.log(file);
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
      $(".addDatasetTodate input.MuiInputBase-input").attr(
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
  const [Research_data, setResearch_data] = React.useState(false);

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
  const handleChangeResearchData = (event) => {
    console.log(event.target.checked);
    setResearch_data(event.target.checked);
  };
  return (
    <>
      {isLoader ? <Loader /> : ""}
      {isSuccess ? (
        <Success
          okevent={() => history.push("/datahub/datasets")}
          route={"datahub/participants"}
          imagename={"success"}
          btntext={"ok"}
          heading={"You added a new dataset"}
          imageText={"Added Successfully!"}
          msg={"Your dataset added in database."}></Success>
      ) : (
        <form noValidate autoComplete="off" onSubmit={handleAddDatasetSubmit}>
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
            Research_data={Research_data}
            handleChangeResearchData={handleChangeResearchData}
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

          <Row>
            <Col xs={12} sm={12} md={6} lg={3}></Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              {datasetname &&
              reply &&
              Geography &&
              file &&
              file.size < 2097152 &&
              (Crop_data == true ||
                Practice_data == true ||
                Farmer_profile == true ||
                Land_records == true ||
                Cultivation_data == true ||
                Soil_data == true ||
                Weather_data == true) ? (
                <Button
                  //   onClick={() => addNewParticipants()}
                  variant="contained"
                  className="submitbtn"
                  type="submit">
                  {screenlabels.common.submit}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  disabled
                  className="disbalesubmitbtn">
                  {screenlabels.common.submit}
                </Button>
              )}
            </Col>
          </Row>
          <Row style={useStyles.marginrowtop8px}>
            <Col xs={12} sm={12} md={6} lg={3}></Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button
                onClick={() => history.push("/datahub/datasets")}
                variant="outlined"
                className="cancelbtn">
                {screenlabels.common.cancel}
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </>
  );
}
