import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataSetForm from "../../../Components/Datasets/DataSetForm";

export default function AddDataset() {
  return (
    <>
      <DataSetForm title={"Add Dataset"} />
    </>
  );
}
