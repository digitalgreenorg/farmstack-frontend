import React, { useState, useRef } from "react";
import "./profile.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MuiPhoneNumber from "material-ui-phone-number";

// import "react-phone-input-2/lib/material.css";

// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

export default function ProfileRightside(props) {
  const profilefirstname = useRef();
  const profilelastname = useRef();
  const profileemail = useRef();
  const profilenumber = useRef();

  const [ispropfilefirstnameerror, setispropfilefirstnameerror] =
    useState(false);
  const [ispropfilelastnameerror, setispropfilelastnameerror] = useState(false);
  const [ispropfileemailerror, setispropfileemailerror] = useState(false);
  const [ispropfilenumbererror, setispropfilenumbererror] = useState(false);
  const [profilenextbutton, setprofilenextbutton] = useState(false);
  const [validNumber, setValidnumber] = useState("");

  const handleprofileSubmit = async (e) => {
    e.preventDefault();
    console.log(profilefirstname.current.value);
    if (profilefirstname.current.value.length === 0) {
      setispropfilefirstnameerror(true);
    } else {
      setispropfilefirstnameerror(false);
    }
    if (profilelastname.current.value.length === 0) {
      setispropfilelastnameerror(true);
    } else {
      setispropfilelastnameerror(false);
    }
    if (profileemail.current.value.length === 0) {
      setispropfileemailerror(true);
    } else {
      setispropfileemailerror(false);
    }
    // if (profilenumber.current.value.length <= 3) {
    //   setispropfilenumbererror(true);
    // } else {
    //   setispropfilenumbererror(false);
    // }
  };
  const handleprofilfirstename = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z]+$/;
    var profilefirstname = e.target.value;
    if (profilefirstname.length > 0) {
      setispropfilefirstnameerror(false);
      setprofilenextbutton(true);
    } else {
      setispropfilefirstnameerror(true);
    }
    if (profilefirstname.match(letters)) {
      setispropfilefirstnameerror(false);
      setprofilenextbutton(true);
    } else {
      setispropfilefirstnameerror(true);
    }
  };
  const handleprofilelastname = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z]+$/;
    var lastname = e.target.value;
    if (lastname.length > 0) {
      setispropfilelastnameerror(false);
      setprofilenextbutton(true);
    } else {
      setispropfilelastnameerror(true);
    }
    if (lastname.match(letters)) {
      setispropfilelastnameerror(false);
      setprofilenextbutton(true);
    } else {
      setispropfilelastnameerror(true);
    }
  };

  const handleprofileemail = (e) => {
    console.log(e.target.value);
    var email = e.target.value;
    if (email.length > 0) {
      setispropfileemailerror(false);
      setprofilenextbutton(true);
    } else {
      setispropfileemailerror(true);
    }
  };
  const handleprofilenumber = (value) => {
    console.log(value);
    // var number = e.target.value;
    // if (number.length > 0) {
    //   setispropfilenumbererror(false);
    //   setprofilenextbutton(true);
    // } else {
    //   setispropfilenumbererror(true);
    // }
    setValidnumber(value);
  };

  return (
    <>
      <div className="profileheader">Profile Details</div>
      <div>
        <form noValidate autoComplete="off" onSubmit={handleprofileSubmit}>
          <div className="profilefirstname">
            <TextField
              id="filled-basic"
              label="First Name"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profilefirstname"
              onChange={handleprofilfirstename}
              inputRef={profilefirstname}
              error={ispropfilefirstnameerror}
              helperText={ispropfilefirstnameerror ? "Enter Valid Name" : ""}
            />
          </div>
          <div className="profilelastname">
            <TextField
              id="filled-basic"
              label="Last Name"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profilelastname"
              onChange={handleprofilelastname}
              inputRef={profilelastname}
              error={ispropfilelastnameerror}
              helperText={ispropfilelastnameerror ? "Enter Valid Email id" : ""}
            />
          </div>
          <div className="profileemail">
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profileemail"
              onChange={handleprofileemail}
              inputRef={profileemail}
              error={ispropfileemailerror}
              helperText={ispropfileemailerror ? "Enter Valid Email id" : ""}
            />
          </div>
          <div className="profilenumber">
            <MuiPhoneNumber
              defaultCountry={"in"}
              style={{ width: "420px" }}
              id="filled-basic"
              label="Contact Number"
              variant="filled"
              onChange={handleprofilenumber}
              //   inputRef={profilenumber}
              error={ispropfilenumbererror}
              helperText={ispropfilenumbererror ? "Enter Valid Email id" : ""}
            />
          </div>
          <div>
            {profilenextbutton ? (
              <Button variant="contained" className="profilebtn" type="submit">
                <span className="signupbtnname">Next</span>
              </Button>
            ) : (
              <Button variant="outlined" disabled className="disableprofilebtn">
                Next
              </Button>
            )}
            {/* <Button variant="contained" className="profilebtn" type="submit">
              <span className="signupbtnname">Next</span>
            </Button> */}
          </div>

          <div>
            <Button variant="outlined" className="finishlaterbtn" type="button">
              Finish Later
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
