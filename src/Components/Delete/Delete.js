import React, { useState, useMemo } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "@mui/material/Button";
import THEME_COLORS from '../../Constants/ColorConstants'
import { useHistory } from "react-router-dom";
// import Select from 'react-select'
const useStyles = {
    btncolor: {color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": 0},
    btn:{ width: "420px", height: "42px", "margin-top": "30px", background: "#ffffff", opacity: "0.5", border: "2px solid #c09507", color: "black" },
    marginrowtop: {"margin-top": "20px"},
    headingbold:{fontWeight: "bold"},
    headingcolorbold:{fontWeight: "bold",color: THEME_COLORS.THEME_COLOR}
};
export default function Delete(props) {
    const history = useHistory();
    return (
        <>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={12} lg={12} >
                    <span className="mainheadingsuccess">
                        {props.heading}
                    </span>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={12} lg={12} >
                    <img
                        src={require('../../Assets/Img/'+ props.imagename +'.svg')}
                        alt="new"
                    />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} style={useStyles.marginrowtop}>
                    <span className="secondmainheadingsuccess">
                    {props.imageText}
                    </span>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={12} lg={12} >
                    <span className="thirdmainheadingsuccess">
                    {props.msg}
                    </span>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={12} lg={12} >
                    <Button  onClick={()=>props.deleteEvent()} variant="contained" className="submitbtn">
                        <span>{props.firstbtntext}</span>
                    </Button>
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={12} lg={12} >
                    <Button  onClick={()=>props.cancelEvent()} variant="outlined" className="cancelbtn">
                        <span>{props.secondbtntext}</span>
                    </Button>
                </Col>
            </Row>
        </>
    );
}
