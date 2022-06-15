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

import { convertToHTML } from "draft-convert";

export default function OrgRightside() {
  const [isOrgnameerror, setisOrgnameerror] = useState(false);
  const [isOrgmailerror, setisOrgmailerror] = useState(false);
  const [isOrgnumbererror, setisOrgnumbererror] = useState(false);
  const [isOrgAddresserror, setisOrgAddresserror] = useState(false);
  const [isOrgcityerror, setisOrgcityerror] = useState(false);
  const [ispincodeerror, setispincodeerror] = useState(false);
  const [countryvalue, setcountryvalue] = useState("");
  const [orgdeserror, serorgdeserror] = useState(false);
  const [orgdesc, setorgdesc] = useState("");
  const [editorValue, setEditorValue] = React.useState(
    RichTextEditor.createValueFromString(orgdesc, "html")
  );

  const handleChange = (value) => {
    setEditorValue(value);
    setorgdesc(value.toString("html"));
    console.log(value.toString("html"));
    // let currentContentAsHTML = convertToHTML(value.getCurrentContent());
  };

  const [validOrgNumber, setValidOrgnumber] = useState("");

  const options = useMemo(() => countryList().getData(), []);

  const [Orgnextbutton, setOrgnextbutton] = useState(false);

  const Orgname = useRef();
  const Orgmail = useRef();
  const OrgAddress = useRef();
  const Orgcity = useRef();
  const pincode = useRef();
  const orgdes = useRef();

  const handleOrgSubmit = (e) => {
    e.preventDefault();
  };
  //   const onChange = (value) => {
  //     console.log(value);
  //     setorgdesc(value);
  //   };

  const handleOrgname = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z ]+$/;
    var orgname = e.target.value;
    if (orgname.length > 0) {
      setisOrgnameerror(false);
      //   setorgnextbutton(true);
    } else {
      setisOrgnameerror(true);
    }
    if (orgname.match(letters)) {
      setisOrgnameerror(false);
      //   setprofilenextbutton(true);
    } else {
      setisOrgnameerror(true);
    }
  };

  const handleOrgmail = (e) => {
    console.log(e.target.value);
    var email = e.target.value;
    if (email.length > 0) {
      setisOrgmailerror(false);
      //   setprofilenextbutton(true);
    } else {
      setisOrgmailerror(true);
    }
  };

  const handleOrgnumber = (value) => {
    console.log(value);
    setValidOrgnumber(value);
  };

  const handleOrgAddress = (e) => {
    console.log(e.target.value);
    var address = e.target.value;
    if (address.length > 0) {
      setisOrgAddresserror(false);
      //   setprofilenextbutton(true);
    } else {
      setisOrgAddresserror(true);
    }
  };

  const handleOrgcity = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z]+$/;
    var city = e.target.value;
    if (city.length > 0) {
      setisOrgcityerror(false);
      //   setprofilenextbutton(true);
    } else {
      setisOrgcityerror(true);
    }
    if (city.match(letters)) {
      setisOrgcityerror(false);
      //   setprofilenextbutton(true);
    } else {
      setisOrgcityerror(true);
    }
  };

  const countrychangeHandler = (value) => {
    setcountryvalue(value);
  };

  const handlepincode = (e) => {
    console.log(e.target.value);
    var pincode = e.target.value;
    if (pincode.length > 0) {
      setispincodeerror(false);
      //   setprofilenextbutton(true);
    } else {
      setispincodeerror(true);
    }
  };

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
        <form noValidate autoComplete="off" onSubmit={handleOrgSubmit}>
          <div className="orgname">
            <TextField
              required
              id="filled-basic"
              label="Organization Name"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profilefirstname"
              onChange={handleOrgname}
              inputRef={Orgname}
              error={isOrgnameerror}
              helperText={isOrgnameerror ? "Enter Name" : ""}
            />
          </div>
          <div className="orgemail">
            <TextField
              required
              type="email"
              id="filled-basic"
              label="Organization Mail ID"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profilelastname"
              onChange={handleOrgmail}
              inputRef={Orgmail}
              error={isOrgmailerror}
              helperText={isOrgmailerror ? "Enter Valid Email id" : ""}
            />
          </div>
          <div className="orgnumber">
            <MuiPhoneNumber
              defaultCountry={"in"}
              style={{ width: "420px" }}
              id="filled-basic"
              label="Organization Contact Number"
              variant="filled"
              onChange={handleOrgnumber}
              //   inputRef={profilenumber}
              error={isOrgnumbererror}
              helperText={isOrgnumbererror ? "Enter Valid Number" : ""}
            />
          </div>
          <div className="orgaddress">
            <TextField
              required
              id="filled-basic"
              label="Address"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profileemail"
              onChange={handleOrgAddress}
              inputRef={OrgAddress}
              error={isOrgAddresserror}
              helperText={isOrgAddresserror ? "Enter Valid Address" : ""}
            />
          </div>
          <div className="orgcity">
            <TextField
              id="filled-basic"
              label="City"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profileemail"
              onChange={handleOrgcity}
              inputRef={Orgcity}
              error={isOrgcityerror}
              helperText={isOrgcityerror ? "Enter Valid City" : ""}
            />
          </div>
          <div className="orgcountry">
            <Select
              options={options}
              value={countryvalue}
              onChange={countrychangeHandler}
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
              onChange={handlepincode}
              inputRef={pincode}
              error={ispincodeerror}
              helperText={ispincodeerror ? "Enter vaild pin code" : ""}
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
            <RichTextEditor
              value={editorValue}
              onChange={handleChange}
              required
              id="body-text"
              name="bodyText"
              type="string"
              multiline
              variant="filled"
              style={{ minHeight: 410 }}
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

          <div>
            {/* <Button variant="contained" className="orgbtn" type="submit">
              <span className="signupbtnname">Next</span>
            </Button> */}
            {Orgnextbutton ? (
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
              type="button">
              Finish Later
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
