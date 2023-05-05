import React, { useState, useEffect, useContext } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/system";
import { Col, Container, Row } from "react-bootstrap";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabs from "../../Components/Tabs/Tabs";
import NoData from "../../Components/NoData/NoData";
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants.js";
import HTTPService from "../../Services/HTTPService";
import labels from "../../Constants/labels";
import { useHistory } from "react-router-dom";
import UrlConstant from "../../Constants/UrlConstants";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import {
  GetErrorHandlingRoute,
  getUserLocal,
  goToTop,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
} from "../../Utils/Common";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const ParticipantsAndCoStewardNew = () => {
  const { callLoader, callToast, isLoading } = useContext(FarmStackContext);
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  const history = useHistory();
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [coStewardOrParticipantsList, setCoStewardOrParticipantsList] =
    useState([]);
  const [viewType, setViewType] = useState("grid");
  let [tabLabels, setTabLabels] = useState([
    "Participant",
    "New Participant Requests",
  ]);

  const handleClick = () => {
    console.log("click");
  };

  const handleLoadMoreButton = () => {
    console.log("loadmore clicked");
    getListOnClickOfLoadMore();
  };

  console.log("tab value", tabValue, "tab value");

  const getCoStewardOrParticipantsOnLoad = (
    unApprovedId,
    approval_endpoint
  ) => {
    console.log("in getCoStewardOrParticipantsOnLoad");
    // setIsLoading(true);
    callLoader(true);
    let params = {};
    let url = UrlConstant.base_url + UrlConstant.participant;
    if (tabValue == 0) {
      params = { co_steward: "True" };
    } else if (tabValue == 2) {
      params = { approval_status: "False" };
    }
    // +
    // "?approval_status=False";
    if (approval_endpoint) {
      url = UrlConstant.participant + unApprovedId + "?approval_status=True";
    }
    // if (tabValue != 0 || tabValue != 1) params = { approval_status: "False" };

    if (isLoggedInUserCoSteward()) {
      params = {};

      if (tabValue == 0) {
        params = { on_boarded_by: getUserLocal() };
      } else if (tabValue == 1) {
        params = { approval_status: "False", on_boarded_by: getUserLocal() };
      }

      // params = { on_boarded_by: getUserLocal() };
      // tabValue == 1 ? (params[approval_status] = "False") : "";
    }
    console.log("in api call checking tab", tabValue, params);
    HTTPService("GET", url, params, false, true)
      .then((response) => {
        callLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        if (response?.data?.results)
          setCoStewardOrParticipantsList(response.data.results);
      })
      .catch((e) => {
        callLoader(false);
        let error = GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        callToast(error.message, "error", true);
        console.log(e);
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
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        let datalist = coStewardOrParticipantsList;
        if (response?.data?.next) {
          let finalDataList = [...datalist, ...response.data.results];
          setCoStewardOrParticipantsList(finalDataList);
        }
      })
      .catch((e) => {
        callLoader(false);
        let error = GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        callToast(error.message, "error", true);
        console.log(e);
      });
  };

  useEffect(() => {
    setCoStewardOrParticipantsList([]);
    getCoStewardOrParticipantsOnLoad();
  }, [tabValue]);

  useEffect(() => {
    if (isLoggedInUserAdmin()) {
      setTabLabels(["Co-Steward", "Participant", "New Participant Requests"]);
      // console.log();
    }
    goToTop(0);
  }, []);

  console.log("is login user", isLoggedInUserAdmin());

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/datahub/participants/"
      onClick={handleClick}
    >
      Participant
    </Link>,
    <Typography key="3" color="text.primary">
      Co-Steward
    </Typography>,
  ];

  return (
    <Container style={{ marginLeft: "144px", marginRight: "144px" }}>
      <Row>
        <Col>
          <div className="text-left mt-50">
            <span
              className="add_light_text cursor-pointer breadcrumbItem"
              onClick={() => history.push("/datahub/participants/")}
            >
              Participant
            </span>
            <span className="add_light_text ml-16">
              {/* <img src={require("../../Assets/Img/dot.svg")} /> */}
              <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#00ab55" }} />
            </span>
            <span className="add_light_text ml-16 fw600">
              {tabValue == 0
                ? "Co-Steward"
                : tabValue == 1
                ? "Participant"
                : "New Participants requests"}
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
        <>
          {tabValue === 0 &&
            (coStewardOrParticipantsList.length === 0 && !isLoading ? (
              <Box p={3}>
                <NoData
                  title={"There are no Co-Stewards"}
                  subTitle={
                    "As of now there are no co-stewards, so add participants and make them co-steward."
                  }
                  primaryButton={"Add participant"}
                  primaryButtonOnClick={() =>
                    history.push("/datahub/participants/add")
                  }
                />
              </Box>
            ) : (
              <CoStewardAndParticipantsCard
                title={"Co-steward"}
                viewType={viewType}
                setViewType={setViewType}
                coStewardOrParticipantsList={coStewardOrParticipantsList}
                loadMoreButton={loadMoreButton}
                handleLoadMoreButton={handleLoadMoreButton}
              />
            ))}
          {tabValue === 1 &&
            (coStewardOrParticipantsList.length === 0 && !isLoading ? (
              <Box p={3}>
                <NoData
                  title={"There are no Participants!"}
                  subTitle={
                    "As of now there are no participants, so add participants or invite participants."
                  }
                  primaryButton={"Add participant"}
                  primaryButtonOnClick={() =>
                    history.push("/datahub/participants/add")
                  }
                  secondaryButton={"+ Invite participants"}
                  secondaryButtonOnClick={() =>
                    history.push("/datahub/participants/inviteparticipants")
                  }
                />
              </Box>
            ) : (
              <CoStewardAndParticipantsCard
                title={"Participants"}
                viewType={viewType}
                setViewType={setViewType}
                coStewardOrParticipantsList={coStewardOrParticipantsList}
                loadMoreButton={loadMoreButton}
                handleLoadMoreButton={handleLoadMoreButton}
              />
            ))}
          {tabValue === 2 &&
            (coStewardOrParticipantsList.length === 0 && !isLoading ? (
              <Box p={3}>
                <NoData
                  title={"There are no Participant requests!"}
                  subTitle={"As of now there are no participants request!"}
                  // primaryButton={"Add participant"}
                />
              </Box>
            ) : (
              <CoStewardAndParticipantsCard
                title={"New participant requests"}
                viewType={viewType}
                setViewType={setViewType}
                coStewardOrParticipantsList={coStewardOrParticipantsList}
                loadMoreButton={loadMoreButton}
                handleLoadMoreButton={handleLoadMoreButton}
              />
            ))}
        </>
      ) : (
        <>
          {tabValue === 0 &&
            (coStewardOrParticipantsList.length === 0 && !isLoading ? (
              <Box p={3}>
                <NoData
                  title={"There are no Participants!"}
                  subTitle={
                    "As of now there are no participant, so add participants or invite participants."
                  }
                  primaryButton={"Add participant"}
                  primaryButtonOnClick={() =>
                    history.push("/datahub/participants/add")
                  }
                  secondaryButton={"+ Invite participants"}
                  secondaryButtonOnClick={() =>
                    history.push("/datahub/participants/inviteparticipants")
                  }
                />
              </Box>
            ) : (
              <CoStewardAndParticipantsCard
                title={"Participants"}
                viewType={viewType}
                setViewType={setViewType}
                coStewardOrParticipantsList={coStewardOrParticipantsList}
                loadMoreButton={loadMoreButton}
                handleLoadMoreButton={handleLoadMoreButton}
              />
            ))}
          {tabValue === 1 &&
            (coStewardOrParticipantsList.length === 0 && !isLoading ? (
              <Box p={3}>
                <NoData
                  title={"There are no Participant requests!"}
                  subTitle={"As of now there are no participant requests!"}
                  // primaryButton={"Add participant"}
                />
              </Box>
            ) : (
              <CoStewardAndParticipantsCard
                title={"New participant requests"}
                viewType={viewType}
                setViewType={setViewType}
                coStewardOrParticipantsList={coStewardOrParticipantsList}
                loadMoreButton={loadMoreButton}
                handleLoadMoreButton={handleLoadMoreButton}
              />
            ))}
        </>
      )}
    </Container>
  );
};

export default ParticipantsAndCoStewardNew;
