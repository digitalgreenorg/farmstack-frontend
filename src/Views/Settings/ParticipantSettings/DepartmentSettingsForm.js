import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import THEME_COLORS from "../../../Constants/ColorConstants";
import labels from "../../../Constants/labels";
import RegexConstants from "../../../Constants/RegexConstants";
import { validateInputField } from "../../../Utils/Common";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
const useStyles = {
    btncolor: { color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": 0 },
    marginrowtop: { "margin-top": "30px" },
    inputwidth: { width: "95%", "text-align": "left", "font-family": "Open Sans", 'width': '420px', "height": '48px', 'left': "65px", },
    inputwidthright: { width: "95%", "text-align": "left", "font-family": "Open Sans", 'width': '420px', "height": '48px', "right": "65px" },
    headingbold: { "fontWeight": "bold"},
    marginrowtophead: { "margin-top": "40px", 'font-weight': "600", 'font-family': 'Open Sans', "width": "202px", "height": "27px", "margin-left": "122px" },

};


//    departmentname={departmentname}
// setdepartmentname={ref => { setdepartmentname(ref) }}
// departmentdescription={departmentdescription}
// setdepartmentdescription={ref => { setdepartmentdescription(ref) }}
// first_dept_heading={screenlabels.department.heading}
export default function DepartmentSettingsForm(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const history = useHistory();
    // console.log(props, "PROPS")
    return (
      <>
      <Row>
        <Col className="supportViewDetailsbackimage">
          <span
            onClick={() => {
              history.push("/participant/settings");
            }}>
            <img src={require("../../../Assets/Img/Vector.svg")} alt="new" />
          </span>
          <span
            className="supportViewDetailsback"
            onClick={() => {
              history.push("/participant/settings");
            }}>
            {"Back"}
            </span>
            </Col>
            </Row>
            <Row style={useStyles.marginrowtophead}>
                <span className="mainheading">
                    {props.first_dept_heading}
                </span>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <TextField
                        style={useStyles.inputwidth}
                        id="filled-basic"
                        variant="filled"
                        maxRows={1}
                        required
                        label={screenlabels.department.department_name}
                        value={props.departmentname}
                        onChange={(e) => validateInputField(e.target.value, RegexConstants.DES_SET_REGEX) ? props.setdepartmentname(e.target.value.trim()) : e.preventDefault()}
                    />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        style={useStyles.inputwidthright}
                        id="filled-textarea"
                        variant="filled"
                        maxRows={4}
                        required
                        label={screenlabels.department.description}
                        value={props.departmentdescription}
                        onChange={(e) => validateInputField(e.target.value, RegexConstants.DES_SET_REGEX) ? props.setdepartmentdescription(e.target.value.trim()) : e.preventDefault()}
                    />
                </Col>
            </Row>
        </>
    );
}
