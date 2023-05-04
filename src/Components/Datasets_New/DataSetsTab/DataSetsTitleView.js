import React from "react";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";

const DataSetsTitleView = ({
  title,
  isGrid,
  setIsGrid,
  history,
  addDataset,
  user,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className="d-flex justify-content-between">
      <div className="bold_title">{title}</div>
      {mobile ? (
        <></>
      ) : (
        <div className="d-flex align-items-center mt-50 mb-20">
          <div
            className="d-flex mr-30 cursor-pointer"
            onClick={() => setIsGrid(false)}
          >
            <img
              className="mr-7"
              src={require(`../../../Assets/Img/${
                isGrid ? "list_view_gray.svg" : "list_view_green.svg"
              }`)}
            />
            <Typography
              sx={{
                color: !isGrid ? "#00AB55" : "#3D4A52",
              }}
            >
              List view
            </Typography>
          </div>
          <div
            className="d-flex cursor-pointer"
            onClick={() => setIsGrid(true)}
          >
            <img
              className="mr-7"
              src={require(`../../../Assets/Img/${
                isGrid ? "grid_view_green.svg" : "grid_view_gray.svg"
              }`)}
            />
            <Typography
              sx={{
                color: isGrid ? "#00AB55" : "#3D4A52",
              }}
            >
              Grid view
            </Typography>
          </div>
          {!isGrid &&
          // user != "guest" &&
          (title === "My organisation datasets" ||
            title === "Co-steward datasets") ? (
            <div className="d-flex">
              <Button
                onClick={() => history.push(addDataset())}
                sx={{
                  fontFamily: "Montserrat !important",
                  fontWeight: 700,
                  fontSize: "15px",
                  width: "149px",
                  height: "48px",
                  border: "1px solid rgba(0, 171, 85, 0.48)",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  background: "#00AB55",
                  textTransform: "none",
                  marginLeft: "52px",
                  "&:hover": {
                    background: "#00AB55",
                  },
                }}
              >
                + New dataset
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default DataSetsTitleView;
