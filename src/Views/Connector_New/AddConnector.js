import React, { useState } from 'react'
import { Box, Divider, TextField, Typography } from '@mui/material'
import SelectConnector from './SelectConnector';
import EmptyFile from '../../Components/Datasets_New/TabComponents/EmptyFile';
import globalStyle from '../../Assets/CSS/global.module.css'
import style from './connector.module.css'
import IntegrationConnector from './IntegrationConnector';
import JoinLink from './JoinLink';
import JoinedBy from './JoinedBy';

const textFieldStyle = {
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#919EAB'
        },
        '&:hover fieldset': {
            borderColor: '#919EAB'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#919EAB'
        }
    },
}
const AddConnector = () => {

    const [connectorName, setConnectorName] = useState('');
    const [connectorDescription, setConnectorDescription] = useState('');

    const limitChar = 512;

    const handleDescription = (e) => {
        if (e.target.value.toString().length <= limitChar) {
            setConnectorDescription(e.target.value);
        }
    };

    return (
        <Box>
            <Box sx={{ marginLeft: '144px', marginRight: '144px' }}>
                <div className='text-left mt-50'>
                    <span className='add_light_text'>Connectors</span>
                    <span className='add_light_text ml-16'>
                        <img src={require("../../Assets/Img/dot.svg")} />
                    </span>
                    <span className='add_light_text ml-16'>New connectors</span>
                </div>
                <Typography className={`${globalStyle.bold600} ${globalStyle.size32}  ${globalStyle.dark_color} mt-50 text-left`} sx={{
                    fontFamily: "Montserrat !important",
                    lineHeight: "40px",
                }}>Create and integration connector</Typography>
                <TextField
                    fullWidth
                    className='mt-20'
                    sx={textFieldStyle}
                    placeholder='Connector name'
                    label='Connector name'
                    value={connectorName}
                    onChange={(e) => setConnectorName(e.target.value)}
                />
                <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={4}
                    className='mt-30'
                    sx={textFieldStyle}
                    placeholder='Connector description not more that 512 character '
                    label='Connector description not more that 512 character '
                    value={connectorDescription}
                    onChange={(e) => handleDescription(e)}
                />
                <SelectConnector />
                <Box>
                    <Divider />
                </Box>
                {/* <Box className={style.mt136 + " " + style.mb139}>
                    <EmptyFile text={'As of now, there is no dataset for connectors'} />
                </Box> */}
                <Typography className={`${globalStyle.bold600} ${globalStyle.size32}  ${globalStyle.dark_color} mt-50 mb-20 text-left`} sx={{
                    fontFamily: "Montserrat !important",
                    lineHeight: "40px",
                }}>Integration Connector</Typography>
                {/* <IntegrationConnector />
                <JoinLink />
                <IntegrationConnector /> */}
                {/* <JoinedBy /> */}
            </Box>
        </Box>
    )
}

export default AddConnector