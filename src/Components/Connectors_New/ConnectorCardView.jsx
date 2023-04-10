import React from "react";
import { Card } from "@mui/material";
import { dateTimeFormat } from "../../Utils/Common";
import style from "./Connector.module.css";
import globalStyle from "../../Assets/CSS/global.module.css";
import { Typography } from "antd";

const cardSx = {
  maxWidth: 368,
  height: 190,
  border: "1px solid #C0C7D1",
  borderRadius: "10px",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "-40px 40px 80px rgba(145, 158, 171, 0.16)",
    cursor: "pointer",
    border: "1px solid #2CD37F",
  },
};
const ConnectorCardView = ({ item }) => {
  return (
    <Card
      className="card"
      sx={cardSx}
      // onClick={() => history.push(`/participant/new_datasets/view/${item.id}`)}
    >
      <div className={style.published}>
        <img src={require("../../Assets/Img/globe.svg")} alt="globe" />
        <span className={style.publishedText}>Published on: {"23/04/23"}</span>
      </div>
      <div className={style.contentTitle}>
        {"Chilli farmer producer in my area"}
      </div>
      <div className={style.contentText}>
        <div>
          <Typography className={style.contentLightText}>
            Used datasets
          </Typography>
          <Typography className={style.contentBoldText}>02</Typography>
        </div>
        <div className={style.contentText2}>
          <Typography className={style.contentLightText}>Providers</Typography>
          <Typography className={style.contentBoldText}>03</Typography>
        </div>
      </div>
    </Card>
  );
};

export default ConnectorCardView;
