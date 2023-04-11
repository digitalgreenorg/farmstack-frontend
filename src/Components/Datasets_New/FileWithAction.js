import { Box, Button } from '@mui/material'
import React from 'react'
import { getTokenLocal } from '../../Utils/Common'
import File from './TabComponents/File'

const FileWithAction = ({ index, name }) => {
    return (
        <Box className='d-flex'>
            <File index={index} name={name} size={657489} showDeleteIcon={false} type={'file_upload'} isTables={true} />
            {!getTokenLocal() ?
                <Box>
                    <Button
                        sx={{
                            fontFamily: 'Montserrat',
                            fontWeight: 700,
                            fontSize: '15px',
                            width: "220px",
                            height: "48px",
                            border: "1px solid rgba(0, 171, 85, 0.48)",
                            borderRadius: "8px",
                            color: "#00AB55",
                            textTransform: 'none',
                            marginLeft: '100px',
                            '&:hover': {
                                background: 'none',
                                border: "1px solid rgba(0, 171, 85, 0.48)"
                            }
                        }}
                        variant='outlined'>Login to Download</Button>
                </Box>
                : <></>}
        </Box>
    )
}

export default FileWithAction