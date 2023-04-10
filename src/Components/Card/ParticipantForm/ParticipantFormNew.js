import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Typography, TextField } from "@mui/material";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import GlobalStyle from "../../../Assets/CSS/global.module.css";
import LocalStyle from "./ParticipantForm.module.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import labels from "../../../Constants/labels";
import UrlConstants from "../../../Constants/UrlConstants";
import HTTPService from "../../../Services/HTTPService";
import {
  GetErrorKey,
  getUserLocal,
  isLoggedInUserCoSteward,
} from "../../../Utils/Common";
import RegexConstants from "../../../Constants/RegexConstants";

const ParticipantFormNew = (props) => {
  const { title, isEditModeOn } = props;
  const history = useHistory();

  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  const [organisationName, setOrganisationName] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [organisationPinCode, setOrganisationPinCode] = useState("");
  const [organisationCountry, setOrganisationCountry] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [assignRole, setAssignRole] = useState("");

  // Error messages

  const [istrusted, setistrusted] = React.useState(false);
  const [isOrganisationeEmailError, setIsOrganisationEmailError] =
    useState(false);
  const [isContactNumberError, setIsContactNumberError] = useState(false);
  const [isWebsiteLinkrError, setEebsiteLinkError] = useState(false);
  const [isUserEmailerror, setIsUserEmailError] = useState(false);
  const [isExisitingUserEmail, setIsExisitingUserEmail] = useState(false);
  // const [ispincodeerror, setispincodeerror] = useState(false)
  const [isSuccess, setisSuccess] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState(null);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState(null);
  const [orgNameErrorMessage, setOrgNameErrorMessage] = useState(null);
  const [orgEmailErrorMessage, setOrgEmailErrorMessage] = useState(null);
  const [orgWebsiteErrorMessage, setOrgWebsiteErrorMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform form submission logic here
  };

  const isValidURL = (string) => {
    var res = string.match(RegexConstants.NEW_WEBSITE_REGEX);
    return res !== null;
  };
  const isValidCapsUrl = (string) => {
    var res1 = string.match(RegexConstants.NEW_C_WEBSITE_REGEX);
    return res1 !== null;
  };
  const addNewParticipants = () => {
    setFirstNameErrorMessage(null);
    setLastNameErrorMessage(null);
    setEmailErrorMessage(null);
    setPhoneNumberErrorMessage(null);
    setOrgNameErrorMessage(null);
    setOrgEmailErrorMessage(null);
    setOrgWebsiteErrorMessage(null);
    // setOrgSubscriptionErrorMessage(null)
    setIsOrganisationEmailError(null);
    var id = getUserLocal();
    var bodyFormData = new FormData();
    bodyFormData.append("email", email.toLowerCase());
    bodyFormData.append("org_email", organisationEmail.toLowerCase());
    bodyFormData.append("first_name", firstName);
    bodyFormData.append("last_name", lastName);
    bodyFormData.append("name", organisationName);
    bodyFormData.append("phone_number", contactNumber);
    bodyFormData.append("website", website);
    bodyFormData.append(
      "address",
      JSON.stringify({
        address: address,
        country: organisationCountry,
        pincode: organisationPinCode,
      })
    );

    bodyFormData.append("role", 3);
    if (isLoggedInUserCoSteward()) {
      bodyFormData.append("on_boarded_by", id);
    }
    setIsLoader(true);

    HTTPService(
      "POST",
      UrlConstants.base_url + UrlConstants.participant,
      bodyFormData,
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        setisSuccess(true);
        console.log(response);
      })
      .catch((e) => {
        setIsLoader(false);
        console.log(e);
        var returnValues = GetErrorKey(e, bodyFormData.keys());
        var errorKeys = returnValues[0];
        var errorMessages = returnValues[1];
        if (errorKeys.length > 0) {
          for (var i = 0; i < errorKeys.length; i++) {
            switch (errorKeys[i]) {
              case "first_name":
                setFirstNameErrorMessage(errorMessages[i]);
                break;
              case "last_name":
                setLastNameErrorMessage(errorMessages[i]);
                break;
              case "email":
                setEmailErrorMessage(errorMessages[i]);
                break;
              case "phone_number":
                setPhoneNumberErrorMessage(errorMessages[i]);
                break;
              case "name":
                setOrgNameErrorMessage(errorMessages[i]);
                break;
              case "org_email":
                setOrgEmailErrorMessage(errorMessages[i]);
                break;
              case "website":
                setOrgWebsiteErrorMessage(errorMessages[i]);
                break;
              // case "subscription": setOrgSubscriptionErrorMessage(errorMessages[i]); break;
              default:
                // history.push(GetErrorHandlingRoute(e));
                console.log("err in switch", e);
                break;
            }
          }
        } else {
          // history.push(GetErrorHandlingRoute(e));
          console.log("err", e);
        }
        //setisexisitinguseremail(true);
        //history.push(GetErrorHandlingRoute(e));
      });
  };

  return (
    <>
      <div className={LocalStyle.organisationFormContainer}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Typography
              id={title + "-form-title"}
              className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
            >
              {isEditModeOn
                ? "Edit Participant organisation details"
                : "Add Participant organisation details"}
            </Typography>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                className={LocalStyle.textField}
                label="Organisation Name"
                fullWidth
                required
                value={organisationName}
                onChange={(event) => setOrganisationName(event.target.value)}
                error={orgNameErrorMessage}
                helperText={orgNameErrorMessage ? orgNameErrorMessage : ""}
              />
            </Col>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                className={LocalStyle.textField}
                label="Mail Id "
                type="email"
                fullWidth
                required
                value={organisationEmail}
                onChange={(event) => setOrganisationEmail(event.target.value)}
                error={orgEmailErrorMessage ? true : false}
                helperText={orgEmailErrorMessage ? orgEmailErrorMessage : ""}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                className={LocalStyle.textField}
                label="Website Link"
                fullWidth
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                error={orgWebsiteErrorMessage}
                helperText={
                  orgWebsiteErrorMessage ? orgWebsiteErrorMessage : ""
                }
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                className={LocalStyle.textField}
                label="Organisation Address "
                fullWidth
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                className={LocalStyle.textField}
                label="Country "
                fullWidth
                required
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
            </Col>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                className={LocalStyle.textField}
                label="PIN Code "
                fullWidth
                required
                value={organisationPinCode}
                onChange={(event) => setOrganisationPinCode(event.target.value)}
              />
            </Col>
          </Row>
        </Form>
      </div>
      <div className={LocalStyle.organisationFormContainer}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Typography
              id={title + "-form-title"}
              className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
            >
              {isEditModeOn
                ? "Edit Participant root user details"
                : "Add Participant root user details"}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              className={LocalStyle.textField}
              label="First Name"
              fullWidth
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              error={firstNameErrorMessage}
              helperText={firstNameErrorMessage ? firstNameErrorMessage : ""}
            />
          </Col>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              className={LocalStyle.textField}
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              error={lastNameErrorMessage}
              helperText={lastNameErrorMessage ? lastNameErrorMessage : ""}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              className={LocalStyle.textField}
              label="Country "
              fullWidth
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Col>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              className={LocalStyle.textField}
              label="PIN Code "
              fullWidth
              required
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} xl={6}>
            <FormControl
              variant="outlined"
              fullWidth
              className={LocalStyle.textField}
            >
              <InputLabel id="assign-role-in-add-participants">
                Assign Role
              </InputLabel>

              <Select
                IconComponent={(_props) => (
                  <div style={{ position: "relative" }}>
                    <img
                      className={LocalStyle.icon}
                      src={require("../../../Assets/Img/down_arrow.svg")}
                    />
                  </div>
                )}
                labelId="Assign Role"
                id="assign-role-in-add-participants"
                // value={age}
                label="Assign Role"
                // onChange={handleChange}
              >
                <FormControlLabel
                  value="individual-organisation"
                  control={<Radio color="primary" />}
                  label="Individual Organisation"
                />
                <hr />
                <FormControlLabel
                  value="co-steward"
                  control={<Radio color="primary" />}
                  label="Co-Steward"
                />
                <hr />
                <FormControlLabel
                  value="participant"
                  control={<Radio color="primary" />}
                  label="Participant"
                />
                <hr />
              </Select>
            </FormControl>
          </Col>
        </Row>
      </div>
      <Row className={LocalStyle.buttonContainer}>
        <Button
          id="add-participant-submit-button"
          onClick={addNewParticipants}
          className={`${GlobalStyle.primary_button} ${LocalStyle.primary}`}
        >
          Submit
        </Button>
        <Button
          id={"add-participant-cancel-button"}
          variant="outlined"
          className={`${GlobalStyle.outlined_button} ${LocalStyle.cancelButton}`}
        >
          Cancel
        </Button>
      </Row>
      {/* </div> */}
    </>
  );
};

export default ParticipantFormNew;
