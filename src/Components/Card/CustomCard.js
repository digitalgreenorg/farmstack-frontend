import React from "react";
import LocalStyle from "./CustomCard.module.css";
import Card from "@mui/material/Card";

const CustomCard = (props) => {
  const {
    image,
    title,
    subTitle1,
    subTitle2,
    subTitle1Value,
    subTitle2Value,
    index,
  } = props;

  return (
    <>
      <Card
        id={`${title ? title : "title"}-card-${index ? index : ""}`}
        className={LocalStyle.card}
      >
        <div className={LocalStyle.img_container}>
          <img
            id={`${title ? title : "title"}-card-img-${index ? index : ""}`}
            src={require("../../Assets/Img/participant_organization.svg")}
            alt="new"
          />
        </div>
        <div
          id={`${title ? title : "title"}-card-title-${index ? index : ""}`}
          className={LocalStyle.content_title}
        >
          International Center for Tropical Agriculture
        </div>
        <div className={LocalStyle.displayFlex}>
          <div className={LocalStyle.content_text}>
            <div
              id={`${title ? title : "subtitle1"}-card-subtitle1-${
                index ? index : ""
              }`}
              className={LocalStyle.content_text1}
            >
              Datasets
            </div>
            <div
              id={`${title ? title : "subtitle2"}-card-subtitle2-${
                index ? index : ""
              }`}
              className={LocalStyle.content_text2}
            >
              03
            </div>
          </div>
          <div className={LocalStyle.content_text}>
            <div
              id={`${title ? title : "subtitle3"}-card-subtitle3-${
                index ? index : ""
              }`}
              className={LocalStyle.content_text1}
            >
              No.of participants
            </div>
            <div
              id={`${title ? title : "subtitle4"}-card-subtitle4-${
                index ? index : ""
              }`}
              className={LocalStyle.content_text2}
            >
              03
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CustomCard;
