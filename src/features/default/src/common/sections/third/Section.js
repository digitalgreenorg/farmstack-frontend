import React from "react";
import LocalStyle from "../../../Views/GuestUser/GuestUserHomeNew.module.css";
import GlobalStyles from "../../../Assets/CSS/global.module.css";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getTokenLocal } from "common/utils/utils";
import micro2 from "../../../Assets/Img/micro2.jpeg";
import micro2first_home from "../../../Assets/Img/kenya/first_home.jpg";
import micro_2 from "../../../Assets/Img/eadp/micro_2.jpg";
import microsite_point4 from "../../../Assets/Img/microsite_point4.svg";
import microsite_point3 from "../../../Assets/Img/microsite_point3.svg";
import microsite_point2 from "../../../Assets/Img/microsite_point2.svg";
import microsite_point1 from "../../../Assets/Img/microsite_point1.svg";
import ethmoasectionthird from "../../../Assets/Img/ethmoa/MoA_2.jpg";
const Section = () => {
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: mobile || tablet ? "10px 25px" : "0px 144px",
        }}
      >
        <Col xs={12} sm={12} md={12} xl={6} xxl={6}>
          <div className={`${LocalStyle.titleContainer}`}>
            <Typography
              className={`${LocalStyle.lastTitle} line-height-0 text-left ${GlobalStyles.bold600} ${GlobalStyles.size28} ${GlobalStyles.highlighted_text}`}
            >
              Driving Insights, Thriving Community
            </Typography>
            <Typography
              className={`${LocalStyle.textDescription} ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
            >
              <b style={{ fontWeight: "bold" }}></b>
              Foster data-driven decisions by unifying all departments and
              organisations to seamlessly share their content repository and
              unlock their true potential by delivering value.
              <b style={{ fontWeight: "bold" }}></b>
            </Typography>
          </div>
          <Row>
            <Col
              className={`${
                mobile
                  ? LocalStyle.pointContainer_mobile
                  : LocalStyle.pointContainer
              }`}
              style={{ marginLeft: tablet ? "15px" : "0px" }}
              xl={6}
            >
              <span className={LocalStyle.greenBox}>
                <img src={microsite_point1} />
              </span>
              <span className="text-left">Strengthen Collaboration </span>
            </Col>
            <Col
              className={`${
                mobile
                  ? LocalStyle.pointContainer_mobile
                  : LocalStyle.pointContainer
              }`}
              style={{ marginLeft: tablet ? "15px" : "0px" }}
              xl={6}
            >
              <span className={LocalStyle.greenBox}>
                <img src={microsite_point2} />
              </span>
              <span className="text-left">Unleash the Power of Content</span>
            </Col>
          </Row>
          <Row>
            <Col
              className={`${
                mobile
                  ? LocalStyle.pointContainer_mobile
                  : LocalStyle.pointContainer
              }`}
              style={{ marginLeft: tablet ? "15px" : "0px" }}
              xl={6}
            >
              <span className={LocalStyle.greenBox}>
                <img src={microsite_point3} />
              </span>
              <span className="text-left">
                Enable data-driven decision making
              </span>
            </Col>
            <Col
              className={`${
                mobile
                  ? LocalStyle.pointContainer_mobile
                  : LocalStyle.pointContainer
              }`}
              style={{ marginLeft: tablet ? "15px" : "0px" }}
              xl={6}
            >
              <span className={LocalStyle.greenBox}>
                <img src={microsite_point4} />
              </span>
              <span className="text-left">Scale-up your impact </span>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} xl={6} xxl={6}>
          <img
            className={
              mobile
                ? LocalStyle.micrositeLogo_mobile
                : LocalStyle.micrositeLogo
            }
            src={
              window?.ENV_VARS?.REACT_APP_INSTANCE === "EADP" ||
              process.env.REACT_APP_INSTANCE === "EADP"
                ? micro_2
                : window?.ENV_VARS?.REACT_APP_INSTANCE === "KADP" ||
                  process.env.REACT_APP_INSTANCE === "KADP"
                ? micro2first_home
                : window?.ENV_VARS?.REACT_APP_INSTANCE === "VISTAAR" ||
                  process.env.REACT_APP_INSTANCE === "VISTAAR"
                ? micro2
                : window?.ENV_VARS?.REACT_APP_INSTANCE === "ETH_MOA" ||
                  process.env.REACT_APP_INSTANCE === "ETH_MOA"
                ? ethmoasectionthird
                : micro2
            }
            loading="lazy"

            // style={{style}}
          />
        </Col>
      </Row>
      <Row className="mt-30">
        <Col style={{ margin: "25px auto" }}>
          <Typography
            className={`${LocalStyle.title} ${LocalStyle.centeredAlignTitle} ${GlobalStyles.bold500} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text} d-block`}
          >
            <b style={{ fontWeight: "bold" }}></b>
            Maximise impact by exploring the ultimate platform for data-driven
            solutions!
            <b style={{ fontWeight: "bold" }}></b>
          </Typography>
        </Col>
      </Row>
      <Row
        style={{
          margin: "50px 25px !important",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Button
          id={"details-page-load-more-dataset-button"}
          variant="outlined"
          className={`${GlobalStyles.primary_button} ${GlobalStyles.homeButtonWidth}`}
          sx={{
            padding: "15px 30px",
          }}
          onClick={() => !getTokenLocal() && history.push("/login")}
        >
          Get Started
        </Button>
      </Row>
    </>
  );
};

export default Section;
