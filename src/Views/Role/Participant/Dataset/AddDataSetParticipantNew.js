import React, { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material';
import { useHistory } from "react-router-dom";
import { getTokenLocal } from "../../../../Utils/Common";
import './AddDataSetParticipantNew.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const AddDataSetParticipantNew = () => {
    const history = useHistory();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ marginLeft: '144px', marginRight: '144px' }}>
            <div className='text-left mt-50'>
                <span className='add_light_text'>Dataset</span>
                <span className='add_light_text ml-16'>
                    <img src={require("../../../../Assets/Img/dot.svg")} />
                </span>
                <span className='add_light_text ml-16'>Add new dataset</span>
            </div>
            <Box sx={{ marginTop: '63px', borderBottom: 1, borderColor: 'divider', borderBottom: '1px solid #3D4A52 !important' }}>
                <Tabs
                    className='tabs'
                    sx={{
                        '& .MuiTabs-indicator': { backgroundColor: "#00AB55 !important" },
                        '& .MuiTab-root': {
                            color: "#637381 !important",
                            borderLeft: 'none !important',
                            borderTop: 'none !important',
                            borderRight: 'none !important',
                        },
                        '& .Mui-selected': { color: "#00AB55 !important" },
                    }}
                    value={value} onChange={handleChange}>
                    <Tab label={<span className={value == 0 ? 'tab_header_selected' : 'tab_header'}>Basic details</span>} />
                    <Tab label={<span className={value == 1 ? 'tab_header_selected' : 'tab_header'}>Upload or import</span>} />
                    <Tab label={<span className={value == 2 ? 'tab_header_selected' : 'tab_header'}>Standardise</span>} />
                    <Tab label={<span className={value == 3 ? 'tab_header_selected' : 'tab_header'}>Categorise</span>} />
                    <Tab label={<span className={value == 4 ? 'tab_header_selected' : 'tab_header'}>Usage policy</span>} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
        </Box>
    )
}

export default AddDataSetParticipantNew