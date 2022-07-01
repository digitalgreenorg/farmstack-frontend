import React, { useState, useEffect } from 'react';
import AddMemberForm from '../../../Components/Settings/TeamMember/AddMemberForm'
import Success from '../../../Components/Success/Success'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import labels from '../../../Constants/labels';
import Button from "@mui/material/Button";
import THEME_COLORS from '../../../Constants/ColorConstants'
import HTTPService from '../../../Services/HTTPService'
import UrlConstants from '../../../Constants/UrlConstants'
import validator from "validator";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
const useStyles = {
    btncolor: { color: "white", "border-color": THEME_COLORS.THEME_COLOR, "background-color": THEME_COLORS.THEME_COLOR, float: "right", "border-radius": 0 },
    marginrowtop: { "margin-top": "20px" },
    marginrowtop8px: { "margin-top": "8px" },
};
function EditTeamMember(props) {
    const history = useHistory();
    const { id } = useParams()
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [useremail, setuseremail] = useState("");
    const [userrole, setuserrole] = useState("");
    const [isuseremailerror, setisuseremailerror] = useState(false);
    const [isexistinguseremail, setisexisitinguseremail] =useState(false)
    const [isSuccess, setisSuccess] = useState(false);
    useEffect(() => {
        HTTPService('GET', UrlConstants.base_url + UrlConstants.team_member + id + '/', false, false).then((response) => {
            setfirstname(response.data.first_name)
            setlastname(response.data.last_name)
            setuseremail(response.data.email)
            setuserrole(response.data.role)
        }).catch((e) => {
            console.log(e);
        });
    }, []);
    const EditMember = () => {
        // var bodyFormData = new FormData();
        // bodyFormData.append('first_name', firstname);
        // bodyFormData.append('last_name', lastname);
        // bodyFormData.append('email', useremail);
        // bodyFormData.append('role', userrole);
        let data={
            'first_name':firstname,
            'last_name': lastname,
            'email':useremail,
            'role':userrole
        }
        HTTPService('PUT', UrlConstants.base_url + UrlConstants.team_member+ id + '/', data, false, false).then((response) => {
            setisSuccess(true)
        }).catch((e) => {
            console.log(e);
            setisexisitinguseremail(true)
        });
    }
    return (
        <>
            <Container style={useStyles.marginrowtop}>
                {isSuccess ? <Success okevent={()=>history.push('/datahub/settings/3')} route={"datahub/settings"} imagename={'success'} btntext={"ok"} heading={"Team Member updated successfully!!"} imageText={"Success!"} msg={"You updated role of member."}></Success> : 
                <><AddMemberForm
                    firstname={firstname}
                    setfirstname={ref => { setfirstname(ref) }}
                    lastname={lastname}
                    setlastname={ref => { setlastname(ref) }}
                    useremail={useremail}
                    setuseremail={ref => { setuseremail(ref); setisuseremailerror(!validator.isEmail(ref)); setisexisitinguseremail(false) }}
                    isuseremailerror={isuseremailerror}
                    isexistinguseremail={isexistinguseremail}
                    userrole={userrole}
                    setuserrole={ref => { setuserrole(ref) }}
                    first_heading={screenlabels.settings.editheading}
                >
                </AddMemberForm>
                    <Row style={useStyles.marginrowtop8px}>
                        <Col xs={12} sm={12} md={6} lg={3} >
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} >
                            {(firstname && useremail && !isuseremailerror && userrole)
                                ? (
                                    <Button onClick={() => EditMember()} variant="contained" className="submitbtn">
                                        {screenlabels.common.submit}
                                    </Button>
                                ) : (
                                    <Button variant="outlined" disabled className="disbalesubmitbtn">
                                        {screenlabels.common.submit}
                                    </Button>
                                )}
                        </Col>
                    </Row>
                    <Row style={useStyles.marginrowtop8px}>
                        <Col xs={12} sm={12} md={6} lg={3} >
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} >
                            <Button onClick={() => history.push('/datahub/settings/3')} variant="outlined" className="cancelbtn">
                                {screenlabels.common.cancel}
                            </Button>
                        </Col>
                    </Row></>}
            </Container>
        </>
    );
}
export default EditTeamMember;
