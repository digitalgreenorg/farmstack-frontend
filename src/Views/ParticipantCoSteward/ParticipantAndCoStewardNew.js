import React, { useState, useEffect } from "react";
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

const ParticipantsAndCoStewardNew = () => {
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  const history = useHistory();
  const [participantList, setparticipantList] = useState([]);
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [coStewardUrl, setCoStewardUrl] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [participantListCoSteward, setParticipantListCoSteward] = useState([]);
  const [coStewardParticipantUrl, setcoStewardParticipantUrl] = useState("");
  const [coStewardList, setCoStewardList] = useState([]);

  const [tabValue, setTabValue] = useState(0);
  const [coStewardOrParticipantsList, setCoStewardOrParticipantsList] =
    useState([]);
  const [viewType, setViewType] = useState("list");
  const TabLabels = ["Co-Steward", "Participant", "New Participant Requests"];

  const handleClick = () => {
    console.log("click");
  };

  const handleLoadMoreButton = () => {
    console.log("loadmore clicked");
    getListOnClickOfLoadMore();
  };

  // const getParticipantOnLoad = () => {
  //   setIsLoader(true);
  //   HTTPService(
  //     "GET",
  //     UrlConstant.base_url + UrlConstant.participant,
  //     "",
  //     false,
  //     true
  //   )
  //     .then((response) => {
  //       setIsLoader(false);
  //       console.log("otp valid", response.data);
  //       if (response.data.next == null) {
  //         setLoadMoreButton(false);
  //       } else {
  //         setLoadMoreButton(true);
  //         setLoadMoreUrl(response.data.next);
  //       }
  //       setparticipantList(response.data.results);
  //     })
  //     .catch((e) => {
  //       setIsLoader(false);
  //       //history.push(GetErrorHandlingRoute(e))
  //       console.log(e);
  //     });
  // };
  console.log("tab value", tabValue, "tab value");

  const getCoStewardOrParticipantsOnLoad = (
    unApprovedId,
    approval_endpoint
  ) => {
    console.log("in getCoStewardOrParticipantsOnLoad");
    setIsLoader(true);
    let url =
      tabValue == 0
        ? UrlConstant.base_url + UrlConstant.participant + "?co_steward=true"
        : tabValue == 1
        ? UrlConstant.base_url + UrlConstant.participant
        : UrlConstant.base_url +
          UrlConstant.participant +
          "?approval_status=false";
    if (approval_endpoint)
      url = UrlConstant.participant + unApprovedId + "?approval_status=true";
    HTTPService("GET", url, "", false, true)
      .then((response) => {
        setIsLoader(false);
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
        setIsLoader(false);
        //history.push(GetErrorHandlingRoute(e))
        console.log(e);
      });
  };

  // const getParticipantListOfCoSteward = () => {
  //   setIsLoader(true);

  //   HTTPService(
  //     "GET",
  //     UrlConstant.base_url +
  //       UrlConstant.participant +
  //       "?on_boarded_by=" +
  //       JSON.parse(localStorage.getItem("user")),
  //     "",
  //     false,
  //     true
  //   )
  //     .then((response) => {
  //       setIsLoader(false);

  //       if (response?.data?.next == null) {
  //         setLoadMoreButton(false);
  //       } else {
  //         setLoadMoreButton(true);
  //         if (response?.data?.next)
  //           setcoStewardParticipantUrl(response.data.next);
  //       }
  //       if (response?.data?.results)
  //         setCoStewardOrParticipantsList(response.data.results);
  //     })
  //     .catch((e) => {
  //       setIsLoader(false);
  //       //history.push(GetErrorHandlingRoute(e))
  //       console.log(e);
  //     });
  // };

  const getListOnClickOfLoadMore = () => {
    setIsLoader(true);
    HTTPService("GET", loadMoreUrl, "", false, true)
      .then((response) => {
        setIsLoader(false);
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
        setIsLoader(false);
        //history.push(GetErrorHandlingRoute(e))
        console.log(e);
      });
  };

  // const getCoStewardListOnloadMore = () => {
  //   // let url =
  //   setIsLoader(true);
  //   HTTPService("GET", coStewardUrl, "", false, true)
  //     .then((response) => {
  //       setIsLoader(false);
  //       if (response.data.next == null) {
  //         setLoadMoreButton(false);
  //       } else {
  //         setLoadMoreButton(true);
  //         setCoStewardUrl(response.data.next);
  //       }
  //       let datalist = coStewardList;
  //       let finalDataList = [...datalist, ...response.data.results];
  //       setCoStewardList(finalDataList);
  //     })
  //     .catch((e) => {
  //       setIsLoader(false);
  //       //history.push(GetErrorHandlingRoute(e))
  //       console.log(e);
  //     });
  // };
  // const getParticipantListofCostewardLoadMore = () => {
  //   setIsLoader(true);
  //   HTTPService("GET", coStewardParticipantUrl, "", false, true)
  //     .then((response) => {
  //       setIsLoader(false);
  //       if (response.data.next == null) {
  //         setLoadMoreButton(false);
  //       } else {
  //         setLoadMoreButton(true);
  //         setcoStewardParticipantUrl(response.data.next);
  //       }
  //       let datalist = participantListCoSteward;
  //       let finalDataList = [...datalist, ...response.data.results];
  //       setParticipantListCoSteward(finalDataList);
  //     })
  //     .catch((e) => {
  //       setIsLoader(false);
  //       //history.push(GetErrorHandlingRoute(e))
  //       console.log(e);
  //     });
  // };

  useEffect(() => {
    setCoStewardOrParticipantsList([]);
    getCoStewardOrParticipantsOnLoad();
    console.log("in useeffect");
  }, [tabValue]);
  // useEffect(() => {
  //   // setCoStewardOrParticipantsList([0, 0, 0]);
  //   getCoStewardOrParticipantsOnLoad();
  //   console.log("in useeffect 2");
  // }, []);

  console.log("coStewardOrParticipantsList", coStewardOrParticipantsList);

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
    <Container>
      <Row>
        <Col>
          <Breadcrumbs
            separator={<img src={require("../../Assets/Img/dot.svg")} />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Col>
      </Row>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <CustomTabs
          tabValue={tabValue}
          setTabValue={setTabValue}
          TabLabels={TabLabels}
        />
      </Box>
      {tabValue === 0 &&
        (coStewardOrParticipantsList.length === 0 && !isLoader ? (
          <Box p={3}>
            <NoData
              title={"There is no Co-Stewards"}
              subTitle={
                "As of now there is no co-stewards, so add participants and make them co-steward."
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
        (coStewardOrParticipantsList.length === 0 && !isLoader ? (
          <Box p={3}>
            <NoData
              title={"There is no Participant!"}
              subTitle={
                "As of now there is no participant, so add participants or invite participants."
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
        (coStewardOrParticipantsList.length === 0 && !isLoader ? (
          <Box p={3}>
            <NoData
              title={"There is no Participant requests!"}
              subTitle={"As of now there is no participant request!"}
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
    </Container>
  );
};

export default ParticipantsAndCoStewardNew;
