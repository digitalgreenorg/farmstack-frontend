import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import UrlConstant from '../../Constants/UrlConstants';
import HTTPService from '../../Services/HTTPService';
import { flushLocalstorage, getUserLocal, getTokenLocal, isLoggedInUserAdmin, isLoggedInUserParticipant } from '../../Utils/Common';
import './NavbarNew.css'

const NavbarNew = () => {

    const [profile, setProfile] = useState()
    const [isSelected, setIsSelected] = useState()
    const history = useHistory();

    const getAccountDetails = async () => {
        var id = getUserLocal();
        await HTTPService(
            "GET",
            UrlConstant.base_url + UrlConstant.profile + id + "/",
            "",
            false,
            true
        )
            .then((response) => {
                setProfile(response.data.id);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleParticipantLogout = (e) => {
        e.preventDefault();
        flushLocalstorage();
        history.push("/participant/login");
    };

    const handleDatahubLogout = (e) => {
        e.preventDefault();
        flushLocalstorage();
        history.push("/datahub/login");
    };

    const handleSignOut = (e) => {
        if (getTokenLocal() && isLoggedInUserAdmin()) {
            handleDatahubLogout(e)
        } else if (getTokenLocal() && isLoggedInUserParticipant()) {
            handleParticipantLogout(e)
        }
    }
    const handleSelect = (item, path) => {
        setIsSelected(item)
        if (getTokenLocal() && isLoggedInUserAdmin()) {
            history.push(path)
        } else if (getTokenLocal() && isLoggedInUserParticipant()) {
            history.push(path)
        } else if (!getTokenLocal()) {

        }
    }
    useEffect(() => {
        getAccountDetails();
    }, [profile]);

    return (
        <Box className='navbar_container'>
            <Box className='d-flex justify-content-between w-100' sx={{ marginLeft: '144px', marginRight: '144px' }}>
                <Box className='d-flex align-items-center'>
                    <img src={require('../../Assets/Img/footer_logo.svg')} alt="footerLogo" />
                </Box>
                <Box className='navbar_sub_container'>
                    {getTokenLocal() && isLoggedInUserAdmin() ?
                        <Typography
                            className={isSelected === 'dashboard' ? 'navbar_selected_text' : 'navbar_text'}
                            onClick={() => handleSelect('dashboard', '/datahub/dashboard')}
                        >
                            {isSelected === 'dashboard' ? <img className='dot_style' src={require('../../Assets/Img/green_dot.svg')} alt="dot" /> : <></>}Dashboard
                        </Typography>
                        : <></>

                    }
                    {!getTokenLocal() ?
                        <Typography
                            className={isSelected === 'home' ? 'navbar_selected_text' : 'navbar_text'}
                            onClick={() => handleSelect('home', '')}
                        >
                            {isSelected === 'home' ? <img className='dot_style' src={require('../../Assets/Img/green_dot.svg')} alt="dot" /> : <></>}Home
                        </Typography>
                        : <></>
                    }
                    {getTokenLocal() && (isLoggedInUserAdmin() || isLoggedInUserParticipant()) ?
                        <Typography
                            className={isSelected === 'datasets' ? 'navbar_selected_text' : 'navbar_text'}
                            onClick={() => {
                                let path = isLoggedInUserAdmin() ? '/datahub/datasets' : (isLoggedInUserParticipant() ? '/participant/new_datasets' : '')
                                handleSelect('datasets', path)
                            }
                            }
                        >
                            {isSelected === 'datasets' ? <img className='dot_style' src={require('../../Assets/Img/green_dot.svg')} alt="dot" /> : <></>}Datasets
                        </Typography>
                        : <></>
                    }
                    {getTokenLocal() && isLoggedInUserAdmin() ?
                        <Typography
                            className={isSelected === 'participants' ? 'navbar_selected_text' : 'navbar_text'}
                            onClick={() => handleSelect('participants', '/datahub/participants')}
                        >
                            {isSelected === 'participants' ? <img className='dot_style' src={require('../../Assets/Img/green_dot.svg')} alt="dot" /> : <></>}Participants
                        </Typography>
                        :
                        <></>
                    }
                    {getTokenLocal() && (isLoggedInUserAdmin() || isLoggedInUserParticipant()) ?
                        <Typography
                            className={isSelected === 'connectors' ? 'navbar_selected_text' : 'navbar_text'}
                            onClick={() => {
                                let path = isLoggedInUserAdmin() ? '/datahub/connectors' : (isLoggedInUserParticipant() ? '/participant/connectors' : '')
                                handleSelect('connectors', path)
                            }
                            }
                        >
                            {isSelected === 'connectors' ? <img className='dot_style' src={require('../../Assets/Img/green_dot.svg')} alt="dot" /> : <></>}Connectors
                        </Typography>
                        : <></>
                    }
                    {getTokenLocal() && isLoggedInUserAdmin() ?
                        <Typography
                            className={isSelected === 'support' ? 'navbar_selected_text' : 'navbar_text'}
                            onClick={() => handleSelect('support', '/datahub/support')}
                        >
                            {isSelected === 'support' ? <img className='dot_style' src={require('../../Assets/Img/green_dot.svg')} alt="dot" /> : <></>}Support
                        </Typography>
                        : <></>
                    }
                    {getTokenLocal() && (isLoggedInUserAdmin() || isLoggedInUserParticipant()) ?
                        <Typography
                            className={isSelected === 'settings' ? 'navbar_selected_text' : 'navbar_text'}
                            onClick={() => {
                                let path = isLoggedInUserAdmin() ? '/datahub/settings' : (isLoggedInUserParticipant() ? '/participant/settings' : '')
                                handleSelect('settings', path)
                            }}
                        >
                            {isSelected === 'settings' ? <img className='dot_style' src={require('../../Assets/Img/green_dot.svg')} alt="dot" /> : <></>}Settings
                        </Typography>
                        : <></>
                    }
                    {profile ? <></>
                        :
                        <Typography
                            className={isSelected === 'login' ? 'navbar_selected_text' : 'navbar_text'}
                            onClick={() => handleSelect('login')}
                        >
                            {isSelected === 'login' ? <img className='dot_style' src={require('../../Assets/Img/green_dot.svg')} alt="dot" /> : <></>}Login
                        </Typography>
                    }
                    <Box>
                        {profile ?
                            <Button
                                sx={{
                                    fontFamily: 'Montserrat !important',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    width: "94px",
                                    height: "34px",
                                    background: "#00AB55",
                                    borderRadius: "8px",
                                    textTransform: 'none',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#00AB55',
                                        color: '#fffff',
                                    }
                                }}
                                onClick={(e) => handleSignOut(e)}
                            >
                                Signout
                            </Button>
                            :
                            <Button
                                sx={{
                                    fontFamily: 'Montserrat !important',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    width: "94px",
                                    height: "34px",
                                    background: "#00AB55",
                                    borderRadius: "8px",
                                    textTransform: 'none',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#00AB55',
                                        color: '#fffff',
                                    }
                                }}
                            >
                                Register
                            </Button>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default NavbarNew