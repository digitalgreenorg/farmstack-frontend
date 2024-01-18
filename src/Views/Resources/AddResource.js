import {
  Box,
  Button,
  TextField,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import {
  GetErrorHandlingRoute,
  GetErrorKey,
  fileUpload,
  getTokenLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
  toTitleCase,
} from "../../Utils/Common";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import { useHistory, useParams } from "react-router-dom";
import FileUploaderTest from "../../Components/Generic/FileUploaderTest";
import { FileUploader } from "react-drag-drop-files";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import ControlledAccordion from "../../Components/Accordion/Accordion";
import EmptyFile from "../../Components/Datasets_New/TabComponents/EmptyFile";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import File from "../../Components/Datasets_New/TabComponents/File";
import CheckBoxWithText from "../../Components/Datasets_New/TabComponents/CheckBoxWithText";
import { Select } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import labels from "../../Constants/labels";
import CheckBoxWithTypo from "../../Components/Datasets_New/TabComponents/CheckBoxWithTypo";

const accordionTitleStyle = {
  fontFamily: "'Arial' !important",
  fontWeight: "400 !important",
  fontSize: "12px !important",
  lineHeight: "24px !important",
  color: "#212B36 !important",
};

const AddResource = (props) => {
  const { id } = useParams();
  const { callLoader, callToast } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const history = useHistory();
  let resources = labels.renaming_modules.resources;
  let resource = labels.renaming_modules.resource;
  let Resources = toTitleCase(labels.renaming_modules.resources);
  let Resource = toTitleCase(labels.renaming_modules.resource);
  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : "144px",
    marginRight: mobile || tablet ? "30px" : "144px",
    padding: "10px",
  };
  const [fileSizeError, setFileSizeError] = useState("");
  const fileTypes = ["XLS", "XLSX", "CSV", "JPEG", "PNG", "TIFF", "PDF"];

  const [resourceName, setResourceName] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [subCategoryIds, setSubCategoryIds] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [updater, setUpdate] = useState(0);
  const [userType, setUserType] = useState("");
  const [key, setKey] = useState(0);
  const [file, setFile] = useState();
  const [isSizeError, setIsSizeError] = useState(false);
  const [errorResourceName, setErrorResourceName] = useState("");
  const [errorResourceDescription, setErrorResourceDescription] = useState("");

  const limitChar = 500;
  const limitCharDesc = 2000;

  const getTotalSizeInMb = (data) => {
    let total = 0;
    data.forEach((element) => {
      total =
        parseFloat(total) +
        parseFloat(element?.file_size / Math.pow(1024, 2)).toFixed(2) * 1;
    });
    return total.toFixed(2);
  };

  const handleDelete = (index, id, filename, type) => {
    setFileSizeError("");
    let source = "";
    if (type === "file_upload") {
      source = "file";
    }
    const multipleFiles = id && uploadedFiles?.length > 1;
    if (multipleFiles) {
      const accessToken = getTokenLocal() ?? false;
      callLoader(true);
      HTTPService(
        "DELETE",
        UrlConstant.base_url + UrlConstant.file_resource + id + "/",
        "",
        false,
        true,
        accessToken
      )
        .then((res) => {
          if (res.status === 204) {
            callLoader(false);
            const filteredFiles = uploadedFiles.filter(
              (item) => item.id !== id
            );
            setUploadedFiles(filteredFiles);
          }
        })
        .catch((e) => {
          console.log(e);
          callLoader(false);
        });
    } else if (id) {
      callToast(
        "File cannot be deleted, a resource must have at least one file",
        "error",
        true
      );
    } else {
      const filteredFiles = uploadedFiles.filter((_, i) => i !== index);
      setUploadedFiles(filteredFiles);
      setKey(key + 1);
    }
  };
  const getAccordionDataForLinks = () => {
    const prepareFile = (data, type) => {
      if (data && type === "file_upload") {
        let arr = data?.map((item, index) => {
          let ind = item?.file?.lastIndexOf("/");
          let tempFileName = item?.file?.slice(ind + 1);
          return (
            <File
              index={index}
              name={item?.url ? item.url : tempFileName}
              // size={null}
              id={item?.id}
              handleDelete={handleDelete}
              type={item?.type}
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
              {Resource} links{" "}
              {uploadedFiles?.length > 0 ? (
                <span style={{ color: "#ABABAB", marginLeft: "4px" }}>
                  (Total Files: {uploadedFiles?.length} )
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
    if (
      resourceName &&
      resourceDescription &&
      (uploadedFiles?.length || eachFileDetailData?.url) &&
      subCategoryIds?.length
    ) {
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

  const getUpdatedFile = async (fileItem) => {
    let bodyFormData = new FormData();
    if (typeSelected === "file") {
      bodyFormData.append("resource", props.resourceId);
      bodyFormData.append("file", "");
      bodyFormData.delete("file");
      bodyFormData.append("file", fileItem);
      bodyFormData.append("type", "file");
    } else {
      bodyFormData.append("resource", props.resourceId);
      bodyFormData.append("url", fileItem.url);
      bodyFormData.append("transcription", fileItem?.transcription ?? "");
      bodyFormData.append(
        "type",
        typeSelected === "video" ? "youtube" : typeSelected
      );
      // fileItem["resource"] = props.resourceId;
      // fileItem["type"] = typeSelected === "video" ? "youtube" : typeSelected;
    }
    setFileSizeError("");
    let accessToken = getTokenLocal() ? getTokenLocal() : false;

    try {
      const response = await HTTPService(
        "POST",
        UrlConstant.base_url + UrlConstant.file_resource,
        bodyFormData,
        true,
        true,
        accessToken
      );
      setUploadedFiles((prev) => [...prev, response.data]);
      setEachFileDetailData({
        url: "",
        transcription: "",
        type: typeSelected,
      });
      callLoader(false);
      callToast("file uploaded successfully", "success", true);
      return response?.data;
    } catch (error) {
      console.log(error);
      callLoader(false);
      callToast("something went wrong while uploading the file", "error", true);
    }
  };

  const handleFileChange = async (file) => {
    callLoader(true);
    setIsSizeError(false);
    setFile(file);
    setKey(key + 1);
    let tempFiles = [...uploadedFiles];
    let s = [...file]?.forEach((f) => {
      if (!(f?.name.length > 85)) {
        f.file = "/" + f?.name;
        f.file_size = f?.size;
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
    if (props.resourceId) {
      let tempFiles = [];
      [...file].map((fileItem) => tempFiles.push(getUpdatedFile(fileItem)));
      callLoader(true);
      Promise.all(tempFiles)
        .then((results) => {
          // results will comes in type of array
          callLoader(false);
          getResource();
          console.log(results);
        })
        .catch((err) => {
          callLoader(false);
          console.log(err);
        });
    }
    if (!props.resourceId) {
      setTimeout(() => {
        callLoader(false);
      }, 2000);
    }
    setUploadedFiles(tempFiles);
    setFileSizeError("");
  };

  const handleCheckBox = (categoryId, subCategoryId) => {
    setUpdate((prev) => prev + 1);
    setSubCategoryIds((prevIds) => {
      // Check if the subCategoryId is already in the array
      if (prevIds.includes(subCategoryId)) {
        // Remove the subCategoryId
        return prevIds.filter((id) => id !== subCategoryId);
      } else {
        // Add the subCategoryId
        return [...prevIds, subCategoryId];
      }
    });
  };

  const getResource = async () => {
    callLoader(true);
    await HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.resource_endpoint + id + "/",
      "",
      false,
      userType == "guest" ? false : true
    )
      .then((response) => {
        callLoader(false);
        setResourceName(response.data?.title);
        setResourceDescription(response.data?.description);
        setUploadedFiles(response?.data?.resources);
        setCategories(response?.data?.categories);
        const updateSubCategoryIds = () => {
          const ids = new Set(
            response?.data?.categories?.flatMap((category) =>
              category.subcategories.map((subcategory) => subcategory.id)
            )
          );
          setSubCategoryIds([...ids]);
        };
        updateSubCategoryIds();
      })
      .catch(async (e) => {
        callLoader(false);
        console.log(e);
        let error = await GetErrorHandlingRoute(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong while loading dataset",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };

  //id stored for the add more
  const [tempIdForAddMoreResourceUrl, setTempIdForAddMoreResourceUrl] =
    useState("");
  //states for resource urls
  const [typeSelected, setTypeSelected] = useState("pdf");
  const [eachFileDetailData, setEachFileDetailData] = useState({
    url: "",
    transcription: "",
    type: typeSelected,
  });
  //type chager for resource types video/pdf
  const handleChangeType = (value) => {
    setTypeSelected(value);
    setEachFileDetailData({
      url: "",
      transcription: "",
      type: typeSelected,
    });
  };

  const handleClickAddMore = () => {
    // handleSubmit();
    setUploadedFiles([...uploadedFiles, eachFileDetailData]);
    setEachFileDetailData({
      url: "",
      transcription: "",
      type: typeSelected,
    });
  };
  const handleSubmit = async () => {
    let bodyFormData = new FormData();
    bodyFormData.append("title", resourceName);
    bodyFormData.append("description", resourceDescription);
    bodyFormData.append("category", JSON.stringify(categories));
    bodyFormData.append("sub_categories_map", JSON.stringify(subCategoryIds));

    let body = {};

    let arr = [];
    console.log(uploadedFiles, "uploaded file");

    if (!props.resourceId || tempIdForAddMoreResourceUrl) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        console.log(uploadedFiles[i], "uploaded file");
        if (uploadedFiles[i]?.file) {
          let obj = {
            ...uploadedFiles[i],
            type: "file",
          };
          arr.push(obj);
        } else {
          let obj = {
            type: uploadedFiles[i]?.type,
            url: uploadedFiles[i]?.url,
            transcription: uploadedFiles[i]?.transcription,
          };
          arr.push(obj);
        }
      }
      // checking for last file which is in input
      if (eachFileDetailData?.url) {
        arr.push({
          type: eachFileDetailData?.type,
          url: eachFileDetailData?.url,
          transcription: eachFileDetailData?.transcription,
        });
      }
    }
    const uploadFilesStringfy = JSON.stringify(arr);

    bodyFormData.append("uploaded_files", uploadFilesStringfy);

    let accessToken = getTokenLocal() ?? false;
    callLoader(true);
    let url = props.resourceId
      ? UrlConstant.base_url + UrlConstant.resource_endpoint + id + "/"
      : UrlConstant.base_url + UrlConstant.resource_endpoint;

    HTTPService(
      props.resourceId ? "PUT" : "POST",
      url,
      bodyFormData,
      true,
      true,
      accessToken
    )
      .then((res) => {
        callLoader(false);
        if (props.resourceId) {
          callToast("Resource updated successfully!", "success", true);
        } else {
          callToast("Resource added successfully!", "success", true);
        }
        setEachFileDetailData({
          url: "",
          transcription: "",
          type: typeSelected ?? "pdf",
        });
        history.push(handleClickRoutes());
        // setUploadedFiles([...]);
      })
      .catch((err) => {
        callLoader(false);
        const returnValues = GetErrorKey(err, Object.keys(body));
        console.log(returnValues, "keyss");
        const errorKeys = returnValues[0];
        const errorMessages = returnValues[1];
        console.log(errorKeys, "keyss");
        if (errorKeys.length > 0) {
          for (let i = 0; i < errorKeys.length; i++) {
            console.log(errorKeys, "keyss");
            switch (errorKeys[i]) {
              case "title":
                setErrorResourceName(errorMessages[i]);
                break;
              case "description":
                setErrorResourceDescription(errorMessages[i]);
                break;
              default:
                let response = GetErrorHandlingRoute(err);
                if (response.toast) {
                  //callToast(message, type, action)
                  callToast(
                    response?.message ?? response?.data?.detail ?? "Unknown",
                    response.status == 200 ? "success" : "error",
                    response.toast
                  );
                }
                break;
            }
          }
        } else {
          let response = GetErrorHandlingRoute(err);
          console.log("responce in err", response);
          if (response.toast) {
            callToast(
              response?.message ?? response?.data?.detail ?? "Unknown",
              response.status == 200 ? "success" : "error",
              response.toast
            );
          }
          if (response.path) {
            history.push(response.path);
          }
        }
      });
  };
  const getAllCategoryAndSubCategory = () => {
    let url = UrlConstant.base_url + UrlConstant.list_category;
    let checkforAccess = getTokenLocal() ?? false;
    HTTPService("GET", url, "", true, true, checkforAccess)
      .then((response) => {
        setListCategories(response?.data);
      })
      .catch(async (e) => {
        let error = await GetErrorHandlingRoute(e);
        console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };

  useEffect(() => {
    if (id || props.resourceId) {
      getResource();
    }
  }, []);

  useEffect(() => {
    getAllCategoryAndSubCategory();
  }, []);

  useEffect(() => {
    const updateCheckBox = () => {
      let tempCategories = [];
      let temp = listCategories?.forEach((data, index) => {
        let prepareCheckbox = [];
        prepareCheckbox = data?.subcategories?.map((subCategory, ind) => {
          // Find if the subcategory exists in the categories array and its subcategories
          const isPresent = subCategoryIds.includes(subCategory.id);
          return (
            <CheckBoxWithTypo
              key={ind}
              text={subCategory?.name}
              keyIndex={ind}
              categoryId={data?.id}
              subCategoryId={subCategory?.id}
              checked={isPresent}
              categoryKeyName={data?.name}
              keyName={subCategory?.name}
              handleCheckBox={handleCheckBox}
              fontSize={"12px"}
            />
          );
        });
        let obj = {
          panel: index + 1,
          title: data.name,
          details: prepareCheckbox ? prepareCheckbox : [],
        };
        tempCategories = tempCategories.concat(obj);
      });
      setAllCategories(tempCategories);
    };
    updateCheckBox();
  }, [listCategories, subCategoryIds]);

  return (
    <Box sx={containerStyle}>
      <div className="text-left mt-50">
        <span
          className="add_light_text cursor-pointer breadcrumbItem"
          onClick={() => history.push(handleClickRoutes())}
          id="add-dataset-breadcrum"
          data-testid="goPrevRoute"
        >
          {Resources}
        </span>
        <span className="add_light_text ml-11">
          <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#00A94F" }} />
        </span>
        <span className="add_light_text ml-11 fw600">
          {props.resourceId ? `Edit ${resource}` : `Add ${resource}`}
        </span>
      </div>
      <Typography
        sx={{
          fontFamily: "Arial !important",
          fontWeight: "600",
          fontSize: "32px",
          lineHeight: "40px",
          color: "#000000",
          textAlign: "left",
          marginTop: "50px",
        }}
      >
        {props.resourceId ? `Edit ${resource}` : `Create new ${resource}`}
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
          placeholder={`${Resource} name should not be more than 100 character`}
          label={`${Resource} name`}
          value={resourceName}
          required
          onChange={(e) => {
            setErrorResourceName("");
            if (e.target.value.toString().length <= limitChar) {
              setResourceName(e.target.value.trimStart());
            }
          }}
          id="add-dataset-name"
          error={errorResourceName ? true : false}
          helperText={
            <Typography
              sx={{
                fontFamily: "Arial !important",
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#FF0000",
                textAlign: "left",
              }}
            >
              {errorResourceName ? errorResourceName : ""}
            </Typography>
          }
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
          placeholder={`${Resource} description should not be more that 250 character`}
          label={`${Resource} description should not be more that 250 character`}
          value={resourceDescription}
          required
          onChange={(e) => {
            setErrorResourceDescription("");
            if (e.target.value.toString().length <= limitCharDesc) {
              setResourceDescription(e.target.value.trimStart());
            }
          }}
          error={errorResourceDescription ? true : false}
          helperText={
            <Typography
              sx={{
                fontFamily: "Arial !important",
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#FF0000",
                textAlign: "left",
              }}
            >
              {errorResourceDescription ? errorResourceDescription : ""}
            </Typography>
          }
        />
      </Box>
      <Divider sx={{ border: "1px solid #ABABAB", marginTop: "59px" }} />
      <Box className="bold_title mt-50">
        {Resource} category{" "}
        <span
          style={{
            color: "red",
            fontSize: "26px",
          }}
        >
          *
        </span>
      </Box>
      <Box className="mt-30">
        <ControlledAccordion
          data={allCategories}
          customBorder={true}
          customPadding={true}
          isCustomStyle={true}
          titleStyle={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "900px",
          }}
          isCustomDetailStyle={true}
          customDetailsStyle={{ display: "inline-block", width: "30%" }}
          addHeaderBackground={true}
          headerBackground={"#eafbf3"}
        />
      </Box>
      <Box
        className="mt-50"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: mobile ? "column" : "row",
        }}
      >
        <Box>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "500px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Arial !important",
                fontWeight: "600",
                fontSize: "20px",
                lineHeight: "40px",
                color: "#000000",
                textAlign: "left",
                marginBottom: "10px",
              }}
            >
              {Resource} url{" "}
              <span
                style={{
                  color: "red",
                  fontSize: "26px",
                }}
              >
                *
              </span>
            </Typography>

            {!props.resourceId && (
              <Button
                type="secondary"
                disabled={eachFileDetailData.url ? false : true}
                icon={<PoweroffOutlined />}
                // loading={loadings[1]}
                onClick={() => handleClickAddMore()}
              >
                + Add more
              </Button>
            )}
          </div>
          <Box
            className="cursor-pointer d-flex flex-column"
            style={{ width: "500px", gap: "20px" }}
          >
            {/* <FileUploader
                id="add-dataset-upload-file-id"
                key={key}
                name="file"
                handleChange={handleFileChange}
                multiple={true}
                maxSize={50}
                onSizeError={(file) => {
                  console.log(file, "something");
                  setIsSizeError(true);
                }}
                children={<FileUploaderTest texts={"Drop files here"} />}
                types={fileTypes}
              /> */}
            <Select
              defaultValue={typeSelected}
              style={{ width: 120 }}
              onChange={handleChangeType}
              options={[
                { value: "pdf", label: "Pdf" },
                { value: "video", label: "Video" },
                { value: "file", label: "File" },
              ]}
            />
            {typeSelected == "file" ? (
              <Box className="mt-10">
                <FileUploader
                  id="add-dataset-upload-file-id"
                  key={key}
                  name="file"
                  handleChange={handleFileChange}
                  multiple={true}
                  maxSize={50}
                  onSizeError={(file) => {
                    console.log(file, "something");
                    setIsSizeError(true);
                  }}
                  children={<FileUploaderTest texts={"Drop files here"} />}
                  types={fileTypes}
                />
              </Box>
            ) : (
              <Box className="mt-10">
                <TextField
                  // fullWidth
                  sx={{
                    marginTop: "10px",
                    borderRadius: "8px",
                    width: "100%",
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
                  placeholder={
                    typeSelected == "pdf"
                      ? "Enter pdf link here"
                      : "Enter Video link here"
                  }
                  label={
                    typeSelected == "pdf"
                      ? "Enter pdf link here"
                      : "Enter Video link here"
                  }
                  value={eachFileDetailData.url}
                  required
                  onChange={(e) => {
                    // setErrorResourceName("");
                    const inputValue = e.target.value;

                    if (
                      !/\s/.test(inputValue) &&
                      inputValue.length <= limitChar
                    ) {
                      setEachFileDetailData({
                        ...eachFileDetailData,
                        url: inputValue.trim(),
                        type:
                          typeSelected === "video" ? "youtube" : typeSelected,
                      });
                    }
                  }}
                  id="add-dataset-name"
                  // error={errorResourceName ? true : false}
                  // helperText={
                  //   <Typography
                  //     sx={{
                  //       fontFamily: "Arial !important",
                  //       fontWeight: "400",
                  //       fontSize: "12px",
                  //       lineHeight: "18px",
                  //       color: "#FF0000",
                  //       textAlign: "left",
                  //     }}
                  //   >
                  //     {errorResourceName ? errorResourceName : ""}
                  //   </Typography>
                  // }
                />
                {typeSelected !== "pdf" && (
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
                    placeholder={
                      "Enter transcription/description for the video"
                    }
                    label={"Enter transcription/description for the video"}
                    value={eachFileDetailData.transcription}
                    required
                    onChange={(e) => {
                      setErrorResourceDescription("");
                      if (e.target.value.toString().length <= limitCharDesc) {
                        setEachFileDetailData({
                          ...eachFileDetailData,
                          transcription: e.target.value.trimStart(),
                        });
                      }
                    }}
                  />
                )}
              </Box>
            )}
            {props.resourceId && (
              <Button
                style={{ width: "150px" }}
                className={GlobalStyle.primary_button}
                onClick={() => {
                  getUpdatedFile(eachFileDetailData);
                }}
              >
                Save
              </Button>
            )}

            {/* <span style={{ color: "red", fontSize: "14px", textAlign: "left" }}>
                {isSizeError && (
                  <div>
                    <p>File size exceeds the limit of 50MB.</p>
                    <p>Please choose a smaller file or reduce the file size.</p>
                  </div>
                )}
              </span> */}
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: "Arial !important",
              fontWeight: "600",
              fontSize: "20px",
              lineHeight: "40px",
              color: "#000000",
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            List of {resources}
          </Typography>
          <ControlledAccordion
            data={getAccordionDataForLinks()}
            isCustomStyle={true}
            width={mobile ? "300px" : "466px"}
            titleStyle={accordionTitleStyle}
            selectedPanelIndex={1}
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
            fontFamily: "Arial",
            fontWeight: 700,
            fontSize: "16px",
            width: "171px",
            height: "48px",
            border: "1px solid rgba(0, 171, 85, 0.48)",
            borderRadius: "8px",
            color: "#00A94F",
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
            fontFamily: "Arial",
            fontWeight: 700,
            fontSize: "16px",
            width: "171px",
            height: "48px",
            background: "#00A94F",
            borderRadius: "8px",
            textTransform: "none",
            marginLeft: "50px",
            "&:hover": {
              backgroundColor: "#00A94F",
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
