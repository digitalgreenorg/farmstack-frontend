import React from "react";
import { Row, Col } from "react-bootstrap";
import { Button, Box, TextField, Avatar, Divider } from "@mui/material";
import LocalStyle from "./Support.module.css";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@mui/material";
import UrlConstant from "../../Constants/UrlConstants";
import EditIcon from "@mui/icons-material/Edit";
import { getUserMapId } from "../../Utils/Common";
import SendIcon from '@mui/icons-material/Send';
import { FileUploader } from "react-drag-drop-files";
import File from "../../Components/Datasets_New/TabComponents/File";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import { downloadAttachment } from "../../Utils/Common";

export default function SupportResolution({
  resolutionfield,
  setResolution,
  handleSubmitResolution,
  handleClearResolutionField,
  resolutionError,
  resolutionMessage,
  handleMouseEnter,
  handleMouseLeave,
  hoveredIndex,
  editResolutionMessage,
  setEditResolutionMessage,
  handleUpdateResolutionMessage,
  handleUpgradeResolutionMessage,
  uploadFile,
  setUploadFile,
  hoveredMessage,
  setHoveredMessage,
  logoPath,
  resolutionFileError,
  setResolutionFileError,
  userLoggedIn,
  updateResErrorMessage,
}) {
  const fileTypes = ["pdf", "doc", "jpeg", "png", "docx" ];
  console.log("get id", getUserMapId());

  const handleFileChange = (file) => {
    setUploadFile(file);
    setResolutionFileError("")
    console.log(file);
  };
  const handleCancelFile = () => {
    setUploadFile(null);
  };
  return (
    <>
      <Box className={LocalStyle.resolutionBox}>
        {resolutionMessage?.map((item, index) => (
          <>
            <Row
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={4}
                style={{ maxWidth: "50px", margin: "15px",}}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={
                    UrlConstant.base_url_without_slash +
                    item?.user_map?.organization?.logo
                  }
                  sx={{ width: 44, height: 44 }}
                />
              </Col>
              <Col xs={12} sm={6} md={4} lg={4}>
                {editResolutionMessage[index] ? (
                  <TextField
                    value={item.resolution_text}
                    required
                    onChange={(e) =>
                      handleUpdateResolutionMessage(
                        index,
                        e.target.value.trimStart(),
                        e
                      )
                    }
                    sx={{
                      "&.MuiTextField-root": {
                        textAlign: "left",
                        maxWidth: "700px",
                        marginBottom: "30px",
                      },
                    }}
                    minRows={2}
                    inputProps={{ maxLength: 250 }}
                    className="datapoint-name-input-box"
                    label="Resolution message"
                    variant="outlined"
                    style={{ marginTop: "20px" }}
                    error={updateResErrorMessage ? true : false}
                    helperText={updateResErrorMessage ? updateResErrorMessage : ""}
                  />
                ) : (
                  <div
                    //className={LocalStyle.resMessageStyle}
                    style={{ marginTop: "30px", maxWidth: "700px", wordBreak: "break-all"  }}
                  >
                    {item.resolution_text}
                  </div>
                )}
              </Col>
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={4}
                className={LocalStyle.iconStyleResolution}
              >
                {editResolutionMessage[index] ? (
                  <IconButton
                    onClick={(e) => handleUpgradeResolutionMessage(e, index)}
                  >
                    <SendIcon />
                  </IconButton>
                ) : (
                  hoveredIndex === resolutionMessage.length - 1 && (item?.user_map?.id == getUserMapId()) &&
                  hoveredIndex === index && (
                    <IconButton
                      size="small"
                      aria-label="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        let tmp = [...editResolutionMessage];
                        tmp[index] = true;
                        console.log("edit title", tmp, editResolutionMessage);
                        setEditResolutionMessage(tmp);
                      }}
                      onMouseEnter={() => {
                        setHoveredMessage("Click to edit the last message");
                      }}
                      onMouseLeave={() => {
                        setHoveredMessage("");
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  )
                )}
              </Col>
            </Row>
            {item.solution_attachments ? (
              <>
                <Row
                  className="fontweight600andfontsize14pxandcolor3D4A52 supportcardsecondcolumn"
                  style={{
                    marginLeft: "900px",
                    cursor: "pointer",
                    color: "#00AB55",
                    marginBottom: "10px",
                  }}
                  onClick={() =>
                    downloadAttachment(
                      `${UrlConstant.base_url_without_slash}${item.solution_attachments}`,
                      ""
                    )
                  }
                >
                  <FileDownloadSharpIcon style={{ marginRight: "20px" }} />
                  <Row>{"Download Attachment"}</Row>
                </Row>
              </>
            ) : (
              ""
            )}
            <Divider />
          </>
        ))}
        <Row>
          <Col
            xs={12}
            sm={12}
            md={6}
            xl={6}
            style={{ maxWidth: "50px", margin: "15px" }}
          >
            <Avatar
              alt="Remy Sharp"
              src={UrlConstant.base_url_without_slash + userLoggedIn}
              sx={{ width: 44, height: 44 }}
            />
          </Col>
          <Col xs={12} sm={12} md={6} xl={6}>
            <TextField
              id="query-field_description"
              label="Reply"
              multiline
              required
              inputProps={{ maxLength: 256 }}
              fullWidth
              variant="outlined"
              minRows={4}
              placeholder="Reply"
              className={LocalStyle.textFieldSupportResolution}
              value={resolutionfield}
              onChange={(e) => setResolution(e.target.value.trimStart())}
              error={resolutionError ? true : false}
              helperText={resolutionError ? resolutionError : ""}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6} xl={6}>
            {uploadFile ? (
              <div className="list_files mt-20" style={{ marginLeft: "70px" }}>
                <>
                  <File
                    name={uploadFile.name}
                    size={uploadFile.size}
                    handleDelete={handleCancelFile}
                    type={"file_upload"}
                    showDeleteIcon={true}
                  />
                </>
              </div>
            ) : (
              <div
                className="oversizemb-uploadimglogo"
                style={{ marginLeft: "70px" }}
              >
                {resolutionFileError}
              </div>
            )}
          </Col>
          <Col xs={12} sm={6} md={6} xl={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "left",
                marginLeft: "300px",
                marginBottom: "20px",
                marginRight: "100px",
                marginTop: "20px",
              }}
            >
              <FileUploader
                handleChange={handleFileChange}
                name="file"
                types={fileTypes}
                children={
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>
                }
                classes="fileUpload"
                maxSize={2}
                onSizeError={() =>
                  setResolutionFileError("Maximum file size allowed is 2MB")
                }
              />

              <Button
                disabled={resolutionfield ? false : true}
                variant="contained"
                className={`${GlobalStyle.primary_buttonSupport} ${LocalStyle.ButtonStylesResolution} `}
                onClick={(e) => handleSubmitResolution(e)}
              >
                Send
              </Button>
            </div>
          </Col>
        </Row>
      </Box>
    </>
  );
}
