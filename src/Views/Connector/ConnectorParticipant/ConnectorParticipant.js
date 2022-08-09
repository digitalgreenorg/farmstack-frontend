import React, { useEffect, useState } from 'react'
import labels from '../../../Constants/labels';
import Loader from '../../../Components/Loader/Loader'
import HTTPService from "../../../Services/HTTPService";
import { getUserLocal } from '../../../Utils/Common'
import { Col, Row } from 'react-bootstrap'
import ConnectorFilter from '../ConnectorFilter'
import ConnectorListing from '../ConnectorListing'
import { get } from 'jquery';
import UrlConstant from '../../../Constants/UrlConstants';
import {GetErrorHandlingRoute} from "../../../Utils/Common";
import '../ConnectorParticipant.css'
import { useHistory } from 'react-router-dom';

export default function ConnectorParticipant() {
    
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const [isLoader, setIsLoader] = useState(false)
    const history = useHistory()

    //states for api endpoint management
    const [connectorUrl, setConnectorUrl] = useState(UrlConstant.base_url+UrlConstant.connector_list)
    const [showLoadMore, setShowLoadMore] = useState(false)
    const [isDatasetPresent, setIsDatasetPresent] = useState(true) // to be set to false after backend field is sent in response

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

    useEffect(() => {
        getFilters()
        payload = buildFilterPayLoad(getUserLocal(), "", "", "", "")
        getConnectorList(false)
    }, []);

    const getFilters = () => {
        setIsLoader(true);
        var payloadData = {}
        payloadData['user_id'] = getUserLocal()
        // data['user_id'] = "aaa35022-19a0-454f-9945-a44dca9d061d"
        HTTPService(
            "POST",
            UrlConstant.base_url + UrlConstant.connector_filter,
            payloadData,
            false,
            true
        )
            .then((response) => {
                setIsLoader(false);
                console.log("filter response:", response);

                var deptFilterInput = response.data.departments
                var projectFilterInput = response.data.projects
                
                setDepartmentFilter(initFilter(deptFilterInput))
                setProjectFilter(initFilter(projectFilterInput))
                // setIsDatasetPresent(response.data.isDatasetPresent)
                
                console.log("deptFilter", departmentFilter) 
                console.log("projectFilter", projectFilter)

            })
            .catch((e) => {
                console.log(e)
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }

    const initFilter = (filterInput) => {
        let filter = []
        for (var i = 0; i < filterInput.length; i++) {
            var data = {}
            data['index'] = i;
            data['name'] = filterInput[i]
            data['isChecked'] = false
            data['isDisplayed'] = true
            filter.push(data)
        }
        return filter
    }

    const getConnectorList = (isLoadMore) => {

        setIsLoader(true);
        if (payload == "") {
            payload = buildFilterPayLoad(getUserLocal(), "", "", "", "")
        }
        HTTPService(
            "POST",
            connectorUrl,
            payload,
            false,
            true
        )
            .then((response) => {
                setIsLoader(false);
                console.log("response:", response)
                console.log("connector:", response.data.results)

                if (response.data.next == null) {
                    setShowLoadMore(false)
                    setConnectorUrl(UrlConstant.base_url+UrlConstant.connector_list)
                } else {
                    setConnectorUrl(response.data.next)
                    setShowLoadMore(true)
                }
                let finalDataList = []
                    if (isLoadMore) {
                        finalDataList = [...connectorList, ...response.data.results]
                    } else {
                        finalDataList = [response.data.results]
                    }
                    setConnectorList(finalDataList)
            })
            .catch((e) => {
                console.log(e)
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });

    }
    
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
             getConnectorList(false)
         } else{
             clearAllFilters()
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

    const clearAllFilters = () => {
        setIsShowAll(true)
        
        resetFilterState(screenlabels.connector.department)
        resetFilterState(screenlabels.connector.projects)
        resetFilterState(screenlabels.connector.connector_type)
        resetFilterState(screenlabels.connector.connector_status)

        payload = buildFilterPayLoad(getUserLocal(), "", "", "", "")
        getConnectorList(false)
    }

    const handleDeptSearch = (e) => {
        var searchFound = false
        const searchText = e.target.value
        setDeptSearchState(searchText)
        var tempList = [...departmentFilter]
        for (let i = 0; i < tempList.length; i++) {
            if (searchText == "") {
                tempList[i].isDisplayed = true
                searchFound = true
            } else {
                if (!tempList[i].name.toUpperCase().startsWith(searchText.toUpperCase())) {
                    tempList[i].isDisplayed = false
                } else{
                    searchFound = true
                }
            }
        }
        setIsDeptSearchFound(searchFound)
        setDepartmentFilter(tempList)
    }

    const handleProjectSearch = (e) => {
        var searchFound = false
        const searchText = e.target.value
        setProjectSearchState(searchText)
        var tempList = [...projectFilter]
        for (let i = 0; i < tempList.length; i++) {
            if (searchText == "") {
                tempList[i].isDisplayed = true
                searchFound = true
            } else {
                if (!tempList[i].name.toUpperCase().startsWith(searchText.toUpperCase())) {
                    tempList[i].isDisplayed = false
                } else{
                    searchFound = true
                }
            }
        }
        setIsProjectSearchFound(searchFound)
        setProjectFilter(tempList)
    }

    const getConnectorStatusImageName = (status) => {
        var imageName = ""
        if(status == screenlabels.connector.status_install_certificate){
            imageName = "status_install_certificate_icon.svg"
        } else if (status == screenlabels.connector.status_unpaired){
            imageName = "status_unpaired_icon.svg"
        } else if (status == screenlabels.connector.status_awaiting_approval){
            imageName = "status_awaiting_approval_icon.svg"
        } else if (status == screenlabels.connector.status_paired){
            imageName = "status_paired_icon.svg"
        } else if (status == screenlabels.connector.status_pairing_request_received){
            imageName = "status_pairing_request_received_icon.svg"
        } else if (status == screenlabels.connector.status_rejected){
            imageName = "status_rejected_icon.svg"
        }
        return imageName
    }

  return (
    <>
      {isLoader ? <Loader /> : ''}
      
      <div className="connectors">
        {isDatasetPresent ?
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

                                handleDeptSearch={handleDeptSearch}
                                handleProjectSearch={handleProjectSearch}
                                handleFilterChange={handleFilterChange}
                                clearAllFilters={clearAllFilters}
                            />
                        </Col>
                        <Col className="supportSecondCOlumn">
                            <Col xs={12} sm={12} md={12} lg={12} className="settingsTabs">
                                <ConnectorListing
                                    connectorList={connectorList}
                                    // getConnectorList={getConnectorList}
                                    showLoadMore={showLoadMore} //to be changed
                                    getImageName = {getConnectorStatusImageName}
                                />
                            </Col>
                        </Col>
                    </Row>
                </Row>
            </Row>
            : 
            <Row className="supportfirstmaindiv">

            </Row>
        }
      </div>
    </>
  )
}
