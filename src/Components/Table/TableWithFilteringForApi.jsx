import React, { useEffect, useMemo, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Drawer, Dropdown, Space } from "antd";
import { Button, Checkbox } from "@mui/material";
import global_styles from "../../Assets/CSS/global.module.css";
import local_style from "./table_with_filtering_for_api.module.css";
import CloseIcon from "@mui/icons-material/Close";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
const TableWithFilteringForApi = (props) => {
  const {} = props;
  const [filterByOption, setFilterByOption] = useState("");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [isFilterSideDrawer, setIsFilterSideDrawer] = useState(false);
  const allFilters = ["pending", "approved", "rejected"];
  const [reRun, setReRun] = useState(0);
  const [filterPayload, setFilterPayload] = useState({
    pending: false,
    approved: false,
    rejected: false,
  });
  const heading = "List of requests";
  const data = [
    {
      org_name: "Tech Innovators",
      root_user_name: "admin123",
      geography: "Nairobi, Kenya",
      requested_on: "2023-01-22",
      status: "approved",
    },
    {
      org_name: "Global Solutions",
      root_user_name: "root_user87",
      geography: "Lagos, Nigeria",
      requested_on: "2023-01-23",
      status: "rejected",
    },
    {
      org_name: "InnovateNow",
      root_user_name: "innovator",
      geography: "Cape Town, South Africa",
      requested_on: "2023-01-24",
      status: "rejected",
    },
    {
      org_name: "EcoTech Collective",
      root_user_name: "greenadmin",
      geography: "Accra, Ghana",
      requested_on: "2023-01-25",
      status: "pending",
    },
    {
      org_name: "Tech Innovators",
      root_user_name: "techlead",
      geography: "Nairobi, Kenya",
      requested_on: "2023-02-01",
      status: "approved",
    },
    {
      org_name: "Digital Ventures",
      root_user_name: "digiroot",
      geography: "Johannesburg, South Africa",
      requested_on: "2023-02-02",
      status: "pending",
    },
  ];
  const getAllApiRequestList = () => {
    let method = "GET";
    let url = UrlConstant.base_url + UrlConstant.get_api_request_list;
    HTTPService(method, url, "", false, true, false)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {});
  };

  const handleFilterChange = (e, index) => {
    let key = allFilters[index];
    setFilterPayload({ ...filterPayload, [key]: e.target.checked });
    setFilterByOption(true);
    setReRun((prev) => prev + 1);
  };

  //filter function
  const filterData = () => {
    console.log(filterPayload, "filterPayload");
    if (filterByOption)
      setRows(
        data.filter((each) => {
          console.log(filterPayload[each.status], "filterPayload");
          return filterPayload[each.status];
        })
      );
    else setRows(data);
  };

  const getButtons = (status) => {
    if (status) {
      return (
        <span
          span
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <div style={{ width: "120px" }}>
            <Button
              disabled={status == "approved" ? true : false}
              className={
                status == "rejected" ? local_style.rejected : local_style.reject
              }
            >
              {status == "rejected" ? "Rejected" : "Reject"}
            </Button>
          </div>
          <div>
            <Button
              disabled={status == "rejected" ? true : false}
              className={
                status == "approved"
                  ? local_style.approved
                  : local_style.approve
              }
            >
              {status == "approved" ? "Approved" : "Approve"}
            </Button>
          </div>
        </span>
      );
    }
  };

  useEffect(() => {
    //initial column setting once
    setColumns(Object.keys(data[0]));
    getAllApiRequestList();
  }, []);
  //   heading = "List of requests";
  React.useEffect(() => {
    //setting the rows data as per filter
    filterData();
  }, [reRun]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
        className={local_style.main_table_div + " main_table_req_api"}
      >
        <div
          style={{
            fontSize: "20px",
            fontFamily: "Montserrat",
            lineHeight: "24px",
            fontWeight: "600",
          }}
        >
          {heading}
        </div>
        <div
          style={{
            border: "0.5px solid grey",
            padding: "3px 5px",
            borderRadius: "8px",
          }}
        >
          <Space
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setIsFilterSideDrawer(true)}
          >
            <FilterListIcon
              sx={{
                color: "grey !important",
              }}
              fontSize="small"
              color="grey"
            />
            Filter
          </Space>
        </div>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((eachCol, indexCol) => {
                return (
                  <TableCell
                    key={eachCol}
                    data-testid={eachCol + indexCol}
                    align="left"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {eachCol.split("_").join(" ")}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                data-testid={"eachRow" + rowIndex}
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((eachCol, index) => {
                  return (
                    <TableCell
                      key={rowIndex + "-" + index}
                      data-testid={rowIndex + "-" + index}
                      component="th"
                      scope="row"
                      align="left"
                      style={{
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                        fontWeight: "400",
                        fontSize: "16px",
                      }}
                    >
                      {eachCol == "status"
                        ? getButtons(row[eachCol])
                        : row[eachCol]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ zIndex: "100 !important" }}>
        <Drawer
          className="ant_drawer_in_req_api"
          title="Filter by"
          placement={"right"}
          width={500}
          onClose={() => setIsFilterSideDrawer(false)}
          open={isFilterSideDrawer}
          closeIcon={false}
          extra={
            <Space>
              <Button
                type="primary"
                onClick={() => setIsFilterSideDrawer(false)}
              >
                <CloseIcon sx={{ color: "grey !important" }} />
              </Button>
            </Space>
          }
        >
          <div>
            {allFilters.map((eachFilter, index) => {
              return (
                <>
                  <div
                    style={{
                      textTransform: "capitalize",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontWeight: 350,
                      fontSize: "16px",
                      lineHeight: "22px",
                    }}
                  >
                    <span>{eachFilter}</span>
                    <span>
                      <Checkbox
                        onChange={(e) => handleFilterChange(e, index)}
                        sx={{ color: "grey !important" }}
                      />{" "}
                    </span>
                  </div>

                  <hr style={{ color: "#D9DFE7" }} />
                </>
              );
            })}
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default TableWithFilteringForApi;
