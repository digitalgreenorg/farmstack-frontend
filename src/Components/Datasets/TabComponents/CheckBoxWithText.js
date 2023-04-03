import React from 'react'
import { Box, Checkbox, Typography } from '@mui/material'

const CheckBoxWithText = ({ text, checked, handleCheckBox, keyName, categoryKeyName, refData }) => {
    const handleClick = () => {
        handleCheckBox()
    }

    const handleKey = (keyName) => {
        if (keyName && categoryKeyName) {
            handleCheckBox(categoryKeyName, keyName, refData)
        } else {
            handleCheckBox(keyName)
        }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <div>
                <Checkbox
                    sx={{
                        '&.Mui-checked': {
                            color: '#00AB55 !important',
                        },
                    }}
                    checked={checked}
                    onClick={() => keyName ? handleKey(keyName) : handleClick()}
                />
            </div>
            <Typography
                sx={{
                    fontFamily: "Montserrat !important",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "22px",
                    color: "#212B36",
                    textAlign: 'left',
                }}
            >{text}</Typography>
        </Box>
    )
}

export default CheckBoxWithText