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
    const [value, setValue] = useState('1')
    const [secondrow, setsecondrow] = useState(false)
    const [fromdate, setfromdate] = useState(null);
    const [todate, settodate] = useState(null);
    const history = useHistory();
    const [isMemberTab, setIsMemberTab] = useState(false)

    var payload = ""
    const [filterObject, setfilterObject] = useState(
        {
            "all": true,
            "fromDateandToDate": [],
            "geographyList": [],
            "ageList": [],
            "cropList": []
        });

    const resetFilters = () => {
        setfilterObject(
            {
            "all": true,
            "fromDateandToDate": [],
            "geographyList": [],
            "ageList": [],
            "cropList": []
            }
        )
    }

    const [datasetList, setDatasetList] = useState([])

    const [geoMasterList,setGeoMasterList] = useState(['India','Ethiopia'])
    const [geographyList, setGeographyList] = useState(['India','Ethiopia'])
    const [geoCheckStateList, setGeoCheckStateList] = useState([false,false])

    const [cropMasterList, setCropMasterList] = useState([])
    const [cropList,setCropList] = useState([])
    const [cropCheckStateList, setCropCheckStateList] = useState([])

    const [ageMasterList, setAgeMasterList] = useState(["3 Months","6 Months","9 Months","Constantly Updating"])
    const [ageList, setAgeList] = useState(["3 Months","6 Months","9 Months","Constantly Updating"])
    const [ageCheckStateList, setAgeCheckStateList] = useState([false,false,false,false])

    const handleCheckListFilterChange = (listName,index) => {

        var resetCheckStateList = []
        var tempList = []
        if(listName==="geography"){
            console.log("Toggled Geography Filter index:", index)
            tempList = [...geoCheckStateList]
            tempList[index] = !geoCheckStateList[index]
            setGeoCheckStateList(tempList)

            setCropCheckStateList(resetCheckStateList)
            setAgeCheckStateList(resetCheckStateList)
            
        } else if(listName === "crop"){
            console.log("Toggled Crop Filter Index:", index)
            tempList = [...cropCheckStateList]
            tempList[index] = !cropCheckStateList[index]
            setCropCheckStateList(tempList)

            setGeoCheckStateList(resetCheckStateList)
            setAgeCheckStateList(resetCheckStateList)
        } else if(listName === "age"){
            console.log("Toggled Age Filter Index:", index)
            tempList = [...ageCheckStateList]
            tempList[index] = !ageCheckStateList[index]
            setAgeCheckStateList(tempList)

            setGeoCheckStateList(resetCheckStateList)
            setCropCheckStateList(resetCheckStateList)
        }

        // let data = {}



    }

    const handleGeoSearch = (e) => {
        const searchText = e.target.value
        var tempList =[]
        if(searchText == ""){
            tempList = geoMasterList
        } else {
            tempList = geoMasterList.filter((geo)=>{
                return geo.startsWith(searchText)
            })
        }
        setGeographyList(tempList)
    }

    const handleCropSearch = (e) => {
        const searchText = e.target.value
        var tempList =[]
        if(searchText == ""){
            tempList = cropMasterList
        } else {
            tempList = cropMasterList.filter((crop)=>{
                return crop.startsWith(searchText)
            })
        }
        setCropList(tempList)
    }

    useEffect(() => {
        getFilters()
        getDatasetList()
    }, []);

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
            console.log("response:", response);
            
            console.log("geography:", response.data.geography);
            setGeoMasterList(response.data.geography)
            setGeographyList(response.data.geography)
            setGeoCheckStateList(geoMasterList.map((geo)=>{return false}))

            console.log("crop:",response.data.crop_detail)
            setCropMasterList(response.data.crop_detail)
            setCropList(response.data.crop_detail)
            setCropCheckStateList(cropMasterList.map((crop)=>{return false}))

        })
        .catch((e) => {
            setIsLoader(false);
            history.push(GetErrorHandlingRoute(e));
        });
    }

    
    const getDatasetList = (payload) => {
        setIsLoader(true);
        if(payload == null){
            payload = {}
        }
        payload['user_id'] = getUserLocal()
        HTTPService(
            "GET",
            UrlConstant.base_url + UrlConstant.dataset_list,
            "",
            false,
            true
            )
            .then((response) => {
                setIsLoader(false);
                console.log("response:", response)
                console.log("datatset:",response.data.results)
                setDatasetList(response.data.results)
    
            })
            .catch((e) => {
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }

  const handleTabChange = (event, newValue) => {
    // console.log(newValue)
    // setIsMemberTab(!isMemberTab)
    // console.log("isMemberTab",isMemberTab)
    setValue(newValue);
    
  };

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

  const filterByDates = () => {
    // let tempfilterObject = { ...filterObject }
    // Object.keys(tempfilterObject).forEach(function (key) { tempfilterObject[key] = false });
    // setfilterObject(tempfilterObject)
    let fromDateandToDate = []
    fromDateandToDate.push(fromdate)
    fromDateandToDate.push(todate)
    let data = {}
    data['created_at__range'] = fromDateandToDate
    payload = data;
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
                            filterRow={filterRow}
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
                                        />
                                    </TabPanel>
                                    <TabPanel value='2'>
                                        <DataSetListing
                                            datasetList={datasetList}
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
