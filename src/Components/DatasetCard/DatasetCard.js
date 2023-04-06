import { Card, Typography } from "@mui/material";
import React from "react";
import LocalStyle from "./DatasetCard.module.css";
import GlobalStyle from "../../Assets/CSS/global.module.css";

const DatasetCart = (props) => {
  return (
    <Card className={LocalStyle.cardContainer}>
      <div className={`${LocalStyle.dateContainer} ${LocalStyle.alighCenter}`}>
        <img src={require("../../Assets/Img/globe_img.svg")} />
        <Typography
          className={`${LocalStyle.date} ${GlobalStyle.size16} ${GlobalStyle.bold400}`}
        >
          Published on: 28/03/2022
        </Typography>
      </div>
      <div>
        <div>
          <Typography
            className={`${LocalStyle.cardTitle} ${GlobalStyle.title_text} ${GlobalStyle.size24} ${GlobalStyle.bold700}`}
          >
            Soil parameter
          </Typography>
        </div>
        <div className={LocalStyle.alighCenter}>
          <img src={require("../../Assets/Img/apartment.svg")} />
          <Typography
            className={`${LocalStyle.cardSubtitle} ${GlobalStyle.highlighted_text} ${GlobalStyle.size16} ${GlobalStyle.bold600}`}
          >
            CGIAR
          </Typography>
        </div>
      </div>
      <div className={`${LocalStyle.cardSubtitle2} ${LocalStyle.alighCenter}`}>
        <span
          className={`${LocalStyle.firstSpanTag} ${GlobalStyle.highlighted_text} ${GlobalStyle.size16} ${GlobalStyle.bold400}`}
        >
          <img src={require("../../Assets/Img/category_block_img.svg")} />
          Wheat (+2)
        </span>
        <span
          className={`${GlobalStyle.highlighted_text} ${GlobalStyle.size16} ${GlobalStyle.bold400}`}
        >
          <img src={require("../../Assets/Img/place_block.svg")} />
          Addis
        </span>
        <span
          className={`${GlobalStyle.highlighted_text} ${GlobalStyle.size16} ${GlobalStyle.bold400}`}
        >
          <img src={require("../../Assets/Img/calender_block.svg")} />6 months
          old
        </span>
      </div>
    </Card>
  );
};

export default DatasetCart;
