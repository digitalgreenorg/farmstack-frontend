// Creating a dashboard for app

import { Box, FormControl, NativeSelect, Typography } from "@mui/material";
import React from "react";
import localeStyle from "./dashboardNew.module.css";
import globalStyle from "../../Assets/CSS/global.module.css";
import CustomGraph from "../../Components/Graph/CustomGraph";
import CustomDashBoardTable from "../../Components/CustomDashboardTable.js/CustomDashBoardTable";

function DashboardNew() {
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
              <span>15</span>
            </div>
            <div>
              <span>Datasets</span>
              <span>15</span>
            </div>
            <div>
              <span>Connectors</span>
              <span>15</span>
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
        <CustomGraph title="Datasets by Cateogries" />
        <CustomGraph title="Datasets by Cateogries" />
        <CustomGraph title="Datasets by Cateogries" />
        <CustomDashBoardTable />
      </Box>
    </Box>
  );
}

export default DashboardNew;
