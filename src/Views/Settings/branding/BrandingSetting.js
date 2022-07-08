import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./BrandingSetting.css";
import Button from "@mui/material/Button";
import { FileUploader } from "react-drag-drop-files";
import UploadOrgBanner from "../organisation/UploadOrgBanner";

import HTTPService from "../../../Services/HTTPService";
import UrlConstant from "../../../Constants/UrlConstants";

import { SketchPicker } from "react-color";
import {
  setTokenLocal,
  getTokenLocal,
  setUserId,
  getUserLocal,
  handleAddressCharacters,
} from "../../../Utils/Common";

export default function BrandingSetting() {
  const fileTypes = ["JPEG", "PNG", "jpg"];
  const [orgfilesize, setorgfilesize] = useState(false);
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 1 });
  const [brandfile, setbrandfile] = useState(null);

  // get brand details.
  const getBrandingDetails = async () => {
    await HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.branding,
      false,
      false
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBrandingDetails();
  }, []);

  const handleBrandSettingSubmit = () => {};
  const handleBannerFileChange = () => {};
  const handleColorChange = (color) => {
    setColor(color.rgb);
  };
  const brandsettingcancelbtn = () => {};

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
          <Col xs={12} sm={12} md={6} lg={6}>
            <div>
              <p className="uploadorgimgname">
                {brandfile
                  ? brandfile.size
                    ? `File name: ${brandfile.name}`
                    : ""
                  : ""}
                {/* {file == null && profile_pic ? (
                <a
                  target="_blank"
                  href={profile_pic}
                  style={{ color: "#C09507", textDecoration: "none" }}>
                  Click here to view uploaded image!
                </a>
              ) : (
                ""
              )} */}
              </p>
              <p className="oversizemb-uploadimgOrglogo">
                {brandfile != null && brandfile.size > 2097152
                  ? "File uploaded is more than 2MB!"
                  : ""}
              </p>
            </div>
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
              width="400px"
              className="colorpickersettings"
              // height="100"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="brandsubmit">
              <Button
                variant="contained"
                className="accountnextbtn"
                type="submit">
                <span className="">Submit</span>
              </Button>
              {/* {!ispropfilefirstnameerror &&
              !accfilesize &&
              accfirstnamebtn &&
              file != null &&
              accnumberbtn ? (
                <Button
                  variant="contained"
                  className="accountnextbtn"
                  type="submit">
                  <span className="signupbtnname">Submit</span>
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  disabled
                  className="disableaccountnextbtn">
                  Submit
                </Button>
              )} */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="brandingcancel">
              <Button
                variant="outlined"
                className="accountsettingcancelbtn"
                type="button"
                onClick={brandsettingcancelbtn}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}
