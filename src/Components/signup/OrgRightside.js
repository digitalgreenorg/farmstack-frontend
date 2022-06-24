import React, { useState, useRef, useMemo } from "react";
import "./OrgRightside.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Select from "@mui/material/Select";

import MuiPhoneNumber from "material-ui-phone-number";

import Select from "react-select";
import countryList from "react-select-country-list";
import { grey } from "@mui/material/colors";

// import { DefaultEditor } from "react-simple-wysiwyg";

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import RichTextEditor from "react-rte";

import validator from "validator";

import { FileUploader } from "react-drag-drop-files";
import UploadOrgLogo from "./UploadOrgLogo";

import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";

export default function OrgRightside(props) {
  // const [isOrgnameerror, setisOrgnameerror] = useState(false);
  // const [isOrgmailerror, setisOrgmailerror] = useState(false);
  // // const [isOrgnumbererror, setisOrgnumbererror] = useState(false);
  // const [isOrgAddresserror, setisOrgAddresserror] = useState(false);
  // const [isOrgcityerror, setisOrgcityerror] = useState(false);
  // const [ispincodeerror, setispincodeerror] = useState(false);
  // const [countryvalue, setcountryvalue] = useState("");
  // // const [orgdeserror, serorgdeserror] = useState(false);
  const [orgdesc, setorgdesc] = useState("");
  const [editorValue, setEditorValue] = React.useState(
    RichTextEditor.createValueFromString(orgdesc, "html")
  );

  // const [validOrgNumber, setValidOrgnumber] = useState("");

  const options = useMemo(() => countryList().getData(), []);

  // // const [Orgnextbutton, setOrgnextbutton] = useState(false);

  // const [file, setFile] = useState(null);

  // const Orgname = useRef();
  // const Orgmail = useRef();
  // const OrgAddress = useRef();
  // const Orgcity = useRef();
  // const pincode = useRef();

  const fileTypes = ["JPEG", "PNG", "jpg"];

  // const [Orgnamebtn, setOrgnamebtn] = useState(false);
  // const [Orgemailbtn, setOrgemailbtn] = useState(false);
  // const [Orgaddressbtn, setOrgaddressbtn] = useState(false);
  // const [Orgcitybtn, setOrgcitybtn] = useState(false);
  // const [Orgcountrybtn, setOrgcountrybtn] = useState(false);
  // const [Orgpincodebtn, setOrgpincodebtn] = useState(false);
  const [Orgdesbtn, setOrgdesbtn] = useState(false);

  const handleOrgDesChange = (value) => {
    setEditorValue(value);
    setorgdesc(value.toString("html"));
    console.log(value.toString("html"));
    // console.log(value.length);
    if (value.toString("html") !== "<p><br></p>") {
      setOrgdesbtn(true);
    } else {
      setOrgdesbtn(false);
    }
    props.textEditorData(value.toString("html"));
  };

  // const handleOrgSubmit = async (e) => {
  //   e.preventDefault();
  //   let url = UrlConstant.base_url + UrlConstant.org;
  //   // email validation
  //   const emailstring = Orgmail.current.value;
  //   const valid = validator.isEmail(emailstring);
  //   console.log(valid);
  //   const finalEmail = emailstring.trim();

  //   const name = Orgname.current.value;
  //   const finalName = name.trim();

  //   const address = OrgAddress.current.value;
  //   const finalAddress = address.trim();

  //   const city = Orgcity.current.value;
  //   const finalCity = city.trim();

  //   const pinCode = pincode.current.value;
  //   const finalpinCode = pinCode.trim();

  //   var bodyFormData = new FormData();
  //   bodyFormData.append("org_email", finalEmail);
  //   bodyFormData.append("name", finalName);
  //   bodyFormData.append(
  //     "address",
  //     JSON.stringify({
  //       country: countryvalue,
  //       pincode: finalpinCode,
  //       address: finalAddress,
  //       city: finalCity,
  //     })
  //   );
  //   bodyFormData.append("phone_number", validOrgNumber);
  //   bodyFormData.append("logo", file);
  //   bodyFormData.append("org_description", orgdesc);
  //   console.log("dfdfdsf", bodyFormData);

  //   // let data = {
  //   //   org_email: finalEmail,
  //   //   name: finalName,
  //   //   address: {
  //   //     country: countryvalue,
  //   //     pincode: finalpinCode,
  //   //     address: finalAddress,
  //   //     city: finalCity,
  //   //   },
  //   //   phone_number: validOrgNumber,
  //   //   //   logo: file,
  //   //   org_description: orgdesc,
  //   // };

  //   if (!valid) {
  //     setisOrgmailerror(true);
  //   } else {
  //     setisOrgnameerror(false);

  //     HTTPService("POST", url, bodyFormData, true, false)
  //       .then((response) => {
  //         console.log("response");
  //         console.log("org details", response.data);
  //         //   console.log(response.json());
  //         console.log(response.status);
  //         if (response.status === 201) {
  //           // setEmail(false);
  //           // setError(false);
  //         } else {
  //           // setError(true);
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         //   setError(true);
  //       });

  //     //   await fetch(url, {
  //     //     method: "POST",
  //     //     headers: {
  //     //       //   Accept: "application/json",
  //     //       "content-type": "multipart/form-data; boundary=l3ipy71otz",
  //     //     },
  //     //     body: {
  //     //       org_email: finalEmail,
  //     //       name: finalName,
  //     //       address: {
  //     //         country: countryvalue,
  //     //         pincode: finalpinCode,
  //     //         address: finalAddress,
  //     //         city: finalCity,
  //     //       },
  //     //       phone_number: validOrgNumber,
  //     //       logo: file,
  //     //       org_description: orgdesc,

  //     //       //   otp: valid,
  //     //     },
  //     //   })
  //     //     .then((response) => {
  //     //       console.log("response");
  //     //       console.log("org details", response.data);
  //     //       // console.log(response.json());
  //     //       // console.log(response.refresh);
  //     //       // console.log(response.active);
  //     //       if (response.status === 200) {
  //     //         // setOtpError(false);
  //     //       } else {
  //     //         // setOtpError(true);
  //     //       }
  //     //     })
  //     //     .catch((e) => {
  //     //       console.log(e);
  //     //       //   setOtpError(true);
  //     //     });
  //   }
  // };

  // //   const onChange = (value) => {
  // //     console.log(value);
  // //     setorgdesc(value);
  // //   };

  // const handleOrgname = (e) => {
  //   console.log(e.target.value);
  //   var letters = /^[A-Za-z ]*$/;
  //   var orgname = e.target.value;
  //   // if (orgname.length > 0) {
  //   //   setisOrgnameerror(false);
  //   //   setOrgnextbutton(true);
  //   // } else {
  //   //   setisOrgnameerror(true);
  //   // }
  //   if (orgname.match(letters)) {
  //     setisOrgnameerror(false);
  //     setOrgnamebtn(true);
  //     //   setprofilenextbutton(true);
  //   } else {
  //     setisOrgnameerror(true);
  //     setOrgnamebtn(false);
  //   }
  // };

  // const handleOrgmail = (e) => {
  //   // console.log(e.target.value);
  //   var email = e.target.value;
  //   // if (email.length > 0) {
  //   //   setisOrgmailerror(false);
  //   //   // setOrgnextbutton(true);
  //   // } else {
  //   //   setisOrgmailerror(true);
  //   // }
  //   const valid = validator.isEmail(email);
  //   console.log(valid);
  //   const finalEmail = email.trim();
  //   console.log(finalEmail);
  //   if (valid) {
  //     setisOrgmailerror(false);
  //     setOrgemailbtn(true);
  //   } else {
  //     setisOrgmailerror(true);
  //     setOrgemailbtn(false);
  //   }
  // };

  // const handleOrgnumber = (value) => {
  //   console.log(value);
  //   setValidOrgnumber(value);
  // };

  // const handleOrgAddress = (e) => {
  //   console.log(e.target.value);
  //   var address = e.target.value;
  //   if (address.length > 0) {
  //     setisOrgAddresserror(false);
  //     setOrgaddressbtn(true);
  //     // setOrgnextbutton(true);
  //   } else {
  //     setisOrgAddresserror(true);
  //     setOrgaddressbtn(false);
  //   }
  // };

  // const handleOrgcity = (e) => {
  //   console.log(e.target.value);
  //   var letters = /^[A-Za-z]+$/;
  //   var city = e.target.value;
  //   // if (city.length > 0) {
  //   //   setisOrgcityerror(false);
  //   //   setOrgnextbutton(true);
  //   // } else {
  //   //   setisOrgcityerror(true);
  //   // }
  //   if (city.match(letters)) {
  //     setisOrgcityerror(false);
  //     setOrgcitybtn(true);
  //     //   setprofilenextbutton(true);
  //   } else {
  //     setisOrgcityerror(true);
  //     setOrgcitybtn(false);
  //   }
  // };

  // const countrychangeHandler = (value) => {
  //   setcountryvalue(value);
  //   setOrgcountrybtn(true);
  // };

  // const handlepincode = (e) => {
  //   console.log(e.target.value);
  //   var pincode = e.target.value;
  //   if (pincode.length > 0) {
  //     setispincodeerror(false);
  //     setOrgpincodebtn(true);
  //     // setOrgnextbutton(true);
  //   } else {
  //     setispincodeerror(true);
  //     setOrgpincodebtn(false);
  //   }
  // };

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

  // const handleorgFileChange = (file) => {
  //   // var finalFiles = file.target.files;
  //   setFile(file);
  //   console.log(file);
  //   console.log(file.length);
  //   console.log(file.size);
  // };

  //   const onEditorStateChange = (value) => {
  //     console.log(value);
  //   console.log(value.getCurrentContent().getPlainText());
  //   let currentContentAsHTML = convertToHTML(value.getCurrentContent());
  //     console.log(value.createWithContent(currentContentAsHTML));
  //   };

  return (
    <div>
      <div className="orgheader">Organization details</div>
      <div>
        <form noValidate autoComplete="off" onSubmit={props.handleOrgSubmit}>
          <div className="orgname">
            <TextField
              id="filled-basic"
              label="Organization Name"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profilefirstname"
              onChange={props.handleOrgname}
              inputRef={props.Orgname}
              error={props.isOrgnameerror}
              helperText={props.isOrgnameerror ? "Enter Name" : ""}
            />
          </div>
          <div className="orgemail">
            <TextField
              type="email"
              id="filled-basic"
              label="Organization Mail ID"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profilelastname"
              onChange={props.handleOrgmail}
              inputRef={props.Orgmail}
              error={props.isOrgmailerror}
              helperText={props.isOrgmailerror ? "Enter Valid Email id" : ""}
            />
          </div>
          <div className="orgnumber">
            <MuiPhoneNumber
              defaultCountry={"in"}
              style={{ width: "420px" }}
              id="filled-basic"
              label="Organization Contact Number"
              variant="filled"
              onChange={props.handleOrgnumber}
              //   inputRef={profilenumber}
              // error={isOrgnumbererror}
              // helperText={isOrgnumbererror ? "Enter Valid Number" : ""}
            />
          </div>
          <div className="orgaddress">
            <TextField
              id="filled-basic"
              label="Address"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profileemail"
              onChange={props.handleOrgAddress}
              inputRef={props.OrgAddress}
              error={props.isOrgAddresserror}
              helperText={props.isOrgAddresserror ? "Enter Valid Address" : ""}
            />
          </div>
          <div className="orgcity">
            <TextField
              id="filled-basic"
              label="City"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profileemail"
              onChange={props.handleOrgcity}
              inputRef={props.Orgcity}
              error={props.isOrgcityerror}
              helperText={props.isOrgcityerror ? "Enter Valid City" : ""}
            />
          </div>
          <div className="orgcountry">
            <Select
              options={options}
              value={props.countryvalue}
              onChange={props.countrychangeHandler}
              isSearchable={true}
              style={{ width: "420px", zIndex: 4, backgroundColor: grey }}
              placeholder="Select Country"
            />
          </div>
          <div className="orgpincode">
            <TextField
              type="number"
              id="filled-basic"
              //   inputProps={{ maxLength: 6 }}
              label="Pin Code"
              variant="filled"
              style={{ width: "420px", zIndex: 0 }}
              onChange={props.handlepincode}
              inputRef={props.pincode}
              error={props.ispincodeerror}
              helperText={props.ispincodeerror ? "Enter vaild pin code" : ""}
            />
          </div>
          <div className="orgdes">
            {/* <DefaultEditor value={html} onChange={onChange} /> */}
            {/* <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              wrapperStyle={{
                width: 420,
                border: "1px solid black",
                zIndex: 4,
              }}
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  //   "list",
                  "textAlign",
                  //   "link",
                  //   "embedded",
                  //   "emoji",
                  //   "remove",
                  //   "history",
                ],
              }}
            /> */}
            <p className="orgdestitle">Organization Description</p>
            <RichTextEditor
              toolbarConfig={toolbarConfig}
              value={editorValue}
              onChange={handleOrgDesChange}
              required
              id="body-text"
              name="bodyText"
              type="string"
              multiline
              variant="filled"
              style={{
                minHeight: 410,
                width: 420,
                border: "1px solid black",
                zIndex: 4,
              }}
            />
          </div>
          {/* <div className="filesupload">
          <p className="uploadheader">Upload logo</p>
            <div className="uploadimg">
              <svg
                width={71}
                height={71}
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx={35.5} cy={35.5} r={35.5} fill="#FFF7DC" />
                <circle cx={35.5} cy={35.5} r={29.5} fill="#F9EABC" />
                <circle cx={35.5} cy={35.5} r={23.5} fill="#C09507" />
                <path
                  d="M38 25h-8c-1.1 0-1.99.9-1.99 2L28 43c0 1.1.89 2 1.99 2H42c1.1 0 2-.9 2-2V31l-6-6Zm4 18H30V27h7v5h5v11Zm-10-4.99 1.41 1.41L35 37.84V42h2v-4.16l1.59 1.59L40 38.01 36.01 34 32 38.01Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <p style={{ color: "#A3B0B8" }}>
              Drag and drop or
              <span>
                <button class="orguploadbtn info">Browse</button>
              </span>
              your files
            </p>
            <p style={{ color: "#A3B0B8" }}>
              Supports: JPEG, PNG not more than 2MB file size
            </p>
          </div> */}
          <div className="org">
            <FileUploader
              //   multiple={true}
              handleChange={props.handleorgFileChange}
              name="file"
              types={fileTypes}
              children={
                <UploadOrgLogo
                  uploaddes="Supports: JPEG, PNG not more than 2MB file size"
                  uploadtitle="Upload Company Logo"
                />
              }
              //   maxSize={2}
            />
            <p className="filename">
              {props.orgfile
                ? props.orgfile.size
                  ? `File name: ${props.orgfile.name}`
                  : ""
                : "No file uploaded yet"}
            </p>
            <p className="oversizemb">
              {props.orgfile != null && props.orgfile.size > 2097152
                ? "File uploaded is more than 2MB!"
                : ""}
            </p>
          </div>
          <div>
            {/* <Button variant="contained" className="orgbtn" type="submit">
              <span className="signupbtnname">Next</span>
            </Button> */}
            {props.Orgnamebtn &&
            props.Orgemailbtn &&
            props.Orgaddressbtn &&
            props.Orgcitybtn &&
            props.Orgcountrybtn &&
            props.Orgpincodebtn &&
            Orgdesbtn &&
            props.orgfile ? (
              <Button variant="contained" className="orgbtn" type="submit">
                <span className="signupbtnname">Next</span>
              </Button>
            ) : (
              <Button variant="outlined" disabled className="disableorgbtn">
                Next
              </Button>
            )}
          </div>
          <div>
            <Button
              variant="outlined"
              className="finishlaterorgbtn"
              type="button"
              onClick={props.finishLaterOrgScreen}>
              Finish Later
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
