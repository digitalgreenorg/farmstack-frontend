import React, { useState } from "react";
import "./PoliciesRightside.css";
import RichTextEditor from "react-rte";
import { FileUploader } from "react-drag-drop-files";
import UploadOrgLogo from "./UploadOrgLogo";

export default function PoliciesRightside() {
  const [govLawdesc, setgovLawdesc] = useState("");
  const [govLawfile, setgovLawFile] = useState(null);

  const [warrantiesdesc, setwarrantiesdesc] = useState("");
  const [warrantiesfile, setwarrantiesfile] = useState(null);

  const [editorgovLawValue, setEditorgovLawValue] = React.useState(
    RichTextEditor.createValueFromString(govLawdesc, "html")
  );
  const [editorwarrantiesValue, seteditorwarrantiesValue] = React.useState(
    RichTextEditor.createValueFromString(warrantiesdesc, "html")
  );
  //   const [editorgovLawValue, setEditorgovLawValue] = React.useState(
  //     RichTextEditor.createValueFromString(govLawdesc, "html")
  //   );
  //   const [editorgovLawValue, setEditorgovLawValue] = React.useState(
  //     RichTextEditor.createValueFromString(govLawdesc, "html")
  //   );
  const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      //   "LINK_BUTTONS",
      "BLOCK_TYPE_DROPDOWN",
      //   "HISTORY_BUTTONS",
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Normal", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
    ],
  };

  const fileTypes = ["JPEG", "PNG", "jpg", "docs", "pdf"];
  const handlegovLawChange = (value) => {
    setEditorgovLawValue(value);
    setgovLawdesc(value.toString("html"));
    console.log(value.toString("html"));
  };
  const handlegovLawFileChange = (file) => {
    setgovLawFile(file);
    console.log(file);
  };
  const handlewarrantiesChange = (value) => {
    seteditorwarrantiesValue(value);
    setwarrantiesdesc(value.toString("html"));
    console.log(value.toString("html"));
  };
  const handlewarrantiesFileChange = (file) => {
    setwarrantiesfile(file);
    console.log(file);
  };
  return (
    <div>
      <p className="policiesHeader">Policies</p>
      <div className="governingdes">
        <p className="governingtitle">Governing Laws</p>
        <RichTextEditor
          toolbarConfig={toolbarConfig}
          value={editorgovLawValue}
          onChange={handlegovLawChange}
          required
          id="body-text"
          name="bodyText"
          type="string"
          multiline
          variant="filled"
          style={{
            minHeight: 410,
            width: 420,
            border: "1px solid black",
            zIndex: 4,
          }}
        />
      </div>
      <div className="filegovlaw">
        <FileUploader
          multiple={true}
          handleChange={handlegovLawFileChange}
          name="file"
          types={fileTypes}
          children={
            <UploadOrgLogo
              uploaddes="Supports: .doc, .pdf 2MB file size"
              uploadtitle="Upload Governing Laws (Optional)"
            />
          }
          //   maxSize={2}
        />
        <p className="filename">
          {govLawfile
            ? govLawfile.length
              ? `File name: ${govLawfile[0].name}`
              : ""
            : "No file uploaded yet"}
        </p>
        <p className="oversizemb">
          {govLawfile != null &&
          govLawfile.length &&
          govLawfile[0].size > 2097152
            ? "File uploaded is more than 2MB!"
            : ""}
        </p>
      </div>
      <div className="warrantiesdes">
        <p className="warrantiestitle">Warranties</p>
        <RichTextEditor
          toolbarConfig={toolbarConfig}
          value={editorwarrantiesValue}
          onChange={handlewarrantiesChange}
          required
          id="body-text"
          name="bodyText"
          type="string"
          multiline
          variant="filled"
          style={{
            minHeight: 410,
            width: 420,
            border: "1px solid black",
            zIndex: 4,
          }}
        />
      </div>
      <div className="filewarranties">
        <FileUploader
          multiple={true}
          handleChange={handlewarrantiesFileChange}
          name="file"
          types={fileTypes}
          children={
            <UploadOrgLogo
              uploaddes="Supports: .doc, .pdf 2MB file size"
              uploadtitle="Upload Warranties (Optional)"
            />
          }
          //   maxSize={2}
        />
        <p className="filename">
          {warrantiesfile
            ? warrantiesfile.length
              ? `File name: ${warrantiesfile[0].name}`
              : ""
            : "No file uploaded yet"}
        </p>
        <p className="oversizemb">
          {warrantiesfile != null &&
          warrantiesfile.length &&
          warrantiesfile[0].size > 2097152
            ? "File uploaded is more than 2MB!"
            : ""}
        </p>
      </div>
    </div>
  );
}
