import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import THEME_COLORS from "../../../Constants/ColorConstants";
import RichTextEditor from "react-rte";
import { FileUploader } from "react-drag-drop-files";
import UploadOrgLogo from "../../../Components/signup/UploadOrgLogo";

const useStyles = {
    btncolor: {
      color: "white",
      "text-transform": "capitalize",
      "border-color": THEME_COLORS.THEME_COLOR,
      "background-color": THEME_COLORS.THEME_COLOR,
      float: "right",
      "border-radius": 0,
    },
    btn: {
      width: "420px",
      height: "42px",
      "margin-top": "30px",
      background: "#ffffff",
      opacity: "0.5",
      border: "2px solid #c09507",
      color: "black",
    },
    marginrowtop: { "margin-top": "20px" },
    marginrowtop50px: { "margin-top": "50px" },
    marginrowtop10px: { "margin-top": "10px" },
    teamword: { "font-weight": 700, "font-size": "20px", "margin-left": "15px", "font-family:" :"Open Sans"},
  };
  const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      //   "LINK_BUTTONS",
      "BLOCK_TYPE_DROPDOWN",
      //   "HISTORY_BUTTONS",
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Normal", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
    ],
  };


export default function PolicySettings() {

    const fileTypes = ["doc", "pdf"];
    const [govLawDesc, setgovLawDesc] = useState("");
    const [govLawFile, setgovLawFile] = useState(null);

    const [editorgovLawValue, setEditorgovLawValue] = React.useState(
        RichTextEditor.createValueFromString(govLawDesc, "html")
    );

  return (
    <div>
        <Row>
            <span style={useStyles.teamword}>Upload Content</span>
        </Row>
        <Row>
            <Col xs='12' sm='6' md='6' lg='6'>
                <RichTextEditor
                toolbarConfig={toolbarConfig}
                value={editorgovLawValue}
                // onChange={handlegovLawChange}
                required
                id="body-text"
                name="bodyText"
                type="string"
                multiline
                variant="filled"
                style={{
                minHeight: 410,
                width: 420,
                marginTop: 20,
                marginBottom: 20,
                border: "1px solid black",
                zIndex: 4,
                textAlign: "left"
                }}
            />
            </Col>
            <Col xs='12' sm='6' md='6' lg='6'>
                <FileUploader
                // handleChange={handlegovLawFileChange}
                name="file"
                types={fileTypes}
                children={
                <UploadOrgLogo
                    uploaddes="Supports: .doc, .pdf 2MB file size"
                    uploadtitle="Upload Governing Laws "
                />
                }
            // maxSize={2}
          />
            </Col>
        </Row>
    </div>
  )
}
