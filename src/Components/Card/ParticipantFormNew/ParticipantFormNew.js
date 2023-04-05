import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Typography, TextField } from "@mui/material";
import { Row, Col, Form, Button } from "react-bootstrap";
import GlobalStyle from "../../../Assets/CSS/global.module.css";
import LocalStyle from "./ParticipantForm.module.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ParticipantFormNew = (props) => {
  const { title } = props;

  const [organisationName, setOrganisationName] = useState("");
  const [organisationEmail, setOrganisationEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform form submission logic here
  };

  const validateForm = () => {
    // perform form validation logic here
  };

  return (
    <>
      <div className={LocalStyle.organisationFormContainer}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Typography
              id={title + "-form-title"}
              className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
            >
              Add Participant organisation details
            </Typography>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                className={LocalStyle.textField}
                label="Organisation Name"
                fullWidth
                required
                value={organisationName}
                onChange={(event) => setOrganisationName(event.target.value)}
              />
            </Col>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                className={LocalStyle.textField}
                label="Mail Id "
                type="email"
                fullWidth
                required
                value={organisationEmail}
                onChange={(event) => setOrganisationEmail(event.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                className={LocalStyle.textField}
                label="Website Link"
                fullWidth
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                className={LocalStyle.textField}
                label="Organisation Address "
                fullWidth
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                className={LocalStyle.textField}
                label="Country "
                fullWidth
                required
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
            </Col>
            <Col xs={12} sm={6} md={6} xl={6}>
              <TextField
                className={LocalStyle.textField}
                label="PIN Code "
                fullWidth
                required
                value={pinCode}
                onChange={(event) => setPinCode(event.target.value)}
              />
            </Col>
          </Row>
        </Form>
      </div>
      <div className={LocalStyle.organisationFormContainer}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Typography
              id={title + "-form-title"}
              className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
            >
              Add Participant root user details
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              className={LocalStyle.textField}
              label="First Name"
              fullWidth
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Col>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              className={LocalStyle.textField}
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              className={LocalStyle.textField}
              label="Country "
              fullWidth
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Col>
          <Col xs={12} sm={6} md={6} xl={6}>
            <TextField
              className={LocalStyle.textField}
              label="PIN Code "
              fullWidth
              required
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} xl={6}>
            <FormControl
              variant="outlined"
              fullWidth
              className={LocalStyle.textField}
            >
              <InputLabel id="assign-role-in-add-participants">
                Assign Role
              </InputLabel>

              <Select
                // IconComponent={
                //   <img
                //     src={
                //       <svg
                //         width="20"
                //         height="20"
                //         viewBox="0 0 20 20"
                //         fill="none"
                //         xmlns="http://www.w3.org/2000/svg"
                //       >
                //         <path
                //           d="M10.0002 12.9184C9.80552 12.9188 9.61682 12.8509 9.4669 12.7267L4.4669 8.56005C4.11251 8.2655 4.06401 7.73943 4.35856 7.38505C4.65311 7.03066 5.17918 6.98216 5.53356 7.27671L10.0002 11.01L14.4669 7.41005C14.6391 7.27024 14.8598 7.20482 15.0804 7.22828C15.3009 7.25175 15.503 7.36215 15.6419 7.53505C15.7962 7.70826 15.8713 7.93794 15.8491 8.16885C15.827 8.39975 15.7096 8.61097 15.5252 8.75171L10.5252 12.7767C10.371 12.8813 10.1861 12.9312 10.0002 12.9184Z"
                //           fill="#637381"
                //         />
                //       </svg>
                //     }
                //   />
                // }
                IconComponent={(_props) => (
                  <div style={{ position: "relative" }}>
                    <img
                      className={LocalStyle.icon}
                      src={require("../../../Assets/Img/down_arrow.svg")}
                    />
                  </div>
                )}
                labelId="Assign Role"
                id="assign-role-in-add-participants"
                // value={age}
                label="Assign Role"
                // onChange={handleChange}
              >
                <FormControlLabel
                  value="individual-organisation"
                  control={<Radio color="primary" />}
                  label="Individual Organisation"
                />
                <hr />
                <FormControlLabel
                  value="co-steward"
                  control={<Radio color="primary" />}
                  label="Co-Steward"
                />
                <hr />
                <FormControlLabel
                  value="participant"
                  control={<Radio color="primary" />}
                  label="Participant"
                />
                <hr />
              </Select>
            </FormControl>
          </Col>
        </Row>
      </div>
      {/* <br /> */}
      {/* <div className={LocalStyle.organisationFormContainer}> */}
      <Row className={LocalStyle.buttonContainer}>
        <Button
          id="add-participant-submit-button"
          // onClick={primaryButtonOnClick}
          className={`${GlobalStyle.primary_button} ${LocalStyle.primary}`}
        >
          Submit
        </Button>
        <Button
          id={"add-participant-cancel-button"}
          variant="outlined"
          className={`${GlobalStyle.outlined_button} ${LocalStyle.cancelButton}`}
        >
          Cancel
        </Button>
      </Row>
      {/* </div> */}
    </>
  );
};

export default ParticipantFormNew;
