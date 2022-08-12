import React, { useState, useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import labels from "../../Constants/labels";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { dateTimeFormat } from "../../Utils/Common";
import UrlConstants from "../../Constants/UrlConstants";
import Avatar from "@mui/material/Avatar";
import { Tooltip } from "@mui/material";

const useStyles = {
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
    float: "left",
    width: "300px",
    // height: "37px",
    // "line-height": "19px",
    // "word-break": "break-word",
  },
};

export default function ViewDataSet(props) {
  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  const [isLoader, setIsLoader] = useState(false);
  let category;
  let categoryStr = '';
  if (typeof props.rowdata.category === 'string' || props.rowdata.category instanceof String) 
  {
    category = JSON.parse(props.rowdata.category)
  }
  else{
    category = props.rowdata.category
  }

  categoryStr += category["crop_data"] ? "Crop data" : ""
  categoryStr += category["cultivation_data"] ? " | Cultivation data" : ""
  categoryStr += category["practice_data"] ? " | Practice data" : ""
  categoryStr += category["farmer_profile"] ? " | Farmer profile" : ""
  categoryStr += category["land_records"] ? " | Land records" : ""
  categoryStr += category["soil_data"] ? " | Soil data" : ""
  categoryStr += category["weather_data"] ? " | Weather data" : ""
  categoryStr += category["research_data"] ? " | Research data" : ""

  if (categoryStr.startsWith(' |')){
    categoryStr = categoryStr.replace(' |', '').trim()
  }
  return (
    <>
      <Row>
        <Col className="supportViewDetailsbackimage">
          <span onClick={() => props.back()}>
            <img src={require("../../Assets/Img/Vector.svg")} alt="new" />
          </span>
          <span className="supportViewDetailsback" onClick={() => props.back()}>
            {"Back"}
          </span>
        </Col>
      </Row>
      <Row className="supportViewDeatilsSecondRow"></Row>
      <Row style={{ "margin-left": "93px", "margin-top": "30px" }}>
        <span className="mainheading">{"Dataset Details"}</span>
      </Row>
      <Row
        style={{
          "margin-left": "79px",
          "margin-top": "30px",
          "text-align": "left",
        }}>
        <Col>
          <span className="secondmainheading">{"Dataset Name"}</span>
        </Col>
        <Col>
          <span className="secondmainheading">{"Description"}</span>
        </Col>
        <Col>
          <span className="secondmainheading">{"Data Category"}</span>
        </Col>
      </Row>
      
      <Row
        style={{
          "margin-left": "79px",
          "margin-top": "5px",
          "text-align": "left",
        }}>
          <Tooltip title={props.rowdata.name}>
        <Col
          style={{
            width: "30px",
            height: "37px",
            "line-height": "19px",
            "word-break": "break-word",
          }}>
          <span className="thirdmainheading">{props.rowdata.name}</span>
        </Col>
        </Tooltip>
        {/* <Col
          style={{
            width: "30px",
            height: "37px",
            "line-height": "19px",
            "word-break": "break-word",
          }}>
          <span className="thirdmainheading">{props.rowdata.description}</span>
        </Col> */}
        <Col
          style={{
            width: "30px",
            height: "37px",
            "line-height": "19px",
            "word-break": "break-word",
          }}
          >
          <Tooltip title={props.rowdata.description}>
            <Row style={useStyles.datasetdescription}>
              {props.rowdata.description}
            </Row>
          </Tooltip>
        </Col>
        <Tooltip title={categoryStr}>
        <Col>
          <span className="thirdmainheading memberDataSetCardTooltipAndWidthAndOverflow">
            {categoryStr}
          </span>
        </Col>
        </Tooltip>
      </Row>
      <Row
        style={{
          "margin-left": "79px",
          "margin-top": "40px",
          "text-align": "left",
        }}>
        <Col>
          <span className="secondmainheading">{"Geography"}</span>
        </Col>
        <Col>
          <span className="secondmainheading">{"Crop Detail"}</span>
        </Col>
        <Col>
          <span className="secondmainheading">{"Constantly updating"}</span>
        </Col>
      </Row>
      <Row
        style={{
          "margin-left": "79px",
          "margin-top": "5px",
          "text-align": "left",
        }}>
          <Tooltip title={props.rowdata.geography}>
        <Col className="memberDataSetCardTooltipAndWidthAndOverflow" style={{ width: "30px", height: "37px", "line-height": "19px",  }}>
          <span
            className="thirdmainheading"
            style={{
              "margin-top": "5px",
              "max-width": "50%",
              height: "37px",
              "line-height": "19px",
              "word-break": "break-word",
            }}>
            {props.rowdata.geography}
          </span>
        </Col>
        </Tooltip>

        <Tooltip title=  {props.rowdata.crop_detail ? props.rowdata.crop_detail : "N/A"}>

        <Col
        className="memberDataSetCardTooltipAndWidthAndOverflow"
          style={{
            width: "30px",
            height: "37px",
            "line-height": "19px",
            "word-break": "break-word",
            // border:"1px solid red"
          }}>
          <span className="thirdmainheading">
            {props.rowdata.crop_detail ? props.rowdata.crop_detail : "N/A"}
          </span>
        </Col>
        </Tooltip>

        <Col>
          <span className="thirdmainheading">
            {props.rowdata.constantly_update ? "Yes" : "No"}
          </span>
        </Col>
      </Row>
      <Row
        style={{
          "margin-left": "79px",
          "margin-top": "40px",
          "text-align": "left",
        }}>
        <Col>
          <span className="secondmainheading">{"Age of Actual Data"}</span>
        </Col>
        <Col>
          <span className="secondmainheading">{"Data Capture Interval"}</span>
        </Col>
        <Col>
          <span className="secondmainheading">
            {"Size of Actual Data (Records)"}
          </span>
        </Col>
      </Row>
      <Row
        style={{
          "margin-left": "79px",
          "margin-top": "5px",
          "text-align": "left",
        }}>
        <Col>
          <span className="thirdmainheading">
            {props.rowdata.age_of_date ? props.rowdata.age_of_date : "N/A"}
          </span>
        </Col>
        <Col>
          <span className="thirdmainheading">
            {props.rowdata.data_capture_start
              ? dateTimeFormat(props.rowdata.data_capture_start, false) + " - "
              : "N/A - "}
            {props.rowdata.data_capture_end
              ? dateTimeFormat(props.rowdata.data_capture_end, false)
              : "N/A"}
          </span>
        </Col>
        <Col>
          <span className="thirdmainheading">
            {props.rowdata.dataset_size ? props.rowdata.dataset_size : "N/A"}
          </span>
        </Col>
      </Row>
      <Row
        style={{
          "margin-left": "79px",
          "margin-top": "40px",
          "text-align": "left",
        }}>
        <Col>
          <span className="secondmainheading">{"Connector Availablity"}</span>
        </Col>
      </Row>
      <Row
        style={{
          "margin-left": "79px",
          "margin-top": "5px",
          "text-align": "left",
        }}>
        <Col>
          <span className="thirdmainheading">
            {props.rowdata.connector_availability
              ? props.rowdata.connector_availability
              : "N/A"}
          </span>
        </Col>
      </Row>
      <Row className="supportViewDeatilsSecondRow"></Row>
      {!props.isAdminView ? (
        <>
          <Row style={{ "margin-left": "93px", "margin-top": "30px" }}>
            <span className="mainheading">{"Organization details"}</span>
          </Row>
          <Row
            style={{
              "margin-left": "79px",
              "margin-top": "30px",
              "text-align": "left",
            }}>
            <Col>
              <span className="secondmainheading">
                {"Contact Person's Name"}
              </span>
            </Col>
            <Col>
              <span className="secondmainheading">{"Organization Name"}</span>
            </Col>
            <Col>
              <span className="secondmainheading">{"Email"}</span>
            </Col>
          </Row>
          <Row
            style={{
              "margin-left": "79px",
              "margin-top": "5px",
              "text-align": "left",
            }}>
              <Tooltip title= {props.rowdata.user.first_name + " " + props.rowdata.user.last_name}>
            <Col className="memberDataSetCardTooltipAndWidthAndOverflow">
              <span className="thirdmainheading">
                {props.rowdata.user.first_name} {props.rowdata.user.last_name}
              </span>
            </Col>
            </Tooltip>

            <Col>
              <Tooltip title= {props.rowdata.organization.name}>
              <Row className="memberDataSetCardTooltipAndWidthAndOverflow">

                <Col>
                  {props.rowdata.organization.logo ? (
                    <Avatar
                      alt={props.rowdata.organization.name}
                      src={
                        UrlConstants.base_url_without_slash +
                        props.rowdata.organization.logo
                      }
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : (
                    <Avatar
                      sx={{ bgcolor: "#c09507", width: 56, height: 56 }}
                      aria-label="recipe">
                      {props.rowdata.organization.name.charAt(0)}
                    </Avatar>
                  )}
                </Col>

                <Col style={{ "margin-left": "-63%", "margin-top": "3%" }}>
                  <span className="thirdmainheading">
                    {props.rowdata.organization.name}
                  </span>
                </Col>
              </Row>
            </Tooltip>
            </Col>
            <Tooltip title={props.rowdata.organization.org_email
                  ? props.rowdata.organization.org_email
                  : "N/A"}>

            <Col className="memberDataSetCardTooltipAndWidthAndOverflow">
              <span className="thirdmainheading">
                {props.rowdata.organization.org_email
                  ? props.rowdata.organization.org_email
                  : "N/A"}
              </span>
            </Col>
            </Tooltip>

          </Row>
          <Row
            style={{
              "margin-left": "79px",
              "margin-top": "30px",
              "text-align": "left",
            }}>
            <Col>
              <span className="secondmainheading">{"Contact Number"}</span>
            </Col>
            <Col>
              <span className="secondmainheading">{"Address"}</span>
            </Col>
            <Col>
              <span className="secondmainheading">{""}</span>
            </Col>
          </Row>
          <Row
            style={{
              "margin-left": "79px",
              "margin-top": "5px",
              "text-align": "left",
            }}>
              <Tooltip title={props.rowdata.organization["name"]
                  ? props.rowdata.organization["name"]
                  : "N/A"}>

            <Col className="memberDataSetCardTooltipAndWidthAndOverflow">
              <span className="thirdmainheading">
                {props.rowdata.organization["name"]
                  ? props.rowdata.organization["name"]
                  : "N/A"}
              </span>
            </Col>
                  </Tooltip>
                  <Tooltip title={props.rowdata.organization["address"]["address"]
                  ? props.rowdata.organization["address"]["address"]
                  : "N/A"}>
            
            <Col className="memberDataSetCardTooltipAndWidthAndOverflow">
              <span className="thirdmainheading">
                {props.rowdata.organization["address"]["address"]
                  ? props.rowdata.organization["address"]["address"]
                  : "N/A"}
              </span>
            </Col>
                  </Tooltip>

            <Col>
              <span className="secondmainheading">{""}</span>
            </Col>
          </Row>
          <Row
            style={{
              "margin-left": "79px",
              "margin-top": "30px",
              "text-align": "left",
            }}>
             
            <Col>
              <span className="secondmainheading">{"Country"}</span>
            </Col>
            <Col>
              <span className="secondmainheading">{"PIN Code"}</span>
            </Col>
            <Col>
              <span className="secondmainheading">{""}</span>
            </Col>
          </Row>
          <Row
            style={{
              "margin-left": "79px",
              "margin-top": "5px",
              "text-align": "left",
            }}>
               <Tooltip title={props.rowdata.organization["address"]["country"]
                  ? props.rowdata.organization["address"]["country"]
                  : "N/A"}>
            <Col>
              <span className="thirdmainheading">
                {props.rowdata.organization["address"]["country"]
                  ? props.rowdata.organization["address"]["country"]
                  : "N/A"}
              </span>
            </Col>
            </Tooltip>
            <Tooltip title= {props.rowdata.organization["address"]["pincode"]
                  ? props.rowdata.organization["address"]["pincode"]
                  : "N/A"}>

            <Col>
              <span className="thirdmainheading">
                {props.rowdata.organization["address"]["pincode"]
                  ? props.rowdata.organization["address"]["pincode"]
                  : "N/A"}
              </span>
            </Col>
            </Tooltip>

            <Col>
              <span className="secondmainheading">{""}</span>
            </Col>
          </Row>
          <Row className="supportViewDeatilsSecondRow"></Row>
        </>
      ) : (
        <></>
      )}
      <Row style={{ "margin-left": "93px", "margin-top": "30px" }}>
        <span className="mainheading">{"Sample Data Table"}</span>
        <span
          style={{ "margin-left": "67%", cursor: "pointer" }}
          onClick={() =>
            props.downloadAttachment(props.rowdata.sample_dataset)
          }>
          <img src={require("../../Assets/Img/download.svg")} alt="new" />
        </span>
        <span
          className="supportViewDetailsback"
          style={{ "margin-top": "4px", cursor: "pointer" }}
          onClick={() =>
            props.downloadAttachment(props.rowdata.sample_dataset)
          }>
          {"Download sample data"}
        </span>
      </Row>
      <Row
        style={{
          border: "1px solid #DFDFDF",
          "margin-left": "93px",
          "margin-top": "10px",
          "margin-right": "70px",
          overflow: "scroll",
        }}>
        <Col>
          <Table
            aria-label="simple table"
            style={{ overflow: "scroll", width: "1300px" }}>
            <TableHead>
              <TableRow>
                {props.tabelkeys.map((key) => (
                  <TableCell>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rowdata.content.map((row) => (
                <TableRow key={row.name}>
                  {props.tabelkeys.map((key) => (
                    <TableCell>{row[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
