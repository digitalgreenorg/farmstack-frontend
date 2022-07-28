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
  

  let history = useHistory();

  useEffect(() => {
    //getAccountDetails();
  }, [profile]);

  return (
    <>
      {isLoader ? <Loader />: ''}
      <Nav id="datahubnavbar">
        {/* <Bars /> */}
        <img className="image"
          src={require("../../Assets/Img/call_icon.png")}
          alt="call"
          style={{ width: "52px", height: "52px", "margin-left": "180px", "margin-top": "9px"}}
        />
        <span className="navtext fontweight400andfontsize16pxandcolor3D4A52">Call: 
          <Link style={{color: 'black'}} to={{pathname: 'tel: ' + screenlabels.navbar.helpline}}>{screenlabels.navbar.helpline}</Link> -to register your grievance</span>
        <NavMenu>
          <span className={"navlink " + (props.isLegalClicked ? " active" : "")} to={'#'} 
                onClick={()=>{props.setLegalClicked(true);props.setContactClicked(false); setLinkClicked(true)}}>
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
          </span>
          <span className={"navlink " + (props.isContactClicked ? " active" : "")} 
                onClick={()=>{props.setLegalClicked(false);props.setContactClicked(true);setLinkClicked(true)}}>
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
          </span>
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
