import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
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
  getRoleLocal,
} from "../../Utils/Common";
import style from "./Navbar_New.module.css";
import globalStyle from "../../Assets/CSS/global.module.css";
import PopoverNavbar from "./PopoverNavbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FarmStackContext } from "../Contexts/FarmStackContext";

const navActiveStyle = {
  fontFamily: "Montserrat",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "18px",
  color: "#00AB55",
  marginRight: "45px",
  textDecoration: "none",
};

const navInActiveStyle = {
  fontFamily: "Montserrat",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "18px",
  color: "#212B36",
  marginRight: "45px",
  textDecoration: "none",
};
const NavbarNew = ({ loginType }) => {
  const { adminData } = React.useContext(FarmStackContext);

  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : miniLaptop ? "50px" : "144px",
    marginRight: mobile || tablet ? "30px" : miniLaptop ? "50px" : "144px",
  };

  // const [adminData, setAdminData] = useState(null);
  const [isSelected, setIsSelected] = useState("");

  // const getAccountDetails = () => {
  //   HTTPService(
  //     "GET",
  //     UrlConstant.base_url + "microsite/admin_organization/",
  //     "",
  //     false,
  //     false
  //   )
  //     .then((response) => {
  //       setAdminData(response.data);
  //       if (!response.data?.organization?.logo) {
  //         history.push("/login");
  //       }
  //     })
  //     .catch((e) => {});
  // };

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
          location.pathname === "/home/datasets" ||
          location.pathname === "/datahub/new_datasets/view/" + tempId ||
          location.pathname === "/home/datasets/" + tempId ||
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
          location.pathname === "/home/datasets" ||
          location.pathname === "/participant/new_datasets/view/" + tempId ||
          location.pathname === "/home/datasets/" + tempId ||
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
          location.pathname === "/home/participants" ||
          location.pathname === "/home/participants/view/" + tempId ||
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
          location.pathname === "/home/participants" ||
          location.pathname === "/home/participants/view/" + tempId ||
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
    if (itemName === "resources") {
      if (loginType === "admin") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/datahub/resources" ||
          location.pathname === "/home/resources" ||
          location.pathname === "/datahub/resources/view/" + tempId ||
          location.pathname === "/home/resources/" + tempId ||
          location.pathname === "/datahub/resources/edit/" + tempId ||
          location.pathname === "/datahub/resources/add"
          ? true
          : false;
      }
      if (loginType === "participant") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/participant/resources" ||
          location.pathname === "/home/datasets" ||
          location.pathname === "/participant/resources/view/" + tempId ||
          location.pathname === "/home/datasets/" + tempId ||
          location.pathname === "/participant/resources/edit/" + tempId
          ? true
          : false;
      }
      if (loginType === "guest") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/home/resources" ||
          location.pathname === "/home/resources/" + tempId
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
        location.pathname === "/home/costeward" ||
        location.pathname === "/home/costeward/view/" + tempId ||
        location.pathname === "/datahub/costeward/edit/" + tempId
        ? true
        : false;
    }
    if (itemName === "costeward" && loginType === "guest") {
      let tempId = location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1
      );
      return location.pathname === "/home/costeward/view/" + tempId ||
        location.pathname === "/home/costeward"
        ? true
        : false;
    }
  };

  const isNavLinkActiveForHome = (itemName) => {
    if (loginType === "admin") {
      let tempId = location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1
      );
      return location.pathname === "/home/datasets" ||
        location.pathname === "/home/datasets/" + tempId
        ? true
        : false;
    }
    if (loginType === "participant") {
      let tempId = location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1
      );
      return location.pathname === "/home/datasets" ||
        location.pathname === "/home/datasets/" + tempId
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
    console.log(
      "user role on click of login is admin",
      getRoleLocal() === "datahub_admin"
    );
    setIsSelected(item);
  };
  useEffect(() => {
    // getAccountDetails();
  }, []);

  // give id to all clickble events

  return (
    <Box sx={{ width: "100vw" }} className={style.sticky}>
      {mobile || tablet ? (
        <PopoverNavbar
          history={history}
          loginType={loginType}
          isNavLinkActive={isNavLinkActive}
          style={style}
          imgUrl={
            UrlConstant.base_url_without_slash + adminData?.organization?.logo
          }
          isNavLinkActiveForDot={isNavLinkActiveForDot}
          isNavLinkActiveForCostewardDot={isNavLinkActiveForCostewardDot}
          isNavLinkActiveForHome={isNavLinkActiveForHome}
          handleSelect={handleSelect}
          handleSignOut={handleSignOut}
        />
      ) : (
        <Box
          className={`d-flex justify-content-between ${style.navbarContainer} ${globalStyle.white_background}`}
        >
          <Box
            className="d-flex justify-content-between w-100"
            sx={containerStyle}
          >
            <Box className="d-flex align-items-center">
              <img
                // src={require("../../Assets/Img/footer_logo.svg")}
                style={{
                  height: "auto",
                  maxWidth: "172px",
                  width: "auto",
                  maxHeight: "65px",
                }}
                src={
                  UrlConstant.base_url_without_slash +
                  adminData?.organization?.logo
                }
                alt="HeaderLogo"
              />
            </Box>
            <Box className="d-flex align-items-center">
              {loginType === "admin" ? (
                <NavLink
                  data-testId="navbar-dashboard-button"
                  id="navbar-new_dashboard"
                  activeStyle={
                    isNavLinkActive("/datahub/new_dashboard")
                      ? navActiveStyle
                      : navInActiveStyle
                  }
                  style={navInActiveStyle}
                  to="/datahub/new_dashboard"
                  onClick={() => handleSelect("new_dashboard")}
                >
                  {isNavLinkActive("/datahub/new_dashboard") ? (
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
              ) : loginType === "participant" ? (
                <NavLink
                  data-testId="navbar-dashboard-part-button"
                  id="navbar-new_dashboard"
                  activeStyle={
                    isNavLinkActive("/participant/new_dashboard")
                      ? navActiveStyle
                      : navInActiveStyle
                  }
                  style={navInActiveStyle}
                  to="/participant/new_dashboard"
                  onClick={() => handleSelect("new_dashboard")}
                >
                  {isNavLinkActive("/participant/new_dashboard") ? (
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
                ""
              )}
              <NavLink
                data-testId="navbar-home-button"
                id="navbar-home"
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
              {(loginType === "admin" || loginType === "guest") &&
              !isLoggedInUserParticipant() ? (
                <NavLink
                  data-testId="navbar-participants-button"
                  id="navbar-participants"
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
              {loginType === "admin" ||
              loginType === "participant" ||
              loginType === "guest" ? (
                <NavLink
                  data-testId="navbar-datasets-button"
                  id="navbar-dataset"
                  activeStyle={navActiveStyle}
                  style={
                    isNavLinkActiveForHome("datasets")
                      ? navActiveStyle
                      : navInActiveStyle
                  }
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
              {loginType === "admin" || loginType === "participant" ? (
                <NavLink
                  data-testId="navbar-connectors-button"
                  id="navbar-connectors"
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
              <NavLink
                activeStyle={navActiveStyle}
                style={navInActiveStyle}
                to={
                  loginType === "admin"
                    ? "/datahub/resources"
                    : loginType === "participant"
                    ? "/participant/resources"
                    : loginType === "guest"
                    ? "/home/resources"
                    : ""
                }
                onClick={() => handleSelect("resources")}
              >
                {isNavLinkActiveForDot("resources") ? (
                  <img
                    className={style.dotStyle}
                    src={require("../../Assets/Img/green_dot.svg")}
                    alt="dot"
                  />
                ) : (
                  <></>
                )}
                Resources
              </NavLink>

              {loginType === "admin" || loginType === "participant" ? (
                <NavLink
                  data-testId="navbar-settings-button"
                  id="navbar-settings"
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
                  data-testId="navbar-login-button"
                  id="navbar-login"
                  to={"/login"}
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
                    data-testId="navbar-signout-button"
                    id="navbar-signout"
                    sx={{
                      fontFamily: "Montserrat !important",
                      fontWeight: "700 !important",
                      fontSize: "14px !important",
                      width: "94px !important",
                      height: "34px !important",
                      background: "#00AB55 !important",
                      borderRadius: "8px !important",
                      textTransform: "none !important",
                      color: "white !important",
                      "&:hover": {
                        backgroundColor: "#00AB55 !important",
                        color: "#fffff !important",
                      },
                    }}
                    onClick={(e) => handleSignOut(e)}
                  >
                    Signout
                  </Button>
                ) : (
                  <Button
                    data-testId="navbar-register-button"
                    id="navbar-register"
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
      )}
    </Box>
  );
};

export default NavbarNew;
