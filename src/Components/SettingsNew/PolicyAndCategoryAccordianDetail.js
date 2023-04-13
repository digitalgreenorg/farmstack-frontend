import React from "react";
import { Row, Col } from "react-bootstrap";
import { TextField, Button } from "@material-ui/core";
import RichTextEditor from "react-rte";
import FileUploaderMain from "../Generic/FileUploader";

const PolicyAccordionDetails = (props) => {
    const { policyname, companyPolicyValue } = props;
  return (
    <React.Fragment>
      <TextField
        id="policy_name"
        label="Policy name"
        variant="outlined"
        required
        value={policyname}
        style={{ width: "100%", margin: "20px", marginLeft: "auto" }}
      />
      <Row>
        <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
          <RichTextEditor
            placeholder="Dataset description"
            value={companyPolicyValue}
            required
            id="body-text"
            name="bodyText"
            type="string"
            multiline
            variant="filled"
            style={{
              minHeight: 410,
              border: "1px solid black",
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} sm={12} style={{ marginBottom: "20px", marginTop:"10px" }}>
          <FileUploaderMain
            isMultiple={false}
            disabled
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "right", margin: "20px" }}>
          <Button
            id="apply_policies"
            variant="outlined"
            style={{ margin: "20px" }}
            className="button"
          >
            Apply
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PolicyAccordionDetails;