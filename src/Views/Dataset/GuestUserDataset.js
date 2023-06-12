import React from "react";
import { Col, Row } from "react-bootstrap";
import DataSets from "../../Components/Datasets_New/DataSets";
import DataSetsListView from "../../Components/Datasets_New/DataSetsListView";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const GuestUserDatatsets = () => {
  const history = useHistory();
  return (
    <div>
    
      <DataSets user="guest" />
      {/* <DataSetsListView /> */}
    </div>
  );
};

export default GuestUserDatatsets;
