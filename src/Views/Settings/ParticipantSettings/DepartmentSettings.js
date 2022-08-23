import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import labels from "../../../Constants/labels";
import Button from "@mui/material/Button";
import THEME_COLORS from "../../../Constants/ColorConstants";
import { useHistory } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import Success from '../../../Components/Success/Success';
import DepartmentSettingsForm from "./DepartmentSettingsForm";
import HTTPService from "../../../Services/HTTPService";
import UrlConstant from "../../../Constants/UrlConstants";
import Footer from "../../../Components/Footer/Footer";

const useStyles = {
    btncolor: { color: "white", "border-color": THEME_COLORS.THEME_COLOR, "background-color": THEME_COLORS.THEME_COLOR, float: "right", "border-radius": 0, "box-shadow": "none" },
    marginrowtop: { "margin-top": "40px", "font-family": "Open Sans", "width": "1300px", "height": "893px" },
    marginrowtop8px: { "margin-top": "8px" },
}

function DepartmentSettings(props) {
    const history = useHistory();
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const [departmentname, setdepartmentname] = useState("") 
    const [departmentdescription, setdepartmentdescription] = useState("") 
    const [isSuccess, setisSuccess] = useState(false);
    const [isLoader, setIsLoader] = useState(false)
    const [resId, setResId] = useState("")

    const addnewdepartment = () => {
    //     // https request
    let Formdata= new FormData()
    Formdata.append("organization", JSON.parse(localStorage.getItem("org_id")))
    Formdata.append("department_name", departmentname)
    Formdata.append("department_discription", departmentdescription)

    //   let data={
    //     "organization": JSON.parse(localStorage.getItem("org_id")),
    //     "department_name": departmentname,
    //     "department_discription": departmentdescription
    //   }
      setIsLoader(true);
      HTTPService(
        'POST',
        UrlConstant.base_url+ "participant/department/",
        Formdata,
        true,
        true).then((response) => {
            console.log(response)
            //let uuid_from_response = response.data.id
            //setResId(uuid_from_response)
            //JSON.stringify(localStorage.setItem("departId", uuid_from_response))
            setisSuccess(true);
            setIsLoader(false);
        }).catch((error) => {
            console.log(error)
            setIsLoader(false);

        })
} 
    return (
        <>
            {isLoader ? <Loader /> : ""}
            <Container style={useStyles.marginrowtop}>
                {isSuccess ? <Success
                    okevent={() => history.push("/participant/settings/")}
                    route={" "}
                    imagename={'success'}
                    btntext={"ok"}
                    heading={"Department added successfully"}
                    imageText={"Success"}
                    msg={"You added a Department"}>
                    </Success> :
                    <> 
                    <DepartmentSettingsForm
                        departmentname={departmentname}
                        setdepartmentname={ref => { setdepartmentname(ref) }}
                        departmentdescription={departmentdescription}
                        setdepartmentdescription={ref => { setdepartmentdescription(ref) }}
                        first_dept_heading={screenlabels.department.heading}
                    ></DepartmentSettingsForm>
                        <Row style={useStyles.marginrowtop8px}>
                            <Col xs={12} sm={12} md={6} lg={3} >
                                </Col>
                            <Col xs={12} sm={12} md={6} lg={6} >
                                {(departmentname && departmentdescription)
                                    ? (
                                        <Button onClick={() => addnewdepartment()} variant="contained" className="submitbtnteam">
                                            {screenlabels.common.submit}
                                        </Button>
                                    ) : (
                                        <Button variant="outlined" disabled className="disbalesubmitbtnteam">
                                            {screenlabels.common.submit}
                                        </Button>
                                    )}
                                    </Col>
                        </Row>
                        <Row style={useStyles.marginrowtop8px}>
                            <Col xs={12} sm={12} md={6} lg={3} >
                                </Col>
                                <Col xs={12} sm={12}  md={6} lg={6}>
                                <Button 
                                // onClick={() => history.push()}
                                 variant="outlined" className="cancelbtnteam">
                                    {screenlabels.common.cancel}
                                </Button>
                            </Col>
                        </Row></>}
            </Container>
            <Footer />
        </>
       
    )          
};

export default DepartmentSettings;
