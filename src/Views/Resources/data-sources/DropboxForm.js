import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Axios from "axios";
import { getTokenLocal } from "../../../Utils/Common";
import styles from "./S3Form.module.css"; // Assuming you still want to use your custom CSS classes

const DropboxForm = ({ onFetchComplete, setShowCloudModal }) => {
  const [formData, setFormData] = useState({
    access_token: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = "POST";
    const accesstoken = getTokenLocal();
    const url =
      "https://dev.platform.farmer.chat/be/datahub/files/fetch_files/";

    // Prepare the JSON payload
    const payload = {
      source_type: "dropbox",
      details: formData, // Ensure formData is a JSON-compatible object
    };

    Axios({
      method: method,
      url: url,
      data: payload, // Send the JSON payload directly
      withCredentials: true,
      headers: {
        "Content-Type": "application/json", // Correct Content-Type for JSON
        Authorization: "Bearer " + accesstoken,
      },
    })
      .then((response) => {
        const files = response.data.files; // Assuming the API returns a list of files
        onFetchComplete(files); // Callback to parent
        setShowCloudModal(true); // Update the files in the parent component
      })
      .catch((error) => {
        console.error("Error fetching dropbox files:", error); // Log the error for debugging
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          // width: 300,
          padding: 5,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Montserrat !important",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#212B36",
            textAlign: "left",
          }}
        >
          Dropbox details
        </Typography>
        <TextField
          label="Dropbox Access Token"
          name="access_token"
          value={formData.access_token}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
          className={styles.input} // Apply your custom styles if needed
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.button} // Apply your custom styles if needed
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "14px",
            width: "fit-content",
            height: "40px",
            background: "#00A94F",
            borderRadius: "8px",
            textTransform: "none",
            // marginLeft: "25px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#008b3d",
              boxShadow: "0px 4px 15px rgba(0, 171, 85, 0.4)",
              color: "#ffffff",
            },
            "&:disabled": {
              backgroundColor: "#d0d0d0",
              color: "#ffffff",
            },
          }}
        >
          Fetch
        </Button>
      </Box>
    </form>
  );
};

export default DropboxForm;
