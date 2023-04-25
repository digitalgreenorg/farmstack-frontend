import { Card, Typography } from "@mui/material";
import React from "react";
import LocalStyle from "./DatasetCard.module.css";
import GlobalStyle from "../../Assets/CSS/global.module.css";

const DatasetCart = (props) => {
  const { publishDate, title, orgnisationName, geography, category, update } =
    props;
  let updatedDate = new Date(update);
  console.log("updatedDate", updatedDate);
  let currantDate = new Date();
  let monthDiff = currantDate?.getMonth() - updatedDate?.getMonth();
  let yearDiff = (currantDate?.getFullYear() - updatedDate?.getFullYear()) * 12;
  let finalMonthDiff = yearDiff + monthDiff;
  return (
    <Card className={LocalStyle.cardContainer}>
      <div className={`${LocalStyle.dateContainer} ${LocalStyle.alighCenter}`}>
        <img src={require("../../Assets/Img/globe_img.svg")} />
        <Typography
          className={`${LocalStyle.date} ${GlobalStyle.size16} ${GlobalStyle.bold400}`}
        >
          Published on: {publishDate?.split("T")[0]}
        </Typography>
      </div>
      <div>
        <div>
          <Typography
            className={`${LocalStyle.cardTitle} ${GlobalStyle.title_text} ${GlobalStyle.size24} ${GlobalStyle.bold700}`}
          >
            {title}
          </Typography>
        </div>
        <div className={LocalStyle.alighCenter}>
          <img src={require("../../Assets/Img/apartment.svg")} />
          <Typography
            className={`${LocalStyle.cardSubtitle} ${LocalStyle.orgText} ${GlobalStyle.highlighted_text} ${GlobalStyle.size16} ${GlobalStyle.bold600}`}
          >
            {orgnisationName}
          </Typography>
        </div>
      </div>
      <div className={`${LocalStyle.cardSubtitle2} ${LocalStyle.alighCenter}`}>
        <span
          className={`${LocalStyle.firstSpanTag} ${GlobalStyle.highlighted_text} ${GlobalStyle.size16} ${GlobalStyle.bold400}`}
        >
          <img src={require("../../Assets/Img/category_block_img.svg")} />
          {Object.keys(category).length
            ? category?.length > 1
              ? `${category[0]} (+${category.length - 1})`
              : category?.[0]
            : "NA"}
        </span>
        <span
          className={`${GlobalStyle.highlighted_text} ${GlobalStyle.size16} ${GlobalStyle.bold400}`}
        >
          <img src={require("../../Assets/Img/place_block.svg")} />
          {geography?.country?.name ? geography?.country?.name : "NA"}
        </span>
        <span
          className={`${GlobalStyle.highlighted_text} ${GlobalStyle.size16} ${GlobalStyle.bold400}`}
        >
          <img src={require("../../Assets/Img/calender_block.svg")} />
          {finalMonthDiff < 12
            ? `${finalMonthDiff} months old`
            : `${parseInt(finalMonthDiff)} year old`}
        </span>
      </div>
    </Card>
  );
};

export default DatasetCart;
