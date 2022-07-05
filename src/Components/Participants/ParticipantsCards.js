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
  btncolor: {color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": 0,"text-transform": "capitalize", "border-radius": "2px", "text-transform": "capitalize", "width": "116px", "height": "34px", "margin-left": "-25px", "font-weight": "400", "font-family": "Open Sans"}, 
  btnPosition: {color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": 0,"text-transform": "capitalize", "border-radius": "2px", "text-transform": "capitalize", "width": "116px", "height": "34px", "margin-right": "-20px", "font-weight": "400", "font-family": "Open Sans"},
  cardcolor:{border: "1px solid #E4E4E4","box-shadow": "none",cursor:"pointer",height: "209px","border-radius": "2px"}, 
  togglecardcolor:{"box-shadow": "0px 4px 20px rgba(216, 175, 40, 0.28)", "border": "2px solid #ebd79c",cursor:"pointer",height: "209px"}, 
  marginrowtop: {"margin-top": "20px"},
  cardDataHeading:{"font-weight": "600","font-size": "14px",color: "#3D4A52" },
  cardData:{"font-weight": "400","font-size": "14px",color: "#3D4A52"}
};
export default function ParticipantsCards(props) {
  const [isshowbutton, setisshowbutton] = React.useState(true);
  const history = useHistory();
  return (

    <Card className="particaipancard" style={isshowbutton?useStyles.cardcolor:useStyles.togglecardcolor} onMouseEnter={()=>setisshowbutton((prev) => !prev)} onMouseLeave={()=>setisshowbutton((prev) => !prev)}>
      <CardHeader
        avatar={
          props.profilepic? <Avatar alt="Remy Sharp" src={UrlConstants.base_url+props.profilepic} sx={{ width:54, height:54 }}/>:
          <Avatar sx={{ bgcolor:"#c09507",width:54, height:54}} aria-label="recipe">{props.firstname.charAt(0)}</Avatar>
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={props.mainheading}
        subheader={props.subheading}
        style={{ "background-color": "#f8f9fa", padding: "9px","text-align": "left"}}
      />
      <CardContent>
        <Row style={{ "margin-left": "-25px" }}>
          <Col xs={12} sm={12} md={4} lg={4} style={useStyles.cardDataHeading}>
            Dataset
          </Col>
          <Col xs={12} sm={12} md={4} lg={5} style={useStyles.cardDataHeading}>
            Connectors
          </Col>
          <Col xs={12} sm={12} md={4} lg={3} style={useStyles.cardDataHeading}>
            Status
          </Col>
        </Row>
        <Row style={{ "margin-left": "-26px" }}>
          <Col xs={12} sm={12} md={4} lg={4}>
            <span style={useStyles.cardData}>{props.dataset}</span>
          </Col>
          <Col xs={12} sm={12} md={4} lg={5}>
            <span style={useStyles.cardData}>{props.connector}</span>
          </Col>
          <Col xs={12} sm={12} md={4} lg={3}>
            <span style={useStyles.cardData}>{props.active}</span>
          </Col>
        </Row>
        {!isshowbutton?<Row style={useStyles.marginrowtop}>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Button onClick={() => history.push('/datahub/participants/edit/'+props.id)} variant="outlined" style={useStyles.btncolor}>
              <img
                src={require('../../Assets/Img/edit.svg')}
                alt="new"
              />&nbsp;Edit
            </Button>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Button onClick={() => history.push('/datahub/participants/view/'+props.id)} variant="outlined" style={useStyles.btnPosition}>
              View Details
            </Button>
          </Col>
        </Row>:<></>}
      </CardContent>
    </Card>
  );
}
