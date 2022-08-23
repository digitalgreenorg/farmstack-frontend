import React, { useEffect, useState } from 'react'
import ProjectCard from '../../../../Components/Projects/ProjectCard'
import './ProjectListing.css'
import { Col, Row } from 'react-bootstrap'
import AddProjectCard from '../../../../Components/Projects/AddProjectCard'
import NoProjectCard from '../../../../Components/Projects/NoProjectCard'
import UrlConstant from "../../../../Constants/UrlConstants";
import { GetErrorHandlingRoute, getOrgLocal } from '../../../../Utils/Common'
import HTTPService from '../../../../Services/HTTPService'
import { useHistory } from 'react-router-dom'
import Button from "@mui/material/Button";
import Loader from '../../../../Components/Loader/Loader'

export default function ProjectListing() {

    const [isLoader, setIsLoader] = useState(false)
    const history = useHistory()

    const [projectUrl, setProjectUrl] = useState(UrlConstant.base_url+UrlConstant.project_list)
    const [showLoadMore, setShowLoadMore] = useState(true)

    const [projectList, setProjectList] = useState([])

    useEffect(()=>{
        // getProjectList(false)
    },[])

    const getProjectList = (isLoadMore) => {

        setIsLoader(true);

        var payload = {}
        payload['org_id'] = getOrgLocal()

        HTTPService(
            "POST",
            isLoadMore ? projectUrl : UrlConstant.base_url+UrlConstant.project_list,
            payload,
            false,
            true
        )
            .then((response) => {
                setIsLoader(false);
                console.log("response:", response)
                console.log("project:", response.data.results)

                if (response.data.next == null) {
                    setShowLoadMore(false)
                    setProjectUrl(UrlConstant.base_url+UrlConstant.project_list)
                } else {
                    setProjectUrl(response.data.next)
                    setShowLoadMore(true)
                }
                let finalDataList = []
                if (isLoadMore) {
                    finalDataList = [...projectList, ...response.data.results]
                } else {
                    finalDataList = response.data.results
                }
                setProjectList(finalDataList)
            })
            .catch((e) => {
                console.log(e)
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }

    const viewCardDetails = (id) => {

    } 

  return (
    <>
        {isLoader ? <Loader /> : ''}
        <div className='projects'>
            <Row>
                <span style={{ "font-weight": "700", "font-size": "20px", "margin-left": "20px", "margin-top": "30px", "margin-bottom": "20px", "font-style": "normal", "font-family": "Open Sans" }}>
                    My Projects
                </span>
            </Row>
            <Row>
                <AddProjectCard addevent={() => history.push("/participant/connectors/add")}/>
                {
                    (!projectList || projectList.length == 0) &&
                    <NoProjectCard/>
                }
                {
                    projectList && projectList.length > 0 && projectList.map((project)=>(
                        <ProjectCard
                        // margingtop={'supportcard supportcardmargintop20px'}
                        departmentName={project.department_name}
                        projectName={project.project_name}
                        description={project.description}
                        viewCardDetails={()=>viewCardDetails(project.id)}
                        />
                    ))
                }
                <ProjectCard
                    departmentName={"Sample Department Name"}
                    projectName={"Sample Project Name Blah"}
                    description={"Sample Description blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah"}
                />
                <ProjectCard
                    departmentName={"Sample Department Name"}
                    projectName={"Sample Project Name Blah"}
                    description={"Sample Description"}
                />
                <ProjectCard
                    departmentName={"Sample Department Name"}
                    projectName={"Sample Project Name Blah"}
                    description={"Sample Description blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah"}
                />
                <ProjectCard
                    departmentName={"Sample Department Name"}
                    projectName={"Sample Project Name Blah"}
                    description={"Sample Description blah blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah"}
                />
                
            </Row>
            <Row>
                <Col xs={12} sm={12} md={6} lg={3}></Col>
                    {showLoadMore ? (
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <Button
                                onClick={() => getProjectList(true)}
                                variant="outlined"
                                className="cancelbtn"
                                style={{"text-transform":"none"}}>
                                Load more
                            </Button>
                        </Col>
                    ) : (
                        <></>
                    )}
            </Row>

        </div>
      
    </>
  )
}
