import React from "react";
import { useState } from "react";
import { Button, Typography, useMediaQuery, useTheme, Divider} from "@mui/material";
import { Box } from "@mui/material";
import GlobalStyle from "../../Assets/CSS/global.module.css"
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import SupportCard from "./SupportCard";
import {Row, Col} from "react-bootstrap";

export default function SupportTittleView(props) {
    const [isGrid, setIsGrid] = useState(true);
    const [isGridOther, setIsGridOther] = useState(true);
    const [isGridSteward, setIsGridSteward] = useState(true);
    const history = useHistory()
  return (
    <Container>
    <div className="d-flex justify-content-between">
      <div className="bold_title">
        {"List of my ticktes"}
      <Typography className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`} > 
      {"A unique identifier assigned to each ticket for easy reference and tracking purposes."} 
      </Typography>

      </div>
        <div className="d-flex align-items-center mt-50 mb-20">
          <div
            className="d-flex mr-30 cursor-pointer"
            onClick={() => setIsGrid(false)}
            id="dataset-list-view-id"
          >
            <img
              className="mr-7"
              src={require(`../../Assets/Img/${
                isGrid ? "list_view_gray.svg" : "list_view_green.svg"
              }`)}
            />
            <Typography
              sx={{
                color: !isGrid ? "#00AB55" : "#3D4A52",
              }}
            >
              List view
            </Typography>
          </div>
          <div
            className="d-flex cursor-pointer"
            onClick={() => setIsGrid(true)}
            id="dataset-grid-view-id"
          >
            <img
              className="mr-7"
              src={require(`../../Assets/Img/${
                isGrid ? "grid_view_green.svg" : "grid_view_gray.svg"
              }`)}
            />
            <Typography
              sx={{
                color: isGrid ? "#00AB55" : "#3D4A52",
              }}
            >
              Grid view
            </Typography>
          </div>
          {!isGrid &&
            <div className="d-flex">
               <Button
                // onClick={() => history.push(addDataset())} */}
                sx={{
                  fontFamily: "Montserrat !important",
                  fontWeight: 700,
                  fontSize: "15px",
                  width: "max-content",
                  height: "48px",
                  border: "1px solid rgba(0, 171, 85, 0.48)",
                  borderRadius: "8px",
                  background: "#FFFFFF",
                  color: "#00AB55",
                  textTransform: "none",
                  marginLeft: "52px",
                  "&:hover": {
                    background: "#00AB55",
                    color: "#FFFFFF"
                  },
                }}
                id="dataset-add-new-dataset"
              >
                + Raise new request
              </Button>
            </div>
          }
        </div>
    </div>
    <div> <Divider/></div>
    <div>       
       <Row>
     <Col xs={12} sm={6} md={4} lg={4} style={{"margin-top": "15px"}}>
        <SupportCard 
        date={"27/02/2023"}
        ticketname={"ehhhhhhhh"}
        org={"orggggggg"}
        category={"category"}
        location={"antartica"}
        ticketstatus={"open"}
        />
        </Col>
        <Col xs={12} sm={6} md={4} lg={4} style={{"margin-top": "15px"}}>
        <SupportCard 
        date={"27/02/2023"}
        ticketname={"ehhhhhhhh"}
        org={"orggggggg"}
        category={"category"}
        location={"antartica"}
        ticketstatus={"open"}
        />
        </Col><Col xs={12} sm={6} md={4} lg={4} style={{"margin-top": "15px"}}>
        <SupportCard 
        date={"27/02/2023"}
        ticketname={"ehhhhhhhh"}
        org={"orggggggg"}
        category={"category"}
        location={"antartica"}
        ticketstatus={"open"}
        />
        </Col><Col xs={12} sm={6} md={4} lg={4} style={{"margin-top": "15px"}}>
        <SupportCard 
        date={"27/02/2023"}
        ticketname={"ehhhhhhhh"}
        org={"orggggggg"}
        category={"category"}
        location={"antartica"}
        ticketstatus={"open"}
        />
        </Col><Col xs={12} sm={6} md={4} lg={4} style={{"margin-top": "15px"}}>
        <SupportCard 
        date={"27/02/2023"}
        ticketname={"ehhhhhhhh"}
        org={"orggggggg"}
        category={"category"}
        location={"antartica"}
        ticketstatus={"open"}
        />
        </Col><Col xs={12} sm={6} md={4} lg={4} style={{"margin-top": "15px"}}>
        <SupportCard 
        date={"27/02/2023"}
        ticketname={"ehhhhhhhh"}
        org={"orggggggg"}
        category={"category"}
        location={"antartica"}
        ticketstatus={"open"}
        />
        </Col>
        </Row></div>
    </Container>
  );
};

