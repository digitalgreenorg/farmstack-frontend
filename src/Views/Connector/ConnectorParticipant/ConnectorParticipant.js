import React, { useState } from 'react'
import Loader from '../../../Components/Loader/Loader'
import { Col, Row } from 'react-bootstrap'
import ConnectorFilter from '../ConnectorFilter'
import ConnectorListing from '../ConnectorListing'

export default function ConnectorParticipant() {
    const [isLoader, setIsLoader] = useState(false)

    //connector list state which will be set with backend response
    const [connectorList, setConnectorList] = useState([])

    //filter state management states
    const [isShowAll, setIsShowAll] = useState(true)
    const [deptSearchState, setDeptSearchState] = useState("")
    const [projectSearchState, setProjectSearchState] = useState("")
    const [isDeptSearchFound, setIsDeptSearchFound] = useState(true)
    const [isProjectSearchFound, setIsProjectSearchFound] = useState(true)

    //filter states
    const [departmentFilter, setDepartmentFilter] = useState([
        { index: 0, name: "Dept1", payloadName: "dept1", isChecked: false, isDisplayed: true },
        { index: 1, name: "Dept2", payloadName: "dept2", isChecked: false, isDisplayed: true }
    ])
    const [projectFilter, setProjectFilter] = useState([
        { index: 0, name: "Project1", payloadName: "project1", isChecked: false, isDisplayed: true },
        { index: 1, name: "Project2", payloadName: "project2", isChecked: false , isDisplayed: true}
    ])

    const [connectorTypeFilter, setConnectoprTypeFilter] = useState([
        { index: 0, name: "Provider", payloadName: "provider", isChecked: false },
        { index: 1, name: "Consumer", payloadName: "consumer", isChecked: false }
    ])

    const [statusFilter, setStatusFilter] = useState([
        { index: 1, name: "Install Certificate", payloadName: "install_certificate", isChecked: false },
        { index: 2, name: "Unpaired", payloadName: "unpaired", isChecked: false },
        { index: 3, name: "Awaiting Approval", payloadName: "awaiting_approval", isChecked: false },
        { index: 4, name: "Paired", payloadName: "paired", isChecked: false },
        { index: 5, name: "Pairing Request Received", payloadName: "pairing_request_received", isChecked: false },
        { index: 6, name: "Rejected", payloadName: "rejected", isChecked: false }
    ])

    const handleFilterChange = (index, filterName) => {
        
    }

  return (
    <>
      {isLoader ? <Loader /> : ''}
      <Row className="supportfirstmaindiv">
        <Row className="supportmaindiv">
            <Row className="supportfilterRow">
                <Col className="supportfilterCOlumn">
                    <ConnectorFilter
                        isShowAll={isShowAll}
                        
                        // setIsShowAll={setIsShowAll}
                        // secondrow={secondrow}
                        // fromdate={fromdate}
                        // todate={todate}
                        // setfromdate={setfromdate}
                        // settodate={settodate}
                        // filterByDates={filterByDates}
                        // resetFilterState={resetFilterState}

                        departmentFilter={departmentFilter}
                        projectFilter={projectFilter}
                        connectorTypeFilter={connectorTypeFilter}
                        statusFilter={statusFilter}

                        deptSearchState={deptSearchState}
                        projectSearchState={projectSearchState}
                        isDeptSearchFound={isDeptSearchFound}
                        isProjectSearchFound={isProjectSearchFound}

                        // getAllDataSets={getAllDataSets}
                        // handleGeoSearch={handleGeoSearch}
                        // handleCropSearch={handleCropSearch}
                        handleFilterChange={handleFilterChange}
                        // clearAllFilters={clearAllFilters}
                    />
                </Col>
                <Col className="supportSecondCOlumn">
                    <Col xs={12} sm={12} md={12} lg={12} className="settingsTabs">
                        <ConnectorListing/>
                    </Col>
                </Col>
            </Row>
        </Row>
      </Row>
    </>
  )
}
