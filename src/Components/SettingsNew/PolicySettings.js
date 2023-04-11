import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RichTextEditor from "react-rte";
import Button from "@mui/material/Button";
import "./AccountSettings.css";
export default function PolicySettings() {
  const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      //   "LINK_BUTTONS",
      "BLOCK_TYPE_DROPDOWN",
      //   "HISTORY_BUTTONS",
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Normal", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
    ],
  };
  return (
    <>
      <Row>
        <Typography  style={{fontFamily: "Montserrat", fontStyle: "normal", fontWeight: "600", fontSize: "32px", lineHeight: "39px"}}>Policy settings</Typography>
      </Row>
      <Row style={{margin: "20px"}}>
        <Col xs={12} sm={12} md={12} lg={12}>
      <Accordion className="accordion-main-classname">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontFamily: "Montserrat", fontStyle: "normal", fontWeight: "600", fontSize: "24px", lineHeight: "24px", color: "#212B36"}}>Governing laws</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            id="policy_name"
            label="Policy name"
            variant="outlined"
            required
            style={{ width: "98%", margin: "20px" }}
          />
           <Row>
          <Col style={{textAlign: "right", margin: "20px"}}>
          <Button id="apply_policies" variant="outlined" style={{margin: "20px"}} className="button">
            Apply
          </Button>
          </Col>
          </Row>
    
        </AccordionDetails>
      </Accordion>
      </Col>
      </Row>
      <Row>
      <Col style={{textAlign: "right", margin: "20px"}}>
          <Button id="cancelbutton_account" variant="outlined" style={{margin: "20px"}} className="button">
            Cancel
          </Button>
          <Button id="submitbutton_account" variant="outlined" className="button">
            Submit
          </Button>
        </Col>
      </Row> 
    </>
  );
}
