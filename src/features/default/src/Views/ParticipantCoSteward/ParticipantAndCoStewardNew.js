import React, { useState, useEffect, useContext } from "react";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { Box } from "@mui/system";
import { Col, Row } from "react-bootstrap";
import CustomTabs from "../../Components/Tabs/Tabs";
import NoData from "../../Components/NoData/NoData";
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants.js";
import HTTPService from "../../Services/HTTPService";
import { useHistory } from "react-router-dom";
import UrlConstant from "../../Constants/UrlConstants";
import { FarmStackContext } from "common/components/context/DefaultContext/FarmstackProvider";
import {
  GetErrorHandlingRoute,
  getUserLocal,
  goToTop,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
} from "../../Utils/Common";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery, useTheme } from "@mui/material";
import globalConfig from "globalConfig";
const ParticipantsAndCoStewardNew = () => {
  const { callLoader, callToast, isLoading } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const history = useHistory();
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [tabValue, setTabValue] = useState(
    parseInt(localStorage.getItem("participantAndCostewardTabValue")) || 0
  );
  const [coStewardOrParticipantsList, setCoStewardOrParticipantsList] =
    useState([]);
  const [viewType, setViewType] = useState("grid");
  let [tabLabels, setTabLabels] = useState(["Partner", "New Partner Requests"]);

  const handleClick = () => {};

  const handleLoadMoreButton = () => {
    getListOnClickOfLoadMore();
  };

  const getCoStewardOrParticipantsOnLoad = (
    unApprovedId,
    approval_endpoint
  ) => {
    callLoader(true);
    let params = {};
    let url = UrlConstant.base_url + UrlConstant.participant;
    if (tabValue == 0) {
      params = { co_steward: "True" };
    } else if (tabValue == 2) {
      params = { approval_status: "False" };
    }
    if (approval_endpoint) {
      url = UrlConstant.participant + unApprovedId + "?approval_status=True";
    }
    if (isLoggedInUserCoSteward()) {
      params = {};

      if (tabValue == 0) {
        params = { on_boarded_by: getUserLocal() };
      } else if (tabValue == 1) {
        params = { approval_status: "False", on_boarded_by: getUserLocal() };
      }
    }
    HTTPService("GET", url, params, false, true)
      .then((response) => {
        callLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        if (response?.data?.results) {
          let finalDataList = [...response?.data?.results];
          const temp = finalDataList?.forEach((resour) => {
            let youtube = resour?.content_files_count.find(
              (resour) => resour.type === "youtube"
            );
            let file = resour?.content_files_count.find(
              (item) => item.type === "file"
            );
            let pdf = resour?.content_files_count.find(
              (item) => item.type === "pdf"
            );
            let api = resour?.content_files_count.find(
              (item) => item.type === "api"
            );
            let website = resour?.content_files_count.find(
              (item) => item.type === "website"
            );
            resour.pdf_count = pdf?.count ?? 0;
            resour.video_count = youtube?.count ?? 0;
            resour.file_count = file?.count ?? 0;
            resour.api_count = api?.count ?? 0;
            resour.website_count = website?.count ?? 0;
          });
          setCoStewardOrParticipantsList(finalDataList);
        }
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

  const getListOnClickOfLoadMore = () => {
    callLoader(true);
    HTTPService("GET", loadMoreUrl, "", false, true)
      .then((response) => {
        callLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) {
            setLoadMoreUrl(response.data.next);
          }
        }
        let datalist = coStewardOrParticipantsList;
        if (response?.data?.results) {
          let finalDataList = [...datalist, ...response.data.results];
          const temp = finalDataList?.forEach((resour) => {
            let youtube = resour?.content_files_count.find(
              (resour) => resour.type === "youtube"
            );
            let file = resour?.content_files_count.find(
              (item) => item.type === "file"
            );
            let pdf = resour?.content_files_count.find(
              (item) => item.type === "pdf"
            );
            let api = resour?.content_files_count.find(
              (item) => item.type === "api"
            );
            let website = resour?.content_files_count.find(
              (item) => item.type === "website"
            );
            resour.pdf_count = pdf?.count ?? 0;
            resour.video_count = youtube?.count ?? 0;
            resour.file_count = file?.count ?? 0;
            resour.api_count = api?.count ?? 0;
            resour.website_count = website?.count ?? 0;
          });
          setCoStewardOrParticipantsList(finalDataList);
        }
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

  useEffect(() => {
    setCoStewardOrParticipantsList([]);
    getCoStewardOrParticipantsOnLoad();

    localStorage.setItem("participantAndCostewardTabValue", tabValue);
  }, [tabValue]);

  useEffect(() => {
    if (isLoggedInUserAdmin()) {
      setTabLabels([
        "States (or) Organisations",
        "Partner",
        "New Partner Requests",
      ]);
    }
    goToTop(0);
    let tabValue = localStorage.getItem("participantAndCostewardTabValue");
    if (tabValue == 0) {
      localStorage.removeItem("participantAndCostewardTabValue");
    }
  }, []);

  return (
    <div
      style={{
        marginLeft: mobile || tablet ? "30px" : "144px",
        marginRight: mobile || tablet ? "30px" : "144px",
      }}
      className="pariticipants_list_and_new_request"
    >
      <Row>
        <Col>
          <div className="text-left mt-50">
            <span
              className="add_light_text cursor-pointer breadcrumbItem"
              onClick={() => history.push("/datahub/participants/")}
            >
              {globalConfig?.dynamicLabelling?.participants ?? "Participants"}
            </span>
            <span className="add_light_text ml-16">
              <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#00A94F" }} />
            </span>
            <span className="add_light_text ml-16 fw600">
              {tabValue == 0
                ? isLoggedInUserCoSteward()
                  ? globalConfig?.dynamicLabelling?.participant ?? "Participant"
                  : globalConfig?.dynamicLabelling?.co_steward ?? "Co-steward"
                : tabValue == 1 && isLoggedInUserAdmin()
                ? globalConfig?.dynamicLabelling?.participant ?? "Participant"
                : tabValue == 1 && isLoggedInUserCoSteward()
                ? `New ${
                    globalConfig?.dynamicLabelling?.participants ??
                    "Participants"
                  } requests`
                : `New ${
                    globalConfig?.dynamicLabelling?.participants ??
                    "Participants"
                  } requests`}
            </span>
          </div>
        </Col>
      </Row>
      <Box className="mt-50" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <CustomTabs
          tabValue={tabValue}
          setTabValue={setTabValue}
          TabLabels={tabLabels}
        />
      </Box>
      {isLoggedInUserAdmin() ? (
        <div>
          {tabValue === 0 &&
            (coStewardOrParticipantsList.length === 0 && !isLoading ? (
              <Box p={3}>
                <NoData
                  title={`There are no ${
                    globalConfig?.dynamicLabelling?.co_steward ?? "Co-steward"
                  }`}
                  subTitle={`As of now there are no ${
                    globalConfig?.dynamicLabelling?.co_steward ?? "Co-steward"
                  }, so add ${
                    globalConfig?.dynamicLabelling?.participants?.toLowerCase() ??
                    "participants"
                  } and make them ${
                    globalConfig?.dynamicLabelling?.co_steward ?? "Co-steward"
                  }.`}
                  primaryButton={`Add ${
                    globalConfig?.dynamicLabelling?.participant ?? "Participant"
                  }`}
                  primaryButtonOnClick={() =>
                    history.push("/datahub/participants/add")
                  }
                />
              </Box>
            ) : (
              <CoStewardAndParticipantsCard
                title={
                  globalConfig?.dynamicLabelling?.co_steward ?? "Co-steward"
                }
                subTitle={
                  "Facilitators of secure data sharing networks and community builders."
                }
                viewType={viewType}
                setViewType={setViewType}
                tabIndex={tabValue}
                coStewardOrParticipantsList={coStewardOrParticipantsList}
                loadMoreButton={loadMoreButton}
                handleLoadMoreButton={handleLoadMoreButton}
              />
            ))}
          {tabValue === 1 &&
            (coStewardOrParticipantsList.length === 0 && !isLoading ? (
              <Box p={3}>
                <NoData
                  title={`There are no ${
                    globalConfig?.dynamicLabelling?.participants.toLowerCase() ??
                    "participants"
                  }!`}
                  subTitle={`As of now there are no ${
                    globalConfig?.dynamicLabelling?.participants.toLowerCase() ??
                    "participants"
                  }, so add ${
                    globalConfig?.dynamicLabelling?.participants.toLowerCase() ??
                    "participants"
                  } or invite ${
                    globalConfig?.dynamicLabelling?.participants.toLowerCase() ??
                    "participants"
                  }.`}
                  primaryButton={`Add ${
                    globalConfig?.dynamicLabelling?.participant.toLowerCase() ??
                    "participant"
                  }`}
                  primaryButtonOnClick={() =>
                    history.push("/datahub/participants/add")
                  }
                  secondaryButton={`+ Invite ${
                    globalConfig?.dynamicLabelling?.participants.toLowerCase() ??
                    "participants"
                  }`}
                  secondaryButtonOnClick={() =>
                    history.push("/datahub/participants/invite")
                  }
                />
              </Box>
            ) : (
              <CoStewardAndParticipantsCard
                title={
                  globalConfig?.dynamicLabelling?.participants ?? "Participants"
                }
                subTitle={
                  "Vision-driven organizations committed to making a positive impact."
                }
                viewType={viewType}
                setViewType={setViewType}
                tabIndex={tabValue}
                coStewardOrParticipantsList={coStewardOrParticipantsList}
                loadMoreButton={loadMoreButton}
                handleLoadMoreButton={handleLoadMoreButton}
              />
            ))}
          {tabValue === 2 &&
            (coStewardOrParticipantsList.length === 0 && !isLoading ? (
              <Box p={3}>
                <NoData
                  title={`There are no ${
                    globalConfig?.dynamicLabelling?.participants ??
                    "Participants"
                  } requests!`}
                  subTitle={`As of now there are no ${
                    globalConfig?.dynamicLabelling?.participants ??
                    "Participants"
                  } request!`}
                />
              </Box>
            ) : (
              <CoStewardAndParticipantsCard
                title={`New ${
                  globalConfig?.dynamicLabelling?.participant ?? "participant"
                } requests`}
                subTitle={
                  "Manage requests from organization seeking to join your community."
                }
                viewType={viewType}
                setViewType={setViewType}
                tabIndex={tabValue}
                coStewardOrParticipantsList={coStewardOrParticipantsList}
                loadMoreButton={loadMoreButton}
                handleLoadMoreButton={handleLoadMoreButton}
              />
            ))}
        </div>
      ) : (
        <>
          {tabValue === 0 &&
            (coStewardOrParticipantsList.length === 0 && !isLoading ? (
              <Box p={3}>
                <NoData
                  title={`There are no ${
                    globalConfig?.dynamicLabelling?.participants ??
                    "Participants"
                  }!`}
                  subTitle={`As of now there are no ${
                    globalConfig?.dynamicLabelling?.participants.toLowerCase() ??
                    "participants"
                  }, so add ${
                    globalConfig?.dynamicLabelling?.participants.toLowerCase() ??
                    "participants"
                  } or invite ${
                    globalConfig?.dynamicLabelling?.participants.toLowerCase() ??
                    "participants"
                  }.`}
                  primaryButton={`Add ${
                    globalConfig?.dynamicLabelling?.participant.toLowerCase() ??
                    "participant"
                  }`}
                  primaryButtonOnClick={() =>
                    history.push("/datahub/participants/add")
                  }
                  secondaryButton={`+ Invite ${
                    globalConfig?.dynamicLabelling?.participants.toLowerCase() ??
                    "participants"
                  }`}
                  secondaryButtonOnClick={() =>
                    history.push("/datahub/participants/invite")
                  }
                />
              </Box>
            ) : (
              <CoStewardAndParticipantsCard
                title={
                  globalConfig?.dynamicLabelling?.participants ?? "Participants"
                }
                subTitle={
                  "Vision-driven organizations committed to making a positive impact."
                }
                viewType={viewType}
                setViewType={setViewType}
                tabIndex={tabValue}
                coStewardOrParticipantsList={coStewardOrParticipantsList}
                loadMoreButton={loadMoreButton}
                handleLoadMoreButton={handleLoadMoreButton}
              />
            ))}
          {tabValue === 1 &&
            (coStewardOrParticipantsList.length === 0 && !isLoading ? (
              <Box p={3}>
                <NoData
                  title={`There are no ${
                    globalConfig?.dynamicLabelling?.participant.toLowerCase() ??
                    "participant"
                  } requests!`}
                  subTitle={`As of now there are no ${
                    globalConfig?.dynamicLabelling?.participant.toLowerCase() ??
                    "participant"
                  } requests!`}
                />
              </Box>
            ) : (
              <CoStewardAndParticipantsCard
                title={`New ${
                  globalConfig?.dynamicLabelling?.participants.toLowerCase() ??
                  "participants"
                } requests`}
                subTitle={
                  "Manage requests from organization seeking to join your community."
                }
                viewType={viewType}
                setViewType={setViewType}
                tabIndex={tabValue}
                coStewardOrParticipantsList={coStewardOrParticipantsList}
                loadMoreButton={loadMoreButton}
                handleLoadMoreButton={handleLoadMoreButton}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default ParticipantsAndCoStewardNew;
