import React from "react";
import { useState, useEffect, useContext } from "react";
import { TextField, Box } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import LocalStyle from "./Support.module.css";
import SupportTittleView from "./SupportTittleView";
import { Row, Col } from "react-bootstrap";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
} from "../../Utils/Common";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import HTTPService from "../../Services/HTTPService";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import CustomTabs from "../../Components/Tabs/Tabs";
import { useHistory } from "react-router-dom";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import UrlConstants from "../../Constants/UrlConstants";
import FilterDate from "../Filter/FilterDate";
import SupportFilterStatus from "./SupportFilterStatus";
import SupportFilterCategory from "./SupportFilterCategory";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function Support(props) {
  const [ticketList, setTicketList] = useState([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [searchTickets, setSearchTickets] = useState(null);
  const { callLoader, callToast } = useContext(FarmStackContext);
  const history = useHistory();
  const [ListOfTickets, setlistOfTickets] = useState([]);
  const [tabValue, setTabValue] = useState(
    parseInt(localStorage.getItem("supportTicketsTabValue")) || 0
  );
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [type, setType] = useState("");
  const [dates, setDates] = useState([{ fromDate: null, toDate: null }]);
  const [updater, setUpdate] = useState(0);
  let [tabLabels, setTabLabels] = useState(
    isLoggedInUserAdmin()
      ? ["Costeward tickets", "Other tickets"]
      : ["My tickets", "My network tickets"]
  );
  const handleFilterClick = (type) => {
    if (type === "status") {
      setType(type);
      setShowFilter(true);
    } else if (type === "categories") {
      setType(type);
      setShowFilter(true);
    } else if (type === "date") {
      setType(type);
      setShowFilter(true);
    }
  };
  const handleFilterByStatus = (e, isLoadMore) => {
    callLoader(true);
    setStatusFilter(e.target.value);
    console.log("filter by status is happening");
    let url = UrlConstants.base_url + UrlConstants.support_ticket_tab;
    let payload = {};
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      if (tabValue == 0) {
        payload = {
          status: e.target.value,
        };
      } else if (tabValue == 1) {
        payload = {
          status: e.target.value,
        };
      }
    } else {
      payload = {
        status: e.target.value,
      };
    }
    HTTPService("POST", url, JSON.stringify(payload), false, true)
      .then((response) => {
        callLoader(false);
        if (response.data.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreUrl(response.data.next);
          setLoadMoreButton(true);
        } 
        let finalDataList = [];
        if (isLoadMore) {
          finalDataList = [...ticketList, ...response.data.results];
        } else {
          finalDataList = [...response.data.results];
        }
        console.log(finalDataList, "fdlist");
        setTicketList(finalDataList);
      })
      .catch(async (e) => {
        callLoader(false);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };
  const handleFilterByCategory = (e, isLoadMore) => {
    callLoader(true);
    setCategoryFilter(e.target.value);
    console.log("filter by category is happening");
    let url = UrlConstants.base_url + UrlConstants.support_ticket_tab;
    const requestBody = {
      category: e.target.value, // Use the selected value
    };
    HTTPService("POST", url, JSON.stringify(requestBody), false, true)
      .then((response) => {
        callLoader(false);

        if (response.data.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreUrl(response.data.next);
          setLoadMoreButton(true);
        }
        let finalDataList = [];
        if (isLoadMore) {
          finalDataList = [...ticketList, ...response.data.results];
        } else {
          finalDataList = [...response.data.results];
        }
        console.log(finalDataList, "fdlist");
        setTicketList(finalDataList);
      })
      .catch(async (e) => {
        callLoader(false);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };
  const handleFilterByDate = (isLoadMore) => {
    callLoader(true);
    console.log("filter by status is happening");
    let url = UrlConstants.base_url + UrlConstants.support_ticket_tab;
    let payload = {};
    if (fromDate && toDate) {
      let tempDateRange = [];
      tempDateRange.push(fromDate);
      tempDateRange.push(toDate);
      payload["updated_at__range"] = tempDateRange;
    }
    HTTPService("POST", url, JSON.stringify(payload), false, true)
      .then((response) => {
        callLoader(false);

        if (response.data.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreUrl(response.data.next);
          setLoadMoreButton(true);
        }
        let finalDataList = [];
        if (isLoadMore) {
          finalDataList = [...ticketList, ...response.data.results];
        } else {
          finalDataList = [...response.data.results];
        }
        console.log(finalDataList, "fdlist");
        setTicketList(finalDataList);
      })
      .catch(async (e) => {
        callLoader(false);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };
  const handleSearchTickets = (name, isLoadMore) => {
    if (name === undefined) return;
    setSearchTickets(name);
    let searchTimeout;
    const DEBOUNCE_DELAY = 500;
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      if (name?.length > 2 || name?.length !== "") {
        let data = {};
        data["name__icontains"] = name.trimStart();

        HTTPService(
          "POST",
          UrlConstants.base_url + UrlConstants.search_support_ticket,
          data,
          false,
          true
        )
          .then((response) => {
            if (response.data.next == null) {
              setLoadMoreButton(false);
            } else {
              setLoadMoreUrl(response.data.next);
              setLoadMoreButton(true);
            }
            let finalDataList = [];
            if (isLoadMore) {
              finalDataList = [...ticketList, ...response.data.results];
            } else {
              finalDataList = [...response.data.results];
            }
            console.log(finalDataList, "fdlist");
            setTicketList(finalDataList);
          })
          .catch(async (e) => {
            console.log(e);
            let error = await GetErrorHandlingRoute(e);
            console.log("Error obj", error);
            console.log(e);
            if (error.toast) {
              callToast(
                error?.message || "Something went wrong",
                error?.status === 200 ? "success" : "error",
                true
              );
            }
            if (error.path) {
              history.push(error.path);
            }
          });
      }
    }, DEBOUNCE_DELAY);
  };
  useEffect(() => {
    localStorage.setItem("supportTicketsTabValue", tabValue.toString());
  }, [tabValue]);

  useEffect(() => {
    handleFilterByDate();
  }, [toDate]);

  return (
    <>
      <Row style={{ margin: "0 144px" }}>
        <Col>
          <div className="text-left mt-50">
            <span className="add_light_text cursor-pointer breadcrumbItem">
              Support
            </span>
            <span className="add_light_text ml-16">
              <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#00ab55" }} />
            </span>
            <span className="add_light_text ml-16 fw600">
              {isLoggedInUserAdmin()
                ? tabValue === 0
                  ? "Co-steward tickets"
                  : tabValue === 1
                  ? "Other tickets"
                  : isLoggedInUserCoSteward()
                  ? tabValue === 0
                    ? "My tickets"
                    : tabValue === 1
                    ? "My network tickets"
                    : ""
                  : ""
                : "My tickets"}
            </span>
          </div>
        </Col>
      </Row>
      {isLoggedInUserAdmin() || isLoggedInUserCoSteward() ? (
        <Box
          className="mt-50"
          sx={{
            borderBottom: 1,
            borderColor: "black",
            width: "1152px",
            margin: "0 144px",
          }}
        >
          <CustomTabs
            tabValue={tabValue}
            setTabValue={setTabValue}
            TabLabels={tabLabels}
          />
        </Box>
      ) : (
        ""
      )}

      <TextField
        id="dataset-search-input-id"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#919EAB",
              borderRadius: "30px",
            },
            "&:hover fieldset": {
              borderColor: "#919EAB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#919EAB",
            },
          },
        }}
        className={LocalStyle.inputField}
        placeholder="Search tickets.."
        value={searchTickets}
        onChange={(e) => handleSearchTickets(e.target.value.trimStart())}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <img
                  src={require("../../Assets/Img/input_search.svg")}
                  alt="search"
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div>
        <div className={"filter"}>
          <Box className={`d-flex`}>
            <div
              className={
                showFilter && type === "status"
                  ? "d-flex align-items-center filter_text_container_active"
                  : "d-flex align-items-center filter_text_container"
              }
              onClick={() => handleFilterClick("status")}
              id="dataset-filter-by-geography-id"
            >
              <img
                src={require("../../Assets/Img/supportStatus.svg")}
                alt="status"
              />
              <span className={"filter_text"}>
                Status <KeyboardArrowDownIcon sx={{ fill: "#212529" }} />
              </span>
            </div>
            <div
              className={
                showFilter && type === "category"
                  ? "d-flex align-items-center filter_text_container_active"
                  : "d-flex align-items-center filter_text_container"
              }
              onClick={() => handleFilterClick("categories")}
              id="dataset-filter-by-categories-id"
            >
              <img
                src={require("../../Assets/Img/category.svg")}
                alt="category"
              />
              <span className="filter_text">
                Categories <KeyboardArrowDownIcon sx={{ fill: "#212529" }} />
              </span>
            </div>
            <div
              className={
                showFilter && type === "date"
                  ? "d-flex align-items-center filter_text_container_active"
                  : "d-flex align-items-center filter_text_container"
              }
              onClick={() => handleFilterClick("date")}
              id="dataset-filter-by-date-id"
            >
              <img
                src={require("../../Assets/Img/by_date.svg")}
                alt="by date"
              />
              <span className={"filter_text"}>
                By Date <KeyboardArrowDownIcon sx={{ fill: "#212529" }} />
              </span>
            </div>
            <div
              className="d-flex align-items-center filter_text_container"
              onClick={() => {
                setType("");
                setDates([{ fromDate: null, toDate: null }]);
                setFromDate("");
                setToDate("");
                setCategoryFilter("");
                setStatusFilter("");
                setShowFilter(false);
              }}
              id="dataset-filter-clear-all-id"
            >
              <img
                src={require("../../Assets/Img/clear_all.svg")}
                alt="clear all"
              />
              <span className={"filter_text"}>Clear all</span>
            </div>
          </Box>
        </div>
        {showFilter ? (
          type === "status" ? (
            <SupportFilterStatus
              statusFilter={statusFilter}
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              type={type}
              setStatusFilter={setStatusFilter}
              handleFilterByStatus={handleFilterByStatus}
            />
          ) : type === "categories" ? (
            <SupportFilterCategory
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              type={type}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              handleFilterByCategory={handleFilterByCategory}
            />
          ) : type === "date" ? (
            <FilterDate
              setUpdate={setUpdate}
              type={type}
              dataType={"date"}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              dates={dates}
              setDates={setDates}
              showFilter={showFilter}
              setShowFilter={setShowFilter}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      <SupportTittleView
        tabValue={tabValue}
        setTabValue={setTabValue}
        tabLabels={tabLabels}
        setTabLabels={setTabLabels}
        ticketList={ticketList}
        setTicketList={setTicketList}
        loadMoreUrl={loadMoreUrl}
        setLoadMoreUrl={setLoadMoreUrl}
        loadMoreButton={loadMoreButton}
        setLoadMoreButton={setLoadMoreButton}
        ListOfTickets={ListOfTickets}
        setlistOfTickets={setlistOfTickets}
      />
    </>
  );
}
