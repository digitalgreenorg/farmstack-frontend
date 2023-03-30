import React, { useState } from 'react'
import { Box, Tab, Tabs, Divider, Button, Typography } from '@mui/material'
import './DataSetsTab.css'
import AddDataSetCardNew from '../AddDataSetCardNew';
import DataSetCardNew from '../DataSetCardNew';
import DataSetsTitleView from './DataSetsTitleView';

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
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const DataSetsTab = ({ history, addDataset, state }) => {
    const [value, setValue] = useState(0);
    const [isGrid, setIsGrid] = useState(true)
    const [isGridOther, setIsGridOther] = useState(true)
    const [isGridSteward, setIsGridSteward] = useState(true)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box className='w-100'>
            <Box sx={{ marginLeft: '144px', marginRight: '144px' }}>
                <div className='text-left mt-50'>
                    <span className='add_light_text'>Dataset</span>
                    <span className='add_light_text ml-16'>
                        <img src={require("../../../Assets/Img/dot.svg")} />
                    </span>
                    <span className='add_light_text ml-16'>Standardise</span>
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
                        <Tab label={<span className={value == 0 ? 'tab_header_selected' : 'tab_header'}>My Organisation</span>} />
                        <Tab sx={{
                            '&.MuiButtonBase-root': {
                                minWidth: '200px'
                            }
                        }} label={<span className={value == 1 ? 'tab_header_selected' : 'tab_header'}>Other Organisation</span>} />
                        <Tab label={<span className={value == 2 ? 'tab_header_selected' : 'tab_header'}>Co-steward</span>} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box className='mb-100'>
                        <DataSetsTitleView title={'My organisation datasets'} isGrid={isGrid} setIsGrid={setIsGrid} />
                        <div className='datasets_card'>
                            <AddDataSetCardNew history={history} addDataset={addDataset} />
                            {state.map((s) => (
                                <DataSetCardNew />
                            ))}
                        </div>
                        <Button variant="outlined" className='d_button_style'>Load more</Button>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box className='mb-100'>
                        <DataSetsTitleView title={'Other organisation datasets'} isGrid={isGridOther} setIsGrid={setIsGridOther} />
                        <div className='datasets_card'>
                            <AddDataSetCardNew history={history} addDataset={addDataset} />
                            {state.map((s) => (
                                <DataSetCardNew />
                            ))}
                        </div>
                        <Button variant="outlined" className='d_button_style'>Load more</Button>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box className='mb-100'>
                        <DataSetsTitleView title={'Co-steward datasets'} isGrid={isGridSteward} setIsGrid={setIsGridOther} />
                        <div className='datasets_card'>
                            <AddDataSetCardNew history={history} addDataset={addDataset} />
                            {state.map((s) => (
                                <DataSetCardNew />
                            ))}
                        </div>
                        <Button variant="outlined" className='d_button_style'>Load more</Button>
                    </Box>
                </TabPanel>
            </Box>
        </Box>
    )
}

export default DataSetsTab