import React, { useState, useEffect, useRef, useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./OrganisationSetting.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MuiPhoneNumber from "material-ui-phone-number";
import labels from "../../../Constants/labels";
import validator from "validator";
import Select from "react-select";
import countryList from "react-select-country-list";
import MenuItem from "@mui/material/MenuItem";
import RichTextEditor from "react-rte";
import { FileUploader } from "react-drag-drop-files";
// import UploadBanner from "../../../Components/signup/UploadBanner";
import UploadOrgBanner from "./UploadOrgBanner";

import HTTPService from "../../../Services/HTTPService";
import UrlConstant from "../../../Constants/UrlConstants";
import HandleSessionTimeout, {
  setTokenLocal,
  getTokenLocal,
  setUserId,
  getUserLocal,
  handleAddressCharacters,
  setUserMapId,
  setOrgId,
} from "../../../Utils/Common";
import RegexConstants from "../../../Constants/RegexConstants";
import GetErrorHandlingRoute, {
  validateInputField,
} from "../../../Utils/Common";
import { useHistory } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

export default function OrganisationSetting(props) {
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  //   const handleOrgSettingSubmit = (e) => {};
  // org screen
  const [isOrgnameerror, setisOrgnameerror] = useState(false);
  const [isOrgmailerror, setisOrgmailerror] = useState(false);
  // const [isOrgnumbererror, setisOrgnumbererror] = useState(false);
  const [isOrgAddresserror, setisOrgAddresserror] = useState(false);
  const [isOrgcityerror, setisOrgcityerror] = useState(false);
  const [ispincodeerror, setispincodeerror] = useState(false);
  const [iscountryerror, setiscountryerror] = useState(false);
  const [countryvalue, setcountryvalue] = useState("");
  // const [orgdeserror, serorgdeserror] = useState(false);
  // const [orgdesc, setorgdesc] = useState("");
  // const [editorValue, setEditorValue] = React.useState(
  //   RichTextEditor.createValueFromString(orgdesc, "html")
  // );
  // const [textEditorValue, settextEditorValue] = useState("");

  // const [validOrgNumber, setValidOrgnumber] = useState("");
  const [orgfile, setorgfile] = useState(null);

  // const Orgname = useRef();
  // const Orgmail = useRef();
  // const OrgAddress = useRef();
  // const Orgcity = useRef();
  // const pincode = useRef();

  const [orgname, setorgname] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");

  const [Orgnamebtn, setOrgnamebtn] = useState(false);
  const [Orgemailbtn, setOrgemailbtn] = useState(false);
  const [Orgaddressbtn, setOrgaddressbtn] = useState(false);
  // const [Orgnumberbtn, setOrgnumberbtn] = useState(false);
  const [Orgcitybtn, setOrgcitybtn] = useState(false);
  const [Orgcountrybtn, setOrgcountrybtn] = useState(false);
  const [Orgpincodebtn, setOrgpincodebtn] = useState(false);
  // const [Orgdesbtn, setOrgdesbtn] = useState(false);
  const options = useMemo(() => countryList().getData(), []);

  const [orgdesc, setorgdesc] = useState("");

  const [editorValue, setEditorValue] = React.useState(
    RichTextEditor.createValueFromString(orgdesc, "html")
  );

  const fileTypes = ["JPEG", "PNG", "jpg"];
  const [orgfilesize, setorgfilesize] = useState(false);
  const [isPost, setisPost] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const history = useHistory();

  // get org details.
  const getOrgDetails = async () => {
    var id = getUserLocal();
    console.log("user id", id);
    setIsLoader(true);
    await HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.org + id + "/",
      false,
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        console.log("get request for org settings", response.data);
        // console.log(
        //   "org description",
        //   response.data.organization.org_description.toString("html")
        // );
        console.log("org response", response.data.organization);
        // console.log("country", response.data.organization.address.country);
        if (response.data.organization === "null") {
          setisPost(true);
          console.log("setispost true");
        } else {
          setorgname(response.data.organization.name);
          // if (response.data.organization.name) {
          //   setOrgnamebtn(true);
          // }
          setaddress(response.data.organization.address.address);
          // if (response.data.organization.address.address) {
          //   setOrgnamebtn(true);
          // }
          setcity(response.data.organization.address.city);
          setpincode(response.data.organization.address.pincode);
          setcountryvalue(response.data.organization.address.country.label);
          setemail(response.data.organization.org_email);
          setphonenumber(response.data.organization.phone_number);
          // setorgdesc(response.data.organization.org_description.toString("html"));
          // setorgfile(response.data.organization.logo);
          console.log(response.data.organization.logo);
          setEditorValue(
            RichTextEditor.createValueFromString(
              response.data.organization.org_description,
              "html"
            )
          );
        }
      })
      .catch((e) => {
        setIsLoader(false);
        history.push(GetErrorHandlingRoute(e));
      });
  };

  useEffect(() => {
    getOrgDetails();
  }, []);

  //   const [file, setFile] = useState(null);
  // const [Orgdesbtn, setOrgdesbtn] = useState(false);

  // const handleOrgDesChange = (value) => {
  //   setEditorValue(value);
  //   setorgdesc(value.toString("html"));
  //   console.log(value.toString("html"));
  //   // console.log(value.length);
  //   if (value.toString("html") !== "<p><br></p>") {
  //     setOrgdesbtn(true);
  //   } else {
  //     setOrgdesbtn(false);
  //   }
  // };

  const handleOrgSettingSubmit = async (e) => {
    e.preventDefault();
    var id = getUserLocal();
    console.log("user id", id);

    let puturl = UrlConstant.base_url + UrlConstant.org + id + "/";
    let posturl = UrlConstant.base_url + UrlConstant.org;

    var bodyFormData = new FormData();
    bodyFormData.append("org_email", email);
    bodyFormData.append("name", orgname);
    bodyFormData.append(
      "address",
      JSON.stringify({
        country: {
          label: countryvalue,
        },
        pincode: pincode,
        address: address,
        city: city,
      })
    );
    bodyFormData.append("user_id", id);
    bodyFormData.append("phone_number", phonenumber);
    bodyFormData.append("logo", orgfile);
    bodyFormData.append("org_description", orgdesc);
    console.log("org details", bodyFormData);
    setIsLoader(true);
    if (isPost) {
      HTTPService("POST", posturl, bodyFormData, true, true)
        .then((response) => {
          setIsLoader(false);
          console.log("response");
          console.log("org details", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            props.setisOrgUpdateSuccess();
            setUserMapId(response.data.user_map);
            setOrgId(response.data.org_id);
            // setisPolicies(true);
            // setisOrg(false);
            // setEmail(false);
            // setError(false);
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          setIsLoader(false);
          history.push(GetErrorHandlingRoute(e));
          //   setError(true);
        });
    } else {
      setIsLoader(true);
      HTTPService("PUT", puturl, bodyFormData, true, true)
        .then((response) => {
          setIsLoader(false);
          console.log("response");
          console.log("org details", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            setUserMapId(response.data.user_map);
            setOrgId(response.data.org_id);
            props.setisOrgUpdateSuccess();
            // setisPolicies(true);
            // setisOrg(false);
            // setEmail(false);
            // setError(false);
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          setIsLoader(false);
          history.push(GetErrorHandlingRoute(e));
          //   setError(true);
        });
    }
  };

  const handleOrgname = (e) => {
    console.log(e.target.value);
    // var letters = /^[A-Za-z ]*$/;
    var orgname = e.target.value;
    // // if (orgname.length > 0) {
    // //   setisOrgnameerror(false);
    // //   setOrgnextbutton(true);
    // // } else {
    // //   setisOrgnameerror(true);
    // // }
    // if (orgname.match(letters)) {
    //   setisOrgnameerror(false);
    //   setOrgnamebtn(true);
    //   //   setprofilenextbutton(true);
    // } else {
    //   setisOrgnameerror(true);
    //   setOrgnamebtn(false);
    // }
    // if (orgname.length === null) {
    //   setisOrgnameerror(true);
    // } else {
    //   setisOrgnameerror(false);
    // }
    if (validateInputField(e.target.value, RegexConstants.ORG_NAME_REGEX)) {
      setorgname(e.target.value);
      setisOrgnameerror(false);
      // setOrgnamebtn(true);
      // setfirstname(e.target.value.trim());
      // setaccfirstbtn(true);
    } else {
      // e.preventDefault();
      setisOrgnameerror(true);
    }
  };

  const handleOrgmail = (e) => {
    // console.log(e.target.value);
    // var email = e.target.value;
    // const valid = validator.isEmail(email);
    // console.log(valid);
    // const finalEmail = email.trim();
    // console.log(finalEmail);
    // if (valid) {
    //   setisOrgmailerror(false);
    //   setOrgemailbtn(true);
    // } else {
    //   setisOrgmailerror(true);
    //   setOrgemailbtn(false);
    // }
    if (validateInputField(e.target.value, RegexConstants.NO_SPACE_REGEX)) {
      setemail(e.target.value);
      if (validator.isEmail(e.target.value)) {
        setisOrgmailerror(false);
      } else {
        setisOrgmailerror(true);
      }
      // setOrgemailbtn(true);
      // setfirstname(e.target.value.trim());
      // setaccfirstbtn(true);
    } else {
      e.preventDefault();
    }
  };

  const handleOrgnumber = (value) => {
    console.log(value);
    setphonenumber(value);
    // if (value.length === 15) {
    //   setOrgnumberbtn(true);
    // } else {
    //   setOrgnumberbtn(false);
    // }
  };

  const handleOrgAddress = (e) => {
    console.log(e.target.value);
    var address = e.target.value;
    setaddress(e.target.value);
    if (address.length > 0) {
      setisOrgAddresserror(false);
      setOrgaddressbtn(true);
      // setOrgnextbutton(true);
    } else {
      setisOrgAddresserror(true);
      setOrgaddressbtn(false);
    }
  };

  const handleOrgcity = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z]*$/;
    var city = e.target.value;
    // if (city.length > 0) {
    //   setisOrgcityerror(false);
    //   setOrgnextbutton(true);
    // } else {
    //   setisOrgcityerror(true);
    // }
    if (city.match(letters)) {
      setcity(city);
      setisOrgcityerror(false);
      setOrgcitybtn(true);
      //   setprofilenextbutton(true);
    } else {
      setisOrgcityerror(true);
      setOrgcitybtn(false);
    }
  };

  //   const countrychangeHandler = (value) => {
  //     setcountryvalue(value);
  //     setOrgcountrybtn(true);
  //   };

  const handlepincode = (e) => {
    console.log(e.target.value);
    var pincode = e.target.value;
    if (pincode.length > 0) {
      setispincodeerror(false);
      setOrgpincodebtn(true);
      // setOrgnextbutton(true);
    } else {
      setispincodeerror(true);
      setOrgpincodebtn(false);
    }
    if (validateInputField(pincode, RegexConstants.PINCODE_REGEX)) {
      setpincode(pincode);
    } else {
      e.preventDefault();
    }
  };

  const handleorgFileChange = (file) => {
    // var finalFiles = file.target.files;
    setorgfile(file);
    console.log(file);
    // console.log(file.length);
    console.log(file.size);
    // if (file != null && file.size > 2097152) {
    //   //   setBrandingnextbutton(false);
    //   setorgfilesize(true);
    // } else {
    //   setorgfilesize(false);
    // }
  };

  //   const finishLaterOrgScreen = () => {
  //     console.log("clicked on finish later Org screen");
  //     setisPolicies(true);
  //     setisOrg(false);
  //   };

  //   org des
  const handleOrgDesChange = (value) => {
    setEditorValue(value);
    setorgdesc(value.toString("html"));
    console.log(value.toString("html"));
    // console.log(value.length);

    // if (value.toString("html") !== "<p><br></p>") {
    //   setOrgdesbtn(true);
    // } else {
    //   setOrgdesbtn(false);
    // }

    // textEditorData(value.toString("html"));
  };
  const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      //   "LINK_BUTTONS",
      "BLOCK_TYPE_DROPDOWN",
      //   "HISTORY_BUTTONS",
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Normal", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
    ],
  };
  const orgsettingcancelbtn = () => {
    setorgfile(null);
    getOrgDetails();
    history.push("/datahub/settings/2")
    window.location.reload();
  };

  return (
    <div className="orgsetting">
      {isLoader ? <Loader /> : ""}
      <form noValidate autoComplete="off" onSubmit={handleOrgSettingSubmit}>
        <Row>
          <span className="title">Organisation details</span>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <TextField
              required
              id="filled-basic"
              label={screenlabels.org_settings.org_name}
              variant="filled"
              className="name"
              onChange={handleOrgname}
              value={orgname}
              onKeyUp={() =>
                orgname === ""
                  ? setisOrgnameerror(true)
                  : setisOrgnameerror(false)
              }
              // inputRef={Orgname}
              error={isOrgnameerror}
              helperText={isOrgnameerror ? "Enter Valid Name" : ""}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <TextField
              required
              id="filled-basic"
              label={screenlabels.org_settings.email}
              variant="filled"
              className="email"
              onChange={handleOrgmail}
              value={email}
              // inputRef={Orgmail}
              error={isOrgmailerror}
              helperText={isOrgmailerror ? "Enter Valid Email id" : ""}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <MuiPhoneNumber
              defaultCountry={"in"}
              //   value={phonenumber}
              className="phonenumber"
              id="filled-basic"
              label={screenlabels.org_settings.contact}
              variant="filled"
              onChange={handleOrgnumber}
              value={phonenumber}
              //   inputRef={profilenumber}
              // error={isOrgnumbererror}
              // helperText={isOrgnumbererror ? "Enter Valid Number" : ""}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <TextField
              required
              id="filled-basic"
              label={screenlabels.org_settings.address}
              variant="filled"
              className="address"
              onChange={handleOrgAddress}
              // inputRef={OrgAddress}
              value={address}
              onKeyDown={(e) => handleAddressCharacters(address, e)}
              error={isOrgAddresserror}
              helperText={isOrgAddresserror ? "Enter Valid Address" : ""}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <TextField
              required
              id="filled-basic"
              label={screenlabels.org_settings.city}
              variant="filled"
              className="city"
              onChange={handleOrgcity}
              onKeyUp={() =>
                city === "" ? setisOrgcityerror(true) : setisOrgcityerror(false)
              }
              // inputRef={Orgcity}
              value={city}
              error={isOrgcityerror}
              helperText={isOrgcityerror ? "Enter Valid City" : ""}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            {/* <Select
              required
              options={options}
              value={countryvalue}
              onChange={countrychangeHandler}
              isSearchable={true}
              className="country"
            //   style={{ width: "420px", zIndex: 4, backgroundColor: grey }}
              placeholder="Select Country"
            /> */}
            <TextField
              select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              className="country"
              variant="filled"
              required
              value={countryvalue}
              onChange={(e) => {
                setcountryvalue(e.target.value);
                console.log(e.target.value.length);
                console.log(e.target.value);
                if (e.target.value.length > 0) {
                  // setOrgcountrybtn(true);
                  setiscountryerror(false);
                }
              }}
              isSearchable={true}
              label={screenlabels.addparticipants.country}>
              {options.map((rowData, index) => (
                <MenuItem value={rowData.label}>{rowData.label}</MenuItem>
              ))}
            </TextField>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <TextField
              required
              type="number"
              id="filled-basic"
              className="name"
              label={screenlabels.org_settings.pincode}
              variant="filled"
              onChange={handlepincode}
              value={pincode}
              error={ispincodeerror}
              helperText={ispincodeerror ? "Enter vaild pin code" : ""}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Row>
              <span className="orgdestitle">
                Organization Description<sup>*</sup>
              </span>
            </Row>
            <div className="invite-participant-text-editor orgrte">
              <RichTextEditor
                toolbarConfig={toolbarConfig}
                value={editorValue}
                // value={orgdesc}
                onChange={handleOrgDesChange}
                required
                id="body-text"
                name="bodyText"
                type="string"
                multiline
                variant="filled"
                style={{
                  minHeight: 410,
                  //   width: 420,
                  border: "1px solid black",
                  //   zIndex: 4,
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <FileUploader
              handleChange={handleorgFileChange}
              name="file"
              types={fileTypes}
              children={
                <UploadOrgBanner
                  uploaddes="Supports: JPEG, PNG not more than 2MB file size"
                  uploadtitle="Upload logo"
                />
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div>
              <p className="uploadorgimgname">
                {orgfile
                  ? orgfile.size
                    ? `File name: ${orgfile.name}`
                    : ""
                  : ""}
                {/* {file == null && profile_pic ? (
                <a
                  target="_blank"
                  href={profile_pic}
                  style={{ color: "#C09507", textDecoration: "none" }}>
                  Click here to view uploaded image!
                </a>
              ) : (
                ""
              )} */}
              </p>
              <p className="oversizemb-uploadimgOrglogo">
                {orgfile != null && orgfile.size > 2097152
                  ? "File uploaded is more than 2MB!"
                  : ""}
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="accountsubmit">
              {/* <Button
                variant="contained"
                className="accountnextbtn"
                type="submit">
                <span className="">Submit</span>
              </Button> */}
              {/* {!isOrgnameerror &&
              !isOrgmailerror &&
              !isOrgAddresserror &&
              !isOrgcityerror &&
              !ispincodeerror &&
              !iscountryerror &&
              orgfile != null &&
              orgfile.size < 2097152 &&
              editorValue.getEditorState().getCurrentContent().hasText() ? (
                <Button
                  variant="contained"
                  className="accountnextbtn"
                  type="submit">
                  <span className="signupbtnname">Submit</span>
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  disabled
                  className="disableaccountnextbtn">
                  Submit
                </Button>
              )} */}
              {!isOrgnameerror &&
              !isOrgmailerror &&
              !isOrgAddresserror &&
              !isOrgcityerror &&
              !ispincodeerror &&
              !iscountryerror &&
              orgfile != null &&
              orgfile.size < 2097152 &&
              editorValue.getEditorState().getCurrentContent().hasText() &&
              countryvalue !== "" ? (
                <Button
                  variant="contained"
                  className="accountnextbtn"
                  type="submit">
                  <span className="signupbtnname">Submit</span>
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  disabled
                  className="disableaccountnextbtn">
                  Submit
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="accountcancel">
              <Button
                variant="outlined"
                className="accountsettingcancelbtn"
                type="button"
                onClick={orgsettingcancelbtn}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}
