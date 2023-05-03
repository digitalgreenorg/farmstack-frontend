import React, { useContext, useEffect, useState, useMemo } from "react";
import styles from "./onboarding.module.css";
import { Col, Row } from "react-bootstrap";
import { Button, FormControl, InputLabel, TextField } from "@mui/material";
import global_style from "../../Assets/CSS/global.module.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import FileUploaderMain from "../Generic/FileUploader";
import MuiPhoneNumber from "material-ui-phone-number";
import UrlConstant from "../../Constants/UrlConstants";
import countryList from "react-select-country-list";

import {
  GetErrorHandlingRoute,
  GetErrorKey,
  getTokenLocal,
  getUserLocal,
  goToTop,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
  validateInputField,
} from "../../Utils/Common";
import HTTPService from "../../Services/HTTPService";
import CancelIcon from "@mui/icons-material/Cancel";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { useHistory } from "react-router-dom";
import { isPhoneValid } from "./utils";
import RegexConstants from "../../Constants/RegexConstants";
const OrganizationDetails = (props) => {
  const history = useHistory();
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [islogoLink, setIsLogoLink] = useState(false);
  const countryNameList = useMemo(() => countryList().getData(), []);
  const { setActiveStep } = props;
  const [alreadyOnboarded, setAlreadyOnboarded] = useState(false);
  const [organisationDetails, setOrganisationDetails] = useState({
    organisation_name: "",
    organisation_mail_id: "",
    organisation_website_link: "",
    organisation_contact_number: "",
    organisation_address: "",
    organisation_country: "",
    organisation_pin_code: "",
    organisation_description: "",
  });
  const [organisationDetailsError, setOrganisationDetailsError] = useState({
    organisation_name_error: "",
    organisation_mail_id_error: "",
    organisation_website_link_error: "",
    organisation_contact_number_error: "",
    organisation_address_error: "",
    organisation_country_error: "",
    organisation_pin_code_error: "",
    organisation_description_error: "",
    organisation_logo_error_logo: "",
  });
  const [uploadedLogo, setUploadedLogo] = useState(null);

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
        callToast("Onboarded successfuly", "success", true);

        console.log("onboarded true response", response.data);
        if (isLoggedInUserAdmin()) {
          history.push("/datahub/new_datasets");
        } else if (isLoggedInUserParticipant()) {
          history.push("/participant/new_datasets");
        } else if (isLoggedInUserCoSteward()) {
          history.push("/datahub/new_datasets");
        }
      })
      .catch((e) => {
        callToast("Some error occurred", "error", true);
        console.log(e);
      });
  };
  const handleOrgChange = (e, countryData) => {
    console.log(e.target);
    if (e.target) {
      setOrganisationDetails({
        ...organisationDetails,
        [e.target.name]: e.target.value,
      });
    } else {
      if (!isPhoneValid(e, countryData)) {
        setOrganisationDetailsError((prevState) => ({
          ...prevState,
          organisation_contact_number_error: "Invalid phone number",
        }));
      } else {
        setOrganisationDetailsError((prevState) => ({
          ...prevState,
          organisation_contact_number_error: "",
        }));
      }
      setOrganisationDetails({
        ...organisationDetails,
        organisation_contact_number: e ? e : "",
      });
    }
  };

  const [preview, setPreview] = useState();
  const [key, setKey] = useState(0);
  const handleUpload = (file) => {
    console.log(file);
    setIsLogoLink(false);
    setUploadedLogo(file);
    setKey(key + 1); // generate a new key when a file is uploaded
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    console.log(uploadedLogo);
    if (!uploadedLogo) {
      setPreview(null);
      return;
    }
    setOrganisationDetailsError({
      ...organisationDetailsError,
      organisation_logo_error_logo: "",
    });
    const objectUrl = URL.createObjectURL(uploadedLogo);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedLogo]);

  const handleSubmitOrganizationDetails = (e) => {
    e.preventDefault();
    callLoader(true);
    let url;
    let method;
    if (!alreadyOnboarded) {
      method = "POST";
      url = UrlConstant.base_url + UrlConstant.org;
    } else {
      method = "PUT";
      url = UrlConstant.base_url + UrlConstant.org + getUserLocal() + "/";
    }
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", getUserLocal());
    bodyFormData.append(
      "org_email",
      organisationDetails.organisation_mail_id.toLowerCase()
    );
    bodyFormData.append("name", organisationDetails.organisation_name);
    bodyFormData.append(
      "website",
      organisationDetails.organisation_website_link
    );
    bodyFormData.append(
      "address",
      JSON.stringify({
        country: organisationDetails.organisation_country,
        pincode: organisationDetails.organisation_pin_code,
        address: organisationDetails.organisation_address,
        city: "",
      })
    );
    bodyFormData.append(
      "phone_number",
      organisationDetails.organisation_contact_number
    );
    {
      !islogoLink && bodyFormData.append("logo", uploadedLogo);
    }
    bodyFormData.append(
      "org_description",
      organisationDetails.organisation_description
    );
    HTTPService(method, url, bodyFormData, true, true, false, false)
      .then((response) => {
        callLoader(false);
        console.log(response);
        if (isLoggedInUserAdmin() && !props.isOrgSetting) {
          setActiveStep((prev) => prev + 1);
        } else if (
          (isLoggedInUserParticipant() || isLoggedInUserCoSteward()) &&
          !props.isOrgSetting
        ) {
          // callToast("Onboarded successfuly", "success", true);
          setOnBoardedTrue();
        }
        if (props.isOrgSetting && response.status === 201)
          callToast(
            "Organisation settings updated successfully!",
            "success",
            true
          );
      })
      .catch(async (e) => {
        callLoader(false);
        var returnValues = GetErrorKey(e, bodyFormData.keys());
        var errorKeys = returnValues[0];
        var errorMessages = returnValues[1];
        if (errorKeys.length > 0) {
          for (var i = 0; i < errorKeys.length; i++) {
            switch (errorKeys[i]) {
              case "org_email":
                setOrganisationDetailsError({
                  ...organisationDetailsError,
                  organisation_mail_id_error: errorMessages[i],
                });
                break;
              case "website":
                setOrganisationDetailsError({
                  ...organisationDetailsError,
                  organisation_website_link_error: errorMessages[i],
                });
                break;
              case "address":
                setOrganisationDetailsError({
                  ...organisationDetailsError,
                  organisation_address_error: errorMessages[i],
                });
                break;
              case "phone_number":
                setOrganisationDetailsError({
                  ...organisationDetailsError,
                  organisation_contact_number_error: errorMessages[i],
                });
                break;
              case "org_description":
                setOrganisationDetailsError({
                  ...organisationDetailsError,
                  organisation_description_error: errorMessages[i],
                });
                break;
              case "name":
                setOrganisationDetailsError({
                  ...organisationDetailsError,
                  organisation_name_error: errorMessages[i],
                });
                break;
              case "logo":
                setOrganisationDetailsError({
                  ...organisationDetailsError,
                  organisation_logo_error_logo: errorMessages[i],
                });
                break;
              default:
                let error = await GetErrorHandlingRoute(e);
                if (error) {
                  callToast(error?.message, "error", true);
                  console.log(e, error);
                }
                break;
            }
          }
        } else {
          let error = await GetErrorHandlingRoute(e);
          if (error) {
            callToast(error?.message, "error", true);
            console.log(e, error);
          }
        }
      });
  };
  const getOrganizationData = () => {
    callLoader(true);
    let url = UrlConstant.base_url + UrlConstant.org + getUserLocal() + "/";
    let method = "GET";
    HTTPService(method, url, "", false, true, false, false)
      .then((response) => {
        callLoader(false);

        console.log(response);
        let data = response.data;
        let org = response.data.organization;
        if (org != "null") {
          setAlreadyOnboarded(true);
        }
        setOrganisationDetails({
          organisation_name: org.name,
          organisation_mail_id: org.org_email,
          organisation_website_link: org.website,
          organisation_contact_number: org.phone_number,
          organisation_address: org.address.address,
          organisation_country: org.address.country,
          organisation_pin_code: org.address.pincode,
          organisation_description: org.org_description,
        });
        setPreview(
          org.logo ? UrlConstant.base_url_without_slash + org.logo : null
        );
        setIsLogoLink(true);
        // setUploadedLogo(
        //   org.logo ? UrlConstant.base_url_without_slash + org.logo : null
        // );
      })
      .catch(async (e) => {
        callLoader(false);
        let error = await GetErrorHandlingRoute(e);
        console.log(e, error);
        if (error) {
          callToast(error?.message, "error", true);
        }
      });
  };
  console.log(preview, uploadedLogo);

  useEffect(() => {
    getOrganizationData();
    goToTop(0);
  }, []);

  return (
    <>
      <div className={styles.main_box}>
        <div className={styles.main_label}>
          {props.isOrgSetting
            ? "Organisation setting"
            : " Organisation Details"}
        </div>

        {props.isOrgSetting ? (
          ""
        ) : (
          <div className={styles.sub_label}>
            Enter your organisation details, we will show to others!
          </div>
        )}
        <div className={styles.all_inputs}>
          <Row>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                required
                placeholder="Organisation Name"
                id="organisation_name"
                label="Organisation Name"
                variant="outlined"
                name="organisation_name"
                value={organisationDetails.organisation_name}
                onChange={(e) => handleOrgChange(e)}
                error={
                  organisationDetailsError.organisation_name ? true : false
                }
                helperText={organisationDetailsError.organisation_name_error}
              />
            </Col>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                required
                placeholder="Organisation mail id"
                label="Organisation mail id"
                variant="outlined"
                id="organisation_mail_id"
                name="organisation_mail_id"
                value={organisationDetails.organisation_mail_id}
                onChange={(e) => handleOrgChange(e)}
                error={
                  organisationDetailsError.organisation_mail_id_error
                    ? true
                    : false
                }
                helperText={organisationDetailsError.organisation_mail_id_error}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                required
                placeholder="Website Link"
                label="Website Link"
                variant="outlined"
                id="organisation_website_link"
                name="organisation_website_link"
                value={organisationDetails.organisation_website_link}
                onChange={(e) => handleOrgChange(e)}
                error={
                  organisationDetailsError.organisation_website_link_error
                    ? true
                    : false
                }
                helperText={
                  organisationDetailsError.organisation_website_link_error
                }
              />
            </Col>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <MuiPhoneNumber
                fullWidth
                required
                defaultCountry={"in"}
                countryCodeEditable={false}
                placeholder="Organisation Contact Number"
                label="Organisation Contact Number"
                variant="outlined"
                id="organisation_contact_number"
                name="organisation_contact_number"
                value={organisationDetails.organisation_contact_number}
                onChange={(value, countryData) =>
                  handleOrgChange(value, countryData)
                }
                error={
                  organisationDetailsError.organisation_contact_number_error
                    ? true
                    : false
                }
                helperText={
                  organisationDetailsError.organisation_contact_number_error
                }
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                required
                placeholder="Organisation Address"
                label="Organisation Address"
                variant="outlined"
                id="organisation_address"
                name="organisation_address"
                value={organisationDetails.organisation_address}
                onChange={(e) => handleOrgChange(e)}
                error={
                  organisationDetailsError.organisation_address_error
                    ? true
                    : false
                }
                helperText={organisationDetailsError.organisation_address_error}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <FormControl required fullWidth>
                <InputLabel id="country_label"> Country</InputLabel>
                <Select
                  required
                  labelId="country_label"
                  id="country_select"
                  value={organisationDetails.organisation_country}
                  name="organisation_country"
                  onChange={(e) => handleOrgChange(e)}
                  label="Country"
                  error={
                    organisationDetailsError.organisation_country_error
                      ? true
                      : false
                  }
                  helperText={
                    organisationDetailsError.organisation_country_error
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
              </FormControl>
            </Col>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                required
                placeholder="PIN Code"
                label="PIN Code"
                variant="outlined"
                id="organisation_pin_code"
                name="organisation_pin_code"
                value={organisationDetails.organisation_pin_code}
                onChange={(e) => {
                  if (
                    e.target.value.length <= 10 &&
                    validateInputField(
                      e.target.value,
                      RegexConstants.PINCODE_REGEX_NEWUI
                    )
                  ) {
                    handleOrgChange(e);
                  }
                }}
                error={
                  organisationDetailsError.organisation_pin_code_error
                    ? true
                    : false
                }
                helperText={
                  organisationDetailsError.organisation_pin_code_error
                }
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                required
                rows={4}
                multiline
                placeholder="Organisation Description"
                label="Organisation Description"
                variant="outlined"
                id="organisation_description"
                name="organisation_description"
                value={organisationDetails.organisation_description}
                onChange={(e) => handleOrgChange(e)}
                error={
                  organisationDetailsError.organisation_description_error
                    ? true
                    : false
                }
                helperText={
                  organisationDetailsError.organisation_description_error
                }
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <FileUploaderMain
                key={key} // set the key prop to force a re-render when the key changes
                texts={
                  "Drop files here or click browse thorough your machine,File size not more than "
                }
                maxSize={2}
                isMultiple={false}
                handleChange={handleUpload}
                // setSizeError={() =>
                //   setOrganisationDetailsError({
                //     ...organisationDetailsError,
                //     organisation_logo_error_logo: "Maximum size exceeds",
                //   })
                // }
              />
            </Col>
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <div
                className={
                  global_style.bold600 +
                  " " +
                  global_style.font20 +
                  " " +
                  styles.text_left
                }
              >
                {preview && "Uploaded file"}
              </div>
              {console.log(preview)}
              {preview && (
                <div className={styles.text_left + " " + styles.preview_box}>
                  {preview && (
                    <img className={styles.preview_logo} src={preview} />
                  )}
                  <CancelIcon
                    onClick={() => {
                      setPreview(null);
                      setUploadedLogo(null);
                      setKey(key + 1); // generate a new key when a file is deleted
                    }}
                    style={{ cursor: "pointer" }}
                    fontSize="small"
                  />
                </div>
              )}
              <div
                className={
                  global_style.size14 +
                  " " +
                  global_style.error +
                  " " +
                  styles.text_left
                }
              >
                {organisationDetailsError.organisation_logo_error_logo}
              </div>
            </Col>
          </Row>
        </div>
        {props.isOrgSetting ? (
          <Row>
            <Col style={{ textAlign: "right", margin: "20px" }}>
              <Button
                id="cancelbutton_account"
                variant="outlined"
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
                id="submitbutton_account"
                variant="outlined"
                className={
                  global_style.primary_button + " " + styles.next_button
                }
                disabled={
                  organisationDetails.organisation_address &&
                  organisationDetails.organisation_mail_id &&
                  organisationDetails.organisation_country &&
                  organisationDetails.organisation_description &&
                  organisationDetails.organisation_name &&
                  organisationDetails.organisation_pin_code.length > 4 &&
                  organisationDetails.organisation_contact_number &&
                  !organisationDetailsError.organisation_contact_number_error &&
                  organisationDetails.organisation_website_link &&
                  preview
                    ? false
                    : true
                }
                onClick={(e) => handleSubmitOrganizationDetails(e)}
              >
                Submit
              </Button>
            </Col>
          </Row>
        ) : (
          <div className={styles.button_grp}>
            <Button
              onClick={() =>
                !isLoggedInUserAdmin()
                  ? setOnBoardedTrue()
                  : setActiveStep((prev) => prev + 1)
              }
              className={global_style.secondary_button}
            >
              {" "}
              Finish later
            </Button>
            <Button
              disabled={
                organisationDetails.organisation_address &&
                organisationDetails.organisation_mail_id &&
                organisationDetails.organisation_country &&
                organisationDetails.organisation_description &&
                organisationDetails.organisation_name &&
                organisationDetails.organisation_pin_code.length > 4 &&
                organisationDetails.organisation_contact_number &&
                organisationDetails.organisation_website_link &&
                !organisationDetailsError.organisation_contact_number_error &&
                preview
                  ? false
                  : true
              }
              onClick={(e) => handleSubmitOrganizationDetails(e)}
              className={global_style.primary_button + " " + styles.next_button}
            >
              {" "}
              {isLoggedInUserAdmin() ? "Next" : "Finish"}
            </Button>
          </div>
        )}
        {/* <div className={styles.send_otp_div}>
</div> */}
      </div>
    </>
  );
};

export default OrganizationDetails;
