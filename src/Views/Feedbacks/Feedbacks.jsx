import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Table } from "antd";
import { dateTimeFormat, getTokenLocal, toTitleCase } from "../../Utils/Common";
import labels from "../../Constants/labels";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import StarIcon from "@mui/icons-material/Star";
import style from "./feedbacks.module.css";

const columns = [
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    width: "200px",
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
    width: "200px",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
    width: "130px",
  },
  {
    title: "User Query",
    dataIndex: "user_query",
    key: "user_query",
    width: "200px",
    ellipsis: true,
  },
  {
    title: "Translated Query",
    dataIndex: "translated_query",
    key: "translated_query",
    width: "200px",
    ellipsis: true,
  },
  {
    title: "Response",
    dataIndex: "response",
    key: "response",
    width: "200px",
    ellipsis: true,
  },
  {
    title: "Translated Response",
    dataIndex: "translated_response",
    key: "translated_response",
    width: "200px",
    ellipsis: true,
  },
  {
    title: "Message Feedback",
    dataIndex: "message_feedback",
    key: "message_feedback",
    width: "230px",
  },
  {
    title: "Video Feedback",
    dataIndex: "video_feedback",
    key: "video_feedback",
    width: "230px",
  },
  {
    title: "Video Url",
    dataIndex: "video_url",
    key: "video_url",
    width: "200px",
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
    let url = UrlConstant.base_url + UrlConstant.feedback_endpoint;
    setLoading(true);
    callLoader(true);
    HTTPService("GET", url, false, false, accessToken)
      .then((response) => {
        callLoader(false);
        setLoading(false);
        if (response?.data?.length) {
          const updatedData = response?.data.map((item) => ({
            ...item,
            video_url: (
              <a
                href={item.video_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.video_url}
              </a>
            ),
            created_at: dateTimeFormat(item.created_at, false),
            updated_at: dateTimeFormat(item.updated_at, false),
            message_feedback: (
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.message_feedback.comments} ~{" "}
                {item.message_feedback.rating}
                <StarIcon style={{ height: "18px" }} />
              </div>
            ),
            video_feedback: (
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.video_feedback.comments} ~ {item.video_feedback.rating}
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
