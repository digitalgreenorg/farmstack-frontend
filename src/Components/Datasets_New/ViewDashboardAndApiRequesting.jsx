import React, { useState } from "react";
import CustomSeparator from "../Table/BreadCrumbs";
import TopNavigationWithToggleButtons from "../Table/TopNavigationWithToggleButtons";
import { Col, Container, Row } from "react-bootstrap";
import ApiRequest from "./API's/ApiRequest";

const ViewDashboardAndApiRequesting = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [tabOptions, setTabOptions] = useState([
    { label: "Dashboard", value: "0", component: <>DASHBOARD</> },
    { label: "Data table", value: "1", component: <>DATA TABLE</> },
    { label: "API's", value: "2", component: <ApiRequest /> },
  ]);
  const handleTabChange = (e, state) => {
    setActiveTab(state ?? 0);
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={6} md={6} sm={6} xl={6}>
            <CustomSeparator
              currentToggle={tabOptions[activeTab ?? 0]?.label}
            />
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
        <Row>
          <Col lg={12} md={12} sm={12} xl={12}>
            {tabOptions[activeTab ?? 0]?.component}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewDashboardAndApiRequesting;
