import React from "react";
import LocalStyle from "./GuestUserContactNew.module.css";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const GuestUserContactNew = () => {
  return (
    <Container>
      <Row className={LocalStyle.titleContainer}>
        <div className={LocalStyle.title}>Our participants</div>
        <div className="d-flex justify-content-center">
          <div className={LocalStyle.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
            tellus scelerisque, imperdiet augue id, accumsan dolor. Integer ac
            neque quis metus pretium tempus.
          </div>
        </div>
      </Row>
      <Row className={LocalStyle.title2}>
        <Typography className={`${GlobalStyle.size24} ${GlobalStyle.bold600}`}>
          Say hello..
        </Typography>
      </Row>
      <Row>
        <Col lg={6} md={12}>
          <TextField
            id="firstName"
            label="First Name"
            placeholder="Enter your first name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
        </Col>
        <Col lg={6} md={12}>
          <TextField
            id="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={12}>
          <TextField
            id="mail"
            label="Mail ID"
            placeholder="Enter your email address"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
        </Col>
        <Col lg={6} md={12}>
          <TextField
            id="contactNumber"
            label="Contact Number"
            placeholder="Enter your phone number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
        </Col>
      </Row>
      <Row>
        <Col className={LocalStyle.radioButtonContainer} lg={12}>
          {/* <FormControl component="fieldset" margin="normal" required> */}
          {/* <FormLabel component="legend">Select an option</FormLabel> */}
          {/* <RadioGroup aria-label="contactType" name="contactType"> */}
          {/* <div> */}
          <FormControlLabel
            value="participant"
            control={<Radio />}
            label="Become a Participant (Data Provider / Consumer)"
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="Other queries (Describe your query in detail)"
          />
          {/* </div> */}
          {/* </RadioGroup>
          </FormControl> */}
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField
            id="description"
            label="Describe your query"
            placeholder="Describe your query"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            // required
            fullWidth
          />
        </Col>
      </Row>
      <Row className={LocalStyle.backButtonContainer}>
        <Button
          id={"details-page-load-more-dataset-button"}
          variant="outlined"
          className={`${GlobalStyle.primary_button} ${LocalStyle.primary_button}`}
          //   onClick={() => downloadAttachment(url)}
        >
          Submit
        </Button>
        <Button
          id={"details-page-load-more-dataset-button"}
          variant="outlined"
          className={`${GlobalStyle.outlined_button} ${LocalStyle.backButton}`}
          //   onClick={() => window.open(url, "_blank")}
        >
          Cancel
        </Button>
      </Row>
      <Row className={LocalStyle.title2}>
        <Typography className={`${GlobalStyle.size24} ${GlobalStyle.bold600}`}>
          Touch with us!
        </Typography>
      </Row>
    </Container>
  );
};

export default GuestUserContactNew;
