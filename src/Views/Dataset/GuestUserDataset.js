import React from "react";
import DataSets from "../../Components/Datasets_New/DataSets";
import DataSetsListView from "../../Components/Datasets_New/DataSetsListView";

const GuestUserDatatsets = () => {
  return (
    <>
      <DataSets user="guest" />
      {/* <DataSetsListView /> */}
    </>
  );
};

export default GuestUserDatatsets;
