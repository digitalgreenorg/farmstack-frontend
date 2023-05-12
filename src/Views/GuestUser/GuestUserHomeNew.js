import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GlobalStyles from "../../Assets/CSS/global.module.css";
import DatasetListNew from "../../Components/Dataset/DatasetListNew";
import ParticipantsCarouselNew from "../../Components/Participants/ParticipantsCarouselNew";
import LocalStyle from "./GuestUserHomeNew.module.css";
import { useHistory } from "react-router-dom";
import {
  getUserLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import { TypeAnimation } from "react-type-animation";

const GuestUserHome = () => {
  let history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : "144px",
    marginRight: mobile || tablet ? "30px" : "144px",
  };
  return (
    <>
      <Box
        className={
          mobile || tablet ? LocalStyle.containerMd : LocalStyle.container
        }
      >
        <Row>
          <Col xs={12} sm={12} md={12} xl={6}>
            <div
              className={`${
                mobile ? LocalStyle.titleContainerSm : LocalStyle.titleContainer
              }`}
            >
              <Typography
                className={`${LocalStyle.title} ${GlobalStyles.bold300} ${
                  mobile ? GlobalStyles.size24 : GlobalStyles.size64
                } ${GlobalStyles.highlighted_text} ${
                  mobile ? "" : LocalStyle.lineheight_78
                }`}
              >
                Explore true power of data
              </Typography>
              <Typography
                // style={{ height: "120px" }}
                className={`${LocalStyle.description} ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
              >
                <b style={{ fontWeight: "bold" }}></b>
                <TypeAnimation
                  sequence={[
                    ` Revolutionary approach to data exchange in agriculture by
        fostering collaboration between organisations and harnessing the
        power of collective data.`, // Types 'Three' without deleting 'Two'
                    () => {
                      console.log("Sequence completed");
                    },
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={true}
                  style={{ fontSize: "20px", display: "inline-block" }}
                />
                <b style={{ fontWeight: "bold" }}></b>
              </Typography>
            </div>
            <Row className={LocalStyle.buttonContainer}>
              <Button
                onClick={() =>
                  history.push(
                    getUserLocal() &&
                      (isLoggedInUserAdmin() || isLoggedInUserCoSteward())
                      ? "/datahub/new_datasets"
                      : getUserLocal() && isLoggedInUserParticipant()
                      ? "/participant/new_datasets"
                      : "/login"
                  )
                }
                id="home-get-started-btn"
                className={`${LocalStyle.primaryButton} ${GlobalStyles.primary_button}`}
              >
                Get Started
              </Button>
            </Row>
            <Row>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point1.svg")} />
                </span>
                <span>Orchestrate network of data </span>
              </Col>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point2.svg")} />
                </span>
                <span>Invite data providers and consumers</span>
              </Col>
            </Row>
            <Row>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point3.svg")} />
                </span>
                <span>Derive value from data</span>
              </Col>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point4.svg")} />
                </span>
                <span>Secured data exchange</span>
              </Col>
            </Row>
          </Col>

          <Col xs={12} sm={12} md={12} xl={6}>
            <img
              className={LocalStyle.micrositeLogo}
              src={require("../../Assets/Img/Farmstack V2.0/home1.svg")}
            />
            <span></span>
          </Col>
        </Row>

        {/* Dataset list */}
        <Typography
          className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
        >
          Datasets
        </Typography>
        <Typography
          className={`${LocalStyle.description} text-center ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
        >
          Discover and explore the potential of data to generate ideal datasets
          with Dataset Explorer.
        </Typography>
        <DatasetListNew user={"guest"} />
      </Box>
      <Box className={LocalStyle.gradientContainer}>
        <img
          src={require(mobile
            ? "../../Assets/Img/yellowbg.svg"
            : "../../Assets/Img/microsite_yellow_gradient_img.svg")}
          width={"100%"}
          // height={mobile ? "221px" : tablet || miniLaptop ? "334px" : "auto"}
          className={mobile || tablet || miniLaptop ? "bgMd" : "bgMd"}
        />
        <Box
          className={
            mobile
              ? LocalStyle.gradientTextContainerSm
              : tablet
              ? LocalStyle.gradientTextContainerTab
              : miniLaptop
              ? LocalStyle.gradientTextContainerMd
              : LocalStyle.gradientTextContainer
          }
        >
          <Box>
            <img
              style={{
                position: "absolute",
                top: mobile
                  ? "-44px"
                  : tablet
                  ? "-58px"
                  : miniLaptop
                  ? "-77px"
                  : "-130px",
                left: "0px",
                height: mobile
                  ? "124px"
                  : tablet
                  ? "220px"
                  : miniLaptop
                  ? "282px"
                  : "406px",
              }}
              src={require("../../Assets/Img/Farmstack V2.0/home2.svg")}
            />
          </Box>
          <Box
            className={`${
              mobile || tablet || miniLaptop ? "d-flex flex-column" : "d-flex"
            } ${mobile ? "mt-28" : ""}`}
          >
            <Typography
              className={`${LocalStyle.title} ${GlobalStyles.bold500} ${
                mobile
                  ? GlobalStyles.size12
                  : tablet || miniLaptop
                  ? GlobalStyles.size16
                  : GlobalStyles.size32
              } ${GlobalStyles.highlighted_text} ${
                tablet ? LocalStyle.lineheight_27 : LocalStyle.lineheight_39
              }`}
            >
              With Farmstack great things will happen
            </Typography>
            <Typography
              className={`${
                tablet || miniLaptop
                  ? LocalStyle.descriptionMd
                  : LocalStyle.description
              } ${GlobalStyles.bold400} ${
                tablet || miniLaptop ? GlobalStyles.size12 : GlobalStyles.size22
              } ${GlobalStyles.highlighted_text}`}
            >
              <b style={{ fontWeight: "bold" }}></b>
              Farmstack enables seamless data sharing, breaks down silos, and
              builds trust among organisations. The platform consolidates
              fragmented data, standardises data, and aids in better data
              categorization, enhancing its usability and value.
              <b style={{ fontWeight: "bold" }}></b>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box style={containerStyle}>
        <div style={{ marginTop: "50px" }}>
          <div className={LocalStyle.participanttitleContainer}>
            <Typography
              className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
            >
              Our co-steward network
            </Typography>
            <Typography
              className={`${LocalStyle.description} text-center ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
            >
              <b style={{ fontWeight: "bold" }}></b>
              Organisations who facilitate their own private network of
              participants for secured data sharing.
              <b style={{ fontWeight: "bold" }}></b>
            </Typography>
          </div>
          <ParticipantsCarouselNew
            title="Our co-steward network"
            isCosteward={true}
          />
          <Row className={`${LocalStyle.viewDatasetButtonContainer}`}>
            <Button
              className={`${LocalStyle.viewDatasetButton} ${GlobalStyles.primary_button}`}
              onClick={() => history.push("/home/costeward")}
              id="home-view-all-costeward-btn-id"
            >
              View all co-steward
            </Button>
          </Row>
        </div>
        <div className={LocalStyle.participanttitleContainer}>
          <Typography
            className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
          >
            Our Participants are
          </Typography>
          <Typography
            className={`${LocalStyle.description} text-center ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
          >
            <b style={{ fontWeight: "bold" }}></b>
            Organisations that share our vision and are committed to making a
            positive impact.
            <b style={{ fontWeight: "bold" }}></b>
          </Typography>
        </div>
        <ParticipantsCarouselNew title="Our Participants are" />
        <Row className={`${LocalStyle.viewDatasetButtonContainer}`}>
          <Button
            className={`${LocalStyle.viewDatasetButton} ${GlobalStyles.primary_button}`}
            onClick={() => history.push("/home/participants")}
            id="home-view-all-participants-btn-id"
          >
            View all participants
          </Button>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} xl={6}>
            <img
              className={LocalStyle.micrositeLogo}
              src={require("../../Assets/Img/Farmstack V2.0/home3.svg")}
            />
          </Col>
          <Col xs={12} sm={12} md={12} xl={6}>
            <div className={`${LocalStyle.titleContainer}`}>
              <Typography
                className={`${LocalStyle.lastTitle} line-height-0 text-left ${GlobalStyles.bold500} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
              >
                Elevate Your Data Exchange Platform
              </Typography>
              <Typography
                className={`${LocalStyle.description} ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
              >
                <b style={{ fontWeight: "bold" }}></b>
                Empower admins from Steward Organizations to effortlessly
                configure and manage their data exchange platform, ensuring a
                seamless and secure experience for all participants.
                <b style={{ fontWeight: "bold" }}></b>
              </Typography>
            </div>
            {/* <Row className={`${LocalStyle.buttonContainer}`}>
              <Button
                className={`${LocalStyle.primaryButton} ${GlobalStyles.primary_button}`}
              >
                Get Started
              </Button>
            </Row> */}
            <Row>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point1.svg")} />
                </span>
                <span className="text-left">
                  Empowering Agricultural Communities{" "}
                </span>
              </Col>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point2.svg")} />
                </span>
                <span className="text-left">
                  Promoting Transparency and Trust
                </span>
              </Col>
            </Row>
            <Row>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point3.svg")} />
                </span>
                <span className="text-left">Strengthening Collaboration</span>
              </Col>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point4.svg")} />
                </span>
                <span className="text-left">
                  Unleashing the Power of Data Integration Connectors
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-30">
          <Col>
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
        <Row className={`${LocalStyle.buttonContainer}`}>
          <Button
            className={`${LocalStyle.primaryButton} ${LocalStyle.centeredButtonContainer} ${GlobalStyles.primary_button}`}
            onClick={() =>
              history.push(
                getUserLocal() &&
                  (isLoggedInUserAdmin() || isLoggedInUserCoSteward())
                  ? "/datahub/new_datasets"
                  : getUserLocal() && isLoggedInUserParticipant()
                  ? "/participant/new_datasets"
                  : "/login"
              )
            }
            id="home-get-started-btn2-id"
          >
            Get Started
          </Button>
        </Row>
        <Row>
          <img
            src={require("../../Assets/Img/Farmstack V2.0/home4.svg")}
            width={"100%"}
          />
        </Row>
      </Box>
    </>
  );
};

export default GuestUserHome;
