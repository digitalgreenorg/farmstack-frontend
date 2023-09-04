import {
  Box,
  Button,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import GlobalStyles from "../../Assets/CSS/global.module.css";
import DatasetListNew from "../../Components/Dataset/DatasetListNew";
import ParticipantsCarouselNew from "../../Components/Participants/ParticipantsCarouselNew";
import LocalStyle from "./GuestUserHomeNew.module.css";
import { useHistory } from "react-router-dom";

import { TypeAnimation } from "react-type-animation";
import imageFilename from "../../Assets/Img/microsite_yellow_gradient_img.svg";
import ScrollToTop from "../../Components/ScrollTop/ScrollToTop";
import Connectors from "../../Components/Connectors_New/Connectors";
import GuestUserLandingResource from "../Resources/Guest/GuestUserLandingResource";
const GuestUserHome = () => {
  let history = useHistory();
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1620,
        xxl: 2560,
      },
    },
  });
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const desktop = useMediaQuery(theme.breakpoints.up("xl"));
  const largeDesktop = useMediaQuery(theme.breakpoints.up("xxl"));

  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : "144px",
    marginRight: mobile || tablet ? "30px" : "144px",
  };
  return (
    <>
      <ScrollToTop />
      <Box
        sx={{ width: "100%" }}
        className={
          mobile || tablet ? LocalStyle.containerMd : LocalStyle.container
        }
      >
        <Row className={LocalStyle.top_row_in_home}>
          <Col xs={12} sm={12} md={12} xl={6}>
            <div
              className={`${
                mobile ? LocalStyle.titleContainerSm : LocalStyle.titleContainer
              }`}
            >
              <Typography
                className={`${LocalStyle.title} ${GlobalStyles.bold300} ${
                  mobile ? GlobalStyles.size24 : GlobalStyles.size64
                } ${GlobalStyles.highlighted_text_in_home} ${
                  mobile ? "" : LocalStyle.lineheight_78
                }`}
              >
                Explore true power of data
              </Typography>
              <Typography
                // style={{ height: "120px" }}
                className={`${LocalStyle.textDescription} ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text_in_home}`}
              >
                <b style={{ fontWeight: "bold" }}></b>
                <TypeAnimation
                  sequence={[
                    ` Revolutionary approach to data exchange in agriculture by
        fostering collaboration between organisations and harnessing the
        power of collective data.`, // Types 'Three' without deleting 'Two'
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={true}
                  style={{
                    fontSize: "20px",
                    display: "inline-block",
                    color: "white",
                    minHeight: "110px",
                  }}
                />
                <b style={{ fontWeight: "bold" }}></b>
              </Typography>
            </div>
            <Row className={LocalStyle.buttonContainer}>
              <Button
                onClick={() => history.push("/home/get-started")}
                id="home-get-started-btn"
                data-testid={"home-get-started-btn-test"}
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
                <span>Connect, Share, Discover </span>
              </Col>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point2.svg")} />
                </span>
                <span>Unlock data insights</span>
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
            {/* <img
              className={LocalStyle.micrositeLogo}
              src={require("../../Assets/Img/Farmstack V2.0/home1.svg")}
            />
            <span></span> */}
          </Col>
        </Row>

        {/* Dataset list */}
        <Box style={{ margin: "25px 144px" }}>
          <Typography
            className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
          >
            Datasets
          </Typography>
          <Typography
            className={`${LocalStyle.textDescription} text-left ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
          >
            Discover and explore the potential of data to generate ideal
            datasets with Dataset Explorer.
          </Typography>
          <DatasetListNew user={"guest"} />
        </Box>
      </Box>
      <Box
        className={
          mobile || tablet
            ? LocalStyle.container_marginMd
            : LocalStyle.container_margin
        }
      >
        <Typography
          className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
        >
          Connectors
        </Typography>
        <Typography
          className={`${LocalStyle.textDescription} text-left ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
        >
          Integrates two datasets to form a novel dataset with merged
          information.
        </Typography>
      </Box>
      <Box>
        <Connectors isGuestUser={true} />
      </Box>
      <Box sx={containerStyle}>
        <Typography
          className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text} text-left`}
        >
          Resources
        </Typography>
        <Typography
          className={`${LocalStyle.textDescription} text-left ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
        >
          Discovering resources involves identifying valuable elements like
          minerals, energy, and water in the environment. Utilizing these
          resources efficiently enhances economic development and supports
          various industries, including agriculture, manufacturing, and
          technology.
        </Typography>
        <GuestUserLandingResource user={"guest"} />
      </Box>
      <Box
        sx={{
          // backgroundImage: `url(${imageFilename})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "cover",
          position: "relative",
          background: "#00a94f",
          backgroundImage:
            "linear-gradient(to bottom,rgba(0,0,0,0) 25%,rgba(0,0,0,.6))",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flexBasis: desktop ? "20%" : "30%" }}>
            <img
              src={require("../../Assets/Img/kenya/two_home.jpg")}
              width={mobile ? "152px" : "none"}
              height={"250px"}
            />
          </Box>
          <Box
            sx={{
              display: mobile || tablet || miniLaptop ? "flex" : "flex",
              flexDirection: mobile || tablet || miniLaptop ? "column" : "row",
              alignItems: mobile ? "baseline" : "center",
              flexBasis: desktop ? "80%" : "70%",
              padding: mobile ? "20px" : "",
              justifyContent: "space-evenly",
            }}
          >
            <Typography
              className={`${LocalStyle.title} ${GlobalStyles.bold500} ${
                mobile
                  ? GlobalStyles.size12
                  : tablet || miniLaptop
                  ? GlobalStyles.size16
                  : largeDesktop
                  ? GlobalStyles.size32
                  : GlobalStyles.size32
              } ${GlobalStyles.highlighted_text_in_home} ${
                mobile
                  ? ""
                  : tablet
                  ? LocalStyle.lineheight_27
                  : LocalStyle.lineheight_39
              } ${mobile ? LocalStyle.mt45 : ""}`}
              sx={{
                width:
                  mobile || miniLaptop || desktop || largeDesktop
                    ? "auto !important"
                    : "350px !important",
                marginRight: mobile || tablet || miniLaptop ? "" : "28px",
              }}
            >
              With Data sharing great things will happen
            </Typography>
            <Typography
              className={`${
                mobile
                  ? LocalStyle.descriptionSm
                  : tablet || miniLaptop
                  ? LocalStyle.descriptionMd
                  : desktop
                  ? LocalStyle.descriptionlg
                  : largeDesktop
                  ? LocalStyle.descriptionXlg
                  : LocalStyle.description
              } ${GlobalStyles.bold400} ${
                tablet || miniLaptop ? GlobalStyles.size12 : GlobalStyles.size22
              } ${GlobalStyles.highlighted_text_in_home}`}
            >
              <b style={{ fontWeight: "bold" }}></b>
              We enable seamless data sharing, breaks down silos, and builds
              trust among organisations. The platform consolidates fragmented
              data, standardises data, and aids in better data categorization,
              enhancing its usability and value.
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
              Co-steward
            </Typography>
            <Typography
              className={`${LocalStyle.textDescription} text-left ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
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
              className={`${LocalStyle.viewDatasetButton} ${GlobalStyles.primary_button} ${GlobalStyles.homeButtonWidth}`}
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
            Participants
          </Typography>
          <Typography
            className={`${LocalStyle.textDescription} text-left ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
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
            className={`${LocalStyle.viewDatasetButton} ${GlobalStyles.primary_button} ${GlobalStyles.homeButtonWidth}`}
            onClick={() => history.push("/home/participants")}
            id="home-view-all-participants-btn-id"
          >
            View all participants
          </Button>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col xs={12} sm={12} md={12} xl={6} xxl={6}>
            <img
              className={LocalStyle.micrositeLogo}
              src={require("../../Assets/Img/kenya/third_home.jpg")}
              // style={{style}}
            />
          </Col>
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
                Foster data-driven decisions by collaborating with participants
                to seamlessly share datasets and unlock their true potential by
                integrating datasets.
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
                <span className="text-left">Strengthen Collaboration </span>
              </Col>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point2.svg")} />
                </span>
                <span className="text-left">
                  Unleash the Power of Connectors
                </span>
              </Col>
            </Row>
            <Row>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point3.svg")} />
                </span>
                <span className="text-left">Enable Use cases</span>
              </Col>
              <Col className={`${LocalStyle.pointContainer}`} xl={6}>
                <span className={LocalStyle.greenBox}>
                  <img src={require("../../Assets/Img/microsite_point4.svg")} />
                </span>
                <span className="text-left">Scale-up your impact </span>
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
            className={`${LocalStyle.primaryButton} ${LocalStyle.centeredButtonContainer} ${GlobalStyles.primary_button} ${GlobalStyles.homeButtonWidth}`}
            onClick={() => history.push("/home/get-started")}
            id="home-get-started-btn2-id"
            data-testid={"home-get-started-btn-test2"}
          >
            Get Started
          </Button>
        </Row>
      </Box>
      <Box>
        <div className={LocalStyle.image_container}>
          <img
            className={LocalStyle.image}
            src={require("../../Assets/Img/kenya/fourth_home.jpg")}
            width={"100%"}
          />
        </div>
      </Box>
    </>
  );
};

export default GuestUserHome;
