import { Divider, Typography } from '@mui/material';
import React from 'react'

const File = ({ index, name, size, id, handleDelete, type, showDeleteIcon, isTables }) => {

    const getSizeInMb = (size) => {
        let converted = size / Math.pow(1024, 2);
        return converted.toFixed(2)
    }
    const handleClick = (index, id, name, type) => {
        handleDelete(index, id, name, type)
    }
    return (
        <div>
            <div key={index} className='d-flex align-items-center'>
                <img style={{ marginLeft: isTables ? '' : '20px' }} src={require("../../../Assets/Img/file.svg")} />
                <Typography
                    sx={{
                        fontFamily: "Montserrat !important",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "20px",
                        color: "#0038FF",
                        textDecoration: 'underline',
                        marginLeft: '20px',
                        wordWrap: 'break-word',
                        maxWidth: '144px',
                        textAlign: 'left'
                    }}
                >{index + 1 + "_" + name} </Typography>
                <span style={{ color: "#ABABAB", marginLeft: '4px' }}>({getSizeInMb(size) + 'MB'})</span>
                {showDeleteIcon ?
                    <div style={{ marginRight: '25px', display: 'flex', justifyContent: 'end', width: '100%' }}>
                        <img className='cursor-pointer' onClick={() => handleClick(index, id, name, type)} src={require("../../../Assets/Img/delete_dark.svg")} />
                    </div>
                    : <></>
                }

            </div>
            {showDeleteIcon ?
                <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
                : <></>
            }
        </div>
    )
}

export default File