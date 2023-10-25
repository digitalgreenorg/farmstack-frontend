import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Table, Tooltip } from "antd";
import { dateTimeFormat, getTokenLocal, toTitleCase } from "../../Utils/Common";
import labels from "../../Constants/labels";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import StarIcon from "@mui/icons-material/Star";
import style from "./feedbacks.module.css";
import axios from "axios";

const columns = [
  {
    title: "Original message",
    dataIndex: "original_message",
    key: "original_message",
    width: "200px",
  },
  {
    title: "Translated message",
    dataIndex: "translated_message",
    key: "translated_message",
    width: "200px",
  },
  {
    title: "Message response",
    dataIndex: "message_response",
    key: "message_response",
    width: "220px",
    ellipsis: true,
  },
  {
    title: "Message translated response",
    dataIndex: "message_translated_response",
    key: "message_translated_response",
    width: "250px",
    ellipsis: true,
  },
  {
    title: "Resource Suggestion",
    dataIndex: "resource_string",
    key: "resource_string",
    width: "200px",
    ellipsis: true,
  },
  {
    title: "Message feedback description",
    dataIndex: "message_feedback_description",
    key: "message_feedback_description",
    width: "250px",
    ellipsis: true,
  },
  {
    title: "Message feedback tags",
    dataIndex: "message_feedback_tags",
    key: "message_feedback_tags",
    width: "200px",
    ellipsis: true,
  },
  {
    title: "Resource feedback description",
    dataIndex: "resource_feedback_description",
    key: "resource_feedback_description",
    width: "250px",
    ellipsis: true,
  },
  {
    title: "Resource feedback tags",
    dataIndex: "resource_feedback_tags",
    key: "resource_feedback_tags",
    width: "200px",
    ellipsis: true,
  },
  {
    title: "Message feedback",
    dataIndex: "message_feedback",
    key: "message_feedback",
    width: "200px",
    ellipsis: true,
  },
  {
    title: "Resource feedback",
    dataIndex: "resource_feedback",
    key: "resource_feedback",
    width: "200px",
    ellipsis: true,
  },
  {
    title: "Message feedback images",
    dataIndex: "message_feedback_images",
    key: "message_feedback_images",
    width: "250px",
    ellipsis: true,
  },
  {
    title: "Message feedback audios",
    dataIndex: "message_feedback_audios",
    key: "message_feedback_audios",
    width: "250px",
    ellipsis: true,
  },
  {
    title: "Resource feedback images",
    dataIndex: "resource_feedback_images",
    key: "resource_feedback_images",
    width: "250px",
    ellipsis: true,
  },
  {
    title: "Resource feedback audios",
    dataIndex: "resource_feedback_audios",
    key: "resource_feedback_audios",
    width: "250px",
    ellipsis: true,
  },
  {
    title: "Message rating",
    dataIndex: "message_rating",
    key: "message_rating",
    width: "200px",
    ellipsis: true,
  },
  {
    title: "Resource rating",
    dataIndex: "resource_rating",
    key: "resource_rating",
    width: "200px",
    ellipsis: true,
  },
];

const Feedbacks = () => {
  const antIcon = <CircularProgress color="inherit" />;
  const { callLoader } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 50,
      total: 100,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const getFeedbacks = () => {
    let accessToken = getTokenLocal() ?? false;
    let url = UrlConstant.feedback_bot_url;
    setLoading(true);
    callLoader(true);
    axios
      .get(UrlConstant.feedback_bot_url)
      .then((response) => {
        callLoader(false);
        setLoading(false);
        console.log(response?.data);
        if (response?.data?.length) {
          const updatedData = response?.data.map((item) => ({
            ...item,
            // video_url: (
            //   <a
            //     href={item.video_url}
            //     target="_blank"
            //     rel="noopener noreferrer"
            //   >
            //     {item.video_url}
            //   </a>
            // ),

            resource_rating: (
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.resource_rating ?? "NA"}
                <StarIcon style={{ height: "18px" }} />
              </div>
            ),
            message_rating: (
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.message_rating ?? "NA"}
                <StarIcon style={{ height: "18px" }} />
              </div>
            ),
          }));
          setData(updatedData);
        }
      })
      .catch((err) => {
        callLoader(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    getFeedbacks();
  }, []);
  return (
    <Box>
      <Box
        className={
          mobile ? "title_sm" : tablet ? "title_md mt-50" : "title mt-50"
        }
      >
        {toTitleCase(labels.renaming_modules.feedback)} Explorer
      </Box>
      <Box className={style.description}>
        Empowering field-level workers with insightful data for better community
        support and impact.
      </Box>
      <Divider />
      <Box style={{ margin: "40px 40px" }}>
        <Typography className={style.title} variant="h6">
          Feedback table
        </Typography>
        <Box className="mt-30">
          <Table
            columns={columns}
            rowKey={(record, index) => {
              return record.id ?? index;
            }}
            dataSource={data}
            pagination={false}
            loading={
              loading
                ? { size: "large", tip: "Loading", indicator: antIcon }
                : ""
            }
            onChange={handleTableChange}
            scroll={{ y: 500, x: 1200 }}
            bordered={true}
            rowClassName="row-hover" // Apply the custom row class
            size="dense"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Feedbacks;
