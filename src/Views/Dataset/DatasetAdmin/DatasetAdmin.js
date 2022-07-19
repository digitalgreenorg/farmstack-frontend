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
import DataSetCard from '../../../Components/Datasets/DataSetCard';
import { width } from '@mui/system';
import AddCard from '../../../Components/AddCard/AddCard';
import { useHistory } from 'react-router-dom';

export default function DatasetAdmin() {

  const [screenlabels, setscreenlabels] = useState(labels['en']);
  const [isLoader, setIsLoader] = useState(false)
  const [value, setValue] = useState(1)
  const [isTabView, setIsTabView] = useState(true)
  const history = useHistory()

  const [filterObject, setfilterObject] = useState(
    {
        "all": true,
        "open": false,
        "hold": false,
        "closed": false,
        "connectors": false,
        "datasets": false,
        "others": false,
        "user_accounts": false,
        "usage_policy": false,
        "certificate": false
    });
    
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <>
        {isLoader? <Loader/> : ''}
        <Row className="supportfirstmaindiv">
        {/* <Row className="secondmainheading width100percent">{screenlabels.support.heading}</Row> */}
            <Row className="supportmaindiv">
                <Row className="supportfilterRow">
                    <Col className="supportfilterCOlumn">
                        <DataSetFilter/>
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
                                        <Tab label="My Datasets" value="1" />
                                        <Tab label="Member Datasets" value="2" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <DataSetListing
                                            isMyDataSet={true}
                                        />
                                    </TabPanel>
                                    <TabPanel value="2">
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
