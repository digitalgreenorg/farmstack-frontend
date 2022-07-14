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
import { useHistory } from "react-router-dom";
import HTTPService from "../../Services/HTTPService";
import HandleSessionTimeout, { getUserLocal, handleSessionTimeout } from "../../Utils/Common";
import UrlConstant from "../../Constants/UrlConstants";
import Avatar from "@mui/material/Avatar";
import "./Navbar.css";
import Button from "@mui/material/Button";
import SESSION_CONSTANTS from "../../Constants/OtherConstants";
import Loader from "../Loader/Loader";

const Navbar = (props) => {
  const [profile, setprofile] = useState(null);
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  const[isLoader, setIsLoader] = useState(false)

  let history = useHistory();

  const getAccountDetails = async () => {
    var id = getUserLocal();
    console.log("user id", id);
    setIsLoader(true);
    await HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.profile + id + "/",
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        console.log(
          "get request for account settings in navbar",
          response.data
        );
        console.log("picture", response.data.profile_picture);
        setprofile(response.data.profile_picture);
        // setphonenumber(response.data.phone_number);
        // setfirstname(response.data.first_name);
        // setlastname(response.data.last_name);
        // setemail(response.data.email);
        // setFile(response.data.profile_picture);
      })
      .catch((e) => {
        setIsLoader(false);
        console.log(e);
        if (e.response != null && e.response != undefined && e.response.status == SESSION_CONSTANTS.SESSION_TIMEOUT)
        {
          console.log(e.response.status);
          history.push('/sessionexpired');
        }
        else
        {
          history.push('/error');
        }
      });
  };

  useEffect(() => {
    getAccountDetails();
  }, [profile]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem(LocalStorageConstants.KEYS.JWTToken);
    localStorage.removeItem(LocalStorageConstants.KEYS.user);
    history.push("/login");
  };
  return (
    <>
      {isLoader ? <Loader />: ''}
      <Nav id="datahubnavbar">
        {/* <Bars /> */}
        <img
          src={require("../../Assets/Img/farmstack.jpg")}
          alt="new"
          style={{ width: "139.35px", height: "18.99px", "margin-top": "26px"}}
        />
        <NavMenu>
          <NavLink to="/datahub/participants" activeStyle>
            <img
              className="boldimage"
              src={require("../../Assets/Img/bold_participants.svg")}
              alt="new"
            />
            <img
              className="nonboldimage"
              src={require("../../Assets/Img/participants.svg")}
              alt="new"
            />
            &nbsp;&nbsp;{screenlabels.navbar.Participants}
          </NavLink>
          <NavLink to="/datahub/support" activeStyle>
            <img
              className="boldimage"
              src={require("../../Assets/Img/support_bold.svg")}
              alt="new"
            />
            <img
              className="nonboldimage"
              src={require("../../Assets/Img/support.svg")}
              alt="new"
            />
            &nbsp;&nbsp;{screenlabels.navbar.Support}
          </NavLink>
          <NavLink
            to="/datahub/settings"
            activeStyle
            onClick={(e) => {
              e.preventDefault();
              history.push("/datahub/settings/1");
            }}>
            <img
              className="boldimage"
              src={require("../../Assets/Img/bold_settings.svg")}
              alt="new"
            />
            <img
              className="nonboldimage"
              src={require("../../Assets/Img/settings.svg")}
              alt="new"
            />
            &nbsp;&nbsp;{screenlabels.navbar.Settings}
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {profile ? (
          <NavBtn onClick={handleLogout}>
            <Button
              variant="outlined"
              // color="secondary"
              className="signoutbtn-navbar"
              startIcon={<Avatar src={profile} />}>
              {screenlabels.navbar.Signout}
            </Button>
            {/* <NavBtnLink to="/signin" className="signoutbtn-navbar">
              <Avatar
                alt="profile img"
                src={profile}
                // sx={{ width: 10, height: 10 }}
              />
              &nbsp;&nbsp;{screenlabels.navbar.Signout}
            </NavBtnLink> */}
          </NavBtn>
        ) : (
          <NavBtn onClick={handleLogout}>
            <NavBtnLink to="/signin">
              <img src={require("../../Assets/Img/account.svg")} alt="new" />
              &nbsp;&nbsp;{screenlabels.navbar.Signout}
            </NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
