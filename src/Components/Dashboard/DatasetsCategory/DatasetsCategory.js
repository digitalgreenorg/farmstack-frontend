import React, { useState } from "react";
import styles from "./datasetsCategory.module.css";
// import   "./datasetsCategory.module.css";
import "../../../Assets/CSS/common.css";
import BarChartComponent from "./BarChart";
import { useEffect } from "react";
import labels from "../../../Constants/labels";
import { Tooltip } from "@mui/material";

const DatasetsCategory = ({ allDashboardDetails }) => {
  const [barChartData, setBarChartData] = useState([]);
  useEffect(() => {
    if (allDashboardDetails) {
      setBarChartData([...allDashboardDetails]);
    }
  },[]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", padding: "20px" }}
      className="widht640andheight368pxandborderradius10andborder1pxsolidE4E4E4"
    >
      <div
        style={{
          textAlign: "left",
          marginBottom: "15px",
          color: "#3D4A52",
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        {labels.en.dashboard.dataset_category}
      </div>

      <BarChartComponent barChartData={barChartData} />
        <Tooltip title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac tellus
      gravida, elementum magna ut, viverra purus.">
      <div className={styles.mainBarGraph + " " + "text_overflow_ellipsis_overflow_hidden width600px"}>

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac tellus
        gravida, elementum magna ut, viverra purus.
        </div>
        </Tooltip>
    </div>
  );
};

export default DatasetsCategory;
