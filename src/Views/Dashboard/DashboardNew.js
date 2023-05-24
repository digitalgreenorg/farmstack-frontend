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
import { GetErrorHandlingRoute } from "../../Utils/Common";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const data = {
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  const cropDistributionData = {
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  const livestockDistributionData = {
    labels: ["Cattle", "Poultry", "Sheep"],
    datasets: [
      {
        data: [40, 30, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  const irrigationMethodsData = {
    labels: ["Sprinkler", "Drip", "Flood"],
    datasets: [
      {
        data: [50, 15, 35],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const getDashboard = () => {
    callLoader(true);
    let url = UrlConstant.base_url + UrlConstant.new_datahub_dashboard;
    HTTPService("GET", url, false, false, true)
      .then((response) => {
        callLoader(false);
        console.log(response);
        setDashboardData(response?.data);
        formatData();
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

  const formatData = () => {
    // labels: ["Label 1", "Label 2", "Label 3"],
    // datasets: [
    //   {
    //     data: [10, 20, 30],
    //     backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    //     hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    //   },
    // ],
    let tmpLabels = [];
    let datasets = {
      data: [],
    };
    if (!dashboardData) {
      return;
    }
    dashboardData.dataset_file_metrics.forEach((item) => {
      tmpLabels.push(item?.datasets__source);
      datasets.data.push(item?.dataset_count);
    });
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
    };
    dashboardData.dataset_state_metrics.forEach((item) => {
      tmpLabels.push(item?.state_name);
      datasets.data.push(item?.dataset_count);
    });
    setGeographyChart({
      labels: tmpLabels,
      datasets: [datasets],
    });
    tmpLabels = Object.keys(dashboardData?.dataset_category_metrics);
    datasets = [
      {
        data: Object.values(dashboardData?.dataset_category_metrics),
      },
    ];
    setCategoryChart({
      labels: tmpLabels,
      datasets: datasets,
    });
  };

  useEffect(() => {
    getDashboard();
  }, []);
  useEffect(() => {
    formatData();
  }, [dashboardData]);

  return (
    <Box className={`${localeStyle.dashboardContainer}`}>
      <Box className={`${localeStyle.basicDetailsContainer}`}>
        <div className={`${localeStyle.titleContainer}`}>
          <div
            className={`${localeStyle.title} ${globalStyle.size16}  ${globalStyle.bold700}`}
          >
            {" "}
            Hello Imran{" "}
          </div>
          <div
            classname={`${localeStyle.title} ${globalStyle.bold700} ${globalStyle.size16} ${localeStyle.secondaryColor}`}
          >
            {" "}
            Here you can track the activities of your network.{" "}
          </div>
        </div>
        <div className={`${localeStyle.userBasicDataContainer}`}>
          <div className={`${localeStyle.userBasicDataImg}`}>
            <img src={require("../../Assets/Img/empower_now.svg")} />
            <div>
              <div className={`${globalStyle.size26} ${globalStyle.bold600}`}>
                EmpowerNow
              </div>
              <div
                className={`${globalStyle.size16} ${globalStyle.bold600} ${localeStyle.secondaryColor}`}
              >
                Imran shaikh
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
        <FormControl sx={{ width: "150px" }}>
          <NativeSelect
            sx={{ fontWeight: "500" }}
            defaultValue={"my_organisation"}
          >
            <option value={"my_organisation"}>My organisation</option>
            <option value={"other_organisation"}>Other organisation</option>
          </NativeSelect>
        </FormControl>
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
          data={dashboardData.recent_connectors}
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
              data={dashboardData?.recent_datasets}
            />
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default DashboardNew;
