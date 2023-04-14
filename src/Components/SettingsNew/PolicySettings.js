import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileUploaderMain from "../Generic/FileUploader";
import RichTextEditor from "react-rte";
import Button from "@mui/material/Button";
import "./AccountSettings.css";
import global_styles from "../../Assets/CSS/global.module.css";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import PolicyAccordionDetails from "./PolicyAndCategoryAccordianDetail";
import parse from "html-react-parser";
import global_style from "../../Assets/CSS/global.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { GetErrorHandlingRoute, getUserLocal } from "../../Utils/Common";
import { useHistory } from "react-router-dom";

export default function PolicySettings() {
  const [policyvalues, setPolicyValues] = useState([]);
  const [policyValuesNameError, setPolicyValuesNameError] = useState([]);
  const history = useHistory()

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
  const handlePolicyNameChange = (index, newValue) => {
    let tmpPolicyvalues = [...policyvalues];
    if (newValue) {
      tmpPolicyvalues[index].name = newValue;
      setPolicyValues(tmpPolicyvalues);
    } else {
      return;
    }
  };

  const handleClickApply = (index, newValue) => {
    let tmpPolicyvalues = [...policyvalues];
    let newPolicyName = newValue;
    let policyAlreadyExist = tmpPolicyvalues.some((item, i) => {
      return i !== index && item.name === newPolicyName;
    });
    if (policyAlreadyExist) {
      let errorOfNewPolicy = [...policyValuesNameError];
      errorOfNewPolicy[
        index
      ] = `"${newPolicyName}" is already taken. Please choose a different name.`;
      setPolicyValuesNameError(errorOfNewPolicy);
    } else if (newPolicyName === "") {
      let errorOfNewPolicy = [...policyValuesNameError];
      errorOfNewPolicy[index] = "This field may not be blank";
      setPolicyValuesNameError(errorOfNewPolicy);
    } else {
      let tmpPolicyError = [...policyValuesNameError];
      tmpPolicyError[index] = "";
      setPolicyValuesNameError(tmpPolicyError);
      handlePolicyNameChange(index, newPolicyName);

      if (tmpPolicyvalues[index].newFile) {
        tmpPolicyvalues[index].file = tmpPolicyvalues[index].newFile;
        delete tmpPolicyvalues[index].newFile;
      }
    }
  };
  const handleFileCancel = (index) => {
    let tmpPolicyvalues = [...policyvalues];
    tmpPolicyvalues[index].file = null;
    setPolicyValues(tmpPolicyvalues);
  };

  const handlePolicyFileChange = (event, index) => {
    const newFile = event.target?.files[0];
    if (newFile) {
      // Update the temporary copy of policyvalues
      let tmpPolicyvalues = [...policyvalues];
      tmpPolicyvalues[index].newFile = newFile;
      setPolicyValues(tmpPolicyvalues);
    }
  };
  // const handleEditorChange = (value, index) => {
  //   let policyValuesCopy = [...policyvalues];
  //   policyValuesCopy[index].description = value.toString("html");
  //   setPolicyValues(policyValuesCopy);
  // };

  const handleSubmitPolicy = (id) => {
    let method = "PATCH";
    let url = UrlConstant.base_url + UrlConstant.datahub_policy + id + "/"
    // let formData = [...policyvalues];
    const formData = new FormData();
    for (let i = 0; i < policyvalues.length; i++) {
      formData.append("name", policyvalues[i].name);
      formData.append("description", policyvalues[i].description);
      formData.append("file", policyvalues[i].file);
    }
    // policyvalues.forEach((policyvalue) => {
    //   let url = UrlConstant.base_url + UrlConstant.datahub_policy + id + "/";
    //   const formData = new FormData();
    //   formData.append('name', policyvalue.name);
    //   formData.append('description', policyvalue.description);
    //   formData.append('file', policyvalue.file);
  
    //   HTTPService(method, url, formData, false, true, false, false)
    //     .then((response) => {
    //       console.log(response.data);
    //       setPolicyValues((prevPolicyValues) => [...prevPolicyValues, response.data]);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       history.push(GetErrorHandlingRoute())
    //     });
    // });
    HTTPService(method, url, formData, false, true, false, false)
      .then((response) => {
        console.log(response.data);
        let arrayValues = [...policyvalues, response.data];
        setPolicyValues(arrayValues);
      })
      .catch((e) => {
        console.log(e);
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
        history.push(GetErrorHandlingRoute(e))
      });
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
      });
  };
  useEffect(() => {
    getPolicies();
  }, []);

  return (
    <Container>
      <Row>
        <Typography
          className={global_styles.bold600 + " " + global_styles.size32}
          style={{ marginLeft: "40px", marginTop: "0px" }}
        >
          Policy settings
        </Typography>
      </Row>
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
                  className={global_styles.bold600 + " " + global_styles.size28}
                >
                  {item.name}
                </Typography>

                <DeleteOutlineIcon
                  style={{ marginLeft: "auto" }}
                  onClick={() => deletePolicy(item.id, index)}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Row>
                  <TextField
                    id="policy_name"
                    label="Policy name"
                    variant="outlined"
                    required
                    value={item.name}
                    style={{
                      width: "100%",
                      margin: "20px",
                    }}
                    onChange={(e) =>
                      handlePolicyNameChange(index, e.target.value)
                    }
                  />
                </Row>
                <Row>
                  <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
                    <RichTextEditor
                      dir="ltr"
                      toolbarConfig={toolbarConfig}
                      placeholder="Policy description"
                      value={RichTextEditor.createValueFromString(
                        item.description,
                        "html"
                      )}
                      onChange={(value) => {
                        const updatedPolicies = [...policyvalues];
                        updatedPolicies[index].description =
                          value.toString("html");
                        setPolicyValues(updatedPolicies);
                      }}
                      required
                      id="body-text"
                      name="bodyText"
                      type="string"
                      multiline
                      variant="filled"
                      style={{
                        minHeight: 410,
                        border: "1px solid black",
                        unicodeBidi: "plaintext",
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    lg={6}
                    sm={12}
                    style={{ marginBottom: "20px", marginTop: "10px" }}
                  >
                    <FileUploaderMain
                      handleChange={(event) =>
                        handlePolicyFileChange(event, index)
                      }
                      isMultiple={false}
                    />
                  </Col>
                  <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
                    <Row
                      className={
                        global_style.bold600 + " " + global_style.font20
                        // +
                        // " " +
                        // styles.text_left
                      }
                    >
                      Uploaded file
                    </Row>

                    <Row>
                      {/* {item.file && <Row>{`File name: ${item.file.name}`}</Row>} */}
                      {item.file ? (
                        <>
                          <label>{item.file.split("/").pop()}</label>
                          <CancelIcon
                            onClick={() => handleFileCancel(index)}
                            style={{ cursor: "pointer" }}
                            fontSize="small"
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "right", margin: "20px" }}>
                    <Button
                      id="apply_policies"
                      variant="outlined"
                      style={{ margin: "20px" }}
                      className="button"
                      // onClick={() => handleClickApply(index, item.name)}
                      onClick={(e) => handleSubmitPolicy(e)}
                    >
                      Apply
                    </Button>
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
