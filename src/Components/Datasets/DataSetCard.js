import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "@mui/material/Button";
import THEME_COLORS from '../../Constants/ColorConstants'
import UrlConstants from '../../Constants/UrlConstants'
import labels from '../../Constants/labels';
import { useHistory } from "react-router-dom";
import {useState} from 'react'
const useStyles = {
    btncolor: { color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": 0, "text-transform": "capitalize", "font-weight": "400", "font-size": "14px" },
    cardcolor: { border: "1px solid #E4E4E4", "box-shadow": "none", cursor: "pointer", height: "355px", "border-radius": "2px", width: "346px", "margin-left": "20px" },
    togglecardcolor: { "box-shadow": "0px 4px 20px rgba(216, 175, 40, 0.28)", "border": "1px solid #ebd79c", cursor: "pointer", height: "355px", width: "346px", "margin-left": "20px" },
    marginrowtop: { "margin-top": "20px" },
    margindescription: {"margin-left": "20px","margin-right":"20px"},
    cardDataHeading: { "font-weight": "600", "font-size": "14px", color: "#3D4A52" },
    cardData: { "font-weight": 400, "font-size": "14px", color: "#3D4A52" },
    datasetdescription: {"margin-left":"0px","margin-right":"0px","font-family": "Open Sans", "font-style": "normal", "font-weight": "400", "font-size": "14px", "line-height": "19px"}
};
export default function DataSetCard(props) {
    const [isshowbutton, setisshowbutton] = useState(false)
    const history = useHistory();
    const [screenlabels, setscreenlabels] = useState(labels['en'])
    const dateTimeFormat = (datetime) => {
        const today = new Date(datetime);
        var y = today.getFullYear();
        var m = (today.getMonth() + 1).toString().padStart(2, "0");
        var d = today.getDate().toString().padStart(2, "0");
        var h = today.getHours();
        var mi = today.getMinutes();
        var s = today.getSeconds();
        let format = d + "/" + m + "/" + y + " | " + h + ":" + mi;
        return format
    }
    return (

        <Card className={props.margingtop} style={!isshowbutton ? useStyles.cardcolor : useStyles.togglecardcolor} onMouseEnter={() => setisshowbutton(true)} onMouseLeave={() => setisshowbutton(false)}>
            <CardHeader
                // avatar={
                //     props.data.organization.logo ? <Avatar alt="Remy Sharp" src={UrlConstants.base_url_without_slash + props.data.organization.logo} sx={{ width: 54, height: 54 }} /> :
                //         <Avatar sx={{ bgcolor: "#c09507", width: 54, height: 54 }} aria-label="recipe">{props.data.subject.charAt(0)}</Avatar>
                // }
                // title={props.data.subject}
                title="Sample Title"
                style={{ "background-color": "#f8f9fa", padding: "9px", "text-align": "left" }}
            />
            <CardContent>
                <Row style={useStyles.datasetdescription}>
                    DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
                </Row>
                <Row>
                    {props.isMemberTab ?
                        <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                            {screenlabels.dataset.organisation_name}
                        </Col> :
                        <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                             {screenlabels.dataset.geography}
                        </Col>
                    }
                    <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardsecondcolumn">
                        {screenlabels.dataset.published_on}
                    </Col>
                </Row>
                <Row className="supportcardmargintop">
                    {
                    props.isMemberTab ?
                    <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {props.orgName}
                    </Col> :
                    <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {props.geography}Kochi
                    </Col>
                    }
                    {/* <Col style={{ color: "#FF3D00", "text-transform": "capitalize" }} className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondcolumndata"> */}
                    <Col style={{"font-size":"14px","font-weight":"400","text-transform": "capitalize" }} className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondcolumndata">
                        Date | Time
                    </Col>
                </Row>
                {/* <Row className="supportcardmargintop">
                    <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {props.data.organization.name}
                        Test Organisation Name 
                    </Col>
                    {props.data.status == 'open' ? 
                    <Col style={{ color: "#FF3D00", "text-transform": "capitalize" }} className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondcolumndata">
                        {props.data.status}
                        Sample_status
                    </Col> 
                    : <></>}
                    {props.data.status == 'hold' ?
                     <Col style={{ color: "#D8AF28", "text-transform": "capitalize" }} className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondcolumndata">
                        {props.data.status}
                    </Col> 
                    : <></>}
                    {props.data.status == 'closed' ? 
                    <Col style={{ color: "#096D0D", "text-transform": "capitalize" }} className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondclosedcolumndata">
                        {props.data.status}
                    </Col> 
                    : <></>}
                </Row> */}
                <Row>
                    <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {screenlabels.dataset.age_of_data}
                    </Col>
                    <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardsecondcolumn">
                        {screenlabels.dataset.crop_details}
                    </Col>
                </Row>
                <Row className="supportcardmargintop">
                    <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {props.ageOfData}6 Months
                    </Col>
                    <Col style={{ color: "#3D4A52", "text-transform": "capitalize" }} className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondcolumndata">
                        {props.cropDetail}Chilli
                    </Col>
                </Row>
                {/* <Row>
                    <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                       Age of Data
                    </Col>
                </Row>
                <Row className="supportcardmargintop">
                    <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {props.data.user.first_name}
                        SampleFirstName
                    </Col>
                </Row>
                <Row>
                    <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {"Date & Time"}
                    </Col>
                </Row>
                <Row className="supportcardmargintop">
                    <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {dateTimeFormat(props.data.updated_at)}
                        DateSample
                    </Col>
                </Row>
                <Row>
                    <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        Category
                    </Col>
                </Row>
                <Row className="supportcardmargintop">
                    <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {props.data.category}
                        Sample_Category
                    </Col>
                </Row> */}
                {/* <Row style={{ "margin-top": "-58px" }}> */}
                <Row>
                    {
                        props.isMemberTab &&
                        <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                            {screenlabels.dataset.geography}
                        </Col>
                        
                    }
                    {isshowbutton ? 
                        <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardsecondcolumn">
                            <Button 
                            onClick={()=>props.viewCardDetails()} 
                            variant="outlined" style={useStyles.btncolor}>
                                View Details
                            </Button>
                        </Col>     : <></>}
                </Row>
            </CardContent>
        </Card>
    );
}
