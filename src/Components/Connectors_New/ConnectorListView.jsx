import { Box, Divider } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import style from "./Connector.module.css";
import globalStyle from "../../Assets/CSS/global.module.css";

const ConnectorListView = ({ connectors, history }) => {
  return (
    <div>
      <Box className="d-flex justify-content-between mb-20">
        <Typography
          className={`${style.listViewTitle} ${style.firstCol} w-100 text-left ml-20`}
        >
          Connector name
        </Typography>
        <Typography
          className={`${style.listViewTitle} ${style.secondCol} w-100 text-left ml-90`}
        >
          Used datasets
        </Typography>
        <Typography className={`${style.listViewTitle} w-100 text-left`}>
          Providers
        </Typography>
        <Typography
          className={`${style.listViewTitle} ${style.fourthCol} w-100 text-left`}
        >
          Published on
        </Typography>
      </Box>
      <Divider />
      {connectors?.map((item) => (
        <>
          <Box
            className="d-flex justify-content-between mb-20 mt-20 cursor-pointer"
            // onClick={() =>
            //   history.push(`/participant/new_datasets/view/${item.id}`)
            // }
          >
            <Typography
              className={`${style.listViewText} ${style.listViewName} ${globalStyle.primary_color} ${style.firstCol} w-100 text-left ml-20`}
            >
              {"Chilli farmer producer in my area"}
            </Typography>
            <Typography
              className={`${style.listViewText} ${style.secondCol} w-100 text-left ml-90`}
            >
              {"02"}
            </Typography>
            <Typography className={`${style.listViewText} w-100 text-left`}>
              {"03"}
            </Typography>
            <Typography
              className={`${style.listViewText} ${style.fourthCol} w-100 text-left`}
            >
              {"28/03/2022"}
            </Typography>
          </Box>
          <Divider />
        </>
      ))}
    </div>
  );
};

export default ConnectorListView;
