import { Box, CssBaseline } from "@mui/material";
import UrlConstant from "features/eadp/src/Constants/UrlConstants";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StreamlitFrame = () => {
  const { name } = useParams();
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch(`${UrlConstant.base_url}datahub/streamlit/${name}/`)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const iframeSrc = doc.querySelector("iframe").getAttribute("src");
        setUrl(iframeSrc);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          margin: 0,
          padding: 0,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <iframe
          src={url}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Box>
    </>
  );
};

export default StreamlitFrame;
