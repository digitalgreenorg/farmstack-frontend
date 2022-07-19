import React, { useState, useMemo } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import labels from '../../Constants/labels';
export default function ViewDataSet(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    return (
        <><Row>
                <Col className="supportViewDetailsbackimage" >
                    <span onClick={() => props.showSuppport()}>
                        <img
                            src={require('../../Assets/Img/Vector.svg')}
                            alt="new"
                        />
                    </span>
                    <span className="supportViewDetailsback" onClick={() => props.showSuppport()}>{"Back"}</span>
                </Col>
            </Row>
                <Row className="supportViewDeatilsSecondRow"></Row>
                <Row style={{ "margin-left": "93px", "margin-top": "30px" }}>
                    <span className="mainheading">{"Dataset Details"}</span>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "30px", "text-align": "left" }}>
                    <Col>
                        <span className="secondmainheading">{"Dataset Name"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Description"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Data Category"}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                    <Col>
                    <span className="thirdmainheading">{props.rowdata.name}</span>
                    </Col>
                    <Col>
                    <span className="thirdmainheading">{props.rowdata.description}</span>
                    </Col>
                    <Col>
                        <span className="thirdmainheading">{props.rowdata.category}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "40px", "text-align": "left" }}>
                    <Col>
                        <span className="secondmainheading">{"Geography"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Corp Detail"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Constantly updating"}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                    <Col>
                        <span className="thirdmainheading">{props.rowdata.geography}</span>
                    </Col>
                    <Col>
                        <span className="thirdmainheading">{props.rowdata.crop_detail}</span>
                    </Col>
                    <Col>
                        <span className="thirdmainheading">{props.rowdata.constantly_update}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "40px", "text-align": "left" }}>
                    <Col>
                        <span className="secondmainheading">{"Age of Actual Data"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Data Capture Interval"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Size of Actual Data (Records)"}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                    <Col>
                        <span className="thirdmainheading">{props.rowdata.age_of_date}</span>
                    </Col>
                    <Col>
                        <span className="thirdmainheading">{props.rowdata.age_of_date}</span>
                    </Col>
                    {/* <Col>
                        <span className="thirdmainheading">{props.rowdata.age_of_date} - {props.rowdata.data_capture_end}</span>
                    </Col> */}
                    <Col>
                        <span className="thirdmainheading">{props.rowdata.dataset_size}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "40px", "text-align": "left" }}>
                    <Col>
                        <span className="secondmainheading">{"Connector Availablity"}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                    <Col>
                        <span className="thirdmainheading">{props.rowdata.connector_availability}</span>
                    </Col>
                </Row>
                <Row className="supportViewDeatilsSecondRow"></Row>
                <Row style={{ "margin-left": "93px", "margin-top": "30px" }}>
                <Col> <span className="mainheading">{"Sample data table"}</span></Col><Col><span>
                            <img
                                src={require('../../Assets/Img/download.svg')}
                                alt="new"
                            />
                        </span>
                            <span className="supportViewDetailsback">{"Download sample data"}</span></Col>
                </Row>
            </>
    );
}
