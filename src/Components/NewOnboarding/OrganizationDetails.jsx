import React, { useContext, useEffect, useState } from "react";
import styles from "./onboarding.module.css";
import { Button, Col, Row } from "react-bootstrap";
import { FormControl, InputLabel, TextField } from "@mui/material";
import global_style from "../../Assets/CSS/global.module.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import FileUploaderMain from "../Generic/FileUploader";
import MuiPhoneNumber from "material-ui-phone-number";
import UrlConstant from "../../Constants/UrlConstants";
import {
  GetErrorHandlingRoute,
  GetErrorKey,
  getUserLocal,
  goToTop,
} from "../../Utils/Common";
import HTTPService from "../../Services/HTTPService";
import CancelIcon from "@mui/icons-material/Cancel";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Alert } from "@mui/material";
const OrganizationDetails = (props) => {
  const history = useHistory();
  const { callLoader } = useContext(FarmStackContext);
  const [islogoLink, setIsLogoLink] = useState(false);
  const { setActiveStep } = props;
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
  const handleOrgChange = (e) => {
    console.log(e.target);
    if (e.target) {
      setOrganisationDetails({
        ...organisationDetails,
        [e.target.name]: e.target.value,
      });
    } else {
      setOrganisationDetails({
        ...organisationDetails,
        organisation_contact_number: e ? e : "",
      });
    }
  };

  const [preview, setPreview] = useState();
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

  const handleUpload = (file) => {
    console.log(file);
    setIsLogoLink(false);
    setUploadedLogo(file);
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
    let method = "PUT";
    let url = UrlConstant.base_url + UrlConstant.org + getUserLocal() + "/";
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
        if (!props.isOrgSetting) {
          setActiveStep((prev) => prev + 1);
        }
        if(props.isOrgSetting) {
        setMessageForSnackBar("Organisation details updated successfully!");
        console.log(setMessageForSnackBar)
        setErrorOrSuccess("success");
        handleClick();
        }
      })
      .catch((e) => {
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
                history.push(GetErrorHandlingRoute(e));
                break;
            }
          }
        } else {
          history.push(GetErrorHandlingRoute(e));
        }
      });
  };
  const getOrganizationData = () => {
    let url = UrlConstant.base_url + UrlConstant.org + getUserLocal() + "/";
    let method = "GET";
    HTTPService(method, url, "", false, true, false, false)
      .then((response) => {
        callLoader(false);

        console.log(response);
        let data = response.data;
        let org = response.data.organization;
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
      .catch((error) => {
        callLoader(false);
        console.log(error);
      });
  };
  console.log(preview, uploadedLogo);
  useEffect(() => {
    getOrganizationData();
    goToTop(0);
  }, []);
  return (<>
    {props.isOrgSetting ?
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
        {props.isOrgSetting ? "Organisation setting" : " Organisation Details" }
      </div>

      {props.isOrgSetting ? "" : 
      <div className={styles.sub_label}>
       Enter your organisation details, we will show to others!
      </div> }
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
              error={organisationDetailsError.organisation_name ? true : false}
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
              onChange={(e) => handleOrgChange(e)}
              error={
                organisationDetailsError.organisation_contact_number_error
                  ? true
                  : false
              }
              helperText={organisationDetailsError.organisation_address_error}
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
                helperText={organisationDetailsError.organisation_country_error}
              >
                <MenuItem value={"in"}>India</MenuItem>
                <MenuItem value={"eth"}>Ethiopia</MenuItem>
                <MenuItem value={"japan"}>Japan</MenuItem>
                <MenuItem value={"kenya"}>Kenya</MenuItem>
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
              onChange={(e) => handleOrgChange(e)}
              error={
                organisationDetailsError.organisation_pin_code_error
                  ? true
                  : false
              }
              helperText={organisationDetailsError.organisation_pin_code_error}
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
            <FileUploaderMain isMultiple={false} handleChange={handleUpload} />
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
              Uploaded file
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
                  }}
                  style={{ cursor: "pointer" }}
                  fontSize="small"
                />
              </div>
            )}
            <span
              className={
                global_style.size14 +
                " " +
                global_style.error +
                " " +
                styles.text_left
              }
            >
              {organisationDetailsError.organisation_logo_error_logo}
            </span>
          </Col>
        </Row>
      </div>
      {props.isOrgSetting ? 
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
                   disabled={
                    organisationDetails.organisation_address &&
                    organisationDetails.organisation_mail_id &&
                    organisationDetails.organisation_country &&
                    organisationDetails.organisation_description &&
                    organisationDetails.organisation_name &&
                    organisationDetails.organisation_pin_code &&
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
             </Row> : 
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
            organisationDetails.organisation_address &&
            organisationDetails.organisation_mail_id &&
            organisationDetails.organisation_country &&
            organisationDetails.organisation_description &&
            organisationDetails.organisation_name &&
            organisationDetails.organisation_pin_code &&
            organisationDetails.organisation_website_link &&
            preview
              ? false
              : true
          }
          onClick={(e) => handleSubmitOrganizationDetails(e)}
          className={global_style.primary_button + " " + styles.next_button}
        >
          {" "}
          Next
        </Button>
      </div> }
      {/* <div className={styles.send_otp_div}>
</div> */}
    </div>
    </>
  );
};

export default OrganizationDetails;

