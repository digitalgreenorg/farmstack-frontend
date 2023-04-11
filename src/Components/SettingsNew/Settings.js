import React from "react";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import AccountSetting from "./AccountSettings";
import OrganisationSettings from "./OrganisationSettings";
import PolicySettings from "./PolicySettings";
import CategorySettings from "./CategorySettings"

export default function Settings(props) {
  const history = useHistory();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(newValue);
  };
  return (
    <Container>
    <Row>
      <Col xs={12} sm={12} md={12} lg={12} className="tabstyle">
        <TabContext value={value} >
          <Box  sx={{
          "& .MuiTabs-indicator": { backgroundColor: "#00AB55 !important" },
          "& .MuiTab-root": {
            color: "#637381 !important",
            borderLeft: "none !important",
            borderTop: "none !important",
            borderRight: "none !important",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            wordWrap: "normal",
            textTransform: "none",
            width: "1352px",
            borderBottom: "1px solid #3D4A52"
          },
          "& .Mui-selected": { color: "#00AB55 !important" },
        }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Account settings" value="1" />
              <Tab label="Organisation settings" value="2" />
              <Tab label="Policy settings" value="3" />
              <Tab label="Categories settings" value="4" />
              <Tab label="Datapoint settings" value="5" />
            </TabList>
            <TabPanel value="1" ><AccountSetting /></TabPanel>
            <TabPanel value="2"><OrganisationSettings /></TabPanel>
            <TabPanel value="3"><PolicySettings /></TabPanel>
            <TabPanel value="4"><CategorySettings /></TabPanel>
            <TabPanel value="5"></TabPanel>
          </Box>
        </TabContext>
      </Col>
    </Row>
    </Container>
  );
}
