import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import labels from '../../../Constants/labels';
import Loader from '../../../Components/Loader/Loader'
import DataSetFilter from '../DataSetFilter'
import DataSetListing from '../DataSetListing'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UrlConstant from "../../../Constants/UrlConstants";
import HTTPService from "../../../Services/HTTPService";
import GetErrorHandlingRoute from "../../../Utils/Common";
import { useHistory } from 'react-router-dom';
import {getUserLocal} from '../../../Utils/Common'

export default function DatasetAdmin() {

    const [isLoader, setIsLoader] = useState(false)
    const [isShowLoadMoreButton, setisShowLoadMoreButton] = useState(true);
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const [value, setValue] = useState('1')
    const [secondrow, setsecondrow] = useState(false)
    const [fromdate, setfromdate] = useState(null);
    const [todate, settodate] = useState(null);
    const history = useHistory();
    const [isMemberTab, setIsMemberTab] = useState(false)
    const [datasetUrl, setDatasetUrl] = useState(
        UrlConstant.base_url + UrlConstant.dataset_list
      );

    var payload = ""
    const [filterObject, setfilterObject] = useState(
        {
            "all": true,
            "fromDateandToDate": [],
            "geographyList": [],
            "ageList": [],
            "cropList": []
        });

    // const resetFilters = () => {
    //     setfilterObject(
    //         {
    //         "all": true,
    //         "fromDateandToDate": [],
    //         "geographyList": [],
    //         "ageList": [],
    //         "cropList": []
    //         }
    //     )
    // }

    const [datasetList, setDatasetList] = useState([])
    const [memberDatasetList , setMemberDatasetList] = useState([])

    const [geoMasterList,setGeoMasterList] = useState([])
    const [geographyList, setGeographyList] = useState([])
    const [geoCheckStateList, setGeoCheckStateList] = useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false])

    const [cropMasterList, setCropMasterList] = useState([])
    const [cropList,setCropList] = useState([])
    const [cropCheckStateList, setCropCheckStateList] = useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false])

    const [ageMasterList, setAgeMasterList] = useState(["3 Months","6 Months","9 Months","Constantly Updating"])
    const [ageList, setAgeList] = useState(["3 Months","6 Months","9 Months","Constantly Updating"])
    const [ageCheckStateList, setAgeCheckStateList] = useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false])


    const [geoFilterMaster,setGeoFilterMaster] = useState([])
    const [geoFilterDisplay, setGeoFilterDisplay] = useState([])

    const [cropFilterMaster, setCropFilterMaster] = useState([])
    const [cropFilterDisplay, setCropFilterDisplay] = useState([])

    const [ageFilterMaster, setAgeFilterMaster] = useState([
                                        {index:0,name:"3 Months",isChecked:false},
                                        {index:1,name:"6 Months",isChecked:false},
                                        {index:2,name:"9 Months",isChecked:false},
                                        {index:3,name:"Constantly Updating",isChecked:false}])

    const [ageFilterDisplay, setAgeFilterDisplay] =useState([
                                        {index:0,name:"3 Months",isChecked:false},
                                        {index:1,name:"6 Months",isChecked:false},
                                        {index:2,name:"9 Months",isChecked:false},
                                        {index:3,name:"Constantly Updating",isChecked:false}])

    const handleCheckListFilterChange = (listName,index) => {

        var resetCheckStateList = []
        var tempList = []
        var filterParams = []
        if(listName==="geography"){
            console.log("Toggled Geography Filter index:", index)
            tempList = [...geoCheckStateList]
            tempList[index] = !geoCheckStateList[index]
            setGeoCheckStateList(tempList)

            setCropCheckStateList(resetFilter())
            setAgeCheckStateList(resetFilter())
            
            filterParams = geoMasterList.map((geo,index) => {
                if(tempList[index]){
                    return geo
                }
            })

            payload = buildFilterPayLoad("",getUserLocal(),filterParams,"","")
            
        } else if(listName === "crop"){
            console.log("Toggled Crop Filter Index:", index)
            tempList = [...cropCheckStateList]
            tempList[index] = !cropCheckStateList[index]
            setCropCheckStateList(tempList)

            setGeoCheckStateList(resetFilter())
            setAgeCheckStateList(resetFilter())

            filterParams = cropMasterList.map((crop,index) => {
                if(tempList[index]){
                    return crop
                }
            })

            payload = buildFilterPayLoad("",getUserLocal(),"",filterParams,"")

        } else if(listName === "age"){
            console.log("Toggled Age Filter Index:", index)
            tempList = [...ageCheckStateList]
            tempList[index] = !ageCheckStateList[index]
            setAgeCheckStateList(tempList)

            setGeoCheckStateList(resetFilter())
            setCropCheckStateList(resetFilter())

            // for(let i = 0; i<ageMasterList.length ; i++){
            //     if(tempList[i]){
            //         filterParams.push(ageMasterList[i])
            //     }
            // }
            filterParams = ageMasterList.map((age,index) => {
                if(tempList[index]){
                    return age
                }
            })
            payload = buildFilterPayLoad("",getUserLocal(),"","",filterParams)
        }

        console.log("filterParam : ",filterParams)
        console.log("payload:", payload)

        getDatasetList(payload)
    }

    const handleFilterChange = (index,filterName) => {

        var tempFilterMaster = []
        var tempFilterDisplay = []
        var payloadList = []
        var payload = {}

        if(filterName == screenlabels.dataset.geography){

            resetFilterState(screenlabels.dataset.age)
            resetFilterState(screenlabels.dataset.crop)

            tempFilterDisplay = [...geoFilterDisplay]
            for(let i=0; i<tempFilterDisplay.length; i++){
                if(tempFilterDisplay[i].index == index){
                    tempFilterDisplay[i].isChecked = !tempFilterDisplay[i].isChecked
                }
            }
            setGeoFilterDisplay(tempFilterDisplay)

            tempFilterMaster = [...geoFilterMaster]
            for(let i =0; i<tempFilterMaster.length; i++){
                if(tempFilterMaster[i].index == index){
                    tempFilterMaster[i].isChecked = !tempFilterMaster[i].isChecked
                }
                if(tempFilterMaster[i].isChecked){
                    payloadList.push(tempFilterMaster[i].name)
                }
            }
            setGeoFilterMaster(tempFilterMaster)
            payload = buildFilterPayLoad("",getUserLocal(),payloadList,"","")

        } else if(filterName == screenlabels.dataset.age){

            resetFilterState(screenlabels.dataset.geography)
            resetFilterState(screenlabels.dataset.crop)

            tempFilterDisplay = [...ageFilterDisplay]
            for(let i=0; i<tempFilterDisplay.length; i++){
                if(tempFilterDisplay[i].index == index){
                    tempFilterDisplay[i].isChecked = !tempFilterDisplay[i].isChecked
                }
            }
            setAgeFilterDisplay(tempFilterDisplay)

            tempFilterMaster = [...ageFilterMaster]
            for(let i =0; i<tempFilterMaster.length; i++){
                if(tempFilterMaster[i].index == index){
                    tempFilterMaster[i].isChecked = !tempFilterMaster[i].isChecked
                }
                if(tempFilterMaster[i].isChecked){
                    payloadList.push(tempFilterMaster[i].name)
                }
            }
            setAgeFilterMaster(tempFilterMaster)
            payload = buildFilterPayLoad("",getUserLocal(),"",payloadList,"")

        } else if(filterName == screenlabels.dataset.crop){

            resetFilterState(screenlabels.dataset.geography)
            resetFilterState(screenlabels.dataset.age)

            tempFilterDisplay = [...cropFilterDisplay]
            for(let i=0; i<tempFilterDisplay.length; i++){
                if(tempFilterDisplay[i].index == index){
                    tempFilterDisplay[i].isChecked = !tempFilterDisplay[i].isChecked
                }
            }
            setCropFilterDisplay(tempFilterDisplay)

            tempFilterMaster = [...cropFilterMaster]
            for(let i =0; i<tempFilterMaster.length; i++){
                if(tempFilterMaster[i].index == index){
                    tempFilterMaster[i].isChecked = !tempFilterMaster[i].isChecked
                }
                if(tempFilterMaster[i].isChecked){
                    payloadList.push(tempFilterMaster[i].name)
                }
            }
            setCropFilterMaster(tempFilterMaster)
            payload = buildFilterPayLoad("",getUserLocal(),"","",payloadList)
        }

        getDatasetList(payload)
    }

    const resetFilterState = (filterName) => {
        var tempfilterMaster = []
        var tempFilerDisplay = []
        if(filterName == screenlabels.dataset.geography){

            tempfilterMaster = [...geoFilterMaster]
            for(let i=0; i<tempfilterMaster.length; i++){
                tempfilterMaster[i].isChecked = false
            }
            setGeoFilterMaster(tempfilterMaster)

            tempFilerDisplay = [...geoFilterDisplay]
            for(let i=0; i<tempFilerDisplay.length; i++){
                tempFilerDisplay[i].isChecked = false
            }
            setGeoFilterDisplay(tempFilerDisplay)

        } else if(filterName == screenlabels.dataset.age){

            tempfilterMaster = [...ageFilterMaster]
            for(let i=0; i<tempfilterMaster.length; i++){
                tempfilterMaster[i].isChecked = false
            }
            setAgeFilterMaster(tempfilterMaster)

            tempFilerDisplay = [...ageFilterDisplay]
            for(let i=0; i<tempFilerDisplay.length; i++){
                tempFilerDisplay[i].isChecked = false
            }
            setAgeFilterDisplay(tempFilerDisplay)

        } else if(filterName == screenlabels.dataset.crop){

            tempfilterMaster = [...cropFilterMaster]
            for(let i=0; i<tempfilterMaster.length; i++){
                tempfilterMaster[i].isChecked = false
            }
            setCropFilterMaster(tempfilterMaster)

            tempFilerDisplay = [...cropFilterDisplay]
            for(let i=0; i<tempFilerDisplay.length; i++){
                tempFilerDisplay[i].isChecked = false
            }
            setCropFilterDisplay(tempFilerDisplay)
        }
    }

    const handleGeoSearch = (e) => {
        const searchText = e.target.value
        var tempList = [...geoFilterDisplay]
        for(let i=0; i<tempList.length; i++){
            if(searchText == ""){
                tempList[i].isDisplayed = true
            } else {
                if(!tempList[i].name.toUpperCase().startsWith(searchText.toUpperCase()) ){
                    tempList[i].isDisplayed = false
                }
            }
        }
        
        setGeoFilterDisplay(tempList)
    }

    const handleCropSearch = (e) => {
        const searchText = e.target.value
        var tempList = [...cropFilterDisplay]
        for(let i=0; i<tempList.length; i++){
            if(searchText == ""){
                tempList[i].isDisplayed = true
            } else {
                if(!tempList[i].name.toUpperCase().startsWith(searchText.toUpperCase()) ){
                    tempList[i].isDisplayed = false
                }
            }
        }
        
        setCropFilterDisplay(tempList)
    }

    useEffect(() => {
        getFilters()
        getDatasetList(buildFilterPayLoad("",getUserLocal(),"","",""))
    }, []);

    // const getFilters = () => {
    //     setIsLoader(true);
    //     HTTPService(
    //     "GET",
    //     UrlConstant.base_url + UrlConstant.dataset_filter,
    //     payload,
    //     false,
    //     true
    //     )
    //     .then((response) => {
    //         setIsLoader(false);
    //         setGeoCheckStateList(resetFilter())
    //         setCropCheckStateList(resetFilter())
    //         setAgeCheckStateList(resetFilter())

    //         console.log("response:", response);
            
    //         console.log("geography:", response.data.geography);
    //         setGeoMasterList(response.data.geography)
    //         setGeographyList(response.data.geography)
            
    //         console.log("crop:",response.data.crop_detail)
    //         setCropMasterList(response.data.crop_detail)
    //         setCropList(response.data.crop_detail)
            
    //     })
    //     .catch((e) => {
    //         setIsLoader(false);
    //         history.push(GetErrorHandlingRoute(e));
    //     });
    // }

    const getFilters = () => {
        setIsLoader(true);
        HTTPService(
        "GET",
        UrlConstant.base_url + UrlConstant.dataset_filter,
        payload,
        false,
        true
        )
        .then((response) => {
            setIsLoader(false);
            console.log("filter response:", response);
            
            // console.log("geography:", response.data.geography);

            var geoFilterInput = response.data.geography
            // var geoFilter = []
            // for(var i =0; i<geoFilterInput.length; i++){
            //     var data = {}
            //     data['index'] = i;
            //     data['name'] = geoFilterInput[i]
            //     data['isChecked'] = false
            //     geoFilter.push(data)
            // }
            // console.log("crop:",response.data.crop_detail)
            var cropFilterInput = response.data.crop_detail
            // var cropFilter = []
            // for(var i =0; i<cropFilterInput.length; i++){
            //     var data = {}
            //     data['index'] = i;
            //     data['name'] = cropFilterInput[i]
            //     data['isChecked'] = false
            //     cropFilter.push(data)
            // }

            // console.log("tempGepList",geoFilter)
            setGeoFilterMaster(initFilter(geoFilterInput))
            setGeoFilterDisplay(initFilter(geoFilterInput))

            setCropFilterMaster(initFilter(cropFilterInput))
            setCropFilterDisplay(initFilter(cropFilterInput))

            console.log("geoFilterMaster", geoFilterMaster)
            console.log("geoFilterDisplay", geoFilterDisplay)
            console.log("cropFilterMaster",cropFilterMaster)
            console.log("cropFilterDisplay", cropFilterDisplay)
            
        })
        .catch((e) => {
            setIsLoader(false);
            history.push(GetErrorHandlingRoute(e));
        });
    }

    const initFilter = (filterInput) => {
        let filter = []
        for(var i =0; i<filterInput.length; i++){
            var data = {}
            data['index'] = i;
            data['name'] = filterInput[i]
            data['isChecked'] = false
            data['isDisplayed'] = true
            filter.push(data)
        }
        return filter
    }

    
    const getDatasetList = (payload) => {
        setIsLoader(true);
        if(payload == null){
            payload = buildFilterPayLoad("",getUserLocal(),"","","")
        } 
        HTTPService(
            // "POST",
            "GET",
            datasetUrl,
            payload,
            false,
            true
            )
            .then((response) => {
                setIsLoader(false);
                console.log("response:", response)
                console.log("datatset:",response.data.results)

                //code to convert dataset results into display cards list
                if (response.data.next == null) {
                    setisShowLoadMoreButton(true)
                } else {
                    setisShowLoadMoreButton(true)
                    setDatasetUrl(response.data.next);
                }
                if(!isMemberTab){
                    setDatasetList(response.data.results)
                } else {
                    setMemberDatasetList(response.data.results)
                }
            })
            .catch((e) => {
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }

    const buildFilterPayLoad = (createdAtRange,userId,geoPayload,agePayload,cropPayload) => {
        let data = {}
        data['created_at__range'] = createdAtRange
        data['user_id'] = userId
        if(isMemberTab){
            data['others'] = true
        } else {
            data['others'] = false
        }
        data['geography__in'] = geoPayload
        data['crop_detail__in'] = cropPayload
        data['age__in'] = agePayload
        return data
    }

    const handleTabChange = (event, newValue) => {
        // console.log(newValue)
        // setIsMemberTab(!isMemberTab)
        // console.log("isMemberTab",isMemberTab)
        setValue(newValue);
        if(newValue == "2"){
            setIsMemberTab(true)
        } else{
            setIsMemberTab(false)
        }
        
    };

    const resetFilter =() => {
        let filter = []
        for(let i = 0; i<1000; i++){
            filter.push(false)
        }
        return filter
    }

    const filterRow = (row, flag, payloadkey) => {
        if (flag != false) {
            let tempfilterObject = { ...filterObject }
            if (payloadkey != 'all') {
                let data = {}
                data[payloadkey] = row
                payload = data;
            } else {
                payload = ""
            }
            tempfilterObject[row] = flag;
            Object.keys(tempfilterObject).forEach(function (key) { if (key != row) { tempfilterObject[key] = false } });
            setfilterObject(tempfilterObject)
            setsecondrow(false)
            settodate(null)
            setfromdate(null);
            getDatasetList(payload)
        }
    }

    const getAllDataSets = () => {
        setGeoCheckStateList(resetFilter())
        setAgeCheckStateList(resetFilter())
        setCropCheckStateList(resetFilter())
        
        setsecondrow(false)
        settodate(null)
        setfromdate(null);

        var payload = buildFilterPayLoad("",getUserLocal(),"","","")

        getDatasetList(payload)

    }

    const filterByDates = () => {
        // let tempfilterObject = { ...filterObject }
        // Object.keys(tempfilterObject).forEach(function (key) { tempfilterObject[key] = false });
        // setfilterObject(tempfilterObject)
        let fromDateandToDate = []
        fromDateandToDate.push(fromdate)
        fromDateandToDate.push(todate)
        // let data = {}
        // data['created_at__range'] = fromDateandToDate
        payload = buildFilterPayLoad(fromDateandToDate,getUserLocal(),"","","")
        setsecondrow(true)
        getDatasetList(payload)
    }

  return (
      <>
        {isLoader? <Loader/> : ''}
        <Row className="supportfirstmaindiv">
        {/* <Row className="secondmainheading width100percent">{screenlabels.support.heading}</Row> */}
            <Row className="supportmaindiv">
                <Row className="supportfilterRow">
                    <Col className="supportfilterCOlumn">
                        <DataSetFilter
                            filterObject={filterObject}
                            secondrow={secondrow}
                            fromdate={fromdate}
                            todate={todate}
                            setfromdate={setfromdate}
                            settodate={settodate}
                            // filterRow={filterRow}
                            getAllDataSets={getAllDataSets}
                            filterByDates={filterByDates}
                            geoMasterList={geoMasterList}
                            geographyList={geographyList}
                            geoCheckStateList={geoCheckStateList}
                            handleGeoSearch={handleGeoSearch}
                            ageMasterList={ageMasterList}
                            ageList={ageList}
                            ageCheckStateList={ageCheckStateList}
                            cropMasterList={cropMasterList}
                            cropCheckStateList={cropCheckStateList}
                            cropList={cropList}
                            handleCropSearch={handleCropSearch}
                            handleCheckListFilterChange={handleCheckListFilterChange}

                            geoFilterDisplay={geoFilterDisplay}
                            cropFilterDisplay={cropFilterDisplay}
                            ageFilterDisplay={ageFilterDisplay}
                            handleFilterChange={handleFilterChange}

                        />
                    </Col>
                    <Col className="supportSecondCOlumn">
                        <Col xs={12} sm={12} md={12} lg={12} className="settingsTabs">
                            <Box>
                                <TabContext value={value} className="tabstyle">
                                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                        <TabList
                                        onChange={handleTabChange}
                                        aria-label="lab API tabs example">
                                        <Tab label="My Datasets" value='1' />
                                        <Tab label="Member Datasets" value='2' />
                                        </TabList>
                                    </Box>
                                    <TabPanel value='1'>
                                        <DataSetListing
                                            datasetList={datasetList}
                                            isShowLoadMoreButton={isShowLoadMoreButton}
                                            getDatasetList={getDatasetList}
                                        />
                                    </TabPanel>
                                    <TabPanel value='2'>
                                        <DataSetListing
                                            datasetList={datasetList}
                                            isShowLoadMoreButton={isShowLoadMoreButton}
                                            getDatasetList={getDatasetList}
                                        />
                                        {/* <OrganisationSetting
                                        setisOrgUpdateSuccess={() => {
                                            setistabView(false);
                                            setisOrgUpdateSuccess(true);
                                        }}
                                        /> */}
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </Col>
                    </Col>
                </Row>
            </Row>
        </Row>
    </>
  )
}
