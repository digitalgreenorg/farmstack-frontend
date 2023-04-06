import { Button, Typography } from "@mui/material";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import CustomCard from "../../Components/Card/CustomCard";
import DatasetCart from "../../Components/DatasetCard/DatasetCard";
import LocalStyle from "./ParticipantCoStewardDetails.module.css";

const ParticipantAndCoStewardDetailsNew = (props) => {
  let datasets = [0, 0, 0, 0, 0, 0];
  return (
    <Container className={LocalStyle.container}>
      <Row>
        <Col xs={12} sm={6} md={4} xl={4} className={LocalStyle.highlitedImg}>
          <img src={require("../../Assets/Img/participant_organization.svg")} />
        </Col>
      </Row>
      <Row className={LocalStyle.section}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            // id={title + "-form-title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            Co-steward details
          </Typography>
        </Col>
        <Col
          className={LocalStyle.buttonContainer}
          xs={12}
          sm={12}
          md={6}
          xl={6}
        >
          <Button
            variant="outlined"
            className={`${GlobalStyle.outlined_button} ${LocalStyle.outlined_button}`}
          >
            Delete Participant
          </Button>
          <Button
            variant="outlined"
            className={`${GlobalStyle.outlined_button} ${LocalStyle.outlined_button}`}
          >
            Edit Participant
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Row className={LocalStyle.textRow}>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography
                className={`${GlobalStyle.bold400} ${GlobalStyle.size16} ${LocalStyle.lightText}`}
              >
                Organisation Name
              </Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                CGIAR
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>Organisation Name</Typography>
              <Typography>CGIAR</Typography>
            </Col>
          </Row>
          <Row className={LocalStyle.textRow}>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>Organisation Name</Typography>
              <Typography>CGIAR</Typography>
            </Col>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>Organisation Name</Typography>
              <Typography>CGIAR</Typography>
            </Col>
          </Row>
          <Row className={LocalStyle.textRow}>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>Organisation Name</Typography>
              <Typography>CGIAR</Typography>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={LocalStyle.section}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            // id={title + "-form-title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            Co-steward user details
          </Typography>
        </Col>
      </Row>
      <Row className={LocalStyle.textRow}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Row>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>Organisation Name</Typography>
              <Typography>CGIAR</Typography>
            </Col>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>Organisation Name</Typography>
              <Typography>CGIAR</Typography>
            </Col>
          </Row>
          <Row className={LocalStyle.textRow}>
            <Col className={GlobalStyle.padding0} xs={12} sm={12} md={6} xl={6}>
              <Typography>Organisation Name</Typography>
              <Typography>CGIAR</Typography>
            </Col>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>Organisation Name</Typography>
              <Typography>CGIAR</Typography>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className={LocalStyle.section}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            // id={title + "-form-title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            List of Datasets
          </Typography>
        </Col>
      </Row>
      <Row>
        {datasets?.map((dataset, index) => {
          return (
            <Col xs={12} sm={12} md={6} xl={4}>
              <DatasetCart />
            </Col>
          );
        })}
      </Row>
      <Row className={LocalStyle.buttonContainer}>
        <Col xs={0} sm={0} md={2} lg={4}></Col>
        <Col xs={12} sm={12} md={8} lg={4}>
          <Button
            id={"details-page-load-more-dataset-button"}
            variant="outlined"
            className={`${GlobalStyle.outlined_button} ${LocalStyle.loadMoreButton}`}
          >
            Load more
          </Button>
        </Col>
      </Row>
      {/* participants */}

      <Row className={LocalStyle.section}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            // id={title + "-form-title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            Co-steward participants
          </Typography>
        </Col>
      </Row>
      <Row>
        {datasets?.map((dataset, index) => {
          return (
            <Col xs={12} sm={12} md={6} xl={4}>
              <CustomCard />
            </Col>
          );
        })}
      </Row>
      <Row className={LocalStyle.buttonContainer}>
        <Col xs={0} sm={0} md={2} lg={4}></Col>
        <Col xs={12} sm={12} md={8} lg={4}>
          <Button
            id={"details-page-load-more-dataset-button"}
            variant="outlined"
            className={`${GlobalStyle.outlined_button} ${LocalStyle.loadMoreButton}`}
          >
            Load more
          </Button>
        </Col>
      </Row>
      <hr />
      <Row className={LocalStyle.backButtonContainer}>
        <Button
          id={"details-page-load-more-dataset-button"}
          variant="outlined"
          className={`${GlobalStyle.outlined_button} ${LocalStyle.backButton}`}
        >
          Back
        </Button>
        {/* </Col> */}
      </Row>
    </Container>
  );
};

export default ParticipantAndCoStewardDetailsNew;
