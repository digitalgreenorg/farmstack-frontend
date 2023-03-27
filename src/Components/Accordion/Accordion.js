import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Accordion.css'

const ControlledAccordion = ({ data }) => {

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            {
                data?.map((acc) => (
                    <Accordion
                        sx={{
                            boxShadow: expanded === acc.panel ? '0px 20px 40px -4px rgba(145, 158, 171, 0.16)' : '',
                            borderRadius: expanded === acc.panel ? '8px' : ''
                        }}
                        expanded={expanded === acc.panel} onChange={handleChange(acc.panel)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography className='accordion_title'>{acc.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='accordion_summary'>
                            {acc?.details?.map((detail) => (
                                <Typography className='details'>
                                    {detail}
                                </Typography>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div >
    )
}

export default ControlledAccordion;