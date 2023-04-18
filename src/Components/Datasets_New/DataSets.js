import React, { useState, useEffect } from "react";
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
    if (value === 0) {
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

  const handleFilter = () => {};

  const getDataSets = (isLoadMore) => {
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

    let accessToken = getTokenLocal() ?? false;
    HTTPService(
      "POST",
      !isLoadMore ? adminUrl : datasetUrl,
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
      .catch((err) => {
        console.log(err);
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
      .catch((err) => {});
  };
  useEffect(() => {
    getDataSets(false);
    getOtherDataSets(false);
  }, []);

  useEffect(() => {
    setSearchDatasetsName("");
  }, [value]);

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
          <div className="d-flex align-items-center">
            <img
              src={require("../../Assets/Img/geography_new.svg")}
              alt="geography"
            />
            <span className="filter_text">Geography</span>
          </div>
          <div className="d-flex align-items-center">
            <img src={require("../../Assets/Img/by_age.svg")} alt="by age" />
            <span className="filter_text">By Age</span>
          </div>
          <div className="d-flex align-items-center">
            <img src={require("../../Assets/Img/crop_new.svg")} alt="crop" />
            <span className="filter_text">Crop</span>
          </div>
          <div className="d-flex align-items-center">
            <img src={require("../../Assets/Img/by_date.svg")} alt="by date" />
            <span className="filter_text">By Date</span>
          </div>
          <div className="d-flex align-items-center">
            <img
              src={require("../../Assets/Img/clear_all.svg")}
              alt="clear all"
            />
            <span className="filter_text">Clear all</span>
          </div>
        </div>
      </Box>
      <Divider />
      {/* section-2 */}
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
      {/* <Divider />
            <FooterNew /> */}
    </>
  );
};

export default DataSets;
