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
  Alert,
  Stack,
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
  goToTop,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  validateInputField,
} from "../../../Utils/Common";
import RegexConstants from "../../../Constants/RegexConstants";
import { FarmStackContext } from "../../Contexts/FarmStackContext";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MuiPhoneNumber from "material-ui-phone-number";
import { isPhoneValid } from "../../NewOnboarding/utils";
const ParticipantFormNew = (props) => {
  const { callToast, callLoader } = useContext(FarmStackContext);

  const { title, isEditModeOn, userType } = props;
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

  const [selectCoSteward, setSelectCoSteward] = useState([]);
  const [selectedCosteward, setSelectedCosteward] = useState([]);
  const handlelistofCosteward = (e) => {
    console.log(e.target.value);
    setSelectedCosteward(e.target.value);
  };
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
  const [orgContactErrorMessage, setOrgContactErrorMessage] = useState(null);
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
  const handleContactNumber = (e, countryData) => {
    if (!isPhoneValid(e, countryData)) {
      setOrgContactErrorMessage("Invalid phone number");
    } else {
      setOrgContactErrorMessage(null);
    }
    setContactNumber(e);
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

    if (userType !== "guest") {
      bodyFormData.append(
        "role",
        isCoSteward
          ? labels.en.roleNo.coStewarRoleNo
          : labels.en.roleNo.participantsRoleNo
      );
    }
    if (userType !== "guest") bodyFormData.append("approval_status", true);
    let method = "POST";
    let url = "";
    if (userType == "guest") {
      url = UrlConstants.base_url + UrlConstants.register_participant;
    } else {
      url = UrlConstants.base_url + UrlConstants.participant;
    }

    if (isEditModeOn) {
      bodyFormData.append("id", orgId);
      bodyFormData.append("approval_status", istrusted);
      method = "PUT";
      url = UrlConstants.base_url + UrlConstants.participant + id + "/";
    }
    if (isLoggedInUserCoSteward()) {
      bodyFormData.append("on_boarded_by", getUserLocal());
    } else if (userType == "guest") {
      console.log(selectedCosteward, "selectCoSteward");
      bodyFormData.append("on_boarded_by", selectedCosteward);
    }
    callLoader(true);

    HTTPService(
      method,
      url,
      bodyFormData,
      false,
      userType == "guest" ? false : true
    )
      .then((response) => {
        callLoader(false);
        setisSuccess(true);
        console.log(response);
        if (response.status == 201) {
          handleCancel(true);
          callToast("Registered successfully!", "success", true);
        }
      })
      .catch(async (e) => {
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
          let error = await GetErrorHandlingRoute(e);
          console.log("Error obj", error);
          console.log(e);
          if (error.toast) {
            callToast(
              "Something went wrong",
              error?.status === 200 ? "success" : "error",
              true
            );
          }
          if (error.path) {
            history.push(error.path);
          }
        }
        // let error = await GetErrorHandlingRoute(e);
        // console.log("Error obj", error);
        // console.log(e);
        // if(error.toast){
        //   callToast(error?.message || "Something went wrong while loading dataset",
        //     error?.status === 200 ? "success" : "error",
        //     true);
        //   }
        //   if(error.path){
        //     history.push(error.path)
        //   }
      });
    goToTop(0);
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
      .catch(async (e) => {
        callLoader(false);
        // let error = GetErrorHandlingRoute(e);

        // console.log("Error obj", error);
        // callToast(error.message, "error", true);
        // console.log("err in switch", e);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };

  const getAllListOfCoSteward = () => {
    let url =
      UrlConstants.base_url + "datahub/participant/get_list_co_steward/";
    let method = "GET";
    HTTPService(
      "POST",
      UrlConstants.base_url + UrlConstants.costewardlist_selfregister,
      "",
      false,
      false
    )
      .then((response) => {
        // setIsLoader(false);
        console.log(response);
        setSelectCoSteward([...response.data]);
        console.log("response of costewards", response.data);
      })
      .catch(async (e) => {
        // setMessageForSnackBar("Get list of Co-Stewards failed!!!");
        // setIsLoader(false);
        // history.push(GetErrorHandlingRoute(e));
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };

  useEffect(() => {
    if (isEditModeOn) {
      getDataOnEdit();
    }
    if (userType == "guest") {
      getAllListOfCoSteward();
    }
  }, []);

  // console.log("error ", assignRole);

  return (
    <>
      <div>
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
            <Typography
              className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
            >
              {isEditModeOn
                ? " Update and modify your organization information as a participant."
                : "Provide information about your organization when joining as a participant."}
            </Typography>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                id="organisation-name-id"
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
                id="add-participant-mail-id"
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
                id="add-participant-website-link"
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
                id="add-participant-organisation-address"
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
                        <MenuItem
                          id={`country-${countryName + index}`}
                          value={countryName.label}
                        >
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
                className={LocalStyle.textField}
                label="PIN Code "
                fullWidth
                required
                value={organisationPinCode}
                onChange={(e) => {
                  if (
                    e.target.value.length <= 10 &&
                    validateInputField(
                      e.target.value,
                      RegexConstants.PINCODE_REGEX_NEWUI
                    )
                  ) {
                    setOrganisationPinCode(e.target.value.trim());
                  }
                }}
                id="add-participant-pin-code"
              />
            </Col>
          </Row>
        </Form>
      </div>
      <div>
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
            <Typography
              className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
            >
              {" "}
              {isEditModeOn
                ? "Modify and update your user details as the designated representative of your organization."
                : "Enter your details as the authorized user of organization."}{" "}
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
              id="add-participant-first-name"
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
              id="add-participant-last-name"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              id="add-participant-rootuser-mail-id"
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
            {/* <TextField
              className={LocalStyle.textField}
              label="Contact Number"
              fullWidth
              required
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
            /> */}
            <MuiPhoneNumber
              className={LocalStyle.textField}
              fullWidth
              required
              defaultCountry={"in"}
              countryCodeEditable={false}
              placeholder="Contact Number"
              label="Contact Number"
              variant="outlined"
              name="contact_number"
              value={contactNumber}
              onChange={(e, countryData) => handleContactNumber(e, countryData)}
              error={orgContactErrorMessage ? true : false}
              helperText={orgContactErrorMessage}
              id="add-participant-phone-number"
            />
          </Col>
        </Row>
        <Row>
          {userType != "guest" ? (
            <>
              {isLoggedInUserAdmin() ? (
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
                    id="add-participant-make-costeward"
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
              ) : (
                ""
              )}
            </>
          ) : (
            <Col xs={12} lg={12} sm={6} md={6} xl={12} className="text-left">
              <Typography
                id={title + "-form-title"}
                className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
              >
                Select Your Co-Steward
              </Typography>
              <Stack
                sx={{
                  width: "100%",
                  textAlign: "left",
                  paddingLeft: "28px",
                  paddingTop: "15px",
                  margin: "20px 0px",
                }}
                spacing={2}
              >
                <Alert severity="warning">
                  <strong>
                    If you do not select your Co-Steward, you will be the part
                    of Steward network
                  </strong>
                </Alert>
              </Stack>
              <FormControl
                className={LocalStyle.textField}
                variant="outlined"
                fullWidth
              >
                <InputLabel id="demo-multiple-name-label">Costeward</InputLabel>
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
                    labelId="Costeward"
                    id="select_costeward"
                    label="Costeward "
                    fullWidth
                    required
                    value={selectedCosteward}
                    onChange={handlelistofCosteward}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {selectCoSteward.map((listofcosteward, index) => {
                      return (
                        <MenuItem
                          id={"select-costeward-" + index}
                          key={index}
                          value={listofcosteward.user}
                        >
                          {" "}
                          {listofcosteward.organization_name}{" "}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              </FormControl>
            </Col>
          )}
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
          disabled={
            organisationName &&
            organisationEmail &&
            address &&
            organisationPinCode.length > 4 &&
            firstName &&
            email &&
            contactNumber &&
            !orgContactErrorMessage
              ? false
              : true
          }
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
