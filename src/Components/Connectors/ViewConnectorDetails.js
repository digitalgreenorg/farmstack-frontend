import React, { useState, useMemo } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import labels from '../../Constants/labels';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { dateTimeFormat } from '../../Utils/Common'
import UrlConstants from "../../Constants/UrlConstants";
import Avatar from '@mui/material/Avatar';
import { FileUploader } from "react-drag-drop-files";
import UploadDataset from "../../Components/Datasets/UploadDataset";
import Button from "@mui/material/Button";
export default function ViewConnectorDetails(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const [isLoader, setIsLoader] = useState(false)

    return (
        <><Row>
            <Col className="supportViewDetailsbackimage" >
                <span onClick={() => props.back()}>
                    <img
                        src={require('../../Assets/Img/Vector.svg')}
                        alt="new"
                    />
                </span>
                <span className="supportViewDetailsback" onClick={() => props.back()}>{"Back"}</span>
            </Col>
        </Row>
            <Row className="supportViewDeatilsSecondRow"></Row>
            <Row style={{ "margin-left": "93px", "margin-top": "30px" }}>
                <span className="mainheading">{"My Connector Details"}</span>
            </Row>
            <Row style={{ "margin-left": "79px", "margin-top": "30px", "text-align": "left" }}>
                <Col>
                    <span className="secondmainheading">{"Connector Name"}</span>
                </Col>
                <Col>
                    <span className="secondmainheading">{"Connector Type"}</span>
                </Col>
                <Col>
                    <span className="secondmainheading">{"Dataset Name"}</span>
                </Col>
            </Row>
            <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                <Col>
                    <span className="thirdmainheading">{props.data['connector_name']}</span>
                </Col>
                <Col>
                    <span className="thirdmainheading">{props.data['connector_type']}</span>
                </Col>
                <Col>
                    <span className="thirdmainheading">{props.data['dataset_details']['name']}</span>
                </Col>
            </Row>
            <Row style={{ "margin-left": "79px", "margin-top": "40px", "text-align": "left" }}>
                <Col>
                    <span className="secondmainheading">{"Status"}</span>
                </Col>
                <Col>
                    <span className="secondmainheading">{"Project Name"}</span>
                </Col>
                <Col>
                    <span className="secondmainheading">{"Department Name"}</span>
                </Col>
            </Row>
            <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                <Col >
                    <span className="thirdmainheading">{props.data['connector_status']}</span>
                </Col>
                <Col>
                    <span className="thirdmainheading">{props.data['project_details']['project_name']}</span>
                </Col>
                <Col>
                    <span className="thirdmainheading">{props.data['department_details']['department_name']}</span>
                </Col>
            </Row>
            <Row style={{ "margin-left": "79px", "margin-top": "40px", "text-align": "left" }}>
                <Col>
                    <span className="secondmainheading">{"Docker Image url"}</span>
                </Col>
                <Col>
                    <span className="secondmainheading">{"Application Port"}</span>
                </Col>
                <Col>
                    <span className="secondmainheading">{"Hash (usage Policy)"}</span>
                </Col>
            </Row>
            <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                <Col>
                    <span className="thirdmainheading">{props.data['docker_image_url']}</span>
                </Col>
                <Col>
                    <span className="thirdmainheading">{props.data['application_port']}</span>
                </Col>
                <Col style={{ "width": "30px", "height": "37px", "line-height": "19px", "word-break": "break-word" }}>
                    <span className="thirdmainheading">{props.data['usage_policy']}</span>
                </Col>
            </Row>
            <Row style={{ "margin-left": "79px", "margin-top": "40px", "text-align": "left" }}>
                <Col>
                    <span className="secondmainheading">{"Description"}</span>
                </Col>
                {props.data['connector_status'] != 'install certificate' ? <><Col>
                    <span className="secondmainheading">{"Certificate Status"}</span>
                </Col>
                    <Col>
                        <span className="thirdmainheading">{""}</span>
                    </Col></> : <></>}
            </Row>
            <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                <Col>
                    <span className="thirdmainheading">{props.data['connector_description']}</span>
                </Col>
                {props.data['connector_status'] != 'install certificate' ? <><Col>
                    <span className="thirdmainheading">{props.data['certificate']}</span>
                </Col>
                    <Col>
                        <span className="thirdmainheading">{""}</span>
                    </Col></> : <></>}
            </Row>
            {props.data['connector_type'] == 'Consumer' && (props.data['connector_status'] == 'unpaired' || props.data['connector_status'] == 'rejected') ? <><Row>
                <Col xs={12} sm={12} md={6} lg={3} >
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Button onClick={() => props.edit()} variant="outlined" className="submitbtn">
                        Update Connector
                                </Button>
                </Col>
            </Row>
                <Row className="margin">
                    <Col xs={12} sm={12} md={6} lg={3} >
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} >
                        <Button onClick={() => props.delete()} style={{ "margin-top": "0px" }} variant="outlined" className="editbtn">
                            Delete Connector
                         </Button>
                    </Col>
                </Row><Row className="marginrowtop8px"></Row></> : <></>}
            <Row className="supportViewDeatilsSecondRow"></Row>
            {(props.data['connector_type'] == 'Consumer' && (props.data['connector_status'] == 'awaiting for approval' || props.data['connector_status'] == 'paired')) ? <><Row style={{ "margin-left": "93px", "margin-top": "30px" }}>
                <span className="mainheading">{props.data['connector_status'] == 'awaiting for approval' ? "Pending at" : "Paired with"}</span>
            </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "30px", "text-align": "left" }}>
                    <Col>
                        <span className="secondmainheading">{"Connector Name"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Connector Type"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Dataset Name"}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                    <Col>
                        <span className="thirdmainheading">{props.providerdata['connector_details'] ? props.providerdata['connector_details']['connector_name'] : ""}</span>
                    </Col>
                    <Col>
                        <span className="thirdmainheading">{props.providerdata['connector_details'] ? props.providerdata['connector_details']['connector_type'] : ""}</span>
                    </Col>
                    <Col>
                        <span className="thirdmainheading">{props.providerdata['dataset_details'] ? props.providerdata['dataset_details']['name'] : ""}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "30px", "text-align": "left" }}>
                    <Col>
                        <span className="secondmainheading">{"Department Name"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Project Name"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Certificate Status"}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                    <Col>
                        <span className="thirdmainheading">{props.providerdata['department_details'] ? props.providerdata['department_details']['department_name'] : ""}</span>
                    </Col>
                    <Col>
                        <span className="thirdmainheading">{props.providerdata['project_details'] ? props.providerdata['project_details']['project_name'] : ""}</span>
                    </Col>
                    <Col >
                        <span className="thirdmainheading">{props.providerdata['connector_details'] ? props.providerdata['connector_details']['certificate'] : ""}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "30px", "text-align": "left" }}>
                    <Col>
                        <span className="secondmainheading">{"Docker Image url"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Application Port"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Hash (usage Policy)"}</span>
                    </Col>

                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                    <Col>
                        <span className="thirdmainheading">{props.providerdata['connector_details'] ? props.providerdata['connector_details']['docker_image_url'] : ""}</span>
                    </Col>
                    <Col>
                        <span className="thirdmainheading">{props.providerdata['connector_details'] ? props.providerdata['connector_details']['application_port'] : ""}</span>
                    </Col>
                    <Col style={{ "width": "30px", "height": "37px", "line-height": "19px", "word-break": "break-word" }}>
                        <span className="thirdmainheading">{props.providerdata['connector_details'] ? props.providerdata['connector_details']['usage_policy'] : ""}</span>
                    </Col>
                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "30px", "text-align": "left" }}>
                    <Col>
                        <span className="secondmainheading">{"Participant organisation name"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{"Participant organisation website"}</span>
                    </Col>
                    <Col>
                        <span className="secondmainheading">{""}</span>
                    </Col>

                </Row>
                <Row style={{ "margin-left": "79px", "margin-top": "5px", "text-align": "left" }}>
                    <Col>
                        <span className="thirdmainheading">{props.providerdata['organization_details'] ? props.providerdata['organization_details']['name'] : ''}</span>
                    </Col>
                    <Col>
                        <span className="thirdmainheading">{props.providerdata['organization_details'] ? props.providerdata['organization_details']['website'] : ''}</span>
                    </Col>
                    <Col>
                        <span className="thirdmainheading">{""}</span>
                    </Col>
                </Row>
                <Row className="supportViewDeatilsSecondRow"></Row></> : <></>}
            {props.data['connector_type'] == 'Consumer' && (props.data['connector_status'] == 'paired') ? <><Row>
                <Col xs={12} sm={12} md={6} lg={3} >
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Button onClick={()=>props.approveReject(props.providerdata['id'],'unpaired')} variant="outlined" className="submitbtn">
                        Unpair
                                </Button>
                </Col>
            </Row>
                <Row className="margin">
                    <Col xs={12} sm={12} md={6} lg={3} >
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} >
                        <Button onClick={() => props.cancel()} style={{ "margin-top": "0px" }} variant="outlined" className="editbtn">
                            Cancel
                         </Button>
                    </Col>
                </Row><Row className="marginrowtop8px"></Row></> : <></>}
        </>
    );
}
