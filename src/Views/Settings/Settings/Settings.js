import React, { useState, useEffect } from "react";
import TeamMemberCard from "../../../Components/Settings/TeamMember/TeamMemberCard";
import AddParticipantCard from "../../../Components/Participants/AddParticipantCard";
import AddCard from "../../../Components/AddCard/AddCard";
import Success from "../../../Components/Success/Success";
import Delete from "../../../Components/Delete/Delete";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import labels from "../../../Constants/labels";
import THEME_COLORS from "../../../Constants/ColorConstants";
import UrlConstants from "../../../Constants/UrlConstants";
import { useHistory } from "react-router-dom";
import HTTPService from "../../../Services/HTTPService";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import AccountSetting from "../accounts/accountSetting";
import { useParams } from "react-router-dom";
import PolicySettings from "../PolicySettings/PolicySettings";
const useStyles = {
  btncolor: {
    color: "white",
    "text-transform": "capitalize",
    "border-color": THEME_COLORS.THEME_COLOR,
    "background-color": THEME_COLORS.THEME_COLOR,
    float: "right",
    "border-radius": 0,
  },
  btn: {
    width: "420px",
    height: "42px",
    "margin-top": "30px",
    background: "#ffffff",
    opacity: "0.5",
    border: "2px solid #c09507",
    color: "black",
  },
  marginrowtop: { "margin-top": "20px" },
  marginrowtop50px: { "margin-top": "50px" },
  marginrowtop10px: { "margin-top": "10px" },
  teamword: { "font-weight": 700, "font-size": "20px", "margin-left": "15px" },
};

function Settings(props) {
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  const [teamMemberList, setteamMemberList] = useState([]);
  const [istabView, setistabView] = useState(true);
  const [isDelete, setisDelete] = useState(false);
  const [teamMemberId, setteamMemberId] = useState("");
  const [isDeleteSuccess, setisDeleteSuccess] = useState(false);
  const [isAccountUpdateSuccess, setisAccountUpdateSuccess] = useState(false);
  const [value, setValue] = React.useState("1");
  const [isShowLoadMoreButton, setisShowLoadMoreButton] = useState(false)
  const [memberUrl, setMemberUrl] = useState(UrlConstants.base_url + UrlConstants.team_member)
  const { id } = useParams();

  const history = useHistory();
  useEffect(() => {
    getMemberList();
    if (id) {
      setValue(id);
    } else {
      setValue(1);
    }
  }, []);

  const getMemberList = () => {
    HTTPService(
      "GET",
      memberUrl,
      "",
      false,
      false
    )
      .then((response) => {
        console.log("otp valid", response.data);

        if(response.data.next == null){
          setisShowLoadMoreButton(false)
        } else {
          setisShowLoadMoreButton(true)
          setMemberUrl(response.data.next)
        }
        let dataList = teamMemberList;
        let finalDataList=[...dataList,...response.data.results] 
        setteamMemberList(finalDataList);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteTeamMember = () => {
    // setisDelete(false);
    // setistabView(false);
    // setisDeleteSuccess(true)
    HTTPService(
      "DELETE",
      UrlConstants.base_url + UrlConstants.team_member + teamMemberId + "/",
      "",
      false,
      false
    )
      .then((response) => {
        console.log("otp valid", response.data);
        setisDeleteSuccess(true);
        setistabView(false);
        setisDelete(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Container style={useStyles.marginrowtop}>
        {isDelete ? (
          <Delete
            route={"login"}
            imagename={"delete"}
            firstbtntext={"Delete"}
            secondbtntext={"Cancel"}
            deleteEvent={() => deleteTeamMember()}
            cancelEvent={() => {
              setisDelete(false);
              setistabView(true);
              setisDeleteSuccess(false);
            }}
            heading={screenlabels.settings.delete_member}
            imageText={screenlabels.settings.delete_msg}
            msg={screenlabels.settings.second_delete_msg}></Delete>
        ) : (
          <></>
        )}
        {isDeleteSuccess ? (
          <Success
            okevent={() => {
              setteamMemberId("");
              setisDelete(false);
              setistabView(true);
              setisDeleteSuccess(false);
              getMemberList();
            }}
            imagename={"success"}
            btntext={"ok"}
            heading={"Team Member deleted successfully!"}
            imageText={"Deleted!"}
            msg={"You deleted a member."}></Success>
        ) : (
          <></>
        )}
        {isAccountUpdateSuccess ? (
          <Success
            okevent={() => {
              //   setteamMemberId("");
              //   setisDelete(false);
              setistabView(true);
              setisAccountUpdateSuccess(false);
              //   getMemberList();
            }}
            imagename={"success"}
            btntext={"ok"}
            heading={"Account Settings updated successfully !"}
            imageText={"Success!"}
            msg={"Your account settings are updated."}></Success>
        ) : (
          <></>
        )}
        {istabView ? (
          <Row style={useStyles.marginrowtop50px}>
            <Col xs={12} sm={12} md={12} lg={12} className="settingsTabs">
              <Box>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example">
                      <Tab label="Account Settings" value="1" />
                      <Tab label="Organization Settings" value="2" />
                      <Tab label="Policy Settings" value="3"/>
                      <Tab label="Team Members" value="4" />
                      <Tab label="Customize Design" value="5" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <AccountSetting
                      setisAccountUpdateSuccess={() => {
                        setistabView(false);
                        setisAccountUpdateSuccess(true);
                      }}
                    />
                  </TabPanel>
                  <TabPanel value="2"></TabPanel>
                  <TabPanel value="3">
                      <PolicySettings/>

                  </TabPanel>
                  <TabPanel value="4">
                    <Row>
                      <span style={useStyles.teamword}>Team</span>
                    </Row>
                    <Row style={useStyles.marginrowtop10px}>
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        style={useStyles.marginrowtop10px}>
                        <AddCard
                          firstText={screenlabels.settings.firstText}
                          secondText={screenlabels.settings.secondText}
                          thirdText={screenlabels.settings.thirdText}
                          fourText={screenlabels.settings.fourText}
                          addevent={() =>
                            history.push("/datahub/settings/addmember")
                          }></AddCard>
                      </Col>
                      {teamMemberList.map((rowData, index) => (
                        <Col
                          xs={12}
                          sm={6}
                          md={4}
                          lg={4}
                          style={useStyles.marginrowtop10px}>
                          <TeamMemberCard
                            id={rowData.id}
                            profilepic={rowData.profile_picture}
                            firstname={rowData.first_name}
                            mainheading={
                              rowData.first_name + " " + rowData.last_name
                            }
                            subheading={rowData.email}
                            index={index}
                            role={rowData.role}
                            deleteTeamMember={(id) => {
                              setteamMemberId(id);
                              setisDelete(true);
                              setistabView(false);
                              setisDeleteSuccess(false);
                            }}></TeamMemberCard>
                        </Col>
                      ))}
                    </Row>
                    <Row style={useStyles.marginrowtop}>
                      <Col xs={12} sm={12} md={6} lg={3}></Col>
                      { isShowLoadMoreButton ? 
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <Button onClick={() => getMemberList()} variant="outlined" className="cancelbtn">
                              Load More
                            </Button>
                        </Col>
                        : <></>
                      }
                    </Row>
                  </TabPanel>
                  <TabPanel value="5"></TabPanel>
                </TabContext>
              </Box>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
export default Settings;
