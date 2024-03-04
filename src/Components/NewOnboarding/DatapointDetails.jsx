import React from "react";
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
