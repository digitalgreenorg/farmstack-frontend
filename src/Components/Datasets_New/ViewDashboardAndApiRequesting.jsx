import React, { useState } from "react";
import CustomSeparator from "../Table/BreadCrumbs";
import TopNavigationWithToggleButtons from "../Table/TopNavigationWithToggleButtons";
import { Col, Container, Row } from "react-bootstrap";
import ApiRequest from "./API's/ApiRequest";
import Dashboard from "../../Views/Pages/Dashboard";
import { Typography } from "@mui/material";
import style from "./style.module.css";
import NormalDataTable from "../Table/NormalDataTable";
const ViewDashboardAndApiRequesting = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [tabOptions, setTabOptions] = useState([
    { label: "Dashboard", value: "0", component: <Dashboard /> },
    { label: "Data table", value: "1", component: <NormalDataTable /> },
    { label: "API's", value: "2", component: <ApiRequest /> },
  ]);
  const handleTabChange = (e, state) => {
    setActiveTab(state ?? 0);
  };

  return (
    <>
      <Row style={{ margin: "0px 40px" }}>
        <Col lg={6} md={6} sm={6} xl={6}>
          <CustomSeparator currentToggle={tabOptions[activeTab ?? 0]?.label} />
        </Col>
        <Col
          lg={6}
          md={6}
          sm={6}
          xl={6}
          style={{ display: "flex", justifyContent: "end" }}
        >
          <TopNavigationWithToggleButtons
            tabOptions={tabOptions}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleTabChange={handleTabChange}
          />
        </Col>
      </Row>
      <Row style={{ margin: "0px 40px" }}>
        <Col>
          <Typography className={style.title} variant="h6">
            Farmer Profile Dataset
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} xl={12}>
          {tabOptions[activeTab ?? 0]?.component}
        </Col>
      </Row>
    </>
  );
};

export default ViewDashboardAndApiRequesting;
