import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { Button } from "@mui/material";
import global_style from "../../Assets/CSS/global.module.css";
import { styled } from "@mui/material/styles";

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const styles = (theme) => ({
  cropContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    background: "#333",
    [theme.breakpoints.up("sm")]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  sliderContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center",
  },
  sliderLabel: {
    [theme.breakpoints.down("xs")]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: "22px 0px",
    marginLeft: 32,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      margin: "0 16px",
    },
  },
});

export default function ReactEasyCropperForFarmstack(props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  //   const handleCropComplete = () => {
  //     const canvas = canvasRef.current;
  //     const blob = new Promise((resolve) => {
  //       canvas.toBlob((blob) => {
  //         resolve(blob);
  //       });
  //     });

  //     // Handle the cropped file blob (e.g., send it to the server)
  //     blob.then((croppedFile) => {
  //       console.log("Cropped file:", croppedFile);
  //       // Perform further processing or send the file to the server
  //     });
  //   };
  return (
    <>
      <Cropper
        image={props.file}
        crop={crop}
        zoom={zoom}
        aspect={3.17}
        onCropChange={setCrop}
        onCropComplete={props.handleCropComplete}
        onZoomChange={setZoom}
      />
      <div
        className={styles.sliderContainer}
        style={{
          borderRadius: "10px",
          backgroundColor: "white",
          zIndex: 10,
          position: "absolute",
          width: "386px",
          bottom: "10px",
          right: "10px",
          padding: "25px",
        }}
      >
        <Typography variant="overline">Zoom</Typography>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          //   classes={{ root: styles.slider }}
          onChange={(e, zoom) => setZoom(zoom)}
        />
        <Button
          onClick={props.showCroppedImage}
          variant="contained"
          color="primary"
          className={global_style.primary_button}
          id={"crop-image-preview-done-btn"}
        >
          Done
        </Button>
      </div>
    </>
  );
}
