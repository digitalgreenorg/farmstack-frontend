import React, { useContext, useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme, Divider } from "@mui/material";
import { getTokenLocal, toTitleCase } from "../../Utils/Common";
import labels from "../../Constants/labels";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import UrlConstant from "../../Constants/UrlConstants";
import style from "./feedbacks.module.css";
import axios from "axios";
import DataTable from "../../Components/Table/DataTable";

const Feedbacks = () => {
  const { callLoader } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [viewColumns, setViewColumns] = useState([]);
  const [page, setPage] = useState(1);

  const getFeedbacks = () => {
    let accessToken = getTokenLocal() ?? false;
    let url = UrlConstant.feedback_bot_url;
    callLoader(true);
    axios
      .get(url)
      .then((response) => {
        callLoader(false);
        if (response?.data?.length) {
          let tempColumns = Object.keys(response?.data?.[0]);
          const dynamicViewColumns = tempColumns
            .map((item) => item.replace(/_/g, " "))
            .filter((item) => item !== "Message ID");
          setViewColumns(dynamicViewColumns);
          const dynamicColumns = tempColumns.filter(
            (item) => item !== "Message ID"
          );
          setColumns(dynamicColumns);
          setRows(response?.data);
        }
      })
      .catch((err) => {
        callLoader(false);
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
        <Box className="mt-30">
          <DataTable
            tableTitle={"Feedback table"}
            page={page}
            setPage={setPage}
            url={UrlConstant.feedback_bot_url}
            rows={rows}
            setRows={setRows}
            columns={columns}
            viewColumns={viewColumns}
            showSearch={false}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Feedbacks;
