import React, { useContext, useEffect, useState } from "react";
import styles from "./onboarding.module.css";
import { Col, Row } from "react-bootstrap";
import { Button, TextField } from "@mui/material";
import global_style from "../../Assets/CSS/global.module.css";
import UrlConstant from "../../Constants/UrlConstants";
import MuiPhoneNumber from "material-ui-phone-number";
import HTTPService from "../../Services/HTTPService";
import {
  GetErrorHandlingRoute,
  GetErrorKey,
  getTokenLocal,
  getUserLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { useHistory } from "react-router-dom";
import { isPhoneValid } from "./utils";

const ProfileDetails = (props) => {
  const { callLoader, callToast } = useContext(FarmStackContext);
  // const isPhoneValid = (phone, country) => {
  //   try {
  //     const phoneNumber = isValidNumber(phone, country);
  //     return phoneNumber;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  const { setActiveStep } = props;
  const history = useHistory();
  const [profileDetails, setProfileDetails] = useState({
    first_name: "",
    last_name: "",
    email_id: localStorage.getItem("email")
      ? localStorage.getItem("email")
      : "",
    contact_number: "",
  });
  const [profileDetailsError, setProfileDetailsError] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    contact_number: "",
  });
  const handleChangeProfileDetails = (e, countryData) => {
    if (e.target) {
      setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });
    } else {
      if (!isPhoneValid(e, countryData)) {
        setProfileDetailsError((prevState) => ({
          ...prevState,
          contact_number: "Invalid phone number",
        }));
      } else {
        setProfileDetailsError((prevState) => ({
          ...prevState,
          contact_number: "",
        }));
      }
      setProfileDetails({ ...profileDetails, contact_number: e ? e : "" });
    }
  };

  const setOnBoardedTrue = () => {
    let data = {
      user_id: getUserLocal(),
      on_boarded: true,
    };
    var url = UrlConstant.base_url + UrlConstant.onboarded;
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", getUserLocal());
    bodyFormData.append("on_boarded", true);

    // setIsLoader(true);
    HTTPService("POST", url, data, false, true, getTokenLocal())
      .then((response) => {
        // setIsLoader(false);
        callToast("Onboarded", "success", true);

        console.log("onboarded true response", response.data);
        if (isLoggedInUserAdmin()) {
          history.push("/datahub/new_datasets");
        } else if (isLoggedInUserParticipant()) {
          history.push("/participant/datasets");
        } else if (isLoggedInUserCoSteward()) {
          history.push("/datahub/new_datasets");
        }
      })
      .catch((e) => {
        callToast("Some error occurred", "error", true);
        console.log(e);
      });
  };
  const handleSubmitProfileData = (e) => {
    e.preventDefault();
    {
      props.isAccountSetting
        ? console.log("accountDetails")
        : console.log(profileDetails);
    }
    let method = "PUT";
    let url = UrlConstant.base_url + UrlConstant.profile + getUserLocal() + "/";

    var bodyFormData = new FormData();
    bodyFormData.append("email", profileDetails.email_id);
    bodyFormData.append("first_name", profileDetails.first_name);
    bodyFormData.append("last_name", profileDetails.last_name);
    bodyFormData.append("phone_number", profileDetails.contact_number);
    callLoader(true);
    HTTPService(method, url, bodyFormData, true, true, false, false)
      .then((res) => {
        console.log(res);
        callLoader(false);

        if (!props.isAccountSetting) {
          // if (isLoggedInUserParticipant() || isLoggedInUserCoSteward()) {
          //   setOnBoardedTrue();
          // } else {
          setActiveStep((prev) => prev + 1);
          // }
        }
        if (props.isAccountSetting && res.status === 201)
          callToast("Account settings updated successfully!", "success", true);

        setProfileDetailsError({
          first_name: "",
          last_name: "",
          email_id: "",
          contact_number: "",
        });
      })
      .catch(async (e) => {
        callLoader(false);
        var returnValues = GetErrorKey(e, bodyFormData.keys());
        var errorKeys = returnValues[0];
        var errorMessages = returnValues[1];
        if (errorKeys.length > 0) {
          for (var i = 0; i < errorKeys.length; i++) {
            switch (errorKeys[i]) {
              case "first_name":
                setProfileDetailsError({
                  ...profileDetailsError,
                  first_name: errorMessages[i],
                });
                break;
              case "last_name":
                setProfileDetailsError({
                  ...profileDetailsError,
                  last_name: errorMessages[i],
                });
                break;
              case "email":
                setProfileDetailsError({
                  ...profileDetailsError,
                  email_id: errorMessages[i],
                });
                break;
              case "phone_number":
                setProfileDetailsError({
                  ...profileDetailsError,
                  contact_number: errorMessages[i],
                });
                break;
              default:
                let error = await GetErrorHandlingRoute(e);
                if (error) {
                  callToast(error?.message, "error", true);
                }
                break;
            }
          }
        } else {
          let error = await GetErrorHandlingRoute(e);
          if (error) {
            callToast(error?.message ?? "Unknown", "error", true);
          }
        }
      });
  };
  const getProfileData = () => {
    callLoader(true);
    let method = "GET";
    let url = UrlConstant.base_url + UrlConstant.profile + getUserLocal() + "/";
    HTTPService(method, url, "", false, true, false, false)
      .then((res) => {
        console.log(res);
        setProfileDetails({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email_id: res.data.email,
          contact_number: res.data.phone_number,
        });
        callLoader(false);
      })
      .catch(async (e) => {
        callLoader(false);
        let response = await GetErrorHandlingRoute(e);
        if (response.toast) {
          //callToast(message, type, action)

          callToast(
            response?.message ?? "Error occurred while getting policy details",
            response.status == 201 ? "success" : "error",
            response.toast
          );
        } else {
          history.push(response?.path);
        }
      });
  };
  useEffect(() => {
    if (getUserLocal()) {
      getProfileData();
    }
  }, []);
  return (
    <>
      <div className={styles.main_box}>
        <div className={styles.main_label}>
          {props.isAccountSetting ? "Account settings" : "Profile Details"}{" "}
        </div>

        {props.isAccountSetting ? (
          ""
        ) : (
          <div className={styles.sub_label}>
            Enter your profile details, we will show to others!
          </div>
        )}

        <div className={styles.all_inputs}>
          <Row>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <TextField
                name="first_name"
                fullWidth
                required
                placeholder="First Name"
                id="profile_details_first_name"
                label="First Name"
                variant="outlined"
                value={profileDetails.first_name}
                onChange={(e) => handleChangeProfileDetails(e)}
                error={profileDetailsError.first_name ? true : false}
                helperText={profileDetailsError.first_name}
              />
            </Col>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                placeholder="Last Name"
                id="profile_details_last_name"
                label="Last Name"
                variant="outlined"
                name="last_name"
                value={profileDetails.last_name}
                onChange={(e) => handleChangeProfileDetails(e)}
                error={profileDetailsError.last_name ? true : false}
                helperText={profileDetailsError.last_name}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <TextField
                name="email_id"
                disabled
                fullWidth
                required
                placeholder="Enter mail id"
                id="profile_details_email"
                label="Enter mail id"
                variant="outlined"
                value={profileDetails.email_id}
                onChange={(e) => handleChangeProfileDetails(e)}
                error={profileDetailsError.email_id ? true : false}
                helperText={profileDetailsError.email_id}
              />
            </Col>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <MuiPhoneNumber
                fullWidth
                required
                defaultCountry={"in"}
                countryCodeEditable={false}
                name="contact_number"
                placeholder="Contact Number"
                id="profile_details_contact_number"
                label="Contact Number"
                variant="outlined"
                value={profileDetails.contact_number}
                onChange={(value, countryData) =>
                  handleChangeProfileDetails(value, countryData)
                }
                error={profileDetailsError.contact_number ? true : false}
                helperText={profileDetailsError.contact_number}
              />
            </Col>
          </Row>
        </div>
        {props.isAccountSetting ? (
          <Row>
            <Col style={{ textAlign: "right", margin: "20px" }}>
              <Button
                id="cancelbutton_account"
                variant="outlined"
                style={{ margin: "20px" }}
                className={global_style.secondary_button}
                onClick={() =>
                  isLoggedInUserParticipant()
                    ? history.push("/participant/new_datasets")
                    : history.push("/datahub/new_datasets")
                }
              >
                Cancel
              </Button>
              <Button
                disabled={
                  !profileDetailsError.contact_number &&
                  profileDetails.contact_number &&
                  profileDetails.email_id &&
                  profileDetails.first_name
                    ? false
                    : true
                }
                id="submitbutton_account"
                variant="outlined"
                className={
                  global_style.primary_button + " " + styles.next_button
                }
                onClick={(e) => handleSubmitProfileData(e)}
              >
                Submit
              </Button>
            </Col>
          </Row>
        ) : (
          <div className={styles.button_grp}>
            <Button
              onClick={() => setActiveStep((prev) => prev + 1)}
              className={global_style.secondary_button}
            >
              {" "}
              Finish later
            </Button>
            <Button
              disabled={
                !profileDetailsError.contact_number &&
                profileDetails.contact_number &&
                profileDetails.email_id &&
                profileDetails.first_name
                  ? false
                  : true
              }
              onClick={(e) => handleSubmitProfileData(e)}
              className={global_style.primary_button + " " + styles.next_button}
            >
              {" "}
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileDetails;
