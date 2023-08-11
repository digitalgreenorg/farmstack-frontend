import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import styles from "./FarmerDemography.module.css"; // Import your module CSS file

const FarmerDemographics = (props) => {
  const { records, female, male, counties, subCounties, constituencies } =
    props;

  return (
    <>
      <Typography
        className={styles.title}
        variant="h4"
        sx={{ textAlign: "left" }}
      >
        Farmer Demographics
      </Typography>
      <Box className={styles.container}>
        <Paper
          elevation={3}
          className={`${styles.totalRecords} ${styles.demographyCard}`}
        >
          <Typography variant="h6">Total no.of records</Typography>
          <Typography variant="body1" className={`${styles.valueClass}`}>
            {records}
          </Typography>
        </Paper>
        <Paper
          elevation={3}
          className={`${styles.female} ${styles.demographyCard}`}
        >
          <Typography variant="h6">Female</Typography>
          <Typography variant="body1" className={`${styles.valueClass} `}>
            {female}
          </Typography>
        </Paper>
        <Paper
          elevation={3}
          className={`${styles.male} ${styles.demographyCard}`}
        >
          <Typography variant="h6">Male</Typography>
          <Typography variant="body1" className={`${styles.valueClass}`}>
            {male}
          </Typography>
        </Paper>
        <Paper
          elevation={3}
          className={`${styles.counties} ${styles.demographyCard}`}
        >
          <Typography variant="h6">No.of counties</Typography>
          <Typography variant="body1" className={`${styles.valueClass}`}>
            {counties}
          </Typography>
        </Paper>
        <Paper
          elevation={3}
          className={`${styles.subCounties} ${styles.demographyCard}`}
        >
          <Typography variant="h6">Sub-counties</Typography>
          <Typography variant="body1" className={`${styles.valueClass}`}>
            {subCounties}
          </Typography>
        </Paper>
        <Paper
          elevation={3}
          className={`${styles.counties} ${styles.demographyCard}`}
        >
          <Typography variant="h6">Constituencies</Typography>
          <Typography variant="body1" className={`${styles.valueClass}`}>
            {constituencies}
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default FarmerDemographics;
