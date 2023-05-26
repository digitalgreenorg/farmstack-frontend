// Creating a dashboard for app

import { Box, FormControl, NativeSelect, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import localeStyle from "./dashboardNew.module.css";
import globalStyle from "../../Assets/CSS/global.module.css";
import CustomGraph from "../../Components/Graph/CustomGraph";
import CustomDashBoardTable from "../../Components/CustomDashboardTable.js/CustomDashBoardTable";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import {
  GetErrorHandlingRoute,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import { useHistory } from "react-router-dom";
import { Chart } from "chart.js";

function DashboardNew() {
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [dashboardData, setDashboardData] = useState("");
  const [fileChart, setFileChart] = useState({
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });
  const [geographyChart, setGeographyChart] = useState({});
  const [categoryChart, setCategoryChart] = useState({});
  const [org, setOrg] = useState("my_organisation");
  const history = useHistory();
  const colors = [
    "#00AB55", // Green
    "#0BAC58", // Green
    "#16AD5B", // Green
    "#21AE5E", // Green
    "#2CAF61", // Green
    "#37B064", // Green
    "#42B167", // Green
    "#4DB26A", // Green
    // "#58B36D", // Green
    // "#63B470", // Green
    // "#6EB573", // Green
    // "#79B676", // Green
    // "#84B779", // Green
    // "#8FB87C", // Green
    // "#9AB97F", // Green
    // "#00AB55", // Green
    // "#00A950", // Green
    // "#009D4C", // Green
    // "#009248", // Green
    // "#00873F", // Green
    // "#007D3B", // Green
    // "#007636", // Green
    // "#006E31", // Green
    // "#00652D", // Green
    // "#005D28", // Green
    // "#005426", // Green
    // "#004B22", // Green
    "#00441F", // Green
    "#003D1C", // Green
    "#003619", // Green
    "#002F16", // Green
    "#002912", // Green
    "#00220F", // Green
    "#001A0C", // Green
    "#001309", // Green
    "#000C06", // Green
    "#000502", // Green
    "#000000", // Black
    "#111010", // Dark Gray
    "#191717", // Dark Gray
    "#202020", // Dark Gray
    // "#1D1D1D", // Dark Gray
    // "#1A1A1A", // Dark Gray
    // "#171717", // Dark Gray
    // "#141414", // Dark Gray
    // "#111111", // Black
    // "#1E1E1E", // Dark Gray
    "#2C303B", // Dark Blue
    "#383C4A", // Dark Blue
    "#434758", // Dark Blue
    "#4D5360", // Dark Blue
    "#575C6C", // Dark Blue
    "#616878", // Dark Blue
    "#6B7094", // Dark Blue
    "#757AAE", // Dark Blue
    "#7F85C8", // Dark Blue
    "#8990E2", // Dark Blue
    "#939BEF", // Dark Blue
    "#9DA6FC", // Dark Blue
    "#A7B1FF", // Light Blue
    "#B1BCFF", // Light Blue
    "#BBC7FF", // Light Blue
    "#C5D2FF", // Light Blue
    "#CFCDFF", // Light Blue
    "#D9D8FF", // Light Blue
    "#E3E1FF", // Light Blue
    "#EDEBFF", // Light Blue
    "#F7F6FF", // Light Blue
    "#FFF6F6", // Light Pink
    "#FFEBEB", // Light Pink
    "#FFDFDF", // Light Pink
    "#FFD3D3", // Light Pink
    "#FFC7C7", // Light Pink
    "#FFBBBB", // Light Pink
    "#FFAFAF", // Light Pink
  ];

  const backgroundColors = [
    "#FF5050", // Bright Red
    "#00FF66", // Bright Green
    "#3366FF", // Bright Blue
    "#FFFF66", // Bright Yellow
    "#FF66FF", // Bright Magenta
    "#66FFFF", // Bright Cyan
    "#FFB533", // Bright Orange
    "#AA33FF", // Bright Purple
    "#33CC33", // Bright Dark Green
    "#3366CC", // Bright Navy
    "#FFCCCC", // Bright Pink
    "#CC0000", // Bright Maroon
    "#33CCCC", // Bright Teal
    "#FFDD33", // Bright Gold
    "#C05A5A", // Bright Brown
    "#CC0000", // Bright Maroon
    "#CC9900", // Bright Olive
    "#BBDDFF", // Bright Light Blue
    "#FF8CBF", // Bright Hot Pink
    "#FFFFCC", // Bright Light Yellow
    "#99FF33", // Bright Chartreuse
    "#00CCCC", // Bright Dark Turquoise
    "#FF9999", // Bright Light Coral
    "#CC99FF", // Bright Medium Orchid
    "#55CC77", // Bright Sea Green
    "#FF9933", // Bright Chocolate
    "#FF8066", // Bright Tomato
    "#7788EE", // Bright Slate Blue
    "#FFAA00", // Bright Dark Orange
    "#D2D270", // Bright Dark Khaki
  ];

  const getDashboard = () => {
    callLoader(true);
    let url = UrlConstant.base_url + UrlConstant.new_datahub_dashboard;
    let payload = {};
    if (org != "other_organisation") {
      payload = {
        my_org: "True",
      };
    }

    HTTPService("GET", url, payload, false, true)
      .then((response) => {
        callLoader(false);
        console.log(response);
        setDashboardData(response?.data);
        formatData(response?.data);
      })
      .catch((e) => {
        callLoader(false);
        let error = GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        // console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };

  const colorShades = (hexCode, numShades) => {
    // Remove the '#' symbol if present
    const cleanHexCode = hexCode.replace("#", "");

    // Convert the hex code to RGB values
    const red = parseInt(cleanHexCode.substr(0, 2), 16);
    const green = parseInt(cleanHexCode.substr(2, 2), 16);
    const blue = parseInt(cleanHexCode.substr(4, 2), 16);

    const shades = [];

    // Calculate the step value for changing brightness/saturation
    const step = 1 / (numShades + 1);

    // Generate the shades
    for (let i = 1; i <= numShades; i++) {
      // Adjust the brightness or saturation
      const factor = i * step;
      const newRed = Math.round(red * factor);
      const newGreen = Math.round(green * factor);
      const newBlue = Math.round(blue * factor);

      // Convert the RGB values back to hexadecimal
      const newHexCode =
        "#" +
        ((1 << 24) | (newRed << 16) | (newGreen << 8) | newBlue)
          .toString(16)
          .slice(1);

      shades.push(newHexCode);
    }

    return shades;
  };

  console.log("colorShades(#00AB55)", colorShades("#00AB55", 50));

  const formatData = (dashboardData) => {
    let tmpLabels = [];
    let datasets = {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    };
    if (!dashboardData) {
      return;
    }
    if (dashboardData.dataset_file_metrics) {
      dashboardData.dataset_file_metrics.forEach((item) => {
        let size = (item?.total_size / (1024 * 1024)).toFixed(2);
        tmpLabels.push(
          `${item?.datasets__source} (${
            item?.total_size / (1024 * 1024) ? size + "mb" : "Not available"
          })`
        );
        datasets.data.push(item?.dataset_count);
      });
      datasets.backgroundColor = [
        "#36a2eb",
        "#ff6384",
        "#4bc0c0",
        "#ff9f40",
        "#9966ff",
        "#ffcd56",
        "#c9cbcf",
      ];
      datasets.hoverBackgroundColor = "#af0000";
    }
    setFileChart({
      labels: tmpLabels,
      datasets: [datasets],
    });
    console.log("data after format1", {
      labels: tmpLabels,
      datasets: [datasets],
    });
    tmpLabels = [];
    datasets = {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    };
    if (dashboardData.dataset_state_metrics) {
      dashboardData.dataset_state_metrics.forEach((item) => {
        tmpLabels.push(item?.state_name ?? "Others");
        datasets.data.push(item?.dataset_count);
      });
      datasets.backgroundColor = Chart.defaults.color.primary;
      datasets.backgroundColor = [
        "#36a2eb",
        "#ff6384",
        "#4bc0c0",
        "#ff9f40",
        "#9966ff",
        "#ffcd56",
        "#c9cbcf",
      ];
      datasets.hoverBackgroundColor = "#af0000";
    }
    setGeographyChart({
      labels: tmpLabels,
      datasets: [datasets],
    });
    tmpLabels = [];
    datasets = {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    };
    if (dashboardData?.dataset_category_metrics) {
      if (Object.keys(dashboardData?.dataset_category_metrics).length) {
        tmpLabels = Object.keys(dashboardData?.dataset_category_metrics);
        datasets = {
          data: Object.values(dashboardData?.dataset_category_metrics),
          // backgroundColor: "#d14f4f",
          backgroundColor: [
            "#36a2eb",
            "#ff6384",
            "#4bc0c0",
            "#ff9f40",
            "#9966ff",
            "#ffcd56",
            "#c9cbcf",
          ],
          hoverBackgroundColor: "#af0000",
        };
      }
    }
    setCategoryChart({
      labels: tmpLabels,
      datasets: [datasets],
    });
  };

  useEffect(() => {
    setDashboardData({});
    setCategoryChart({});
    setFileChart({});
    setGeographyChart({});
    getDashboard();
  }, [org]);
  // useEffect(() => {
  //   formatData();
  // }, [dashboardData]);
  useEffect(() => {
    // setDashboardData({});
    // setCategoryChart({});
    // setFileChart({});
    // setGeographyChart({});
    getDashboard();
  }, []);

  let logoUrl = UrlConstant.base_url + "media/" + dashboardData?.user?.logo;

  return (
    <Box className={`${localeStyle.dashboardContainer}`}>
      <Box className={`${localeStyle.basicDetailsContainer}`}>
        <div className={`${localeStyle.titleContainer}`}>
          <div
            className={`${localeStyle.title} ${globalStyle.size32}  ${globalStyle.bold700}`}
          >
            {" "}
            Hello {dashboardData?.user?.first_name}{" "}
          </div>
          <div
            className={`${localeStyle.subTitle} ${globalStyle.size20} ${globalStyle.bold500} ${localeStyle.secondaryColor}`}
          >
            Track and optimize network activities effortlessly. Gain valuable
            insights for efficient operations.
          </div>
        </div>
        <div className={`${localeStyle.userBasicDataContainer}`}>
          <div className={`${localeStyle.userBasicDataImg}`}>
            {dashboardData?.user?.org_name}
            {dashboardData?.user ? <img src={logoUrl} /> : ""}
            <div>
              <div className={`${globalStyle.size26} ${globalStyle.bold600}`}>
                {dashboardData?.user?.org_name}
              </div>
              <div
                className={`${globalStyle.size16} ${globalStyle.bold600} ${localeStyle.secondaryColor}`}
              >
                {dashboardData?.user?.first_name +
                  " " +
                  dashboardData?.user?.last_name}
              </div>
            </div>
          </div>
          <div className={`${localeStyle.userBasicData}`}>
            <div>
              <span>Participants</span>
              <span>
                {dashboardData?.total_participants?.participants_count}
              </span>
            </div>
            <div>
              <span>Datasets</span>
              <span>{dashboardData?.total_dataset_count}</span>
            </div>
            <div>
              <span>Connectors</span>
              <span>{dashboardData?.total_connectors_count}</span>
            </div>
          </div>
        </div>
      </Box>
      <Box className={`${localeStyle.myAndOtherOrgDataset}`}>
        <span
          className={`${globalStyle.size24} ${globalStyle.bold700} ${localeStyle.secondaryColor}`}
        >
          Datasets
        </span>
        {!isLoggedInUserParticipant() ? (
          <FormControl sx={{ width: "150px" }}>
            <NativeSelect
              sx={{ fontWeight: "500" }}
              defaultValue={"my_organisation"}
              onChange={(e) => setOrg(e.target.value)}
              value={org}
            >
              <option value={"my_organisation"}>My organisation</option>
              <option value={"other_organisation"}>Other organisation</option>
            </NativeSelect>
          </FormControl>
        ) : (
          ""
        )}
      </Box>
      <Box className={`${localeStyle.graphContainer}`}>
        <CustomGraph
          data={categoryChart}
          title="Datasets by Categories"
          chartType="doughnut"
        />
        <CustomGraph
          data={fileChart}
          title="Dataset by Sources"
          chartType="bar"
        />
        <CustomGraph
          data={geographyChart}
          title="Dataset by Geography"
          chartType="pie"
        />
        <CustomDashBoardTable
          recentDatasetTable={true}
          title="Recent Datasets"
          data={dashboardData.recent_datasets}
        />
      </Box>
      <Box>
        <span
          className={`${globalStyle.size24} ${globalStyle.bold700} ${localeStyle.secondaryColor}`}
        >
          Connectors
        </span>
        <div className={`${localeStyle.connectorsDataContainer}`}>
          <div
            className={`${localeStyle.connectorsData} ${localeStyle.userBasicData}`}
          >
            <div>
              <span>Total No. Of connectors</span>
              <span>{dashboardData?.total_connectors_count}</span>
            </div>
            <div>
              <span>My Datasets Integrated</span>
              <span>{dashboardData?.my_dataset_used_in_connectors}</span>
            </div>
            <div>
              <span>Others datasets Integrated</span>
              <span>{dashboardData?.other_datasets_used_in_my_connectors}</span>
            </div>
          </div>
          <div>
            <CustomDashBoardTable
              recentConnectorsTable={true}
              title="Recent Connectors"
              data={dashboardData?.recent_connectors}
            />
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default DashboardNew;
