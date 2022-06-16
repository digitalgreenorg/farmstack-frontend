import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import UploadBanner from "./UploadBanner";
import "./BrandingRightside";
export default function BrandingRightside() {
  const [file, setFile] = useState(null);
  const fileTypes = ["JPEG", "PNG", "jpg"];
  const handleBannerFileChange = (file) => {
    setFile(file);
    console.log(file);
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
            : "no files uploaded yet"}
        </p>
        <p className="oversizemb-brandionglogo">
          {file != null && file.length && file[0].size > 2097152
            ? "File uploaded is more than 2mb!"
            : ""}
        </p>
      </div>
      <p className="colortitle">Button Color</p>
      <div></div>
    </div>
  );
}
