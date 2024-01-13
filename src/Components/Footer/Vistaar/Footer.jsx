import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import labels from "../../../Constants/labels";
import style from "../../Footer/Footer_New.module.css";
import { useHistory } from "react-router-dom";
import { isLoggedInUserParticipant } from "../../../Utils/Common";

const Footer = ({ loginType }) => {
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        background: "#F6F7F8",
        // height: "225px",
        display: mobile ? "block" : "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          padding: mobile || tablet ? "36px 60px" : "36px 130px",
          maxWidth: "1440px",
        }}
      >
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Box className="mr10">
                <img
                  src={require("../../../Assets/Img/goi.svg")}
                  alt="govt of India"
                  width={"100%"}
                />
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
                <img
                  src={require("../../../Assets/Img/icar.svg")}
                  alt="icar"
                  width={"100%"}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginTop: "24px",
                marginLeft: "-8px",
                width: "80%",
                justifyContent: "space-around",
              }}
            >
              <Box className="mr10">
                <img
                  src={require("../../../Assets/Img/vistaar_new_logo.svg")}
                  alt="HeaderLogo"
                  width={"100%"}
                />
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
                <img
                  src={require("../../../Assets/Img/power_dg.svg")}
                  alt="powered by dg"
                  width={"100%"}
                />{" "}
              </Box>
            </Box>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={6}
            style={{
              marginTop: mobile || tablet ? "24px" : "",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginLeft: "-8px",
                flexFlow: mobile || miniLaptop ? "wrap" : "",
                gap: mobile || miniLaptop ? "5px 12px" : "",
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
            <Box
              sx={{
                color: "#424242",
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "22px",
                textAlign: "left",
                marginTop: "24px",
              }}
            >
              Developed by Digital Green along with the Ministry of Agriculture
              and ICAR, the Telegram bot 'Vistaar' provides real-time
              agricultural advisories to Extension Agents, aiming to boost farm
              productivity and innovation.
            </Box>
            <Box className={`${style.title3}`}>
              Contact:{" "}
              <span className={style.title3_link}>
                support@digitalgreen.org
              </span>
            </Box>
          </Col>
        </Row>
      </Box>
    </Box>
  );
};

export default Footer;
