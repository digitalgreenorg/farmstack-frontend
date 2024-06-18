import React from "react";
import LocalStyle from "../../../../Views/GuestUser/GuestUserHomeNew.module.css";
import microsite_point4 from "../../../../Assets/Img/microsite_point4.svg";
import microsite_point3 from "../../../../Assets/Img/microsite_point3.svg";
import microsite_point2 from "../../../../Assets/Img/microsite_point2.svg";
import microsite_point1 from "../../../../Assets/Img/microsite_point1.svg";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import GlobalStyles from "../../../../Assets/CSS/global.module.css";
import { useHistory } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const FirstSection = () => {
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const desktop = useMediaQuery(theme.breakpoints.up("xl"));
  const responsive_top_row = {
    padding: mobile || tablet ? "0px 10px" : "0px 0px 0px 40px",
  };
  return (
    <>
      <Box
        sx={{ width: "100%" }}
        className={
          (mobile
            ? LocalStyle.container_mobile
            : tablet
            ? LocalStyle.container_tablet
            : desktop
            ? LocalStyle.container_desktop
            : LocalStyle.container_large) + " mainBoxForGuestHome"
        }
      >
        <Row
          className={
            mobile && tablet
              ? LocalStyle.top_row_in_home_mobile
              : LocalStyle.top_row_in_home
          }
          style={responsive_top_row}
        >
          <Col xs={12} sm={12} md={12} xl={6}>
            <div
              className={`${
                mobile
                  ? LocalStyle.titleContainer_mobile
                  : tablet
                  ? LocalStyle.titleContainer_tablet
                  : LocalStyle.titleContainer
              }`}
            >
              <Typography
                className={`${LocalStyle.title} ${GlobalStyles.bold300} ${
                  mobile ? GlobalStyles.size20 : GlobalStyles.size45
                } ${GlobalStyles.highlighted_text_in_home} ${
                  mobile ? "" : LocalStyle.lineheight_50
                }`}
              >
                Ethiopia Agricultural Data Sharing Platform
              </Typography>
              <Typography
                className={`${
                  mobile || tablet
                    ? LocalStyle.textDescription_mobile
                    : LocalStyle.textDescription
                } ${GlobalStyles.bold400} ${
                  mobile ? GlobalStyles.size14 : GlobalStyles.size22
                } ${GlobalStyles.highlighted_text_in_home}`}
              >
                <b style={{ fontWeight: "bold" }}></b>
                <TypeAnimation
                  sequence={[
                    `Revolutionary approach to data exchange in agriculture by
fostering collaboration between organisations and harnessing the
power of collective data.`, // Types 'Three' without deleting 'Two'
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={true}
                  style={{
                    // fontSize: mobile ? "14px" : "20px",
                    display: "inline-block",
                    color: "white",
                    minHeight: mobile ? "110px" : "80px",
                  }}
                  className={`${
                    mobile || tablet
                      ? LocalStyle.text_with_typing_mobile
                      : LocalStyle.text_with_typing
                  }`}
                  // className={ LocalStyle.text_with_typing}
                />
                <b style={{ fontWeight: "bold" }}></b>
              </Typography>
            </div>
            <Row
              className={
                mobile
                  ? LocalStyle.buttonContainer_mobile
                  : tablet
                  ? LocalStyle.buttonContainer_tablet
                  : LocalStyle.buttonContainer
              }
            >
              <Button
                onClick={() => history.push("/home/get-started")}
                id="home-get-started-btn"
                data-testid={"home-get-started-btn-test"}
                className={`${
                  mobile || tablet
                    ? LocalStyle.primaryButton_mobile
                    : LocalStyle.primaryButton
                } ${GlobalStyles.primary_button}`}
              >
                Get Started
              </Button>
            </Row>
            <Row>
              <Col
                className={`${
                  mobile || tablet
                    ? LocalStyle.pointContainer_mobile
                    : LocalStyle.pointContainer
                }`}
                xl={6}
              >
                <span className={LocalStyle.greenBox}>
                  <img src={microsite_point1} />
                </span>
                <span
                  style={{
                    color: mobile ? "black" : tablet ? "white" : "white",
                  }}
                >
                  Connect, Share, Discover{" "}
                </span>
              </Col>
              <Col
                className={`${
                  mobile || tablet
                    ? LocalStyle.pointContainer_mobile
                    : LocalStyle.pointContainer
                }`}
                xl={6}
              >
                <span className={LocalStyle.greenBox}>
                  <img src={microsite_point2} />
                </span>
                <span
                  style={{
                    color: mobile ? "black" : tablet ? "white" : "white",
                  }}
                >
                  Unlock data insights
                </span>
              </Col>
            </Row>
            <Row>
              <Col
                className={`${
                  mobile || tablet
                    ? LocalStyle.pointContainer_mobile
                    : LocalStyle.pointContainer
                }`}
                xl={6}
              >
                <span className={LocalStyle.greenBox}>
                  <img src={microsite_point3} />
                </span>
                <span
                  style={{
                    color: mobile ? "black" : tablet ? "white" : "white",
                  }}
                >
                  Derive value from data
                </span>
              </Col>
              <Col
                className={`${
                  mobile || tablet
                    ? LocalStyle.pointContainer_mobile
                    : LocalStyle.pointContainer
                }`}
                xl={6}
              >
                <span className={LocalStyle.greenBox}>
                  <img src={microsite_point4} />
                </span>
                <span
                  style={{
                    color: mobile ? "black" : tablet ? "white" : "white",
                  }}
                >
                  Secured data exchange
                </span>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={12} xl={6}></Col>
        </Row>
      </Box>
    </>
  );
};

export default FirstSection;
