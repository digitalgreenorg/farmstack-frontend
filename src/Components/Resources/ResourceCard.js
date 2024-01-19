import { Box, Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { dateTimeFormat } from "../../Utils/Common";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArticleIcon from "@mui/icons-material/Article";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import styles from "../../Views/Resources/resources.module.css";

const cardSx = {
  maxWidth: 368,
  height: 205,
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
  const [youtube, setYoutube] = useState();
  const [file, setFile] = useState();
  const [pdf, setPdf] = useState();
  useEffect(() => {
    let youtube = item?.content_files_count.find(
      (item) => item.type === "youtube"
    );
    let file = item?.content_files_count.find((item) => item.type === "file");
    let pdf = item?.content_files_count.find((item) => item.type === "pdf");
    setYoutube(youtube);
    setFile(file);
    setPdf(pdf);
  }, []);
  return (
    <>
      <Card
        sx={cardSx}
        onClick={() =>
          history.push(handleCardClick(item?.id), {
            tab: value,
            userType: userType,
          })
        }
      >
        <Box>
          <Typography
            sx={{
              color: "#424242",
              fontFamily: "Roboto !important",
              fontSize: "20px",
              textAlign: "left",
              fontWeight: "500",
              lineHeight: "30px",
              background: "#F6F6F6",
              padding: "15px 0px 15px 28px",
            }}
          >
            {item?.title}
          </Typography>
          <Box sx={{ margin: "10px 0px 20px 20px" }}>
            <Box
              sx={{ textAlign: "left", display: "flex", alignItems: "center" }}
            >
              <img
                src={require("../../Assets/Img/organisation.svg")}
                alt="organisation"
              />
              <span style={{ marginLeft: "5px" }}>
                {item?.organization?.name}
              </span>
            </Box>
            <Box
              className="d-flex"
              sx={{ marginLeft: "-2.5px", marginTop: "20px" }}
            >
              <Box sx={{ marginRight: "16px", display: "flex" }}>
                <YouTubeIcon className="mr-7" sx={{ fill: "#424242" }} />
                <span className={styles.count_text}>
                  Videos {youtube?.count ?? 0}
                </span>
              </Box>
              <Box sx={{ display: "flex", marginRight: "16px" }}>
                <ArticleIcon className="mr-7" sx={{ fill: "#424242" }} />
                <span className={styles.count_text}>
                  Pdfs {pdf?.count ?? 0}
                </span>
              </Box>
              <Box sx={{ display: "flex" }}>
                <FileCopyIcon
                  className="mr-7"
                  sx={{ fontSize: "22px", fill: "#424242" }}
                />
                <span className={styles.count_text}>
                  Files {file?.count ?? 0}
                </span>
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <EventAvailableIcon
                sx={{ width: "18px", height: "18px", fill: "rgb(66, 66, 66)" }}
              />
              <span
                style={{
                  marginLeft: "5px",
                  color: "#637381",
                  fontFamily: "Roboto !important",
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "0px",
                  background: "#F6F6F6",
                }}
              >
                Published on:
                {item?.created_at
                  ? dateTimeFormat(item?.created_at, false)
                  : "Not Available"}
              </span>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ResourceCard;
