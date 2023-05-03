import { Card, Typography } from "@mui/material";
import React from "react";
import LocalStyle from "./DatasetCard.module.css";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import "../../Components/Datasets_New/DataSets.css";

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
      <div className="published">
        <img src={require("../../Assets/Img/globe_img.svg")} />
        <span className="published_text">
          Published on:{" "}
          {publishDate?.split("T")[0] ? publishDate?.split("T")[0] : "NA"}
        </span>
      </div>
      <div className="d_content_title">{title}</div>
      <div>
        <div className={LocalStyle.alighCenter}>
          <img src={require("../../Assets/Img/apartment.svg")} />
          <span className="organisation_text">{orgnisationName}</span>
        </div>
      </div>
      <div className="d_content_text">
        <div className="category">
          <img src={require("../../Assets/Img/category.svg")} alt="category" />
          <span className="category_text">
            {Object.keys(category).length
              ? category?.length > 1
                ? `${category[0]} (+${category.length - 1})`
                : category?.[0]
              : "NA"}
          </span>
        </div>
        <div className="location">
          <img src={require("../../Assets/Img/location.svg")} alt="location" />
          <span className="location_text">
            {geography?.country?.name ? geography?.country?.name : "NA"}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default DatasetCart;
