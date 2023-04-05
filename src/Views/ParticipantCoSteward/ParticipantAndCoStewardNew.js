import React, { useState } from "react";
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

const ParticipantsAndCoStewardNew = () => {
  const [tabValue, setTabValue] = useState(0);
  const [coStewardOrParticipantsData, setCoStewardOrParticipantsData] =
    useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [viewType, setViewType] = useState("list");
  const TabLabels = ["Co-Steward", "Participant", "New Participant Requests"];

  const handleClick = () => {
    console.log("click");
  };

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
        (coStewardOrParticipantsData.length === 0 ? (
          <Box p={3}>
            <NoData
              title={"There is no Co-Stewards"}
              subTitle={
                "As of now there is no co-stewards, so add participants and make them co-steward."
              }
              primaryButton={"Add participant"}
            />
          </Box>
        ) : (
          <CoStewardAndParticipantsCard
            title={"Co-steward"}
            viewType={viewType}
            setViewType={setViewType}
            coStewardOrParticipantsData={coStewardOrParticipantsData}
          />
        ))}
      {tabValue === 1 &&
        (coStewardOrParticipantsData.length === 0 ? (
          <Box p={3}>
            <NoData
              title={"There is no Participant!"}
              subTitle={
                "As of now there is no participant, so add participants or invite participants."
              }
              primaryButton={"Add participant"}
            />
          </Box>
        ) : (
          <CoStewardAndParticipantsCard
            title={"Participants"}
            viewType={viewType}
            setViewType={setViewType}
            coStewardOrParticipantsData={coStewardOrParticipantsData}
          />
        ))}
      {tabValue === 2 && (
        <Box p={3}>
          <Typography>New Participant Requests component goes here</Typography>
        </Box>
      )}
    </Container>
  );
};

export default ParticipantsAndCoStewardNew;
