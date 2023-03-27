import { Box, Button, Card, Divider, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react'
import './DataSets.css';

const cardSx = {
    maxWidth: 368, height: 190, border: '1px solid #C0C7D1', borderRadius: '10px',
    "&:hover": {
        boxShadow: '-40px 40px 80px rgba(145, 158, 171, 0.16)',
        cursor: 'pointer'
    }
};
const DataSets = () => {
    const [state, setState] = useState([0, 1, 2, 3, 4, 5])
    return (
        <>
            <Box sx={{ padding: "40px", maxWidth: "100%" }}>
                {/* section-1 */}
                <div className='title'>List of datasets</div>
                <div className='d-flex justify-content-center'>
                    <div className='description'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae tellus scelerisque, imperdiet augue id, accumsan dolor. Integer ac neque quis metus pretium tempus.
                    </div>
                </div>
                <TextField className='input_field' placeholder="Search dataset.."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <IconButton>
                                    <img src={require('../Assets/Img/input_search.svg')} alt="search" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <div className='filter'>
                    <div className='d-flex align-items-center'>
                        <img src={require('../Assets/Img/geography_new.svg')} alt="geography" />
                        <span className='filter_text'>Geography</span>
                    </div>
                    <div className='d-flex align-items-center'>
                        <img src={require('../Assets/Img/by_age.svg')} alt="by age" />
                        <span className='filter_text'>By Age</span>
                    </div>
                    <div className='d-flex align-items-center'>
                        <img src={require('../Assets/Img/crop_new.svg')} alt="crop" />
                        <span className='filter_text'>Crop</span>
                    </div>
                    <div className='d-flex align-items-center'>
                        <img src={require('../Assets/Img/by_date.svg')} alt="by date" />
                        <span className='filter_text'>By Date</span>
                    </div>
                    <div className='d-flex align-items-center'>
                        <img src={require('../Assets/Img/clear_all.svg')} alt="clear all" />
                        <span className='filter_text'>Clear all</span>
                    </div>
                </div>
            </Box>
            <Divider />
            {/* section-2 */}
            <Box sx={{ padding: "40px", maxWidth: "100%" }}>
                <Box sx={{ marginLeft: '144px', marginRight: '144px' }}>
                    <div className='bold_title'>Datasets</div>
                    <div className='datasets_card'>
                        {state.map((s) => (
                            <Card className='card' sx={cardSx}>
                                <div className='published'>
                                    <img src={require('../Assets/Img/globe.svg')} alt="globe" />
                                    <span className='published_text'>Published on: 28/03/2022</span>
                                </div>
                                <div className='content_title'>Soil parameter</div>
                                <div className='organisation'>
                                    <img src={require('../Assets/Img/organisation.svg')} alt="organisation" />
                                    <span className='organisation_text'>EATA</span>
                                </div>
                                <div className='content_text'>
                                    <div className='category'>
                                        <img src={require('../Assets/Img/category.svg')} alt="category" />
                                        <span className='category_text'>Wheat</span>
                                    </div>
                                    <div className='location'>
                                        <img src={require('../Assets/Img/location.svg')} alt="location" />
                                        <span className='location_text'>Addis</span>
                                    </div>
                                    <div className='calendar'>
                                        <img src={require('../Assets/Img/calendar_new.svg')} alt="calendar" />
                                        <span className='calendar_text'>6 months old</span>
                                    </div>

                                </div>
                            </Card>
                        ))}
                    </div>
                    <Button variant="contained" className='button_style'>View all datasets</Button>
                </Box>
            </Box>
            <Divider />
        </>
    )
}

export default DataSets;