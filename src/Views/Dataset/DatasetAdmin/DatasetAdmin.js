import React, { useState } from 'react'
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
import { useHistory } from 'react-router-dom';

export default function DatasetAdmin() {

  const [screenlabels, setscreenlabels] = useState(labels['en']);
  const [isLoader, setIsLoader] = useState(false)
  const [value, setValue] = useState('1')
  const [isTabView, setIsTabView] = useState(true)
  const [secondrow, setsecondrow] = useState(false)
  const history = useHistory()
  const [fromdate, setfromdate] = useState(null);
  const [todate, settodate] = useState(null);

  var payload = ""
  const [filterObject, setfilterObject] = useState(
    {
        "all": true,
        "filterName": "",
        "geographyList": [],
        "ageList": [],
        "cropList": []
    });

  const resetFilters = () => {
    setfilterObject(
        {
        "all": true,
        "filterName": "",
        "geographyList": [],
        "ageList": [],
        "cropList": []
        }
    )
  }

  const getDatasetList = (payload) => {

  }

  const handleTabChange = (event, newValue) => {
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
    let tempfilterObject = { ...filterObject }
    Object.keys(tempfilterObject).forEach(function (key) { tempfilterObject[key] = false });
    setfilterObject(tempfilterObject)
    let fromDateandToDate = []
    fromDateandToDate.push(fromdate)
    fromDateandToDate.push(todate)
    let data = {}
    data['updated_at__range'] = fromDateandToDate
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
                        />
                    </Col>
                    <Col className="supportSecondCOlumn">
                        {isTabView &&
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
                                            isMyDataSet={true}
                                        />
                                    </TabPanel>
                                    <TabPanel value='2'>
                                        <DataSetListing
                                            isMyDataSet={false}
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
                        </Col> }
                    </Col>
                </Row>
            </Row>
        </Row>
    </>
  )
}
