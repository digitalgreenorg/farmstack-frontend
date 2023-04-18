import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "./DataSetsView.css";
import FileTable from "./FileTable";
import FileWithAction from "./FileWithAction";
import { useHistory, useParams } from "react-router-dom";
import FooterNew from "../Footer/Footer_New";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import ControlledAccordion from "../Accordion/Accordion";
import OutlinedButton from "../Button/OutlinedButton";
import {
  getTokenLocal,
  isLoggedInUserAdmin,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import RequestCardForApprovalOrReject from "./RequestCardForApprovalOrReject";

const DataSetsView = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [categories, setCategories] = useState([]);
  const [allDatasets, setAllDatasets] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [files, setFiles] = useState([
    {
      panel: 1,
      title: "Uploaded Files",
      details: [
        <Box>
          <FileWithAction />
          <Box className="text-left mt-20 w-100 overflow_x_scroll">
            <FileTable />
          </Box>
        </Box>,
      ],
    },
    {
      panel: 2,
      title: "MySQL imports",
      details: [],
    },
    {
      panel: 3,
      title: "Postgres imports",
      details: [],
    },
    {
      panel: 4,
      title: "API imports",
      details: [],
    },
  ]);

  const [dataSetName, setDataSetName] = useState("");
  const [dataSetDescription, setDataSetDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Upload File
  // const [files, setFiles] = useState([]);
  const [sqlFiles, setSqlFiles] = useState([]);
  const [postgresFiles, setPostgresFiles] = useState([]);
  const [sqLiteFiles, setSqLiteFiles] = useState([]);
  const [restApifiles, setRestApiFiles] = useState([]);

  // Standardise
  const [allStandardisedFile, setAllStandardisedFile] = useState({});
  const [standardisedFileLink, setStandardisedFileLink] = useState({});

  // Categories
  // const [categorises, setCategorises] = useState({})
  const [geography, setGeography] = useState();

  // Organisation & User Details
  const [orgDetails, setOrgDetails] = useState();
  const [orgAddress, setOrgAddress] = useState();
  const [userDetails, setUserDetails] = useState();

  const handleDelete = () => {
    let accessToken = getTokenLocal() ?? false;
    let url = UrlConstant.base_url + UrlConstant.delete_dataset + id + "/";
    callLoader(true);
    HTTPService("DELETE", url, "", false, true, accessToken)
      .then((res) => {
        callLoader(false);
        callToast("Dataset deleted successfully!", "success", true);
        if (isLoggedInUserAdmin()) {
          history.push(`/datahub/new_datasets`);
        } else if (isLoggedInUserParticipant()) {
          history.push(`/participant/new_datasets`);
        }
      })
      .catch((err) => {
        callLoader(false);
        callToast(
          "Something went wrong while deleting Dataset!",
          "error",
          true
        );
      });
  };

  const handleEdit = () => {
    if (isLoggedInUserAdmin()) {
      history.push(`/datahub/new_datasets/edit/${id}`);
    } else if (isLoggedInUserParticipant()) {
      history.push(`/participant/new_datasets/edit/${id}`);
    }
  };
  const handleClickRoutes = () => {
    if (isLoggedInUserParticipant() && getTokenLocal()) {
      return "/participant/new_datasets";
    } else if (isLoggedInUserAdmin() && getTokenLocal()) {
      return "/datahub/new_datasets";
    }
  };
  useEffect(() => {
    (() => {
      let userType = "";
      let url = "";
      if (userType == "guest") {
        url = UrlConstant.base_url + UrlConstant.datasetview_guest + id + "/";
      } else {
        url = UrlConstant.base_url + UrlConstant.datasetview + id + "/";
      }
      callLoader(true);
      HTTPService("GET", url, "", false, userType == "guest" ? false : true)
        .then((response) => {
          callLoader(false);
          setDataSetName(response.data.name);
          setGeography(response.data.geography);
          setIsUpdating(response.data.constantly_update);
          setFromDate(
            response.data.data_capture_start
              ? response.data.data_capture_start.split("T")[0]
              : "NA"
          );
          setToDate(
            response.data.data_capture_end
              ? response.data.data_capture_end.split("T")[0]
              : "NA"
          );
          setDataSetDescription(response.data.description);
          setOrgDetails(response.data.organization);
          let tempOrgAddress =
            response.data.organization?.address?.address +
            ", " +
            response.data.organization?.address?.country +
            ", " +
            response.data.organization?.address?.pincode;
          setOrgAddress(tempOrgAddress);
          setUserDetails(response.data.user);
          setAllDatasets(response.data.datasets);
          // preparing files for accordion
          let newArr = [...files];
          let tempFiles = response.data.datasets?.filter(
            (dataset) => dataset.source === "file"
          );
          let tempSqlFiles = response.data.datasets?.filter(
            (dataset) => dataset.source === "mysql"
          );
          let tempPostgresFiles = response.data.datasets?.filter(
            (dataset) => dataset.source === "postgres"
          );
          let tempRestApiFiles = response.data.datasets?.filter(
            (dataset) => dataset.source === "restApi"
          );
          let prepareFilesContent = [];
          if (tempFiles && tempFiles?.length > 0) {
            tempFiles.forEach((tempFile, index) => {
              let columns =
                tempFile.content?.length > 0
                  ? Object.keys(tempFile.content[0])
                  : [];
              prepareFilesContent.push(
                <Box>
                  <FileWithAction
                    index={index}
                    name={tempFile.file.slice(
                      tempFile.file.lastIndexOf("/") + 1
                    )}
                  />
                  <FileTable fileData={tempFile} />
                </Box>
              );
            });
            newArr[0].details = prepareFilesContent;
          } else if (tempSqlFiles && tempSqlFiles?.length > 0) {
            tempSqlFiles.forEach((tempFile, index) => {
              prepareFilesContent.push(
                <Box>
                  <FileWithAction
                    index={index}
                    name={tempFile.file.slice(
                      tempFile.file.lastIndexOf("/") + 1
                    )}
                  />
                  <Box className="text-left mt-20 w-100 overflow_x_scroll">
                    <FileTable fileData={tempFile} />
                  </Box>
                </Box>
              );
            });
          } else if (tempPostgresFiles && tempPostgresFiles?.length > 0) {
            tempPostgresFiles.forEach((tempFile, index) => {
              prepareFilesContent.push(
                <Box>
                  <FileWithAction
                    index={index}
                    name={tempFile.file.slice(
                      tempFile.file.lastIndexOf("/") + 1
                    )}
                  />
                  <Box className="text-left mt-20 w-100 overflow_x_scroll">
                    <FileTable fileData={tempFile} />
                  </Box>
                </Box>
              );
            });
          } else if (tempRestApiFiles && tempRestApiFiles?.length > 0) {
            tempRestApiFiles.forEach((tempFile, index) => {
              prepareFilesContent.push(
                <Box>
                  <FileWithAction
                    index={index}
                    name={tempFile.file.slice(
                      tempFile.file.lastIndexOf("/") + 1
                    )}
                  />
                  <Box className="text-left mt-20 w-100 overflow_x_scroll">
                    <FileTable fileData={tempFile} />
                  </Box>
                </Box>
              );
            });
          }
          setFiles(newArr);

          // preparing categories for accordion
          let prepareArr = [];
          let categoryJson = JSON.parse(response?.data?.category);
          for (const [key, value] of Object.entries(categoryJson)) {
            let obj = {};
            obj[key] = value;
            prepareArr.push(obj);
          }
          let tempCategories = [];
          prepareArr.forEach((item, index) => {
            let keys = Object.keys(item);
            let prepareCheckbox = item?.[keys[0]]?.map((res, ind) => {
              return res;
            });
            let obj = {
              panel: index + 1,
              title: keys[0],
              details: prepareCheckbox ? prepareCheckbox : [],
            };
            tempCategories.push(obj);
          });
          setCategories(tempCategories);
        })
        .catch((e) => {
          callLoader(false);
          callToast(
            "Something went wrong while loading dataset!",
            "error",
            true
          );
          console.log("error while loading dataset", e);
        });
    })();
  }, [id, approvalStatus]);

  return (
    <Box>
      <Box
        sx={{
          marginLeft: "144px",
          marginRight: "144px",
          marginBottom: "100px",
        }}
      >
        <div className="text-left mt-50">
          <span
            className="add_light_text cursor-pointer"
            onClick={() => history.push(handleClickRoutes())}
          >
            Datasets
          </span>
          <span className="add_light_text ml-16">
            <img src={require("../../Assets/Img/dot.svg")} />
          </span>
          <span className="add_light_text ml-16">
            {history.location?.state?.data}
          </span>
        </div>
        <Box className="d-flex justify-content-between align-items-baseline">
          <div className="bold_title mt-50">{"My Dataset Details"}</div>
          <Box>
            <Button
              sx={{
                color: "#FF5630",
                fontFamily: "Public Sans",
                fontWeight: "700",
                fontSize: "15px",
                border: "1px solid rgba(255, 86, 48, 0.48)",
                width: "149px",
                height: "48px",
                marginRight: "28px",
                textTransform: "none",
                "&:hover": {
                  background: "none",
                  border: "1px solid rgba(255, 86, 48, 0.48)",
                },
              }}
              variant="outlined"
              onClick={handleDelete}
            >
              Delete dataset
            </Button>
            <Button
              sx={{
                color: "#00AB55",
                fontFamily: "Public Sans",
                fontWeight: "700",
                fontSize: "15px",
                border: "1px solid rgba(0, 171, 85, 0.48)",
                width: "149px",
                height: "48px",
                textTransform: "none !important",
                "&:hover": {
                  background: "none",
                  border: "1px solid rgba(0, 171, 85, 0.48)",
                },
              }}
              onClick={handleEdit}
              variant="outlined"
            >
              Edit dataset
            </Button>
          </Box>
        </Box>
        {/* <div className="bold_title mt-50">{"Dataset details"}</div> */}
        <Box className="d-flex mt-38">
          <Box sx={{ width: "638px" }}>
            <Typography className="view_agriculture_heading text-left">
              {dataSetName}
            </Typography>
            <Typography className="view_datasets_light_text text-left mt-20">
              Description
            </Typography>
            <Typography className="view_datasets_bold_text text-left mt-3">
              {dataSetDescription}
            </Typography>
          </Box>
          <Box className="ml-134">
            <Box className="text-left">
              <div className="type_dataset">Public dataset</div>
            </Box>
            <Typography className="view_datasets_light_text text-left mt-20">
              Data Capture Interval
            </Typography>
            <Typography className="view_datasets_bold_text text-left mt-3">
              {fromDate + " - " + toDate}
            </Typography>
            <Typography className="view_datasets_light_text text-left mt-25">
              Geography
            </Typography>
            <Typography className="view_datasets_bold_text text-left mt-3">
              {geography}
            </Typography>
            <Typography className="view_datasets_light_text text-left mt-25">
              Constantly updating{" "}
            </Typography>
            <Typography className="view_datasets_bold_text text-left mt-3">
              {isUpdating ? "Yes" : "No"}
            </Typography>
          </Box>
        </Box>
        <div className="bold_title mt-50">{"Dataset category"}</div>
        <Box className="mt-20">
          <ControlledAccordion data={categories} />
        </Box>
        <div className="bold_title mt-50">{"Dataset files"}</div>
        <Typography className="view_datasets_light_text text-left mt-20">
          <span className="view_datasets_bold_text">Note: </span>This dataset is
          solely meant to be used as a source of information. Even through
          accuracy is the goal, the steward is not accountable for the
          information. Please let the admin know if you have any information you
          think is inaccurate.
        </Typography>
        <Box className="mt-20">
          <ControlledAccordion data={files} isTables={true} />
        </Box>
        <Divider className="mt-50" />
        <RequestCardForApprovalOrReject
          data={allDatasets}
          setApprovalStatus={setApprovalStatus}
          approvalStatus={approvalStatus}
        />
        <Divider className="mt-50" />
        <div className="bold_title mt-50">{"Organisation Details"}</div>
        <Box>
          <Card className="organisation_icon_card">
            <Box className="d-flex h-100 align-items-center">
              {orgDetails?.logo ? (
                <img src={orgDetails?.logo} alt="footerLogo" />
              ) : (
                <img
                  src={require("../../Assets/Img/footer_logo.svg")}
                  alt="footerLogo"
                />
              )}
            </Box>
          </Card>

          <div className="d-flex mt-30">
            <div className="text-left w-313">
              <Typography className="view_datasets_light_text">
                Organisation address
              </Typography>
              <Typography className="view_datasets_bold_text">
                {orgAddress}
              </Typography>
            </div>
            <div className="text-left ml-79">
              <Typography className="view_datasets_light_text">
                Root user details
              </Typography>
              <Typography className="view_datasets_bold_text">
                {userDetails?.first_name + " " + userDetails?.last_name}
              </Typography>
              <Typography className="view_datasets_bold_text">
                {userDetails?.email}
              </Typography>
            </div>
            <div className="text-left ml-39">
              <Typography className="view_datasets_light_text">
                Request details
              </Typography>
              <Typography className="view_datasets_bold_text">
                Ask to download your dataset.
              </Typography>
            </div>
          </div>
          {/* <div className="bold_title mt-50">{"Period"}</div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <FormControl fullWidth sx={{ width: "466px" }}>
                <InputLabel id="test-select-label">Select period</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.period}
                  onChange={props.setPeriod}
                  sx={{
                    textAlign: "left",
                    "&.MuiInputBase-root": {
                      height: "56px",
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                  }}
                  label="Select period"
                  placeholder="Select period"
                >
                  {["1 week", "2 week", "3 week", "4 week"]?.map((menu) => (
                    <MenuItem value={menu}>{menu}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
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
                  marginLeft: "100px",
                  "&:hover": {
                    background: "none",
                    border: "1px solid rgba(0, 171, 85, 0.48)",
                  },
                }}
                variant="outlined"
              >
                Reject
              </Button>
              <Button
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "16px",
                  width: "171px",
                  height: "48px",
                  background: "#00AB55",
                  borderRadius: "8px",
                  textTransform: "none",
                  marginLeft: "30px",
                  "&:hover": {
                    backgroundColor: "#00AB55",
                    color: "#fffff",
                  },
                }}
                variant="contained"
              >
                Approve
              </Button>
            </div>
          </div> */}
          <Divider className="mt-50" />

          <div className="d-flex justify-content-end mt-50">
            <Button
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
                marginLeft: "100px",
                "&:hover": {
                  background: "none",
                  border: "1px solid rgba(0, 171, 85, 0.48)",
                },
              }}
              variant="outlined"
              onClick={() => history.push("/participant/new_datasets")}
            >
              Back
            </Button>
          </div>
        </Box>
      </Box>
      {/* <Divider />
            <FooterNew /> */}
    </Box>
  );
};

export default DataSetsView;
