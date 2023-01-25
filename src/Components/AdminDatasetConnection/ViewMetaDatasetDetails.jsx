import React from 'react'
import { useState, useEffect } from "react"
import { Row, Col, Button } from "react-bootstrap"
import "./LocalMachineUploadDataset.css"
import labels from "../../Constants/labels";
// import Loader from '../Loader/Loader';
import HTTPService from '../../Services/HTTPService';
import { useParams, useHistory } from 'react-router-dom';
import { GetErrorHandlingRoute, downloadAttachment } from '../../Utils/Common';
import UrlConstant from '../../Constants/UrlConstants';
import { Stack } from '@mui/material';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Alert from "@mui/material/Alert";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar } from '@mui/material';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import parse from 'html-react-parser'
import AddDataset from './AddDataset';
import { Image } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';


export default function ViewMetaDatasetDetails(props) {
    const { userType } = props
    const [visible, setVisible] = useState(false);
    const [screenlabels, setscreenlabels] = useState(labels["en"]);
    const [datasetdescription, setDatasetDescription] = useState("")
    const [category, setCategory] = useState({})
    const [geography, setGeography] = useState(null);
    const [constantlyupdate, setconstantlyupdate] = useState(null);
    const [fromdate, setFromdate] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [isFileDataLoaded, setFileDataLoaded] = useState(false);
    const [isLoading, setLoader] = useState(false)
    const { id } = useParams()
    const history = useHistory();
    const [fileData, setfileData] = useState([])
    const [orgdetail, setOrgDetail] = useState("")
    const [userdetails, setUserDetails] = useState("")
    const [orgdes, setorgdes] = useState("")
    const [isEditModeOn, setIsEditModeOn] = useState(false)
    const fileTypes = ["XLS", "xlsx", "CSV", "PDF", "JPEG", "JPG", "PNG", "TIFF"]
    const [previewImage, setPreviewImage] = useState("")
    useEffect(() => {
        getMetaData()
    }, [])

    useEffect(() => {
        setFileDataLoaded(true)
    }, [fileData])

    const getMetaData = () => {
        let url = ""
        if (userType == "guest") {
            url = UrlConstant.base_url + UrlConstant.datasetview_guest + id + '/';
        } else {
            url = UrlConstant.base_url + UrlConstant.datasetview + id + '/';
        }
        setLoader(true)
        HTTPService(
            "GET",
            url,
            "",
            false,
            false
        ).then((response) => {
            setLoader(false)
            console.log(response.data)
            setCategory({ ...response.data.category })
            setGeography(response.data.geography)
            setconstantlyupdate(response.data.constantly_update)
            setFromdate(response.data.data_capture_start)
            setToDate(response.data.data_capture_end)
            setDatasetDescription(response.data.description)
            setfileData(response.data.datasets)
            setOrgDetail(response.data.organization)
            setorgdes(response.data.organization.org_description)
            setUserDetails(response.data.user)
        }).catch((e) => {
            setLoader(false);
            history.push(GetErrorHandlingRoute(e));
        }

        )

    }


    return (<>
        {!isEditModeOn ? <>
            <Row>
                <Col className="supportViewDetailsbackimage">
                    <span onClick={() => history.push("/datahub/datasets")}>
                        <img src={require("../../Assets/Img/Vector.svg")} alt="new" />
                    </span>
                    <span className="supportViewDetailsback" onClick={() => history.push("/datahub/datasets")}>
                        {"Back"}
                    </span>
                </Col>
            </Row>
            <Row className='main_heading_row'>
                <Col lg={3} sm={6} style={{ marginLeft: "99px", marginTop: "50px", }}>
                    <span className='Main_heading_add_dataset'>Dataset Details</span>
                </Col>

            </Row>
            <Row>
                <Col className="mainheading" xs={12} sm={12} md={12} lg={12} style={{ textAlign: "left", paddingLeft: "98px", "margin-top": "50px" }}>
                    <span>Agricultural Practices Video Dissemintion Data</span>
                </Col>
            </Row>
            <Row style={{ "marginLeft": "96px", "margin-right": "73px" }}>
                <Col style={{ "margin-top": "40px", maxHeight: "300px", overflowY: "scroll", textAlign: "center", marginRight: "10px" }}>
                    <Row className="secondmainheading" style={{ position: "sticky", top: "0", background: "white" }} >Category</Row>
                    {Object.keys(category).map((key) => (
                        <Row className="thirdmainheadingview" style={{ textAlign: "center", display: "flex", justifyContent: "center", border: "1px solid red", "alignItems": "center", "margin-top": "10px", "border-radius": "10px", "border": "2px solid #83A9C9", "background": "#83A9C9", "width": "150px", "height": "40px", textTransform: "capitalize" }}>
                            {key}</Row>))}
                </Col>
                <Col style={{ "margin-top": "40px", maxHeight: "300px", overflowY: "scroll", textAlign: "center", marginRight: "10px" }}>
                    <Row className="secondmainheading" style={{ position: "sticky", top: "0", background: "white" }}>Sub Category</Row>
                    {Object.keys(category).map((key) => category[key].map((value) => (
                        <Row className="thirdmainheadingview" style={{ "margin-top": "10px", display: "flex", justifyContent: "center", "border-radius": "10px", "border": "2px solid #8AA7AD", "background": "#8AA7AD", "width": "150px", "height": "40px", "text-align": "center", "alignItems": "center", textTransform: "capitalize" }}>
                            {value}</Row>)))}
                </Col>
                <Col style={{ "margin-top": "40px" }}>
                    <Row className="secondmainheading">Geography</Row>
                    <Row className="thirdmainheadingview" style={{ "margin-top": "10px", display: "flex", justifyContent: "center", "border-radius": "10px", "border": "2px solid #9ABA8F", "background": "#9ABA8F", "width": "150px", "height": "40px", "text-align": "center", "alignItems": "center", }}>
                        {geography}</Row>
                </Col>
                <Col style={{ "margin-top": "40px" }}>
                    <Row className="secondmainheading">Freshness of Data</Row>
                    <Row className="thirdmainheadingview" style={{ "margin-top": "10px", display: "flex", justifyContent: "center", "border-radius": "10px", "border": "2px solid #DFC780", "background": "#DFC780", "width": "150px", "height": "40px", "text-align": "center", "alignItems": "center", }}>
                        {constantlyupdate ? "Yes" : "No"}</Row>
                </Col>
                <Col style={{ "margin-top": "40px" }}>
                    <Row className="secondmainheading">Data Capture Interval</Row>
                    <Row className="thirdmainheadingview" style={{ "margin-top": "10px", display: "flex", justifyContent: "center", "border-radius": "10px", "border": "2px solid #D9B082", "background": "#D9B082", "width": "150px", "height": "40px", "text-align": "center", "alignItems": "center", }}>
                        <span>From : {fromdate ? new Date(fromdate).toISOString().substring(0, 10) : "NA"}</span>
                        <span> To : {toDate ? new Date(toDate).toISOString().substring(0, 10) : "NA"}</span>
                    </Row>
                </Col>

            </Row>
            <Row style={{ "margin-left": "32px" }}>
                <Col>
                    <Row className="mainheading" style={{ "textAlign": "left", "marginLeft": "50px", "marginTop": "50px", "margin-right": "73px", }}>
                        Description
                    </Row>
                    <Row className="thirdmainheading" style={{ "textAlign": "left", "marginLeft": "50px", "marginTop": "30px", "margin-right": "73px", }}>
                        {datasetdescription ? parse(datasetdescription) : ""}
                    </Row>
                </Col>
            </Row>
            <Row style={{ "margin-left": "93px", "margin-top": "30px", "margin-right": "73px", }}>
                <span className="mainheading">{"Download Data"}</span>
            </Row>
            <Row
                style={{
                    "margin-left": "93px",
                    "margin-top": "30px",
                    "margin-right": "73px",
                }}
            >
                <Stack sx={{ width: "100%", textAlign: "left" }} spacing={2}>
                    <Alert severity="warning">
                        <strong>
                            This dataset is solely meant to be used as a source of information. Even though accuracy is a goal, the
                            steward is not accountable for the information. Please let the admin know if you have any information you
                            think is inaccurate.
                        </strong>
                    </Alert>
                </Stack>
            </Row>

            <Row
                style={{
                    border: "1px solid #DFDFDF",
                    "margin-left": "93px",
                    "margin-top": "10px",
                    "margin-right": "70px",
                    overflow: "scroll",
                }}
            >
                {/* { 
        //    fileTypes = ["XLS" && "xlsx" && "CSV" ] ?  */}
                <Col>
                    <Table
                        aria-label="simple table"
                        style={{ overflow: "scroll", width: "1300px" }}
                    >
                        <TableHead>



                            {isFileDataLoaded && fileData.map(itm1 => {
                                return (
                                    <>
                                        {itm1.content.map((itm2, i) => {
                                            if (i === 0) {
                                                return (
                                                    <TableRow>
                                                        {Object.keys(itm2).map((itm3, i) => {
                                                            return i !== 0 ? <TableCell> {itm3} </TableCell> : ""
                                                        })

                                                        }
                                                    </TableRow>

                                                )
                                            }
                                        })}
                                    </>

                                )
                            })}


                        </TableHead>
                        <TableBody>

                            {isFileDataLoaded && fileData.map(itm1 => {
                                return itm1.content.map(itm2 => {
                                    return (
                                        <TableRow>
                                            {
                                                Object.values(itm2).map((itm3, i) => {
                                                    return i !== 0 ? <TableCell> {itm3} </TableCell> : ""
                                                })
                                            }
                                        </TableRow>
                                    )
                                })

                            })}

                        </TableBody>
                    </Table>
                </Col>
            </Row>
            <Row>
                {fileData.map((downloadfile) => (
                    <Row

                        style={{ "margin-top": "10px", "marginLeft": "130px", display: "flex", alignItems: "center" }}

                    >
                        <span >
                            <FileDownloadSharpIcon />
                            {userType == "guest" && <span>{downloadfile?.file ? downloadfile.file : ""} </span>}
                            {userType != "guest" && <span>{downloadfile?.file ? downloadfile.file.split("/")[5] : ""}
                            </span>}
                        </span>
                        {userType !== "guest" && <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                            <Button onClick={() =>
                                downloadAttachment(UrlConstant.base_url + downloadfile.file, downloadfile.file.split("/")[5])
                            } type="primary" shape="round"  ><DownloadOutlined /></Button>

                            {(downloadfile.file.endsWith("png") || downloadfile.file.endsWith("jpg")) &&
                                <>
                                    <Button style={{ textTransform: "capitalize", color: "white" }} onClick={() => {
                                        setPreviewImage(UrlConstant.base_url + downloadfile.file)
                                        setVisible(true)
                                    }
                                    }>
                                        Preview
                                    </Button>
                                </>

                            }
                            <Image
                                width={200}
                                style={{ display: 'none' }}
                                src={previewImage}
                                preview={{
                                    visible,
                                    // scaleStep,
                                    src: `${previewImage}`,
                                    onVisibleChange: (value) => {
                                        setPreviewImage("")
                                        setVisible(value);
                                    },
                                }}
                            />
                        </span>}
                    </Row>))}

            </Row>
            <Row style={{ "margin-left": "20px" }}>
                <Col style={{ "marginLeft": "30px", "margin-top": "50px" }}>
                    <Row className="secondmainheading">
                        <Col style={{ "margin-left": "-130px" }}>ORGANISATION</Col>


                    </Row>
                    <Col className="thirdmainheading" style={{ "marginLeft": "-17px", "margin-top": "30px" }}>
                        <Col>
                            <Avatar alt="Remy Sharp"
                                // className='css-v8h2xp-MuiAvatar-root'
                                style={{ "margin-left": "-40" }}
                                src={orgdetail.logo}
                                sx={{ width: 44, height: 44 }} />
                        </Col>
                        <Col style={{ "margin-left": "90px", "marginTop": "-30px" }}>
                            <Row>{orgdetail?.name}</Row>
                            <Row>{orgdetail?.org_email}</Row>
                            {/* <Row style={{ "margin-bottom": "-15px" }}>{parse(orgdes)}</Row> */}
                            <Row>{orgdetail?.phone_number}</Row>
                            <Row>{orgdetail?.address?.city}</Row>
                            <Row>{orgdetail?.address?.country}</Row>
                            <Row>{orgdetail?.address?.address}</Row>
                            <Row>{orgdetail?.address?.pincode}</Row>
                        </Col>
                    </Col>
                </Col>
                <Col><div style={{
                    marginLeft: "-100px",
                    marginTop: "40px"
                }} className='horizontal'></div></Col>

                <Col style={{ "marginLeft": "60px", "margin-top": "30px" }}>
                    <Row style={{ "marginLeft": "-550px", "margin-top": "25px" }}>ROOT USER DETAILS</Row>
                    <Col className="thirdmainheading" style={{ "marginLeft": "-550px", "margin-top": "38px" }}>
                        <Row>{userdetails?.first_name}</Row>
                        <Row>{userdetails?.last_name}</Row>
                        <Row>{userdetails?.email}</Row>
                    </Col>
                </Col>
            </Row>
            <Row className="marginrowtop8px"></Row>
            {userType !== "guest" && <Row>
                <Col xs={12} sm={12} md={6} lg={3}></Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <Button
                        onClick={() => setIsEditModeOn(true)}
                        variant="outlined"
                        className="submitbtn"

                    >
                        Edit
                    </Button>
                </Col>
            </Row>}
            <Row className="margin">
                <Col xs={12} sm={12} md={6} lg={3}></Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <Button
                        onClick={() => history.push("/datahub/datasets")}
                        style={{ "margin-top": "0px" }}
                        variant="outlined"
                        className="editbtn"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
            <Row className="marginrowtop8px"></Row>
        </> : <AddDataset isDatasetEditModeOn={isEditModeOn} datasetId={id} />}
    </>
    )
}
