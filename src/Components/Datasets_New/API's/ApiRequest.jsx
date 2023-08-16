import React, { useEffect, useState } from "react";
import ControlledTabs from "../../Generic/ControlledTabs";
import TableWithFilteringForApi from "../../Table/TableWithFilteringForApi";
import RequestForKey from "./RequestForKey";
import { useHistory } from "react-router-dom";

const ApiRequest = (props) => {
  const history = useHistory();
  console.log(history.location?.state);
  const [tabRenderer, setTabRenderer] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (history.location?.state?.value === "my_organisation") {
      setTabRenderer([
        {
          label: "List of request",
          value: 0,
          component: TableWithFilteringForApi,
        },
        {
          label: "Generate API",
          value: 1,
          component: RequestForKey,
        },
      ]);
    } else {
      setTabRenderer([
        {
          label: "Generate API",
          value: 0,
          component: RequestForKey,
        },
      ]);
    }
  }, []);
  return (
    <div style={{ padding: "0px 40px" }}>
      <ControlledTabs
        tabRenderer={tabRenderer}
        value={value}
        handleChange={handleChange}
      />
      {tabRenderer[value] && (
        <>{React.createElement(tabRenderer[value]?.component, props)}</>
      )}
    </div>
  );
};

export default ApiRequest;
