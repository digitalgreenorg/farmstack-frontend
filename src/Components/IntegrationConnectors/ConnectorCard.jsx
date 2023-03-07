import React from "react";
import Card from "@mui/material/Card";
import { useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@mui/material/Button";
import THEME_COLORS from "../../Constants/ColorConstants";
import UrlConstants from "../../Constants/UrlConstants";
import { useHistory } from "react-router-dom";

const useStyles = {
  btncolor: {
    color: THEME_COLORS.THEME_COLOR,
    "border-color": THEME_COLORS.THEME_COLOR,
    "border-radius": 0,
    "text-transform": "capitalize",
    "border-radius": "2px",
    "text-transform": "capitalize",
    width: "116px",
    height: "34px",
    "margin-left": "-25px",
    "font-weight": "400",
    "font-family": "Open Sans",
    "font-style": "normal",
    "font-size": "14px",
  },
  btnPosition: {
    color: THEME_COLORS.THEME_COLOR,
    "border-color": THEME_COLORS.THEME_COLOR,
    "border-radius": 0,
    "text-transform": "capitalize",
    "border-radius": "2px",
    "text-transform": "capitalize",
    width: "116px",
    height: "34px",
    "margin-right": "-20px",
    "font-weight": "400",
    "font-family": "Open Sans",
    "font-style": "normal",
    "font-size": "14px",
  },
  marginrowtop: { "margin-top": "30px" },
  cardDataHeading: {
    "font-family": "Open Sans",
    "font-weight": "400",
    "font-size": "16px",
    color: "#3D4A52",
    "text-align": "left",
    "padding-left": "10px",
  },
  cardData: {
    "font-family": "Open Sans",
    "font-weight": "600",
    "font-size": "16px",
    color: "#3D4A52",
    "text-align": "left",
    "padding-left": "0px",
    "margin-top": "10px"
  },
  cardDataHead:{"color": "#c09507", 
  'font-family': 'Open Sans', 
  "font-weight": "600",
  "font-size": "24px",
  "font-style":"normal", 
  "width":"272px", 
  "height": "19px", 
  "line-height":"19px",  
  "textAlign": "left", 
  marginBottom: "20px" , 
  "margin-top": "-20px",
  "overflow": "hidden", 
  "text-overflow": "ellipsis",
  "display": "-webkit-box",
"-webkit-line-clamp": "1",
"-webkit-box-orient": "vertical"},
    cardDataUser:{'font-family': 'Open Sans', 
    "font-weight": "400",
    "font-size": "14px",
    "font-style":"normal",
    color: "#3D4A52", 
    "width":"314px", 
    "height": "19px",
    "line-height":"19px", 
    "textAlign": "left", 
    "float" : "left", 
    "padding-left": "5px"},
    header: {height: "84px",
    "text-align": "left",
    "font-family": "Open Sans",
    "font-style": "normal",
    "font-weight": 400,
    "font-size": "14px",
    "line-height": "19px",
    "color": "#9BA0A7",
    "margin-top": "-40px"
},
}

export default function ConnectorCard(props) {
  const history = useHistory();
  return (
    <Card
      // onClick={() => history.push('/datahub/datasets')}
      className="connectorCard"
    >
        <CardHeader
          avatar={
            <Avatar
            src={require('../../Assets/Img/globe.svg')}
            sx={{ width: 15, height: 15,}}
            ></Avatar>
          }
          title={props.firsttext}
          style={useStyles.header}
        />
      <CardContent>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={useStyles.cardDataHead}>
            {props.secondtext}
          </Col>
        </Row>
        <Row
          style={useStyles.cardDataUser}>
            <Col xs={12} sm={12} md={6} lg={6} style={useStyles.cardDataHeading}>
             Used Datasets
             <br />
             <div
                className="width100px text_overflow_ellipsis_overflow_hidden"
                style={useStyles.cardData}
              >
                {props.useddataset > 9 ? props.useddataset : "0"+props.useddataset }
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} style={useStyles.cardDataHeading}>
             Providers
             <br />
             <div
                className="width100px text_overflow_ellipsis_overflow_hidden"
                style={useStyles.cardData}
              >
                {props.providers > 9 ? props.providers : "0" + props.providers}
              </div>
              </Col>
        </Row>
      </CardContent>
    </Card>
  );
}
