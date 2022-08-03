import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Loader from "../../Components/Loader/Loader";
import GuestUserNavBar from "../../Components/Navbar/GuestUserNavbar";
import Success from "../../Components/Success/Success";
import THEME_COLORS from "../../Constants/ColorConstants";
import './GuestUserBanner.css'

export default function GuestUserDescription(props) {

    const [description, setDescription] = useState('')
  
    useEffect(()=>{
      setDescription('Monitoring of all the schemes implementations and capture the transactional data in real time mode. Enable to identify the eligible beneficiary and control on availing duplicate benefits . Ensure accountability, transparency and speedy disposal of transactional services . Ensure appropriate budget releases and expenditure control system based on the budget allocation for various schemes implementation .')
  
    }, [])
    
    return(
    <>
        <Container style={{"margin-top": "50px", "margin-left": "180px", "margin-right":"180px"}}>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                <span class="fontweight400andfontsize16pxandcolor3D4A52">{description}</span>
                </Col>
            </Row>
        </Container>
    </>);
}
