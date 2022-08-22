import React from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import labels from "../../../Constants/labels";
import { useState } from "react";

const useStyles = {
    marginrowtop: { "margin-top": "30px" },
    inputwidth: { width: "95%", "text-align": "left", "font-family": "Open Sans", 'width': '420px', "height": '48px', 'left': "65px", },
    inputwidthright: { width: "95%", "text-align": "left", "font-family": "Open Sans", 'width': '420px', "height": '48px', "right": "65px" },
    headingbold: { "fontWeight": "bold" },
    marginrowtophead: { "margin-top": "40px", 'font-weight': "600", 'font-family': 'Open Sans', "width": "202px", "height": "27px", "margin-left": "112px" },
    marginrowtop8px: { "margin-top": "8px" },
    secondleftheading: {"width": "145px", "height": "22px", "font-family": "Open Sans", "font-style": "normal", "font-weight": "600", "line-height": "138.69px", "margin-top": "50px"},
    secondrightheading: {"width": "89px", "height": "22px", "font-family": "Open Sans", "font-style": "normal", "font-weight": "600", "line-height": "138.69px"}
};

export default function ViewDepartmentForm(props) {
    console.log(props, "PROPS")
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    return (
        <>
            <Row>
            <Col className="supportViewDetailsbackimage" >
                <span onClick={() => props.back()}>
                    <img
                        src={require('../../../Assets/Img/Vector.svg')}
                        alt="new"
                     />
                </span>
                <span className="supportViewDetailsback" onClick={() => props.back()}>{"Back"}</span>
                
</Col>
    </Row>

            <Row style={useStyles.marginrowtophead}>
                <span className="mainheading">
                    {screenlabels.department.viewheading}
                </span>

            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={4} lg={4} >
                <span className="secondmainheading" style={useStyles.secondleftheading}>
                        {screenlabels.department.department_name}
                        </span>
                    <span style={useStyles.inputwidth}>
                        {props.departmentname}</span>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4}>
                <span className="secondmainheading" style={useStyles.secondrightheading}>
                        {screenlabels.department.department_description}
                        </span>
                    <span style={useStyles.inputwidthright}>
                        {props.departmentdescription}
                    </span>
                </Col>
            </Row>
            

        </>
    );
}