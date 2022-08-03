import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import "./ConnectorForm.css";

import Link from "@mui/material/Link";

export default function ConnectorForm() {
  const history = useHistory();
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
    </Container>
  );
}
