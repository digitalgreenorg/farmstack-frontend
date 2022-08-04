import React, { useState, useEffect } from "react";
import GuestUserBanner from "../../Components/GuestUser/GuestUserBanner";
import GuestUserContactForm from "../../Components/GuestUser/GuestUserContactForm";
import GuestUserDescription from "../../Components/GuestUser/GuestUserDescription";
import Loader from "../../Components/Loader/Loader";
import GuestUserNavBar from "../../Components/Navbar/GuestUserNavbar";
import Success from "../../Components/Success/Success";
import { useHistory } from "react-router-dom";
import THEME_COLORS from "../../Constants/ColorConstants";
import labels from "../../Constants/labels";
import Footer from "../../Components/Footer/Footer";
import validator from "validator";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
export default function GuestUserContact(props) {
  // var validator = require('validator');
  const history = useHistory();
  const [isLoader, setIsLoader] = useState(false);
  const [allFieldCorrect, setAllFieldCorrect] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [iscontactnumbererror, setIscontactnumbererror] = useState(false);
  const [isdescriptionerror, setIsDescriptionerror] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const guestUserConstants = labels["en"];
  const [datahubUserDetails, setDatahubUserDetails] = useState({
    email_id: "KanhaiyaSuthar0@gmail.com",
  });
  const [useDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    subject: "",
    queryDescription: "",
  });

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmailError(!validator.isEmail(e.target.value));
    }
    const updatedUser = { ...useDetails, [e.target.name]: e.target.value };
    // console.log(e.target.name, e.target.value);
    setUserDetails({
      ...updatedUser,
    });
    // console.log(useDetails);
  };
  const useStyles = {
    btncolor: {
      color: THEME_COLORS.THEME_COLOR,
      "border-color": THEME_COLORS.THEME_COLOR,
      "border-radius": 0,
    },
    marginrowtop: { "margin-top": "30px" },
    marginrowtop50: { "margin-top": "50px" },
    inputwidth: {
      width: "420px",
      "text-align": "left",
      height: "49px",
      color: "#3D4A52",
    },
    fullWidth: {
      width: "860px",
      height: "49px",
    },
    marginRight: { "margin-right": "20px" },
    headingbold: { fontWeight: "bold" },
  };

  // Axios Call for getting data from backend
  const addNewGuestUserData = () => {
    const bodyFormData = {
      first_name: useDetails.firstName,
      last_name: useDetails.lastName,
      email: useDetails.email,
      subject: useDetails.subject,
      describe_query: useDetails.queryDescription,
      contact_number: useDetails.contactNumber,
    };

    HTTPService(
      "POST",
      UrlConstant.guest_base_url + UrlConstant.guest_contact_form,
      bodyFormData,
      true,
      false
    )
      .then((response) => {
        setIsLoader(false);
        setIsSuccess(true);
      })
      .catch((e) => {
        setIsLoader(false);
        console.log(e);
        // setisexisitinguseremail(true);
        //history.push(GetErrorHandlingRoute(e));
      });
  };

  const getDatahubAdminDetails = () => {
    // HTTPService(
    //   "POST",
    //   UrlConstant.base_url + UrlConstant.participant,
    //   //   bodyFormData,
    //   false,
    //   true
    // )
    //   .then((response) => {
    //     setIsLoader(false);
    //     setIsSuccess(true);
    //   })
    //   .catch((e) => {
    //     setIsLoader(false);
    //     console.log(e);
    //     // setisexisitinguseremail(true);
    //     //history.push(GetErrorHandlingRoute(e));
    //   });
  };

  useEffect(() => {});

  return (
    <>
      {isLoader ? <Loader /> : ""}
      <GuestUserNavBar />
      <GuestUserBanner />
      {isSuccess ? (
        <Success
          okevent={() => history.push("/guest/home")}
          route={"guest/home"}
          imagename={"success"}
          btntext={"ok"}
          heading={"Thanks for reaching us."}
          imageText={"Success!"}
          msg={"Your request has been shared successfully!"}
        ></Success>
      ) : (
        <GuestUserContactForm
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
          useDetails={useDetails}
          useStyles={useStyles}
          setUserDetails={setUserDetails}
          guestUserConstants={guestUserConstants}
          handleChange={handleChange}
          validator={validator}
          setEmailError={setEmailError}
          emailError={emailError}
          iscontactnumbererror={iscontactnumbererror}
          datahubUserDetails={datahubUserDetails}
          isdescriptionerror={isdescriptionerror}
          addNewGuestUserData={addNewGuestUserData}
        />
      )}

      {/* <Footer /> */}
    </>
  );
}
