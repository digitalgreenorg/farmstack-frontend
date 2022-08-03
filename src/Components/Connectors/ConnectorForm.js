import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import "./ConnectorForm.css";

import Link from "@mui/material/Link";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
const connectorType = ["Provider", "Consumer"];
export default function ConnectorForm() {
  const history = useHistory();
  const [department, setdepartment] = React.useState("");
  const [project, setproject] = React.useState("");
  const [connector, setconnector] = React.useState("");
  const [connectorName, setconnectorName] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [Dataset, setDataset] = React.useState("");
  const [docker, setdocker] = React.useState("");
  const [port, setport] = React.useState("");

  const handleChangeDepartment = (event) => {
    console.log(event.target.value);
    setdepartment(event.target.value);
  };
  const handleChangeProject = (event) => {
    console.log(event.target.value);
    setproject(event.target.value);
  };
  const handleChangeConnector = (event) => {
    console.log(event.target.value);
    setconnector(event.target.value);
  };
  const handleChangeConnectorName = (event) => {
    console.log(event.target.value);
    setconnectorName(event.target.value);
  };
  const handleChangedescription = (event) => {
    console.log(event.target.value);
    setdescription(event.target.value);
  };
  const handleChangeDataset = (e) => {
    console.log(e.target.value);
    setDataset(e.target.value);
  };
  const handleChangeDocker = (e) => {
    console.log(e.target.value);
    setdocker(e.target.value);
  };
  const handleChangeport = (e) => {
    console.log(e.target.value);
    setport(e.target.value);
  };
  return (
    <Container className="connectorform">
      <Row>
        <Col className="supportViewDetailsbackimage">
          <span
            onClick={() => {
              history.push("/participant/connectors");
            }}>
            <img src={require("../../Assets/Img/Vector.svg")} alt="new" />
          </span>
          <span
            className="supportViewDetailsback"
            onClick={() => {
              history.push("/participant/connectors");
            }}>
            {"Back"}
          </span>
        </Col>
      </Row>
      <Row className="connectormainheading">
        <Col xs={12} sm={12} md={12} lg={12}>
          <span>Configure a new Connector</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6} className="link1">
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
            underline="hover">
            + Add Department
          </Link>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className="link2">
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
            underline="hover">
            + Add Project
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6} className="department">
          <FormControl variant="filled" sx={{ m: 1, width: 420 }}>
            <InputLabel id="demo-simple-select-required-label">
              Select Department *
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={department}
              onChange={handleChangeDepartment}>
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className="project">
          <FormControl variant="filled" sx={{ m: 1, width: 420 }}>
            <InputLabel id="demo-simple-select-required-label">
              Select Project *
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={project}
              onChange={handleChangeProject}>
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6} className="connector">
          <FormControl variant="filled" sx={{ m: 1, width: 420 }}>
            <InputLabel id="demo-simple-select-required-label">
              Connector Type *
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={connector}
              onChange={handleChangeConnector}>
              {connectorType.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className="Name">
          <TextField
            // style={useStyles.inputwidth}
            className="connectorName"
            id="filled-basic"
            variant="filled"
            required
            // width="100%"
            value={connectorName}
            onChange={handleChangeConnectorName}
            label="Connector Name "
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6} className="dataset">
          <FormControl variant="filled" sx={{ m: 1, width: 420 }}>
            <InputLabel id="demo-simple-select-required-label">
              Select Dataset *
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={Dataset}
              onChange={handleChangeDataset}>
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className="docker">
          <TextField
            // style={useStyles.inputwidth}
            className="dockerName"
            id="filled-basic"
            variant="filled"
            required
            // width="100%"
            value={docker}
            onChange={handleChangeDocker}
            label="Docker Image url  "
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6} className="port">
          <TextField
            // style={useStyles.inputwidth}
            className="portName"
            id="filled-basic"
            variant="filled"
            required
            type={"number"}
            // width="100%"
            value={port}
            onChange={handleChangeport}
            label="Application Port "
          />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className="description">
          <TextField
            className="descriptionName"
            label="Description"
            multiline
            rows={4}
            variant="filled"
            value={description}
            maxLength={500}
            // onKeyDown={props.handledescriptionKeydown}
            onChange={handleChangedescription}
          />
        </Col>
      </Row>
    </Container>
  );
}
