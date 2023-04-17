import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileUploaderMain from "../Generic/FileUploader";
import global_styles from "../../Assets/CSS/global.module.css";
import RichTextEditor from "react-rte";
import Button from "@mui/material/Button";
import "./AccountSettings.css";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import document_upload from "../../Assets/Img/Farmstack V2.0/document_upload.svg";
import parse from "html-react-parser";
import CancelIcon from "@mui/icons-material/Cancel";
import { GetErrorHandlingRoute, GetErrorKey } from "../../Utils/Common";
import { useHistory } from "react-router-dom";
import styles from "./settings.module.css";
import { IconButton } from "@material-ui/core";

export default function PolicySettings(props) {
  const [policyvalues, setPolicyValues] = useState([]);
  const [policyValuesNameError, setPolicyValuesNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [fileNameError, setFileNameError] = useState("");
  const [editPolicy, setEditPolicy] = useState(false);
  const history = useHistory();
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
  const handlePolicyNameChange = (index, e) => {
    if (editPolicy) {
      let tmpPolicyvalues = [...policyvalues];
      if (tmpPolicyvalues[index].name !== undefined) {
        tmpPolicyvalues[index].name = e.target.value;
        setPolicyValues(tmpPolicyvalues);
      } else {
        return;
      }
    }
  };
  const hanldePolicyDeschange = (index, e) => {
    if (editPolicy) {
      let tmpPolicyvalues = [...policyvalues];
      if (tmpPolicyvalues[index].description !== undefined) {
        tmpPolicyvalues[index].description = e.target.value;
        setPolicyValues(tmpPolicyvalues);
      } else {
        return;
      }
    }
  };
  // const handleClickApply = (index, newValue) => {
  //   let tmpPolicyvalues = [...policyvalues];
  //   let newPolicyName = newValue;
  //   let policyAlreadyExist = tmpPolicyvalues.some((item, i) => {
  //     return i !== index && item.name === newPolicyName;
  //   });
  //   if (policyAlreadyExist) {
  //     let errorOfNewPolicy = [...policyValuesNameError];
  //     errorOfNewPolicy[
  //       index
  //     ] = `"${newPolicyName}" is already taken. Please choose a different name.`;
  //     setPolicyValuesNameError(errorOfNewPolicy);
  //   } else if (newPolicyName === "") {
  //     let errorOfNewPolicy = [...policyValuesNameError];
  //     errorOfNewPolicy[index] = "This field may not be blank";
  //     setPolicyValuesNameError(errorOfNewPolicy);
  //   } else {
  //     let tmpPolicyError = [...policyValuesNameError];
  //     tmpPolicyError[index] = "";
  //     setPolicyValuesNameError(tmpPolicyError);
  //     handlePolicyNameChange(index, newPolicyName);

  //     if (tmpPolicyvalues[index].newFile) {
  //       tmpPolicyvalues[index].file = tmpPolicyvalues[index].newFile;
  //       delete tmpPolicyvalues[index].newFile;
  //     }
  //   }
  // };
  const handleFileCancel = (index) => {
    if (editPolicy) {
      let tmpPolicyvalues = [...policyvalues];
      tmpPolicyvalues[index].file = null;
      setPolicyValues(tmpPolicyvalues);
    }
  };

  const handlePolicyFileChange = (index, file) => {
    if (editPolicy) {
      let tmpPolicyvalues = [...policyvalues];
      tmpPolicyvalues[index].file = file;
      tmpPolicyvalues[index].fileName = file.name;
      setPolicyValues(tmpPolicyvalues);
      console.log(policyvalues)
    }
  };
  // const handleEditorChange = (value, index) => {
  //   let policyValuesCopy = [...policyvalues];
  //   policyValuesCopy[index].description = value.toString("html");
  //   setPolicyValues(policyValuesCopy);
  // };

  const handleSubmitPolicy = (index) => {
    let method = "PATCH";
    let id = policyvalues[index].id;
    let url = UrlConstant.base_url + UrlConstant.datahub_policy + id + "/";
    // let formData = [policyvalues[index]];
    let formData = new FormData();
    formData.append("name", policyvalues[index].name);
    formData.append("description", policyvalues[index].description);
    //formData.append("file", policyvalues[index].file, policyvalues[index].file.name);
    const file = policyvalues[index].file;
    const blob = new Blob([file], { type: file.type });
    const newFile = new File([blob], file.name, { type: file.type });

  formData.append("file", newFile);
    HTTPService(method, url, formData, false, true, false, false)
      .then((response) => {
        console.log(response.data);
        let arrayValues = [...policyvalues, response.data];
        setPolicyValues(arrayValues);
      })
      .catch((e) => {
        console.log(e);
        var returnValues = GetErrorKey(e, formData.keys());
        var errorKeys = returnValues[0];
        var errorMessages = returnValues[1];
        if (errorKeys.length > 0) {
          for (var i = 0; i < errorKeys.length; i++) {
            switch (errorKeys[i]) {
              case "name":
                setPolicyValuesNameError(errorMessages[i]);
                break;
              case "description":
                setDescriptionError(errorMessages[i]);
                break;
              case "file":
                setFileNameError(errorMessages[i]);
                break;
              default:
                history.push(GetErrorHandlingRoute(e));
                break;
            }
          }
        }
      });
  };
  const getPolicies = () => {
    let method = "GET";
    let url = UrlConstant.base_url + UrlConstant.datahub_policy;
    HTTPService(method, url, "", false, true, false, false)
      .then((response) => {
        console.log(response.data);
        let arrayValues = [...policyvalues, ...response.data];
        setPolicyValues(arrayValues);
      })
      .catch((e) => {
        console.log(e);
        history.push(GetErrorHandlingRoute(e));
      });
  };
  const handleCancel = () => {
    getPolicies()
    history.push("/datahub/settings/3");
    window.location.reload();
    
   
  };

  const deletePolicy = (id, index) => {
    let method = "DELETE";
    let url = UrlConstant.base_url + UrlConstant.datahub_policy + id + "/";
    return HTTPService(method, url, "", false, true, false, false)
      .then((response) => {
        console.log(response);
        const updatedPolicies = policyvalues.filter((policy, i) => i !== index);
        setPolicyValues(updatedPolicies);
      })
      .catch((e) => {
        console.log(e);
        history.push(GetErrorHandlingRoute(e));
      });
  };
  useEffect(() => {
    getPolicies();
  }, []);

  return (
    <Container style={{ "margin-top": "auto" }}>
      <div className="mainHeadSetting">Policy settings</div>
      <Row style={{ margin: "20px" }}>
        <Col xs={12} sm={12} md={12} lg={12}>
          {policyvalues?.map((item, index) => (
            <Accordion className="accordion-main-classname">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  className={global_styles.bold600 + " " + global_styles.size24}
                >
                  {item.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {editPolicy ? (
                  <>
                  <Row>
                    <TextField
                      id="policy_name"
                      label="Policy name"
                      variant="outlined"
                      //required
                      value={item?.name}
                      style={{
                        width: "100%",
                        margin: "20px",
                      }}
                      onChange={(e) => handlePolicyNameChange(index, e)}
                      error={policyValuesNameError ? policyValuesNameError : ""}
                      helperText={
                        policyValuesNameError ? policyValuesNameError : ""
                      }
                    />
                    </Row>
                    <Row>
                    <TextField
                      required
                      value={item?.description || ""}
                      onChange={(e) => hanldePolicyDeschange(index, e)}
                      inputProps={{ maxLength: 250 }}
                      multiline
                      rows={4}
                      size="small"
                      style={{
                        width: "100%",
                        margin: "20px",
                      }}
                      id="datapoint-name-input-box-description-id"
                      label="Description"
                      variant="outlined"
                      error={descriptionError ? descriptionError : ""}
                      helperText={descriptionError ? descriptionError : ""}
                    />
                    </Row>
                  </>
                ) : (
                  <>
                    <Typography style={{textAlign: "left", marginBottom: "10px"}}>Policy Name</Typography>

                    <Typography style={{textAlign: "left", marginBottom: "20px"}}className="viewdetailsSettings">
                      {item?.name}
                    </Typography>

                    <Typography style={{textAlign: "left", marginTop: "20px", marginBottom: "20px"}}>Description</Typography>

                    <Typography style={{textAlign: "left", marginBottom: "20px"}} className="viewdetailsSettings">
                    {item?.description ? parse(item?.description) : item?.description} 
                    </Typography>
                  </>
                )}
                <Row>
                  {editPolicy ? 
                  <Col
                    lg={6}
                    sm={12}
                    style={{ marginBottom: "20px", marginTop: "10px" }}
                  >
                    <FileUploaderMain
                      fileTypes={["xls", " xlsx", "csv"]}
                      maxSize={25}
                      handleChange={(file) =>
                        handlePolicyFileChange(index, file)
                      }
                      isMultiple={false}
                      disabled={!editPolicy}
                    />
                    <span
                      style={{
                        color: "red",
                        fontSize: "14px",
                        textAlign: "left",
                      }}
                    >
                      {fileNameError ? fileNameError : ""}
                    </span>
                  </Col> : "" }
                  <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
                    <div
                      className={
                        global_styles.bold600 +
                        " " +
                        global_styles.font20 +
                        " " +
                        styles.text_left
                      }
                    >
                      Uploaded files
                    </div>
                    <div
                      className={styles.text_left + " " + styles.preview_box}
                    >
                      {item.file ? (
                        <>
                          <div className={styles.each_preview_policy}>
                            <div>
                              <img
                                height={"52px"}
                                width={"42px"}
                                className={styles.document_upload_logo}
                                src={document_upload}
                              />

                              {typeof item.file === "string" ? (
                                <span>{item.file.split("/").pop() + " " + (item.size ? (item.size / 1024).toFixed(2) : NaN)}</span>
                              ) : (
                                <span>{item.fileName + " "  + (item.file.size ? (item.file.size / 1024).toFixed(2) + " MB"  : NaN)}</span>
                              )}
                            </div>
                            {editPolicy ? 
                            <IconButton disabled={!editPolicy}>
                              <CancelIcon
                                onClick={() => handleFileCancel(index)}
                                style={{ cursor: "pointer" }}
                                fontSize="small"
                              />
                            </IconButton> : "" }
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <span>No file available</span>
                          </div>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "right", margin: "20px" }}>
                    {editPolicy ? (
                      <>
                        <Button
                          id="apply_policies"
                          variant="outlined"
                          style={{ margin: "20px" }}
                          className="buttoncancel"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button
                          id="apply_policies"
                          variant="outlined"
                          style={{ margin: "20px" }}
                          className="buttonrightset"
                          onClick={(e) => handleSubmitPolicy(index)}
                        >
                          Apply
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          id="apply_policies"
                          variant="outlined"
                          style={{ margin: "20px" }}
                          className="buttonleftred"
                          onClick={() => deletePolicy(item.id, index)}
                        >
                          Delete
                        </Button>
                        <Button
                          id="apply_policies"
                          variant="outlined"
                          style={{ margin: "20px" }}
                          className="buttonrightset"
                          onClick={() => setEditPolicy(true)}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              </AccordionDetails>
            </Accordion>
          ))}
        </Col>
      </Row>
      {/* <Row>
        <Col style={{ textAlign: "right", margin: "20px" }}>
          <Button
            id="cancelbutton_account"
            variant="outlined"
            style={{ margin: "20px" }}
            className="button"
          >
            Cancel
          </Button>
          <Button
            id="submitbutton_account"
            variant="outlined"
            className="button"
            onClick={(e) => handleSubmitPolicy(e)}
          >
            Submit
          </Button>
        </Col>
      </Row> */}
    </Container>
  );
}
