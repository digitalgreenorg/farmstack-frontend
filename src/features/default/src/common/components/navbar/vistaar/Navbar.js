import power_dg from "../../../../Assets/Img/power_dg.svg";
import vistaar_new_logo from "../../../../Assets/Img/vistaar_new_logo.svg";
import icar from "../../../../Assets/Img/icar.svg";
import goi from "../../../../Assets/Img/goi.svg";
import React, { useState } from "react";
import { Box, Button, Divider, useTheme } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

import {
  flushLocalstorage,
  getUserLocal,
  getTokenLocal,
  isLoggedInUserAdmin,
  isLoggedInUserParticipant,
  isLoggedInUserCoSteward,
  getRoleLocal,
} from "common/utils/utils";
import style from "./Navbar.module.css";
import PopoverNavbar from "./PopoverNavbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FarmStackContext } from "common/components/context/DefaultContext/FarmstackProvider";
import { Typography } from "antd";
import labels from "../../../../Constants/labels";
import UrlConstant from "common/constants/UrlConstants";

const Navbar = ({ loginType }) => {
  const { adminData } = React.useContext(FarmStackContext);

  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const [isSelected, setIsSelected] = useState("");

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
          location.pathname === "/datahub/new_datasets/add" ||
          location.pathname === "/datahub/dashboard-api-request/" + tempId
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
          location.pathname === "/participant/new_datasets/edit/" + tempId ||
          location.pathname === "/participant/dashboard-api-request/" + tempId
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
          location.pathname === "/datahub/connectors/edit/" + tempId ||
          location.pathname === "/home/connectors" ||
          location.pathname === "/home/connectors/view/" + tempId
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
      if (loginType === "guest") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/home/connectors" ||
          location.pathname === "/home/connectors/view/" + tempId
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
          location.pathname === "/home/resources/view/" + tempId ||
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
          // location.pathname === "/home/datasets" ||
          location.pathname === "/participant/resources/view/" + tempId ||
          // location.pathname === "/home/datasets/" + tempId ||
          location.pathname === "/participant/resources/edit/" + tempId
          ? true
          : false;
      }
      console.log("loginType", loginType);
      if (loginType === "guest") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/home/resources" ||
          location.pathname === "/home/resources/view/" + tempId
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
    if (itemName === "datasets") {
      if (loginType === "admin") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/home/datasets" ||
          location.pathname === "/home/datasets/" + tempId ||
          location.pathname === "/datahub/dashboard-api-request/" + tempId
          ? true
          : false;
      }
      if (loginType === "participant") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/home/datasets" ||
          location.pathname === "/home/datasets/" + tempId ||
          location.pathname === "/participant/dashboard-api-request/" + tempId
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
    if (itemName === "connectors") {
      if (loginType === "admin") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/home/connectors" ||
          location.pathname === "/home/connectors/view/" + tempId
          ? true
          : false;
      }
      if (loginType === "participant") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/home/connectors" ||
          location.pathname === "/home/connectors/view/" + tempId
          ? true
          : false;
      }
      if (loginType === "guest") {
        let tempId = location.pathname.slice(
          location.pathname.lastIndexOf("/") + 1
        );
        return location.pathname === "/home/connectors" ||
          location.pathname === "/home/connectors/view" + tempId
          ? true
          : false;
      }
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

  // FIX: To be removed in upcoming changes
  const isResourceActive = (itemName) => {
    if (itemName === "resources") {
      let tempId = location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1
      );
      return location.pathname === "/home/resources/view/" + tempId;
    }
  };

  return (
    <>
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
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "90px",
                padding: "0px 25px 0px 25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "73%",
                }}
              >
                <Box className="mr10">
                  <img src={goi} alt="govt of India" width={"100%"} />
                </Box>
                <Box className="mr10">
                  <Divider
                    sx={{
                      background: "#E1D0D0",
                      height: "100%",
                    }}
                    flexItem
                    orientation="vertical"
                  />
                </Box>
                <Box className="mr10">
                  <img src={icar} alt="icar" width={"100%"} />
                </Box>
                <Box className="mr10">
                  <Divider
                    sx={{
                      background: "#E1D0D0",
                      height: "100%",
                    }}
                    flexItem
                    orientation="vertical"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <img src={vistaar_new_logo} alt="HeaderLogo" width={"100%"} />
                </Box>
                <Box className="mr10">
                  <Divider
                    sx={{
                      background: "#E1D0D0",
                      height: "100%",
                    }}
                    flexItem
                    orientation="vertical"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <img src={power_dg} alt="powered by dg" width={"100%"} />{" "}
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                {getUserLocal() && loginType !== "guest" ? (
                  <></>
                ) : (
                  <Button
                    id="add-dataset-submit-btn"
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: 700,
                      fontSize: "16px",
                      width: "124px",
                      height: "40px",
                      background: "#00A94F",
                      borderRadius: "8px",
                      textTransform: "none",
                      marginLeft: "50px",
                      "&:hover": {
                        backgroundColor: "#00A94F",
                        color: "#fffff",
                      },
                    }}
                    variant="contained"
                    onClick={(e) => history.push("/login")}
                  >
                    Login
                  </Button>
                )}
                <Button
                  id="add-dataset-submit-btn"
                  sx={{
                    fontFamily: "Roboto",
                    fontWeight: 700,
                    fontSize: "16px",
                    width: "124px",
                    height: "40px",
                    background: "#00A94F",
                    borderRadius: "8px",
                    textTransform: "none",
                    marginLeft: "50px",
                    "&:hover": {
                      backgroundColor: "#00A94F",
                      color: "#fffff",
                    },
                  }}
                  variant="contained"
                  onClick={(e) =>
                    getUserLocal() && loginType !== "guest"
                      ? handleSignOut(e)
                      : history.push("/home/register")
                  }
                >
                  {getUserLocal() && loginType !== "guest"
                    ? "Sign out"
                    : "Register"}
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                background: "#00AB55",
                height: "50px",
              }}
            >
              <Typography
                className={style.new_navItem}
                onClick={() => history.push("/home")}
              >
                Home
              </Typography>
              <Typography
                className={style.new_navItem}
                onClick={() => {
                  if (loginType === "admin") {
                    history.push("/datahub/new_datasets");
                  } else if (loginType === "participant") {
                    history.push("/participant/new_datasets");
                  } else if (loginType === "guest") {
                    history.push("/home/datasets");
                  }
                }}
              >
                FLEW Registry
              </Typography>
              {(loginType === "admin" || loginType === "guest") &&
              !isLoggedInUserParticipant() ? (
                <Typography
                  className={style.new_navItem}
                  onClick={() => {
                    if (loginType === "admin") {
                      history.push("/datahub/participants");
                    } else if (loginType === "guest") {
                      history.push("/home/participants");
                    }
                  }}
                >
                  Partners
                </Typography>
              ) : (
                <></>
              )}

              <Typography
                className={style.new_navItem}
                onClick={() => {
                  if (loginType === "admin") {
                    history.push("/datahub/resources");
                  } else if (loginType === "participant") {
                    history.push("/participant/resources");
                  } else if (loginType === "guest") {
                    history.push("/home/resources");
                  }
                }}
              >
                Content
              </Typography>
              <Typography
                className={style.new_navItem}
                onClick={() => {
                  if (loginType === "admin") {
                    history.push("/datahub/bot_dashboard");
                  } else if (loginType === "participant") {
                    history.push("/participant/bot_dashboard");
                  } else if (loginType === "guest") {
                    history.push("/home/dashboard");
                  }
                }}
              >
                {labels?.en?.navbar?.Dashboard}
              </Typography>
              {loginType === "admin" || loginType === "participant" ? (
                <Typography
                  className={style.new_navItem}
                  onClick={() => {
                    if (loginType === "admin") {
                      history.push("/datahub/feedbacks");
                    } else if (loginType === "participant") {
                      history.push("/participant/feedbacks");
                    }
                  }}
                >
                  {labels?.en?.navbar?.feedbacks}
                </Typography>
              ) : (
                <></>
              )}
              {loginType === "admin" || loginType === "participant" ? (
                <Typography
                  className={style.new_navItem}
                  onClick={() => {
                    if (loginType === "admin") {
                      history.push("/datahub/settings/1");
                    } else if (loginType === "participant") {
                      history.push("/participant/settings/1");
                    }
                  }}
                >
                  {labels?.en?.navbar?.Settings}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Navbar;
