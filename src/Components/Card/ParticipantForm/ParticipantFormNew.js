import React, { useEffect, useMemo, useState, useContext } from "react";
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
import {
  Typography,
  TextField,
  Checkbox,
  Tooltip,
  IconButton,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import GlobalStyle from "../../../Assets/CSS/global.module.css";
import LocalStyle from "./ParticipantForm.module.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import labels from "../../../Constants/labels";
import UrlConstants from "../../../Constants/UrlConstants";
import HTTPService from "../../../Services/HTTPService";
import countryList from "react-select-country-list";
import {
  GetErrorHandlingRoute,
  GetErrorKey,
  getUserLocal,
  isLoggedInUserCoSteward,
  validateInputField,
} from "../../../Utils/Common";
import RegexConstants from "../../../Constants/RegexConstants";
import { FarmStackContext } from "../../Contexts/FarmStackContext";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ParticipantFormNew = (props) => {
  const { callToast, callLoader } = useContext(FarmStackContext);

  const { title, isEditModeOn } = props;
  const history = useHistory();
  const countryNameList = useMemo(() => countryList().getData(), []);
  const { id } = useParams();

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
  const [isCoSteward, setIsCoSteward] = useState(false);

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
  // const [isLoader, callLoader] = useState(false);

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState(null);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState(null);
  const [orgNameErrorMessage, setOrgNameErrorMessage] = useState(null);
  const [orgEmailErrorMessage, setOrgEmailErrorMessage] = useState(null);
  const [orgWebsiteErrorMessage, setOrgWebsiteErrorMessage] = useState(null);
  const [orgId, setOrgId] = useState("");

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

  const handleCancel = (clearAllField) => {
    if (isEditModeOn) {
      history.go(-2);
    } else {
      history.go(-1);
    }

    setOrganisationName("");
    setOrganisationEmail("");
    setWebsite("");
    setAddress("");
    setOrganisationPinCode("");
    setOrganisationCountry("");
    setCountry("");
    setPinCode("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNumber("");
    // setAssignRole("");
    setIsCoSteward(false);

    setistrusted(false);
    setIsOrganisationEmailError(false);
    setIsContactNumberError(false);
    setEebsiteLinkError(false);
    setIsUserEmailError(false);
    setIsExisitingUserEmail(false);
    setisSuccess(false);
    callLoader(false);

    setFirstNameErrorMessage(null);
    setLastNameErrorMessage(null);
    setEmailErrorMessage(null);
    setPhoneNumberErrorMessage(null);
    setOrgNameErrorMessage(null);
    setOrgEmailErrorMessage(null);

    setOrgWebsiteErrorMessage(null);
    setOrgId("");
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
    // var id = getUserLocal();
    var bodyFormData = new FormData();
    if (!isEditModeOn) bodyFormData.append("email", email.toLowerCase());
    if (!isEditModeOn)
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

    bodyFormData.append(
      "role",
      isCoSteward
        ? labels.en.roleNo.coStewarRoleNo
        : labels.en.roleNo.participantsRoleNo
    );
    bodyFormData.append("approval_status", true);
    let method = "POST";
    let url = UrlConstants.base_url + UrlConstants.participant;

    if (isEditModeOn) {
      bodyFormData.append("id", orgId);
      bodyFormData.append("approval_status", istrusted);
      method = "PUT";
      url = UrlConstants.base_url + UrlConstants.participant + id + "/";
    }
    if (isLoggedInUserCoSteward()) {
      bodyFormData.append("on_boarded_by", getUserLocal());
    }
    callLoader(true);

    HTTPService(method, url, bodyFormData, false, true)
      .then((response) => {
        callLoader(false);
        setisSuccess(true);
        console.log(response);
        if (response.status == 201) {
          handleCancel(true);
          // callToast(error.message, "success", true);
        }
      })
      .catch((e) => {
        callLoader(false);
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
                let error = GetErrorHandlingRoute(e);

                console.log("Error obj", error);
                callToast(error.message, "error", true);
                console.log("err in switch", e);
                break;
            }
          }
        } else {
          let error = GetErrorHandlingRoute(e);

          console.log("Error obj", error);
          callToast(error.message, "error", true);
          console.log("err in switch", e);
        }
        let error = GetErrorHandlingRoute(e);

        console.log("Error obj", error);
        callToast(error.message, "error", true);
        console.log("err in switch", e);
      });
  };

  const getDataOnEdit = () => {
    callLoader(true);
    HTTPService(
      "GET",
      UrlConstants.base_url + UrlConstants.participant + id + "/",
      "",
      false,
      true
    )
      .then((response) => {
        callLoader(false);
        console.log("otp valid", response.data);
        // let addressdata=JSON.parse(response.data.organization.address)
        setOrganisationName(response.data.organization.name);
        setAddress(
          response.data.organization.address.address ||
            JSON.parse(response?.data?.organization?.address)?.address
        );
        setOrganisationEmail(response.data.organization.org_email);
        setOrganisationCountry(
          response.data.organization.address.country ||
            JSON.parse(response?.data?.organization?.address)?.country
        );
        setContactNumber(response.data.user.phone_number);
        setWebsite(response.data.organization.website);
        setOrganisationPinCode(
          response.data.organization.address.pincode ||
            JSON.parse(response?.data?.organization?.address)?.pincode
        );
        setFirstName(response.data.user.first_name);
        setLastName(response.data.user.last_name);
        setEmail(response.data.user.email);
        // setorganisationlength(response.data.user.subscription)
        setOrgId(response.data.organization_id);
        setistrusted(response.data.user.approval_status);
        if (response?.data?.user?.role == 6) {
          setIsCoSteward(true);
        } else if (response?.data?.user?.role == 3) {
          setIsCoSteward(false);
        }
      })
      .catch((e) => {
        callLoader(false);
        let error = GetErrorHandlingRoute(e);

        console.log("Error obj", error);
        callToast(error.message, "error", true);
        console.log("err in switch", e);
      });
  };

  useEffect(() => {
    if (isEditModeOn) {
      getDataOnEdit();
    }
  }, []);

  // console.log("error ", assignRole);

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
                onChange={
                  (e) =>
                    // validateInputField(
                    //   e.target.value,
                    //   RegexConstants.ORG_NAME_REGEX
                    // )
                    // ?
                    setOrganisationName(e.target.value)
                  // : e.preventDefault()
                }
                error={orgNameErrorMessage ? true : false}
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
                disabled={isEditModeOn}
                onChange={(e) => {
                  // validateInputField(
                  //   e.target.value,
                  //   RegexConstants.NO_SPACE_REGEX
                  // )
                  //   ?
                  setOrganisationEmail(e.target.value.trim());
                  // : e.preventDefault();
                }}
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
                onChange={(event) => setWebsite(event.target.value.trim())}
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
              <FormControl
                className={LocalStyle.textField}
                variant="outlined"
                fullWidth
              >
                <InputLabel id="demo-multiple-name-label">Country</InputLabel>
                {
                  <Select
                    IconComponent={(_props) => (
                      <div style={{ position: "relative" }}>
                        <img
                          className={LocalStyle.icon}
                          src={require("../../../Assets/Img/down_arrow.svg")}
                        />
                      </div>
                    )}
                    labelId="Country"
                    id="country-in-add-participants"
                    label="Country "
                    fullWidth
                    required
                    value={organisationCountry}
                    onChange={(event) =>
                      setOrganisationCountry(event.target.value)
                    }
                  >
                    {countryNameList?.map((countryName, index) => {
                      return (
                        <MenuItem value={countryName.label}>
                          {countryName.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              </FormControl>
              {/* <FormControl
                variant="outlined"
                fullWidth
                // sx={{ m: 1, minWidth: 1200 }}
              >
                <InputLabel id="demo-simple-select-helper-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={"age"}
                  label="Age"
                  // onChange={handleChange}
                >
                  {countryNameList?.map((countryName, index) => {
                    return (
                      <MenuItem value={countryName.label}>
                        {countryName.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
            </Col>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                type={"number"}
                className={LocalStyle.textField}
                label="PIN Code "
                fullWidth
                required
                value={organisationPinCode}
                // onChange={(event) => setOrganisationPinCode(event.target.value)}
                onChange={(e) => {
                  if (e.target.value.length > 10)
                    e.target.value = e.target.value.substring(0, 10);
                  // validateInputField(
                  //   e.target.value,
                  //   RegexConstants.PINCODE_REGEX
                  // )
                  // ?
                  setOrganisationPinCode(e.target.value.trim());
                  // : e.preventDefault();
                }}
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
              label="Mail Id "
              type="email"
              fullWidth
              required
              value={email}
              disabled={isEditModeOn}
              onChange={(e) => {
                // validateInputField(
                //   e.target.value,
                //   RegexConstants.NO_SPACE_REGEX
                // )
                //   ?
                setEmail(e.target.value.trim());
                // : e.preventDefault();
              }}
              error={emailErrorMessage ? true : false}
              helperText={emailErrorMessage ? emailErrorMessage : ""}
            />
            {/* <TextField
              className={LocalStyle.textField}
              label="Country "
              fullWidth
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            /> */}
          </Col>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              className={LocalStyle.textField}
              label="Contact Number"
              fullWidth
              required
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col
            className={`${LocalStyle.alignLeft}`}
            xs={12}
            sm={6}
            md={6}
            xl={6}
          >
            <Checkbox
              checked={isCoSteward}
              onChange={() => setIsCoSteward(!isCoSteward)}
            />
            <Typography
              className={`${GlobalStyle.size16} ${LocalStyle.setCoSteward}`}
            >
              Co-Steward
            </Typography>{" "}
            <Tooltip
              placement="right-start"
              title="By checking chekbox you are adding the organisation as co-steward"
            >
              <IconButton className={LocalStyle.infoIcon}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
        {/* <Row>
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
                value={!isEditModeOn ? "Participant" : assignRole}
                label="Assign Role"
                onChange={(e) => {
                  // console.log(e.target.value, assignRole);
                  setAssignRole(e.target.value);
                }}
              >
                <MenuItem value="Individual Organisation">
                  Individual Organisation
                </MenuItem>
                <MenuItem value="Co-Steward">Co-Steward</MenuItem>
                <MenuItem value="Participant">Participant</MenuItem>
               
              </Select>
            </FormControl>
          </Col>
        </Row>  */}
      </div>
      <Row className={LocalStyle.buttonContainer}>
        <Button
          id="add-participant-submit-button"
          onClick={addNewParticipants}
          className={`${GlobalStyle.primary_button} ${LocalStyle.primaryButton}`}
        >
          Submit
        </Button>
        <Button
          id={"add-participant-cancel-button"}
          variant="outlined"
          className={`${GlobalStyle.outlined_button} ${LocalStyle.cancelButton}`}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Row>
      {/* </div> */}
    </>
  );
};

export default ParticipantFormNew;
