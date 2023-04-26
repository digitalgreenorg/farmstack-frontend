import { Button, Typography } from "@mui/material";
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

const GuestUserHome = () => {
  let history = useHistory();
  return (
    <>
      <Container className={LocalStyle.container}>
        <Row>
          <Col xs={12} sm={12} md={12} xl={6}>
            <div className={`${LocalStyle.titleContainer}`}>
              <Typography
                className={`${LocalStyle.title} ${GlobalStyles.bold300} ${GlobalStyles.size64} ${GlobalStyles.highlighted_text}`}
              >
                Explore true power of data
              </Typography>
              <Typography
                className={`${LocalStyle.description} ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
              >
                <b style={{ fontWeight: "bold" }}>&ldquo;</b>
                Revolutionary approach to data exchange in agriculture by
                fostering collaboration between organisations and harnessing the
                power of collective data.
                <b style={{ fontWeight: "bold" }}>&rdquo;</b>
              </Typography>
            </div>
            <Row className={`${LocalStyle.buttonContainer}`}>
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
              src={require("../../Assets/Img/microsite_landing_img.svg")}
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
          "Discover and explore the potential of data to generate ideal datasets
          with Dataset Explorer."
        </Typography>
        <DatasetListNew user={"guest"} />
      </Container>
      <div className={LocalStyle.gradientContainer}>
        <img
          src={require("../../Assets/Img/microsite_yellow_gradient_img.svg")}
        />
        <Row className={LocalStyle.gradientTextContainer}>
          <Col sm={12} md={6}>
            <Typography
              className={`${LocalStyle.title} ${GlobalStyles.bold500} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
            >
              With Farmstack great things will happen
            </Typography>
          </Col>
          <Col sm={12} md={6}>
            <Typography
              className={`${LocalStyle.description} ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
            >
              <b style={{ fontWeight: "bold" }}>&ldquo;</b>
              Farmstack enables seamless data sharing, breaks down silos, and
              builds trust among organisations. The platform consolidates
              fragmented data, standardises data, and aids in better data
              categorization, enhancing its usability and value.
              <b style={{ fontWeight: "bold" }}>&rdquo;</b>
            </Typography>
          </Col>
        </Row>
      </div>
      <Container style={{ marginLeft: "144px", marginRight: "144px" }}>
        <div>
          <div className={LocalStyle.participanttitleContainer}>
            <Typography
              className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
            >
              Our co-steward network
            </Typography>
            <Typography
              className={`${LocalStyle.description} text-center ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
            >
              <b style={{ fontWeight: "bold" }}>&ldquo;</b>
              Organisations who facilitate their own private network of
              participants for secured data sharing.
              <b style={{ fontWeight: "bold" }}>&rdquo;</b>
            </Typography>
          </div>
          <ParticipantsCarouselNew isCosteward={true} />
          <Row className={`${LocalStyle.viewDatasetButtonContainer}`}>
            <Button
              className={`${LocalStyle.viewDatasetButton} ${GlobalStyles.primary_button}`}
              onClick={() => history.push("/home/costeward")}
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
            <b style={{ fontWeight: "bold" }}>&ldquo;</b>
            Organisations that share our vision and are committed to making a
            positive impact.
            <b style={{ fontWeight: "bold" }}>&rdquo;</b>
          </Typography>
        </div>
        <ParticipantsCarouselNew />
        <Row className={`${LocalStyle.viewDatasetButtonContainer}`}>
          <Button
            className={`${LocalStyle.viewDatasetButton} ${GlobalStyles.primary_button}`}
            onClick={() => history.push("/home/participants")}
          >
            View all participants
          </Button>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} xl={6}>
            <img
              className={LocalStyle.micrositeLogo}
              src={require("../../Assets/Img/microsite_landing_img2.svg")}
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
                <b style={{ fontWeight: "bold" }}>&ldquo;</b>
                Empower admins from Steward Organizations to effortlessly
                configure and manage their data exchange platform, ensuring a
                seamless and secure experience for all participants.
                <b style={{ fontWeight: "bold" }}>&rdquo;</b>
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
              <b style={{ fontWeight: "bold" }}>&ldquo;</b>
              Maximise impact by exploring the ultimate platform for data-driven
              solutions!
              <b style={{ fontWeight: "bold" }}>&rdquo;</b>
            </Typography>
          </Col>
        </Row>
        <Row className={`${LocalStyle.buttonContainer}`}>
          <Button
            className={`${LocalStyle.primaryButton} ${LocalStyle.centeredButtonContainer} ${GlobalStyles.primary_button}`}
          >
            Get Started
          </Button>
        </Row>
        <Row>
          <img src={require("../../Assets/Img/microsite_landing_img3.svg")} />
        </Row>
      </Container>
    </>
  );
};

export default GuestUserHome;
