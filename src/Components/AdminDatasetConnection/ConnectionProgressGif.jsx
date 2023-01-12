import React from 'react'
import { Col, Row } from 'react-bootstrap';
import styles from "./nodataavailable.module.css"
import linked from "../../Assets/Img/link.png"
import notlinked from "../../Assets/Img/broken-link.png"
import gif from "../../Assets/Img/database.gif"
import gifstable from "../../Assets/Img/database_stable.jpg"
import arrowgif from "../../Assets/Img/arrowsdata.gif"
import connected from "../../Assets/Img/connected.jpg"
import not_connected from "../../Assets/Img/not_connected.jpg"
import Connection_loader from './LineProgress';
import { LinearProgress } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import circleloader from "../../Assets/Img/circleloader.gif"
import AccordionForUploadedFileDetails from './AccordionForUploadedFileDetails';
const ConnectionProgressGif = ({ isConnected, loader, mysqlFileList, localUploaded, postgresFileList }) => {
    const useStyles = {
        // cardcolor: {background:"#FCFCFC", "box-shadow": "none", cursor: "pointer", height: "355px", "border-radius": "2px", width: "346px", "margin-left": "20px", "margin-top": "20px","padding-top":"50px" },
        // togglecardcolor: { "box-shadow": "0px 4px 20px rgba(216, 175, 40, 0.28)", "border": "1px solid #ebd79c", cursor: "pointer", height: "355px", width: "346px", "margin-left": "20px","margin-top": "20px","padding-top":"50px" },
        cardtext: { color: "#A3B0B8", "font-size": "14px", 'font-family': 'Open Sans', 'font-style': 'normal', 'font-weight': 400, 'font-size': '14px', 'line-height': '19px', 'text-align': 'center', color: '#A3B0B8' },
        //   cardHeading:{'font-family': 'Open Sans', 'font-style': 'normal', 'font-weight': '400', 'font-size': '14px', 'line-height': '19px', 'text-align': 'center', color: '#3D4A52'}
    };
    return (
        <div className={styles.nodatamainbox}>
            <Row style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }} >
                {/* <Col>
                    <span style={{ height: "20px", width: "20px", backgroundColor: isConnected ? "green" : "red", borderRadius: "50%", textAlign: "center" }}> {loader ? <img height="20px" width="20px" src={circleloader} alt="loading" /> : isConnected ? <CheckOutlinedIcon style={{ color: "white" }} /> : <CloseOutlinedIcon style={{ color: "white" }} />} </span>
                    <span style={useStyles.cardtext}> {loader ? "Establishing connection..." : isConnected ? "Connection established!" : "Not connected!"} </span>
                </Col> */}
            </Row>
            <Row className='rightSideIndicator'>
                <Col style={{ minWidth: "500px" }} lg={12} sm={12}>
                    <AccordionForUploadedFileDetails title={"Local files"} data={localUploaded} />
                </Col>
                <Col lg={12} sm={12}>
                    <AccordionForUploadedFileDetails title={"Mysql"} data={mysqlFileList} />
                </Col>
                <Col lg={12} sm={12}>
                    <AccordionForUploadedFileDetails title={"Postgres"} data={postgresFileList} />
                </Col>
                {/* <AccordionForUploadedFileDetails data={mysqlFileList} /> */}
            </Row>
            <Row>

            </Row></div>
    )
}

export default ConnectionProgressGif