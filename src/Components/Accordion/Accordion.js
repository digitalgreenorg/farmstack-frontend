import React, { useState, useEffect } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Accordion.css'

const detailsStyle = {
    "fontFamily": "'Montserrat' !important",
    "fontWeight": "400 !important",
    "fontSize": "16px !important",
    "lineHeight": "22px !important",
    "color": "#212B36 !important",
    "textAlign": "left",
    "marginBottom": "24px !important"
}

const accordionTitleStyle = {
    "fontFamily": "'Montserrat' !important",
    "fontWeight": "600 !important",
    "fontSize": "16px !important",
    "lineHeight": "24px !important",
    "color": "#212B36 !important"
}

const accordionSummaryStyle = {
    "display": "grid",
    "gridTemplateColumns": "repeat(4, 1fr)"
}

const ControlledAccordion = ({ data, isCustomStyle, width, titleStyle, selectedPanelIndex }) => {

    const [expanded, setExpanded] = useState(selectedPanelIndex ? selectedPanelIndex : false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    console.log(selectedPanelIndex)

    useEffect(() => {
        setExpanded(selectedPanelIndex ? selectedPanelIndex : false)
    }, [selectedPanelIndex])

    return (
        <div style={{ width: isCustomStyle && width }}>
            {
                data?.map((acc) => (
                    <Accordion
                        sx={{
                            boxShadow: expanded === acc.panel ? '0px 20px 40px -4px rgba(145, 158, 171, 0.16)' : '',
                            borderRadius: expanded === acc.panel ? '8px' : '',
                        }}
                        expanded={expanded === acc.panel} onChange={handleChange(acc.panel)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography sx={isCustomStyle ? titleStyle : accordionTitleStyle}>{acc.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={isCustomStyle ? { padding: "8px 0px 16px !important" } : accordionSummaryStyle}>
                            {acc?.details?.map((detail) => (
                                <Box sx={detailsStyle}>
                                    {detail}
                                </Box>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div >
    )
}

export default ControlledAccordion;