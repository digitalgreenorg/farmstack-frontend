import React, { useState } from 'react'
import { Box, Card, Checkbox, Divider, Typography } from '@mui/material'
import CheckBoxWithText from '../../Components/Datasets_New/TabComponents/CheckBoxWithText'
import globalStyle from '../../Assets/CSS/global.module.css'
import style from './connector.module.css'

const IntegrationConnector = () => {
    const [columns, setColumns] = useState(['ID', 'Farmer name', 'Crop date', 'Mobile number',
        'ID', 'Farmer name', 'Crop date', 'Mobile number'
    ])
    const handleSelectAll = (value) => {
    }
    const handleColumnCheck = (value) => {

    }
    return (
        <Box>
            <Card className={`${style.card_style} w-100`}>
                <Box className={`${style.backgroundLightGreen} d-flex justify-content-between align-items-center pt-20 pb-20`}>
                    <Box className='d-flex'>
                        <div className='text-left ml-20'>
                            <Typography className={`${globalStyle.bold400} ${globalStyle.size16}  ${globalStyle.dark_color}`} sx={{
                                fontFamily: "Montserrat !important",
                                lineHeight: "40px",
                            }}>Organisation name</Typography>
                            <Typography className={`${globalStyle.bold700} ${globalStyle.size16}  ${globalStyle.dark_color}`} sx={{
                                fontFamily: "Montserrat !important",
                                lineHeight: "24px",
                            }}>International Center for Tropical Agriculture</Typography>
                        </div>
                        <div className={`${style.ml80} text-left`}>
                            <Typography className={`${globalStyle.bold400} ${globalStyle.size16}  ${globalStyle.dark_color}`} sx={{
                                fontFamily: "Montserrat !important",
                                lineHeight: "40px",
                            }}>Dataset name</Typography>
                            <Typography className={`${globalStyle.bold700} ${globalStyle.size16}  ${globalStyle.dark_color}`} sx={{
                                fontFamily: "Montserrat !important",
                                lineHeight: "24px",
                            }}>Chilli dataset</Typography>
                        </div>
                        <div className={`${style.ml84} text-left`}>
                            <Typography className={`${globalStyle.bold400} ${globalStyle.size16}  ${globalStyle.dark_color}`} sx={{
                                fontFamily: "Montserrat !important",
                                lineHeight: "40px",
                            }}>File name</Typography>
                            <Typography className={`${globalStyle.bold700} ${globalStyle.size16}  ${globalStyle.dark_color}`} sx={{
                                fontFamily: "Montserrat !important",
                                lineHeight: "24px",
                            }}>Chilli.XLS</Typography>
                        </div>
                    </Box>
                    <Box className='mr-20'>
                        <img className='cursor-pointer' src={require('../../Assets/Img/delete_black_unfill.svg')} />
                    </Box>
                </Box>
                <Box className={`${style.ml10} text-left`}>
                    <Typography className={`${globalStyle.bold600} ${globalStyle.size20}  ${globalStyle.dark_color} ${style.mt10} `} sx={{
                        fontFamily: "Montserrat !important",
                        lineHeight: "24.38px",
                    }}>Select columns</Typography>
                    <Box className={`${style.mb7} d-flex align-items-center mt-20`}>
                        <Checkbox
                            sx={{ padding: 0, marginLeft: '-2px' }}
                            checkedIcon={<img src={require('../../Assets/Img/checked_icon.svg')} />}
                            icon={<img src={require('../../Assets/Img/unchecked_icon.svg')} />}
                            handleCheckBox={handleSelectAll}
                        />
                        <Typography className={`${globalStyle.bold700} ${globalStyle.size16}  ${globalStyle.dark_color} ${style.ml9}`} sx={{
                            fontFamily: "Montserrat !important",
                            lineHeight: "22px",
                        }}>Select all</Typography>
                    </Box>
                </Box>
                <Box className='text-left'>
                    <Divider />
                    <Box className={`${style.gridStyle} ${style.mb13}`}>
                        {columns?.map((col) => (
                            <Box className={`${style.mt23} ${style.ml7} ${style.mr34} d-flex`}>
                                <Checkbox
                                    sx={{ padding: 0 }}
                                    checkedIcon={<img src={require('../../Assets/Img/checked_icon.svg')} />}
                                    icon={<img src={require('../../Assets/Img/unchecked_icon.svg')} />}
                                    handleCheckBox={handleColumnCheck}
                                />
                                <Typography className={`${globalStyle.bold400} ${globalStyle.size16}  ${style.lightText} ${style.ml9}`} sx={{
                                    fontFamily: "Montserrat !important",
                                    lineHeight: "22px",
                                }}>{col}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default IntegrationConnector