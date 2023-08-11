import React, { useState } from "react";
import ControlledTabs from "../../Generic/ControlledTabs";
import TableWithFilteringForApi from "../../Table/TableWithFilteringForApi";
import GeneratedKeyCopySystem from "./GeneratedKeyCopySystem";

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
      component: <GeneratedKeyCopySystem />,
    },
  ]);
  return (
    <>
      <ControlledTabs tabRenderer={tabRenderer} />
    </>
  );
};

export default ApiRequest;
