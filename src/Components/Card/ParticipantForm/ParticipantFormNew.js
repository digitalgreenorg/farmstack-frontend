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
  const { title, isEditModeOn } = props;

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
              {isEditModeOn
                ? "Edit Participant organisation details"
                : "Add Participant organisation details"}
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
              {isEditModeOn
                ? "Edit Participant root user details"
                : "Add Participant root user details"}
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
