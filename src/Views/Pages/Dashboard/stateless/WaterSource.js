import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import styles from "./WaterSource.module.css"; // Import your module CSS file

const WaterSource = (props) => {
  const { boreWell, rainWater, irrigation } = props;

  return (
    <>
      <Typography
        className={styles.title}
        variant="h4"
        sx={{ textAlign: "left" }}
      >
        Water Sources
      </Typography>
      <div className={styles.container}>
        <Paper
          elevation={3}
          className={`${styles.counties} ${styles.demographyCard}`}
        >
          <Typography variant="h6">Bore well</Typography>
          <Typography variant="body1" className={`${styles.valueClass}`}>
            {boreWell}
          </Typography>
        </Paper>
        <Divider orientation="vertical" />

        <Paper
          elevation={3}
          className={`${styles.female} ${styles.demographyCard}`}
        >
          <Typography variant="h6">Irrigation</Typography>
          <Typography variant="body1" className={`${styles.valueClass} `}>
            {irrigation}
          </Typography>
        </Paper>
        <Divider orientation="vertical" />

        <Paper
          elevation={3}
          className={`${styles.male} ${styles.demographyCard}`}
        >
          <Typography variant="h6">Rain water</Typography>
          <Typography variant="body1" className={`${styles.valueClass}`}>
            {rainWater}
          </Typography>
        </Paper>
      </div>
    </>
  );
};

export default WaterSource;
