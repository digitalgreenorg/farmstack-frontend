import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import {
  flushLocalstorage,
  getUserLocal,
  getTokenLocal,
  isLoggedInUserAdmin,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import style from "./Navbar_New.module.css";
import globalStyle from "../../Assets/CSS/global.module.css";

const navActiveStyle = {
  fontFamily: "Montserrat",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "18px",
  color: "#00AB55",
  marginRight: "50px",
  textDecoration: "none",
};

const navInActiveStyle = {
  fontFamily: "Montserrat",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "18px",
  color: "#212B36",
  marginRight: "50px",
  textDecoration: "none",
};
const NavbarNew = ({ loginType }) => {
  const history = useHistory();
  const location = useLocation();

  console.log(location);
  const [profile, setProfile] = useState();
  const [isSelected, setIsSelected] = useState("");

  const getAccountDetails = async () => {
    var id = getUserLocal();
    await HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.profile + id + "/",
      "",
      false,
      true
    )
      .then((response) => {
        setProfile(response.data.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const isNavLinkActive = (path) => {
    return location.pathname === path ? true : false;
  };
  const handleParticipantLogout = (e) => {
    e.preventDefault();
    flushLocalstorage();
    history.push("/participant/login");
  };

  const handleDatahubLogout = (e) => {
    e.preventDefault();
    flushLocalstorage();
    history.push("/datahub/login");
  };

  const handleSignOut = (e) => {
    if (getTokenLocal() && isLoggedInUserAdmin()) {
      handleDatahubLogout(e);
    } else if (getTokenLocal() && isLoggedInUserParticipant()) {
      handleParticipantLogout(e);
    }
  };
  const handleSelect = (item) => {
    setIsSelected(item);
  };
  // useEffect(() => {
  //   // getAccountDetails();
  // }, [profile]);
  console.log("profile", profile);

  return (
    <Box
      className={`d-flex justify-content-between ${style.navbarContainer} ${globalStyle.white_background}`}
    >
      <Box
        className="d-flex justify-content-between w-100"
        sx={{ marginLeft: "144px", marginRight: "144px" }}
      >
        <Box className="d-flex align-items-center">
          <img
            src={require("../../Assets/Img/footer_logo.svg")}
            alt="footerLogo"
          />
        </Box>
        <Box className="d-flex align-items-center">
          {!getTokenLocal() ? (
            <NavLink
              activeStyle={navActiveStyle}
              style={navInActiveStyle}
              to="/home"
              onClick={() => handleSelect("home")}
            >
              {isNavLinkActive("/home") ? (
                <img
                  className={style.dotStyle}
                  src={require("../../Assets/Img/green_dot.svg")}
                  alt="dot"
                />
              ) : (
                <></>
              )}
              Home
            </NavLink>
          ) : (
            <></>
          )}
          {loginType === "admin" ? (
            <NavLink
              activeStyle={navActiveStyle}
              style={navInActiveStyle}
              to="/datahub/dashboard"
              onClick={() => handleSelect("dashboard")}
            >
              {isNavLinkActive("/datahub/dashboard") ? (
                <img
                  className={style.dotStyle}
                  src={require("../../Assets/Img/green_dot.svg")}
                  alt="dot"
                />
              ) : (
                <></>
              )}
              Dashboard
            </NavLink>
          ) : (
            <></>
          )}
          {loginType === "admin" ||
          loginType === "participant" ||
          loginType === "guest" ? (
            <NavLink
              activeStyle={navActiveStyle}
              style={navInActiveStyle}
              to={
                loginType === "admin"
                  ? "/datahub/new_datasets"
                  : loginType === "participant"
                  ? "/participant/new_datasets"
                  : loginType === "guest"
                  ? "/home/datasets"
                  : "/"
              }
              onClick={() => handleSelect("datasets")}
            >
              {isNavLinkActive(
                loginType === "admin"
                  ? "/datahub/new_datasets"
                  : loginType === "participant"
                  ? "/participant/new_datasets"
                  : loginType === "guest"
                  ? "/home/datasets"
                  : ""
              ) ? (
                <img
                  className={style.dotStyle}
                  src={require("../../Assets/Img/green_dot.svg")}
                  alt="dot"
                />
              ) : (
                <></>
              )}
              Datasets
            </NavLink>
          ) : (
            <></>
          )}
          {loginType === "admin" || loginType === "guest" ? (
            <NavLink
              activeStyle={navActiveStyle}
              style={navInActiveStyle}
              to={
                loginType === "admin"
                  ? "/datahub/participants"
                  : loginType === "guest"
                  ? "/home/participants"
                  : ""
              }
              onClick={() => handleSelect("participants")}
            >
              {isNavLinkActive(
                loginType === "guest"
                  ? "/home/participants"
                  : "/datahub/participants"
              ) ? (
                <img
                  className={style.dotStyle}
                  src={require("../../Assets/Img/green_dot.svg")}
                  alt="dot"
                />
              ) : (
                <></>
              )}
              Participants
            </NavLink>
          ) : (
            <></>
          )}
          {loginType === "admin" || loginType === "participant" ? (
            <NavLink
              activeStyle={navActiveStyle}
              style={navInActiveStyle}
              to={
                loginType === "admin"
                  ? "/datahub/connectors"
                  : loginType === "participant"
                  ? "/participant/connectors"
                  : ""
              }
              onClick={() => handleSelect("connectors")}
            >
              {isNavLinkActive(
                loginType === "admin"
                  ? "/datahub/connectors"
                  : loginType === "participant"
                  ? "/participant/connectors"
                  : ""
              ) ? (
                <img
                  className={style.dotStyle}
                  src={require("../../Assets/Img/green_dot.svg")}
                  alt="dot"
                />
              ) : (
                <></>
              )}
              Connectors
            </NavLink>
          ) : (
            <></>
          )}
          {loginType === "admin" ? (
            <NavLink
              activeStyle={navActiveStyle}
              style={navInActiveStyle}
              to="/datahub/support"
              onClick={() => handleSelect("support")}
            >
              {isNavLinkActive("/datahub/support") ? (
                <img
                  className={style.dotStyle}
                  src={require("../../Assets/Img/green_dot.svg")}
                  alt="dot"
                />
              ) : (
                <></>
              )}
              Support
            </NavLink>
          ) : (
            <></>
          )}
          {loginType === "admin" || loginType === "participant" ? (
            <NavLink
              activeStyle={navActiveStyle}
              style={navInActiveStyle}
              to={
                loginType === "admin"
                  ? "/datahub/settings"
                  : loginType === "participant"
                  ? "/participant/settings"
                  : ""
              }
              onClick={() => handleSelect("settings")}
            >
              {isNavLinkActive(
                loginType === "admin"
                  ? "/datahub/settings/1"
                  : loginType === "participant"
                  ? "/participant/settings"
                  : ""
              ) ? (
                <img
                  className={style.dotStyle}
                  src={require("../../Assets/Img/green_dot.svg")}
                  alt="dot"
                />
              ) : (
                <></>
              )}
              Settings
            </NavLink>
          ) : (
            <></>
          )}
          {getUserLocal() ? (
            <></>
          ) : (
            <NavLink
              to="/login"
              activeStyle={navActiveStyle}
              style={navInActiveStyle}
              onClick={() => handleSelect("login")}
            >
              {isNavLinkActive("/login") ? (
                <img
                  className={style.dotStyle}
                  src={require("../../Assets/Img/green_dot.svg")}
                  alt="dot"
                />
              ) : (
                <></>
              )}
              Login
            </NavLink>
          )}
          <Box>
            {getUserLocal() ? (
              <Button
                sx={{
                  fontFamily: "Montserrat !important",
                  fontWeight: 700,
                  fontSize: "14px",
                  width: "94px",
                  height: "34px",
                  background: "#00AB55",
                  borderRadius: "8px",
                  textTransform: "none",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#00AB55",
                    color: "#fffff",
                  },
                }}
                onClick={(e) => handleSignOut(e)}
              >
                Signout
              </Button>
            ) : (
              <Button
                sx={{
                  fontFamily: "Montserrat !important",
                  fontWeight: 700,
                  fontSize: "14px",
                  width: "94px",
                  height: "34px",
                  background: "#00AB55",
                  borderRadius: "8px",
                  textTransform: "none",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#00AB55",
                    color: "#fffff",
                  },
                }}
              >
                Register
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NavbarNew;
