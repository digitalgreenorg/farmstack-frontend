import React, { useState } from "react";
import styles from "./datasetsCategory.module.css";
import "../../../Assets/CSS/common.css";
import BarChartComponent from "./BarChart";
import { useEffect } from "react";
import labels from "../../../Constants/labels";

const DatasetsCategory = ({ allDashboardDetails }) => {
  const [barChartData, setBarChartData] = useState([]);
  useEffect(() => {
    if (allDashboardDetails) {
      setBarChartData([...allDashboardDetails]);
    }
  });
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
      <div className={styles.mainBarGraph}>
        {" "}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac tellus
        gravida, elementum magna ut, viverra purus.{" "}
      </div>
    </div>
  );
};

export default DatasetsCategory;
