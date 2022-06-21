import React, { useState, useMemo } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import labels from '../../Constants/labels';
import countryList from "react-select-country-list";
// import Select from 'react-select'
const useStyles = {
    data: { float: "left","font-size": "14px", "margin-top": "5px" },
    left: {float: "left"},
    marginrowtop: {"margin-top": "20px" },
    headingbold:{fontWeight: "bold"}
};
export default function ViewParticipantForm(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const options = useMemo(() => countryList().getData(), [])
    return (
        <>
            <Row style={useStyles.marginrowtop}>
                <span  className="mainheading">
                    {screenlabels.viewparticipants.first_heading}
                </span>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Col xs={12} sm={12} md={12} lg={12} style={useStyles.left}>
                        <span className="secondmainheading" style={useStyles.left}>
                        {screenlabels.viewparticipants.organisation_name}
                        </span>
                    </Col><br />
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <span className="thirdmainheading" style={useStyles.data}>
                            {props.organisationname}
                        </span>
                    </Col>

                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.email}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.orginsationemail}
                    </span>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Col xs={12} sm={12} md={12} lg={12} style={useStyles.left}>
                        <span className="secondmainheading" style={useStyles.left}>
                        {screenlabels.viewparticipants.website_link}
                        </span>
                    </Col><br />
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <span className="thirdmainheading" style={useStyles.data}>
                            {props.websitelink}
                        </span>
                    </Col>

                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.organisation_address}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.organisationaddress}
                    </span>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Col xs={12} sm={12} md={12} lg={12} style={useStyles.left}>
                        <span className="secondmainheading" style={useStyles.left}>
                        {screenlabels.viewparticipants.country}
                        </span>
                    </Col><br />
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <span className="thirdmainheading" style={useStyles.data}>
                            {props.countryvalue}
                        </span>
                    </Col>

                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.pincode}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.pincode}
                    </span>
                </Col>
            </Row>
            <hr/>
            <Row style={useStyles.marginrowtop}>
                <span className="mainheading">
                    {screenlabels.viewparticipants.second_heading}
                </span>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Col xs={12} sm={12} md={12} lg={12} style={useStyles.left}>
                        <span className="secondmainheading" style={useStyles.left}>
                        {screenlabels.viewparticipants.first_name}
                        </span>
                    </Col><br />
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <span className="thirdmainheading" style={useStyles.data}>
                            {props.firstname}
                        </span>
                    </Col>

                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.last_name}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.lastname}
                    </span>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Col xs={12} sm={12} md={12} lg={12} style={useStyles.left}>
                        <span className="secondmainheading" style={useStyles.left}>
                        {screenlabels.viewparticipants.email}
                        </span>
                    </Col><br />
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <span className="thirdmainheading" style={useStyles.data}>
                            {props.useremail}
                        </span>
                    </Col>

                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <span className="secondmainheading" style={useStyles.left}>
                    {screenlabels.viewparticipants.contact_number}
                    </span><br />
                    <span className="thirdmainheading" style={useStyles.data}>
                        {props.contactnumber}
                    </span>
                </Col>
            </Row>
            <hr/>
            <Row style={useStyles.marginrowtop}>
                <span className="mainheading">
                    {screenlabels.viewparticipants.third_heading}
                </span>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
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

                </Col>
            </Row>
            <hr/>
        </>
    );
}
