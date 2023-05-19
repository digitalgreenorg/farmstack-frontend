import { Button } from '@mui/material'
import React from 'react'

const ContainedButton = ({ text, fontWeight, fontSize, fontFamily, width, height, border, radius, ml, mr, mt, handleClick, disabled }) => {
    return (
        <Button
            sx={{
                fontFamily: fontFamily ? fontFamily + '!important' : 'Montserrat !important',
                fontWeight: fontWeight,
                fontSize: fontSize,
                width: width,
                height: height,
                border: border ? border : "1px solid rgba(0, 171, 85, 0.48)",
                borderRadius: radius ? radius : '8px',
                color: "white",
                background: "#00AB55",
                textTransform: 'none',
                marginLeft: ml ? ml : '',
                marginRight: mr ? mr : '',
                marginTop: mt ? mt : '',
                '&:hover': {
                    backgroundColor: '#00AB55',
                    color: '#fffff',
                }
            }}
            disabled={disabled}
            variant="cotained"
            id="add-connector-button"
            onClick={() => handleClick()}>{text}</Button>
    )
}

export default ContainedButton