import { Button, Typography } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GlobalStyles from "../../Assets/CSS/global.module.css";
import DatasetListNew from "../../Components/Dataset/DatasetListNew";
import ParticipantsCarouselNew from "../../Components/Participants/ParticipantsCarouselNew";
import LocalStyle from "./GuestUserHomeNew.module.css";
import { useHistory } from "react-router-dom";

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                vitae tellus scelerisque, imperdiet augue id, accumsan dolor.
                Integer ac neque quis metus pretium tempus.
              </Typography>
            </div>
            <Row className={`${LocalStyle.buttonContainer}`}>
              <Button
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
                <span>Secured peer to peer data exchange</span>
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
          className={`${LocalStyle.description} ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
          tellus scelerisque, imperdiet augue id, accumsan dolor. Integer ac
          neque quis metus pretium tempus.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
              tellus scelerisque, imperdiet augue id, accumsan dolor. Integer ac
              neque quis metus pretium tempus.
            </Typography>
          </Col>
        </Row>
      </div>
      <Container>
        <div className={LocalStyle.participanttitleContainer}>
          <Typography
            className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
          >
            Our Participants are
          </Typography>
          <Typography
            className={`${LocalStyle.description} ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
            tellus scelerisque, imperdiet augue id, accumsan dolor. Integer ac
            neque quis metus pretium tempus.
          </Typography>
        </div>
        <ParticipantsCarouselNew />
        <Row className={`${LocalStyle.viewDatasetButtonContainer}`}>
          <Button
            className={`${LocalStyle.viewDatasetButton} ${GlobalStyles.primary_button}`}
            onClick={() => history.push("/home/datasets")}
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
                className={`${LocalStyle.title} ${GlobalStyles.bold500} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
              >
                Built for Creatives, by Creatives
              </Typography>
              <Typography
                className={`${LocalStyle.description} ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                vitae tellus scelerisque, imperdiet augue id, accumsan dolor.
                Integer ac neque quis metus pretium tempus.
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
                <span>Secured peer to peer data exchange</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography
              className={`${LocalStyle.title} ${LocalStyle.centeredAlignTitle} ${GlobalStyles.bold500} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
            >
              Get ready to maximise your productivity with our workflow
              solutions
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
