import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import UploadBanner from "./UploadBanner";
import "./BrandingRightside";
export default function BrandingRightside() {
  const fileTypes = ["JPEG", "PNG", "jpg"];
  const handleBannerFileChange = () => {};

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
      </div>
      <p className="colortitle">Button Color</p>
      <div></div>
    </div>
  );
}
