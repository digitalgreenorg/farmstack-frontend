import React, { useState, useMemo } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import labels from '../../Constants/labels';
import countryList from "react-select-country-list";
import { useHistory } from 'react-router-dom';
// import Select from 'react-select'
const useStyles = {
    data: { float: "left","margin-top": "5px" },
    left: {float: "left", "text-align": "left"},
    marginrowtop: {"margin-top": "40px" },
    headingbold:{fontWeight: "bold"}
};
export default function ViewParticipantForm(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const options = useMemo(() => countryList().getData(), [])
    const history = useHistory();
    return (
        <>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={12} lg={12} style={useStyles.left}>
                <div class="link" onClick={()=> history.push('/datahub/participants')}>
                <img
                    src={require('../../Assets/Img/back.svg')}
                    alt="new"
                    style={{width: '16px', height: '16px'}}
                />&nbsp;&nbsp;&nbsp;
                    <span className="backlabel">
                        {screenlabels.common.back}
                    </span>
                </div>
                </Col>
            </Row>
            <hr style={{'margin-left' : '-200px', 'margin-right' : '-200px','margin-top' : '20px', 'border-top': '1px solid rgba(238, 238, 238, 0.5)'}}/>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={12} lg={12} style={useStyles.left}>
                    <span  className="mainheading">
                        {screenlabels.viewparticipants.first_heading}
                    </span>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={4} lg={4} >
                        <span className="secondmainheading" style={useStyles.left}>
                        {screenlabels.viewparticipants.organisation_name}
                        </span><br />
                        <span className="thirdmainheading" style={useStyles.data}>
                            {props.organisationname}
                        </span>

                </Col>
                <Col xs={12} sm={12} md={4} lg={4} >
                    
                        <span className="secondmainheading" style={useStyles.left}>
                        {screenlabels.viewparticipants.website_link}
                        </span><br />
                        <span className="thirdmainheading" style={useStyles.data}>
                            {props.websitelink}
                        </span>

                </Col>
                <Col xs={12} sm={12} md={4} lg={4}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.email}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.orginsationemail}
                    </span>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={4} lg={4}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.organisation_address}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.organisationaddress}
                    </span>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} >
                        <span className="secondmainheading" style={useStyles.left}>
                        {screenlabels.viewparticipants.country}
                        </span><br />
                        <span className="thirdmainheading" style={useStyles.data}>
                            {props.countryvalue}
                        </span>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.pincode}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.pincode}
                    </span>
                </Col>
            </Row>
            <hr className="separatorline"/>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={12} lg={12} style={useStyles.left}>
                <span className="mainheading">
                    {screenlabels.viewparticipants.second_heading}
                </span>
                </Col>
            </Row>

            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={4} lg={4} >
                        <span className="secondmainheading" style={useStyles.left}>
                        {screenlabels.viewparticipants.first_name}
                        </span><br />
                        <span className="thirdmainheading" style={useStyles.data}>
                            {props.firstname}
                        </span>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.last_name}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.lastname}
                    </span>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} >
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.email}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.useremail}
                    </span>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                
                <Col xs={12} sm={12} md={4} lg={4}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.contact_number}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.contactnumber}
                    </span>
                </Col>
            </Row>
            <hr className="separatorline"/>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={12} lg={12}  style={useStyles.left}>
                    <span className="mainheading">
                        {screenlabels.viewparticipants.third_heading}
                    </span>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={12} lg={12} style={useStyles.left}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.subscripiton_length}
                    </span>
                </Col><br />
                <Col xs={12} sm={12} md={12} lg={12}>
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.organisationlength+" Months"}
                    </span>
                </Col>
            </Row>
            <hr className="separatorline"/>
        </>
    );
}
