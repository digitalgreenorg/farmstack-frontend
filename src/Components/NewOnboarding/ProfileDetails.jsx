import React, { useContext, useEffect, useState } from "react";
import styles from "./onboarding.module.css";
import { Button, Col, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import global_style from "../../Assets/CSS/global.module.css";
import UrlConstant from "../../Constants/UrlConstants";
import MuiPhoneNumber from "material-ui-phone-number";
import HTTPService from "../../Services/HTTPService";
import {
  GetErrorHandlingRoute,
  GetErrorKey,
  getUserLocal,
} from "../../Utils/Common";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Alert } from "@mui/material";

const ProfileDetails = (props) => {
  const { callLoader } = useContext(FarmStackContext);
  const history = useHistory();
  const { setActiveStep } = props;
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

  const handleChangeProfileDetails = (e) => {
    if (e.target) {
      setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });
    } else {
      setProfileDetails({ ...profileDetails, contact_number: e ? e : "" });
    }
  };
  const [messageForSnackBar, setMessageForSnackBar] = useState("");
  const [errorOrSuccess, setErrorOrSuccess] = useState("error");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleSubmitProfileData = (e) => {
    e.preventDefault();
    {props.isAccountSetting ? console.log("accountDetails") : console.log(profileDetails);}
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
        // if (!props.isAccountSetting) {
          setActiveStep((prev) => prev + 1);
        // }
        // if(props.isAccountSetting) {
        // setMessageForSnackBar("Account details updated successfully!");
        // console.log(setMessageForSnackBar)
        // setErrorOrSuccess("success");
        // handleClick();
        // }
        setProfileDetailsError({
          first_name: "",
          last_name: "",
          email_id: "",
          contact_number: "",
        });
      })
      .catch((e) => {
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
                history.push(GetErrorHandlingRoute(e));
                break;
            }
          }
        } else {
          history.push(GetErrorHandlingRoute(e));
        }
      });
  };
  const getProfileData = () => {
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
      .catch((err) => {
        callLoader(false);
      });
  };

  useEffect(() => {
    if (getUserLocal()) {
      getProfileData();
    }
  }, []);
  return (
    <>
    {props.isAccountSetting ?
    <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
    //style={{ top: 0 , maxWidth: "1300px" }}
     style={{'maxWidth': "1300px"}} 
    //lassName='mui_snackbar_in_live_api_classname'
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      action={action}
    >
      <Alert
        autoHideDuration={4000}
        onClose={handleClose}
        sx={{ width: '100%', fontSize: '1.5rem' }}
        severity={errorOrSuccess}
      >
        {messageForSnackBar}
      </Alert>
    </Snackbar> : "" }
    <div className={styles.main_box}>
      <div className={styles.main_label}>
      {props.isAccountSetting ? "Account settings" : "Profile Details" } </div>

      {props.isAccountSetting ? "" : 
      <div className={styles.sub_label}>
       Enter your profile details, we will show to others!
      </div> }

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
              onChange={(e) => handleChangeProfileDetails(e)}
              error={profileDetailsError.contact_number ? true : false}
              helperText={profileDetailsError.contact_number}
            />
          </Col>
        </Row>
      </div>
      {props.isAccountSetting ? 
      <Row>
              <Col style={{ textAlign: "right", margin: "20px" }}>
                 <Button
                  id="cancelbutton_account"
                   variant="outlined"
                 style={{ margin: "20px" }}
                  className="button"
                 >
                   Cancel
                 </Button>
                 <Button
                   id="submitbutton_account"
                   variant="outlined"
                   className="button"
                   onClick={(e) => handleSubmitProfileData(e)}
                 >
                   Submit
                 </Button>
              </Col>
             </Row>
      :
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
      }
    </div>
    </>
  );
};

export default ProfileDetails;

