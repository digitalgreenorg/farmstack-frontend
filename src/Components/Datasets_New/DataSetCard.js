import { Card } from "@mui/material";
import React from "react";
import { dateTimeFormat } from "../../Utils/Common";

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
const DataSetCardNew = ({ history, item, title, handleCardClick, value }) => {
  return (
    <Card
      className="card"
      sx={cardSx}
      onClick={() =>
        history.push(handleCardClick(item?.id), { data: title, tab: value })
      }
    >
      <div className="published">
        <img src={require("../../Assets/Img/globe.svg")} alt="globe" />
        <span className="published_text">
          Published on:{" "}
          {item?.created_at ? dateTimeFormat(item?.created_at, false) : "NA"}
        </span>
      </div>
      <div className="d_content_title">{item?.name}</div>
      <div className="organisation">
        <img
          src={require("../../Assets/Img/organisation.svg")}
          alt="organisation"
        />
        <span className="organisation_text">{item?.organization?.name}</span>
      </div>
      <div className="d_content_text">
        <div className="category">
          <img src={require("../../Assets/Img/category.svg")} alt="category" />
          <span className="category_text">
            {Object.keys(item?.category).length ? (
              Object.keys(item?.category).length > 1 ? (
                <>
                  {Object.keys(item?.category)[0]}
                  <span style={{ color: "#00AB55" }}>
                    {" "}
                    +{String(Object.keys(item?.category).length - 1)}
                  </span>
                </>
              ) : (
                Object.keys(item?.category)[0]
              )
            ) : (
              "NA"
            )}
          </span>
        </div>
        <div className="location">
          <img src={require("../../Assets/Img/location.svg")} alt="location" />
          <span className="location_text">
            {item?.geography?.country?.name
              ? item?.geography?.country?.name
              : "NA"}
          </span>
        </div>
        <div className="calendar">
          <img
            src={require("../../Assets/Img/calendar_new.svg")}
            alt="calendar"
          />
          <span className="calendar_text">
            {item?.age_of_date ? item.age_of_date : "NA"}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default DataSetCardNew;
