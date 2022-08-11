import React, { useState, useEffect } from "react";
import ViewConnectorDetails from "../../../Components/Connectors/ViewConnectorDetails";
import Success from '../../../Components/Success/Success'
import Delete from '../../../Components/Delete/Delete'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useHistory } from "react-router-dom";
import UrlConstants from "../../../Constants/UrlConstants";
import { FileUploader } from "react-drag-drop-files";
import UploadDataset from "../../../Components/Datasets/UploadDataset";
import Button from "@mui/material/Button";
import HTTPService from "../../../Services/HTTPService";
import labels from '../../../Constants/labels';
import { GetErrorHandlingRoute } from '../../../Utils/Common';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
function Participantsettings(props) {
    const [isLoader, setIsLoader] = useState(false)
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const history = useHistory();
    const [accfilesize, setaccfilesize] = useState(true);
    const [providerConectorList, setproviderConectorList] = useState([]);
    const [providerConnector, setproviderConnector] = useState('');
    const [providerConnectorDetails, setproviderConnectorDetails] = useState({});
    const [screenView, setscreenView] = useState(
        {
            "isConnectorList": true,
            "isConnectorViwDetails": false,
            "isDelete": false,
            "isDeleSuccess": false,
            "isInstallationSuccess": false,
            "isPairingRequestSentSuccess": false,
            "isUnpair": false,
            "isUnpairSuccess": false,
            "ispair": false,
            "ispairSuccess": false,
            "isReject": false,
            "isRejectSuccess": false
        }
    );
    var data = {
        "id": "214f4f6b-3c73-439c-88d8-25996507a4ae",
        "department_details": {
            "id": "e459f452-2b4b-4129-ba8b-1e1180c87888",
            "department_name": "default",
            "department_discription": "",
            "status": true,
            "organization": null
        },
        "project_details": {
            "id": "3526bd39-4514-43fe-bbc4-ee0980bde252",
            "project_name": "default",
            "project_discription": "",
            "status": true,
            "department": "e459f452-2b4b-4129-ba8b-1e1180c87888"
        },
        "dataset_details": {
            "id": "436ea00c-b945-4e25-901f-30c11e2c73dd",
            "name": "sada",
            "description": "afafaf"
        },
        "user_id": "e12a42a4-926c-4537-af18-e6186a898cf0",
        "created_at": "2022-08-09T05:34:14.985011Z",
        "updated_at": "2022-08-09T05:34:14.985041Z",
        "connector_name": "nani connector 4 provider",
        "connector_type": "provider",
        "connector_description": "sample",
        "docker_image_url": "farmstack/datahub-be:test",
        "application_port": 5000,
        "certificate": null,
        "usage_policy": "",
        "status": true,
        "connector_status": "install_certificate",
        "project": "3526bd39-4514-43fe-bbc4-ee0980bde252",
        "dataset": "436ea00c-b945-4e25-901f-30c11e2c73dd",
        "relation": [
            {
                "id": "d2e9c8b5-c004-4ba9-9553-b59b3120367a",
                "connectors": {
                    "id": "b7e173e8-0f3b-4afd-be82-04f9a733ddc1",
                    "created_at": "2022-08-09T05:28:16.565616Z",
                    "updated_at": "2022-08-09T05:28:16.565645Z",
                    "connector_name": "nani connector 4 consumer",
                    "connector_type": "consumer",
                    "connector_description": "sample",
                    "docker_image_url": "farmstack/datahub-be:test",
                    "application_port": 5000,
                    "certificate": null,
                    "usage_policy": "",
                    "status": true,
                    "certificate_status": "install_certificate",
                    "project": "3526bd39-4514-43fe-bbc4-ee0980bde252",
                    "dataset": "436ea00c-b945-4e25-901f-30c11e2c73dd"
                },
                "created_at": "2022-08-09T05:35:39.372135Z",
                "updated_at": "2022-08-09T05:35:39.372153Z",
                "connector_pair_status": "paired",
                "status": true,
                "provider": "214f4f6b-3c73-439c-88d8-25996507a4ae",
                "consumer": "b7e173e8-0f3b-4afd-be82-04f9a733ddc1"
            }
        ]
    }
    const [file, setFile] = useState(null);
    const [fileValid, setfileValid] = useState("");
    const fileTypes = ["p12", "pfx"];
    const handleFileChange = (file) => {
        setFile(file);
        console.log(file);
        if (file != null && file.size > 2097152) {
            //   setBrandingnextbutton(false);
            setaccfilesize(true);
        } else {
            setaccfilesize(false);
        }
    };
    useEffect(() => {
        getProviderConnectors()
    }, []);
    const installCretificate = () => {
        var bodyFormData = new FormData();
        bodyFormData.append('certificate', file);
        bodyFormData.append('connector_status', data['connector_status']);
        setIsLoader(true);
        HTTPService(
            "PUT",
            UrlConstants.base_url + UrlConstants.connector_certificate + data['id'] + "/",
            bodyFormData,
            true,
            true
        )
            .then((response) => {
                setIsLoader(false);
                changeView('isInstallationSuccess')

            }).catch((e) => {
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }
    const getProviderConnectors = (id = "436ea00c-b945-4e25-901f-30c11e2c73dd") => {
        setIsLoader(true);
        HTTPService(
            "GET",
            UrlConstants.base_url + UrlConstants.provider_connectors + id,
            '',
            true,
            true
        )
            .then((response) => {
                setIsLoader(false);
                console.log(response.data)
                setproviderConectorList([...response.data])
            }).catch((e) => {
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }

    const getProviderConnectorDeatils = (id) => {
        setIsLoader(true);
        HTTPService(
            "GET",
            UrlConstants.base_url + UrlConstants.connector_certificate + id + "/",
            '',
            true,
            true
        )
            .then((response) => {
                setIsLoader(false);
                console.log(response.data)
                setproviderConnectorDetails({ ...response.data })
                console.log("setproviderConnectorDetails", providerConnectorDetails)
            }).catch((e) => {
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }
    
    const sendPairingRequest = (id) => {
        var bodyFormData = new FormData();
        bodyFormData.append('provider', providerConnectorDetails['id']);
        bodyFormData.append('consumer', data['id']);
        setIsLoader(true);
        HTTPService(
            "POST",
            UrlConstants.base_url + UrlConstants.consumer_paring_request,
            bodyFormData,
            true,
            true
        )
            .then((response) => {
                setIsLoader(false);
                changeView('isInstallationSuccess')

            }).catch((e) => {
                setIsLoader(false);
                history.push(GetErrorHandlingRoute(e));
            });
    }
    const changeView = (keyname) => {
        let tempfilterObject = { ...screenView }
        Object.keys(tempfilterObject).forEach(function (key) { if (key != keyname) { tempfilterObject[key] = false } else { tempfilterObject[key] = true } });
        setscreenView(tempfilterObject)
    }
    return (
        <>
            {screenView.isConnectorViwDetails ?
                <><ViewConnectorDetails data={data}></ViewConnectorDetails>
                    {data['connector_status'] == 'install_certificate' ? <><Row style={{ "margin-left": "93px", "margin-top": "30px" }}>
                        <span className="mainheading">{"Pair with"}</span>
                    </Row>
                        <Row style={{ "margin-left": "64px", "margin-top": "30px" }}>
                            <Col>
                                <TextField
                                    style={{ "width": "95%", "textAlign": "left" }}
                                    select
                                    margin="normal"
                                    variant="filled"
                                    required
                                    hiddenLabel="true"
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="Select Provider Connector"
                                    value={providerConnector}
                                    alignItems="center"
                                    onChange={(e) => { setproviderConnector(e.target.value); getProviderConnectorDeatils(e.target.value) }}
                                >
                                    {providerConectorList.map((rowData, index) => (
                                        <MenuItem value={rowData.id}>{rowData.connector_name}</MenuItem>
                                    ))}
                                </TextField>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                        {providerConnectorDetails['connector_type']?<><Row style={{ "margin-left": "79px", "margin-top": "30px", "text-align": "left" }}>
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
                                <span className="thirdmainheading">{providerConnectorDetails['connector_name']}</span>
                            </Col>
                            <Col>
                                <span className="thirdmainheading">{providerConnectorDetails['connector_type']}</span>
                            </Col>
                            <Col>
                                <span className="thirdmainheading">{providerConnectorDetails['dataset_details'] ? providerConnectorDetails['dataset_details']['name'] : ''}</span>
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
                                <span className="thirdmainheading">{providerConnectorDetails['department_details'] ? providerConnectorDetails['department_details']['department_name'] : ''}</span>
                            </Col>
                            <Col>
                                <span className="thirdmainheading">{providerConnectorDetails['project_details'] ? providerConnectorDetails['project_details']['project_name'] : ''}</span>
                            </Col>
                            <Col>
                                <span className="thirdmainheading">{providerConnectorDetails['certificate']}</span>
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
                                <span className="thirdmainheading">{providerConnectorDetails['docker_image_url']}</span>
                            </Col>
                            <Col>
                                <span className="thirdmainheading">{providerConnectorDetails['application_port']}</span>
                            </Col>
                            <Col style={{ "width": "30px", "height": "37px", "line-height": "19px", "word-break": "break-word" }}>
                                <span className="thirdmainheading">{providerConnectorDetails['usage_policy']}</span>
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
                                <span className="thirdmainheading">{providerConnectorDetails['organization_details'] ? providerConnectorDetails['organization_details']['name'] : ''}</span>
                            </Col>
                            <Col>
                                <span className="thirdmainheading">{providerConnectorDetails['organization_details'] ? providerConnectorDetails['organization_details']['website'] : ''}</span>
                            </Col>
                            <Col>
                                <span className="thirdmainheading">{""}</span>
                            </Col>
                        </Row>
                        <Row style={{ "margin-top": "15px"}}>
                            <Col xs={12} sm={12} md={6} lg={3} >
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} >
                                <Button onClick={() => sendPairingRequest()} variant="contained" className="submitbtn">
                                    {"Send Pairing Request"}
                                </Button>
                            </Col>
                        </Row>
                        <Row className="marginrowtop8px">
                            <Col xs={12} sm={12} md={6} lg={3} >
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} >
                                <Button onClick={() => setFile(null)} variant="outlined" className="cancelbtn">
                                    {screenlabels.common.cancel}
                                </Button>
                            </Col>
                        </Row></>:<></>}
                        <Row className="supportViewDeatilsSecondRow"></Row></> : <></>}
                    {data['certificate_status'] == 'install_certificate' ?
                        <>
                            <Row >
                                <span style={{ "margin-left": "315px", "margin-top": "50px" }}>Upload Certificate *</span>
                            </Row>
                            <Row style={{ "margin-left": "290px", "margin-right": "300px" }}>
                                <Col xs={12} sm={12} md={12} lg={12} className="fileupload">
                                    <FileUploader
                                        handleChange={handleFileChange}
                                        name="file"
                                        types={fileTypes}
                                        children={
                                            <UploadDataset
                                                uploaddes="Supports: P12 format only"
                                                uploadtitle="Upload Certificate"
                                            />
                                        }
                                        classes="fileUpload"
                                    />
                                </Col>
                            </Row>
                            <Row xs={12} sm={12} md={12} lg={12}>
                                <p className="uploaddatasetname">
                                    {file
                                        ? file.size
                                            ? `File name: ${file.name}`
                                            : ""
                                        : ""}
                                </p>
                                <p className="oversizemb-uploadimglogo">
                                    {file != null && file.size > 2097152
                                        ? "File uploaded is more than 2MB!"
                                        : ""}
                                    {fileValid}
                                </p>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={3} >
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} >
                                    {(!accfilesize)
                                        ? (
                                            <Button onClick={() => changeView('isConnectorList')} variant="contained" className="submitbtn">
                                                {"Install Certificate"}
                                            </Button>
                                        ) : (
                                            <Button variant="outlined" disabled className="disbalesubmitbtn">
                                                {"Install Certificate"}
                                            </Button>
                                        )}
                                </Col>
                            </Row>
                            <Row className="marginrowtop8px">
                                <Col xs={12} sm={12} md={6} lg={3} >
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} >
                                    <Button onClick={() => setFile(null)} variant="outlined" className="cancelbtn">
                                        {screenlabels.common.cancel}
                                    </Button>
                                </Col>
                            </Row>
                        </>
                        : <></>}

                </>
                : <></>}

            {screenView.isDelete ? <Delete
                route={"login"}
                imagename={'delete'}
                firstbtntext={"Delete"}
                secondbtntext={"Cancel"}
                deleteEvent={() => { }}
                cancelEvent={() => { changeView('isConnectorList') }}
                heading={"Delete Connector"}
                imageText={"Are you sure you want to delete connector?"}
                firstmsg={"This action will delete the connector from the system."}
                secondmsg={""}>
            </Delete>
                : <></>}
            {screenView.isDeleSuccess ?
                <Success okevent={() => { changeView('isConnectorList'); }} route={"datahub/participants"} imagename={'success'} btntext={"ok"} heading={"Your connetor is deleted successfully !"} imageText={"Deleted!"} msg={"You deleted a connector."}></Success> : <></>
            }
            {screenView.isInstallationSuccess ?
                <Success okevent={() => { changeView('isConnectorList'); }} route={"datahub/participants"} imagename={'success'} btntext={"ok"} heading={"Installation Done"} imageText={"Success!"} msg={"The certificate has been installed successfully. The connector is ready for pairing and data exchange. "}></Success> : <></>
            }
            {screenView.isPairingRequestSentSuccess ?
                <Success okevent={() => { changeView('isConnectorList'); }} route={"datahub/participants"} imagename={'success'} btntext={"ok"} heading={"Pairing request sent"} imageText={"Success!"} msg={"Your pairing request has been sent to the <participant_organisation_name>,we will update you once any action is taken by them."}></Success> : <></>
            }
            {screenView.isUnpair ? <Delete
                route={"login"}
                imagename={'unpair'}
                firstbtntext={"Unpair"}
                secondbtntext={"Cancel"}
                deleteEvent={() => { }}
                cancelEvent={() => { changeView('isConnectorList') }}
                heading={"Unpair Connector"}
                imageText={"Are you sure you want to unpair connector?"}
                firstmsg={"This action will unpair the connector from the system."}
                secondmsg={""}>
            </Delete>
                : <></>}
            {screenView.isUnpairSuccess ?
                <Success okevent={() => { changeView('isConnectorList'); }} route={"datahub/participants"} imagename={'success'} btntext={"ok"} heading={"Unpaired"} imageText={"Success!"} msg={"You unpaired the connector."}></Success> : <></>
            }
            {screenView.ispair ? <Delete
                route={"login"}
                imagename={'pair'}
                firstbtntext={"Approve"}
                secondbtntext={"Cancel"}
                deleteEvent={() => { }}
                cancelEvent={() => { changeView('isConnectorList') }}
                heading={"Approve Connector Request"}
                imageText={"Are you sure you want to approve the connector?"}
                firstmsg={"This action will pair the connector from the system."}
                secondmsg={""}>
            </Delete>
                : <></>}
            {screenView.ispairSuccess ?
                <Success okevent={() => { changeView('isConnectorList'); }} route={"datahub/participants"} imagename={'success'} btntext={"ok"} heading={"Approved"} imageText={"Success!"} msg={"The connectors are paired now and data exchange has started."}></Success> : <></>
            }
            {screenView.isReject ? <Delete
                route={"login"}
                imagename={'pair'}
                firstbtntext={"Reject"}
                secondbtntext={"Cancel"}
                deleteEvent={() => { }}
                cancelEvent={() => { changeView('isConnectorList') }}
                heading={"Reject Connector Request"}
                imageText={"Are you sure you want to reject the connector?"}
                firstmsg={"This action will reject the connector from the system."}
                secondmsg={""}>
            </Delete>
                : <></>}
            {screenView.isRejectSuccess ?
                <Success okevent={() => { changeView('isConnectorList'); }} route={"datahub/participants"} imagename={'success'} btntext={"ok"} heading={"Rejected"} imageText={"Success!"} msg={"You have rejected the pairing request. You will receive a notification if there is a new pairing request."}></Success> : <></>
            }
        </>
    )
}
export default Participantsettings;
