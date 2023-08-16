import React from "react";

import TableForRequestForApiOrDatasetFileConsumption from "./TableForRequestForApiOrDatasetFileConsumption";
const RequestCardForApprovalOrReject = (props) => {
  const { data, setApprovalStatus, approvalStatus } = props;

  return (
    <>
      <TableForRequestForApiOrDatasetFileConsumption {...props} />
    </>
  );
};

export default RequestCardForApprovalOrReject;
