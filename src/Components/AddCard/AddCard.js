import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import THEME_COLORS from '../../Constants/ColorConstants'
const useStyles = {
  btncolor:{border: "1px solid #E4E4E4","box-shadow": "none",cursor:"pointer",height: "209px","border-radius": "2px"}, 
  togglebtncolor:{"box-shadow": "0px 4px 20px rgba(216, 175, 40, 0.28)","border": "2px solid #ebd79c",cursor:"pointer",height: "209px"}, 
  cardtext:{color:"#A3B0B8","font-size": "14px"},
  cardHeading:{"font-size": "14px"}
};
export default function AddCard(props) {
    const [isshowbutton, setisshowbutton] = React.useState(true);
  return (

    <Card style={isshowbutton?useStyles.btncolor:useStyles.togglebtncolor} onClick={()=>props.addevent()} onMouseEnter={()=>setisshowbutton((prev) => !prev)} onMouseLeave={()=>setisshowbutton((prev) => !prev)}>
      <CardContent>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
           <span style={useStyles.cardHeading}>{props.firstText}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
          <img
              src={require('../../Assets/Img/add.svg')}
              alt="new"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
          <span style={useStyles.cardtext}>{props.secondText}</span>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
          <span style={useStyles.cardtext}>{props.thirdText}</span>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
          <span style={useStyles.cardtext}>{props.fourText}</span>
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
}
