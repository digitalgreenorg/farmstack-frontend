import React, { useContext, useEffect, useState } from "react";
import styles from "./onboarding.module.css";
import { Col, Row } from "react-bootstrap";
import { Button, TextField, Typography } from "@mui/material";
import global_style from "../../Assets/CSS/global.module.css";

import FileUploaderMain from "../Generic/FileUploader";
import RichTextEditor from "react-rte";
import CancelIcon from "@mui/icons-material/Cancel";
import document_upload from "../../Assets/Img/Farmstack V2.0/document_upload.svg";
import ControlledAccordions from "../Catergories/ControlledAccordions";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import {
  GetErrorHandlingRoute,
  GetErrorKey,
  goToTop,
} from "../../Utils/Common";
import { CSSTransition } from "react-transition-group";
import { Popconfirm } from "antd";
import CustomDeletePopper from "../DeletePopper/CustomDeletePopper";
import { useHistory } from "react-router-dom";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import Divider from "@mui/material/Divider";

const CompanyPolicies = (props) => {
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [sizeError, setSizeError] = useState("");
  const { setActiveStep } = props;
  const [policyName, setPolicyName] = useState("");
  const [policyNameError, setPolicyNameError] = useState("");
  const [fileError, setFileError] = useState("");
  //rich text editor
  const [companyPolicyDescription, setcompanyPolicyDescription] = useState("");
  const [uploadedPolicy, setUploadedPolicy] = useState(null);
  const [preview, setPreview] = useState(null);
  const [allPolicies, setAllPolicies] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [key, setKey] = useState(0);
  const history = useHistory();

  const handleUploadPolicy = (file) => {
    console.log("function is calling");
    setUploadedPolicy(file);
    setKey(key + 1);
    console.log("file during upload", uploadedPolicy, key);
    setFileError("");
  };
  const handleDeletePolicy = (index) => {
    setUploadedPolicy(null);
    setPreview(null);
    setKey(key + 1);
    setFileError("");
    console.log("file during delete", uploadedPolicy, key);
  };

  function closeAccordion() {}
  const confirm = (e, index) => {
    deletePolicyDetail(e, index);
  };
  const deletePolicyDetail = (e, index) => {
    if (e) {
      e.stopPropagation();
    }
    let arr = allPolicies;
    //id to delete
    let id = arr[index].id;
    submitPolicy("DELETE", id);
  };
  const handleAddPolicy = (e) => {
    // e.preventDefault();
    setFileError("");
    setPolicyNameError("");
    submitPolicy("POST");
  };
  const refreshInputs = () => {
    setPolicyName("");
    setcompanyPolicyDescription("");
    setUploadedPolicy(null);
    setPreview(null);
    setEditorGovLawValue(RichTextEditor.createValueFromString("", "html"));
  };

  const [editPolicyNameError, setEditPolicyNameError] = useState({
    error: "",
    policy_id: "",
  });
  const [editPolicyDescriptionError, setEditPolicyDescriptionError] = useState({
    error: "",
    policy_id: "",
  });
  const [editPolicyFileError, setEditPolicyFileError] = useState({
    error: "",
    policy_id: "",
  });
  const resetEditError = (id) => {
    setEditPolicyNameError({ error: "", policy_id: "" });
    setEditPolicyDescriptionError({ error: "", policy_id: "" });
    setEditPolicyFileError({ error: "", policy_id: "" });
  };

  const submitPolicy = async (method, policy_id, payloadForPatch) => {
    let url;
    let payload;
    if (method == "POST") {
      url = UrlConstant.base_url + UrlConstant.datahub_policy;
      payload = new FormData();
      payload.append("description", companyPolicyDescription);
      payload.append("name", policyName);
      if (uploadedPolicy) {
        payload.append("file", uploadedPolicy);
      }
    } else if (method == "DELETE" && policy_id) {
      resetEditError(policy_id);
      url = UrlConstant.base_url + UrlConstant.datahub_policy + policy_id + "/";
      payload = "";
    } else if (method == "PATCH" && policy_id) {
      resetEditError(policy_id);
      url = UrlConstant.base_url + UrlConstant.datahub_policy + policy_id + "/";
      payload = payloadForPatch;
    }
    callLoader(true);
    return await HTTPService(method, url, payload, true, true, false, false)
      .then((response) => {
        console.log(response);
        callLoader(false);
        if (
          props.isPolicySettings &&
          (response.status === 201 || response.status === 200)
        ) {
          callToast("Policy settings updated successfully!", "success", true);
        } else if (props.isPolicySettings && response.status === 204) {
          callToast("Policy deleted successfully", "success", true);
        }
        if (method == "POST") {
          //after getting the response correclty trying to create accordion detail
          let arr = [...allPolicies, response.data];
          setAllPolicies([...arr]);
          refreshInputs();
        } else if (method == "DELETE") {
          getListOfPolicies();
        } else if (method == "PATCH") {
          // getListOfPolicies();
          return response;
        }
      })
      .catch(async (e) => {
        callLoader(false);
        var returnValues = GetErrorKey(e, payload.keys());
        var errorKeys = returnValues[0];
        var errorMessages = returnValues[1];
        if (errorKeys.length > 0) {
          for (var i = 0; i < errorKeys.length; i++) {
            switch (errorKeys[i]) {
              case "name":
                if (method == "PATCH") {
                  setEditPolicyNameError({
                    error: errorMessages[i],
                    policy_id: policy_id,
                  });
                } else {
                  setPolicyNameError(errorMessages[i]);
                }
                break;
              case "description":
                if (method == "PATCH") {
                  setEditPolicyDescriptionError({
                    error: errorMessages[i],
                    policy_id: policy_id,
                  });
                } else {
                  setdescriptionError(errorMessages[i]);
                }
                break;
              case "file":
                if (method == "PATCH") {
                  setEditPolicyFileError({
                    error: errorMessages[i],
                    policy_id: policy_id,
                  });
                } else {
                  setFileError(errorMessages[i]);
                }
                break;
              default:
                let error = await GetErrorHandlingRoute(e);
                if (error) {
                  callToast(
                    error?.message,
                    error?.status === 200 ? "success" : "error",
                    true
                  );
                }
                break;
            }
          }
        } else {
          // let error = await GetErrorHandlingRoute(e);
          // if (error) {
          //   callToast(
          //     error?.message,
          //     error?.status === 200 ? "success" : "error",
          //     true
          //   );
          // }
          let error = await GetErrorHandlingRoute(e);
          console.log("Error obj", error);
          console.log(e);
          if (error.toast) {
            callToast(
              error?.message || "Something went wrong",
              error?.status === 200 ? "success" : "error",
              true
            );
          }
          if (error.path) {
            history.push(error.path);
          }
        }
      });
  };

  const getListOfPolicies = () => {
    callLoader(true);

    let url = UrlConstant.base_url + UrlConstant.datahub_policy;
    let method = "GET";
    HTTPService(method, url, "", false, true, false, true)
      .then((response) => {
        callLoader(false);
        console.log(response);
        //after getting the response correclty trying to create accordion detail
        let arr = [...response.data];
        // arr = arr.sort((policyA, policyB) => policyA.name - policyB.name);
        setAllPolicies([...arr]);
      })
      .catch(async (e) => {
        callLoader(false);
        // let error = await GetErrorHandlingRoute(e);
        // if (error) {
        //   callToast(
        //     error?.message,
        //     error?.status === 200 ? "success" : "error",
        //     true
        //   );
        // }
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!uploadedPolicy) {
      setPreview(undefined);
      return;
    }
    setFileError("");
    const objectUrl = URL.createObjectURL(uploadedPolicy);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedPolicy]);

  function AccordionBody(props) {
    const { data, index } = props;
    const [isEditModeOn, setEditModeOn] = useState(true);
    const [uploadedPolicyE, setUploadedPolicyE] = useState(null);
    const [previewE, setPreviewE] = useState(null);
    const [isLogoLinkE, setIsLogoLinkE] = useState(false);
    const [policyDesc, setPolicyDesc] = useState(data.description);
    const [policyDescValue, setEditorpolicyDescValue] = React.useState(
      RichTextEditor.createValueFromString(policyDesc, "html")
    );
    const [policyDescError, setPolicyDescError] = useState("");
    const [policySize, setPolicySize] = useState("");
    const [policyNameUnderAccordion, setPolicyNameUnderAccordion] = useState(
      data.name
    );

    const [policyNameError, setPolicyNameError] = useState("");
    const [dataOfFile, setDataOfFile] = useState(data.file);
    const [localKey, setLocalKey] = useState(0);
    const [fileSizeErrorE, setFileSizeErrorE] = useState("");
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const confirm = (e, index) => {
      deletePolicyDetail(e, index);
      props.setExpanded(false);
    };
    const handleDeletePopper = (event) => {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    };
    const closePopper = () => {
      setOpen(false);
    };
    const handleUploadPolicyE = (file) => {
      console.log("handleUploadPolicyE called with file:", file);
      setUploadedPolicyE(file);
      // data[index].file = file;
      setPolicySize(file.size);
      setIsLogoLinkE(false);
      setLocalKey(localKey + 1);
      setFileSizeErrorE("");
    };

    const handleDeleteFile = () => {
      console.log("isfile deleted", uploadedPolicyE);
      setUploadedPolicyE(null);
      setDataOfFile(null);
      setPreviewE(null);
      setPolicySize("");
      setIsLogoLinkE(false);
      setLocalKey(localKey + 1);
      setFileSizeErrorE("");
    };
    useEffect(() => {
      if (uploadedPolicyE) {
        const objectUrl = URL.createObjectURL(uploadedPolicyE);
        setPreviewE(objectUrl);
        setIsLogoLinkE(false);
      } else if (dataOfFile) {
        setPreviewE(dataOfFile);
        setIsLogoLinkE(true);
      } else {
        setPreviewE(null);
        setIsLogoLinkE(false);
      }
    }, [uploadedPolicyE, dataOfFile]);

    const handleDescChange = (value) => {
      setEditorpolicyDescValue(value);
      setPolicyDesc(value.toString("html"));
      setSaveButtonEnabled(value.toString("html") !== "");
    };
    const handleChangePolicyName = (e) => {
      setPolicyNameUnderAccordion(e.target.value.trimStart());
    };
    const handleSave = async () => {
      let payload = new FormData();
      payload.append("description", policyDesc);
      payload.append("name", policyNameUnderAccordion);
      !isLogoLinkE && payload.append("file", uploadedPolicyE || "");

      let response = await submitPolicy("PATCH", data.id, payload);

      let arr = [...allPolicies];
      if (response && response.data) {
        arr[index] = { ...response?.data };
        setAllPolicies([...arr]);
        setIsLogoLinkE(true);
      } else {
        let obj = {
          ...data,
          name: policyNameUnderAccordion ?? "",
          description: policyDesc,
        };
        arr[index] = { ...obj };
        setAllPolicies([...arr]);
      }
    };

    return (
      <div style={{ textAlign: "left" }}>
        <Row>
          <Col>
            <TextField
              fullWidth
              required
              placeholder="Policy name"
              label="Policy name"
              variant="outlined"
              id={`${index}-policyName-update`}
              name="policyName"
              value={policyNameUnderAccordion}
              onChange={(e) => handleChangePolicyName(e)}
              error={
                editPolicyNameError.error &&
                editPolicyNameError.policy_id == data.id
                  ? true
                  : false
              }
              helperText={editPolicyNameError.error}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12} sm={12} style={{ margin: "20px 0px" }}>
            <RichTextEditor
              placeholder="Description"
              toolbarConfig={toolbarConfig}
              value={policyDescValue}
              // onKeyDown={handledatasetnameKeydown}
              onChange={handleDescChange}
              required
              className="rich_text_editor"
              id={`${index}rich_text_editor-update`}
              name="bodyText"
              type="string"
              multiline
              variant="filled"
              style={{
                textAlign: "left",
                minHeight: 410,
                border: "1px solid black",
              }}
            />
            <span style={{ color: "red", fontSize: "12px" }}>
              {editPolicyDescriptionError.error &&
              editPolicyDescriptionError.policy_id == data.id
                ? editPolicyDescriptionError.error
                : ""}
            </span>
          </Col>
        </Row>
        <Row>
          <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
            <Divider>or</Divider>
          </Col>
        </Row>
        <Row>
          <CSSTransition
            appear={isEditModeOn}
            in={isEditModeOn}
            timeout={{
              appear: 600,
              enter: 700,
              exit: 100,
            }}
            mountOnEnter
            classNames="step"
            unmountOnExit
          >
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <FileUploaderMain
                key={localKey}
                isMultiple={false}
                texts={
                  <span>
                    {"Drop files here or click "}
                    <a
                      href="#"
                      style={{
                        textDecoration: "underline",
                        color: "#00ab55",
                        display: "inline-block",
                      }}
                    >
                      {" browse "}
                    </a>
                    {" through your machine, File size not more than"}
                  </span>
                }
                fileTypes={["pdf", "doc"]}
                handleChange={handleUploadPolicyE}
                maxSize={25}
                setSizeError={() =>
                  setFileSizeErrorE("Maximum file size allowed is 25MB")
                }
                id={`${index}-file-update`}
              />
              {/* <div>{"sizeError"}</div> */}
            </Col>
          </CSSTransition>
          <Col
            lg={isEditModeOn ? 6 : 12}
            sm={12}
            style={{ marginBottom: "20px" }}
          >
            <div
              className={
                global_style.bold600 +
                " " +
                global_style.font20 +
                " " +
                styles.text_left
              }
              style={{ marginBottom: "20px" }}
            >
              {previewE && "Uploaded file"}
            </div>

            {uploadedPolicyE || dataOfFile ? (
              <div className={styles.text_left + " " + styles.preview_box}>
                {previewE && (
                  <div className={styles.each_preview_policy}>
                    <div>
                      <img
                        id="document-upload-logo"
                        height={"52px"}
                        width={"42px"}
                        className={styles.document_upload_logo}
                        src={document_upload}
                      />

                      <span
                        id="file-preview"
                        className={
                          global_style.blue +
                          " " +
                          styles.link +
                          " " +
                          global_style.ellipses
                        }
                        style={{ width: "100%" }}
                        onClick={() => window.open(previewE)}
                      >
                        {/* {console.log(uploadedPolicyE, "uploadedPolicyE")} */}
                        {uploadedPolicyE?.name
                          ? uploadedPolicyE?.name
                          : dataOfFile
                          ? dataOfFile?.split("/").at(-1)
                          : ""}
                      </span>
                      <span id="file-size" className={global_style.light_text}>
                        {policySize && (policySize / 1000000).toFixed(2) + "MB"}
                      </span>
                    </div>
                    <CancelIcon
                      onClick={() => handleDeleteFile()}
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                      id={`${index}-cancel-uploaded-file-icon`}
                    />
                  </div>
                )}
              </div>
            ) : null}
            <div
              className={
                global_style.size14 +
                " " +
                global_style.error +
                " " +
                styles.text_left
              }
            >
              {editPolicyFileError.error &&
              editPolicyFileError.policy_id == data.id
                ? editPolicyFileError.error
                : fileSizeErrorE}
            </div>
          </Col>
        </Row>

        {/* <div>
          {data.description ? HTMLReactParser(data.description) : "Description"}
        </div> */}
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "right",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CustomDeletePopper
            DeleteItem={policyNameUnderAccordion}
            anchorEl={anchorEl}
            handleDelete={(e) => confirm(e, index)}
            id={"delete-popper-id"}
            open={open}
            closePopper={closePopper}
            deletePopperId={`${index}-delete-popper-policy-button`}
            cancelPopperId={`${index}-cancel-popper-policy-button`}
          />
          <Button
            className={
              global_style.secondary_button_error +
              " " +
              styles.delete_button_policy
            }
            onClick={handleDeletePopper}
            id="delete-button-policy"
          >
            Delete
          </Button>
          {isEditModeOn ? (
            <Button
              disabled={
                (uploadedPolicyE ||
                  dataOfFile ||
                  policyDesc !== "<p><br></p>") &&
                policyNameUnderAccordion
                  ? false
                  : true
              }
              onClick={(prev) => handleSave()}
              className={global_style.primary_button + " " + styles.edit_button}
              id="save-button-policy"
            >
              {/* <a style={{ color: "white" }} href={data.file ? data.file : ""}> */}
              Save
              {/* </a> */}
            </Button>
          ) : (
            <Button
              onClick={(prev) => setEditModeOn(true)}
              className={
                global_style.outlined_button + " " + styles.edit_button
              }
              id="edit-button-policy"
            >
              {/* <a style={{ color: "white" }} href={data.file ? data.file : ""}> */}
              Edit
              {/* </a> */}
            </Button>
          )}
        </div>
      </div>
    );
  }
  const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: [
      "BLOCK_TYPE_DROPDOWN",
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      "LINK_BUTTONS",
      "HISTORY_BUTTONS",
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Font", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" },
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
    ],
  };

  const [companyPolicyValue, setEditorGovLawValue] = React.useState(
    RichTextEditor.createValueFromString(companyPolicyDescription, "html")
  );
  const [descriptionError, setdescriptionError] = useState("");
  const [enableButton, setEnableButton] = useState(false);

  const handlegovLawChange = (value) => {
    setEditorGovLawValue(value);
    setcompanyPolicyDescription(value.toString("html"));
    if (value.toString("html") !== "<p><br></p>") {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
    setdescriptionError("");
  };
  useEffect(() => {
    getListOfPolicies();
    goToTop(0);
  }, []);
  return (
    <div className={styles.main_box}>
      {!props.isPolicySettings ? (
        <div className={styles.main_label}>Company Policies</div>
      ) : (
        <Row className={styles.main_label}>
          <Col xs={12} sm={6} md={6} xl={6}>
            {props.isPolicySettings ? "Policy Settings" : "Company Policies"}
            <Typography
              className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
            >
              {props.isPolicySettings
                ? "Update your organization's data sharing policies."
                : ""}
            </Typography>
          </Col>
          <Col xs={12} sm={6} md={6} xl={6} style={{ textAlign: "right" }}>
            <Button
              id="addnew-policy-button"
              onClick={() => setIsFormVisible(true)}
              className={global_style.primary_button + " " + styles.next_button}
            >
              Add New Policy
            </Button>
          </Col>
        </Row>
      )}
      {props.isPolicySettings ? (
        ""
      ) : (
        <div className={styles.sub_label}>
          Enter your company policies, we will show to others! You can add text
          and file upload also
        </div>
      )}

      {!props.isPolicySettings ? (
        <>
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
                  onChange={(e) => {
                    setPolicyName(e.target.value.trimStart());
                    setPolicyNameError("");
                  }}
                  error={policyNameError ? true : false}
                  helperText={policyNameError}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} sm={12} style={{ margin: "20px 0px" }}>
                <RichTextEditor
                  placeholder="Description"
                  toolbarConfig={toolbarConfig}
                  value={companyPolicyValue}
                  onChange={handlegovLawChange}
                  required
                  className="rich_text_editor"
                  id="rich_text_editor"
                  name="bodyText"
                  type="string"
                  multiline
                  variant="filled"
                  style={{
                    textAlign: "left",
                    minHeight: 410,
                    border: "1px solid black",
                  }}
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {descriptionError}
                </span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
                <Divider>or</Divider>
              </Col>
            </Row>
            <Row>
              <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
                <FileUploaderMain
                  key={key}
                  isMultiple={false}
                  texts={
                    <span>
                      {"Drop files here or click "}
                      <a
                        href="#"
                        style={{
                          textDecoration: "underline",
                          color: "#00ab55",
                          display: "inline-block",
                        }}
                      >
                        {" browse "}
                      </a>
                      {" through your machine, File size not more than"}
                    </span>
                  }
                  fileTypes={["pdf", "doc"]}
                  handleChange={handleUploadPolicy}
                  maxSize={25}
                  setSizeError={() =>
                    setFileError("Maximum file size allowed is 25MB")
                  }
                  id="upload-policy-file"
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
                  style={{ marginBottom: "20px" }}
                >
                  {uploadedPolicy && "Uploaded file"}
                </div>
                {uploadedPolicy && (
                  <div className={styles.text_left + " " + styles.preview_box}>
                    {uploadedPolicy && (
                      <div className={styles.each_preview_policy}>
                        <div>
                          <img
                            id="document-logo"
                            height={"52px"}
                            width={"42px"}
                            className={styles.document_upload_logo}
                            src={document_upload}
                          />

                          <span
                            id="file-preview"
                            className={global_style.blue + " " + styles.link}
                            onClick={() => window.open(preview)}
                            style={{ width: "100%" }}
                          >
                            {uploadedPolicy.name + " "}{" "}
                          </span>
                          <span
                            id="filesize"
                            className={global_style.light_text}
                          >
                            {uploadedPolicy.size &&
                              (uploadedPolicy.size / 1000000).toFixed(2)}
                            MB
                          </span>
                        </div>
                        <CancelIcon
                          onClick={() => handleDeletePolicy()}
                          style={{ cursor: "pointer" }}
                          fontSize="small"
                          id="cancel-policy-file"
                        />
                      </div>
                    )}
                  </div>
                )}
                <div
                  className={
                    global_style.size14 +
                    " " +
                    global_style.error +
                    " " +
                    styles.text_left
                  }
                >
                  {fileError}
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.button_grp}>
            <Button
              id="add-policy-button"
              disabled={
                ((companyPolicyDescription && enableButton) ||
                  uploadedPolicy) &&
                policyName
                  ? false
                  : true
              }
              onClick={() => handleAddPolicy()}
              className={global_style.primary_button + " " + styles.next_button}
            >
              Add
            </Button>
          </div>
          <hr className={styles.guestDividerHr}></hr>
        </>
      ) : (
        <>
          {isFormVisible && (
            <>
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
                      onChange={(e) => {
                        setPolicyName(e.target.value.trimStart());
                        setPolicyNameError("");
                      }}
                      error={policyNameError ? true : false}
                      helperText={policyNameError}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} sm={12} style={{ margin: "20px 0px" }}>
                    <RichTextEditor
                      placeholder="Description"
                      toolbarConfig={toolbarConfig}
                      value={companyPolicyValue}
                      onChange={handlegovLawChange}
                      required
                      className="rich_text_editor"
                      id="rich_text_editor"
                      name="bodyText"
                      type="string"
                      multiline
                      variant="filled"
                      style={{
                        textAlign: "left",
                        minHeight: 410,
                        border: "1px solid black",
                      }}
                    />
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        textAlign: "left",
                      }}
                    >
                      {descriptionError}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
                    <Divider>or</Divider>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
                    <FileUploaderMain
                      key={key}
                      isMultiple={false}
                      texts={
                        <span>
                          {"Drop files here or click "}
                          <a
                            href="#"
                            style={{
                              textDecoration: "underline",
                              color: "#00ab55",
                              display: "inline-block",
                            }}
                          >
                            {" browse "}
                          </a>
                          {" through your machine, File size not more than"}
                        </span>
                      }
                      fileTypes={["pdf", "doc"]}
                      handleChange={handleUploadPolicy}
                      maxSize={25}
                      setSizeError={() =>
                        setFileError("Maximum file size allowed is 25MB")
                      }
                      id="upload-policy-file"
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
                      style={{ marginBottom: "20px" }}
                    >
                      {uploadedPolicy && "Uploaded file"}
                    </div>
                    {uploadedPolicy && (
                      <div
                        className={styles.text_left + " " + styles.preview_box}
                      >
                        {uploadedPolicy && (
                          <div className={styles.each_preview_policy}>
                            <div>
                              <img
                                id="uploadfile-logo"
                                height={"52px"}
                                width={"42px"}
                                className={styles.document_upload_logo}
                                src={document_upload}
                              />

                              <span
                                id="preview-file"
                                className={
                                  global_style.blue + " " + styles.link
                                }
                                onClick={() => window.open(preview)}
                              >
                                {uploadedPolicy.name + " "}{" "}
                              </span>
                              <span
                                id="filesize"
                                className={global_style.light_text}
                              >
                                {uploadedPolicy.size &&
                                  (uploadedPolicy.size / 1000000).toFixed(2)}
                                MB
                              </span>
                            </div>
                            <CancelIcon
                              onClick={() => handleDeletePolicy()}
                              style={{ cursor: "pointer" }}
                              fontSize="small"
                              id="cancel-policy-file"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    <div
                      className={
                        global_style.size14 +
                        " " +
                        global_style.error +
                        " " +
                        styles.text_left
                      }
                    >
                      {fileError}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={styles.button_grp}>
                <Button
                  id="add-policy-button"
                  disabled={
                    (uploadedPolicy ||
                      (companyPolicyDescription && enableButton)) &&
                    policyName
                      ? false
                      : true
                  }
                  onClick={() => handleAddPolicy()}
                  className={
                    global_style.primary_button + " " + styles.next_button
                  }
                >
                  {" "}
                  Add
                </Button>
              </div>
              <hr className={styles.guestDividerHr}></hr>
            </>
          )}
        </>
      )}
      {!props.isPolicySettings ? (
        <>
          {allPolicies.length > 0 && (
            <div className={styles.main_label}>Catalogs</div>
          )}{" "}
        </>
      ) : (
        ""
      )}
      <Row style={{ marginBottom: "20px" }}>
        <Col lg={12} sm={12}>
          {allPolicies.map((each_policy, index) => {
            // console.log(allPolicies, each_policy);
            return (
              <ControlledAccordions
                data={each_policy}
                index={index}
                heading={each_policy.name}
                Component={AccordionBody}
                accordionDelete={deletePolicyDetail}
                isHeadEditing={false}
                handleEditHeading={() => {}}
                onOpenHideDelete={true}
              />
            );
          })}
        </Col>
      </Row>
      {!props.isPolicySettings ? (
        <div className={styles.button_grp}>
          <Button
            onClick={() => setActiveStep((prev) => prev + 1)}
            className={global_style.secondary_button}
            id="policy-button-onboard-finishlater"
            style={{ paddingRight: "25px" }}
          >
            {" "}
            Finish later
          </Button>
          <Button
            disabled={allPolicies.length > 0 ? false : true}
            onClick={() => setActiveStep((prev) => prev + 1)}
            className={global_style.primary_button + " " + styles.next_button}
            id="policy-button-onboard-next"
          >
            {" "}
            Next
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CompanyPolicies;
