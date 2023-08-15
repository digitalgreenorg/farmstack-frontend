import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { dateTimeFormat } from "../../Utils/Common";

const ResourceList = ({ resources, history, title, handleCardClick }) => {
  return (
    <Box className="mt-50">
      <Box className="d-flex justify-content-between mb-20">
        <Typography className="datasets_list_view_title w-100 text-left ml-20">
          Resource name
        </Typography>
        <Typography className="datasets_list_view_title w-100 text-left ml-90">
          Organisation
        </Typography>
        <Typography className="datasets_list_view_title w-100 text-left">
          No.of files
        </Typography>
        <Typography className="datasets_list_view_title w-100 text-center">
          Published on
        </Typography>
      </Box>
      <Divider />
      {resources?.map((item) => (
        <>
          <Box
            className="d-flex justify-content-between mb-20 mt-20 cursor-pointer"
            onClick={() => history.push(handleCardClick(item?.id))}
            id={`${item?.name?.split(" ").join("-")}-dataset-list-view-card`}
          >
            <Typography className="datasets_list_view_text datasets_list_view_name green_text w-100 text-left ml-20">
              {item?.name}
            </Typography>
            <Typography className="datasets_list_view_text w-100 text-left ml-90 datasets_list_view_details_ellipsis">
              {item?.organization?.name}
            </Typography>
            <Typography className="datasets_list_view_text w-100 text-left datasets_list_view_details_ellipsis">
              {item?.files?.length}
            </Typography>
            <Typography className="datasets_list_view_text w-100 text-center">
              {item?.created_at
                ? dateTimeFormat(item?.created_at, false)
                : "NA"}
            </Typography>
          </Box>
          <Divider />
        </>
      ))}
    </Box>
  );
};

export default ResourceList;
