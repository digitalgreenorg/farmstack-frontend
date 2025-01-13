import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import styles from './S3Form.module.css'; // Assuming you still want to use your custom CSS classes

const S3Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    aws_access_key_id: '',
    aws_secret_access_key: '',
    region: '',
    bucket_name: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit('s3', formData); // Send the form data to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Box sx={{
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
        S3 Bucket details
      </Typography>
        <TextField
          label="AWS Access Key ID"
          name="aws_access_key_id"
          value={formData.aws_access_key_id}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
          className={styles.input}
          size='small'
        />
        <TextField
          label="AWS Secret Access Key"
          name="aws_secret_access_key"
          value={formData.aws_secret_access_key}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
          className={styles.input}
        size='small'

        />
        <TextField
          label="Region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
          className={styles.input}
        size='small'

        />
        <TextField
          label="Bucket Name"
          name="bucket_name"
          value={formData.bucket_name}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
          className={styles.input}
        size='small'

        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.button}
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

export default S3Form;
