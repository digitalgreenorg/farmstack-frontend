import React from 'react'
import ProjectCard from '../../../../Components/Projects/ProjectCard'
import './ProjectListing.css'
import { Col, Row } from 'react-bootstrap'
import AddProjectCard from '../../../../Components/Projects/AddProjectCard'
import NoProjectCard from '../../../../Components/Projects/NoProjectCard'

export default function ProjectListing() {

  return (
    <>
        <div className='projects'>
            <Row>
                <AddProjectCard/>
                <NoProjectCard/>
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

        </div>
      
    </>
  )
}
