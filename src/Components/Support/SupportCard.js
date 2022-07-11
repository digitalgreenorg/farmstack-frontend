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
import { useHistory } from "react-router-dom";
const useStyles = {
    btncolor: { color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": 0, "text-transform": "capitalize", "font-weight": "400", "font-size": "14px" },
    cardcolor: { border: "1px solid #E4E4E4", "box-shadow": "none", cursor: "pointer", height: "355px", "border-radius": "2px", width: "346px", "margin-left": "20px" },
    togglecardcolor: { "box-shadow": "0px 4px 20px rgba(216, 175, 40, 0.28)", "border": "2px solid #ebd79c", cursor: "pointer", height: "355px", width: "346px", "margin-left": "20px" },
    marginrowtop: { "margin-top": "20px" },
    cardDataHeading: { "font-weight": "600", "font-size": "14px", color: "#3D4A52" },
    cardData: { "font-weight": 400, "font-size": "14px", color: "#3D4A52" }
};
export default function SupportCard(props) {
    const [isshowbutton, setisshowbutton] = React.useState(true);
    const history = useHistory();
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

        <Card className={props.margingtop} style={isshowbutton ? useStyles.cardcolor : useStyles.togglecardcolor} onMouseEnter={() => setisshowbutton(false)} onMouseLeave={() => setisshowbutton(true)}>
            <CardHeader
                avatar={
                    props.data.organization.hero_image ? <Avatar alt="Remy Sharp" src={UrlConstants.base_url + props.data.organization.hero_image} sx={{ width: 54, height: 54 }} /> :
                        <Avatar sx={{ bgcolor: "#c09507", width: 54, height: 54 }} aria-label="recipe">{props.data.subject.charAt(0)}</Avatar>
                }
                title={props.data.subject}
                style={{ "background-color": "#f8f9fa", padding: "9px", "text-align": "left" }}
            />
            <CardContent>
                <Row>
                    <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        Name of Participant
          </Col>
                    <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardsecondcolumn">
                        Status
          </Col>
                </Row>
                <Row className="supportcardmargintop">
                    <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {props.data.organization.name}
                    </Col>
                    {props.data.status == 'open' ? <Col style={{ color: "#FF3D00", "text-transform": "capitalize" }} className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondcolumndata">
                        {props.data.status}
                    </Col> : <></>}
                    {props.data.status == 'hold' ? <Col style={{ color: "#D8AF28", "text-transform": "capitalize" }} className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondcolumndata">
                        {props.data.status}
                    </Col> : <></>}
                    {props.data.status == 'closed' ? <Col style={{ color: "#096D0D", "text-transform": "capitalize" }} className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondclosedcolumndata">
                        {props.data.status}
                    </Col> : <></>}
                </Row>
                <Row>
                    <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        Name of Participant User
          </Col>
                </Row>
                <Row className="supportcardmargintop">
                    <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
                        {props.data.user.first_name}
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
                    </Col>
                </Row>
                <Row style={{ "margin-top": "-58px" }}>
                    {!isshowbutton ? <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardsecondcolumn">
                        <Button onClick={()=>props.viewCardDetails()} variant="outlined" style={useStyles.btncolor}>
                            View Details
            </Button>
                    </Col> : <></>}
                </Row>
            </CardContent>
        </Card>
    );
}
