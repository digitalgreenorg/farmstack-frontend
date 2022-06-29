import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./accountsetting.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MuiPhoneNumber from "material-ui-phone-number";
import UploadProfileimg from "../../../Components/Settings/accounts/UploadProfileimg";
import { FileUploader } from "react-drag-drop-files";

export default function AccountSetting() {
  const profilefirstname = useRef();
  const profilelastname = useRef();
  const profileemail = useRef();

  const [ispropfilefirstnameerror, setispropfilefirstnameerror] =
    useState(false);
  const [ispropfilelastnameerror, setispropfilelastnameerror] = useState(false);
  const [ispropfileemailerror, setispropfileemailerror] = useState(false);
  const [validNumber, setValidnumber] = useState("");
  const [profilenextbutton, setprofilenextbutton] = useState(false);
  const fileTypes = ["JPEG", "PNG", "jpg"];
  const [file, setFile] = useState(null);

  const handleprofilfirstename = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z]+$/;
    var profilefirstname = e.target.value;
    if (profilefirstname.match(letters)) {
      setispropfilefirstnameerror(false);
      //   setprofilenextbutton(true);
    } else {
      setispropfilefirstnameerror(true);
      //   setprofilenextbutton(false);
    }
  };
  const handleprofilelastname = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z]+$/;
    var lastname = e.target.value;
    if (lastname.match(letters)) {
      setispropfilelastnameerror(false);
      //   setprofilenextbutton(true);
    } else {
      setispropfilelastnameerror(true);
      //   setprofilenextbutton(false);
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
    //   // var number = e.target.value;
    //   // if (number.length > 0) {
    //   //   setispropfilenumbererror(false);
    //   //   setprofilenextbutton(true);
    //   // } else {
    //   //   setispropfilenumbererror(true);
    //   // }
    setValidnumber(value);
  };
  const handleBannerFileChange = (file) => {
    setFile(file);
    console.log(file);
    if (file != null && file.length && file[0].size > 2097152) {
      //   setBrandingnextbutton(false);
    }
  };
  const accountsettingcancelbtn = (e) => {};
  return (
    <div className="accountsetting">
      <Row>
        <span className="title">Account Settings</span>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TextField
            id="filled-basic"
            label="First Name"
            variant="filled"
            className="firstname"
            // style={{ width: "50%" }}
            //   className="profilefirstname"
            onChange={handleprofilfirstename}
            inputRef={profilefirstname}
            error={ispropfilefirstnameerror}
            helperText={ispropfilefirstnameerror ? "Enter Valid Name" : ""}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TextField
            id="filled-basic"
            label="Last Name"
            variant="filled"
            //   style={{ width: "95%" }}
            //   className="profilelastname"
            className="lastname"
            onChange={handleprofilelastname}
            inputRef={profilelastname}
            error={ispropfilelastnameerror}
            helperText={ispropfilelastnameerror ? "Enter Valid last name" : ""}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            className="email"
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
            defaultCountry={"in"}
            className="phonenumber"
            //   style={{ width: "420px" }}
            id="filled-basic"
            label="Contact Number"
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
            {file
              ? file.size
                ? `File name: ${file.name}`
                : ""
              : "No file uploaded yet"}
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
            {profilenextbutton ? (
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
    </div>
  );
}
