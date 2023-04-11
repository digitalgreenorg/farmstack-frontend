import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RichTextEditor from "react-rte";
import Button from "@mui/material/Button";
import "./AccountSettings.css";
import { IconButton } from "@mui/material";


export default function CategorySettings(props) {
  return (
    <>
      <Row>
        <Typography
          style={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "32px",
            lineHeight: "39px",
          }}
        >
          Category Settings
        </Typography>
      </Row>
      <Row style={{ margin: "20px" }}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Accordion className="accordion-main-classname">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
                <Row>
                    <Col>
              <Typography
                style={{
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "24px",
                  color: "#212B36",
                }}
              >
                Wheat
              </Typography>
              </Col>
              <Col>
              <IconButton>
                <DeleteOutlineIcon />
              </IconButton>
              </Col>
              </Row>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                id="policy_name"
                label="Policy name"
                variant="outlined"
                required
                style={{ width: "98%", margin: "20px" }}
              />
              <Row>{/* description component */}</Row>
              <Row>{/* uploader component */}</Row>
              <Row>
                <Typography
                  style={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "24.38px",
                    color: "#212B36",
                  }}
                >
                  Add sub categories
                </Typography>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={6} xl={6}>
                  <TextField
                    id="policy_name"
                    label="Sub Category"
                    variant="outlined"
                    required
                    style={{ width: "98%", margin: "20px" }}
                  />
                </Col>
              </Row>
            </AccordionDetails>
          </Accordion>
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "right", margin: "20px" }}>
          <Button
            id="cancelbutton_account"
            variant="outlined"
            style={{ margin: "20px" }}
            className="button"
          >
            Cancel
          </Button>
          <Button
            id="submitbutton_account"
            variant="outlined"
            className="button"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
}
