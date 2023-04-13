import React from "react";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import AccountSetting from "./AccountSettings";
import OrganisationSettings from "./OrganisationSettings";
import PolicySettings from "./PolicySettings";
import CategorySettings from "./CategorySettings"
import ProfileDetails from "../NewOnboarding/ProfileDetails";
import OrganizationDetails from "../NewOnboarding/OrganizationDetails";
import DatapointSettings from "./DatapointSettings";


export default function Settings(props) {
  const history = useHistory();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(newValue);
  };
  return (
  
      <div >
        <TabContext value={value} >
          <Box  sx={{
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
            lineHeight: "22px"
          },
          "& .Mui-selected": { color: "#00AB55 !important" },
        }}>
           <Container>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Account settings" value="1" />
              <Tab label="Organisation settings" value="2" />
              <Tab label="Policy settings" value="3" />
              <Tab label="Categories settings" value="4" />
              <Tab label="Datapoint settings" value="5" />
            </TabList>
            </Container>
            <TabPanel value="1" >
              <AccountSetting />
            </TabPanel>
            <TabPanel value="2"><OrganisationSettings /></TabPanel>
            <TabPanel value="3"><PolicySettings /></TabPanel>
            <TabPanel value="4"><CategorySettings /></TabPanel>
            <TabPanel value="5"><DatapointSettings /></TabPanel>
          </Box>
        </TabContext>
      </div>

  );
}
