import { Avatar, Accordion, AccordionDetails, AccordionSummary, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography, Badge } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const AccordionForUploadedFileDetails = ({ data, title }) => {
    console.log(data)
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>  {title}  <span style={{ height: "20px", width: "30px", backgroundColor: "green", color: "white", borderRadius: "2px" }}>{data?.length}</span> </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography style={{ maxHeight: "300px", overflowY: "scroll" }}>
                    <ul>
                        {data?.map((item) => {
                            console.log(data, item)
                            return <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <DescriptionOutlinedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item} secondary="Jan 9, 2014" />
                                {/* <IconButton edge="end" aria-label="delete">
                                    <DeleteOutlinedIcon
                                        onClick={() => handleDeleteExportedFile(item, index)} 
                                        color='warning' />
                                </IconButton> */}
                                <Divider />
                            </ListItem>
                        })}
                    </ul>
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionForUploadedFileDetails