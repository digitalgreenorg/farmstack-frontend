import React, { useState } from 'react'
import { Box, Button, Card, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import './ParticipantMain.css'

const cardSx = {
    maxWidth: 368, height: 314, border: '1px solid #F2F3F5', borderRadius: '16px',
    "&:hover": {
        boxShadow: '-40px 40px 80px rgba(145, 158, 171, 0.16)',
        cursor: 'pointer'
    }
};
const ParticipantMain = () => {
    const [state, setState] = useState([0, 1, 2, 3, 4, 5])
    return (
        <Box sx={{ padding: "40px", width: "100%" }}>
            <div className='title'>Our participants</div>
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
                                <img src={require('../Assets/Img/input_search.svg')} alt="new" />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Box sx={{ marginLeft: '144px', marginRight: '144px' }}>
                <div className='bold_title'>Our Participants are</div>
                <div className='participants_card'>
                    {state.map((s) => (
                        <Card className='card' sx={cardSx}>
                            <div className='img_container'>
                                <img src={require('../Assets/Img/participant_organization.svg')} alt="new" />
                            </div>
                            <div className='content_title'>International Center for Tropical Agriculture</div>
                            <div className='content_text'>
                                <div className='content_text1'>Datasets</div>
                                <div className='content_text2'>03</div>
                            </div>
                        </Card>
                    ))}
                </div>
                <Button variant="outlined" className='button_style'>Load More</Button>
            </Box>
        </Box>
    )
}

export default ParticipantMain;