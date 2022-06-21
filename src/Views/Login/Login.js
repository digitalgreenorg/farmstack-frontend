import React, { useState, useRef } from "react";
import SignInHeader from "../../Components/signup/SignInHeader";
import Leftintro from "../../Components/intros/Leftintro";
import Rightintro from "../../Components/intros/Rightintro";
import SignupEmail from "../../Components/signup/SignupEmail";
import Footerimg from "../../Components/signup/Footerimg";
import SignupOtp from "../../Components/signup/SignupOtp";
import './Login.css'
import validator from "validator";
import HTTPService from '../../Services/HTTPService'
import UrlConstant from '../../Constants/UrlConstants';
import labels from '../../Constants/labels';

export default function Login(props) {
  const [button, setButton] = useState(false);
  const email = useRef();
  const [iserror, setError] = useState(false);

  const [verifyOtpbutton, setOtpButton] = useState(false);
  const otp = useRef();
  const [isOtperror, setOtpError] = useState(false);
  const [restartcounter, Setrestartcounter] = useState(0);
  const [disable, setDisable] = useState(true);

  const [isemail, setEmail] = useState(true);
  const [validemail, Setvalidemail] = useState("");
  const [screenlabels, setscreenlabels] = useState(labels['en']);

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
      let url = UrlConstant.base_url + UrlConstant.login
      let data = {
        email: finalEmail
      }
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
      HTTPService('POST', url, data, false, false).then((response) => {
        console.log("email sent");
        console.log("email sent", response.data);
        //   console.log(response.json());
        console.log(response.status);
        if (response.status === 201) {
          setEmail(false);
          setError(false);
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
    let url = UrlConstant.base_url + UrlConstant.otp
    // console.log(valid);
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
      HTTPService('POST', url, {
        email: validemail,
        otp: valid,
      }, false, false).then((response) => {
        console.log("otp valid");
        console.log("otp valid", response.data);
        // console.log(response.json());
        // console.log(response.refresh);
        // console.log(response.active);
        if (response.status === 200) {
          setOtpError(false);
        } else {
          setOtpError(true);
        }
      })
        .catch((e) => {
          console.log(e);
          setOtpError(true);
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
    let url = UrlConstant.base_url + UrlConstant.resend_otp
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
    HTTPService('POST', url, {
      email: validemail,
    }, false, false).then((response) => {
      console.log("otp valid");
      console.log(response);
    })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <SignInHeader></SignInHeader>
      <h1 className="headertext">{screenlabels.login.signup_header}</h1>
      <Leftintro />
      <Rightintro />
      <Footerimg />
      {isemail ? (
        <SignupEmail
          screenlabels={screenlabels}
          handleSubmit={handleSubmit}
          handleEmail={handleEmail}
          iserror={iserror}
          email={email}
          button={button}
        />
      ) : (
          <SignupOtp
            handleSubmitOtp={handleSubmitOtp}
            handleOtp={handleOtp}
            isOtperror={isOtperror}
            otp={otp}
            button={verifyOtpbutton}
            hanleResendOTp={hanleResendOTp}
            restartcounter={restartcounter}
            disable={disable}
            setDisable={setDisable}
          />
        )}
    </div>
  );
}
