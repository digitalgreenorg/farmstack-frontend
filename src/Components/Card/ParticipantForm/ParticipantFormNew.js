import React, { useEffect, useMemo, useState, useContext } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import {
  Typography,
  TextField,
  Checkbox,
  Tooltip,
  IconButton,
  Alert,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import GlobalStyle from "../../../Assets/CSS/global.module.css";
import LocalStyle from "./ParticipantForm.module.css";
import labels from "../../../Constants/labels";
import UrlConstants from "../../../Constants/UrlConstants";
import HTTPService from "../../../Services/HTTPService";
// import countryList from "react-select-country-list";
import { Country, State, City } from "country-state-city";
import {
  GetErrorHandlingRoute,
  GetErrorKey,
  checkProjectFor,
  getUserLocal,
  goToTop,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  validateInputField,
} from "../../../Utils/Common";
import RegexConstants from "../../../Constants/RegexConstants";
import { FarmStackContext } from "../../Contexts/FarmStackContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MuiPhoneNumber from "material-ui-phone-number";
import { isPhoneValid } from "../../NewOnboarding/utils";
const ParticipantFormNew = (props) => {
  const { callToast, callLoader } = useContext(FarmStackContext);

  const { title, isEditModeOn, userType } = props;
  const history = useHistory();
  // const countryNameList = useMemo(() => countryList().getData(), []);
  const { id } = useParams();
  const [organisationName, setOrganisationName] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState(
    generateRandomData("email")
  );
  const [website, setWebsite] = useState(generateRandomData("website"));
  const [address, setAddress] = useState(generateRandomData("address"));
  const [geography, setGeography] = useState({
    country: {
      name: "India",
      isoCode: "IN",
      flag: "🇮🇳",
      phonecode: "91",
      currency: "INR",
      latitude: "20.00000000",
      longitude: "77.00000000",
      timezones: [
        {
          zoneName: "Asia/Kolkata",
          gmtOffset: 19800,
          gmtOffsetName: "UTC+05:30",
          abbreviation: "IST",
          tzName: "Indian Standard Time",
        },
      ],
    },
    state: {
      name: "Karnataka",
      isoCode: "KA", // Ensure the correct ISO code as per the library or data source
      latitude: "14.7504291",
      longitude: "75.7138884",
    },
    city: {
      name: "Bangalore",
      latitude: "12.9715987",
      longitude: "77.5945627",
    },
  });
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [organisationPinCode, setOrganisationPinCode] = useState("500085");
  const [organisationCountry, setOrganisationCountry] = useState("India");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState(
    generateValidIndianPhoneNumber()
  );
  console.log("🚀 ~ ParticipantFormNew ~ contactNumber:", contactNumber);
  const [isCoSteward, setIsCoSteward] = useState(false);

  const [selectCoSteward, setSelectCoSteward] = useState([]);
  const [selectedCosteward, setSelectedCosteward] = useState("");
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

  const [role, setRole] = useState(
    isLoggedInUserCoSteward() ? "teamMember" : "teamLead"
  );

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform form submission logic here
  };

  const handleChangeContactNumber = (e, countryData) => {
    console.log(
      "🚀 ~ file: ParticipantFormNew.js:89 ~ handleChangeContactNumber ~ number:",
      e
    );
    if (!isPhoneValid(e, countryData)) {
      setOrgContactErrorMessage((prevState) => "Invalid phone number");
    } else {
      setOrgContactErrorMessage((prevState) => "");
    }

    let index = `+${countryData?.dialCode}`.length;
    if (!e.includes(" ", index)) {
      e = e.substr(0, index) + " " + e.substr(index);
      setContactNumber(e);
    } else {
      setContactNumber(e);
    }
  };

  function generateValidIndianPhoneNumber() {
    // Country code for India
    const countryCode = "+91 ";

    // Generate the first digit (6-9 for valid Indian mobile numbers)
    const firstDigit = Math.floor(Math.random() * 4) + 6;

    // Generate the remaining 9 digits
    let remainingDigits = "";
    for (let i = 0; i < 9; i++) {
      remainingDigits += Math.floor(Math.random() * 10);
    }

    // Format the phone number with hyphen after the 5th digit
    const formattedNumber =
      remainingDigits.slice(0, 5) + "-" + remainingDigits.slice(5);

    // Combine country code and formatted number
    return countryCode + firstDigit + formattedNumber;
  }

  // const handleContactNumber = (e, countryData) => {

  //   console.log("countryData 90",isPhoneValid("+91 9137831800"))
  //   if (!isPhoneValid(e, countryData)) {
  //     setOrgContactErrorMessage("Invalid phone number");
  //   } else {
  //     setOrgContactErrorMessage(null);
  //   }
  //   setContactNumber(e);
  // };

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
    setGeography({
      country: {
        name: "India",
        isoCode: "IN",
        flag: "🇮🇳",
        phonecode: "91",
        currency: "INR",
        latitude: "20.00000000",
        longitude: "77.00000000",
        timezones: [
          {
            zoneName: "Asia/Kolkata",
            gmtOffset: 19800,
            gmtOffsetName: "UTC+05:30",
            abbreviation: "IST",
            tzName: "Indian Standard Time",
          },
        ],
      },
      state: null,
      city: null,
    });
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
    let orgName =
      role == "teamLead" ? organisationName : generateRandomData("team");
    bodyFormData.append("name", orgName);
    bodyFormData.append("phone_number", contactNumber);
    bodyFormData.append("website", website);
    bodyFormData.append(
      "address",
      JSON.stringify({
        address: address,
        country: geography?.country?.name,
        pincode: organisationPinCode,
      })
    );
    bodyFormData.append("geography", JSON.stringify(geography));

    // if (userType !== "guest") {
    bodyFormData.append(
      "role",
      role === "teamLead"
        ? labels.en.roleNo.coStewarRoleNo
        : labels.en.roleNo.participantsRoleNo
    );
    // }
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
          callToast(
            isEditModeOn ? "Updated successfully!" : "Registered successfully!",
            "success",
            true
          );
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
        setOrganisationCountry(response?.data?.organization?.address?.country);
        if (
          response?.data?.geography &&
          Object.keys(response?.data?.geography)?.length
        ) {
          setGeography(response.data?.geography);
        }
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
  const handleOrgWebsite = (e) => {
    setWebsite(e.target.value.trim());
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
  useEffect(() => {
    setCountryList(Country.getAllCountries());
    if (geography?.country) {
      setStateList(State?.getStatesOfCountry(geography?.country?.isoCode));
    }
    if (geography?.country && geography?.state?.name) {
      setDistrictList(
        City.getCitiesOfState(
          geography?.state?.countryCode,
          geography?.state?.isoCode
        )
      );
    }
  }, [geography]);

  function generateRandomData(type) {
    const names = [
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Eve",
      "Fiona",
      "George",
      "Hannah",
      "Ivy",
      "Jack",
    ];
    const domains = [
      "example.com",
      "test.org",
      "demo.net",
      "sample.edu",
      "placeholder.co",
    ];
    const websitePrefixes = [
      "https://my",
      "https://the",
      "https://awesome",
      "https://get",
      "https://start",
    ];
    const tlds = [".com", ".net", ".org", ".info", ".biz"];
    const streets = [
      "Maple Street",
      "Oak Avenue",
      "Pine Lane",
      "Cedar Road",
      "Elm Drive",
    ];
    const cities = [
      "Springfield",
      "Ridgewood",
      "Elmwood",
      "Brookdale",
      "Lakeview",
    ];
    const states = ["CA", "TX", "FL", "NY", "PA"];
    const teamPrefixes = [
      "Green",
      "Eco",
      "Agri",
      "Farm",
      "Bio",
      "Earth",
      "Nature",
      "Crop",
      "Field",
      "Seed",
      "Grow",
      "Botanic",
      "Terra",
      "Harvest",
      "Root",
    ];
    const teamSuffixes = ["Squad", "Collective", "Team", "Group", "Pros"];

    switch (type) {
      case "email":
        const name = names[Math.floor(Math.random() * names.length)];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `${name.toLowerCase()}${Math.floor(
          Math.random() * 100
        )}@${domain}`;

      case "phone":
        let firstDigit = Math.floor(Math.random() * 4) + 6;
        let phoneNumber = firstDigit.toString();
        for (let i = 0; i < 9; i++) {
          phoneNumber += Math.floor(Math.random() * 10).toString();
        }
        return phoneNumber;

      case "name":
        return `${names[Math.floor(Math.random() * names.length)]} ${
          names[Math.floor(Math.random() * names.length)]
        }`;

      case "website":
        const prefix =
          websitePrefixes[Math.floor(Math.random() * websitePrefixes.length)];
        const siteName =
          names[Math.floor(Math.random() * names.length)].toLowerCase();
        const tld = tlds[Math.floor(Math.random() * tlds.length)];
        return `${prefix}${siteName}${Math.floor(Math.random() * 100)}${tld}`;

      case "address":
        const street = streets[Math.floor(Math.random() * streets.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const state = states[Math.floor(Math.random() * states.length)];
        const streetNumber = Math.floor(Math.random() * 1000);
        return `${streetNumber} ${street}, ${city}, ${state}`;

      case "organisation":
      case "team":
        const teamPrefix =
          teamPrefixes[Math.floor(Math.random() * teamPrefixes.length)];
        const teamSuffix =
          teamSuffixes[Math.floor(Math.random() * teamSuffixes.length)];
        const teamCore = names[Math.floor(Math.random() * names.length)];
        return `${teamPrefix} ${teamCore} ${teamSuffix}`;

      default:
        return "Invalid type specified";
    }
  }

  console.log(role, "role");

  return (
    <>
      <div style={{ marginTop: "10px", display: "none" }}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Typography
              id={title + "-form-title"}
              className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
            >
              {isEditModeOn
                ? "Edit Member organisation details"
                : "Add Member organisation details"}
            </Typography>
            <Typography
              className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
            >
              {isEditModeOn
                ? " Update and modify your organisation information as a member."
                : "Provide information about your organisation when joining as a member."}
            </Typography>
          </Col>
        </Row>
        <Form
          onSubmit={handleSubmit}
          data-testid="handle-submit-button"
          style={{ padding: "0 20px", display: "none" }}
        >
          <Row>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                id="organisation-name-id"
                className={LocalStyle.textField}
                label="Organisation Name"
                fullWidth
                required
                value={organisationName}
                defaultValue={generateRandomData("name")}
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
                label="Organisation email Id"
                type="email"
                fullWidth
                required
                value={organisationEmail}
                disabled={isEditModeOn}
                defaultValue={generateRandomData("email")}
                onChange={(e) => {
                  setOrganisationEmail(e.target.value.trim());
                }}
                error={orgEmailErrorMessage ? true : false}
                helperText={orgEmailErrorMessage ? orgEmailErrorMessage : ""}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                required
                id="add-participant-website-link"
                className={LocalStyle.textField}
                label="Website Link"
                fullWidth
                value={website}
                defaultValue={generateRandomData("website")}
                onChange={handleOrgWebsite}
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
                defaultValue={generateRandomData("address")}
                fullWidth
                required
                value={address}
                onChange={(event) => {
                  console.log("event.target.value", event.target.value);
                  if (event.target.value?.length < 256) {
                    setAddress(event.target.value);
                  }
                }}
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
                    style={{
                      textAlign: "left",
                    }}
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
                    disabled
                    value={geography?.country?.name}
                    renderValue={() => geography?.country?.name}
                    onChange={(e) =>
                      setGeography((prev) => ({
                        ...prev,
                        country: e.target.value,
                        state: "",
                        city: "",
                      }))
                    }
                  >
                    {countryList?.map((countryName, index) => {
                      return (
                        <MenuItem
                          id={`country-${countryName + index}`}
                          value={countryName}
                        >
                          {countryName.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              </FormControl>
            </Col>
            <Col xs={12} sm={6} md={6} xl={6}>
              <FormControl
                className={LocalStyle.textField}
                variant="outlined"
                fullWidth
              >
                <InputLabel id="demo-multiple-name-label">State</InputLabel>
                {
                  <Select
                    style={{
                      textAlign: "left",
                    }}
                    IconComponent={(_props) => (
                      <div style={{ position: "relative" }}>
                        <img
                          className={LocalStyle.icon}
                          src={require("../../../Assets/Img/down_arrow.svg")}
                        />
                      </div>
                    )}
                    labelId="State"
                    id="state-in-add-participants"
                    label="State "
                    fullWidth
                    required
                    value={geography?.state?.name}
                    onChange={(e) =>
                      setGeography((prev) => ({
                        ...prev,
                        state: e.target.value,
                        city: "",
                      }))
                    }
                    renderValue={() => geography?.state?.name}
                  >
                    {stateList?.map((stateName, index) => {
                      return (
                        <MenuItem
                          id={`state-${stateName + index}`}
                          value={stateName}
                        >
                          {stateName.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={6} xl={6}>
              <FormControl
                className={LocalStyle.textField}
                variant="outlined"
                fullWidth
              >
                <InputLabel id="demo-multiple-name-label">District</InputLabel>
                {
                  <Select
                    style={{
                      textAlign: "left",
                    }}
                    IconComponent={(_props) => (
                      <div style={{ position: "relative" }}>
                        <img
                          className={LocalStyle.icon}
                          src={require("../../../Assets/Img/down_arrow.svg")}
                        />
                      </div>
                    )}
                    labelId="District"
                    id="district-in-add-participants"
                    label="District"
                    fullWidth
                    required
                    value={geography?.city?.name}
                    onChange={(e) =>
                      setGeography((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    renderValue={() => geography?.city?.name}
                  >
                    {districtList?.map((districtName, index) => {
                      return (
                        <MenuItem
                          id={`district-${districtName + index}`}
                          value={districtName}
                        >
                          {districtName.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              </FormControl>
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
      <div style={{ display: "none" }}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Typography
              id={title + "-form-title"}
              className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
            >
              {isEditModeOn ? "Edit user details" : "Add user details"}
            </Typography>
            <Typography
              className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
            >
              {" "}
              {isEditModeOn
                ? "Modify and update your user details as the designated representative of your organisation."
                : "Enter your details as the authorized user of organisation."}{" "}
            </Typography>
          </Col>
        </Row>

        <Row style={{ padding: "0 20px" }}>
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

        <Row style={{ padding: "0 20px" }}>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              id="add-participant-rootuser-mail-id"
              data-testId="user_email"
              placeholder="Mail Id"
              className={LocalStyle.textField}
              label="Mail Id"
              type="email"
              fullWidth
              required
              value={email}
              disabled={isEditModeOn}
              onChange={(e) => {
                setEmail(e.target.value.trim());
              }}
              error={emailErrorMessage ? true : false}
              helperText={emailErrorMessage ? emailErrorMessage : ""}
            />
          </Col>
          <Col xs={12} sm={6} md={6} xl={6}>
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
              onChange={(value, countryData) =>
                handleChangeContactNumber(value, countryData)
              }
              error={orgContactErrorMessage ? true : false}
              helperText={orgContactErrorMessage}
              id="add-participant-phone-number"
            />
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            sm={6}
            md={6}
            xl={6}
            style={{ textAlign: "left", marginLeft: "30px", padding: "0 20px" }}
          >
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="role"
                name="role1"
                value={role}
                onChange={handleRoleChange}
              >
                <FormControlLabel
                  value="teamLead"
                  control={<Radio />}
                  label={"Team Lead"}
                  disabled={isLoggedInUserAdmin() || isLoggedInUserCoSteward()}
                />
                <FormControlLabel
                  value="teamMember"
                  control={<Radio />}
                  label={"Team Member"}
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>

        {role === "teamLead" ? (
          <TextField
            id="organisation-name-id"
            className={LocalStyle.textField}
            label="Organisation Name"
            fullWidth
            required
            value={organisationName}
            // defaultValue={generateRandomData("name")}
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
        ) : (
          <>
            <Typography
              id={title + "-form-title"}
              className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
            >
              Select Your Team
            </Typography>
            {/* <Stack
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
              If you do not select your Co, you will be the part
              of Steward network
            </strong>
          </Alert>
        </Stack> */}
            <FormControl
              className={LocalStyle.team_lead_select}
              variant="outlined"
              fullWidth
            >
              <InputLabel id="demo-multiple-name-label">Team Lead</InputLabel>
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
                  data-testid="Costeward-field"
                  labelId="Team Lead"
                  id="select_costeward"
                  label="Team Lead "
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
          </>
        )}

        {/* {role === "teamMember" && !checkProjectFor("kalro") && (
          <Row>
            {false ? (
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
                      Team Lead
                    </Typography>{" "}
                    <Tooltip
                      placement="right-start"
                      title="By checking chekbox you are adding the organisation as team lead"
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
                {isLoggedInUserAdmin() || isLoggedInUserCoSteward() ? (
                  <TextField
                    id="organisation-name-id"
                    className={LocalStyle.textField}
                    label="Organisation Name"
                    fullWidth
                    required
                    value={organisationName}
                    // defaultValue={generateRandomData("name")}
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
                ) : (
                  <>
                    <Typography
                      id={title + "-form-title"}
                      className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
                    >
                      Select Your Team Lead
                    </Typography>

                    <FormControl
                      className={LocalStyle.team_lead_select}
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel id="demo-multiple-name-label">
                        Team Lead
                      </InputLabel>
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
                          data-testid="Costeward-field"
                          labelId="Team Lead"
                          id="select_costeward"
                          label="Team Lead "
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
                  </>
                )}
              </Col>
            )}
          </Row>
        )} */}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          // background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", // Modern gradient background
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            width: "90%",
            maxWidth: "600px",
            transition: "all 0.3s",
          }}
        >
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {isEditModeOn ? "Edit User Details" : "Add User Details"}
          </Typography>
          <Typography
            style={{ textAlign: "left", color: "#555", marginBottom: "20px" }}
          >
            {isEditModeOn
              ? "Modify and update your user details as the designated representative of your team."
              : "Enter your details as the authorized user of team."}
          </Typography>

          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              size="small"
              fullWidth
              required
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              error={!!firstNameErrorMessage}
              helperText={firstNameErrorMessage || ""}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              size="small"
              required
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              error={!!lastNameErrorMessage}
              helperText={lastNameErrorMessage || ""}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <TextField
              size="small"
              fullWidth
              required
              type="email"
              label="Mail Id"
              variant="outlined"
              value={email}
              disabled={isEditModeOn}
              onChange={(e) => setEmail(e.target.value.trim())}
              error={!!emailErrorMessage}
              helperText={emailErrorMessage || ""}
              style={{ marginBottom: "10px" }}
            />
            <MuiPhoneNumber
              style={{ display: "none" }}
              fullWidth
              required
              defaultCountry={"in"}
              countryCodeEditable={false}
              label="Contact Number"
              variant="outlined"
              value={contactNumber}
              onChange={handleChangeContactNumber}
              error={!!orgContactErrorMessage}
              helperText={orgContactErrorMessage || ""}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                row
                aria-label="role"
                name="role1"
                value={role}
                onChange={handleRoleChange}
              >
                <FormControlLabel
                  value="teamLead"
                  control={<Radio />}
                  label="Team Lead"
                  disabled={isLoggedInUserCoSteward()}
                />
                <FormControlLabel
                  value="teamMember"
                  control={<Radio />}
                  label="Team Member"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {role === "teamLead" ? (
            <TextField
              fullWidth
              required
              label="Team Name"
              variant="outlined"
              value={organisationName}
              onChange={(e) => setOrganisationName(e.target.value)}
              error={!!orgNameErrorMessage}
              helperText={orgNameErrorMessage || ""}
            />
          ) : (
            !isLoggedInUserCoSteward() && (
              <>
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Select Your Team
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Team</InputLabel>
                  <Select
                    value={selectedCosteward}
                    onChange={handlelistofCosteward}
                    label="Team Lead "
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {selectCoSteward.map((listofcosteward, index) => (
                      <MenuItem key={index} value={listofcosteward.user}>
                        {listofcosteward.organization_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "20px",
              gap: "25px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              disabled={
                (role === "teamLead" && !organisationName) || // Make orgName compulsory only for teamLead
                !organisationEmail ||
                !address ||
                organisationPinCode.length <= 4 ||
                !firstName ||
                !email ||
                !contactNumber ||
                orgContactErrorMessage ||
                (role === "teamMember" && !selectedCosteward) // Check if role is teamMember, then selectedCosteward must not be empty
                  ? true
                  : false
              }
              onClick={addNewParticipants}
              style={{ marginRight: "10px" }}
              className={`${GlobalStyle.primary_button} ${LocalStyle.primaryButton}`}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              className={`${GlobalStyle.outlined_button} ${LocalStyle.cancelButton}`}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <Row style={{ display: "none" }} className={LocalStyle.buttonContainer}>
        <Button
          disabled={
            (role === "teamLead" && !organisationName) || // Make orgName compulsory only for teamLead
            !organisationEmail ||
            !address ||
            organisationPinCode.length <= 4 ||
            !firstName ||
            !email ||
            !contactNumber ||
            orgContactErrorMessage ||
            (role === "teamMember" && !selectedCosteward) // Check if role is teamMember, then selectedCosteward must not be empty
              ? true
              : false
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
          style={{ marginRight: "25px" }}
        >
          Cancel
        </Button>
      </Row>
      {/* </div> */}
    </>
  );
};

export default ParticipantFormNew;
