import React, { useEffect, useState } from "react";
import ControlledTabs from "../../Generic/ControlledTabs";
import TableWithFilteringForApi from "../../Table/TableWithFilteringForApi";
// import GeneratedKeyCopySystem from "./GeneratedKeyCopySystem";
import { Container } from "react-bootstrap";
import RequestForKey from "./RequestForKey";

const ApiRequest = () => {
  const [tabRenderer, setTabRenderer] = useState([
    {
      label: "List of request",
      value: 0,
      component: <TableWithFilteringForApi />,
    },
    {
      label: "Generate API",
      value: 1,
      component: <RequestForKey />,
    },
  ]);

  useEffect(() => {}, []);
  return (
    <div style={{ padding: "0px 40px" }}>
      <ControlledTabs tabRenderer={tabRenderer} />
    </div>
  );
};

export default ApiRequest;
