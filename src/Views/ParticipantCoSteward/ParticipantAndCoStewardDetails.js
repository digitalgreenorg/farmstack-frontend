import { Button, Typography } from "@mui/material";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import LocalStyle from "./ParticipantCoStewardDetails.module.css";

const ParticipantAndCoStewardDetails = (props) => {
  return (
    <Container className={LocalStyle.container}>
      <Row>
        <Col xs={12} sm={6} md={4} xl={4} className={LocalStyle.highlitedImg}>
          <img src={require("../../Assets/Img/participant_organization.svg")} />
        </Col>
      </Row>
      <Row>
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
      <Row>
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

      <Row>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            // id={title + "-form-title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            List of Datasets
          </Typography>
        </Col>
      </Row>
    </Container>
  );
};

export default ParticipantAndCoStewardDetails;
