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
import THEME_COLORS from '../../../Constants/ColorConstants'
import UrlConstants from '../../../Constants/UrlConstants'
import { useHistory } from "react-router-dom";
const useStyles = {
    btncolor: { color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": 0, "text-transform": "capitalize", "padding-right": "20px"},
    cardcolor: { border: "1px solid #E4E4E4", "box-shadow": "none", cursor: "pointer", height: "209px", "border-radius": "2px" },
    togglecardcolor: { "box-shadow": "0px 4px 20px rgba(216, 175, 40, 0.28)", "border": "2px solid #ebd79c", cursor: "pointer", height: "209px" },
    marginrowtop: { "margin-top": "20px" },
    cardDataHeading: { "font-weight": "600 !important", "font-size": "14px", color: "#3D4A52" },
    cardData: { "font-weight": 400, "font-size": "14px", color: "#3D4A52" },
    btnPosition: { color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": 0, "text-transform": "capitalize", "padding-left": "30px", "padding-right": "30px"}
};
export default function TeamMemberCard(props) {
    const [isshowbutton, setisshowbutton] = React.useState(true);
    const history = useHistory();
    return (

        <Card style={isshowbutton ? useStyles.cardcolor : useStyles.togglecardcolor} onMouseEnter={() => setisshowbutton((prev) => !prev)} onMouseLeave={() => setisshowbutton((prev) => !prev)}>
            <CardHeader
                avatar={
                    props.profilepic ? <Avatar alt="Remy Sharp" src={UrlConstants.base_url + props.profilepic} sx={{ width: 54, height: 54 }} /> :
                        <Avatar sx={{ bgcolor: "#c09507", width: 54, height: 54 }} aria-label="recipe">{props.firstname.charAt(0)}</Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                    </IconButton>
                }
                title={props.mainheading}
                subheader={props.subheading}
                style={{ "background-color": "#f8f9fa", padding: "9px", "text-align": "left"}}
            />
            <CardContent>
                <Row style={{ "margin-left": "-25px" }}>
                    <Col xs={12} sm={12} md={6} lg={6} style={useStyles.cardDataHeading}>
                        Role assigned
          </Col>
                </Row>
                <Row style={{ "margin-left": "-26px", }}>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <span style={useStyles.cardData}>{props.role==2?'Team Member':"Guest User "}</span>
                    </Col>
                </Row>
                {!isshowbutton ? <Row style={useStyles.marginrowtop}>
                    <Col xs={12} sm={12} md={6} lg={6} >
                        <Button onClick={() => history.push('/datahub/settings/editmember/' + props.id)} variant="outlined" style={useStyles.btnPosition}> 
                            <img
                                src={require('../../../Assets/Img/edit.svg')}
                                alt="new"
                            />&nbsp; &nbsp; Edit
            </Button>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <Button onClick={() => props.deleteTeamMember(props.id)} variant="outlined" style={useStyles.btncolor}>&nbsp; 
                        <img
                                src={require('../../../Assets/Img/button_delete.svg')}
                                alt="new"
                            />&nbsp; &nbsp; Delete 
            </Button>
                    </Col>
                </Row> : <></>}
            </CardContent>
        </Card>
    );
}
