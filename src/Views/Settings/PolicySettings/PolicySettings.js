import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import THEME_COLORS from "../../../Constants/ColorConstants";
import RichTextEditor from "react-rte";
import { FileUploader } from "react-drag-drop-files";
import LinearProgress from "@mui/material/LinearProgress";
import UploadPolicyFile from "./UploadPolicyFile";
import CancelIcon from "@mui/icons-material/Cancel";
import UrlConstant from "../../../Constants/UrlConstants";
import axios from "axios";
import Button from "@mui/material/Button";
import HTTPService from "../../../Services/HTTPService";
import { Link } from 'react-router-dom';
import SESSION_CONSTANTS from '../../../Constants/OtherConstants';
import HandleSessionTimeout from '../../../Utils/Common';

export default function PolicySettings() {
import { Link } from "react-router-dom";

export default function PolicySettings(props) {
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
    tabmargin: { "margin-left": "17%" },
    // marginrowtop: {"margin-top": "5%", "margin-bottom": "20px"},
    marginheading: { "margin-top": "2.5%", "margin-bottom": "1%" },
    marginrow: { "margin-bottom": "5%" },
    // marginrowtop50px: { "margin-top": "50px" },
    // marginrowtop10px: { "margin-top": "10px" },
    headingtext: {
      "font-weight": "700",
      "font-size": "20px",
      "margin-left": "15px",
      "font-family:": "Open Sans",
      "margin-top": "10px",
      "margin-bottom": "10px",
    },
    uploadMessage: {
      "font-family:": "Open Sans",
      "font-style": "normal",
      "font-weight": "400",
    },
    progress: { display: "flex" },
    progressbar: { "margin-left": "18%", width: "275px", flex: "3" },
    progresscancel: { "margin-top": "-3%", flex: "1" },
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
  const fileTypes = ["doc", "pdf"];

  const [govLawDesc, setgovLawDesc] = useState("");
  const [govLawFile, setgovLawFile] = useState(null);

  const [warrantiesDesc, setWarrantiesDesc] = useState("");
  const [warrantiesFile, setwarrantiesfile] = useState(null);

  const [liabalityDesc, setLiabalityDesc] = useState("");
  const [liabalityFile, setliabalityfile] = useState(null);

  const [privacyDesc, setPrivacyDesc] = useState("");
  const [privacyFile, setprivacyfile] = useState(null);

  const [termDesc, setTermDesc] = useState("");
  const [termFile, settermfile] = useState(null);

  const [editorGovLawValue, setEditorGovLawValue] = React.useState(
    RichTextEditor.createValueFromString(govLawDesc, "html")
  );
  const [editorWarrantiesValue, seteditorWarrantiesValue] = React.useState(
    RichTextEditor.createValueFromString(warrantiesDesc, "html")
  );
  const [editorLiabalityValue, setEditorLiabalityValue] = React.useState(
    RichTextEditor.createValueFromString(liabalityDesc, "html")
  );
  const [editorPrivacyValue, setEditorPrivacyValue] = React.useState(
    RichTextEditor.createValueFromString(privacyDesc, "html")
  );
  const [editorTermValue, setEditorTermValue] = React.useState(
    RichTextEditor.createValueFromString(termDesc, "html")
  );
  const [govuploadProgress, setgovuploadProgress] = useState(0);
  const [warrantyloadProgress, setwarrantyloadProgress] = useState(0);
  const [liabiltyloadProgress, setliabiltyloadProgress] = useState(0);
  const [privacyProgress, setprivacyProgress] = useState(0);
  const [tosloadProgress, settosloadProgress] = useState(0);

  const [govLawFileUrl, setGovLawFileUrl] = useState("");
  const [warrantyFileUrl, setWarrantyFileUrl] = useState("");
  const [liabilityFileUrl, setLiabilityFileUrl] = useState("");
  const [privacyFileUrl, setPrivacyFileUrl] = useState("");
  const [termsFileUrl, setTermsFileUrl] = useState("");

  const [isPostMethod, setIsPostMethod] = useState(false);

  useEffect(() => {
    getPolicies();
  }, []);
  const getPolicies = () => {
    HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.policies_save_upload + "1/",
      "",
      false,
      false
    )
    const [govuploadProgress, setgovuploadProgress] = useState(0)
    const [warrantyloadProgress, setwarrantyloadProgress] = useState(0)
    const [liabiltyloadProgress, setliabiltyloadProgress] = useState(0)
    const [privacyProgress, setprivacyProgress] = useState(0)
    const [tosloadProgress, settosloadProgress] = useState(0)

    const [govLawFileUrl, setGovLawFileUrl] = useState("")
    const [warrantyFileUrl, setWarrantyFileUrl] = useState("")
    const [liabilityFileUrl, setLiabilityFileUrl] = useState("")
    const [privacyFileUrl, setPrivacyFileUrl] = useState("")
    const [termsFileUrl, setTermsFileUrl] = useState("")

    const [isPostMethod, setIsPostMethod] = useState(false)
    
    useEffect(() => {
      getPolicies()
    },[])
    const getPolicies = () => {
      HTTPService("GET",UrlConstant.base_url+UrlConstant.policies_save_upload+"1/", "", false, true)
      .then((response) => {
        console.log("response : ", response.data);
        if (
          response.data.Content == "null" &&
          response.data.Documents == "null"
        ) {
          setIsPostMethod(true);
          console.log("post");
        }

        setGovLawFileUrl(response.data.Documents.governing_law);
        setTermsFileUrl(response.data.Documents.tos);
        setPrivacyFileUrl(response.data.Documents.privacy_policy);
        setLiabilityFileUrl(response.data.Documents.limitations_of_liabilities);
        setWarrantyFileUrl(response.data.Documents.warranty);

        console.log("govLawFileUrl", govLawFileUrl);
        console.log(termsFileUrl);
        console.log("privacyFileUrl", privacyFileUrl);
        console.log("liabilityFileUrl", liabilityFileUrl);
        console.log("warrantyFileUrl", warrantyFileUrl);

        setgovLawDesc(response.data.Content.governing_law);
        setPrivacyDesc(response.data.Content.privacy_policy);
        setTermDesc(response.data.Content.tos);
        setLiabalityDesc(response.data.Content.limitations_of_liabilities);
        setWarrantiesDesc(response.data.Content.warranty);

        // console.log('govLawDesc',govLawDesc)
        // console.log('privacyDesc',privacyDesc)
        // console.log('termDesc',termDesc)
        // console.log('liabalityDesc',liabalityDesc)
        // console.log('warrantiesDesc',warrantiesDesc)

        setEditorGovLawValue(
          RichTextEditor.createValueFromString(
            response.data.Content.governing_law,
            "html"
          )
        );
        setEditorPrivacyValue(
          RichTextEditor.createValueFromString(
            response.data.Content.privacy_policy,
            "html"
          )
        );
        setEditorTermValue(
          RichTextEditor.createValueFromString(
            response.data.Content.tos,
            "html"
          )
        );
        setEditorLiabalityValue(
          RichTextEditor.createValueFromString(
            response.data.Content.limitations_of_liabilities,
            "html"
          )
        );
        seteditorWarrantiesValue(
          RichTextEditor.createValueFromString(
            response.data.Content.warranty,
            "html"
          )
        );
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response.status);
        if (e.response.status == SESSION_CONSTANTS.SESSION_TIMEOUT){
            HandleSessionTimeout();
        }
      });
  };

  const handlegovLawChange = (value) => {
    setEditorGovLawValue(value);
    setgovLawDesc(value.toString("html"));
    console.log(value.toString("html"));
  };

  const handleWarrantiesChange = (value) => {
    seteditorWarrantiesValue(value);
    setWarrantiesDesc(value.toString("html"));
    console.log(warrantiesDesc.toString());
  };

  const handleLiabalityChange = (value) => {
    setEditorLiabalityValue(value);
    setLiabalityDesc(value.toString("html"));
    console.log(value.toString("html"));
  };

  const handlePrivacyChange = (value) => {
    setEditorPrivacyValue(value);
    setPrivacyDesc(value.toString("html"));
    console.log(value.toString("html"));
  };

  const handleTermChange = (value) => {
    setEditorTermValue(value);
    setTermDesc(value.toString("html"));
    console.log(value.toString("html"));
  };

  const handlegovLawFileChange = async (file) => {
    setgovLawFile(file);
    setGovLawFileUrl("");
    console.log(file);

    const options = {
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded);
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setgovuploadProgress(percent);
      },
    };

    var bodyFormData = new FormData();
    bodyFormData.append("governing_law", file);

    console.log("branding data", bodyFormData);
    let url = UrlConstant.base_url + UrlConstant.policies_files_upload;

    if (file.size < 2097152) {
      await axios
        .post(url, bodyFormData, options, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("response");
          console.log("governing law details", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            // setEmail(false);
            // setError(false);
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          console.log(e);
          //   setError(true);
        });
    }
  };
  const handlegovupCancel = async (e) => {
    console.log("clicked on gov up cancel btn");
    let url = UrlConstant.base_url + UrlConstant.delete_policies_drop_document;

    await axios
      .delete(url, {
        headers: { "Content-Type": "application/json" },
        data: { id: "governing_law" },
      })
      .then((response) => {
        console.log("response");
        console.log("tos", response.data);
        //   console.log(response.json());
        console.log(response.status);
        if (response.status === 204) {
          console.log("gov law delete success");
          setgovLawFile(null);
          setgovuploadProgress(0);
          // setEmail(false);
          // setError(false);
        } else {
          // setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        //   setError(true);
      });
  };
  const handlewarrantiesFileChange = async (file) => {
    setwarrantiesfile(file);
    setWarrantyFileUrl("");
    console.log(file);

    const options = {
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded);
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setwarrantyloadProgress(percent);
      },
    };

    var bodyFormData = new FormData();
    bodyFormData.append("warranty", file);

    console.log("warranty", bodyFormData);
    let url = UrlConstant.base_url + UrlConstant.policies_files_upload;

    if (file.size < 2097152) {
      await axios
        .post(url, bodyFormData, options, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("response");
          console.log("warranty", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            // setEmail(false);
            // setError(false);
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          console.log(e);
          //   setError(true);
        });
    }
  };
  const handlewarrantyCancel = async (e) => {
    console.log("clicked on warranties cancel btn");
    let url = UrlConstant.base_url + UrlConstant.delete_policies_drop_document;

    await axios
      .delete(url, {
        headers: { "Content-Type": "application/json" },
        data: { id: "warranty" },
      })
      .then((response) => {
        console.log("response");
        console.log("tos", response.data);
        //   console.log(response.json());
        console.log(response.status);
        if (response.status === 204) {
          console.log("warranty delete success");
          // setEmail(false);
          setwarrantiesfile(null);
          setwarrantyloadProgress(0);
          // setError(false);
        } else {
          // setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        //   setError(true);
      });
  };
  const handleliabalityFileChange = async (file) => {
    setliabalityfile(file);
    setLiabilityFileUrl("");
    console.log(file);

    const options = {
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded);
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setliabiltyloadProgress(percent);
      },
    };

    var bodyFormData = new FormData();
    bodyFormData.append("limitations_of_liabilities", file);

    console.log("limitations_of_liabilities", bodyFormData);
    let url = UrlConstant.base_url + UrlConstant.policies_files_upload;

    if (file.size < 2097152) {
      await axios
        .post(url, bodyFormData, options, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("response");
          console.log("limitations_of_liabilities", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            // setEmail(false);
            // setError(false);
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          console.log(e);
          //   setError(true);
        });
    }
  };

  const handleliabiltyCancel = async (e) => {
    console.log("clicked on liability cancel btn");
    let url = UrlConstant.base_url + UrlConstant.delete_policies_drop_document;

    await axios
      .delete(url, {
        headers: { "Content-Type": "application/json" },
        data: { id: "limitations_of_liabilities" },
      })
      .then((response) => {
        console.log("response");
        console.log("tos", response.data);
        //   console.log(response.json());
        console.log(response.status);
        if (response.status === 204) {
          console.log("warranty delete success");
          // setEmail(false);
          setliabalityfile(null);
          setliabiltyloadProgress(0);
          // setError(false);
        } else {
          // setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        //   setError(true);
      });
  };

  const handleprivacyFileChange = async (file) => {
    setprivacyfile(file);
    setPrivacyFileUrl("");
    console.log(file);

    const options = {
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded);
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setprivacyProgress(percent);
      },
    };

    var bodyFormData = new FormData();
    bodyFormData.append("privacy_policy", file);

    console.log("privacy_policy", bodyFormData);
    let url = UrlConstant.base_url + UrlConstant.policies_files_upload;

    if (file.size < 2097152) {
      await axios
        .post(url, bodyFormData, options, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("response");
          console.log("privacy_policy", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            // setEmail(false);
            // setError(false);
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          console.log(e);
          //   setError(true);
        });
    }
  };
  const handleprivacyCancel = async (e) => {
    console.log("clicked on privacy cancel btn");
    let url = UrlConstant.base_url + UrlConstant.delete_policies_drop_document;

    await axios
      .delete(url, {
        headers: { "Content-Type": "application/json" },
        data: { id: "privacy_policy" },
      })
      .then((response) => {
        console.log("response");
        console.log("tos", response.data);
        //   console.log(response.json());
        console.log(response.status);
        if (response.status === 204) {
          console.log("warranty delete success");
          // setEmail(false);
          setprivacyfile(null);
          setprivacyProgress(0);
          // setError(false);
        } else {
          // setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        //   setError(true);
      });
  };
  const handletermFileChange = async (file) => {
    settermfile(file);
    setTermsFileUrl("");
    console.log(file);

    const options = {
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded);
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        settosloadProgress(percent);
      },
    };

    var bodyFormData = new FormData();
    bodyFormData.append("tos", file);

    console.log("tos", bodyFormData);
    let url = UrlConstant.base_url + UrlConstant.policies_files_upload;

    if (file.size < 2097152) {
      await axios
        .post(url, bodyFormData, options, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("response");
          console.log("tos", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            // setEmail(false);
            // setError(false);
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          console.log(e);
          //   setError(true);
        });
    }
  };
  const handletosCancel = async (e) => {
    console.log("clicked on tos cancel btn");
    let url = UrlConstant.base_url + UrlConstant.delete_policies_drop_document;

    await axios
      .delete(url, {
        headers: { "Content-Type": "application/json" },
        data: { id: "tos" },
      })
      .then((response) => {
        console.log("response");
        console.log("tos", response.data);
        //   console.log(response.json());
        console.log(response.status);
        if (response.status === 204) {
          console.log("warranty delete success");
          // setEmail(false);
          settermfile(null);
          settosloadProgress(0);
          // setError(false);
        } else {
          // setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        //   setError(true);
      });
  };
  const handlePoliciesSubmit = async (e) => {
    e.preventDefault();
    let url = UrlConstant.base_url + UrlConstant.policies_save_upload;
    var bodyFormData = new FormData();
    bodyFormData.append("privacy_policy", privacyDesc);
    bodyFormData.append("tos", termDesc);
    bodyFormData.append("governing_law", govLawDesc);
    bodyFormData.append("limitations_of_liabilities", liabalityDesc);
    bodyFormData.append("warranty", warrantiesDesc);
    // console.log(setprivacydesc);
    if (isPostMethod) {
      await axios
        .post(url, bodyFormData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("response");
          console.log("tos", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            console.log("submitted form");
            props.setisPolicyUpdateSuccess();
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          console.log(e);
          //   setError(true);
        });
      setIsPostMethod(false);
    } else {
      await axios
        .put(url + "1/", bodyFormData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("response");
          console.log("tos", response.data);
          //   console.log(response.json());
          console.log(response.status);
          if (response.status === 201) {
            console.log("submitted form");
            props.setisPolicyUpdateSuccess();
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          console.log(e);
          //   setError(true);
        });
    }
  };

  const policysettingcancelbtn = () => {
    getPolicies();
    window.location.reload();
  };

  return (
    <div style={useStyles.tabmargin}>
      <form noValidate autoComplete="off" onSubmit={handlePoliciesSubmit}>
        <Row style={useStyles.marginheading}>
          <span style={useStyles.headingtext}>Upload Content</span>
        </Row>
        <Row style={useStyles.marginrow}>
          <Col xs="12" sm="6" md="6" lg="6">
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
          <Col xs="12" sm="6" md="6" lg="6">
            <FileUploader
              handleChange={handlegovLawFileChange}
              name="file"
              types={fileTypes}
              children={
                <UploadPolicyFile
                  uploaddes="Supports: .doc, .pdf 2MB file size"
                  uploadtitle="Upload Governing Laws (Optional)"
                />
              }
            />
            {/* <p className="filename"> */}
            <p style={useStyles.uploadMessage}>
              {govLawFile ? (
                govLawFile.size ? (
                  `File name: ${govLawFile.name}`
                ) : (
                  ""
                )
              ) : govLawFileUrl ? (
                <Link
                  to={{ pathname: UrlConstant.base_url + govLawFileUrl }}
                  target="_blank">
                  Governing Laws
                </Link>
              ) : (
                "No file uploaded yet"
              )}
            </p>
            {/* <p className="oversizemb"> */}
            <p>
              {govLawFile != null && govLawFile.size > 2097152
                ? "File uploaded is more than 2MB!"
                : ""}
            </p>
            {/* <div className="govlawprogress"> */}
            <div style={useStyles.progress}>
              <div style={useStyles.progressbar}>
                <LinearProgress
                  variant="determinate"
                  value={govuploadProgress}
                  color="success"
                />
                <p className="govupper">{govuploadProgress}%</p>
                {/* <p>{govuploadProgress}%</p> */}
              </div>
              {/* <p className="govupclose"> */}
              <div style={useStyles.progresscancel}>
                <p>
                  {govLawFile && <CancelIcon onClick={handlegovupCancel} />}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={useStyles.marginrow}>
          <Col xs="12" sm="6" md="6" lg="6">
            <div className="invite-participant-text-editor policyrte">
              <RichTextEditor
                toolbarConfig={toolbarConfig}
                value={editorWarrantiesValue}
                onChange={handleWarrantiesChange}
                required
                id="body-text"
                name="bodyText"
                type="string"
                multiline
                variant="filled"
                style={{
                  minHeight: 450,
                  width: 420,
                  border: "1px solid black",
                  zIndex: 4,
                }}
              />
            </div>
          </Col>
          <Col xs="12" sm="6" md="6" lg="6">
            <FileUploader
              handleChange={handlewarrantiesFileChange}
              name="file"
              types={fileTypes}
              children={
                <UploadPolicyFile
                  uploaddes="Supports: .doc, .pdf 2MB file size"
                  uploadtitle="Upload Warranties (Optional) "
                />
              }
              // maxSize={2}
            />
            {/* <p className="filename"> */}
            <p style={useStyles.uploadMessage}>
              {warrantiesFile ? (
                warrantiesFile.size ? (
                  `File name: ${warrantiesFile.name}`
                ) : (
                  ""
                )
              ) : warrantyFileUrl ? (
                <a href={UrlConstant.base_url + warrantyFileUrl}>Warranties</a>
              ) : (
                "No file uploaded yet"
              )}
            </p>
            {/* <p className="oversizemb"> */}
            <p>
              {warrantiesFile != null && warrantiesFile.size > 2097152
                ? "File uploaded is more than 2MB!"
                : ""}
            </p>
            {/* <div className="warrantyprogress"> */}
            <div style={useStyles.progress}>
              <div style={useStyles.progressbar}>
                <LinearProgress
                  variant="determinate"
                  value={warrantyloadProgress}
                  color="success"
                />
                {/* <p className="warrantyper">{warrantyloadProgress}%</p> */}
                <p>{warrantyloadProgress}%</p>
              </div>
              <div style={useStyles.progresscancel}>
                {/* <p className="warrantyclose"> */}
                <p>
                  {warrantiesFile && (
                    <CancelIcon onClick={handlewarrantyCancel} />
                  )}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={useStyles.marginrow}>
          <Col xs="12" sm="6" md="6" lg="6">
            <div className="invite-participant-text-editor policyrte">
              <RichTextEditor
                toolbarConfig={toolbarConfig}
                value={editorLiabalityValue}
                onChange={handleLiabalityChange}
                required
                id="body-text"
                name="bodyText"
                type="string"
                multiline
                variant="filled"
                style={{
                  minHeight: 410,
                  width: 420,
                  border: "1px solid black",
                  zIndex: 4,
                }}
              />
            </div>
          </Col>
          <Col xs="12" sm="6" md="6" lg="6">
            <FileUploader
              handleChange={handleliabalityFileChange}
              name="file"
              types={fileTypes}
              children={
                <UploadPolicyFile
                  uploaddes="Supports: .doc, .pdf 2MB file size"
                  uploadtitle="Upload Limitation of Liabilities (Optional) "
                />
              }
              // maxSize={2}
            />
            {/* <p className="filename"> */}
            <p style={useStyles.uploadMessage}>
              {liabalityFile ? (
                liabalityFile.size ? (
                  `File name: ${liabalityFile.name}`
                ) : (
                  ""
                )
              ) : liabilityFileUrl ? (
                <a
                  href={UrlConstant.base_url + liabilityFileUrl}
                  target="_blank">
                  Limitation Of Liabilities
                </a>
              ) : (
                "No file uploaded yet"
              )}
            </p>
            {/* <p className="oversizemb"> */}
            <p>
              {liabalityFile != null && liabalityFile.size > 2097152
                ? "File uploaded is more than 2MB!"
                : ""}
            </p>
            {/* <div className="liabiltyprogress"> */}
            <div style={useStyles.progress}>
              <div style={useStyles.progressbar}>
                <LinearProgress
                  variant="determinate"
                  value={liabiltyloadProgress}
                  color="success"
                />
                <p className="liabiltyper">{liabiltyloadProgress}%</p>
              </div>
              <div style={useStyles.progresscancel}>
                {/* <p className="liabiltyclose"> */}
                <p>
                  {liabalityFile && (
                    <CancelIcon onClick={handleliabiltyCancel} />
                  )}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={useStyles.marginrow}>
          <Col xs="12" sm="6" md="6" lg="6">
            <div className="invite-participant-text-editor policyrte">
              <RichTextEditor
                toolbarConfig={toolbarConfig}
                value={editorPrivacyValue}
                onChange={handlePrivacyChange}
                required
                id="body-text"
                name="bodyText"
                type="string"
                multiline
                variant="filled"
                style={{
                  minHeight: 410,
                  width: 420,
                  border: "1px solid black",
                  zIndex: 4,
                }}
              />
            </div>
          </Col>
          <Col xs="12" sm="6" md="6" lg="6">
            <FileUploader
              handleChange={handleprivacyFileChange}
              name="file"
              types={fileTypes}
              children={
                <UploadPolicyFile
                  uploaddes="Supports: .doc, .pdf 2MB file size"
                  uploadtitle="Upload Privacy Policy (Optional) "
                />
              }
              // maxSize={2}
            />
            {/* <p className="filename"> */}
            <p style={useStyles.uploadMessage}>
              {privacyFile ? (
                privacyFile.size ? (
                  `File name: ${privacyFile.name}`
                ) : (
                  ""
                )
              ) : privacyFileUrl ? (
                <a href={UrlConstant.base_url + privacyFileUrl} target="_blank">
                  Privacy Policy
                </a>
              ) : (
                "No file uploaded yet"
              )}
            </p>
            {/* <p className="oversizemb"> */}
            <p>
              {privacyFile != null && privacyFile.size > 2097152
                ? "File uploaded is more than 2MB!"
                : ""}
            </p>
            <div style={useStyles.progress}>
              {/* <div className="privacyprogress"> */}
              <div style={useStyles.progressbar}>
                <LinearProgress
                  variant="determinate"
                  value={privacyProgress}
                  color="success"
                />
                <p className="privacyper">{privacyProgress}%</p>
              </div>
              <div style={useStyles.progresscancel}>
                {/* <p className="privacyclose"> */}
                <p>
                  {privacyFile && <CancelIcon onClick={handleprivacyCancel} />}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={useStyles.marginrow}>
          <Col xs="12" sm="6" md="6" lg="6">
            <div className="invite-participant-text-editor policyrte">
              <RichTextEditor
                toolbarConfig={toolbarConfig}
                value={editorTermValue}
                onChange={handleTermChange}
                required
                id="body-text"
                name="bodyText"
                type="string"
                multiline
                variant="filled"
                style={{
                  minHeight: 410,
                  width: 420,
                  border: "1px solid black",
                  zIndex: 4,
                }}
              />
            </div>
          </Col>
          <Col xs="12" sm="6" md="6" lg="6">
            <FileUploader
              handleChange={handletermFileChange}
              name="file"
              types={fileTypes}
              children={
                <UploadPolicyFile
                  uploaddes="Supports: .doc, .pdf 2MB file size"
                  uploadtitle="Upload Terms of Use (Optional)"
                />
              }
              // maxSize={2}
            />
            {/* <p className="filename"> */}
            <p style={useStyles.uploadMessage}>
              {termFile ? (
                termFile.size ? (
                  `File name: ${termFile.name}`
                ) : (
                  ""
                )
              ) : termsFileUrl ? (
                <a href={UrlConstant.base_url + termsFileUrl} target="_blank">
                  Terms Of Use
                </a>
              ) : (
                "No file uploaded yet"
              )}
            </p>
            {/* <p className="oversizemb"> */}
            <p>
              {termFile != null && termFile.size > 2097152
                ? "File uploaded is more than 2MB!"
                : ""}
            </p>
            <div style={useStyles.progress}>
              {/* <div className="tosprogress"> */}
              <div style={useStyles.progressbar}>
                <LinearProgress
                  variant="determinate"
                  value={tosloadProgress}
                  color="success"
                />
                <p className="tosper">{tosloadProgress}%</p>
              </div>
              <div style={useStyles.progresscancel}>
                {/* <p className="tosclose"> */}
                <p>{termFile && <CancelIcon onClick={handletosCancel} />}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={useStyles.marginrow}>
          <Col xs="12" sm="12" md="12" lg="12">
            {editorGovLawValue.getEditorState().getCurrentContent().hasText() &&
            (govLawFile || govLawFileUrl) &&
            editorWarrantiesValue
              .getEditorState()
              .getCurrentContent()
              .hasText() &&
            (warrantiesFile || warrantyFileUrl) &&
            editorLiabalityValue
              .getEditorState()
              .getCurrentContent()
              .hasText() &&
            (liabalityFile || liabilityFileUrl) &&
            editorPrivacyValue.getEditorState().getCurrentContent().hasText() &&
            (privacyFile || privacyFileUrl) &&
            editorTermValue.getEditorState().getCurrentContent().hasText() &&
            (termFile || termsFileUrl) ? (
              <Button
                variant="contained"
                className="accountnextbtn"
                type="submit">
                <span className="signupbtnname">Submit</span>
              </Button>
            ) : (
              <Button
                variant="outlined"
                disabled
                className="disableaccountnextbtn">
                Submit
              </Button>
            )}
          </Col>
        </Row>
        <Row style={useStyles.marginrow}>
          <Col xs="12" sm="12" md="12" lg="12">
            <Button
              variant="outlined"
              className="accountsettingcancelbtn"
              type="button"
              onClick={policysettingcancelbtn}>
              Cancel
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}
