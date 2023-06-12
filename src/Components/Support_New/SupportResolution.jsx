import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  Button,
  Box,
  TextField,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import LocalStyle from "./Support.module.css";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import { InputAdornment } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@mui/material";
import UrlConstant from "../../Constants/UrlConstants";
import EditIcon from "@mui/icons-material/Edit";
import { getUserMapId } from "../../Utils/Common";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { FileUploader } from "react-drag-drop-files";
import File from "../../Components/Datasets_New/TabComponents/File";
import document_upload from "../../Assets/Img/Farmstack V2.0/document_upload.svg";
import CancelIcon from "@mui/icons-material/Cancel";

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
}) {
  const fileTypes = ["XLS", "xlsx", "CSV", "PDF"];
  console.log("get id", getUserMapId());

  const handleFileChange = (file) => {
    setUploadFile(file);
    console.log(file);
  };
  const handleCancelFile = () => {
    setUploadFile(null);
  };
  return (
    <>
      <Box className={LocalStyle.resolutionBox}>
        {resolutionMessage?.map((item, index) => (
          <Row
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={4}
              style={{ maxWidth: "50px", margin: "15px" }}
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
                      maxWidth: "600px",
                      marginBottom: "30px",
                    },
                  }}
                  inputProps={{ maxLength: 250 }}
                  className="datapoint-name-input-box"
                  label="Resolution message"
                  variant="outlined"
                  style={{ marginTop: "20px" }}
                />
              ) : (
                <span>{item.resolution_text}</span>
              )}
            </Col>
            <Col xs={12} sm={6} md={4} lg={4} className={LocalStyle.iconStyleResolution}>
              {editResolutionMessage[index] ? (
                <IconButton
                  onClick={(e) => handleUpgradeResolutionMessage(e, index)}
                >
                  <UpgradeIcon />
                </IconButton>
              ) : (
                hoveredIndex === resolutionMessage.length - 1 &&
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
            <Divider />
          </Row>
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
              src={UrlConstant.base_url_without_slash + logoPath}
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
              <div className="list_files mt-20" style={{ marginLeft: "50px" }}>
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
              ""
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
              />

              <Button
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
