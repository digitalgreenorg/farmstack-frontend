import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import UploadBanner from "./UploadBanner";
import "./BrandingRightside";
import { SketchPicker } from "react-color";
import Button from "@mui/material/Button";

import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import { useHistory } from "react-router-dom";
import { setTokenLocal, getTokenLocal } from "../../Utils/Common";

export default function BrandingRightside(props) {
  const [file, setFile] = useState(null);
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 1 });
  const [hexColor, sethexColor] = useState("");
  const [Brandingnextbutton, setBrandingnextbutton] = useState(true);
  const history = useHistory();
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
    sethexColor(hexColor);
  };
  const handleBrandingSubmit = async (e) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append("button_color", hexColor);
    bodyFormData.append("banner", file);
    bodyFormData.append("email", props.validemail);

    console.log("branding data", bodyFormData);
    let url = UrlConstant.base_url + UrlConstant.branding;

    await HTTPService("POST", url, bodyFormData, true, false)
      .then((response) => {
        console.log("response");
        console.log("branding details", response.data);
        //   console.log(response.json());
        console.log(response.status);
        if (response.status === 201) {
          setTokenLocal(props.isaccesstoken);
          history.push("/datahub/participants");
          // setEmail(false);
          // setError(false);
        } else {
          // setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        //   setError(true);
      });
  };
  return (
    <div className="branding">
      <p className="brandingtitle">Create your Branding</p>
      <div>
        <form noValidate autoComplete="off" onSubmit={handleBrandingSubmit}>
          <div className="brandinglogo">
            <FileUploader
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
                ? file.size
                  ? `File name: ${file.name}`
                  : ""
                : "No file uploaded yet"}
            </p>
            <p className="oversizemb-brandionglogo">
              {file != null && file.size > 2097152
                ? "File uploaded is more than 2MB!"
                : ""}
            </p>
          </div>
          <p className="colortitle">Button Color</p>
          <div className="colorpicker">
            <SketchPicker
              onChange={handleColorChange}
              color={color}
              width="400"
            />
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
              type="button"
              onClick={() => {
                history.push("/datahub/participants");
              }}>
              Finish Later
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
