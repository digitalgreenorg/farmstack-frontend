import React, { useState } from 'react'
import { Box, Button, Card, Divider, IconButton, InputAdornment, TextField } from '@mui/material';
import { useHistory } from "react-router-dom";
import { isLoggedInUserAdmin, isLoggedInUserParticipant } from '../Utils/Common'
import './DataSets.css';
import FooterNew from '../Components/Footer/FooterNew';
import AddDataSetCardNew from '../Components/Datasets/AddDataSetCardNew';
import DataSetCardNew from '../Components/Datasets/DataSetCardNew';

const cardSx = {
    maxWidth: 368, height: 190, border: '1px solid #C0C7D1', borderRadius: '10px',
    "&:hover": {
        boxShadow: '-40px 40px 80px rgba(145, 158, 171, 0.16)',
        cursor: 'pointer'
    }
};
const DataSets = (props) => {
    const history = useHistory();
    const [state, setState] = useState([0, 1, 2, 3, 4, 5])

    const addDataset = () => {
        if (isLoggedInUserAdmin()) {
            return "/datahub/datasets/add";
        } else if (isLoggedInUserParticipant()) {
            return "/participant/new_datasets/add";
        }
    }
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
                <TextField
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#919EAB'
                            },
                            '&:hover fieldset': {
                                borderColor: '#919EAB'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#919EAB'
                            },
                        }
                    }}
                    className='input_field' placeholder="Search dataset.."
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
                        <AddDataSetCardNew history={history} addDataset={addDataset} />
                        {state.map((s) => (
                            <DataSetCardNew />
                        ))}
                    </div>
                    <Button variant="contained" className='d_button_style'>View all datasets</Button>
                </Box>
            </Box>
            <Divider />
            <FooterNew />
        </>
    )
}

export default DataSets;