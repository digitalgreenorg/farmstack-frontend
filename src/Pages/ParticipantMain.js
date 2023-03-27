import React, { useState } from 'react'
import { Box, Button, Card, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './ParticipantMain.css'
import ControlledAccordion from '../Components/Accordion/Accordion';

const cardSx = {
    maxWidth: 368, height: 314, border: '1px solid #F2F3F5', borderRadius: '16px',
    "&:hover": {
        boxShadow: '-40px 40px 80px rgba(145, 158, 171, 0.16)',
        cursor: 'pointer'
    }
};

// root: {
//     '& label.Mui-focused': {
//       color: 'green',
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: 'green',
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: 'red',
//       },
//       '&:hover fieldset': {
//         borderColor: 'yellow',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: 'green',
//       },
//     },
//   },
const ParticipantMain = () => {
    const [state, setState] = useState([0, 1, 2, 3, 4, 5])
    const [data, setData] = useState([
        {
            title: 'Rice',
            details: ['Brown Rice', 'White Rice', 'Samba Rice',
                'Basmati Rice', 'Jasmine Rice', 'Susi Rice',
                'Mogra Rice', 'Arborio Rice', 'Red Cargo Rice',
                'blank Rice', 'White Rice', 'Samba Rice'
            ],
            panel: 'panel1'
        },
        {
            title: 'Wheat',
            details: ['Brown Wheat', 'White Wheat', 'Samba Wheat',
                'Basmati Wheat', 'Jasmine Wheat', 'Susi Wheat',
                'Mogra Wheat', 'Arborio Wheat', 'Red Cargo Wheat',
                'blank Wheat', 'White Wheat', 'Samba Wheat'
            ],
            panel: 'panel2'
        },
        {
            title: 'Tomato',
            details: [
                'Red Tomato', 'Blue Tomato', 'Green Tomato',
                'Orange Tomato', 'Small Tomato'
            ],
            panel: 'panel3'
        },
        {
            title: 'Coconut',
            details: [
                'Green Coconut', 'Brown Coconut', 'Indian Coconut',
                'Natural Coconut', 'Unnatural Coconut'
            ],
            panel: 'panel4'
        }
    ])
    return (
        <>
            <Box sx={{ padding: "40px", maxWidth: "100%" }}>
                {/* section-1 */}
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
                                    <img src={require('../Assets/Img/input_search.svg')} alt="search" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {/* section-2 */}
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
            <Divider />
            {/* footer */}
            <Box sx={{ padding: "40px", marginLeft: '144px', marginRight: '144px' }}>
                <div className='logo_container text-left'>
                    <img src={require('../Assets/Img/footer_logo.svg')} alt="footerLogo" />
                </div>
                <div className='footer_content text-left'>
                    <div className='contact'>
                        <div className='footer_title'>Contacts</div>
                        <div className='mb-30 mt-20'>
                            <div className='footer_light_text text-left'>Email</div>
                            <div className='footer_dark_text mt-2 text-left'>info@ata.org</div>
                        </div>
                        <div className='mb-30'>
                            <div className='footer_light_text text-left'>Datahub admin phone</div>
                            <div className='footer_dark_text mt-2 text-left'>+91 98765 43210</div>
                        </div>
                        <div>
                            <div className='footer_light_text text-left'>Organization Website</div>
                            <div className='link mt-2'>www.ethopianata.com</div>
                        </div>
                    </div>
                    <div className='links w-25'>
                        <div className='footer_title'>Quick links</div>
                        <div className='footer_link mt-20'>
                            <div className='d-flex justify-content-between w-100'>
                                <div className='footer_light_text'>Home</div>
                                <div className='footer_light_text'>Contact us</div>
                            </div>
                            <div className='d-flex justify-content-between w-100'>
                                <div className='footer_light_text mt-10'>About Farmstack</div>
                                <div className='footer_light_text mt-10'>Legal</div>
                            </div>
                            <div className='d-flex justify-content-between w-100'>
                                <div className='footer_light_text mt-10 '>Datasets</div>
                                <div className='footer_light_text mt-10'>Login</div>
                            </div>
                            <div className='d-flex justify-content-between w-100'>
                                <div className='footer_light_text mt-10 '>Participants</div>
                                <div className='footer_light_text mt-10'>Get started</div>
                            </div>
                        </div>
                    </div>
                    <div className='staytuned'>
                        <div className='footer_title'>Stay tuned</div>
                        <div className='mt-20 footer_light_text'>Subscribe to our newsletter and never miss datasets,</div>
                        <div className='footer_light_text mb-30'>latest news, etc.,</div>
                        <div className='footer_light_text'>Our newsletter is sent once a month every first week.</div>
                        <div className='mt-20 mb-20'>
                            <TextField
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#00AB55'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#00AB55'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#00AB55'
                                        },
                                    }
                                }}
                                className="input_field_subscribe" placeholder="Enter your e-mail id" variant='outlined'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Button sx={{
                                                background: "#00AB55",
                                                borderRadius: "8px",
                                                color: "#FFFFFF",
                                                fontWeight: 700,
                                                fontSize: "16px",
                                                width: "172px",
                                                height: "56px",
                                                "&:hover": {
                                                    background: "#00AB55",
                                                }
                                            }} className='button_text'>Subscribe</Button>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                </div>
                <ControlledAccordion data={data} />
            </Box>
        </>
    )
}

export default ParticipantMain;