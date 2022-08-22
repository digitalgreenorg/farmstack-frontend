import * as React from 'react'
import CardHeader from '@mui/material/CardHeader';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import THEME_COLORS from "../../../Constants/ColorConstants";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Button from "@mui/material/Button";

const useStyles = {
    btncolor: { color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": "2px", "text-transform": "capitalize", "width": "116px", "height": "34px", "margin-right": "-20px", "font-weight": "400", "font-family": "Open Sans"},
    btnPosition: {color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": "2px" ,"text-transform": "capitalize", "border-radius": "2px",  "width": "116px", "height": "34px", "font-weight": "400", "font-family": "Open Sans", 'font-style': 'normal', 'font-size': '14px', "margin-left": "198px", "margin-top": "10px"},
    cardcolor:{border: "1px solid #E4E4E4","box-shadow": "none",cursor:"pointer",'min-height': "240px","width": "350px","border-radius": "2px"}, 
    togglecardcolor:{"box-shadow": "0px 4px 20px rgba(216, 175, 40, 0.28)", border: "1px solid #D8AF28",cursor:"pointer",'min-height': "240px","width": "350px"}, 
    marginrowtop: {"margin-top": "30px"},
    cardDataHeading:{'font-family': 'Open Sans', "font-weight": "600","font-size": "14px",color: "#3D4A52", "text-align": "left", 'padding-left': '10px' },
    cardData:{'font-family': 'Open Sans', "font-weight": "400","font-size": "14px",color: "#3D4A52", "text-align": "left", 'margin-top': '10px', "margin-left": "5px", "margin-right":"5px", "width": "314px", "height": "76px", "line-height": "19.42px"},
    cardDataHead:{'font-family': 'Open Sans', "font-weight": "600","font-size": "14px","font-style":"normal",color: "#3D4A52", "width":"150px", "height": "19px", "line-height":"19px",  "textAlign": "left"},
    cardDataUser:{'font-family': 'Open Sans', "font-weight": "400","font-size": "14px","font-style":"normal",color: "#3D4A52", "width":"314px", "height": "19px","line-height":"19px", "textAlign": "left", "margin-top": "11px",  "margin-left": "5px", "margin-right":"5px"}
  };

  export default function DepartmentSettingsCard(props) {
    const[isshowbutton, setisshowbutton] = useState(false);
    const history = useHistory();
     
  return (
    <Card className="particaipancard" style={!isshowbutton?useStyles.cardcolor:useStyles.togglecardcolor} onMouseEnter={()=>setisshowbutton(true)} onMouseLeave={()=>setisshowbutton(false)}>
    <CardHeader
     title={"Department"}
     subheader={props.department_name}
     style={{ "background-color": "#F4F4F4", padding: "9px", height: "84px", "text-align": "left", 'font-family': 'Open Sans',
          'font-style': 'normal', 'font-weight': 400, 'font-size': '14px' ,'line-height': '19px' ,'color': '#3D4A52'}}
        />
        <CardContent>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} style={useStyles.cardDataHead}>
                       Description
                    </Col>
                </Row>
                <Row
                    style={useStyles.cardDataUser}>
                    {props.departmentdescription}
                </Row>
                <Row>
                    {isshowbutton ? 
                    <Col xs={12} sm={12} md={6} lg={6}>
                            <Button  
                            onClick={() => history.push('/participant/settings/viewdepartment/'+props.id)}
                            variant="outlined" style={useStyles.btnPosition}>
                                View Details
                            </Button>
                        </Col>: <></>}
                     </Row>
     </CardContent>
    </Card>
  )
                    }