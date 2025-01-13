import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import styles from './S3Form.module.css'; // Assuming you still want to use custom CSS

const GoogleDriveForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    credentials: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit('google_drive', formData); // Send the form data to the parent
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Box 
      
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        // width: 300,
        padding: 5,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}>
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
Google Drive details
      </Typography>
        <TextField
          label="Google Drive Credentials (JSON format)"
          name="credentials"
          value={formData.credentials}
          onChange={handleChange}
          required
          multiline
          rows={6}
          variant="outlined"
          fullWidth
          className={styles.textarea} // Apply custom styles if needed
        size='small'

        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.button} // Apply custom styles if needed
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

export default GoogleDriveForm;
