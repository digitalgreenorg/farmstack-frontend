import React, { useState } from 'react'
import labels from '../../../Constants/labels';
import Loader from '../../../Components/Loader/Loader'
import { getUserLocal } from '../../../Utils/Common'
import { Col, Row } from 'react-bootstrap'
import ConnectorFilter from '../ConnectorFilter'
import ConnectorListing from '../ConnectorListing'

export default function ConnectorParticipant() {
    const [screenlabels, setscreenlabels] = useState(labels['en']);
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

    var payload = {}

    const handleFilterChange = (index, filterName) => {

         var isAnyFilterChecked = false
         var tempFilter = []
         var payloadList = []
 
         setIsShowAll(false)
 
         if (filterName == screenlabels.connector.department) {
 
             resetFilterState(screenlabels.connector.projects)
             resetFilterState(screenlabels.connector.connector_type)
             resetFilterState(screenlabels.dataset.connector_status)
 
             tempFilter = [...departmentFilter]
             for (let i = 0; i < tempFilter.length; i++) {
                 if (tempFilter[i].index == index) {
                     tempFilter[i].isChecked = !tempFilter[i].isChecked
                 }
                 if (tempFilter[i].isChecked) {
                     payloadList.push(tempFilter[i].name)
                     isAnyFilterChecked = true
                 }
             }
             setDepartmentFilter(tempFilter)

             payload = buildFilterPayLoad(getUserLocal(), payloadList, "", "", "")
 
         } else if (filterName == screenlabels.connector.projects) {
 
             resetFilterState(screenlabels.connector.department)
             resetFilterState(screenlabels.connector.connector_type)
             resetFilterState(screenlabels.connector.connector_status)
 
             tempFilter = [...projectFilter]
             for (let i = 0; i < tempFilter.length; i++) {
                 if (tempFilter[i].index == index) {
                     tempFilter[i].isChecked = !tempFilter[i].isChecked
                 }
                 if (tempFilter[i].isChecked) {
                     payloadList.push(tempFilter[i].payloadName)
                     isAnyFilterChecked = true
                 }
             }
             setProjectFilter(tempFilter)
 
             payload = buildFilterPayLoad(getUserLocal(), "", payloadList, "", "")
 
         } else if (filterName == screenlabels.connector.connector_type) {
 
             resetFilterState(screenlabels.connector.department)
             resetFilterState(screenlabels.connector.projects)
             resetFilterState(screenlabels.connector.connector_status)
 
             tempFilter = [...connectorTypeFilter]
             for (let i = 0; i < tempFilter.length; i++) {
                 if (tempFilter[i].index == index) {
                     tempFilter[i].isChecked = !tempFilter[i].isChecked
                 }
                 if (tempFilter[i].isChecked) {
                     payloadList.push(tempFilter[i].name)
                     isAnyFilterChecked = true
                 }
             }
             setConnectoprTypeFilter(tempFilter)
             payload = buildFilterPayLoad(getUserLocal(), "", "", payloadList, "")
             
         } else if (filterName == screenlabels.connector.connector_status) {
             
             resetFilterState(screenlabels.connector.department)
             resetFilterState(screenlabels.connector.projects)
             resetFilterState(screenlabels.connector.connector_type)
 
             tempFilter = [...statusFilter]
             for (let i = 0; i < tempFilter.length; i++) {
                 if (tempFilter[i].index == index) {
                     tempFilter[i].isChecked = !tempFilter[i].isChecked
                 }
                 if (tempFilter[i].isChecked) {
                     payloadList.push(tempFilter[i].payloadName)
                     isAnyFilterChecked = true
                 }
             }
             setStatusFilter(tempFilter)
 
             payload = buildFilterPayLoad(getUserLocal(), "", "", "", payloadList)
         }
         if(isAnyFilterChecked){
            //  if(isMemberTab){
            //      getMemberDatasets(false)
            //  } else {
            //      getMyDataset(false)
            //  }
         } else{
            //  clearAllFilters()
         }
    }

    const resetFilterState = (filterName) => {
        var tempFilter = []
        if (filterName == screenlabels.connector.department) {

            tempFilter = [...departmentFilter]
            for (let i = 0; i < tempFilter.length; i++) {
                tempFilter[i].isChecked = false
                tempFilter[i].isDisplayed = true
            }
            setDepartmentFilter(tempFilter)
            setDeptSearchState("")

        } else if (filterName == screenlabels.connector.projects) {

            tempFilter = [...projectFilter]
            for (let i = 0; i < tempFilter.length; i++) {
                tempFilter[i].isChecked = false
                tempFilter[i].isDisplayed = true
            }
            setProjectFilter(tempFilter)
            setProjectSearchState("")

        } else if (filterName == screenlabels.connector.connector_type) {

            tempFilter = [...connectorTypeFilter]
            for (let i = 0; i < tempFilter.length; i++) {
                tempFilter[i].isChecked = false
                // tempFilter[i].isDisplayed = true
            }
            setConnectoprTypeFilter(tempFilter)

        } else if (filterName == screenlabels.connector.connector_status) {

            tempFilter = [...statusFilter]
            for (let i = 0; i < tempFilter.length; i++) {
                tempFilter[i].isChecked = false
                // tempFilter[i].isDisplayed = true
            }
            setStatusFilter(tempFilter)
        }
    }
    const buildFilterPayLoad = (userId, deptPayload, projectPayload, typePayload, statusPayload) => {
        let data = {}
        
        data['user_id'] = userId
        // data['user_id'] = "aaa35022-19a0-454f-9945-a44dca9d061d"
        if (deptPayload !== "") {
            data['department__in'] = deptPayload
        }
        if (projectPayload !== "") {
            data['project__in'] = projectPayload
        }
        if(typePayload !== ""){
            data['connector_type'] = typePayload
        }
        if (statusPayload !== "") {
            data['connector_status__in'] = statusPayload
        }
        return data
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
