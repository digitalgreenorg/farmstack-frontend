import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  GetErrorHandlingRoute,
  getOrgLocal,
  getTokenLocal,
  getUserLocal,
  goToTop,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import "./DataSets.css";
import FooterNew from "../Footer/Footer_New";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import DataSetsTab from "./DataSetsTab/DataSetsTab";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Filter from "../Filter/Filter";
import CheckBoxWithText from "./TabComponents/CheckBoxWithText";
import ShowFilterChips from "../Filter/ShowFilterChips";
import { City, Country, State } from "country-state-city";
import EmptyFile from "./TabComponents/EmptyFile";
import DatasetRequestTable from "./DatasetRequestTable/DatasetRequestTable";
import FilterDate from "../Filter/FilterDate";
import useDebounce from "../../hooks/useDebounce";
import moment from "moment";
import { Col, Row } from "react-bootstrap";

const cardSx = {
  maxWidth: 368,
  height: 190,
  border: "1px solid #C0C7D1",
  borderRadius: "10px",
  "&:hover": {
    boxShadow: "-40px 40px 80px rgba(145, 158, 171, 0.16)",
    cursor: "pointer",
  },
};
const DataSets = (props) => {
  const { user, breadcrumbFromRoute } = props;
  console.log("breadcrumbFromRoute", breadcrumbFromRoute);
  const { callLoader, callToast } = useContext(FarmStackContext);
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const [state, setState] = useState([0, 1, 2, 3, 4, 5]);
  const [searchDatasetsName, setSearchDatasetsName] = useState(null);
  const debouncedSearchValue = useDebounce(searchDatasetsName, 1000);
  const [filterState, setFilterState] = useState({});
  const [datasetList, setDatasetList] = useState([]);
  const [filteredDatasetList, setFilteredDatasetList] = useState([]);
  const [filteredMemberDatasetList, setFilteredMemberDatasetList] = useState(
    []
  );
  const [memberDatasetList, setMemberDatasetList] = useState([]);
  const [showLoadMoreAdmin, setShowLoadMoreAdmin] = useState(false);
  const [showLoadMoreMember, setShowLoadMoreMember] = useState(false);
  const [datasetUrl, setDatasetUrl] = useState(
    UrlConstant.base_url + UrlConstant.dataset_participant_list
  );
  const [memberDatasetUrl, setMemberDatasetUrl] = useState(
    UrlConstant.base_url + UrlConstant.dataset_participant_list
  );
  const [guestUserDatasetUrl, setGuestUserDatasetUrl] = useState("");

  const [updater, setUpdate] = useState(0);

  // TabIndex
  const [value, setValue] = useState(0);

  var payload = "";
  var adminUrl = UrlConstant.base_url + UrlConstant.dataset_participant_list;
  var memberUrl = UrlConstant.base_url + UrlConstant.dataset_participant_list;
  var searchUrl =
    UrlConstant.base_url + UrlConstant.search_dataset_end_point_participant;

  // filter-popovers
  const [geographies, setGeographies] = useState([]);
  const [allGeographies, setAllGeographies] = useState([]);
  const [categorises, setCategorises] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [content, setContent] = useState([]);
  const [type, setType] = useState("");
  const [filterItems, setFilterItems] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [geography, setGeography] = useState({
    country: null,
    state: null,
    city: null,
  });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dates, setDates] = useState([{ fromDate: null, toDate: null }]);
  const resetUrls = () => {
    adminUrl = UrlConstant.base_url + UrlConstant.dataset_participant_list;
    memberUrl = UrlConstant.base_url + UrlConstant.dataset_participant_list;
    searchUrl =
      UrlConstant.base_url + UrlConstant.search_dataset_end_point_participant;
    setDatasetUrl("");
    setMemberDatasetUrl("");
  };

  const addDataset = () => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return "/datahub/new_datasets/add";
    } else if (isLoggedInUserParticipant()) {
      return "/participant/new_datasets/add";
    }
  };

  const clearFilter = () => {
    if (value === 0) {
      setFilteredDatasetList([]);
      setFilterState({});
      getDataSets(false);
    }
    if (value === 1) {
      setFilteredMemberDatasetList();
      setFilterState({});
      getOtherDataSets(false);
    }
  };

  const getDataSets = (isLoadMore) => {
    let method = "POST";
    if (!isLoadMore) {
      resetUrls();
      if (!Object.keys(filterState).length) {
        payload = {};
        payload["user_id"] = getUserLocal();
        payload["org_id"] = getOrgLocal();
        payload["others"] = false;
        if (isLoggedInUserCoSteward()) {
          payload["on_boarded_by"] = getUserLocal();
        }
        setFilterState(payload);
      }
    } else {
      if (!Object.keys(filterState).length) {
        payload = {};
        payload["user_id"] = getUserLocal();
        payload["org_id"] = getOrgLocal();
        payload["others"] = false;
        if (isLoggedInUserCoSteward()) {
          payload["on_boarded_by"] = getUserLocal();
        }
        setFilterState(payload);
      } else {
        payload = { ...filterState };
      }
    }
    let guestUrl = "";
    if (user == "guest") {
      if (!isLoadMore) {
        guestUrl = UrlConstant.base_url + UrlConstant.datasetview_guest;
      }
      payload = "";
      if (isLoadMore) {
        guestUrl = datasetUrl;
      }
      if (isLoadMore && !datasetUrl) {
        return;
      }
    }
    // console.log(user, "user inside the microste");
    let accessToken = user != "guest" ? getTokenLocal() : false;

    callLoader(true);
    HTTPService(
      method,
      guestUrl ? guestUrl : !isLoadMore ? adminUrl : datasetUrl,
      payload,
      false,
      accessToken
    )
      .then((response) => {
        callLoader(false);
        if (response.data.next == null) {
          setShowLoadMoreAdmin(false);
          setFilterState({});
        } else {
          setDatasetUrl(response.data.next);
          setShowLoadMoreAdmin(true);
        }
        let finalDataList = [];
        if (isLoadMore) {
          finalDataList = [...datasetList, ...response.data.results];
        } else {
          finalDataList = [...response.data.results];
        }
        setDatasetList(finalDataList);
      })
      .catch(async (err) => {
        callLoader(false);
        let response = await GetErrorHandlingRoute(err);
        if (response?.toast) {
          //callToast(message, type, action)
          callToast(
            response?.message ?? "Error occurred while getting datasets",
            response.status == 200 ? "success" : "error",
            response.toast
          );
        } else {
          history.push(response?.path);
        }
      });
  };

  const getOtherDataSets = (isLoadMore) => {
    if (!isLoadMore) {
      resetUrls();
      if (!Object.keys(filterState).length) {
        payload = {};
        payload["user_id"] = getUserLocal();
        payload["org_id"] = getOrgLocal();
        payload["others"] = true;
        if (isLoggedInUserCoSteward()) {
          payload["on_boarded_by"] = getUserLocal();
        }
        setFilterState(payload);
      }
    } else {
      if (!Object.keys(filterState).length) {
        payload = {};
        payload["user_id"] = getUserLocal();
        payload["org_id"] = getOrgLocal();
        payload["others"] = true;
        if (isLoggedInUserCoSteward()) {
          payload["on_boarded_by"] = getUserLocal();
        }
        setFilterState(payload);
      } else {
        payload = { ...filterState };
      }
    }
    let accessToken = user !== "guest" ? getTokenLocal() : false;
    callLoader(true);
    HTTPService(
      "POST",
      !isLoadMore ? memberUrl : memberDatasetUrl,
      payload,
      false,
      accessToken
    )
      .then((response) => {
        callLoader(false);
        if (response.data.next == null) {
          setShowLoadMoreMember(false);
          setFilterState({});
        } else {
          setMemberDatasetUrl(response.data.next);
          setShowLoadMoreMember(true);
        }
        let finalDataList = [];
        if (isLoadMore) {
          finalDataList = [...memberDatasetList, ...response.data.results];
        } else {
          finalDataList = [...response.data.results];
        }
        setMemberDatasetList(finalDataList);
      })
      .catch(async (err) => {
        callLoader(false);
        let response = await GetErrorHandlingRoute(err);
        if (response.toast) {
          //callToast(message, type, action)
          callToast(
            response?.message ?? "Authenticated",
            response.status == 200 ? "success" : "error",
            response.toast
          );
        } else {
          history.push(response?.path);
        }
      });
  };
  const getUrl = (isLoadMore) => {
    if (user === "guest") {
      let guestUsetFilterUrl =
        UrlConstant.base_url + UrlConstant.search_dataset_end_point_guest;
      return guestUsetFilterUrl;
    } else {
      if (!isLoadMore) {
        return searchUrl;
      } else {
        return value === 0 ? datasetUrl : memberDatasetUrl;
      }
    }
  };
  const handleSearch = async (isLoadMore) => {
    let searchText = searchDatasetsName;
    searchText ? callLoader(true) : callLoader(false);
    if (searchText?.length < 3 && searchText !== "") searchText = "";
    let data = {};
    setFilterState({});
    data["user_id"] = getUserLocal();
    data["org_id"] = getOrgLocal();
    data["name__icontains"] = searchText;
    if (isLoggedInUserCoSteward()) {
      data["on_boarded_by"] = true;
    }
    if (value === 1) {
      data["others"] = true;
    } else {
      data["others"] = false;
    }

    let accessToken = user !== "guest" ? getTokenLocal() : false;
    if (user == "guest") {
      data = "";
    }

    await HTTPService("POST", getUrl(isLoadMore), data, false, accessToken)
      .then((response) => {
        callLoader(false);
        if (response.data.next == null) {
          if (value === 0) {
            setShowLoadMoreAdmin(false);
          } else {
            setShowLoadMoreMember(false);
          }
          setFilterState({});
        } else {
          if (value === 0) {
            setDatasetUrl(response.data.next);
            searchText === "" && setFilterState({});
            setShowLoadMoreAdmin(true);
          } else {
            setMemberDatasetUrl(response.data.next);
            searchText === "" && setFilterState({});
            setShowLoadMoreMember(true);
          }
        }
        let finalDataList = [];
        if (isLoadMore) {
          if (value === 1) {
            finalDataList = [...memberDatasetList, ...response.data.results];
          } else {
            finalDataList = [...datasetList, ...response.data.results];
          }
        } else {
          finalDataList = [...response.data.results];
        }
        if (value === 1) {
          setMemberDatasetList(finalDataList);
        } else {
          setDatasetList(finalDataList);
        }
        return;
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
  // filter-popovers handling
  const handleFilterClick = (type) => {
    if (type === "geography") {
      setContent(allGeographies);
      setType(type);
      setShowFilter(true);
    } else if (type === "categories") {
      setContent(allCategories);
      setType(type);
      setShowFilter(true);
    } else if (type === "date") {
      setType(type);
      setShowFilter(true);
    }
  };

  const handleCheckBox = (keyName, value) => {
    setUpdate((prev) => prev + 1);
    let tempCategories = { ...categorises };
    let tempJson = Object.keys(categorises);
    if (tempJson.includes(keyName)) {
      if (tempCategories[keyName].includes(value)) {
        if (tempCategories[keyName]?.length === 1) {
          delete tempCategories[keyName];
        } else {
          let index = tempCategories[keyName].indexOf(value);
          tempCategories[keyName].splice(index, 1);
        }
      } else {
        tempCategories[keyName].push(value);
      }
      setCategorises({ ...tempCategories });
    } else {
      setCategorises((currentState) => {
        return { ...currentState, [keyName]: [value] };
      });
    }
  };

  const getAllCategoryAndSubCategory = () => {
    let url =
      user == "guest"
        ? UrlConstant.base_url + UrlConstant.microsite_category
        : UrlConstant.base_url + UrlConstant.add_category_edit_category;
    let isAuthorization = user == "guest" ? false : true;
    let checkforAccess = user !== "guest" ? getTokenLocal() : false;
    HTTPService("GET", url, "", true, isAuthorization, checkforAccess)
      .then((response) => {
        let prepareArr = [];
        for (const [key, value] of Object.entries(response.data)) {
          let obj = {};
          obj[key] = value;
          prepareArr.push(Object.keys(value).length ? obj : []);
        }
        let tempCategories = [];
        prepareArr.forEach((item, index) => {
          let keys = Object.keys(item);
          let prepareCheckbox = [];
          if (keys.length) {
            let tCategory = categorises?.[keys];
            prepareCheckbox = item?.[keys[0]]?.map((res, ind) => {
              console.log(
                tCategory?.includes(res),
                tCategory,
                res,
                "tCategory?.includes(res)"
              );
              return (
                <CheckBoxWithText
                  key={ind}
                  text={res}
                  checked={tCategory?.includes(res) ? true : false}
                  categoryKeyName={keys[0]}
                  keyName={res}
                  handleCheckBox={handleCheckBox}
                  fontSize={"12px"}
                />
              );
            });
            let obj = {
              panel: index + 1,
              title: keys[0],
              details: prepareCheckbox ? prepareCheckbox : [],
            };
            tempCategories = tempCategories.concat(obj);
          }
        });
        setAllCategories(tempCategories);
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
  };

  const getAllGeoGraphies = () => {
    setStates([]);
    setCities([]);
    setCountries(Country.getAllCountries());
    if (geography?.country) {
      setStates(State?.getStatesOfCountry(geography?.country?.isoCode));
    }
    if (geography?.country && geography?.state?.name) {
      setCities(
        City.getCitiesOfState(
          geography?.state?.countryCode,
          geography?.state?.isoCode
        )
      );
    }
  };

  const handleClickAway = (e) => {
    console.log("tri");
    // e.stopPropagation();
    setShowFilter(false);
  };

  const callApply = (isLoadMore) => {
    let payload = {};
    payload["user_id"] = getUserLocal();
    payload["org_id"] = getOrgLocal();
    payload["others"] = value === 0 ? false : true;
    if (
      geography?.country?.name ||
      geography?.state?.name ||
      geography?.city?.name
    ) {
      let geo = {};
      for (const [key, value] of Object.entries(geography)) {
        if (value?.name) {
          geo[key] = { name: value?.name };
        }
      }
      payload["geography__contains"] = geo;
    }
    if (categorises && Object.keys(categorises).length) {
      let arr = [];
      for (const [key, value] of Object.entries(categorises)) {
        let obj = {};
        obj[key] = value;
        arr.push(obj);
      }
      payload["category"] = arr;
    }
    if (fromDate && toDate) {
      let tempDateRange = [];
      tempDateRange.push(fromDate);
      tempDateRange.push(toDate);
      payload["updated_at__range"] = tempDateRange;
    }
    setFilterState(payload);
    let guestUsetFilterUrl =
      UrlConstant.base_url + UrlConstant.search_dataset_end_point_guest;
    let isAuthorization = user == "guest" ? false : true;
    if (user == "guest") {
      payload = "";
    }
    callLoader(true);
    HTTPService(
      "POST",
      user == "guest"
        ? guestUsetFilterUrl
        : !isLoadMore
        ? adminUrl
        : datasetUrl,
      payload,
      false,
      isAuthorization
    )
      .then((response) => {
        callLoader(false);
        if (value === 0) {
          if (response.data.next == null) {
            setShowLoadMoreAdmin(false);
            setFilterState({});
          } else {
            setDatasetUrl(response.data.next);
            setShowLoadMoreAdmin(true);
          }
          let finalDataList = [];
          if (isLoadMore) {
            finalDataList = [...datasetList, ...response.data.results];
          } else {
            finalDataList = [...response.data.results];
          }
          setDatasetList(finalDataList);
        }
        if (value === 1) {
          if (response.data.next == null) {
            setShowLoadMoreMember(false);
            setFilterState({});
          } else {
            setMemberDatasetUrl(response.data.next);
            setShowLoadMoreMember(true);
          }
          let finalDataList = [];
          if (isLoadMore) {
            finalDataList = [...memberDatasetList, ...response.data.results];
          } else {
            finalDataList = [...response.data.results];
          }
          setMemberDatasetList(finalDataList);
        }
      })
      .catch(async (e) => {
        callLoader(false);
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
  };

  const handleFromDate = (value) => {
    console.log("handleFromDate");
    let currentDate = new Date();
    let formattedDate = moment(value).format("DD/MM/YYYY");
    if (
      moment(formattedDate, "DD/MM/YYYY", true).isValid() &&
      moment(value).isSameOrBefore(currentDate)
    ) {
      let tempDates = [...dates];
      tempDates[0].fromDate = value;
      setDates(tempDates);
      setFromDate(value);
      // setUpdate((prev) => prev + 1);
      // setFromDateError(false);
    } else {
      // setFromDateError(true);
      console.log("inside from date");
      let tempDates = [...dates];
      tempDates[0].fromDate = null;
      setDates(tempDates);
      // setUpdate((prev) => prev + 1);
      handleToDate("");
      setFromDate("");
    }
    // setUpdate((prev) => prev + 1);
  };

  const handleToDate = (value) => {
    console.log("called", dates);
    let formattedDate = moment(value).format("DD/MM/YYYY");
    if (
      moment(formattedDate, "DD/MM/YYYY", true).isValid() &&
      moment(value).isSameOrAfter(fromDate) &&
      moment(value).isSameOrBefore(new Date())
    ) {
      let tempDates = [...dates];
      tempDates[0].toDate = value;
      setDates(tempDates);
      setToDate(value);
      // setUpdate((prev) => prev + 1);
      // setToDateError(false);
    } else {
      let tempDates = [...dates];
      console.log(tempDates, "tempDates");
      tempDates[0].toDate = null;
      setDates(tempDates);
      // setUpdate((prev) => prev + 1);
      // setToDateError(true);
      setToDate("");
    }
  };

  useEffect(() => {
    if (user === "guest") {
      getDataSets(false);
    }
    goToTop(0);
  }, []);

  useEffect(() => {
    setSearchDatasetsName("");
  }, [value]);

  useEffect(() => {
    if (debouncedSearchValue !== null) {
      handleSearch();
    }
  }, [debouncedSearchValue]);
  useEffect(() => {
    getAllGeoGraphies();
    console.log("called useEffect");
  }, [geography, type]);

  useEffect(() => {
    getAllCategoryAndSubCategory();
  }, [categorises, type]);

  useEffect(() => {
    console.log("Updator");
    callApply();
  }, [updater]);

  return (
    <>
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
                onClick={() => {
                  breadcrumbFromRoute == "Home"
                    ? history.push("/home")
                    : history.push("/datahub/new_datasets");
                }}
              >
                {breadcrumbFromRoute ?? ""}
              </span>
              <span className="add_light_text ml-16">
                {breadcrumbFromRoute ? (
                  <ArrowForwardIosIcon
                    sx={{ fontSize: "14px", fill: "#00ab55" }}
                  />
                ) : (
                  ""
                )}
              </span>
              <span className="add_light_text ml-16 fw600">
                {!breadcrumbFromRoute
                  ? "Datasets"
                  : value == 0
                  ? "My organisation datasets"
                  : value == 1
                  ? "Other organisation datasets"
                  : value == 2
                  ? "Request received"
                  : ""}

                {/* {isParticipantRequest ? "" : ""} */}
              </span>
            </div>
          </Col>
        </Row>
        {/* section-1 */}
        <div className={mobile ? "title_sm" : tablet ? "title_md" : "title"}>
          Datasets Explorer
        </div>
        <div className="d-flex justify-content-center">
          <div className={mobile ? "description_sm" : "description"}>
            <b style={{ fontWeight: "bold" }}></b>
            Unleash the power of data-driven agriculture - Your ultimate dataset
            explorer for smarter decisions.
            <b style={{ fontWeight: "bold" }}></b>
          </div>
        </div>
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
          className={
            mobile
              ? "input_field_sm"
              : tablet
              ? "input_field_md"
              : "input_field"
          }
          placeholder="Search dataset.."
          value={searchDatasetsName}
          onChange={(e) => setSearchDatasetsName(e.target.value.trim())}
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
        {/* <ClickAwayListener onClickAway={handleClickAway}> */}
        <div>
          <div
            className={
              mobile
                ? "filter_sm"
                : tablet
                ? "filter_md"
                : miniLaptop
                ? "filter_slg"
                : "filter"
            }
          >
            <Box className="text-right">
              {mobile ? (
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
                  onClick={() => {
                    setType("");
                    setCategorises([]);
                    setGeographies([]);
                    setDates([{ fromDate: null, toDate: null }]);
                    setFromDate("");
                    setToDate("");
                    setSearchDatasetsName("");
                    clearFilter();
                    setFilterState({});
                  }}
                  id="clear-all-in-dataset-filter-id"
                >
                  Clear all
                </Box>
              ) : (
                <></>
              )}
            </Box>
            <Box
              className={`d-flex ${
                mobile || tablet ? "justify-content-center" : ""
              }`}
            >
              <div
                className={
                  showFilter && type === "geography"
                    ? "d-flex align-items-center filter_text_container_active"
                    : "d-flex align-items-center filter_text_container"
                }
                onClick={() => handleFilterClick("geography")}
                id="dataset-filter-by-geography-id"
              >
                <img
                  src={require("../../Assets/Img/geography_new.svg")}
                  alt="geography"
                  style={mobile ? { height: "12px" } : {}}
                />
                <span
                  className={`${
                    mobile || tablet ? "filter_text_md" : "filter_text"
                  } 
                ${mobile ? "ft-12" : ""}
                `}
                >
                  Geography{" "}
                  {mobile ? (
                    <></>
                  ) : (
                    <KeyboardArrowDownIcon sx={{ fill: "#212529" }} />
                  )}
                </span>
              </div>
              <div
                className={
                  showFilter && type === "categories"
                    ? "d-flex align-items-center filter_text_container_active"
                    : "d-flex align-items-center filter_text_container"
                }
                onClick={() => handleFilterClick("categories")}
                id="dataset-filter-by-categories-id"
              >
                <img
                  src={require("../../Assets/Img/crop_new.svg")}
                  alt="crop"
                  style={mobile ? { height: "12px" } : {}}
                />
                <span
                  className={`${
                    mobile || tablet ? "filter_text_md" : "filter_text"
                  } 
                ${mobile ? "ft-12" : ""}
                `}
                >
                  Categories{" "}
                  {mobile ? (
                    <></>
                  ) : (
                    <KeyboardArrowDownIcon sx={{ fill: "#212529" }} />
                  )}
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
                  style={mobile ? { height: "12px" } : {}}
                />
                <span
                  className={`${
                    mobile || tablet ? "filter_text_md" : "filter_text"
                  } 
                ${mobile ? "ft-12" : ""}
                `}
                >
                  By Date{" "}
                  {mobile ? (
                    <></>
                  ) : (
                    <KeyboardArrowDownIcon sx={{ fill: "#212529" }} />
                  )}
                </span>
              </div>
              {mobile ? (
                <></>
              ) : (
                <div
                  className="d-flex align-items-center filter_text_container"
                  onClick={() => {
                    setType("");
                    setCategorises([]);
                    setGeographies([]);
                    setDates([{ fromDate: null, toDate: null }]);
                    setFromDate("");
                    setToDate("");
                    setSearchDatasetsName("");
                    clearFilter();
                    setFilterState({});
                  }}
                  id="dataset-filter-clear-all-id"
                >
                  <img
                    src={require("../../Assets/Img/clear_all.svg")}
                    alt="clear all"
                  />
                  <span
                    className={
                      mobile || tablet ? "filter_text_md" : "filter_text"
                    }
                  >
                    Clear all
                  </span>
                </div>
              )}
            </Box>
          </div>
          {/* <div style={{ border: "1px solid" }}> */}
          {showFilter ? (
            type === "geography" ? (
              <Filter
                setUpdate={setUpdate}
                handleClickAway={handleClickAway}
                type={type}
                dataType={"component"}
                geography={geography}
                setGeography={setGeography}
                geographies={geographies}
                setGeographies={setGeographies}
                countries={countries}
                states={states}
                cities={cities}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                callApply={callApply}
              />
            ) : type === "categories" ? (
              <Filter
                setUpdate={setUpdate}
                handleClickAway={handleClickAway}
                categorises={categorises}
                type={type}
                dataType={"list"}
                content={allCategories}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                callApply={callApply}
              />
            ) : (
              <FilterDate
                setUpdate={setUpdate}
                handleClickAway={handleClickAway}
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
                callApply={callApply}
              />
            )
          ) : (
            <></>
          )}
        </div>

        {/* </div> */}
        {/* </ClickAwayListener> */}

        {geographies?.length ||
        Object.keys(categorises).length ||
        dates[0]?.fromDate ||
        dates[0]?.toDate ? (
          <ShowFilterChips
            getAllCategoryAndSubCategory={getAllCategoryAndSubCategory}
            geographies={geographies}
            categorises={categorises}
            dates={dates}
            // date setters

            handleFromDate={handleFromDate}
            handleToDate={handleToDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setDates={setDates}
            //geography setters
            geography={geography}
            setGeography={setGeography}
            setGeographies={setGeographies}
            //category setters
            setAllCategories={setAllCategories}
            setCategorises={setCategorises}
            handleCheckBox={handleCheckBox}
            callApply={callApply}
            setUpdate={setUpdate}
          />
        ) : (
          <></>
        )}
      </Box>
      <Divider />
      {/* section-2 */}
      {user === "guest" && datasetList?.length ? (
        <DataSetsTab
          user={user}
          history={history}
          addDataset={addDataset}
          state={state}
          value={value}
          setValue={setValue}
          datasetList={datasetList}
          memberDatasetList={memberDatasetList}
          filteredDatasetList={filteredDatasetList}
          filteredMemberDatasetList={filteredMemberDatasetList}
          getDataSets={getDataSets}
          getOtherDataSets={getOtherDataSets}
          showLoadMoreAdmin={showLoadMoreAdmin}
          showLoadMoreMember={showLoadMoreMember}
          setType={setType}
          setCategorises={setCategorises}
          setGeographies={setGeographies}
          setDates={setDates}
          setFromDate={setFromDate}
          setToDate={setToDate}
          setSearchDatasetsName={setSearchDatasetsName}
          clearFilter={clearFilter}
          setFilterState={setFilterState}
        />
      ) : (
        <>
          {user === "guest" ? (
            <EmptyFile text={"As of now there is no datasets."} />
          ) : (
            <></>
          )}
        </>
      )}
      {user !== "guest" ? (
        <DataSetsTab
          user={user}
          history={history}
          addDataset={addDataset}
          state={state}
          value={value}
          setValue={setValue}
          datasetList={datasetList}
          memberDatasetList={memberDatasetList}
          filteredDatasetList={filteredDatasetList}
          filteredMemberDatasetList={filteredMemberDatasetList}
          getDataSets={getDataSets}
          getOtherDataSets={getOtherDataSets}
          showLoadMoreAdmin={showLoadMoreAdmin}
          showLoadMoreMember={showLoadMoreMember}
          setType={setType}
          setCategorises={setCategorises}
          setGeographies={setGeographies}
          setDates={setDates}
          setFromDate={setFromDate}
          setToDate={setToDate}
          setSearchDatasetsName={setSearchDatasetsName}
          clearFilter={clearFilter}
          setFilterState={setFilterState}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default DataSets;
