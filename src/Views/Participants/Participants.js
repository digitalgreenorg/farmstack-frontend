import React, { useState, useEffect } from 'react';
import ParticipantsCards from '../../Components/Participants/ParticipantsCards'
import AddCard from '../../Components/AddCard/AddCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import labels from '../../Constants/labels';
import Button from "@mui/material/Button";
import THEME_COLORS from '../../Constants/ColorConstants'
import UrlConstants from '../../Constants/UrlConstants'
import { useHistory } from "react-router-dom";
import HTTPService from '../../Services/HTTPService'
const useStyles = {
    btncolor: {color: "white","text-transform": "capitalize", "border-color": THEME_COLORS.THEME_COLOR, "background-color": THEME_COLORS.THEME_COLOR, float: "right", "border-radius": 0},
    btn: { width: "420px", height: "42px", "margin-top": "30px", background: "#ffffff", opacity: "0.5", border: "2px solid #c09507", color: "black" },
    marginrowtop: { "margin-top": "20px" },
    marginrowtop10px: { "margin-top": "10px" },
};
function Participants(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const [participantList, setparticipantList] = useState([]);
    const [isShowLoadMoreButton, setisShowLoadMoreButton] = useState(false);
    const [participantUrl, setparticipantUrl] = useState("");
    const history = useHistory();
    useEffect(() => {
        HTTPService('GET',UrlConstants.base_url+UrlConstants.participant, false, false).then((response) => {
            console.log("otp valid", response.data);
            if (response.data.next == null) {
                setisShowLoadMoreButton(false)
            } else {
                setisShowLoadMoreButton(true)
                setparticipantUrl(response.data.next)
            }
            setparticipantList(response.data.results)
        }).catch((e) => {
            console.log(e);
        });
    }, []);
    const getParticipantList = () => {
        HTTPService('GET',participantUrl, false, false).then((response) => {
            console.log("otp valid", response.data);
            if (response.data.next == null) {
                setisShowLoadMoreButton(false)
            } else {
                setisShowLoadMoreButton(true)
                setparticipantUrl(response.data.next)
            }
            let datalist=participantList
            let finalDataList=[...datalist,...response.data.results]
            console.log(datalist)
            setparticipantList(finalDataList)
        }).catch((e) => {
            console.log(e);
        });
      };
    return (
        <>
            <Container style={useStyles.marginrowtop}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Button onClick={() => history.push('/datahub/participants/invite')} style={useStyles.btncolor}>
                            + Invite Participants
                         </Button>
                    </Col>
                </Row>
                <Row style={useStyles.marginrowtop10px}>
                    <Col xs={12} sm={6} md={4} lg={4} style={useStyles.marginrowtop10px}>
                        <AddCard firstText={screenlabels.addparticipants.firstText} secondText={screenlabels.addparticipants.secondText} thirdText={screenlabels.addparticipants.thirdText} fourText={screenlabels.addparticipants.fourText} addevent={() => history.push('/datahub/participants/add')}></AddCard>
                    </Col>
                    {participantList.map((rowData, index) => (
                        <Col xs={12} sm={6} md={4} lg={4} style={useStyles.marginrowtop10px}>
                            <ParticipantsCards
                                dataset={"05"}
                                connector={"DGT"}
                                active={rowData.user.status ? "Inactive" : "Active"}
                                id={rowData.user_id}
                                profilepic={rowData.user.profile_picture}
                                firstname={rowData.user.first_name}
                                mainheading={rowData.organization.name}
                                subheading={rowData.user.first_name + " " + rowData.user.last_name}
                                index={index}
                            ></ParticipantsCards>
                        </Col>
                    ))}
                </Row>
                <Row style={useStyles.marginrowtop}>
                    <Col xs={12} sm={12} md={6} lg={3} >
                    </Col>
                    {isShowLoadMoreButton ? <Col xs={12} sm={12} md={6} lg={6} >
                        <Button onClick={() => getParticipantList()} variant="outlined" className="cancelbtn">
                            Load More
                           </Button>
                    </Col> : <></>}
                </Row>
            </Container>
        </>
    );
}
export default Participants;
