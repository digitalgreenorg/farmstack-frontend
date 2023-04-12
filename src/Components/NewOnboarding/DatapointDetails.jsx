import React, { useState } from "react";
import styles from "./onboarding.module.css";
import { Button, Col, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import global_style from "../../Assets/CSS/global.module.css";
import SelectWithOption from "../Generic/SelectWithOption";
import StandardizationInOnbord from "../Standardization/StandardizationInOnbording";
const DatapointDetails = (props) => {
  const { setActiveStep } = props;

  return (
    <>
      <StandardizationInOnbord isOnborading={true} />
    </>
  );
};

export default DatapointDetails;
