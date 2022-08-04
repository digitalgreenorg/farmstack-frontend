import { width } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import GuestUserNavBar from "../../Components/Navbar/GuestUserNavbar";
import Success from "../../Components/Success/Success";
import THEME_COLORS from "../../Constants/ColorConstants";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { checkUrlExists, GetErrorHandlingRoute } from "../../Utils/Common";
import './GuestUserBanner.css'

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

export default function GuestUserBanner(props) {

    const [bannerImage, setBannerImage] = useState(require('../../Assets/Img/no-image-banner.png'))
    const [logoImage, setLogoImage] = useState(require('../../Assets/Img/no-image-logo.png'))
    const [isLoader, setIsLoader] = useState(false)
    const history = useHistory()
  
    useEffect(() => {
      setIsLoader(true)
      HTTPService('GET', UrlConstant.base_url + UrlConstant.guest_organization_details, '', false, false)
      .then((response) => {
        setIsLoader(false);
        if (response.data.organization.hero_image){
          let bannerImageUrl = UrlConstant.base_url_without_slash + response.data.organization.hero_image;
          if (checkUrlExists(bannerImageUrl)){
            setBannerImage(bannerImageUrl)
          } 
        }
        if (response.data.organization.logo){
          let logoImageUrl = UrlConstant.base_url_without_slash + response.data.organization.logo;
          if (checkUrlExists(logoImageUrl)){
            setLogoImage(logoImageUrl)
          } 
        }
      })
      .catch((e) => {
        setIsLoader(false);
        //history.push(GetErrorHandlingRoute(e));
      });
    }, [])
    
    return(
    <>
      {isLoader? <Loader />: ''}
      <div className="banner" align="center">
        <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
            <img style={{minWidth: "100%", minHeight: "220px", maxHeight: "220px",  textAlign: "center"}} alt="Organisation banner" src={bannerImage}/>
            </Col>
            <Col>
            <div className="logo">
                <img style={{minWidth: "140px", minHeight: "140px", maxWidth: "140px", maxHeight: "140px", textAlign: "center"}} alt="Organisation logo" src={logoImage} />
            </div>
            </Col>
        </Row>
      </div>
    </>);
}
