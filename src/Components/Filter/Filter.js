import React, { useState, useEffect } from 'react'
import style from './filter.module.css'
import { Box, Button, Card, Popover, Typography } from '@mui/material';

const contentDetailsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
};
const Filter = ({ type, content, setShowFilter }) => {

    const handleClose = () => {
        setShowFilter(false)
    };

    return (
        <div style={{ marginLeft: '144px', marginRight: '144px' }}>
            <Card sx={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                padding: '15px'
            }}>
                <Box className='pt-20'>
                    <Box
                        sx={type === 'categories' ? {
                            width: '100%',
                        } : { width: '100%', ...contentDetailsStyle }}
                    >
                        {content?.map((acc) => {
                            return (
                                <Box className='text-left'>
                                    <Typography sx={{ marginLeft: '12px', fontSize: '15px', fontWeight: '600' }}>
                                        {acc.title}
                                    </Typography>
                                    <Box sx={type === 'categories' ? contentDetailsStyle : {}}>
                                        {acc?.details?.map((detail, index) => (
                                            <Box key={index}>
                                                {detail}
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )
                        })}

                    </Box>
                    <Box className='text-right mt-20 mb-20 mr-20'>
                        <Button
                            sx={{
                                fontFamily: 'Montserrat',
                                fontWeight: 700,
                                fontSize: '14px',
                                width: "86px",
                                height: "36px",
                                background: "#00AB55",
                                borderRadius: "8px",
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#00AB55',
                                    color: '#fffff',
                                }
                            }}
                            variant='contained'
                            onClick={() => handleClose()} >Apply</Button>
                    </Box>
                </Box>
            </Card>
        </div>
    )
}

export default Filter