import React from "react";
import UploadDataset from "../Datasets/UploadDataset";
import { FileUploader } from "react-drag-drop-files";

const FileUploaderMain = (props) => {
  const {
    title,
    isMultiple,
    maxSize,
    handleChange,
    fileTypes,
    message,
    disabled,
    setSizeError,
    texts,
    key,
  } = props;
  return (
    <>
      <span className="AddDatasetmainheading">{props.title}</span>
      <FileUploader
        key={key} // set the key prop to force a re-render when the key changes
        id="file_uploader_locally"
        disabled={disabled}
        name="file"
        multiple={isMultiple}
        maxSize={maxSize}
        onSizeError={() => (setSizeError ? setSizeError() : "")}
        handleChange={handleChange}
        types={fileTypes}
        children={
          <UploadDataset
            texts={props.texts}
            uploades={message ? message : "Drag and drop"}
            uploadtitle=""
            maxSize={maxSize ? maxSize + "MB" : "2MB"}
          />
        }
        classes="fileUpload"
      />
    </>
  );
};

export default FileUploaderMain;
