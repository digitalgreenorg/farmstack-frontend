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
const SupportCard = ({date, ticketname, org, category, location,  ticketstatus}) => {
  return (
    <Card
      className="card"
      sx={cardSx}
    //   onClick={() =>
    //     history.push(handleCardClick(item?.id), { data: title, tab: value })
    //   }
    //   id={`dataset-card-view-id${title? title.split(" ")?.join("-") : item.name.split(" ")?.join("-")}`}
    >
      <div className="published">
        <img src={require("../../Assets/Img/globe.svg")} alt="globe" />
        <span className="published_text">
          Published on:{" "}
          {/* {item?.created_at ? dateTimeFormat(item?.created_at, false) : "Not Available"} */}
          {date}

        </span>
      </div>
      <div className="d_content_title">
        {/* {item?.name} */}
        {ticketname}</div>
      <div className="organisation">
        <img
          src={require("../../Assets/Img/organisation.svg")}
          alt="organisation"
        />
        <span className="organisation_text">{org}</span>
      </div>
      <div className="d_content_text">
        <div className="category">
          <img src={require("../../Assets/Img/category.svg")} alt="category" />
          <span className="category_text">
            {/* {Object.keys(item?.category).length ? (
              Object.keys(item?.category)?.length > 1 ? (
                <>
                  {Object.keys(item?.category)?.[0]}

                  <span style={{ color: "#00AB55", marginLeft: "1px" }}>
                    +{Object.keys(item?.category).length - 1}
                  </span>
                </>
              ) : (
                Object.keys(item?.category)?.[0]
              )
            ) : (
              "Not Available"
            )} */}
           {category}
          </span>
        </div>
        <div className="location">
          <img src={require("../../Assets/Img/supportName.svg")} alt="location" />
          <span className="location_text">
            {/* {item?.geography?.country?.name
              ? item?.geography?.country?.name
              : "Not Available"} */}
              {location}
          </span>
        </div>
        <div className="calendar">
          <img
            src={require("../../Assets/Img/supportStatus.svg")}
            alt="calendar"
          />
          <span className="ticket_status_text">
            {/* {item?.updated_at ? dateTimeFormat(item.updated_at, false) : "Not Available"} */}
            {ticketstatus}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SupportCard;
