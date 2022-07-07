import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./accountsetting.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MuiPhoneNumber from "material-ui-phone-number";
import UploadProfileimg from "../../../Components/Settings/accounts/UploadProfileimg";
import { FileUploader } from "react-drag-drop-files";
import labels from "../../../Constants/labels";
import HTTPService from "../../../Services/HTTPService";
import UrlConstants from "../../../Constants/UrlConstants";
import {
  setTokenLocal,
  getTokenLocal,
  setUserId,
  getUserLocal,
} from "../../../Utils/Common";
import UrlConstant from "../../../Constants/UrlConstants";
import { useHistory } from "react-router-dom";
import RegexConstants from "../../../Constants/RegexConstants";
import { validateInputField } from "../../../Utils/Common";

export default function AccountSetting(props) {
  const profilefirstname = useRef();
  const profilelastname = useRef();
  const profileemail = useRef();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  // const [profile_pic, setprofile_pic] = useState(null);

  const [ispropfilefirstnameerror, setispropfilefirstnameerror] =
    useState(false);
  const [ispropfilelastnameerror, setispropfilelastnameerror] = useState(false);
  const [ispropfileemailerror, setispropfileemailerror] = useState(false);
  const [validNumber, setValidnumber] = useState("");
  const [accountSettingSubmitbutton, setaccountSettingSubmitbutton] =
    useState(false);
  const fileTypes = ["JPEG", "PNG", "jpg"];
  const [file, setFile] = useState(null);
  const [accfirstnamebtn, setaccfirstbtn] = useState(false);
  const [accfilesize, setaccfilesize] = useState(false);
  const [accnumberbtn, setaccnumberbtn] = useState(false);
  const [screenlabels, setscreenlabels] = useState(labels["en"]);

  const history = useHistory();

  const handleprofilfirstename = (e) => {
    console.log(e.target.value);
    // var letters = /^[A-Za-z]+$/;
    // var profilefirstname = e.target.value;
    // setfirstname(e.target.value);
    // if (profilefirstname.match(letters)) {
    //   setispropfilefirstnameerror(false);
    //   setaccfirstbtn(true);
    //   //   setprofilenextbutton(true);
    // } else {
    //   setispropfilefirstnameerror(true);
    //   //   setprofilenextbutton(false);
    // }

    if (validateInputField(e.target.value, RegexConstants.TEXT_REGEX)) {
      setfirstname(e.target.value.trim());
      setaccfirstbtn(true);
    } else {
      e.preventDefault();
    }
  };

  const handleprofilelastname = (e) => {
    console.log(e.target.value);
    // setlastname(e.target.value);
    // var letters = /^[A-Za-z]+$/;
    // var lastname = e.target.value;
    // if (lastname.match(letters)) {
    //   setispropfilelastnameerror(false);
    //   //   setprofilenextbutton(true);
    // } else {
    //   setispropfilelastnameerror(true);
    //   //   setprofilenextbutton(false);
    // }
    if (validateInputField(e.target.value, RegexConstants.TEXT_REGEX)) {
      setlastname(e.target.value.trim());
    } else {
      e.preventDefault();
    }
  };
  const handleprofileemail = (e) => {
    console.log(e.target.value);
    var email = e.target.value;
    //   // if (email.length > 0) {
    //   //   setispropfileemailerror(false);
    //   //   setprofilenextbutton(true);
    //   // } else {
    //   //   setispropfileemailerror(true);
    //   // }
  };
  const handleprofilenumber = (value) => {
    console.log(value);
    console.log(value.length);
    //   // var number = e.target.value;
    //   // if (number.length > 0) {
    //   //   setispropfilenumbererror(false);
    //   //   setprofilenextbutton(true);
    //   // } else {
    //   //   setispropfilenumbererror(true);
    //   // }
    if (value.length === 15) {
      setaccnumberbtn(true);
    } else {
      setaccnumberbtn(false);
    }
    setValidnumber(value);

    setphonenumber(value);
  };

  const handleBannerFileChange = (file) => {
    setFile(file);
    // setprofile_pic(file);
    console.log(file);
    if (file != null && file.size > 2097152) {
      //   setBrandingnextbutton(false);
      setaccfilesize(true);
    } else {
      setaccfilesize(false);
    }
  };

  const accountsettingcancelbtn = (e) => {
    // history.push("/datahub/participants/");
    getAccountDetails();
  };

  const handleAccountSettingSubmit = (e) => {
    e.preventDefault();

    var id = getUserLocal();
    console.log("user id", id);

    var bodyFormData = new FormData();
    bodyFormData.append("first_name", firstname);
    bodyFormData.append("last_name", lastname);
    bodyFormData.append("phone_number", phonenumber);
    bodyFormData.append("profile_picture", file);

    console.log("branding data", bodyFormData);

    HTTPService(
      "PUT",
      UrlConstants.base_url + UrlConstants.profile + id + "/",
      bodyFormData,
      true,
      false
    )
      .then((response) => {
        console.log("account setting updated!");
        props.setisAccountUpdateSuccess();
        // console.log("get request for account settings", response.data);
        // console.log("picture", response.data.profile_picture);
        // setphonenumber(response.data.phonenumber);
        // setfirstname(response.data.first_name);
        // setlastname(response.data.last_name);
        // setemail(response.data.email);
        // setFile(response.data.profile_picture);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getAccountDetails = async () => {
    var id = getUserLocal();
    console.log("user id", id);

    await HTTPService(
      "GET",
      UrlConstants.base_url + UrlConstants.profile + id + "/",
      false,
      false
    )
      .then((response) => {
        console.log("get request for account settings", response.data);
        console.log("picture", response.data.profile_picture);
        setphonenumber(response.data.phone_number);
        setfirstname(response.data.first_name);
        setlastname(response.data.last_name);
        setemail(response.data.email);
        setFile(response.data.profile_picture);
        if (response.data.first_name) {
          setaccfirstbtn(true);
        }
        if (response.data.phone_number.length > 0) {
          setaccnumberbtn(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAccountDetails();
  }, []);
  return (
    <div className="accountsetting">
      <form noValidate autoComplete="off" onSubmit={handleAccountSettingSubmit}>
        <Row>
          <span className="title">Account Settings</span>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <TextField
              required
              id="filled-basic"
              label={screenlabels.account_settings.first_name}
              variant="filled"
              className="firstname"
              value={firstname}
              // style={{ width: "50%" }}
              // className="profilefirstname"
              // onKeyUp={
              //   firstname === ""
              //     ? setispropfilefirstnameerror(true)
              //     : setispropfilefirstnameerror(false)
              // }
              onKeyUp={() =>
                firstname === ""
                  ? setispropfilefirstnameerror(true)
                  : setispropfilefirstnameerror(false)
              }
              onChange={handleprofilfirstename}
              inputRef={profilefirstname}
              error={ispropfilefirstnameerror}
              helperText={ispropfilefirstnameerror ? "Enter Valid Name" : ""}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <TextField
              id="filled-basic"
              label={screenlabels.account_settings.last_name}
              variant="filled"
              value={lastname}
              //   style={{ width: "95%" }}
              //   className="profilelastname"
              className="lastname"
              // onKeyUp={() =>
              //   lastname === ""
              //     ? setispropfilelastnameerror(true)
              //     : setispropfilelastnameerror(false)
              // }
              onChange={handleprofilelastname}
              inputRef={profilelastname}
              // error={ispropfilelastnameerror}
              // helperText={
              //   ispropfilelastnameerror ? "Enter Valid last name" : ""
              // }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <TextField
              id="filled-basic"
              label={screenlabels.account_settings.email}
              variant="filled"
              className="email"
              value={email}
              //   style={{ width: "420px" }}
              //   className="profileemail"
              onChange={handleprofileemail}
              inputRef={profileemail}
              inputProps={{ readOnly: true }}
              //   defaultValue={validemail}
              disabled
              // error={props.ispropfileemailerror}
              // helperText={
              //   props.ispropfileemailerror ? "Enter Valid Email id" : ""
              // }
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <MuiPhoneNumber
              required
              defaultCountry={"in"}
              className="phonenumber"
              value={phonenumber}
              //   style={{ width: "420px" }}
              id="filled-basic"
              label={screenlabels.account_settings.contact}
              variant="filled"
              onChange={handleprofilenumber}
              // error={ispropfilenumbererror}
              // helperText={ispropfilenumbererror ? "Enter Valid Email id" : ""}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <FileUploader
              //   multiple={true}
              handleChange={handleBannerFileChange}
              name="file"
              types={fileTypes}
              children={
                <UploadProfileimg
                  uploaddes="Supports: JPEG, PNG not more than 2MB file size"
                  uploadtitle="Upload Profile image"
                />
              }
              //   maxSize={2}
            />
          </Col>
        </Row>

        <Col xs={12} sm={12} md={6} lg={6}>
          <div>
            <p className="uploadimgname">
              {file ? (file.size ? `File name: ${file.name}` : "") : ""}
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
            <p className="oversizemb-uploadimglogo">
              {file != null && file.size > 2097152
                ? "File uploaded is more than 2MB!"
                : ""}
            </p>
          </div>
        </Col>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="accountsubmit">
              {/* <Button
              variant="contained"
              className="accountnextbtn"
              type="submit">
              <span className="">Submit</span>
            </Button> */}
              {!ispropfilefirstnameerror &&
              !accfilesize &&
              accfirstnamebtn &&
              file.size < 2097152 &&
              accnumberbtn ? (
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
                onClick={accountsettingcancelbtn}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}
