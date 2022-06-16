import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import UploadBanner from "./UploadBanner";
import "./BrandingRightside";
import { SketchPicker } from "react-color";
import Button from "@mui/material/Button";

export default function BrandingRightside() {
  const [file, setFile] = useState(null);
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 1 });
  const [Brandingnextbutton, setBrandingnextbutton] = useState(true);

  const fileTypes = ["JPEG", "PNG", "jpg"];
  const handleBannerFileChange = (file) => {
    setFile(file);
    console.log(file);
    if (file != null && file.length && file[0].size > 2097152) {
      setBrandingnextbutton(false);
    }
  };
  const handleColorChange = (color) => {
    setColor(color.rgb);
    var hexColor = color.hex;
    console.log(hexColor);
  };
  return (
    <div>
      <p className="brandingtitle">Make your Branding</p>
      <div className="brandinglogo">
        <FileUploader
          multiple={true}
          handleChange={handleBannerFileChange}
          name="file"
          types={fileTypes}
          children={
            <UploadBanner
              uploaddes="Supports: JPEG, PNG not more than 2MB file size"
              uploadtitle="Upload logo"
            />
          }
          //   maxSize={2}
        />
        <p className="brandinglogoname">
          {file
            ? file.length
              ? `File name: ${file[0].name}`
              : ""
            : "No file uploaded yet"}
        </p>
        <p className="oversizemb-brandionglogo">
          {file != null && file.length && file[0].size > 2097152
            ? "File uploaded is more than 2MB!"
            : ""}
        </p>
      </div>
      <p className="colortitle">Button Color</p>
      <div className="colorpicker">
        <SketchPicker onChange={handleColorChange} color={color} width="400" />
      </div>
      <div>
        {/* <Button variant="contained" className="brandbtn" type="submit">
          <span className="signupbtnname">Next</span>
        </Button> */}
        {Brandingnextbutton ? (
          <Button variant="contained" className="brandbtn" type="submit">
            <span className="signupbtnname">Next</span>
          </Button>
        ) : (
          <Button variant="outlined" disabled className="disablebrandbtn">
            Next
          </Button>
        )}
        {/* <Button variant="outlined" disabled className="disablebrandbtn">
          Next
        </Button> */}
      </div>
      <div>
        <Button
          variant="outlined"
          className="finishlaterbrandbtn"
          type="button">
          Finish Later
        </Button>
      </div>
    </div>
  );
}
