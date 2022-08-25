import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import UrlConstant from '../../../../Constants/UrlConstants';
import HTTPService from '../../../../Services/HTTPService';
import { GetErrorHandlingRoute } from '../../../../Utils/Common';

export default function ProjectDetailView(props) {

    const useStyles = {
        datasetdescription: {
            "margin-left": "0px",
            "margin-right": "0px",
            "font-family": "Open Sans",
            "font-style": "normal",
            "font-weight": "400",
            "font-size": "14px",
            "line-height": "19px",
            overflow: "hidden",
            "text-overflow": "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": "1",
            "-webkit-box-orient": "vertical",
            float: "left",
            width: "300px",
        },
    };

    const [isLoader, setIsLoader] = useState(false)
    const [projectName, setProjectName] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [departmentName, setDepartmentName] = useState("")
    const history = useHistory()
    const { id } = useParams()

    useEffect(()=>{
        getProjectDetails()
    },[])

    const getProjectDetails = () => {
        
        console.log("Project Id: ", id)
        setIsLoader(true);
        
        HTTPService(
            "GET",
            UrlConstant.base_url + UrlConstant.project_list + id + '/',
            '',
            true,
            true
        )
            .then((response) => {
                setIsLoader(false);
                console.log(response.data)

                setProjectName(response.data[0].project_name)
                setProjectDescription(response.data[0].project_discription)
                setDepartmentName(response.data[0].department.department_name)

                // console.log("projectDetails", projectDetails)
            }).catch((e) => {
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }
    
  return (
    <>
        <Row>
            <Col className="supportViewDetailsbackimage" >
                <span onClick={() => history.push('/participant/settings/5')}>
                    <img
                        src={require('../../../../Assets/Img/Vector.svg')}
                        alt="new"
                    />
                </span>
                <span className="supportViewDetailsback" onClick={() => history.push('/participant/settings/5')}>{"Back"}</span>
            </Col>
        </Row>
        <Row className="supportViewDeatilsSecondRow"></Row>
            <Row style={{ "margin-left": "93px", "margin-top": "30px" }}>
                <span className="mainheading">{"Project Details"}</span>
            </Row>
            <Row style={{ "margin-left": "79px", "margin-top": "30px", "text-align": "left" }}>
                <Col>
                    <span className="secondmainheading">{"Department Name"}</span>
                </Col>
                <Col>
                    <span className="secondmainheading">{"Project Name"}</span>
                </Col>
                <Col>
                    <span className="secondmainheading">{"Description"}</span>
                </Col>
            </Row>
            <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                <Col>
                    {/* <Tooltip title={props.data['connector_name']}> */}
                        <Row style={useStyles.datasetdescription}>
                            <span className="thirdmainheading">{departmentName}</span>
                        </Row>
                    {/* </Tooltip> */}
                </Col>
                <Col>
                    <span className="thirdmainheading">{projectName}</span>
                </Col>
                <Col>
                    {/* <Tooltip title={props.data['dataset_details']['name']}> */}
                        <Row style={useStyles.datasetdescription}>
                            <span className="thirdmainheading">{projectDescription}</span>
                        </Row>
                    {/* </Tooltip> */}
                </Col>
            </Row>
    </>
  )
}
