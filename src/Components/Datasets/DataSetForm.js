import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./DataSetForm.css";

import {
  handleAddressCharacters,
  handleNameFieldEntry,
  preventSpaceKey,
  validateInputField,
} from "../../Utils/Common";
import labels from "../../Constants/labels";
import TextField from "@mui/material/TextField";
import RegexConstants from "../../Constants/RegexConstants";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import HandleSessionTimeout, { handleUnwantedSpace } from "../../Utils/Common";
import THEME_COLORS from "../../Constants/ColorConstants";

const useStyles = {
  btncolor: {
    color: THEME_COLORS.THEME_COLOR,
    "border-color": THEME_COLORS.THEME_COLOR,
    "border-radius": 0,
  },
  marginrowtop: { "margin-top": "30px" },
  marginrowtop50: { "margin-top": "50px" },
  firstinputwidth: {
    width: "420px",
    "text-align": "left",
    height: "48px",
    color: "#3D4A52",
    "margin-left": "20%",
  },
  headingbold: { fontWeight: "bold" },
};

export default function DataSetForm(props) {
  const [reply, setreply] = useState("");
  const [datasetname, setdatasetname] = useState("");
  return (
    <div className="datasetform">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <span className="AddDatasetmainheading">
            {/* {props.first_heading} */}
            Add Dataset
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TextField
            // style={useStyles.inputwidth}
            className="name"
            id="filled-basic"
            variant="filled"
            required
            value={datasetname}
            onChange={(e) =>
              validateInputField(e.target.value, RegexConstants.ORG_NAME_REGEX)
                ? setdatasetname(e.target.value)
                : e.preventDefault()
            }
            label="Dataset Name"
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <TextareaAutosize
            className="description"
            maxRows={4}
            placeholder="Description *"
            variant="filled"
            defaultValue={reply}
            maxLength={500}
            onKeyDown={(e) => handleUnwantedSpace(reply, e)}
            onChange={(e) => setreply(e.target.value)}
            style={{
              border: "none !important",
              width: "420px",
              "min-height": "50px",
              "border-bottom": "1px solid #9AA1A9 !important",
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
