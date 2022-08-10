import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@mui/material/Button";
import THEME_COLORS from "../../Constants/ColorConstants";
import UrlConstants from "../../Constants/UrlConstants";
import labels from "../../Constants/labels";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { getUserLocal, getUserMapId, dateTimeFormat } from "../../Utils/Common";
import { Tooltip } from "@mui/material";
const useStyles = {
  btncolor: {
    color: THEME_COLORS.THEME_COLOR,
    "border-color": THEME_COLORS.THEME_COLOR,
    "border-radius": 0,
    "text-transform": "capitalize",
    "font-weight": "400",
    "font-size": "14px",
  },
  cardcolor: {
    border: "1px solid #E4E4E4",
    "box-shadow": "none",
    cursor: "pointer",
    height: "355px",
    "border-radius": "2px",
    width: "346px",
    "margin-left": "20px",
  },
  togglecardcolor: {
    "box-shadow": "0px 4px 20px rgba(216, 175, 40, 0.28)",
    border: "1px solid #ebd79c",
    cursor: "pointer",
    height: "355px",
    width: "346px",
    "margin-left": "20px",
  },
  marginrowtop: { "margin-top": "20px" },
  margindescription: { "margin-left": "20px", "margin-right": "20px" },
  cardDataHeading: {
    "font-weight": "600",
    "font-size": "14px",
    color: "#3D4A52",
  },
  cardData: { "font-weight": 400, "font-size": "14px", color: "#3D4A52" },
  datasetdescription: {
    "margin-left": "0px",
    "margin-right": "0px",
    "font-family": "Open Sans",
    "font-style": "normal",
    "font-weight": "400",
    "font-size": "14px",
    "line-height": "19px",
    overflow: "hidden",
    "text-overflow": "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    "text-align": "left",
  },
};
export default function GuestUserDatasetCard(props) {
  const [isshowbutton, setisshowbutton] = useState(false);
  const history = useHistory();
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  return (
    <Card
      className={props.margingtop}
      style={!isshowbutton ? useStyles.cardcolor : useStyles.togglecardcolor}
      onMouseEnter={() => setisshowbutton(true)}
      onMouseLeave={() => setisshowbutton(false)}>
      <Tooltip title={props.title}>
        <CardHeader
          avatar={
            props.orgLogo ? (
              <Avatar
                alt="Remy Sharp"
                src={UrlConstants.base_url_without_slash + props.orgLogo}
                sx={{ width: 54, height: 54 }}
              />
            ) : (
              <Avatar
                sx={{ bgcolor: "#c09507", width: 54, height: 54 }}
                aria-label="recipe">
                {props.orgName.charAt(0)}
              </Avatar>
            )
          }
          // title={props.data.subject}
          // tooltip={<Tooltip title={props.title}>{props.title}</Tooltip>}
          title={props.title}
          style={{
            "background-color": "#f8f9fa",
            padding: "9px",
            "text-align": "left",
            overflow: "hidden",
            "text-overflow": "ellipsis",
          }}
        />
      </Tooltip>
      <CardContent>
        <Tooltip title={props.description}>
          <Row style={useStyles.datasetdescription}>{props.description}</Row>
        </Tooltip>
        <Row>
          <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
            {screenlabels.dataset.organisation_name}
          </Col>
          <Col
            className="fontweight600andfontsize14pxandcolor3D4A52 supportcardsecondcolumn"
            style={{ textAlign: "left" }}>
            {screenlabels.dataset.published_on}
          </Col>
        </Row>
        <Row className="supportcardmargintop">
          <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
            {props.orgName}
          </Col>
          <Col
            style={{
              "font-size": "14px",
              "font-weight": "400",
              "text-transform": "capitalize",
              textAlign: "left",
            }}
            className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondcolumn">
            {props.publishedon ? dateTimeFormat(props.publishedon, true) : "NA"}
          </Col>
        </Row>
        <Row>
          <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
            {screenlabels.dataset.age_of_data}
          </Col>
          <Col
            className="fontweight600andfontsize14pxandcolor3D4A52 supportcardsecondcolumn"
            style={{ textAlign: "left" }}>
            {screenlabels.dataset.crop_details}
          </Col>
        </Row>
        <Row className="supportcardmargintop">
          <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
            {props.ageOfData == "" ? "N/A" : props.ageOfData}
          </Col>
          <Tooltip title={props.cropDetail}>
            <Col
              style={{
                "padding-right": "4px",
                color: "#3D4A52",
                "text-transform": "capitalize",
                textAlign: "left",
              }}
              className="fontweight400andfontsize14pxandcolor3D4A52 supportcardsecondcolumndata">
              {props.cropDetail}
            </Col>
          </Tooltip>
        </Row>
        <Row>
          <Col className="fontweight600andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
            {screenlabels.dataset.geography}
          </Col>
        </Row>
        <Row className="supportcardmargintop">
          <Col className="fontweight400andfontsize14pxandcolor3D4A52 supportcardfirstcolumn">
            {props.geography}
          </Col>
          {isshowbutton ? (
            <Col
              className="fontweight600andfontsize14pxandcolor3D4A52 supportcardsecondcolumn"
              style={{ textAlign: "left" }}>
              <Button
                onClick={() => props.viewCardDetails()}
                variant="outlined"
                style={useStyles.btncolor}>
                View Details
              </Button>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </CardContent>
    </Card>
  );
}
