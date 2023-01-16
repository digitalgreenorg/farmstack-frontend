import React from 'react'
import { useState, useEffect } from "react"
import { Row, Col,} from "react-bootstrap"
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



export default function ViewMetaDatasetDetails(props) {

    const [screenlabels, setscreenlabels] = useState(labels["en"]);
    const [datasetdescription, setDatasetDescription] = useState("")
    const [category, setCategory] = useState([])
    // const [subcategory, setSubCategory] = useState([]);
    const [geography, setGeography] = useState(null);
    const [constantlyupdate, setconstantlyupdate] = useState(null);
    const [fromdate, setFromdate] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [isFileDataLoaded, setFileDataLoaded] = useState(false);
    // const [tableValues, settableValues] = useState([]);
    const [isLoading, setLoader] = useState(false)
    const { id } = useParams()
    const history = useHistory();
    const [fileData, setfileData] = useState([])
    const [orgdetail, setOrgDetail] = useState("")
    const [userdetails, setUserDetails] = useState("")
    const fileTypes = ["XLS", "xlsx", "CSV", "PDF", "JPEG", "JPG", "PNG", "TIFF"]

    useEffect(() => {
        getMetaData()
    }, [])

    useEffect(() => {
        setFileDataLoaded(true)
    }, [fileData])

    let url = UrlConstant.base_url + UrlConstant.datasetview + id + '/' ;
    const getMetaData = () => {
        console.log("get details of the form")
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
            setCategory(response.data.category)
            setGeography(response.data.geography)
            setconstantlyupdate(response.data.constantly_update)
            setFromdate(response.data.data_capture_start)
            setToDate(response.data.data_capture_end)
            setDatasetDescription(response.data.description)
            setfileData(response.data.datasets)
            setOrgDetail(response.data.organization)
            setUserDetails(response.data.user)

        }).catch((e) => {
             setLoader(false);
            history.push(GetErrorHandlingRoute(e));
        }

        )

    }
    return (<>

        <Row className='main_heading_row'>
            <Col lg={3} sm={6} style={{ marginLeft: "99px", marginTop: "50px", }}>
                <span className='Main_heading_add_dataset'>Dataset Details</span>
            </Col>

        </Row>
        <Row>
            <Col className="mainheading" xs={12} sm={12} md={12} lg={12} style={{ textAlign: "left", "marginLeft": "98px", "margin-top": "50px" }}>
                <span>Agricultural Practices Video Dissemintion Data</span>
            </Col>
        </Row>
        <Row style={{ "marginLeft": "96px", "margin-right": "73px" }}>
            <Col style={{ "margin-top": "40px" }}>
                <Row className="secondmainheading">Category</Row>
                {category.map((data) => (
                    <Row key={category} value={category} className="thirdmainheading" style={{ "text-align" :  "center", "alignItems" : "center",  "margin-top": "10px", "border-radius": "10px", "border": "2px solid #83A9C9", "background": "#83A9C9", "width": "150px", "height": "40px"  }}>
                        {data.category}</Row>))}
            </Col>
            <Col style={{ "margin-top": "40px" }}>
                <Row className="secondmainheading">Sub Category</Row>
                {category.map((item1) => item1.children.map((item2) => (
                    <Row className="thirdmainheading" style={{ "margin-top": "10px", "border-radius": "10px", "border": "2px solid #8AA7AD", "background": "#8AA7AD", "width": "150px", "height": "40px", "text-align" :  "center", "alignItems" : "center", }}>
                        {item2.sub_category}</Row>)))}
            </Col>
            <Col style={{ "margin-top": "40px" }}>
                <Row className="secondmainheading">Geography</Row>
                <Row className="thirdmainheading" style={{ "margin-top": "10px", "border-radius": "10px", "border": "2px solid #9ABA8F", "background": "#9ABA8F", "width": "150px",  "height": "40px", "text-align" :  "center", "alignItems" : "center",  }}>
                    {geography}</Row>
            </Col>
            <Col style={{ "margin-top": "40px" }}>
                <Row className="secondmainheading">Freshness of Data</Row>
                <Row className="thirdmainheading" style={{ "margin-top": "10px", "border-radius": "10px", "border": "2px solid #DFC780", "background": "#DFC780", "width": "150px", "height": "40px", "text-align" :  "center", "alignItems" : "center", }}>
                    {constantlyupdate ? "Yes" : "No"}</Row>
            </Col>
            <Col style={{ "margin-top": "40px" }}>
                <Row className="secondmainheading">Data Capture Interval</Row>
                <Row className="thirdmainheading" style={{ "margin-top": "10px", "border-radius": "10px", "border": "2px solid #D9B082", "background": "#D9B082", "width": "150px", "height": "40px", "text-align" :  "center", "alignItems" : "center", }}>
                    <span>{fromdate ? fromdate : "NA"}</span>
                    <span>{toDate}</span>
                </Row>
            </Col>

        </Row>
        <Row style={{ "margin-left": "32px" }}>
            <Col>
                <Row className="mainheading" style={{ "textAlign": "left", "marginLeft": "50px", "marginTop": "50px", "margin-right": "73px", }}>
                    Description
                </Row>
                <Row className="thirdmainheading" style={{ "textAlign": "left", "marginLeft": "50px", "marginTop": "30px", "margin-right": "73px", }}>
                    {datasetdescription}
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

                        <TableRow>

                            {isFileDataLoaded && fileData.map(itm1 => {
                                return itm1.content.map(itm2 => {
                                    return Object.keys(itm2).map(itm3 => {
                                        return <TableCell> {itm3} </TableCell>
                                    })
                                })

                            })}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            {isFileDataLoaded && fileData.map(itm1 => {
                                return itm1.content.map(itm2 => {
                                    return Object.values(itm2).map(itm3 => {
                                        return <TableCell> {itm3} </TableCell>
                                    })
                                })

                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </Col>
        </Row>
        <Row >
            <Row className='downloadfiles' >
                {fileData.map((downloadfile) => (
                    <Row
                        //   className="supportViewDetailsback"
                        className="fontweight600andfontsize14pxandcolor3D4A52 supportcardsecondcolumn"
                        style={{ "margin-top": "10px", cursor: "pointer", "marginLeft": "130px" }}
                        onClick={() =>
                            downloadAttachment(UrlConstant.base_url + downloadfile.file,downloadfile.file.split("/")[5] )
                        }
                    >
                       <FileDownloadSharpIcon
                       style={{marginRight: "20px"}} />
                        <Row>{downloadfile.file.split("/")[5]}
                        <hr className="separatorline" />
                        {/* m */}
                        </Row>
                    </Row>))}
                <hr className="separatorline" />
            </Row>
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
                     style={{"margin-left": "-40"}}
                     src={UrlConstant.base_url+orgdetail.logo} 
                    sx={{ width:44, height:44 }}/>
                    </Col>
                    <Col style={{"margin-left" : "90px", "marginTop" : "-30px"}}>
                    <Row>{orgdetail.name}</Row>
                    <Row>{orgdetail.org_email}</Row>
                    <Row>{orgdetail.org_description}</Row>
                    <Row>{orgdetail.phone_number}</Row>
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
            }}className='horizontal'></div></Col>

            <Col style={{ "marginLeft": "60px", "margin-top": "30px" }}>
                <Row style={{"marginLeft" : "-550px", "margin-top": "25px"}}>ROOT USER DETAILS</Row>
                <Col className="thirdmainheading" style={{ "marginLeft": "-550px", "margin-top": "38px" }}>
                    <Row>{userdetails.first_name}</Row>
                    <Row>{userdetails.last_name}</Row>
                    <Row>{userdetails.email}</Row>
                </Col>
            </Col>
        </Row>


    </>
    )
}