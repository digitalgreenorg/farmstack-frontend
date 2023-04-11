import React from "react";
import upload_img from "../../Assets/Img/Farmstack V2.0/upload.svg";
export default function UploadDataset(props) {
  return (
    <div
      className="datasetupload"
      style={{
        border: "1px dashed #00ab55",
        height: "324px",
        cursor: "pointer",
        background: "#F4F6F8",
      }}
    >
      <p className="accountsettingsheader" style={{ paddingTop: "24px" }}>
        {props.uploadtitle}
      </p>
      <div className="accountsettingsuploadimg">
        <img src={upload_img} />{" "}
      </div>
      <p style={{ color: "#A3B0B8", padding: "40px" }}>
        Drop files here or click{" "}
        <span style={{ color: "#00AB55", textDecoration: "underline" }}>
          browse
        </span>
        thorough your machine, File size not more than {props.maxSize}.
      </p>
      {/* <p style={{ color: "#A3B0B8" }}>{props.uploades}</p> */}
    </div>
  );
}
