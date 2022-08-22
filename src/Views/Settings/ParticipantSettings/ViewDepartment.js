import React from "react";
import  { useState, useEffect } from "react";
import ViewDepartmentForm from "../ParticipantSettings/ViewDepartmentForm";
import labels from "../../../Constants/labels";
import Success from '../../../Components/Success/Success';
import Delete from "../../../Components/Delete/Delete";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Button from "@mui/material/Button";
import THEME_COLORS from "../../../Constants/ColorConstants";
import UrlConstant from "../../../Constants/UrlConstants";
import HTTPService from "../../../Services/HTTPService";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { GetErrorHandlingRoute } from '../../../Utils/Common';
import Footer from "../../../Components/Footer/Footer";
const useStyles = {
    btncolor: { color: "white", "border-color": THEME_COLORS.THEME_COLOR, "background-color": THEME_COLORS.THEME_COLOR, float: "right", "border-radius": 0 },
    btn: { width: "420px", height: "42px", "margin-top": "30px", background: "#ffffff", opacity: "0.5", border: "2px solid #c09507", color: "black" },
    btnPosition: { "text-align": "center"},
    marginrowtop: { "margin-top": "20px" },
    marginrowtop8px: { "margin-top": "8px" }
};

function ViewDepartment(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const [departmentname, setdepartmentname] = useState("");
    const [departmentdescription, setdepartmentdescription] = useState("");
    const [isLoader, setIsLoader] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const [isDeleteSuccess, setisDeleteSuccess] = useState(false);
    const [isDelete, setisDelete] = useState(false)

const history = useHistory();
const { id } = useParams()

useEffect(() => {
    setIsLoader(true);
    console.log("Hello from the other side")
    console.log(id)
    HTTPService(
        'GET',
        UrlConstant.base_url + "participant/department/" + id + "/" ,
        "",
        false,
        true).then((response) => {
            setIsLoader(false);
            console.log(response, "RESPONSEEEEEEEE");
            let arr = [{name:"shurti", desc : "xyz"}];
            console.log(arr[0].name);
            setdepartmentname(response.data[0].department_name)
            setdepartmentdescription(response.data[0].department_discription)
            setisSuccess(true);
        }).catch((e) => {
            setIsLoader(false);
            history.push(GetErrorHandlingRoute(e));
        });
}, []);

const deleteDepartment = () => {
    setIsLoader(true);
    setisDelete(false);
    setisSuccess(false);
    setisDeleteSuccess(true)
    HTTPService(
        "DELETE",
        UrlConstant.base_url + "participant/department/" + id + "/" ,
        "",
        false,
        true).then((response) => {
            console.log(response)
            setIsLoader(false)
            setisDeleteSuccess(true)
            // setisSuccess(true)
            setisDelete(false)
        }).catch((error) => {
            setIsLoader(false)
            history.push(GetErrorHandlingRoute(error));
        });
}
return (
    <>
    <div>
        {isLoader ? <Loader /> : ""}
            {isDelete ? <Delete
                route={"login"}
                imagename={"delete"}
                firstbtntext={"Delete"}
                secondbtntext={"Cancel"}
                deleteEvent={() => deleteDepartment()}
                cancelEvent={() => {
                    setisDelete(false);
                    setisDeleteSuccess(false);
                    history.push("/participant/settings")
                }}
                heading={screenlabels.department.delete_department}
                imageText={screenlabels.department.delete_msg}
                msg={screenlabels.department.second_delete_msg}
                firstmsg={screenlabels.department.second_delete_msg}
                secondmsg={screenlabels.department.third_delete_msg}></Delete>
                : <></>}
            {isDeleteSuccess ? 
                <Success
                    okevent={() => history.push("/participant/settings") }
                    imagename={"success"}
                    btntext={"ok"}
                    heading={"Department deleted successfully!"}
                    imageText={"Deleted!"}
                    msg={"You deleted a Department."}></Success>
            : <></>}
            {isSuccess ? <> 
            
                <ViewDepartmentForm
                    departmentname={departmentname}
                    //setdepartmentname={ref => { setdepartmentname(ref) }}
                    departmentdescription={departmentdescription}
                    // setdepartmentdescription={ref => { setdepartmentdescription(ref) }}
                ></ViewDepartmentForm>
            <Row>
                <Col xs={12} sm={12} md={6} ls={3}>
                </Col>
                <Col xs={12} sm={12} md={6} ls={6}>
                    <Button 
                    onClick={() =>history.push("/participant/settings/editdepartment/" +id) } 
                    variant="outlined" className='editbtn'>
                        <span style={useStyles.btnPosition}>
                        Edit Department
                        </span>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={6} ls={3}>
                </Col>
                <Col xs={12} sm={12} md={6} ls={6}>
                    <Button onClick={() => { setisDelete(true); setisSuccess(false); setisDeleteSuccess(false) }}
                        className="cancelbtn">
                        Delete Department
                    </Button>
                </Col>
            </Row></>:<></>
            }
            <Footer />
    </div>
           </>

);
            };
export default ViewDepartment;

