import file from '../../Assets/Img/file.svg';
import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { FarmStackContext } from "common/components/context/DefaultContext/FarmStackProvider";
import { useContext } from "react";

const FileWithDownload = ({ id, name, url }) => {
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [downloadError, setDownloadError] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      let tempurl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = tempurl;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
      // Handle error here
    }
  };

  return (
    <Box>
      <Card
        className="d-flex flex-column justify-content-center align-items-center"
        sx={{ width: "200px", padding: "15px", cursor: "pointer" }}
        onClick={handleDownload}
      >
        <img style={{}}
           src={file} 
          alt="file_image"
        />
        <Typography
          sx={{
            marginTop: "7px",
            whiteSpace: "nowrap",
            width: "120px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <DownloadForOfflineIcon sx={{ marginTop: "7px" }} />
        {downloadError && (
          <Typography sx={{ color: "red" }}>
            Error downloading the file
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default FileWithDownload;
