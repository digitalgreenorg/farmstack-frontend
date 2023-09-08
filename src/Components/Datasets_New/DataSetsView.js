import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./DataSetsView.css";
import FileTable from "./FileTable";
import FileWithAction from "./FileWithAction";
import { useHistory, useParams } from "react-router-dom";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import ControlledAccordion from "../Accordion/Accordion";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  getTokenLocal,
  getUserMapId,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
  dateTimeFormat,
  GetErrorHandlingRoute,
  findType,
} from "../../Utils/Common";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import RequestCardForApprovalOrReject from "./RequestCardForApprovalOrReject";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CustomDeletePopper from "../DeletePopper/CustomDeletePopper";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import { Col, Row } from "react-bootstrap";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const DataSetsView = (props) => {
  const { userType, breadcrumbFromRoute } = props;
  const history = useHistory();
  const { id } = useParams();
  const {
    callLoader,
    callToast,
    setSelectedFileDetails,
    setSelectedFileDetailsForDatasetFileAccess,
    isLoading,
  } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : "144px",
    marginRight: mobile || tablet ? "30px" : "144px",
  };
  const [categories, setCategories] = useState([]);
  const [allDatasets, setAllDatasets] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [files, setFiles] = useState([
    {
      panel: 1,
      title: "Uploaded Files",
      details: [],
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

  // Categories
  // const [categorises, setCategorises] = useState({})
  const [geography, setGeography] = useState();

  // Organisation & User Details
  const [orgDetails, setOrgDetails] = useState();
  const [orgAddress, setOrgAddress] = useState();
  const [userDetails, setUserDetails] = useState();

  //Custom popper
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDeletePopper = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const closePopper = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    let accessToken = getTokenLocal() ?? false;
    let url = UrlConstant.base_url + UrlConstant.delete_dataset + id + "/";
    let isAuthorization = userType == "guest" ? false : true;
    callLoader(true);
    HTTPService(
      "DELETE",
      url,
      "",
      false,
      isAuthorization,
      isAuthorization ? accessToken : false
    )
      .then((res) => {
        callLoader(false);
        callToast("Dataset deleted successfully!", "success", true);
        if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
          history.push(`/datahub/new_datasets`);
        } else if (isLoggedInUserParticipant()) {
          history.push(`/participant/new_datasets`);
        }
      })
      .catch(async (e) => {
        callLoader(false);

        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong while deleting Dataset!",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };

  const handleEdit = () => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      history.push(`/datahub/new_datasets/edit/${id}`);
    } else if (isLoggedInUserParticipant()) {
      history.push(`/participant/new_datasets/edit/${id}`);
    }
  };
  const handleClickRoutes = () => {
    if (isLoggedInUserParticipant() && getTokenLocal() && userType != "guest") {
      return "/participant/new_datasets";
    } else if (
      (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) &&
      getTokenLocal() &&
      userType != "guest"
    ) {
      return "/datahub/new_datasets";
    } else {
      return "/home";
    }
  };
  const getDataset = () => {
    let url = "";
    if (userType == "guest") {
      url = UrlConstant.base_url + UrlConstant.datasetview__guest + id + "/";
    } else {
      if (history?.location?.state?.tab === "other_organisation") {
        url =
          UrlConstant.base_url +
          UrlConstant.datasetview +
          id +
          "/?user_map=" +
          getUserMapId();
      } else {
        url = UrlConstant.base_url + UrlConstant.datasetview + id + "/";
      }
    }
    callLoader(true);
    HTTPService("GET", url, "", false, userType == "guest" ? false : true)
      .then((response) => {
        callLoader(false);
        setDataSetName(response.data.name);
        setGeography(
          Object.keys(response.data?.geography).length
            ? response.data?.geography
            : { country: null, state: null, city: null }
        );
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
          (dataset) => dataset.source === "postgresql"
        );
        let tempRestApiFiles = response.data.datasets?.filter(
          (dataset) => dataset.source === "live_api"
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
                <Box className="d-flex">
                  <FileWithAction
                    index={index}
                    datasetId={response?.data?.id}
                    name={tempFile?.file?.slice(
                      tempFile?.file?.lastIndexOf("/") + 1
                    )}
                    id={tempFile.id}
                    fileType={tempFile.accessibility}
                    usagePolicy={tempFile.usage_policy}
                    files={files}
                    getDataset={getDataset}
                    userType={userType === "guest" ? "guest" : ""}
                    isOther={
                      history?.location?.state?.tab === "other_organisation" ||
                      userType === "guest"
                        ? true
                        : false
                    }
                    fileSize={tempFile?.file_size}
                  />
                </Box>
                <FileTable fileData={tempFile} />
              </Box>
            );
          });
          newArr[0].details = prepareFilesContent;
        }
        let prepareSqlFilesContent = [];
        if (tempSqlFiles && tempSqlFiles?.length > 0) {
          tempSqlFiles.forEach((tempFile, index) => {
            prepareSqlFilesContent.push(
              <Box>
                <Box className="d-flex">
                  <FileWithAction
                    index={index}
                    datasetId={response?.data?.id}
                    name={tempFile?.file?.slice(
                      tempFile.file.lastIndexOf("/") + 1
                    )}
                    id={tempFile.id}
                    fileType={tempFile.accessibility}
                    usagePolicy={tempFile.usagePolicy}
                    files={files}
                    getDataset={getDataset}
                    userType={userType === "guest" ? "guest" : ""}
                    isOther={
                      history?.location?.state?.tab === "other_organisation" ||
                      userType === "guest"
                        ? true
                        : false
                    }
                    fileSize={tempFile?.file_size}
                  />
                </Box>
                {/* <Box className="text-left mt-20 w-100 overflow_x_scroll"> */}
                <FileTable fileData={tempFile} />
                {/* </Box> */}
              </Box>
            );
          });
          newArr[1].details = prepareSqlFilesContent;
        }
        let preparePostgresFilesContent = [];
        if (tempPostgresFiles && tempPostgresFiles?.length > 0) {
          tempPostgresFiles.forEach((tempFile, index) => {
            preparePostgresFilesContent.push(
              <Box>
                <Box className="d-flex">
                  <FileWithAction
                    index={index}
                    datasetId={response?.data?.id}
                    name={tempFile?.file?.slice(
                      tempFile.file.lastIndexOf("/") + 1
                    )}
                    id={tempFile.id}
                    fileType={tempFile.accessibility}
                    usagePolicy={tempFile.usagePolicy}
                    files={files}
                    getDataset={getDataset}
                    userType={userType === "guest" ? "guest" : ""}
                    isOther={
                      history?.location?.state?.tab === "other_organisation" ||
                      userType === "guest"
                        ? true
                        : false
                    }
                    fileSize={tempFile?.file_size}
                  />
                </Box>
                {/* <Box className="text-left mt-20 w-100 overflow_x_scroll"> */}
                <FileTable fileData={tempFile} />
                {/* </Box> */}
              </Box>
            );
          });
          newArr[2].details = preparePostgresFilesContent;
        }
        let prepareApiFilesContent = [];
        if (tempRestApiFiles && tempRestApiFiles?.length > 0) {
          tempRestApiFiles.forEach((tempFile, index) => {
            prepareApiFilesContent.push(
              <Box>
                <Box className="d-flex">
                  <FileWithAction
                    index={index}
                    datasetId={response?.data?.id}
                    name={tempFile?.file?.slice(
                      tempFile.file.lastIndexOf("/") + 1
                    )}
                    id={tempFile.id}
                    fileType={tempFile.accessibility}
                    usagePolicy={tempFile.usagePolicy}
                    files={files}
                    getDataset={getDataset}
                    userType={userType === "guest" ? "guest" : ""}
                    isOther={
                      history?.location?.state?.tab === "other_organisation" ||
                      userType === "guest"
                        ? true
                        : false
                    }
                    fileSize={tempFile?.file_size}
                  />
                </Box>
                {/* <Box className="text-left mt-20 w-100 overflow_x_scroll"> */}
                <FileTable fileData={tempFile} />
                {/* </Box> */}
              </Box>
            );
          });
          newArr[3].details = prepareApiFilesContent;
        }
        setFiles(newArr);

        // preparing categories for accordion
        let prepareArr = [];
        let categoryJson = response?.data?.category;
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
      .catch(async (e) => {
        callLoader(false);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
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

  useEffect(() => {
    setSelectedFileDetails(null);
    setSelectedFileDetailsForDatasetFileAccess(null);
  }, []);
  useEffect(() => {
    getDataset();
  }, [id, approvalStatus]);

  return (
    !isLoading && (
      <Box>
        <Box sx={containerStyle}>
          <div className="text-left mt-50">
            <span
              className="add_light_text cursor-pointer breadcrumbItem"
              onClick={() => history.push(handleClickRoutes())}
              data-testid="goPrevRoute"
            >
              {breadcrumbFromRoute ?? "Datasets"}
            </span>
            <span className="add_light_text ml-11">
              {/* <img src={require("../../Assets/Img/dot.svg")} /> */}
              <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#00A94F" }} />
            </span>
            <span className="add_light_text ml-11 fw600">
              {history.location?.state?.tab === "my_organisation"
                ? "My Organisation"
                : "Other Organisation"}
            </span>
          </div>
          <Box
            className={
              mobile
                ? ""
                : "d-flex justify-content-between align-items-baseline"
            }
          >
            <div className="bold_title mt-50">
              {"Dataset Details"}
              <Typography
                className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
              >
                {" "}
                {history.location?.state?.tab === "my_organisation"
                  ? "Explore in-depth information about your uploaded dataset."
                  : "Explore the detailed information and characteristics of datasets."}{" "}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: mobile ? "left" : "space-evenly",
                alignItems: "center",
              }}
            >
              {history.location?.state?.tab === "my_organisation" &&
              userType !== "guest" ? (
                <Box className={mobile ? "d-flex" : ""}>
                  <CustomDeletePopper
                    DeleteItem={dataSetName}
                    anchorEl={anchorEl}
                    handleDelete={handleDelete}
                    id={id}
                    open={open}
                    closePopper={closePopper}
                  />
                  <Button
                    sx={{
                      color: "#FF5630",
                      fontFamily: "Public Sans",
                      fontWeight: "700",
                      fontSize: mobile ? "11px" : "15px",
                      border: "1px solid rgba(255, 86, 48, 0.48)",
                      width: "100px",
                      height: "48px",
                      marginRight: "28px",
                      textTransform: "none",
                      "&:hover": {
                        background: "none",
                        border: "1px solid rgba(255, 86, 48, 0.48)",
                      },
                    }}
                    variant="outlined"
                    onClick={handleDeletePopper}
                  >
                    Delete
                    <DeleteOutlineIcon
                      sx={{
                        fill: "#FF5630",
                        fontSize: "22px",
                        marginLeft: "4px",
                      }}
                    />
                  </Button>
                  <Button
                    sx={{
                      color: "#00A94F",
                      fontFamily: "Public Sans",
                      fontWeight: "700",
                      fontSize: mobile ? "11px" : "15px",
                      border: "1px solid rgba(0, 171, 85, 0.48)",
                      width: "100px",
                      marginRight: "28px",
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
                    Edit
                    <EditIcon
                      sx={{
                        fill: "#00A94F",
                        fontSize: "22px",
                        marginLeft: "4px",
                        marginBottom: "2px",
                      }}
                    />
                  </Button>
                  <Button
                    sx={{
                      color: "#3366FF",
                      fontFamily: "Public Sans",
                      fontWeight: "700",
                      fontSize: mobile ? "11px" : "15px",
                      border: "1px solid #3366FF",
                      width: "130px",
                      height: "48px",
                      textTransform: "none !important",
                      "&:hover": {
                        background: "none",
                        border: "1px solid #3366FF",
                      },
                    }}
                    onClick={() => {
                      history.push(
                        `/${findType()}/dashboard-api-request/${id}`,
                        {
                          data: "",
                          value: history.location?.state?.tab,
                        }
                      );
                    }}
                    variant="outlined"
                  >
                    Dashboard{" "}
                    <BarChartIcon
                      sx={{
                        fill: "#3366FF",
                        fontSize: "22px",
                        marginLeft: "4px",
                        marginBottom: "2px",
                      }}
                    />
                  </Button>
                </Box>
              ) : (
                <Box className={mobile ? "d-flex" : ""}>
                  <CustomDeletePopper
                    DeleteItem={dataSetName}
                    anchorEl={anchorEl}
                    handleDelete={handleDelete}
                    id={id}
                    open={open}
                    closePopper={closePopper}
                  />
                  <Button
                    sx={{
                      color: "#3366FF",
                      fontFamily: "Public Sans",
                      fontWeight: "700",
                      fontSize: mobile ? "11px" : "15px",
                      border: "1px solid #3366FF",
                      width: "130px",
                      height: "48px",
                      textTransform: "none !important",
                      "&:hover": {
                        background: "none",
                        border: "1px solid #3366FF",
                      },
                    }}
                    onClick={() =>
                      userType == "guest"
                        ? history.push(`/home/dashboard-api-request/${id}`, {
                            data: "",
                            value: history.location?.state?.tab,
                          })
                        : history.push(
                            `/${findType()}/dashboard-api-request/${id}`,
                            {
                              data: "",
                              value: history.location?.state?.tab,
                            }
                          )
                    }
                    variant="outlined"
                  >
                    Dashboard{" "}
                    <BarChartIcon
                      sx={{
                        fill: "#3366FF",
                        fontSize: "22px",
                        marginLeft: "4px",
                        marginBottom: "2px",
                      }}
                    />
                  </Button>
                </Box>
              )}
            </div>
          </Box>
          {/* <div className="bold_title mt-50">{"Dataset details"}</div> */}
          <Box className={mobile ? "mt-38" : "d-flex mt-38"}>
            <Box sx={{ width: mobile ? "300px" : "638px" }}>
              <Typography className="view_agriculture_heading text-left ellipsis">
                {dataSetName}
              </Typography>
              <Typography className="view_datasets_light_text text-left mt-20">
                Description
              </Typography>
              <Typography className="view_datasets_bold_text wordWrap text-left mt-3">
                {dataSetDescription}
              </Typography>
            </Box>
            <Box className={mobile ? "" : "ml-134"}>
              {/* <Box className="text-left">
              <div className="type_dataset">Public dataset</div>
            </Box> */}
              <Typography
                className={`view_datasets_light_text text-left ${
                  mobile ? "mt-25" : ""
                }`}
              >
                Data Capture Interval
              </Typography>
              <Typography className="view_datasets_bold_text text-left mt-3">
                {fromDate !== "NA" && toDate !== "NA"
                  ? dateTimeFormat(fromDate) + " - " + dateTimeFormat(toDate)
                  : "Not Available"}
              </Typography>
              <Typography className="view_datasets_light_text text-left mt-25">
                Geography
              </Typography>
              <Typography className="view_datasets_bold_text text-left mt-3 ellipsis maxWidth400">
                {/* IF GEOGRAPHY COUNTRY SAATE AND CITY ALL ARE "NA" THEN SHOW "Not Available" */}
                {!geography?.country?.name &&
                !geography?.state?.name &&
                !geography?.city?.name
                  ? "Not Available"
                  : ""}
                {geography?.country?.name
                  ? geography?.country?.name + ", "
                  : ""}
                {geography?.state?.name ? geography?.state?.name + ", " : ""}
                {geography?.city?.name ? geography?.city?.name : ""}
              </Typography>
              <Typography className="view_datasets_light_text text-left mt-25">
                Constantly updating{" "}
              </Typography>
              <Typography className="view_datasets_bold_text text-left mt-3">
                {isUpdating ? "Yes" : "No"}
              </Typography>
            </Box>
          </Box>
          <div className="bold_title mt-50">
            {categories && categories.length ? "Dataset category" : ""}
          </div>
          <Box className="mt-20">
            <ControlledAccordion
              isCustomStyle={true}
              titleStyle={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                maxWidth: "800px",
              }}
              isCustomDetailStyle={true}
              customDetailsStyle={{
                wordBreak: "break-all",
                maxWidth: "33%",
                textAlign: "left",
                width: "30%",
                display: "inline-block",
                marginBottom: "15px",
              }}
              data={categories}
            />
          </Box>
          <div className="bold_title mt-50">{"Dataset files"}</div>
          <Alert
            severity="warning"
            className="view_datasets_light_text text-left mt-20"
          >
            <span className="view_datasets_bold_text">Note: </span>This dataset
            is solely meant to be used as a source of information. Even through
            accuracy is the goal, the steward is not accountable for the
            information. Please let the admin know if you have any information
            you think is inaccurate.
          </Alert>
          <Box className="mt-20">
            <ControlledAccordion
              data={files}
              emptyMessage={"No dataset files uploaded"}
              isTables={true}
              shouldAlwaysOpen={true}
            />
          </Box>
          <Divider className="mt-50" />
          {history.location?.state?.tab === "my_organisation" &&
          userType !== "guest" ? (
            <>
              <RequestCardForApprovalOrReject
                data={allDatasets}
                setApprovalStatus={setApprovalStatus}
                approvalStatus={approvalStatus}
              />
              {/* <Divider className="mt-50" /> */}
            </>
          ) : (
            <></>
          )}
          {history.location?.state?.tab !== "my_organisation" && (
            <div className="bold_title mt-50">
              {"Organisation Details"}
              <Typography
                className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
              >
                Details of the organization that owns the dataset.
              </Typography>
            </div>
          )}
          {history.location?.state?.tab !== "my_organisation" && (
            <Box>
              <Card className="organisation_icon_card">
                <Box className="d-flex h-100 align-items-center">
                  {orgDetails?.logo ? (
                    <img
                      style={{ width: "100%" }}
                      src={orgDetails?.logo}
                      alt="footerLogo"
                    />
                  ) : (
                    <img
                      style={{ width: "100%" }}
                      src={require("../../Assets/Img/footer_logo.svg")}
                      alt="footerLogo"
                    />
                  )}
                </Box>
              </Card>

              <Row className="">
                <Col xl={4} lg={4} md={4} sm={6} className="text-left mt-30">
                  <Typography className="view_datasets_light_text">
                    Organisation name
                  </Typography>
                  <Typography
                    className={
                      mobile
                        ? "view_datasets_bold_text_sm"
                        : "view_datasets_bold_text break_word"
                    }
                  >
                    {orgDetails?.name}
                  </Typography>
                </Col>
                {/* <hr /> */}
                <Col xl={4} lg={4} md={4} sm={6} className="text-left mt-30">
                  <Typography className="view_datasets_light_text">
                    Organisation address
                  </Typography>
                  <Typography
                    className={
                      mobile
                        ? "view_datasets_bold_text_sm"
                        : "view_datasets_bold_text break_word"
                    }
                  >
                    {orgAddress}
                  </Typography>
                </Col>
                <Col xl={4} lg={4} md={6} sm={6} className={`text-left mt-30`}>
                  <Typography className="view_datasets_light_text">
                    Root user details
                  </Typography>
                  <Typography
                    className={
                      mobile
                        ? "view_datasets_bold_text_sm"
                        : "view_datasets_bold_text break_word"
                    }
                  >
                    {userDetails?.first_name + " " + userDetails?.last_name}
                  </Typography>
                  <Typography
                    className={
                      mobile
                        ? "view_datasets_bold_text_sm"
                        : "view_datasets_bold_text break_word"
                    }
                  >
                    {userDetails?.email}
                  </Typography>
                </Col>
              </Row>
            </Box>
          )}
          <Divider className="mt-50" />

          <div className="d-flex justify-content-end mt-50">
            <Button
              sx={{
                fontFamily: "Arial",
                fontWeight: 700,
                fontSize: "16px",
                width: mobile ? "145px" : "171px",
                height: "48px",
                border: "1px solid rgba(0, 171, 85, 0.48)",
                borderRadius: "8px",
                color: "#00A94F",
                textTransform: "none",
                marginLeft: "100px",
                "&:hover": {
                  background: "none",
                  border: "1px solid rgba(0, 171, 85, 0.48)",
                },
              }}
              variant="outlined"
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          </div>
        </Box>
      </Box>
    )
  );
};

export default DataSetsView;
