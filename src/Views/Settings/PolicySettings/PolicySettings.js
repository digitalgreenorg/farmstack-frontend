import React from 'react'
import { Col, Row } from 'react-bootstrap'
import THEME_COLORS from "../../../Constants/ColorConstants";

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
    teamword: { "font-weight": 700, "font-size": "20px", "margin-left": "15px", "font-family:" :"Open Sans"},
  };


export default function PolicySettings() {
  return (
    <div>
        <Row>
            <span style={useStyles.teamword}>Upload Content</span>
        </Row>
        <Row>
            <Col xs='12' sm='6' md='6' lg='6'>
                
            </Col>
            <Col xs='12' sm='6' md='6' lg='6'>

            </Col>
        </Row>
    </div>
  )
}
