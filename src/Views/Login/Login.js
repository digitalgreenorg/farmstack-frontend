import React, { useState, useRef } from "react";
import SignInHeader from "../../Components/signup/SignInHeader";
import Leftintro from "../../Components/intros/Leftintro";
import Rightintro from "../../Components/intros/Rightintro";
import SignupEmail from "../../Components/signup/SignupEmail";
import Footerimg from "../../Components/signup/Footerimg";
import SignupOtp from "../../Components/signup/SignupOtp";
import "./Login.css";
import validator from "validator";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import labels from "../../Constants/labels";

import ProfileRightside from "../../Components/signup/ProfileRightside";

export default function Login(props) {
  const [button, setButton] = useState(false);
  const email = useRef();
  const [iserror, setError] = useState(false);

  const [verifyOtpbutton, setOtpButton] = useState(false);
  const otp = useRef();
  const [isOtperror, setOtpError] = useState(false);
  const [userSuspenderror, setuserSuspenderror] = useState(false);
  const [restartcounter, Setrestartcounter] = useState(0);
  const [disable, setDisable] = useState(true);

  const [validemail, Setvalidemail] = useState("");
  const [screenlabels, setscreenlabels] = useState(labels["en"]);

  const [isemail, setEmail] = useState(true);
  const [isOtp, setisOtp] = useState(false);
  const [isProfile, setisProfile] = useState(false);
  const [isOrg, setisOrg] = useState(false);
  const [isPolicies, setisPolicies] = useState(false);
  const [isBranding, setisBranding] = useState(false);

  const [profileid, setprofileid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email.current.value);
    const emailString = email.current.value;
    const valid = validator.isEmail(email.current.value);
    console.log(valid);
    const finalEmail = emailString.trim();
    console.log(finalEmail);
    if (!valid) {
      setError(true);
    } else {
      Setvalidemail(finalEmail);
      let url = UrlConstant.base_url + UrlConstant.login;
      let data = {
        email: finalEmail,
      };
      // await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: finalEmail,
      //   }),
      // }).then((response) => {
      HTTPService("POST", url, data, false, false)
        .then((response) => {
          console.log("email sent");
          console.log("email sent", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            console.log(response.data.id);
            setprofileid(response.data.id);
            setEmail(false);
            setError(false);
            setisOtp(true);
          } else {
            setError(true);
          }
        })
        .catch((e) => {
          console.log(e);
          setError(true);
        });
    }
  };
  const handleEmail = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value.length > 0) {
      setButton(true);
      setError(false);
    } else {
      setButton(false);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    console.log(otp.current.value);
    const valid = otp.current.value;
    var numbers = /^[0-9]+$/;
    let url = UrlConstant.base_url + UrlConstant.otp;

    if (!valid.match(numbers)) {
      setOtpError(true);
    } else {
      // await fetch("https://d202-106-51-85-143.in.ngrok.io/accounts/otp/", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: validemail,
      //     otp: valid,
      //   }),
      // })
      //   .then((response) => {
      HTTPService(
        "POST",
        url,
        {
          email: validemail,
          otp: valid,
        },
        false,
        false
      )
        .then((response) => {
          console.log("otp valid");
          console.log("otp valid", response.data);
          console.log(response.status);
          // console.log(response.json());
          // console.log(response.refresh);
          // console.log(response.active);
          if (response.status === 200) {
            setOtpError(false);
            setisProfile(true);
            setisOtp(false);
          } else {
            setOtpError(true);
          }
        })
        .catch((e) => {
          console.log(e.response.status);
          setOtpError(true);
          if (e.response.status === 403) {
            setuserSuspenderror(true);
            setOtpError(false);
          }
          console.log(userSuspenderror);
        });
    }
  };

  const handleOtp = (e) => {
    e.preventDefault();
    const value = e.target.value;
    console.log(value);
    if (e.target.value.length === 6) {
      setOtpButton(true);
      setOtpError(false);
    } else {
      setOtpButton(false);
      //   setOtpError(true);
    }
  };
  const hanleResendOTp = async (e) => {
    e.preventDefault();
    console.log("resend otp btn clicked");
    let url = UrlConstant.base_url + UrlConstant.resend_otp;
    // SetCounterTimeout(false);
    // Setrestart(restart + 1);
    Setrestartcounter(restartcounter + 1);
    setDisable(true);
    // await fetch("https://80a5-106-51-85-143.in.ngrok.io/accounts/resend_otp/", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: validemail,
    //   }),
    // })
    HTTPService(
      "POST",
      url,
      {
        email: validemail,
      },
      false,
      false
    )
      .then((response) => {
        console.log("otp valid");
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // profile screen functions
  const profilefirstname = useRef();
  const profilelastname = useRef();
  const profileemail = useRef();

  const [ispropfilefirstnameerror, setispropfilefirstnameerror] = useState(
    false
  );
  const [ispropfilelastnameerror, setispropfilelastnameerror] = useState(false);
  const [ispropfileemailerror, setispropfileemailerror] = useState(false);
  // const [ispropfilenumbererror, setispropfilenumbererror] = useState(false);
  const [profilenextbutton, setprofilenextbutton] = useState(false);
  const [validNumber, setValidnumber] = useState("");

  const handleprofileSubmit = async (e) => {
    e.preventDefault();
    console.log(profilefirstname.current.value);
    const firstname = profilefirstname.current.value;
    const lastname = profilelastname.current.value;
    const email = profileemail.current.value;
    if (profilefirstname.current.value.length === 0) {
      setispropfilefirstnameerror(true);
    } else {
      setispropfilefirstnameerror(false);
    }
    // if (profilelastname.current.value.length === 0) {
    //   setispropfilelastnameerror(true);
    // } else {
    //   setispropfilelastnameerror(false);
    // }
    // if (profileemail.current.value.length === 0) {
    //   setispropfileemailerror(true);
    // } else {
    //   setispropfileemailerror(false);
    // }
    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("first_name", firstname);
    bodyFormData.append("last_name", lastname);
    bodyFormData.append("phone_number", validNumber);

    console.log("profile data", bodyFormData);
    let url = UrlConstant.base_url + UrlConstant.profile + `${profileid}/`;

    await HTTPService("PUT", url, bodyFormData, true, false)
      .then((response) => {
        console.log("response");
        console.log("org details", response.data);
        //   console.log(response.json());
        console.log(response.status);
        if (response.status === 201) {
          // setEmail(false);
          // setError(false);
        } else {
          // setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        //   setError(true);
      });
  };
  const handleprofilfirstename = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z]+$/;
    var profilefirstname = e.target.value;
    // if (profilefirstname.length > 0) {
    //   setispropfilefirstnameerror(false);
    //   // setprofilenextbutton(true);
    // } else {
    //   setispropfilefirstnameerror(true);
    // }
    if (profilefirstname.match(letters)) {
      setispropfilefirstnameerror(false);
      setprofilenextbutton(true);
    } else {
      setispropfilefirstnameerror(true);
      setprofilenextbutton(false);
    }
  };
  const handleprofilelastname = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z\s]*$/;
    var lastname = e.target.value;
    if (lastname.match(letters)) {
      setispropfilelastnameerror(false);
      // setprofilenextbutton(true);
    } else {
      setispropfilelastnameerror(true);
      // setprofilenextbutton(false);
    }
  };

  // const handleprofileemail = (e) => {
  //   console.log(e.target.value);
  //   var email = e.target.value;
  //   // if (email.length > 0) {
  //   //   setispropfileemailerror(false);
  //   //   setprofilenextbutton(true);
  //   // } else {
  //   //   setispropfileemailerror(true);
  //   // }
  // };
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
    <div>
      <SignInHeader></SignInHeader>
      <h1 className="headertext">{screenlabels.signup_header}</h1>
      <Leftintro />
      {isemail || isOtp ? <Rightintro /> : ""}
      <Footerimg />
      {isemail && (
        <SignupEmail
          screenlabels={screenlabels}
          handleSubmit={handleSubmit}
          handleEmail={handleEmail}
          iserror={iserror}
          email={email}
          button={button}
        />
      )}
      {isOtp && (
        <SignupOtp
          handleSubmitOtp={handleSubmitOtp}
          handleOtp={handleOtp}
          isOtperror={isOtperror}
          isuserSuspenderror={userSuspenderror}
          otp={otp}
          button={verifyOtpbutton}
          hanleResendOTp={hanleResendOTp}
          restartcounter={restartcounter}
          disable={disable}
          setDisable={setDisable}
        />
      )}
      {isProfile && (
        <ProfileRightside
          handleprofileSubmit={handleprofileSubmit}
          handleprofilfirstename={handleprofilfirstename}
          handleprofilelastname={handleprofilelastname}
          handleprofilenumber={handleprofilenumber}
          ispropfilefirstnameerror={ispropfilefirstnameerror}
          ispropfilelastnameerror={ispropfilelastnameerror}
          ispropfileemailerror={ispropfileemailerror}
          profilenextbutton={profilenextbutton}
          profilefirstname={profilefirstname}
          profilelastname={profilelastname}
          profileemail={profileemail}
          validemail={validemail}
        />
      )}
    </div>
  );
}
