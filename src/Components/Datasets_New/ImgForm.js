import React, { useState } from "react";
import { Grid } from "@mui/material";
import numbermetric from "./images/numbermetric.png";
import barchart from "./images/barchart.png";
import squigglyline from "./images/squigglyline.png";
import piechart from "./images/piechart.png";

const Imgform = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const images = [numbermetric, barchart, squigglyline, piechart];

  return (
    <div>
      <form>
        {/* Other form fields */}
        <h2>Dashboard type</h2>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12}>
            {/* Render image gallery */}
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="dbtype"
                onClick={() => handleImageClick(image)}
                style={{
                  cursor: "pointer",
                  border: selectedImage === image ? "2px solid blue" : "none",
                  margin: "15px"
                }}
              />
            ))}
          </Grid>
          {/* Include the selected image in the form data */}
          {selectedImage && (
            <Grid item xs={12}>
              <h3>Selected Image:</h3>
              <img src={selectedImage} alt="Selected" />
              <input type="hidden" name="selectedImage" value={selectedImage} />
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  );
};

export default Imgform;
