import React, { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Participants from "../../Views/Participants/Participants"
import labels from "../../Constants/labels";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import Button from "@mui/material/Button";
import AddCard from "../../Components/AddCard/AddCard";
import THEME_COLORS from "../../Constants/ColorConstants";
import ParticipantsCards from "../../Components/Participants/ParticipantsCards";
const useStyles = {
  marginrowtoptab50px: { "margin-top": "50px" },
  background: {
    "margin-left": "70px",
    "margin-right": "70px",
    background: "#FCFCFC"
  },
  btncolor: {
    color: "white",
    "text-transform": "capitalize",
    "border-color": THEME_COLORS.THEME_COLOR,
    "background-color": THEME_COLORS.THEME_COLOR,
    float: "right",
    "border-radius": 0,
    "padding-right": "0px",
    "padding-left": "0px",
    width: "200px",
    height: "34px",
    "font-family": "Open Sans",
    "font-style": "normal",
    "font-weight": 700,
    "font-size": "14px",
    "line-height": "19px",
    "margin-bottom": "-20px",
  },
  marginrowtop10px: { "margin-top": "30px" },
}
export default function AdminOnboard(props) {
  console.log("admintabs")
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
};
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  const history = useHistory();
  const [istabView, setistabView] = useState(true);
  const [participantList, setparticipantList] = useState([]);
  const [isShowLoadMoreButton, setisShowLoadMoreButton] = useState(false);
  const [participantUrl, setparticipantUrl] = useState("");
  const [isLoader, setIsLoader] = useState(false);
;

  useEffect(() => {
    setIsLoader(true);
    HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.participant,
      "",
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        console.log("otp valid", response.data);
        if (response.data.next == null) {
          setisShowLoadMoreButton(false);
        } else {
          setisShowLoadMoreButton(true);
          setparticipantUrl(response.data.next);
        }
        setparticipantList(response.data.results);
      })
      .catch((e) => {
        setIsLoader(false);
        history.push(GetErrorHandlingRoute(e));
      });
  }, []);
  const getParticipantList = () => {
    setIsLoader(true);
    HTTPService("GET", participantUrl, "", false, true)
      .then((response) => {
        setIsLoader(false);
        console.log("otp valid", response.data);
        if (response.data.next == null) {
          setisShowLoadMoreButton(false);
        } else {
          setisShowLoadMoreButton(true);
          setparticipantUrl(response.data.next);
        }
        let datalist = participantList;
        let finalDataList = [...datalist, ...response.data.results];
        console.log(datalist);
        setparticipantList(finalDataList);
      })
      .catch((e) => {
        setIsLoader(false);
        history.push(GetErrorHandlingRoute(e));
      });
  };
  return (
    <div
      className="minHeight501pxsettingpagemaindiv"
      style={useStyles.background}>
      {istabView ? <>
        <Row style={useStyles.marginrowtoptab50px}>
          <Col xs={12} sm={12} md={12} lg={12} className="settingsTabs">

            <TabContext value={value} className="tabstyle">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}
                  aria-label="lab API tabs example">
                  <Tab label="Co-Steward" value="1" />
                  <Tab label="Participant" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Row style={useStyles.marginrowtop10px}>
                  <Col xs={12} sm={6} md={4} lg={4} style={useStyles.marginrowtop10px}>
                    <AddCard
                      firstText={screenlabels.coSteward.add_co_steward}
                      secondText={screenlabels.coSteward.add_co_steward_description}
                      addevent={() =>
                        history.push("/datahub/participants/add")
                      }></AddCard>
                  </Col>
                </Row>

              </TabPanel>
              <TabPanel value="2">
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Button
                    onClick={() => history.push("/datahub/participants/invite")}
                    style={useStyles.btncolor}>
                    + Invite participants
                  </Button>
                </Col>
                <Row style={useStyles.marginrowtop10px}>
                  <Col xs={12} sm={6} md={4} lg={4} style={useStyles.marginrowtop10px}>
                    <AddCard
                      firstText={screenlabels.addparticipants.firstText}
                      secondText={screenlabels.addparticipants.secondText}
                      addevent={() =>
                        history.push("/datahub/participants/add")
                      }></AddCard>
                  </Col>
                {participantList.map((rowData, index) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={4}
              style={useStyles.marginrowtop10px}>
              <ParticipantsCards
                dataset={rowData.dataset_count}
                connector={rowData.connector_count}
                active={rowData.user.status ? "Active" : "Inactive"}
                id={rowData.user_id}
                profilepic={rowData.organization.logo}
                firstname={rowData.user.first_name}
                mainheading={rowData.organization.name}
                subheading={
                  rowData.user.first_name + " " + rowData.user.last_name
                }
                index={index}></ParticipantsCards>
            </Col>
          ))}  
           </Row>
           <Row style={{ "margin-top": "10px" }}>
          <Col xs={12} sm={12} md={6} lg={3}></Col>
          {isShowLoadMoreButton ? (
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button
                onClick={() => getParticipantList()}
                variant="outlined"
                className="cancelbtn"
                style={{ "text-transform": "none" }}>
                Load more
              </Button>
            </Col>
          ) : (
            <></>
          )}
        </Row>
              </TabPanel>
            </TabContext>
          </Col>
        </Row>
      </> : <></>}

    </div>
  )
}