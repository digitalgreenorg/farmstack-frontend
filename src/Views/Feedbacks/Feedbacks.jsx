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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const filterEnabledColumns = ["message rating"];
  const sortEnabledColumns = ["first name"];
  const [searchText, setSearchText] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [orderingBy, setOrderingBy] = useState("");
  const [isAsc, setIsAsc] = useState(true);
  const [showPagination, setShowPagination] = useState(false);

  const generateUrl = () => {
    const sanitizedOrderingBy = orderingBy ? orderingBy.replace(/ /g, "_") : "";
    const queryParams = [
      orderingBy && `ordering=${sanitizedOrderingBy}`,
      searchText && `search=${searchText}`,
      // gender && `gender=${gender}`,
      // region && `kebele__woreda__zone__region=${region}`,
      // zone && `kebele__woreda__zone=${zone}`,
      `page=${page === 0 ? 1 : page}`,
    ]
      .filter(Boolean)
      .join("&");
    return `${UrlConstant.temp_url}?${queryParams}`;
  };

  const getFeedbacks = () => {
    // let accessToken = getTokenLocal() ?? false;
    let url = generateUrl();
    callLoader(true);
    let accessToken =
      "031bb13d40c6b8c3bdc954719ad76bea57cf8d7790ebe940c0321d1cacea1f66";
    const config = {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        callLoader(false);
        if (response?.data?.results?.length) {
          let tempColumns = Object.keys(response?.data?.results?.[0]);
          const dynamicViewColumns = tempColumns
            .map((item) => item.replace(/_/g, " "))
            .filter((item) => item !== "Message ID");
          setViewColumns(dynamicViewColumns);
          const dynamicColumns = tempColumns.filter(
            (item) => item !== "Message ID"
          );
          setColumns(dynamicColumns);
          setRows(response?.data?.results);
          setPage(page + 1);
        }
      })
      .catch((err) => {
        callLoader(false);
      });
  };

  useEffect(() => {
    if (page === 1 || showPagination) {
      getFeedbacks();
    }
  }, [page]);
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
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            url={UrlConstant.temp_url}
            totalRows={totalRows}
            rows={rows}
            setRows={setRows}
            columns={columns}
            viewColumns={viewColumns}
            showSearch={false}
            showSort={true}
            showFilter={true}
            filterEnabledColumns={filterEnabledColumns}
            sortEnabledColumns={sortEnabledColumns}
            showPagination={false}
            useInfiniteScroll={true}
            searchText={searchText}
            setSearchText={setSearchText}
            orderingBy={orderingBy}
            setOrderingBy={setOrderingBy}
            isAsc={isAsc}
            setIsAsc={setIsAsc}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Feedbacks;
