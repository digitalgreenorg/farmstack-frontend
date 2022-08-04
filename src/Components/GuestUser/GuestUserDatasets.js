import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import labels from '../../Constants/labels';
import Loader from '../Loader/Loader';
//import DataSetListing from '../DataSetListing'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UrlConstant from '../../Constants/UrlConstants';
import HTTPService from '../../Services/HTTPService';
import { GetErrorHandlingRoute } from '../../Utils/Common';
import { useHistory } from 'react-router-dom';
import { getUserLocal, getUserMapId } from '../../Utils/Common';
import FileSaver from 'file-saver';
import Button from "@mui/material/Button";
import './GuestUserDatasets.css'
import GuestUserDatasetFilter from './GuestUserDatasetFilter';
import GuestUserDatasetListing from './GuestUserDatasetListing';
export default function GuestUserDatasets() {
    const [isLoader, setIsLoader] = useState(false)
    const [isShowLoadMoreButton, setisShowLoadMoreButton] = useState(false)
    const [showLoadMoreAdmin, setShowLoadMoreAdmin] = useState(false);
    const [showLoadMoreMember, setShowLoadMoreMember] = useState(false);
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const [value, setValue] = useState('1')
    const [secondrow, setsecondrow] = useState(false)
    const [fromdate, setfromdate] = useState(null);
    const [todate, settodate] = useState(null);
    const history = useHistory();
    const [isMemberTab, setIsMemberTab] = useState(false)
    const [datasetUrl, setDatasetUrl] = useState(
        UrlConstant.base_url + UrlConstant.guest_dataset_filtered_data
    );

    const [isShowAll, setIsShowAll] = useState(true)
    // const [isEnabledFilter, setIsEnabledFilter] = useState(false)
    // const [isDisabledFilter, setIsDisabledFilter] = useState(false)
    // const [forReviewFilter, setForReviewFilter] = useState(false)
    // const [rejectedFilter, setRejectedFilter] = useState(false)
    // const [approvedFilter, setApprovedFilter] = useState(false)
    const [geoSearchState, setGeoSearchState] = useState("")
    const [cropSearchState, setCropSearchState] = useState("")

    const [datasetList, setDatasetList] = useState([])
    const [memberDatasetList, setMemberDatasetList] = useState([])

    // const [geoFilterMaster,setGeoFilterMaster] = useState([])
    const [geoFilterDisplay, setGeoFilterDisplay] = useState([])

    // const [cropFilterMaster, setCropFilterMaster] = useState([])
    const [cropFilterDisplay, setCropFilterDisplay] = useState([])

    // const [ageFilterMaster, setAgeFilterMaster] = useState([
    //                                     {index:0,name:"3 Months",isChecked:false},
    //                                     {index:1,name:"6 Months",isChecked:false},
    //                                     {index:2,name:"9 Months",isChecked:false},
    //                                     {index:3,name:"Constantly Updating",isChecked:false}])

    const [ageFilterDisplay, setAgeFilterDisplay] = useState([
        { index: 0, name: "3 Months", payloadName: "3 months", isChecked: false },
        { index: 1, name: "6 Months", payloadName: "6 months", isChecked: false },
        { index: 2, name: "9 Months", payloadName: "9 months", isChecked: false },
        { index: 3, name: "12 Months", payloadName: "12 months", isChecked: false },
        { index: 4, name: "Constantly Updating", payloadName: "constantly_updating", isChecked: false }])

    const [statusFilter, setStatusFilter] = useState([
        { index: 0, name: screenlabels.dataset.for_review, payloadName: "for_review", isChecked: false },
        { index: 1, name: screenlabels.dataset.rejected, payloadName: "rejected", isChecked: false },
        { index: 2, name: screenlabels.dataset.approved, payloadName: "approved", isChecked: false }])

    const [enableStatusFilter, setEnableStatusFilter] = useState([
        { index: 0, name: screenlabels.dataset.enabled, payloadName: "is_enabled", isChecked: false },
        { index: 1, name: screenlabels.dataset.disbaled, payloadName: "is_enabled", isChecked: false }])

    const [isGeoSearchFound, setIsGeoSearchFound] = useState(true)
    const [isCropSearchFound, setIsCropSearchFound] = useState(true)

    const [isAdminView, setisAdminView] = useState(true)
    const [viewdata, setviewdata] = useState({})
    const [tablekeys, settablekeys] = useState([])
    const [id, setid] = useState("")
    const [requestchange, setrequestchange] = useState("")
    var payload = ""
    var adminUrl = UrlConstant.base_url + UrlConstant.guest_dataset_filtered_data
    //var memberUrl = UrlConstant.base_url + UrlConstant.dataset_list

    const resetUrls = () => {
        // setDatasetUrl(UrlConstant.base_url + UrlConstant.dataset_list)
        // setMemberDatasetUrl(UrlConstant.base_url + UrlConstant.dataset_list)
        adminUrl = UrlConstant.base_url + UrlConstant.guest_dataset_filtered_data
        //memberUrl = UrlConstant.base_url + UrlConstant.dataset_list
    }
    const handleFilterChange = (index, filterName) => {

        // var tempFilterMaster = []
        var isAnyFilterChecked = false
        var tempFilterDisplay = []
        var payloadList = []
        // var payload = {}

        setIsShowAll(false)
        resetDateFilters()
        // resetEnabledStatusFilter()
        // resetUrls()

        if (filterName == screenlabels.dataset.geography) {

            resetFilterState(screenlabels.dataset.age)
            resetFilterState(screenlabels.dataset.crop)
            resetFilterState(screenlabels.dataset.status)
            resetFilterState(screenlabels.dataset.enabled)

            tempFilterDisplay = [...geoFilterDisplay]
            for (let i = 0; i < tempFilterDisplay.length; i++) {
                if (tempFilterDisplay[i].index == index) {
                    tempFilterDisplay[i].isChecked = !tempFilterDisplay[i].isChecked
                }
                if (tempFilterDisplay[i].isChecked) {
                    payloadList.push(tempFilterDisplay[i].name)
                    isAnyFilterChecked = true
                }
            }
            setGeoFilterDisplay(tempFilterDisplay)

            // tempFilterMaster = [...geoFilterMaster]
            // for(let i =0; i<tempFilterMaster.length; i++){
            //     if(tempFilterMaster[i].index == index){
            //         tempFilterMaster[i].isChecked = !tempFilterMaster[i].isChecked
            //     }
            //     if(tempFilterMaster[i].isChecked){
            //         payloadList.push(tempFilterMaster[i].name)
            //     }
            // }
            // setGeoFilterMaster(tempFilterMaster)
            payload = buildFilterPayLoad("", getUserLocal(), payloadList, "", "", "")

        } else if (filterName == screenlabels.dataset.age) {

            resetFilterState(screenlabels.dataset.geography)
            resetFilterState(screenlabels.dataset.crop)
            resetFilterState(screenlabels.dataset.status)
            resetFilterState(screenlabels.dataset.enabled)

            tempFilterDisplay = [...ageFilterDisplay]
            for (let i = 0; i < tempFilterDisplay.length; i++) {
                if (tempFilterDisplay[i].index == index) {
                    tempFilterDisplay[i].isChecked = !tempFilterDisplay[i].isChecked
                }
                if (tempFilterDisplay[i].isChecked) {
                    payloadList.push(tempFilterDisplay[i].payloadName)
                    isAnyFilterChecked = true
                }
            }
            setAgeFilterDisplay(tempFilterDisplay)

            // tempFilterMaster = [...ageFilterMaster]
            // for(let i =0; i<tempFilterMaster.length; i++){
            //     if(tempFilterMaster[i].index == index){
            //         tempFilterMaster[i].isChecked = !tempFilterMaster[i].isChecked
            //     }
            //     if(tempFilterMaster[i].isChecked){
            //         payloadList.push(tempFilterMaster[i].name)
            //     }
            // }
            // setAgeFilterMaster(tempFilterMaster)
            payload = buildFilterPayLoad("", getUserLocal(), "", payloadList, "", "")

        } else if (filterName == screenlabels.dataset.crop) {

            resetFilterState(screenlabels.dataset.geography)
            resetFilterState(screenlabels.dataset.age)
            resetFilterState(screenlabels.dataset.status)
            resetFilterState(screenlabels.dataset.enabled)

            tempFilterDisplay = [...cropFilterDisplay]
            for (let i = 0; i < tempFilterDisplay.length; i++) {
                if (tempFilterDisplay[i].index == index) {
                    tempFilterDisplay[i].isChecked = !tempFilterDisplay[i].isChecked
                }
                if (tempFilterDisplay[i].isChecked) {
                    payloadList.push(tempFilterDisplay[i].name)
                    isAnyFilterChecked = true
                }
            }
            setCropFilterDisplay(tempFilterDisplay)

            // tempFilterMaster = [...cropFilterMaster]
            // for(let i =0; i<tempFilterMaster.length; i++){
            //     if(tempFilterMaster[i].index == index){
            //         tempFilterMaster[i].isChecked = !tempFilterMaster[i].isChecked
            //     }
            //     if(tempFilterMaster[i].isChecked){
            //         payloadList.push(tempFilterMaster[i].name)
            //     }
            // }
            // setCropFilterMaster(tempFilterMaster)
            payload = buildFilterPayLoad("", getUserLocal(), "", "", payloadList, "")
        } else if (filterName == screenlabels.dataset.status) {
            resetFilterState(screenlabels.dataset.geography)
            resetFilterState(screenlabels.dataset.age)
            resetFilterState(screenlabels.dataset.crop)
            resetFilterState(screenlabels.dataset.enabled)

            tempFilterDisplay = [...statusFilter]
            for (let i = 0; i < tempFilterDisplay.length; i++) {
                if (tempFilterDisplay[i].index == index) {
                    tempFilterDisplay[i].isChecked = !tempFilterDisplay[i].isChecked
                }
                if (tempFilterDisplay[i].isChecked) {
                    payloadList.push(tempFilterDisplay[i].payloadName)
                    isAnyFilterChecked = true
                }
            }
            setStatusFilter(tempFilterDisplay)

            payload = buildFilterPayLoad("", getUserLocal(), "", "", "", payloadList)
        } else if (filterName == screenlabels.dataset.enabled){
            resetFilterState(screenlabels.dataset.geography)
            resetFilterState(screenlabels.dataset.age)
            resetFilterState(screenlabels.dataset.crop)
            resetFilterState(screenlabels.dataset.status)

            tempFilterDisplay = [...enableStatusFilter]
            if(index == 0){
                tempFilterDisplay[0].isChecked = !tempFilterDisplay[0].isChecked
                tempFilterDisplay[1].isChecked = false
            } else{
                tempFilterDisplay[0].isChecked = false
                tempFilterDisplay[1].isChecked = !tempFilterDisplay[1].isChecked
            }
            if(tempFilterDisplay[0].isChecked || tempFilterDisplay[1].isChecked ){
                isAnyFilterChecked = true
            }
            setEnableStatusFilter(tempFilterDisplay)
            payload = buildFilterPayLoad("", getUserLocal(), "", "", "", "")
        }
        if(isAnyFilterChecked){
            getDatasetList(false)
        } else{
            clearAllFilters()
        }
    }

    const resetFilterState = (filterName) => {
        var tempfilterMaster = []
        var tempFilerDisplay = []
        if (filterName == screenlabels.dataset.geography) {

            // tempfilterMaster = [...geoFilterMaster]
            // for(let i=0; i<tempfilterMaster.length; i++){
            //     tempfilterMaster[i].isChecked = false
            // }
            // setGeoFilterMaster(tempfilterMaster)

            tempFilerDisplay = [...geoFilterDisplay]
            for (let i = 0; i < tempFilerDisplay.length; i++) {
                tempFilerDisplay[i].isChecked = false
                tempFilerDisplay[i].isDisplayed = true
            }
            setGeoFilterDisplay(tempFilerDisplay)
            setGeoSearchState("")

        } else if (filterName == screenlabels.dataset.age) {

            // tempfilterMaster = [...ageFilterMaster]
            // for(let i=0; i<tempfilterMaster.length; i++){
            //     tempfilterMaster[i].isChecked = false
            // }
            // setAgeFilterMaster(tempfilterMaster)

            tempFilerDisplay = [...ageFilterDisplay]
            for (let i = 0; i < tempFilerDisplay.length; i++) {
                tempFilerDisplay[i].isChecked = false
                tempFilerDisplay[i].isDisplayed = true
            }
            setAgeFilterDisplay(tempFilerDisplay)

        } else if (filterName == screenlabels.dataset.crop) {

            // tempfilterMaster = [...cropFilterMaster]
            // for(let i=0; i<tempfilterMaster.length; i++){
            //     tempfilterMaster[i].isChecked = false
            // }
            // setCropFilterMaster(tempfilterMaster)

            tempFilerDisplay = [...cropFilterDisplay]
            for (let i = 0; i < tempFilerDisplay.length; i++) {
                tempFilerDisplay[i].isChecked = false
                tempFilerDisplay[i].isDisplayed = true
            }
            setCropFilterDisplay(tempFilerDisplay)
            setCropSearchState("")
        } else if (filterName == screenlabels.dataset.status) {

            tempFilerDisplay = [...statusFilter]
            for (let i = 0; i < tempFilerDisplay.length; i++) {
                tempFilerDisplay[i].isChecked = false
                // tempFilerDisplay[i].isDisplayed = true
            }
            setStatusFilter(tempFilerDisplay)
        } else if (filterName == screenlabels.dataset.enabled){
            tempFilerDisplay = [...enableStatusFilter]
            tempFilerDisplay[0].isChecked=false
            tempFilerDisplay[1].isChecked=false
            setEnableStatusFilter(tempFilerDisplay)
        }
    }

    const handleGeoSearch = (e) => {
        var searchFound = false
        const searchText = e.target.value
        setGeoSearchState(searchText)
        var tempList = [...geoFilterDisplay]
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
        setIsGeoSearchFound(searchFound)
        setGeoFilterDisplay(tempList)
    }

    const handleCropSearch = (e) => {
        var searchFound = false
        const searchText = e.target.value
        setCropSearchState(searchText)
        var tempList = [...cropFilterDisplay]
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
        setIsCropSearchFound(searchFound)
        setCropFilterDisplay(tempList)
    }

    useEffect(() => {
        getFilters()
        payload = buildFilterPayLoad("", getUserLocal(), "", "", "", "")
        getDatasetList(false)
    }, [value]);

    const getFilters = () => {
        setIsLoader(true);
        HTTPService(
            "GET",
            UrlConstant.base_url + UrlConstant.guest_dataset_filters,
            '',
            false,
            false
        )
            .then((response) => {
                setIsLoader(false);
                console.log("filter response:", response);
                var geoFilterInput = response.data.geography
                var cropFilterInput = response.data.crop_detail
                setGeoFilterDisplay(initFilter(geoFilterInput))
                setCropFilterDisplay(initFilter(cropFilterInput))
                console.log("geoFilterDisplay", geoFilterDisplay)
                console.log("cropFilterDisplay", cropFilterDisplay)

            })
            .catch((e) => {
                setIsLoader(false);
                //history.push(GetErrorHandlingRoute(e));
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


    const getDatasetList = (isLoadMore) => {
        if(!isLoadMore){
            resetUrls()
        }
        setIsLoader(true);
        if (payload == "") {
            payload = buildFilterPayLoad("", getUserLocal(), "", "", "", "")
        }
        HTTPService(
            "POST",
            // "GET",
            // isMemberTab ? memberDatasetUrl : datasetUrl,
            !isLoadMore ? (adminUrl) : (datasetUrl),
            payload,
            false,
            false
        )
            .then((response) => {
                setIsLoader(false);
                console.log("response:", response)
                console.log("datatset:", response.data.results)

                if (response.data.next == null) {
                    setisShowLoadMoreButton(false)
                    setShowLoadMoreAdmin(false)
                    setShowLoadMoreMember(false)
                } else {
                    setisShowLoadMoreButton(true)
                    if (value == "1") {
                        setDatasetUrl(response.data.next)
                        // adminUrl = response.data.next
                        setShowLoadMoreAdmin(true)
                        setShowLoadMoreMember(false)
                    } else {
                        //setMemberDatasetUrl(response.data.next)
                        // memberUrl = response.data.next
                        setShowLoadMoreAdmin(false)
                        setShowLoadMoreMember(true)
                    }
                }
                let finalDataList = []
                if (!isMemberTab) {
                    if (isLoadMore) {
                        finalDataList = [...datasetList, ...response.data.results]
                    } else {
                        finalDataList = [...response.data.results]
                    }
                    setDatasetList(finalDataList)
                } else {
                    if (isLoadMore) {
                        finalDataList = [...memberDatasetList, ...response.data.results]
                    } else {
                        finalDataList = [...response.data.results]
                    }
                    setMemberDatasetList(finalDataList)
                }
            })
            .catch((e) => {
                console.log(e)
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }

    const buildFilterPayLoad = (createdAtRange, userId, geoPayload, agePayload, cropPayload, statusPayload) => {
        let data = {}
        if (createdAtRange !== "") {
            data['created_at__range'] = createdAtRange
        }
        //data['user_id'] = userId
        // data['user_id'] = "aaa35022-19a0-454f-9945-a44dca9d061d"
        /*
        if (isMemberTab) {
            data['others'] = true
        } else {
            data['others'] = false
        }*/
        if (geoPayload !== "") {
            data['geography__in'] = geoPayload
        }
        if (cropPayload !== "") {
            data['crop_detail__in'] = cropPayload
        }
        if(agePayload !== ""){
            if(ageFilterDisplay[ageFilterDisplay.length-1].isChecked){
                agePayload.splice(agePayload.length-1)
                data['constantly_update'] = true
            }
            if (agePayload.length>0) {
                data['age_of_date__in'] = agePayload
            }
        }
        if (statusPayload !== "") {
            data['approval_status__in'] = statusPayload
        }
        if (enableStatusFilter[0].isChecked || enableStatusFilter[1].isChecked) {
            data['is_enabled'] = enableStatusFilter[0].isChecked
        }
        return data
    }

    const handleTabChange = (event, newValue) => {

        setValue(newValue);
        if (newValue == "2") {
            console.log("isMemberTab", isMemberTab)
            setIsMemberTab(!isMemberTab)
            console.log("isMemberTab", isMemberTab)
        } else {
            setIsMemberTab(!isMemberTab)
        }
        console.log("isMemberTab", isMemberTab)
        clearAllFilters()
        console.log("isMemberTab", isMemberTab)

    };

    const resetDateFilters = () => {
        settodate(null)
        setfromdate(null);
        setsecondrow(false)
    }

    const clearAllFilters = () => {
        setIsShowAll(true)
        resetDateFilters()
        // resetUrls()
        resetFilterState(screenlabels.dataset.geography)
        resetFilterState(screenlabels.dataset.age)
        resetFilterState(screenlabels.dataset.crop)
        resetFilterState(screenlabels.dataset.status)
        resetFilterState(screenlabels.dataset.enabled)
        // resetEnabledStatusFilter()

        payload = buildFilterPayLoad("", getUserLocal(), "", "", "", "")
        getDatasetList(false)
    }

    const getAllDataSets = () => {

        resetFilterState(screenlabels.dataset.geography)
        resetFilterState(screenlabels.dataset.age)
        resetFilterState(screenlabels.dataset.crop)
        resetFilterState(screenlabels.dataset.status)
        // resetUrls()

        setIsShowAll(true)
        setsecondrow(false)
        settodate(null)
        setfromdate(null);

        payload = buildFilterPayLoad("", getUserLocal(), "", "", "", "")

        getDatasetList(false)

    }

    const filterByDates = () => {

        let fromDateandToDate = []
        fromDateandToDate.push(fromdate)
        fromDateandToDate.push(todate)

        setIsShowAll(false)
        resetFilterState(screenlabels.dataset.geography)
        resetFilterState(screenlabels.dataset.age)
        resetFilterState(screenlabels.dataset.crop)
        resetFilterState(screenlabels.dataset.status)
        // resetUrls()

        payload = buildFilterPayLoad(fromDateandToDate, getUserLocal(), "", "", "", "")
        setsecondrow(true)
        getDatasetList(false)
    }

    /*
    const changeView = (keyname) => {
        let tempfilterObject = { ...screenView }
        Object.keys(tempfilterObject).forEach(function (key) { if (key != keyname) { tempfilterObject[key] = false } else { tempfilterObject[key] = true } });
        setscreenView(tempfilterObject)
    } */
    const viewCardDetails = (id, flag) => {
        setid(id)
        setIsLoader(true);
        setisAdminView(flag)
        HTTPService(
            "GET",
            UrlConstant.base_url + UrlConstant.dataset + id + "/",
            "",
            false,
            true
        )
            .then((response) => {
                setIsLoader(false);
                console.log("filter response:", response);
                let tempObject = { ...response.data }
                setviewdata(tempObject)
                var tabelHeading = Object.keys(response.data.content[0])
                var temptabelKeys = [...tabelHeading]
                settablekeys(temptabelKeys)
                //changeView('isDataSetView')
            })
            .catch((e) => {
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }
    
    return (
        <>
            {isLoader ? <Loader /> : ''}
            <Row className="supportfirstmaindiv">
                {/* <Row className="secondmainheading width100percent">{screenlabels.support.heading}</Row> */}
                <Row className="supportmaindiv">
                    <Row className="supportfilterRow">
                        <Col className="supportfilterCOlumn">
                            <GuestUserDatasetFilter
                                isShowAll={isShowAll}
                                setIsShowAll={setIsShowAll}
                                secondrow={secondrow}
                                fromdate={fromdate}
                                todate={todate}
                                setfromdate={setfromdate}
                                settodate={settodate}
                                getAllDataSets={getAllDataSets}
                                filterByDates={filterByDates}

                                handleGeoSearch={handleGeoSearch}
                                handleCropSearch={handleCropSearch}

                                geoFilterDisplay={geoFilterDisplay}
                                cropFilterDisplay={cropFilterDisplay}
                                ageFilterDisplay={ageFilterDisplay}
                                handleFilterChange={handleFilterChange}
                                resetFilterState={resetFilterState}

                                geoSearchState={geoSearchState}
                                cropSearchState={cropSearchState}

                                clearAllFilters={clearAllFilters}
                                showMemberFilters={value == "2"}
                                // isEnabledFilter={isEnabledFilter}
                                // isDisabledFilter={isDisabledFilter}
                                // handleEnableStatusFilter={handleEnableStatusFilter}
                                // forReviewFilter={forReviewFilter}
                                // rejectedFilter={rejectedFilter}
                                // approvedFilter={approvedFilter}
                                statusFilter={statusFilter}
                                // handleStatusFilter={handleStatusFilter}
                                // resetEnabledStatusFilter={resetEnabledStatusFilter}
                                // resetUrls={resetUrls}
                                enableStatusFilter={enableStatusFilter}
                                isGeoSearchFound={isGeoSearchFound}
                                isCropSearchFound={isCropSearchFound}
                            />
                        </Col>
                        <Col className="supportSecondCOlumn">
                            <Col xs={12} sm={12} md={12} lg={12} className="settingsTabs">
                                <GuestUserDatasetListing
                                    datasetList={datasetList}
                                    isShowLoadMoreButton={showLoadMoreAdmin}
                                    isMemberTab={value =="2"}
                                    getDatasetList={getDatasetList}
                                    viewCardDetails={(id) => viewCardDetails(id, true)}
                                />
                            </Col>
                        </Col>
                    </Row>
                </Row>
            </Row>
        </>
    )
}