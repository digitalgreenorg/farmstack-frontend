import React, { useContext, useEffect, useMemo, useState } from "react";
import TableForApiRequest from "../Datasets_New/TableForApiRequest";
import { FarmStackContext } from "../Contexts/FarmStackContext";
const TableWithFilteringForApi = (props) => {
  const { allDatasetFilesAvailableInsideTheDatasetViewed } =
    useContext(FarmStackContext);

  const [approvalStatus, setApprovalStatus] = useState(false);
  const [
    listOfAllRequestReceivedForSelectedFile,
    setListOfAllRequestReceivedForSelectedFile,
  ] = useState([]);

  useEffect(() => {
    //initial column setting once
    setListOfAllRequestReceivedForSelectedFile(
      allDatasetFilesAvailableInsideTheDatasetViewed
    );
  }, [JSON.stringify(allDatasetFilesAvailableInsideTheDatasetViewed)]);

  return (
    <>
      <TableForApiRequest
        setRefetchAllRequest={props.setRefetchAllRequest}
        refetchAllRequest={props.refetchAllRequest}
        selectedFile={props.selectedFile}
        dataForSelectedFile={allDatasetFilesAvailableInsideTheDatasetViewed}
        refetcher={props.refetcher}
        setRefetcher={props.setRefetcher}
        data={listOfAllRequestReceivedForSelectedFile}
        setApprovalStatus={setApprovalStatus}
        approvalStatus={approvalStatus}
      />
    </>
  );
};

export default TableWithFilteringForApi;
