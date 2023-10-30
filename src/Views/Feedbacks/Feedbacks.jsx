import React, { useContext, useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme, Divider, Button } from "@mui/material";
import { getTokenLocal, toTitleCase } from "../../Utils/Common";
import labels from "../../Constants/labels";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import UrlConstant from "../../Constants/UrlConstants";
import style from "./feedbacks.module.css";
import axios from "axios";
import DataTable from "../../Components/Table/DataTable";

const Feedbacks = () => {
  const { callLoader, callToast } = useContext(FarmStackContext);
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
          let elementsToRemove = [
            "first_name",
            "last_name",
            "phone",
            "message_date",
          ];

          let tempUpdatedColumns = tempColumns.filter(
            (item) => !elementsToRemove.includes(item)
          );
          tempUpdatedColumns.unshift(
            "first_name",
            "last_name",
            "phone",
            "message_date"
          );

          const dynamicViewColumns = tempUpdatedColumns
            .map((item) => item.replace(/_/g, " "))
            .filter((item) => item !== "message id");
          setViewColumns(dynamicViewColumns);

          const dynamicColumns = tempUpdatedColumns.filter(
            (item) => item !== "message_id"
          );
          setColumns(dynamicColumns);
          setRows(response?.data);
        }
      })
      .catch((err) => {
        callLoader(false);
      });
  };

  const exportData = async () => {
    try {
      callLoader(true);
      let baseUrl = "url";
      let accessToken = "";
      let fileName = "extension_agents.xlsx";

      const response = await fetch(baseUrl, {
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName; // specify the desired file name
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      callLoader(false);
    } catch (error) {
      console.error("Error downloading file:", error);
      callLoader(false);
      callToast(
        "error",
        "something went wrong while downloading the file!",
        true
      );
    }
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
            action={
              <Button
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "16px",
                  width: "171px",
                  height: "48px",
                  border: "none",
                  borderRadius: "8px",
                  color: "#ffffff",
                  textTransform: "none",
                  background: "#00AB55",
                  "&:hover": {
                    background: "#00AB55",
                    border: "none",
                    color: "#fffff",
                  },
                }}
                onClick={() => exportData()}
              >
                Export Data
              </Button>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Feedbacks;
