import React, { useContext, useEffect, useState } from "react";
import styles from "./onboarding.module.css";
import { Button, Col, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import global_style from "../../Assets/CSS/global.module.css";

import FileUploaderMain from "../Generic/FileUploader";
import RichTextEditor from "react-rte";
import CancelIcon from "@mui/icons-material/Cancel";
import document_upload from "../../Assets/Img/Farmstack V2.0/document_upload.svg";
import ControlledAccordions from "../Catergories/ControlledAccordions";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import HTMLReactParser from "html-react-parser";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { goToTop } from "../../Utils/Common";
const CompanyPolicies = (props) => {
  const { callLoader } = useContext(FarmStackContext);

  const { setActiveStep } = props;
  const [policyName, setPolicyName] = useState("");
  const [policyNameError, setPolicyNameError] = useState("");
  //rich text editor
  const [companyPolicyDescription, setcompanyPolicyDescription] = useState("");
  const [uploadedPolicy, setUploadedPolicy] = useState(null);
  const [preview, setPreview] = useState(null);
  const [allPolicies, setAllPolicies] = useState([]);

  const handleUploadPolicy = (file) => {
    setUploadedPolicy(file);
  };
  const handleDeletePolicy = (index) => {
    setUploadedPolicy(null);
    setPreview(null);
  };
  const deletePolicyDetail = (e, index) => {
    e.stopPropagation();
    let arr = allPolicies;
    //id to delete
    let id = arr[index].id;
    submitPolicy("DELETE", id);
  };
  const handleAddPolicy = (e) => {
    // e.preventDefault();
    submitPolicy("POST");
  };
  const refreshInputs = () => {
    setPolicyName("");
    setcompanyPolicyDescription("");
    setUploadedPolicy(null);
    setPreview(null);
    setEditorGovLawValue(
      RichTextEditor.createValueFromString(companyPolicyDescription, "html")
    );
  };

  const submitPolicy = (method, policy_id) => {
    let url;
    let payload;
    if (method == "POST") {
      url = UrlConstant.base_url + UrlConstant.datahub_policy;
      payload = new FormData();
      payload.append("description", companyPolicyDescription);
      payload.append("name", policyName);
      payload.append("file", uploadedPolicy);
    } else if (method == "DELETE" && policy_id) {
      url = UrlConstant.base_url + UrlConstant.datahub_policy + policy_id + "/";
      payload = "";
    }
    callLoader(true);
    HTTPService(method, url, payload, true, true, false, false)
      .then((response) => {
        console.log(response);
        callLoader(false);
        if (method == "POST") {
          //after getting the response correclty trying to create accordion detail
          let arr = [...allPolicies, response.data];
          setAllPolicies([...arr]);
          refreshInputs();
        } else if (method == "DELETE") {
          getListOfPolicies();
        }
      })
      .catch((error) => {
        callLoader(false);
        console.log(error);
      });
  };

  const getListOfPolicies = () => {
    let url = UrlConstant.base_url + UrlConstant.datahub_policy;
    let method = "GET";
    HTTPService(method, url, "", false, true, false, true)
      .then((response) => {
        console.log(response);
        //after getting the response correclty trying to create accordion detail
        let arr = [...response.data];
        setAllPolicies([...arr]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    console.log(uploadedPolicy);
    if (!uploadedPolicy) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(uploadedPolicy);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedPolicy]);

  function AccordionBody(props) {
    const { data, index } = props;
    console.log(data);
    return (
      <div style={{ textAlign: "left" }}>
        <div>
          {data.description ? HTMLReactParser(data.description) : "Description"}
        </div>
        <div>
          <img
            height={"52px"}
            width={"42px"}
            className={styles.document_upload_logo}
            src={document_upload}
          />
          <a href={data.file ? data.file : "No file"}>{data.file}</a>
        </div>
      </div>
    );
  }
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

  const [companyPolicyValue, setEditorGovLawValue] = React.useState(
    RichTextEditor.createValueFromString(companyPolicyDescription, "html")
  );
  const handlegovLawChange = (value) => {
    setEditorGovLawValue(value);
    setcompanyPolicyDescription(value.toString("html"));
    // if (value.toString("html") !== "<p><br></p>") {
    //   setGovLawdescbtn(true);
    // } else {
    //   setGovLawdescbtn(false);
    // }
    console.log(value.toString("html"));
  };
  useEffect(() => {
    getListOfPolicies();
    goToTop(0);
  }, []);
  return (
    <div className={styles.main_box}>
      <div className={styles.main_label}>Company Policies</div>

      <div className={styles.sub_label}>
        Enter your company policies, we will show to others! You can add text
        and file upload also
      </div>

      <div className={styles.all_inputs}>
        <Row>
          <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              required
              placeholder="Policy name"
              label="Policy name"
              variant="outlined"
              id="policyName"
              name="policyName"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              error={policyNameError ? true : false}
              helperText={policyNameError}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
            <RichTextEditor
              placeholder="Dataset description"
              toolbarConfig={toolbarConfig}
              value={companyPolicyValue}
              // onKeyDown={handledatasetnameKeydown}
              onChange={handlegovLawChange}
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
          <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
            <FileUploaderMain
              isMultiple={false}
              fileTypes={["xls", " xlsx", "csv"]}
              handleChange={handleUploadPolicy}
              maxSize={25}
            />
          </Col>
          <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
            <div
              className={
                global_style.bold600 +
                " " +
                global_style.font20 +
                " " +
                styles.text_left
              }
            >
              Uploaded file
            </div>
            {uploadedPolicy && (
              <div className={styles.text_left + " " + styles.preview_box}>
                {uploadedPolicy && (
                  <div className={styles.each_preview_policy}>
                    <div>
                      <img
                        height={"52px"}
                        width={"42px"}
                        className={styles.document_upload_logo}
                        src={document_upload}
                      />

                      <span>{uploadedPolicy.name}</span>
                    </div>
                    <CancelIcon
                      onClick={() => handleDeletePolicy()}
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                    />
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </div>
      <div className={styles.button_grp}>
        <Button
          onClick={() => handleAddPolicy()}
          className={global_style.primary_button + " " + styles.next_button}
        >
          {" "}
          Add
        </Button>
      </div>
      {allPolicies.length > 0 && (
        <div className={styles.main_label}>Catalogs</div>
      )}
      <Row style={{ marginBottom: "20px" }}>
        <Col lg={12} sm={12}>
          {allPolicies.map((each_policy, index) => {
            console.log(allPolicies, each_policy);
            return (
              <ControlledAccordions
                data={each_policy}
                index={index}
                heading={each_policy.name}
                Component={AccordionBody}
                accordionDelete={deletePolicyDetail}
                isHeadEditing={false}
                handleEditHeading={() => {}}
              />
            );
          })}
        </Col>
      </Row>
      <div className={styles.button_grp}>
        <Button
          onClick={() => setActiveStep((prev) => prev + 1)}
          className={global_style.secondary_button}
        >
          {" "}
          Finish later
        </Button>
        <Button
          disabled={allPolicies.length > 0 ? false : true}
          onClick={() => setActiveStep((prev) => prev + 1)}
          className={global_style.primary_button + " " + styles.next_button}
        >
          {" "}
          Next
        </Button>
      </div>
    </div>
  );
};

export default CompanyPolicies;
