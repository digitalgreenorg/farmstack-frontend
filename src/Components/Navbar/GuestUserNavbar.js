import React, { useState, useEffect } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import labels from "../../Constants/labels";
import LocalStorageConstants from "../../Constants/LocalStorageConstants";
import { Link, useHistory } from "react-router-dom";
import HTTPService from "../../Services/HTTPService";
import { flushLocalstorage, getUserLocal } from "../../Utils/Common";
import UrlConstant from "../../Constants/UrlConstants";
import Avatar from "@mui/material/Avatar";
import "./Navbar.css";
import Button from "@mui/material/Button";
import Loader from "../Loader/Loader";
import {GetErrorHandlingRoute} from "../../Utils/Common";

const GuestUserNavBar = (props) => {
  const [profile, setprofile] = useState(null);
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  const[isLoader, setIsLoader] = useState(false)
  const[linkClicked, setLinkClicked] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(null)
  

  let history = useHistory();

  useEffect(() => {
    HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.guest_organization_details,
      "",
      false,
      false
    )
    .then((response) => {
        setIsLoader(false);
        if (response.data.organization && response.data.organization.phone_number)
        {
          setPhoneNumber(response.data.organization.phone_number)
        }
    })
    .catch((e) => {
      setIsLoader(false);
      console.log(e);
    });
    
  }, []);

  return (
    <>
      {isLoader ? <Loader />: ''}
      <Nav id="datahubnavbar">
        {/* <Bars /> */}
        {phoneNumber ?
        <div>
          <img className="image"
            src={require("../../Assets/Img/call_icon.png")}
            alt="call"
            style={{ width: "52px", height: "52px", "margin-left": "180px", "margin-top": "9px"}}
          />&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="navtext fontweight400andfontsize16pxandcolor3D4A52">Call:&nbsp;
          <a style={{color: 'black'}} href={'tel: ' + phoneNumber}>{phoneNumber}</a> -to register your grievance</span>
        </div> : <></> }
        <NavMenu>
          <NavLink to={'/legal'} activeStyle>
            <img
              className="boldimage"
              src={require("../../Assets/Img/legal_bold.svg")}
              alt="new"
            />
            <img
              className="nonboldimage"
              src={require("../../Assets/Img/legal.svg")}
              alt="new"
            />
            &nbsp;&nbsp;{screenlabels.navbar.legal}
          </NavLink>
          <NavLink to={'/contact'} activeStyle>
            <img
              className="boldimage"
              src={require("../../Assets/Img/contact_bold.svg")}
              alt="new"
            />
            <img
              className="nonboldimage"
              src={require("../../Assets/Img/contact.svg")}
              alt="new"
            />
            &nbsp;&nbsp;{screenlabels.navbar.contact}
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin">
            &nbsp;&nbsp;{screenlabels.navbar.apply_for_participant}
          </NavBtnLink>
        </NavBtn>
        <NavBtn>
          <NavBtnLink to="/login">
            <img src={require("../../Assets/Img/account.svg")} alt="new" />
            &nbsp;&nbsp;{screenlabels.navbar.Signin}
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default GuestUserNavBar;
