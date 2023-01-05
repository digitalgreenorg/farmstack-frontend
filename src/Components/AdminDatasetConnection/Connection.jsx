import React from 'react'
import { Col, Row } from 'react-bootstrap';
import styles from "./nodataavailable.module.css"
import linked from "../../Assets/Img/link.png"
import notlinked from "../../Assets/Img/broken-link.png"
import gif from "../../Assets/Img/database.gif"
import gifstable from "../../Assets/Img/database_stable.jpg"
import Connection_loader from './Connection_loader';
const Connection = ({ isConnected }) => {
    const useStyles = {
        // cardcolor: {background:"#FCFCFC", "box-shadow": "none", cursor: "pointer", height: "355px", "border-radius": "2px", width: "346px", "margin-left": "20px", "margin-top": "20px","padding-top":"50px" },
        // togglecardcolor: { "box-shadow": "0px 4px 20px rgba(216, 175, 40, 0.28)", "border": "1px solid #ebd79c", cursor: "pointer", height: "355px", width: "346px", "margin-left": "20px","margin-top": "20px","padding-top":"50px" },
        cardtext: { color: "#A3B0B8", "font-size": "14px", 'font-family': 'Open Sans', 'font-style': 'normal', 'font-weight': 400, 'font-size': '14px', 'line-height': '19px', 'text-align': 'center', color: '#A3B0B8' },
        //   cardHeading:{'font-family': 'Open Sans', 'font-style': 'normal', 'font-weight': '400', 'font-size': '14px', 'line-height': '19px', 'text-align': 'center', color: '#3D4A52'}
    };
    return (
        <div className={styles.nodatamainbox}><Row>
            <Col xs={12} sm={12} md={12} lg={12} style={{ 'margin-top': '20px' }}>
                {isConnected ? <img
                    src={gif}
                    alt="connected"
                    className='database_img'
                    style={{ height: "200px", width: "200px" }}
                /> : <img
                    src={gifstable}
                    alt=""
                    className='database_img'
                    style={{ height: "200px", width: "200px" }}
                />}
            </Col>
        </Row>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <span style={useStyles.cardtext}> {isConnected ? "Connection is successfull!" : "Not connected!"} </span>
                    {isConnected ? <Connection_loader /> : ""}
                </Col>
            </Row></div>
    )
}

export default Connection