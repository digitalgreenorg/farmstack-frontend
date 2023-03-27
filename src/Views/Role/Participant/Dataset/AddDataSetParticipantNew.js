import React, { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material';
import { useHistory } from "react-router-dom";
import { getTokenLocal } from "../../../../Utils/Common";

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
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', borderBottom: '1px solid #3D4A52 !important' }}>
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
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
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
        </Box>
    )
}

export default AddDataSetParticipantNew