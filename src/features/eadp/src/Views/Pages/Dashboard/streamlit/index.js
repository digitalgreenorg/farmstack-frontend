import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const StreamlitFrame = () => {
  const { name } = useParams(); // Assuming 'name' is used to specify different Streamlit apps.

  return (
    <>
      <CssBaseline />{" "}
      {/* Ensures that material-UI components consume the full viewport height */}
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          marginTop: "-23px",
        }}
      >
        {" "}
        {/* Ensures the Box takes full width and height */}
        <iframe
          src={`http://localhost:8501`} // Dynamically setting src based on route param
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
