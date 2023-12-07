import { Box, Card } from "@mui/material";
import React from "react";
import { dateTimeFormat } from "../../Utils/Common";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArticleIcon from "@mui/icons-material/Article";
import styles from "../../Views/Resources/resources.module.css";

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
const ResourceCard = ({
  history,
  item,
  title,
  handleCardClick,
  value,
  index,
  userType,
}) => {
  return (
    <Card
      className="card"
      sx={cardSx}
      onClick={() =>
        history.push(handleCardClick(item?.id), {
          tab: value,
          userType: userType,
        })
      }
      id={`dataset-card-view-id${index}`}
      data-testid="navigate_dataset_view"
    >
      <div className="published">
        <img src={require("../../Assets/Img/globe.svg")} alt="globe" />
        <span className="published_text">
          Published on:{" "}
          {item?.created_at
            ? dateTimeFormat(item?.created_at, false)
            : "Not Available"}
        </span>
      </div>
      <div className="d_content_title">{item?.title}</div>
      <div className="organisation">
        <img
          src={require("../../Assets/Img/organisation.svg")}
          alt="organisation"
        />
        <span className="organisation_text">{item?.organization?.name}</span>
      </div>

      {/* <div className="d_content_text">
        <div className="category">
          <img src={require("../../Assets/Img/category.svg")} alt="category" />
          <span className="category_text">
            {item?.resources?.length + " files"}
          </span>
        </div>
      </div> */}
      <Box
        sx={{
          display: "flex",
          margin: "20px 20px 20px 20px",
        }}
      >
        <Box sx={{ marginRight: "16px", display: "flex" }}>
          <YouTubeIcon className="mr-7" />
          <span className={styles.count_text}>Videos {item.video_count}</span>
        </Box>
        <Box sx={{ display: "flex" }}>
          <ArticleIcon className="mr-7" />
          <span className={styles.count_text}>Pdfs {item.pdf_count}</span>
        </Box>
      </Box>
    </Card>
  );
};

export default ResourceCard;
