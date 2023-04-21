import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import {
  GetErrorHandlingRoute,
  getOrgLocal,
  getTokenLocal,
  getUserLocal,
  isLoggedInUserAdmin,
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
  const { user } = props;
  const { callLoader, callToast } = useContext(FarmStackContext);
  const history = useHistory();
  const [state, setState] = useState([0, 1, 2, 3, 4, 5]);
  const [searchDatasetsName, setSearchDatasetsName] = useState();
  const [filterState, setFilterState] = useState();
  const [datasetList, setDatasetList] = useState([]);
  const [memberDatasetList, setMemberDatasetList] = useState([]);
  const [showLoadMoreAdmin, setShowLoadMoreAdmin] = useState(false);
  const [showLoadMoreMember, setShowLoadMoreMember] = useState(false);
  const [datasetUrl, setDatasetUrl] = useState(
    UrlConstant.base_url + UrlConstant.dataset_participant_list
  );
  const [memberDatasetUrl, setMemberDatasetUrl] = useState(
    UrlConstant.base_url + UrlConstant.dataset_participant_list
  );

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

  const resetUrls = () => {
    adminUrl = UrlConstant.base_url + UrlConstant.dataset_participant_list;
    memberUrl = UrlConstant.base_url + UrlConstant.dataset_participant_list;
    searchUrl =
      UrlConstant.base_url + UrlConstant.search_dataset_end_point_participant;
    setDatasetUrl("");
    setMemberDatasetUrl("");
  };

  const addDataset = () => {
    if (isLoggedInUserAdmin()) {
      return "/datahub/new_datasets/add";
    } else if (isLoggedInUserParticipant()) {
      return "/participant/new_datasets/add";
    }
  };

  const handleSearch = (name, isLoadMore) => {
    setSearchDatasetsName(name);
    if (name && name.length < 3 && name !== "") name = "";
    let data = {};
    setFilterState({});
    data["user_id"] = getUserLocal();
    data["org_id"] = getOrgLocal();
    data["name__icontains"] = name;
    if (value === 0) {
      data["others"] = false;
    } else {
      data["others"] = true;
    }
    let guestUsetFilterUrl =
      UrlConstant.base_url + UrlConstant.search_dataset_end_point_guest;
    let isAuthorization = user == "guest" ? false : true;
    if (value === 0) {
      HTTPService(
        "POST",
        user == "guest"
          ? guestUsetFilterUrl
          : !isLoadMore
          ? searchUrl
          : memberDatasetUrl
          ? memberDatasetUrl
          : searchUrl,
        data,
        false,
        isAuthorization
      )
        .then((response) => {
          if (response.data.next == null) {
            setFilterState({});
            setShowLoadMoreAdmin(false);
          } else {
            setDatasetUrl(response.data.next);
            setShowLoadMoreAdmin(true);
          }
          let finalDataList = [];
          if (isLoadMore) {
            finalDataList = [...memberDatasetList, ...response.data.results];
          } else {
            finalDataList = [...response.data.results];
          }
          if (value === 0) {
            setDatasetList(finalDataList);
          } else {
            setDatasetList(finalDataList);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (value === 1) {
      HTTPService(
        "POST",

        !isLoadMore
          ? searchUrl
          : memberDatasetUrl
          ? memberDatasetUrl
          : searchUrl,
        data,
        false,
        true
      )
        .then((response) => {
          if (response.data.next == null) {
            setFilterState({});
            setShowLoadMoreMember(false);
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
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const clearFilter = () => {
    if (value === 0) {
      getDataSets(false);
    } else if (value === 1) {
      getOtherDataSets(false);
    }
  };

  const getDataSets = (isLoadMore) => {
    let method = "POST";
    if (!isLoadMore) {
      resetUrls();
      if (payload == "") {
        payload = {};
        payload["user_id"] = getUserLocal();
        payload["org_id"] = getOrgLocal();
        payload["others"] = false;
        setFilterState(payload);
      }
    } else {
      payload = { ...filterState };
    }
    let guestUrl = "";
    if (user == "guest") {
      guestUrl = UrlConstant.base_url + UrlConstant.datasetview_guest;
      payload = "";
      method = "GET";
    }

    // console.log("url",guestUrl)

    let accessToken = getTokenLocal() ?? false;
    HTTPService(
      method,
      guestUrl ? guestUrl : !isLoadMore ? adminUrl : datasetUrl,
      payload,
      false,
      accessToken
    )
      .then((response) => {
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
        let response = await GetErrorHandlingRoute(err);
        if (response.toast) {
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
      if (payload == "") {
        payload = {};
        payload["user_id"] = getUserLocal();
        payload["org_id"] = getOrgLocal();
        payload["others"] = true;
        setFilterState(payload);
      }
    } else {
      payload = { ...filterState };
    }
    let accessToken = getTokenLocal() ?? false;
    HTTPService(
      "POST",
      !isLoadMore ? memberUrl : memberDatasetUrl,
      payload,
      false,
      accessToken
    )
      .then((response) => {
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
    }
  };

  const handleCheckBox = (keyName, value) => {
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

  const handleGeoCheckBox = (keyName) => {
    let tempGeographies = [...geographies];
    if (tempGeographies.includes(keyName)) {
      const index = tempGeographies.indexOf(keyName);
      if (index > -1) {
        tempGeographies.splice(index, 1);
        setGeographies(tempGeographies);
      }
    } else {
      tempGeographies.push(keyName);
      setGeographies((prev) => [...prev, keyName]);
    }
  };
  let url =
    user == "guest"
      ? UrlConstant.base_url + UrlConstant.microsite_category
      : UrlConstant.base_url + UrlConstant.add_category_edit_category;
  let isAuthorization = user == "guest" ? false : true;

  const getAllCategoryAndSubCategory = () => {
    let checkforAccess = getTokenLocal() ?? false;
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
              return (
                <CheckBoxWithText
                  key={ind}
                  text={res}
                  checked={tCategory?.includes(res)}
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
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllGeoGraphies = () => {
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
          geo[key] = [value?.name];
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
    // payload["created_at__range"] = [];
    let guestUsetFilterUrl =
      UrlConstant.base_url + UrlConstant.search_dataset_end_point_guest;
    let isAuthorization = user == "guest" ? false : true;
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
      .catch((err) => {
        callLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getDataSets(false);
    if (user != "guest") {
      getOtherDataSets(false);
    }
  }, []);

  useEffect(() => {
    setSearchDatasetsName("");
  }, [value]);

  useEffect(() => {
    getAllGeoGraphies();
  }, [geography, type]);

  useEffect(() => {
    getAllCategoryAndSubCategory();
  }, [categorises, type]);

  console.log(geographies, "dsets");
  console.log(geography, "dsets");
  return (
    <>
      <Box sx={{ padding: "40px", maxWidth: "100%" }}>
        {/* section-1 */}
        <div className="title">List of datasets</div>
        <div className="d-flex justify-content-center">
          <div className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
            tellus scelerisque, imperdiet augue id, accumsan dolor. Integer ac
            neque quis metus pretium tempus.
          </div>
        </div>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#919EAB",
              },
              "&:hover fieldset": {
                borderColor: "#919EAB",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#919EAB",
              },
            },
          }}
          className="input_field"
          placeholder="Search dataset.."
          value={searchDatasetsName}
          onChange={(e) => handleSearch(e.target.value)}
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
        <div className="filter">
          <div
            className={
              showFilter && type === "geography"
                ? "d-flex align-items-center filter_text_container_active"
                : "d-flex align-items-center filter_text_container"
            }
            onClick={() => handleFilterClick("geography")}
          >
            <img
              src={require("../../Assets/Img/geography_new.svg")}
              alt="geography"
            />
            <span className="filter_text">
              Geography <KeyboardArrowDownIcon sx={{ fill: "#212529" }} />
            </span>
          </div>

          <div
            className={
              showFilter && type === "categories"
                ? "d-flex align-items-center filter_text_container_active"
                : "d-flex align-items-center filter_text_container"
            }
            onClick={() => handleFilterClick("categories")}
          >
            <img src={require("../../Assets/Img/crop_new.svg")} alt="crop" />
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
          >
            <img src={require("../../Assets/Img/by_date.svg")} alt="by date" />
            <span className="filter_text">By Date</span>
          </div>
          <div
            className="d-flex align-items-center filter_text_container"
            onClick={() => {
              setType("");
              setCategorises([]);
              setGeographies([]);
              clearFilter();
            }}
          >
            <img
              src={require("../../Assets/Img/clear_all.svg")}
              alt="clear all"
            />
            <span className="filter_text">Clear all</span>
          </div>
        </div>
        {showFilter ? (
          type === "geography" ? (
            <Filter
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
          ) : (
            <Filter
              type={type}
              dataType={"list"}
              content={allCategories}
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              callApply={callApply}
            />
          )
        ) : (
          <></>
        )}
        {geographies?.length || Object.keys(categorises).length ? (
          <ShowFilterChips
            geographies={geographies}
            categorises={categorises}
          />
        ) : (
          <></>
        )}
      </Box>
      <Divider />
      {/* section-2 */}
      {datasetList?.length ? (
        <DataSetsTab
          user={user}
          history={history}
          addDataset={addDataset}
          state={state}
          value={value}
          setValue={setValue}
          datasetList={datasetList}
          memberDatasetList={memberDatasetList}
          getDataSets={getDataSets}
          getOtherDataSets={getOtherDataSets}
          showLoadMoreAdmin={showLoadMoreAdmin}
          showLoadMoreMember={showLoadMoreMember}
        />
      ) : (
        <Box className={"mt114 mb139"}>
          <EmptyFile text={"As of now, there are no datasets for connectors"} />
        </Box>
      )}
    </>
  );
};

export default DataSets;
