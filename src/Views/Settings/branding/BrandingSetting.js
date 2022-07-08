import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./BrandingSetting.css";

import { FileUploader } from "react-drag-drop-files";
import UploadOrgBanner from "../organisation/UploadOrgBanner";

import HTTPService from "../../../Services/HTTPService";
import UrlConstant from "../../../Constants/UrlConstants";

import { SketchPicker } from "react-color";

export default function BrandingSetting() {
  const fileTypes = ["JPEG", "PNG", "jpg"];
  const [orgfilesize, setorgfilesize] = useState(false);
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 1 });

  const handleBrandSettingSubmit = () => {};
  const handleBannerFileChange = () => {};
  const handleColorChange = (color) => {
    setColor(color.rgb);
  };

  return (
    <div className="brandsetting">
      <form noValidate autoComplete="off" onSubmit={handleBrandSettingSubmit}>
        <Row>
          <span className="title">Customize Design</span>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <FileUploader
              handleChange={handleBannerFileChange}
              name="file"
              types={fileTypes}
              children={
                <UploadOrgBanner
                  uploaddes="Size should be '1400pixels X 220 pixels' 2MB only"
                  uploadtitle="Upload your banner image here"
                />
              }
            />
          </Col>
        </Row>
        <Row>
          <span className="title">Button Color</span>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SketchPicker
              onChange={handleColorChange}
              color={color}
              width="400"
              className="colorpickersettings"
              // height="100"
            />
          </Col>
        </Row>
      </form>
    </div>
  );
}
