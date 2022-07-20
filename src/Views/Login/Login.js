import React, { useState, useRef, useMemo, useEffect } from "react";
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
import OrgRightside from "../../Components/signup/OrgRightside";
import PoliciesRightside from "../../Components/signup/PoliciesRightside";
import BrandingRightside from "../../Components/signup/BrandingRightside";
import HandleSessionTimeout, {
  setTokenLocal,
  getTokenLocal,
  setUserId,
  getUserLocal,
} from "../../Utils/Common";
import RichTextEditor from "react-rte";
import countryList from "react-select-country-list";
import { useHistory } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import GetErrorHandlingRoute from "../../Utils/Common";

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
  const [isaccesstoken, setisaccesstoken] = useState(false);

  const [orgName, setOrgName] = useState("");
  // const [orgEmail, setOrgEmail] = useState("")
  const [orgAddress, setOrgAddress] = useState("");
  const [orgCity, setOrgCity] = useState("");
  const [orgPincode, setOrgPincode] = useState("");
  const [isExistingOrgEmail, setIsExistingOrgEmail] = useState(false);

  const [profileid, setprofileid] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (getTokenLocal()) {
      props.history.push("/datahub/participants");
    }
  }, []);
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

      setIsLoader(true);
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
          setIsLoader(false);
          console.log("email sent");
          console.log("email sent", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            console.log(response.data.id);
            setprofileid(response.data.id);
            setUserId(response.data.id);
            setEmail(false);
            setError(false);
            setisOtp(true);
          } else {
            setError(true);
          }
        })
        .catch((e) => {
          setIsLoader(false);
          console.log(e);
          if (
            e.response != null &&
            e.response != undefined &&
            e.response.status === 400
          ) {
            setuserSuspenderror(false);
            setError(true);
          } else {
            history.push(GetErrorHandlingRoute(e));
          }
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
      setIsLoader(true);
      await HTTPService(
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
          setIsLoader(false);
          console.log("uid", response.data.user);

          console.log("otp valid");
          console.log("otp valid", response.data);
          console.log("access token", response.data.access);
          console.log("user status", response.data.status);

          console.log(response.status);
          // if (response.data.status) {
          //   setTokenLocal(response.data.access);
          //   props.history.push("/datahub/participants");
          // }

          if (response.status === 201) {
            if (response.data.status) {
              setTokenLocal(response.data.access);

              props.history.push("/datahub/participants");
            } else {
              setisaccesstoken(response.data.access);
              setOtpError(false);
              setisProfile(true);
              setisOtp(false);
            }
            // console.log(response.json());
            // console.log(response.refresh);
            // console.log(response.active);
          } else {
            setOtpError(true);
          }
        })
        .catch((e) => {
          setIsLoader(false);
          console.log(e.response.status);
          setOtpError(true);
          if (e.response.status === 403) {
            setuserSuspenderror(true);
            setOtpError(false);
          }
          if (e.response.status === 401) {
            setOtpError(true);
          } else {
            history.push(GetErrorHandlingRoute(e));
          }
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
    setIsLoader(true);
    HTTPService(
      "POST",
      url,
      {
        email: validemail,
      },
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        console.log("otp valid");
        console.log(response);
      })
      .catch((e) => {
        setIsLoader(false);
        history.push(GetErrorHandlingRoute(e));
      });
  };

  // profile screen functions
  const profilefirstname = useRef();
  const profilelastname = useRef();
  const profileemail = useRef();

  const [ispropfilefirstnameerror, setispropfilefirstnameerror] =
    useState(false);
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
    setIsLoader(true);
    await HTTPService("PUT", url, bodyFormData, true, true)
      .then((response) => {
        setIsLoader(false);
        console.log("profile response");
        console.log("profile details", response.data);
        //   console.log(response.json());
        console.log(response.status);
        // setisOrg(true);
        // setisProfile(false);
        if (response.status === 201) {
          // setEmail(false);
          // setError(false);
          setisProfile(false);
          setisOrg(true);
        }
        // } else {
        //   // setError(true);
        //   setisOrg(false);
        // }
      })
      .catch((e) => {
        setIsLoader(false);
        history.push(GetErrorHandlingRoute(e));
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

  const finishLaterProfileScreen = () => {
    console.log("clicked on finish later profile screen");
    setisProfile(false);
    setisOrg(true);
  };

  // org screen
  const [isOrgnameerror, setisOrgnameerror] = useState(false);
  const [isOrgmailerror, setisOrgmailerror] = useState(false);
  // const [isOrgnumbererror, setisOrgnumbererror] = useState(false);
  const [isOrgAddresserror, setisOrgAddresserror] = useState(false);
  const [isOrgcityerror, setisOrgcityerror] = useState(false);
  const [ispincodeerror, setispincodeerror] = useState(false);
  const [countryvalue, setcountryvalue] = useState("");
  // const [orgdeserror, serorgdeserror] = useState(false);
  // const [orgdesc, setorgdesc] = useState("");
  // const [editorValue, setEditorValue] = React.useState(
  //   RichTextEditor.createValueFromString(orgdesc, "html")
  // );
  const [textEditorValue, settextEditorValue] = useState("");

  const [validOrgNumber, setValidOrgnumber] = useState("");
  const [orgfile, setorgfile] = useState(null);

  // const Orgname = useRef();
  const Orgmail = useRef();
  // const OrgAddress = useRef();
  // const Orgcity = useRef();
  // const pincode = useRef();

  const [Orgnamebtn, setOrgnamebtn] = useState(false);
  const [Orgemailbtn, setOrgemailbtn] = useState(false);
  const [Orgaddressbtn, setOrgaddressbtn] = useState(false);
  const [Orgcitybtn, setOrgcitybtn] = useState(false);
  const [Orgcountrybtn, setOrgcountrybtn] = useState(false);
  const [Orgpincodebtn, setOrgpincodebtn] = useState(false);

  const [isLoader, setIsLoader] = useState(false);
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

  const handleOrgSubmit = async (e) => {
    e.preventDefault();
    let url = UrlConstant.base_url + UrlConstant.org;
    // email validation
    const emailstring = Orgmail.current.value;
    const valid = validator.isEmail(emailstring);
    console.log(valid);
    const finalEmail = emailstring.trim();

    // const name = Orgname.current.value;
    const finalName = orgName;

    // const address = OrgAddress.current.value;
    const finalAddress = orgAddress;

    // const city = Orgcity.current.value;
    const finalCity = orgCity;

    // const pinCode = pincode.current.value;
    const finalpinCode = orgPincode;

    var id = getUserLocal();
    console.log("user id", id);

    var bodyFormData = new FormData();
    bodyFormData.append("user_id", id);
    bodyFormData.append("org_email", finalEmail);
    bodyFormData.append("name", finalName);
    bodyFormData.append(
      "address",
      JSON.stringify({
        country: countryvalue,
        pincode: finalpinCode,
        address: finalAddress,
        city: finalCity,
      })
    );
    bodyFormData.append("phone_number", validOrgNumber);
    bodyFormData.append("logo", orgfile);
    bodyFormData.append("org_description", textEditorValue);
    console.log("dfdfdsf", bodyFormData);

    if (!valid) {
      setisOrgmailerror(true);
    } else {
      setisOrgnameerror(false);

      setIsLoader(true);
      HTTPService("POST", url, bodyFormData, true, true)
        .then((response) => {
          setIsLoader(false);
          console.log("response");
          console.log("org details", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            setisPolicies(true);
            setisOrg(false);
            // setEmail(false);
            // setError(false);
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          setIsLoader(false);
          console.log(e);
          setIsExistingOrgEmail(true);
        });
    }
  };

  const handleOrgname = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z ]*$/;
    var orgname = e.target.value;
    // if (orgname.length > 0) {
    //   setisOrgnameerror(false);
    //   setOrgnextbutton(true);
    // } else {
    //   setisOrgnameerror(true);
    // }
    if (orgname.match(letters)) {
      setisOrgnameerror(false);
      setOrgnamebtn(true);
      //   setprofilenextbutton(true);
    } else {
      setisOrgnameerror(true);
      setOrgnamebtn(false);
    }
  };

  const handleOrgmail = (e) => {
    // console.log(e.target.value);
    var email = e.target.value;
    // if (email.length > 0) {
    //   setisOrgmailerror(false);
    //   // setOrgnextbutton(true);
    // } else {
    //   setisOrgmailerror(true);
    // }
    setIsExistingOrgEmail(false);
    const valid = validator.isEmail(email);
    console.log(valid);
    const finalEmail = email.trim();
    console.log(finalEmail);
    if (valid) {
      setisOrgmailerror(false);
      setOrgemailbtn(true);
    } else {
      setisOrgmailerror(true);
      setOrgemailbtn(false);
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
      setOrgaddressbtn(true);
      // setOrgnextbutton(true);
    } else {
      setisOrgAddresserror(true);
      setOrgaddressbtn(false);
    }
  };

  const handleOrgcity = (e) => {
    console.log(e.target.value);
    var letters = /^[A-Za-z]+$/;
    var city = e.target.value;
    // if (city.length > 0) {
    //   setisOrgcityerror(false);
    //   setOrgnextbutton(true);
    // } else {
    //   setisOrgcityerror(true);
    // }
    if (city.match(letters)) {
      setisOrgcityerror(false);
      setOrgcitybtn(true);
      //   setprofilenextbutton(true);
    } else {
      setisOrgcityerror(true);
      setOrgcitybtn(false);
    }
  };

  const countrychangeHandler = (value) => {
    setcountryvalue(value);
    setOrgcountrybtn(true);
  };

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
  };

  const handleorgFileChange = (file) => {
    // var finalFiles = file.target.files;
    setorgfile(file);
    console.log(file);
    console.log(file.length);
    console.log(file.size);
  };

  const finishLaterOrgScreen = () => {
    console.log("clicked on finish later Org screen");
    setisPolicies(true);
    setisOrg(false);
  };

  return (
    <div>
      {isLoader ? <Loader /> : ""}
      <SignInHeader></SignInHeader>
      <h1 className="headertext">{screenlabels.login.signup_header}</h1>
      <Leftintro />
      {isemail || isOtp ? <Rightintro /> : ""}
      {/* <Footerimg /> */}
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
          finishLaterProfileScreen={finishLaterProfileScreen}
        />
      )}
      {isOrg ? (
        <OrgRightside
          isOrgnameerror={isOrgnameerror}
          setisOrgnameerror={setisOrgnameerror}
          isOrgmailerror={isOrgmailerror}
          isOrgAddresserror={isOrgAddresserror}
          setisOrgAddresserror={setisOrgAddresserror}
          isOrgcityerror={isOrgcityerror}
          setisOrgcityerror={setisOrgcityerror}
          ispincodeerror={ispincodeerror}
          setispincodeerror={setispincodeerror}
          countryvalue={countryvalue}
          // orgdesc={orgdesc}
          // editorValue={editorValue}
          validOrgNumber={validOrgNumber}
          orgfile={orgfile}
          orgName={orgName}
          setOrgName={setOrgName}
          // orgEmail={orgEmail}
          // setOrgEmail={setOrgEmail}
          orgAddress={orgAddress}
          setOrgAddress={setOrgAddress}
          orgCity={orgCity}
          setOrgCity={setOrgCity}
          orgPincode={orgPincode}
          setOrgPincode={setOrgPincode}
          isExistingOrgEmail={isExistingOrgEmail}
          // Orgname={Orgname}
          Orgmail={Orgmail}
          // OrgAddress={OrgAddress}
          // Orgcity={Orgcity}
          // pincode={pincode}
          Orgnamebtn={Orgnamebtn}
          Orgemailbtn={Orgemailbtn}
          Orgaddressbtn={Orgaddressbtn}
          Orgcitybtn={Orgcitybtn}
          Orgcountrybtn={Orgcountrybtn}
          Orgpincodebtn={Orgpincodebtn}
          // Orgdesbtn={Orgdesbtn}
          // handleOrgDesChange={handleOrgDesChange}
          textEditorData={(value) => settextEditorValue(value)}
          handleOrgSubmit={handleOrgSubmit}
          handleOrgname={handleOrgname}
          handleOrgmail={handleOrgmail}
          handleOrgnumber={handleOrgnumber}
          handleOrgAddress={handleOrgAddress}
          handleOrgcity={handleOrgcity}
          countrychangeHandler={countrychangeHandler}
          handlepincode={handlepincode}
          handleorgFileChange={handleorgFileChange}
          finishLaterOrgScreen={finishLaterOrgScreen}
        />
      ) : (
        <></>
      )}
      {isPolicies && (
        <PoliciesRightside
          isaccesstoken={isaccesstoken}
          showBrandingScreen={() => {
            setisPolicies(false);
            setisBranding(true);
          }}
        />
      )}
      {isBranding && (
        <BrandingRightside
          validemail={validemail}
          isaccesstoken={isaccesstoken}
        />
      )}
    </div>
  );
}
