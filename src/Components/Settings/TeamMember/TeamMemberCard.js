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
    btncolor: { color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": "2px", "text-transform": "capitalize", "width": "116px", "height": "34px", "margin-right": "-20px", "box-shadow": "none" ,"font-family": "Open Sans", 'font-style': 'normal', 'font-size': '14px'},
    cardcolor:{border: "1px solid #E4E4E4","box-shadow": "none",cursor:"pointer",height: "240px","border-radius": "2px"}, 
    togglecardcolor:{"box-shadow": "0px 4px 20px rgba(216, 175, 40, 0.28)", border: "1px solid #D8AF28",cursor:"pointer",height: "240px"},
    marginrowtop: { "margin-top": "30px"},
    btnPosition: { color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": "2px", "text-transform": "capitalize", "width": "116px", "height": "34px", "margin-left": "-25px","box-shadow": "none", "font-weight": "400", "font-family": "Open Sans", 'font-style': 'normal', 'font-size': '14px'},
    cardDataHeading:{'font-family': 'Open Sans', "font-weight": "600","font-size": "14px",color: "#3D4A52", "text-align": "left", "font-style": "normal", "line-height":"19px" },
    cardData:{'font-family': 'Open Sans', "font-weight": "400","font-size": "14px",color: "#3D4A52", "text-align": "left", "font-style":"normal", 'margin-top': '10px', 'padding-left': '0px'},
};

export default function TeamMemberCard(props) {
    const [isshowbutton, setisshowbutton] = React.useState(false);
    const history = useHistory();
    return (
        <Card className="particaipancard" style={!isshowbutton?useStyles.cardcolor:useStyles.togglecardcolor} onMouseEnter={()=>setisshowbutton(true)} onMouseLeave={()=>setisshowbutton(false)}>
            <CardHeader
                avatar={
                    props.profilepic ? <Avatar alt="Remy Sharp" src={UrlConstants.base_url + props.profilepic} sx={{ width:64, height:64 }} /> :
                        <Avatar sx={{ bgcolor:"#c09507",width:64, height:64 }} aria-label="recipe">{props.firstname.charAt(0)}</Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                    </IconButton>
                }
                title={props.mainheading}
                subheader={props.subheading}
                style={{ "background-color": "#F4F4F4", padding: "9px", height: "84px", "text-align": "left", 'font-family': 'Open Sans',
        'font-style': 'normal', 'font-weight': 400, 'font-size': '14px' ,'line-height': '19px' ,'color': '#3D4A52'}}
            />
            <CardContent>
                <Row style={{ "margin-left": "-18px", "text-align": "left"}}>
                    <Col xs={12} sm={12} md={6} lg={6} style={useStyles.cardDataHeading}>
                        Role assigned
          </Col>
                </Row>
                <Row style={{ "margin-left": "-18px", "text-align": "left"}}>
                    <Col xs={12} sm={12} md={6} lg={6} >
                        <span style={useStyles.cardData}>{props.role==2?'Team Member':'Guest User'}</span>
                    </Col>
                </Row>
                {isshowbutton ? <Row style={useStyles.marginrowtop}>
                    <Col xs={12} sm={12} md={6} lg={6} >
                        <Button onClick={() => history.push('/datahub/settings/editmember/' + props.id)} variant="outlined" style={useStyles.btnPosition}> 
                            <img
                                src={require('../../../Assets/Img/edit.svg')}
                                alt="new"
                            />&nbsp; &nbsp; Edit
            </Button>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} >
                        <Button onClick={() => props.deleteTeamMember(props.id)} 
                        variant="outlined" 
                        style={useStyles.btncolor} >
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
