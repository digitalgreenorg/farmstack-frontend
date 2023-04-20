import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { downloadDocument, getTokenLocal, download } from "../../Utils/Common";
import File from "./TabComponents/File";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { getUserMapId } from "../../Utils/Common";

const FileWithAction = ({
  index,
  name,
  id,
  fileType,
  usagePolicy,
  isOther,
}) => {
  const { callLoader, callToast } = useContext(FarmStackContext);
  const handleDownload = () => {
    let accessToken = getTokenLocal() ?? false;
    let url = UrlConstant.base_url + UrlConstant.download_file + id;
    callLoader(true);
    HTTPService("GET", url, "", false, true, accessToken)
      .then((res) => {
        callLoader(false);
        download(res?.data, name);
        callToast("File downloaded successfully!", "success", true);
      })
      .catch((err) => {
        callLoader(false);
        callToast(
          "Something went wrong while downloading the file.",
          "error",
          true
        );
      });
  };
  const askToDownload = () => {
    let accessToken = getTokenLocal() ?? false;
    let url = UrlConstant.base_url + UrlConstant.ask_for_permission;
    let body = {
      dataset_file: id,
      user_organization_map: getUserMapId(),
    };
    callLoader(true);
    HTTPService("POST", url, body, false, true, accessToken)
      .then((res) => {
        callLoader(false);
        callToast(
          "Successfully, sent the request for downloading the file",
          "success",
          true
        );
      })
      .catch((err) => {
        callLoader(false);
        callToast(
          "Something went wrong while asking for the permission.",
          "error",
          true
        );
      });
  };

  const handleButtonClick = () => {
    if (fileType === "public" || fileType === "registered" || !isOther) {
      handleDownload();
    }
    if (isOther && fileType === "private") {
      if (!usagePolicy?.length) {
        askToDownload();
      } else {
        let filteredItem = usagePolicy.filter(
          (item) => item.user_organization_map === getUserMapId()
        );
        if (filteredItem?.[0]?.approval_status === "requested") {
          // do nothing
        } else if (filteredItem?.[0]?.approval_status === "approved") {
          handleDownload();
        } else if (filteredItem?.[0]?.approval_status === "rejected") {
          // do nothing
        }
      }
    }
  };
  const getName = () => {
    let filteredItem = usagePolicy.filter(
      (item) => item.user_organization_map === getUserMapId()
    );
    console.log(filteredItem);
    if (filteredItem?.[0]?.approval_status === "requested") {
      return "Requested";
    } else if (filteredItem?.[0]?.approval_status === "approved") {
      return "Download";
    } else if (filteredItem?.[0]?.approval_status === "rejected") {
      return "Rejected";
    }
  };
  return (
    <Box className="d-flex">
      <File
        index={index}
        name={name}
        size={657489}
        showDeleteIcon={false}
        type={"file_upload"}
        isTables={true}
      />
      <div className="type_dataset">{fileType}</div>

      <Box>
        <Button
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "15px",
            width: "220px",
            height: "48px",
            border: "1px solid rgba(0, 171, 85, 0.48)",
            borderRadius: "8px",
            color: "#00AB55",
            textTransform: "none",
            marginLeft: "100px",
            "&:hover": {
              background: "none",
              border: "1px solid rgba(0, 171, 85, 0.48)",
            },
          }}
          variant="outlined"
          onClick={() => handleButtonClick()}
        >
          {fileType === "public" || fileType === "registered" || !isOther
            ? "Download"
            : isOther && !usagePolicy?.length
            ? "Ask to Download"
            : getName()}
        </Button>
      </Box>
    </Box>
  );
};

export default FileWithAction;
