import React from "react";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import AccountSetting from "./AccountSettings";
import OrganisationSettings from "./OrganisationSettings";
import PolicySettings from "./PolicySettings";
import CategorySettings from "./CategorySettings";
import DatapointSettings from "./DatapointSettings";
import {
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import LocalStyle from "./Settings.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Settings(props) {
  const history = useHistory();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(newValue);
  };
  return (
    <div>
      <TabContext value={value}>
        <Box
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#00AB55 !important" },
            "& .MuiTab-root": {
              color: "#637381 !important",
              borderLeft: "none !important",
              borderTop: "none !important",
              borderRight: "none !important",
              display: "flex !important",
              flexDirection: "column !important",
              alignItems: "center !important",
              wordWrap: "normal !important",
              textTransform: "none !important",
              minWidth: "220px !important",
              borderBottom: "1px solid #3D4A52",
              fontWeight: "400",
              fontSize: "16px !important",
              fontFamily: "Montserrat !important",
              lineHeight: "22px",
            },
            "& .Mui-selected": { color: "#00AB55 !important" },
          }}
        >
          <Row style={{ margin: "0 144px" }}>
            <Col>
              <div className="text-left mt-50">
                <span
                  className="add_light_text cursor-pointer breadcrumbItem"
                  onClick={() => history.push("/datahub/settings/:1")}
                >
                  Settings
                </span>
                <span className="add_light_text ml-16">
                  <ArrowForwardIosIcon
                    sx={{ fontSize: "14px", fill: "#00ab55" }}
                  />
                </span>
                <span className="add_light_text ml-16 fw600">
                  {value == 1
                    ? "Account settings"
                    : value == 2
                    ? "Organisation settings"
                    : value == 3
                    ? "Policy settings"
                    : value == 4
                    ? "Categories settings"
                    : value == 5
                    ? "Datapoint settings"
                    : ""}
                </span>
              </div>
            </Col>
          </Row>
          <Container>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Account settings"
                value="1"
                id={`1account-settings`}
              />
              <Tab label="Organisation settings" value="2" id="org-settings" />
              <Tab
                label={
                  !isLoggedInUserCoSteward() && !isLoggedInUserParticipant()
                    ? "Policy settings"
                    : ""
                }
                value="3"
                id="policy-settings"
              />
              <Tab
                label={
                  !isLoggedInUserCoSteward() && !isLoggedInUserParticipant()
                    ? "Categories settings"
                    : ""
                }
                value="4"
                id="category-settings"
              />
              <Tab
                label={
                  !isLoggedInUserCoSteward() && !isLoggedInUserParticipant()
                    ? "Datapoint settings"
                    : ""
                }
                value="5"
                id="datapoint-settings"
              />
            </TabList>
          </Container>
          <TabPanel value="1">
            <AccountSetting />
          </TabPanel>
          <TabPanel value="2">
            <OrganisationSettings />
          </TabPanel>
          <TabPanel value="3">
            <PolicySettings />
          </TabPanel>
          <TabPanel value="4">
            <CategorySettings />
          </TabPanel>
          <TabPanel value="5">
            <DatapointSettings />
          </TabPanel>
        </Box>
      </TabContext>
    </div>
  );
}
