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
  isLoggedInUserCoSteward,
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
  const [adminData, setAdminData] = useState(null);
  const [isSelected, setIsSelected] = useState("");

  const getAccountDetails = () => {
    HTTPService(
      "GET",
      UrlConstant.base_url + "microsite/admin_organization/",
      "",
      false,
      false
    )
      .then((response) => {
        setAdminData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const isNavLinkActive = (path) => {
    return location.pathname === path ? true : false;
  };

  const isNavLinkActiveForDot = (itemName) => {
    if (itemName === "datasets") {
      if (loginType === "admin") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/datahub/new_datasets" ||
          location.pathname === "/datahub/new_datasets/view/" + tempId ||
          location.pathname === "/datahub/new_datasets/edit/" + tempId ||
          location.pathname === "/datahub/new_datasets/add"
          ? true
          : false;
      }
      if (loginType === "participant") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/participant/new_datasets" ||
          location.pathname === "/participant/new_datasets/view/" + tempId ||
          location.pathname === "/participant/new_datasets/edit/" + tempId
          ? true
          : false;
      }
      if (loginType === "guest") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/home/datasets" ||
          location.pathname === "/home/datasets/" + tempId
          ? true
          : false;
      }
    }
    if (itemName === "participants") {
      if (loginType === "admin") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/datahub/participants" ||
          location.pathname === "/datahub/participants/view/" + tempId ||
          location.pathname === "/datahub/participants/edit/" + tempId ||
          location.pathname === "/datahub/participants/view/approve/" + tempId
          ? true
          : false;
      }
      if (loginType === "participant") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/datahub/participants" ||
          location.pathname === "/datahub/participants/view/" + tempId ||
          location.pathname === "/datahub/participants/edit/" + tempId ||
          location.pathname === "/datahub/participants/view/approve/" + tempId
          ? true
          : false;
      }
      if (loginType === "guest") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/home/participants" ||
          location.pathname === "/home/participants/view/" + tempId ||
          location.pathname === "/home/participants/" + tempId
          ? true
          : false;
      }
    }
    if (itemName === "connectors") {
      if (loginType === "admin") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/datahub/connectors" ||
          location.pathname === "/datahub/connectors/edit/" + tempId
          ? true
          : false;
      }
      if (loginType === "participant") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/participant/connectors" ||
          location.pathname === "/participant/connectors/edit/" + tempId
          ? true
          : false;
      }
    }
  };

  const isNavLinkActiveForCostewardDot = (itemName) => {
    if (itemName === "costeward" && loginType !== "guest") {
      let tempId = location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1
      );
      return location.pathname === "/datahub/costeward/view/" + tempId ||
        location.pathname === "/datahub/costeward/edit/" + tempId
        ? true
        : false;
    }
    if (itemName === "costeward" && loginType === "guest") {
      let tempId = location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1
      );
      return location.pathname === "/home/costeward/view/" + tempId
        ? true
        : false;
    }
  };
  const handleParticipantLogout = (e) => {
    e.preventDefault();
    flushLocalstorage();
    history.push("/login");
  };

  const handleDatahubLogout = (e) => {
    e.preventDefault();
    flushLocalstorage();
    history.push("/login");
  };

  const handleSignOut = (e) => {
    if (
      (getTokenLocal() && isLoggedInUserAdmin()) ||
      isLoggedInUserCoSteward()
    ) {
      handleDatahubLogout(e);
    } else if (getTokenLocal() && isLoggedInUserParticipant()) {
      handleParticipantLogout(e);
    }
  };
  const handleSelect = (item) => {
    setIsSelected(item);
  };
  useEffect(() => {
    getAccountDetails();
  }, []);

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
            // src={require("../../Assets/Img/footer_logo.svg")}
            style={{ height: "auto", width: "172px", maxHeight: "65px" }}
            src={
              UrlConstant.base_url_without_slash + adminData?.organization?.logo
            }
            alt="footerLogo"
          />
        </Box>
        <Box className="d-flex align-items-center">
          <NavLink
            activeStyle={
              isNavLinkActive("/home") ? navActiveStyle : navInActiveStyle
            }
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

          {/* {loginType === "admin" ? (
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
          )} */}
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
              {isNavLinkActiveForDot("datasets") ? (
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
          {(loginType === "admin" || loginType === "guest") && !isLoggedInUserParticipant() ? (
            <NavLink
              activeStyle={navActiveStyle}
              style={
                isNavLinkActiveForCostewardDot("costeward")
                  ? navActiveStyle
                  : navInActiveStyle
              }
              to={
                loginType === "admin"
                  ? "/datahub/participants"
                  : loginType === "guest"
                  ? "/home/participants"
                  : ""
              }
              onClick={() => handleSelect("participants")}
            >
              {isNavLinkActiveForDot("participants") ||
              isNavLinkActiveForCostewardDot("costeward") ? (
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
              {isNavLinkActiveForDot("connectors") ? (
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
          {/* {loginType === "admin" ? (
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
          )} */}
          {loginType === "admin" || loginType === "participant" ? (
            <NavLink
              activeStyle={navActiveStyle}
              style={navInActiveStyle}
              to={
                loginType === "admin"
                  ? "/datahub/settings/1"
                  : loginType === "participant"
                  ? "/participant/settings/1"
                  : ""
              }
              onClick={() => handleSelect("settings")}
            >
              {isNavLinkActive(
                loginType === "admin"
                  ? "/datahub/settings/1"
                  : loginType === "participant"
                  ? "/participant/settings/1"
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
          {getUserLocal() && loginType !== "guest" ? (
            <></>
          ) : (
            <NavLink
              to={
                loginType == "guest" && getUserLocal()
                  ? "/datahub/dashboard"
                  : "/login"
              }
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
            {getUserLocal() && loginType !== "guest" ? (
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
                onClick={() => history.push("/home/register")}
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
