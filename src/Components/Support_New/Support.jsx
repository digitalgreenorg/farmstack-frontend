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
export default function Support(props) {
  const [ticketList, setTicketList] = useState([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [searchTickets, setSearchTickets] = useState(null);
  const { callLoader, callToast } = useContext(FarmStackContext);
  const history = useHistory();
  const [tabValue, setTabValue] = useState(
    parseInt(localStorage.getItem("supportTicketsTabValue")) || 0
  );
  let [tabLabels, setTabLabels] = useState(
    isLoggedInUserAdmin()
      ? ["Costeward tickets", "Other tickets"]
      : ["My tickets", "My network tickets"]
  );

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
        {/* <Box
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "12px",
            height: "48px",
            border: "none",
            color: "#00AB55",
            textTransform: "none",
            "&:hover": {
              background: "none",
              border: "none",
            },
          }}
        >
          {" "}
          Clear all
        </Box>  */}
        <Box
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "12px",
            height: "48px",
            border: "none",
            color: "#00AB55",
            textTransform: "none",
            "&:hover": {
              background: "none",
              border: "none",
            },
          }}
        >
          <Row className={LocalStyle.filter}>
            <Col xs={12} sm={6} md={4} lg={4}>
              <div>
              <img
                src={require("../../Assets/Img/supportStatus.svg")}
                alt="status"
              />
              </div>
              <div>
              <span>Status</span>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <div>
              <img
                src={require("../../Assets/Img/category.svg")}
                alt="category"
              />
              </div>
              <div>
              <span>Category</span>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <div>
              <img src={require("../../Assets/Img/by_date.svg")} alt="status" />
              
              </div>
              <div>
              <span>By date</span>
              </div>
            </Col>
          </Row>
        </Box>
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
      />
    </>
  );
}
