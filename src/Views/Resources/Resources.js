import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import {
  getTokenLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import { Col, Row } from "react-bootstrap";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ResourcesTab from "./ResourcesTab";
import useDebounce from "../../hooks/useDebounce";

const Resources = (props) => {
  const { user, breadcrumbFromRoute } = props;
  const { callLoader } = useContext(FarmStackContext);
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const [isGrid, setIsGrid] = useState(true);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [resources, setResources] = useState([]);
  const [resourceUrl, setResourceUrl] = useState(
    UrlConstant.base_url + UrlConstant.resource_endpoint
  );
  const [otherResourceUrl, setOtherResourceUrl] = useState(
    UrlConstant.base_url + UrlConstant.resource_endpoint
  );
  const [guestResourceUrl, setGuestResourceUrl] = useState(
    UrlConstant.base_url + UrlConstant.microsite_resource_endpoint
  );
  const [value, setValue] = useState(0);
  const [searchResourceName, setSearchResourcename] = useState("");
  const debouncedSearchValue = useDebounce(searchResourceName, 1000);

  const addResource = () => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return `/datahub/resources/add`;
    } else if (isLoggedInUserParticipant()) {
      return `/participant/resources/add`;
    }
  };
  const getResources = (isLoadMore) => {
    let accessToken = user !== "guest" ? getTokenLocal() : false;
    let url = user !== "guest" ? resourceUrl : guestResourceUrl;
    let payload = {};
    if (searchResourceName) {
      url += !isLoadMore && "resources_filter/";
      payload["title__icontains"] = searchResourceName?.trim();
    }
    callLoader(true);

    HTTPService(
      searchResourceName ? "POST" : "GET",
      url,
      payload,
      false,
      accessToken
    )
      .then((response) => {
        callLoader(false);
        if (response.data.next == null) {
          setShowLoadMoreBtn(false);
        } else {
          if (user !== "guest") {
            setResourceUrl(response.data.next);
          } else {
            setGuestResourceUrl(response.data.next);
          }
          setShowLoadMoreBtn(true);
        }
        let tempResources = [];
        if (isLoadMore) {
          tempResources = [...resources, ...response.data.results];
        } else {
          tempResources = [...response.data.results];
        }
        setResources(tempResources);
      })
      .catch((err) => {
        callLoader(false);
        console.log("error", err);
      });
  };
  const getOtherResources = (isLoadMore) => {
    let accessToken = user != "guest" ? getTokenLocal() : false;
    callLoader(true);
    let url = otherResourceUrl;
    console.log(
      "🚀 ~ file: Resources.js:101 ~ getOtherResources ~ otherResourceUrl:",
      otherResourceUrl
    );
    let payload = {};
    if (searchResourceName) {
      if (!url.includes("resources_filter"))
        url =
          UrlConstant.base_url +
          UrlConstant.resource_endpoint +
          "resources_filter/?others=true";
      payload["title__icontains"] = searchResourceName?.trim();
    } else {
      if (!url.includes("others=true")) url = otherResourceUrl + "?others=true";
    }
    console.log(url, "url");
    HTTPService(
      searchResourceName ? "POST" : "GET",
      url,
      payload,
      false,
      accessToken
    )
      .then((response) => {
        callLoader(false);
        if (response.data.next == null) {
          setShowLoadMoreBtn(false);
        } else {
          console.log(response.data.next);
          setOtherResourceUrl(response.data.next);
          setShowLoadMoreBtn(true);
        }
        let tempResources = [];
        if (isLoadMore) {
          tempResources = [...resources, ...response.data.results];
        } else {
          tempResources = [...response.data.results];
        }
        setResources(tempResources);
      })
      .catch((err) => {
        callLoader(false);
        console.log("error", err);
      });
  };
  // useEffect(() => {
  //   setSearchResourcename("");
  // }, [value]);

  useEffect(() => {
    if (debouncedSearchValue) {
      value == 0 && getResources(false);
      value == 1 && getOtherResources(false);
    }
  }, [debouncedSearchValue]);
  return (
    <Box
      sx={{
        maxWidth: "100%",
        marginLeft: mobile || tablet ? "30px" : "144px",
        marginRight: mobile || tablet ? "30px" : "144px",
      }}
    >
      <Row>
        <Col>
          <div className="text-left mt-50">
            <span
              className="add_light_text cursor-pointer breadcrumbItem"
              data-testid="go_home"
              onClick={() => {
                breadcrumbFromRoute === "Home"
                  ? history.push("/home")
                  : isLoggedInUserAdmin() || isLoggedInUserCoSteward()
                  ? history.push("/datahub/resources")
                  : history.push("/participant/resources");
              }}
            >
              {breadcrumbFromRoute ? breadcrumbFromRoute : "Resources"}
            </span>
            <span className="add_light_text ml-16">
              <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#00A94F" }} />
            </span>
            <span className="add_light_text ml-16 fw600">
              {user
                ? "Resources"
                : value == 0
                ? "My organisation resources"
                : value == 1
                ? "Other organisation resources"
                : ""}
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <div className={mobile ? "title_sm" : tablet ? "title_md" : "title"}>
            Resources Explorer
          </div>
          <div className="d-flex justify-content-center">
            <div className={mobile ? "description_sm" : "description"}>
              <b style={{ fontWeight: "bold" }}></b>
              Unleash the power of data-driven agriculture - Your ultimate
              resource explorer for smarter decisions.
              <b style={{ fontWeight: "bold" }}></b>
            </div>
          </div>
          <TextField
            id="dataset-search-input-id"
            data-testid="dataset-search-input-id"
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
            className={
              mobile
                ? "input_field_sm"
                : tablet
                ? "input_field_md"
                : "input_field"
            }
            placeholder="Search dataset.."
            value={searchResourceName}
            onChange={(e) => setSearchResourcename(e.target.value.trim())}
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
        </Col>
      </Row>

      <ResourcesTab
        user={user}
        value={value}
        setValue={setValue}
        history={history}
        isGrid={isGrid}
        setIsGrid={setIsGrid}
        resources={resources}
        setResources={setResources}
        addResource={addResource}
        getResources={getResources}
        getOtherResources={getOtherResources}
        showLoadMoreBtn={showLoadMoreBtn}
        setResourceUrl={setResourceUrl}
        setOtherResourceUrl={setOtherResourceUrl}
        setSearchResourcename={setSearchResourcename}
        searchResourceName={searchResourceName}
        debouncedSearchValue={debouncedSearchValue}
      />
    </Box>
  );
};

export default Resources;
