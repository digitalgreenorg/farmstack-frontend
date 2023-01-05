import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Admin_upload_dataset from './UploadDatasetComponent';
import Admin_add_metadata from './AddMetadata';
import "./admin-add-dataset.css"
const AddDataset = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container id='admin_add_dataset_main_container'>
            <Row className='main_heading_row'>
                <Col lg={3} sm={6}>
                    <span className='Main_heading_add_dataset'>Add dataset</span>
                </Col>
            </Row>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList aria-label="lab API tabs example">
                        <Tab onClick={(e) => handleChange(e, '1')} label="Upload dataset" value="1" />
                        <Tab disabled label="Add metadata" value="2" />
                        {/* <Tab label="Item Three" value="3" /> */}
                    </TabList>
                </Box>
                <TabPanel value="1"><Admin_upload_dataset handleMetadata={handleChange} /></TabPanel>
                <TabPanel value="2"><Admin_add_metadata /></TabPanel>
                {/* <TabPanel value="3">Item Three</TabPanel> */}
            </TabContext>
        </Container>
    )
}

export default AddDataset