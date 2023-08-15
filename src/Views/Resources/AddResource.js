import {
  Box,
  Button,
  TextField,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  getTokenLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import { useHistory } from "react-router-dom";
import FileUploaderTest from "../../Components/Generic/FileUploaderTest";
import { FileUploader } from "react-drag-drop-files";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import ControlledAccordion from "../../Components/Accordion/Accordion";
import EmptyFile from "../../Components/Datasets_New/TabComponents/EmptyFile";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import File from "../../Components/Datasets_New/TabComponents/File";

const accordionTitleStyle = {
  fontFamily: "'Montserrat' !important",
  fontWeight: "400 !important",
  fontSize: "12px !important",
  lineHeight: "24px !important",
  color: "#212B36 !important",
};

const AddResource = (props) => {
  const { callLoader, callToast } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const history = useHistory();
  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : "144px",
    marginRight: mobile || tablet ? "30px" : "144px",
  };
  const [fileSizeError, setFileSizeError] = useState("");
  const fileTypes = ["XLS", "XLSX", "CSV", "JPEG", "PNG", "TIFF", "PDF"];

  const [resourceName, setResourceName] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [key, setKey] = useState(0);
  const [file, setFile] = useState();
  const [isSizeError, setIsSizeError] = useState(false);

  const limitChar = 100;
  const limitCharDesc = 512;

  const getTotalSizeInMb = (data) => {
    let total = 0;
    data.forEach((element) => {
      total =
        parseFloat(total) +
        parseFloat(element?.size / Math.pow(1024, 2)).toFixed(2) * 1;
    });
    return total.toFixed(2);
  };

  const handleDelete = (index, id, filename, type) => {
    setFileSizeError("");
    let source = "";
    if (type === "file_upload") {
      source = "file";
    }
    if (id) {
      let accessToken = getTokenLocal() ?? false;
      HTTPService(
        "DELETE",
        UrlConstant.base_url + UrlConstant.upload_files + id + "/",
        "",
        false,
        true,
        accessToken
      )
        .then((res) => {
          if (res.status === 204) {
            let filteredElements = uploadedFiles.filter(
              (item, i) => item.id !== id
            );
            setUploadedFiles(filteredElements);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let filteredElements = uploadedFiles.filter((item, i) => i !== index);
      setUploadedFiles(filteredElements);
    }
    setKey(key + 1);
  };

  const getAccordionData = () => {
    const prepareFile = (data, type) => {
      if (data && type === "file_upload") {
        let arr = data?.map((item, index) => {
          let ind = item?.name?.lastIndexOf("/");
          let tempFileName = item?.name?.slice(ind + 1);
          return (
            <File
              index={index}
              name={tempFileName}
              size={item?.size}
              id={item?.id}
              handleDelete={handleDelete}
              type={type}
              showDeleteIcon={true}
            />
          );
        });
        return arr;
      } else {
        return [<EmptyFile text={"You have not uploaded any files"} />];
      }
    };
    if (uploadedFiles) {
      const data = [
        {
          panel: 1,
          title: (
            <>
              Files upload{" "}
              {uploadedFiles?.length > 0 ? (
                <span style={{ color: "#ABABAB", marginLeft: "4px" }}>
                  (Total Files: {uploadedFiles?.length} | Total size:{" "}
                  {getTotalSizeInMb(uploadedFiles)} MB)
                </span>
              ) : (
                <></>
              )}
            </>
          ),
          details:
            uploadedFiles?.length > 0
              ? prepareFile(uploadedFiles, "file_upload")
              : [<EmptyFile text={"You have not uploaded any files"} />],
        },
      ];
      return data;
    } else {
      return [];
    }
  };

  const isDisabled = () => {
    if (resourceName && resourceDescription && uploadedFiles?.length) {
      return false;
    } else {
      return true;
    }
  };
  const handleClickRoutes = () => {
    if (isLoggedInUserParticipant() && getTokenLocal()) {
      return "/participant/resources";
    } else if (
      isLoggedInUserAdmin() ||
      (isLoggedInUserCoSteward() && getTokenLocal())
    ) {
      return "/datahub/resources";
    }
  };
  const handleFileChange = (file) => {
    setIsSizeError(false);
    setFile(file);
    setKey(key + 1);

    let tempFiles = [...uploadedFiles];
    let s = [...file]?.forEach((f) => {
      if (!(f?.name.length > 85)) {
        tempFiles.push(f);
        return true;
      } else {
        callToast(
          "File name shouldn't be more than 85 characters.",
          "error",
          true
        );
        return false;
      }
    });
    setUploadedFiles(tempFiles);
    setFileSizeError("");
  };
  const handleSubmit = () => {};
  return (
    <Box sx={containerStyle}>
      <div className="text-left mt-50">
        <span
          className="add_light_text cursor-pointer breadcrumbItem"
          onClick={() => history.push(handleClickRoutes())}
          id="add-dataset-breadcrum"
          data-testid="goPrevRoute"
        >
          Resources
        </span>
        <span className="add_light_text ml-11">
          <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#00ab55" }} />
        </span>
        <span className="add_light_text ml-11 fw600">
          {props.resourceId ? "Edit resource" : "Add resource"}
        </span>
      </div>
      <Typography
        sx={{
          fontFamily: "Montserrat !important",
          fontWeight: "600",
          fontSize: "32px",
          lineHeight: "40px",
          color: "#000000",
          textAlign: "left",
          marginTop: "50px",
        }}
      >
        {props.resourceId ? "Edit resource" : "Create new resource"}
      </Typography>
      <Box className="mt-20">
        <TextField
          fullWidth
          sx={{
            marginTop: "30px",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#919EAB",
              },
              "&:hover fieldset": {
                borderColor: "#919EAB",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#919EAB",
              },
            },
          }}
          placeholder="Resource name"
          label="Resource name"
          value={resourceName}
          required
          onChange={(e) => {
            if (e.target.value.toString().length <= limitChar) {
              setResourceName(e.target.value.trimStart());
            }
          }}
          disabled={props.resourceId ? true : false}
          id="add-dataset-name"
        />
        <TextField
          id="add-dataset-description"
          fullWidth
          multiline
          minRows={4}
          maxRows={4}
          sx={{
            marginTop: "12px",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#919EAB",
              },
              "&:hover fieldset": {
                borderColor: "#919EAB",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#919EAB",
              },
            },
          }}
          placeholder="Resource description not more that 512 character "
          label="Resource description not more that 512 character "
          value={resourceDescription}
          required
          onChange={(e) => {
            if (e.target.value.toString().length <= limitCharDesc) {
              setResourceDescription(e.target.value.trimStart());
            }
          }}
        />
      </Box>
      <Divider sx={{ border: "1px solid #ABABAB", marginTop: "59px" }} />
      <Box className="mt-50 d-flex justify-content-between">
        <Box>
          <Typography
            sx={{
              fontFamily: "Montserrat !important",
              fontWeight: "600",
              fontSize: "20px",
              lineHeight: "40px",
              color: "#000000",
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            Upload file
          </Typography>
          <Box className="cursor-pointer">
            <FileUploader
              id="add-dataset-upload-file-id"
              key={key}
              name="file"
              handleChange={handleFileChange}
              multiple={true}
              maxSize={50}
              onSizeError={(file) => setIsSizeError(true)}
              children={<FileUploaderTest texts={"Drop files here"} />}
              types={fileTypes}
            />
            <span style={{ color: "red", fontSize: "14px", textAlign: "left" }}>
              {fileSizeError}
            </span>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: "Montserrat !important",
              fontWeight: "600",
              fontSize: "20px",
              lineHeight: "40px",
              color: "#000000",
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            List of files upload
          </Typography>
          <ControlledAccordion
            data={getAccordionData()}
            isCustomStyle={true}
            width={"466px"}
            titleStyle={accordionTitleStyle}
          />
        </Box>
      </Box>

      <Divider sx={{ border: "1px solid #ABABAB", marginTop: "59px" }} />
      <Box
        className="d-flex justify-content-end"
        sx={{ marginTop: "50px", marginBottom: "100px" }}
      >
        <Button
          id="add-dataset-cancel-btn"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "16px",
            width: "171px",
            height: "48px",
            border: "1px solid rgba(0, 171, 85, 0.48)",
            borderRadius: "8px",
            color: "#00AB55",
            textTransform: "none",
            "&:hover": {
              background: "none",
              border: "1px solid rgba(0, 171, 85, 0.48)",
            },
          }}
          variant="outlined"
          onClick={() => history.push(handleClickRoutes())}
        >
          Cancel
        </Button>
        <Button
          id="add-dataset-submit-btn"
          disabled={isDisabled()}
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "16px",
            width: "171px",
            height: "48px",
            background: "#00AB55",
            borderRadius: "8px",
            textTransform: "none",
            marginLeft: "50px",
            "&:hover": {
              backgroundColor: "#00AB55",
              color: "#fffff",
            },
          }}
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddResource;
