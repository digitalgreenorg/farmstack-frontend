/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Loader from "../../Components/Loader/Loader";
import GuestUserNavBar from "../../Components/Navbar/GuestUserNavbar";
import Success from "../../Components/Success/Success";
import THEME_COLORS from "../../Constants/ColorConstants";
import './GuestUserHome.css'

const useStyles = {
  btncolor: {
    color: "white",
    "border-color": THEME_COLORS.THEME_COLOR,
    "background-color": THEME_COLORS.THEME_COLOR,
    float: "right",
    "border-radius": 0,
  },
  marginrowtop: { "margin-top": "20px" },
  marginrowtop8px: { "margin-top": "0px" },
};

export default function GuestUserHome(props) {
  //   loader
  const [isLoader, setIsLoader] = useState(false);
  //   success screen
  const [isSuccess, setisSuccess] = useState(false);

  const [isLegalClicked, setLegalClicked] = useState(false);
  const [isContactClicked, setContactClicked] = useState(false);

  const [bannerImage, setBannerImage] = useState('')
  const [logoImage, setLogoImage] = useState('')
  const [description, setDescription] = useState('')

  useEffect(()=>{
    setBannerImage('https://wallpaperaccess.com/full/1769725.jpg')
    setLogoImage('https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg')
    setDescription('Monitoring of all the schemes implementations and capture the transactional data in real time mode. Enable to identify the eligible beneficiary and control on availing duplicate benefits . Ensure accountability, transparency and speedy disposal of transactional services . Ensure appropriate budget releases and expenditure control system based on the budget allocation for various schemes implementation .')

  }, [])

  return (
    <>
      {isLoader ? <Loader /> : ""}
      <GuestUserNavBar 
        isLegalClicked={isLegalClicked}
        setLegalClicked={setLegalClicked}
        isContactClicked={isContactClicked}
        setContactClicked={setContactClicked}
      />
      {isSuccess ? (
        <Success
          okevent={props.okAction}
          //route={"/participant/home"}
          imagename={"success"}
          btntext={"ok"}
          heading={
            props.successheading
              ? props.successheading
              : "Thanks for reaching us."
          }
          imageText={
            props.successimageText
              ? props.successimageText
              : "Success!"
          }
          msg={
            props.successmsg
              ? props.successmsg
              : "Your request has been shared successfully!"
          }></Success>
      ) : ''}
      <div className="banner" align="center">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <img style={{width: "100%", height: "220px"}} src={bannerImage}/>
          </Col>
          <Col>
            <div className="logo">
              <img style={{width: "140px", height: "140px"}} src={logoImage} />
            </div>
          </Col>
        </Row>
      </div>
      <Container className="container">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <span class="fontweight400andfontsize16pxandcolor3D4A52">{description}</span>
          </Col>
        </Row>
      </Container>
    </>
  );
}
