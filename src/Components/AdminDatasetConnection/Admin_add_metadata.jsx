import { InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import FaceIcon from '@mui/icons-material/Face';
import RichTextEditor from 'react-rte';

const Admin_add_metadata = () => {
    const [govLawDesc, setgovLawDesc] = useState("");

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

    const [editorGovLawValue, setEditorGovLawValue] = React.useState(
        RichTextEditor.createValueFromString(govLawDesc, "html")
    );

    const handlegovLawChange = (value) => {
        setEditorGovLawValue(value);
        setgovLawDesc(value.toString("html"));
        console.log(value.toString("html"));
    };
    return (
        <>
            <Row>
                <Col lg={12}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaceIcon />
                                </InputAdornment>
                            ),
                        }}
                        style={{ width: "80%" }} id="standard-basic" label="User name" variant="standard" />
                </Col>
                <Col xs="12" sm="6" md="6" lg="12">
                    <div className="invite-participant-text-editor policyrte">
                        <RichTextEditor
                            toolbarConfig={toolbarConfig}
                            value={editorGovLawValue}
                            onChange={handlegovLawChange}
                            required
                            id="body-text"
                            name="bodyText"
                            type="string"
                            multiline
                            variant="filled"
                            style={{
                                minHeight: 410,
                                //   width: 420,
                                border: "1px solid black",
                                //   zIndex: 4,
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Admin_add_metadata