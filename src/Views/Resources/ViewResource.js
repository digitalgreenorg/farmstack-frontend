import {
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
  Divider,
  Card,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
  TableContainer,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import { useHistory, useParams } from "react-router-dom";
import {
  GetErrorHandlingRoute,
  dateTimeFormat,
  getTokenLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
  toTitleCase,
} from "../../Utils/Common";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CustomDeletePopper from "../../Components/DeletePopper/CustomDeletePopper";
import { Col, Row } from "react-bootstrap";
import File from "../../Components/Datasets_New/TabComponents/File";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import ControlledAccordion from "../../Components/Accordion/Accordion";
import labels from "../../Constants/labels";
import RequestTab from "./TabComponents/RequestTab";
import ContentTab from "./TabComponents/ContentTab";
import RetrievalTab from "./TabComponents/RetrievalTab";
import EmptyFile from "../../Components/Datasets_New/TabComponents/EmptyFile";
import StarIcon from "@mui/icons-material/Star";

const rows = [];

const ViewResource = (props) => {
  const { userType, breadcrumbFromRoute } = props;
  const { callLoader, callToast, adminData, isLoading } =
    useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const history = useHistory();
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const [resourceName, setResourceName] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [publishedOn, setPublishedOn] = useState("");
  const [categories, setCategories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [usagePolicies, setUsagePolicies] = useState([]);

  // Organisation & User Details
  const [orgDetails, setOrgDetails] = useState();
  const [orgAddress, setOrgAddress] = useState();
  const [userDetails, setUserDetails] = useState();

  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : "144px",
    marginRight: mobile || tablet ? "30px" : "144px",
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  const handleDeletePopper = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const closePopper = () => {
    setOpen(false);
  };

  let resources = labels.renaming_modules.resources;
  let resource = labels.renaming_modules.resource;
  let Resources = toTitleCase(labels.renaming_modules.resources);
  let Resource = toTitleCase(labels.renaming_modules.resource);

  const handleDelete = () => {
    let accessToken = getTokenLocal() ?? false;
    let url = UrlConstant.base_url + UrlConstant.resource_endpoint + id + "/";
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
        callToast("Resource deleted successfully!", "success", true);
        if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
          history.push(`/datahub/resources`);
        } else if (isLoggedInUserParticipant()) {
          history.push(`/participant/resources`);
        }
      })
      .catch(async (e) => {
        callLoader(false);

        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong while deleting Resource!",
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
      history.push(`/datahub/resources/edit/${id}`);
    } else if (isLoggedInUserParticipant()) {
      history.push(`/participant/resources/edit/${id}`);
    }
  };

  const handleClickRoutes = () => {
    if (breadcrumbFromRoute == "Home") {
      history.push("/home");
    } else {
      if (isLoggedInUserParticipant() && getTokenLocal()) {
        return "/participant/resources";
      } else if (
        isLoggedInUserAdmin() ||
        (isLoggedInUserCoSteward() && getTokenLocal())
      ) {
        return "/datahub/resources";
      }
    }
  };
  const handleDownload = (file) => {
    window.open(file, "_blank");
  };

  const getResource = async () => {
    callLoader(true);

    let url =
      UrlConstant.base_url +
      (userType !== "guest"
        ? UrlConstant.resource_endpoint
        : UrlConstant.microsite_resource_endpoint) +
      id +
      "/";

    await HTTPService(
      "GET",
      url,
      "",
      false,
      userType === "guest" ? false : true
    )
      .then((response) => {
        callLoader(false);
        setResourceName(response.data?.title);
        setResourceDescription(response.data?.description);
        setPublishedOn(response.data?.created_at);
        let tempFiles = response.data.resources?.filter(
          (resource) => resource.type === "file"
        );
        let tempPdfFiles = response.data.resources?.filter(
          (resource) => resource.type === "pdf"
        );
        let tempVideoFiles = response.data.resources?.filter(
          (resource) => resource.type === "youtube"
        );

        setUploadedFiles(tempFiles);
        setPdfFiles(tempPdfFiles);
        setVideoFiles(tempVideoFiles);

        let tempCategories = [];
        let prep = response?.data?.categories?.forEach((item, index) => {
          let prepareCheckbox = item?.subcategories?.map((res, ind) => {
            return res?.name;
          });
          let obj = {
            panel: index + 1,
            title: item?.name,
            details: prepareCheckbox ? prepareCheckbox : [],
          };
          tempCategories = tempCategories.concat(obj);
        });
        setCategories(tempCategories);
        setUserDetails(response?.data?.user);
        setOrgDetails(response?.data?.organization);
        let tempOrgAddress =
          response?.data?.organization?.address?.address +
          ", " +
          response?.data?.organization?.address?.country +
          ", " +
          response?.data?.organization?.address?.pincode;
        setOrgAddress(tempOrgAddress);
        setUsagePolicies(response?.data?.resource_usage_policy);
      })
      .catch(async (e) => {
        callLoader(false);
        console.log(e);
        let error = await GetErrorHandlingRoute(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong while loading resource",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error.path) {
          history.push(error.path);
        }
      });
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
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
              showEmbedding={true}
              collections={item?.collections}
              url={item?.type === "file" ? item?.file : item?.url}
              id={item?.id}
              type={item?.type}
              iconcolor={"#424242"}
            />
          );
        });
        return arr;
      } else if (data && type === "pdf_file") {
        let arr = data?.map((item, index) => {
          let ind = item?.file?.lastIndexOf("/");
          let tempFileName = item?.file?.slice(ind + 1);
          return (
            <File
              index={index}
              name={item?.url ? item.url : tempFileName}
              // size={null}
              showEmbedding={true}
              collections={item?.collections}
              url={item?.type === "file" ? item?.file : item?.url}
              id={item?.id}
              type={item?.type}
              iconcolor={"#424242"}
            />
          );
        });
        return arr;
      } else if (data && type === "video_file") {
        let arr = data?.map((item, index) => {
          let ind = item?.file?.lastIndexOf("/");
          let tempFileName = item?.file?.slice(ind + 1);
          return (
            <File
              index={index}
              name={item?.url ? item.url : tempFileName}
              // size={null}
              showEmbedding={true}
              collections={item?.collections}
              url={item?.type === "file" ? item?.file : item?.url}
              id={item?.id}
              type={item?.type}
              iconcolor={"#424242"}
            />
          );
        });
        return arr;
      } else {
        return [<EmptyFile text={"You have not uploaded any files"} />];
      }
    };
    if (uploadedFiles || pdfFiles || videoFiles) {
      const data = [
        {
          panel: 1,
          title: (
            <>
              File Upload
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
              : [<EmptyFile text={"You have not uploaded any file"} />],
        },
        {
          panel: 2,
          title: (
            <>
              PDFs
              {pdfFiles?.length > 0 ? (
                <span style={{ color: "#ABABAB", marginLeft: "4px" }}>
                  (Total Files: {pdfFiles?.length} )
                </span>
              ) : (
                <></>
              )}
            </>
          ),
          details:
            pdfFiles?.length > 0
              ? prepareFile(pdfFiles, "pdf_file")
              : [<EmptyFile text={"You have not uploaded any pdf file"} />],
        },
        {
          panel: 3,
          title: (
            <>
              Video
              {videoFiles?.length > 0 ? (
                <span style={{ color: "#ABABAB", marginLeft: "4px" }}>
                  (Total Files: {videoFiles?.length} )
                </span>
              ) : (
                <></>
              )}
            </>
          ),
          details:
            videoFiles?.length > 0
              ? prepareFile(videoFiles, "video_file")
              : [<EmptyFile text={"You have not uploaded any video"} />],
        },
      ];
      return data;
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (id) {
      getResource();
    }
  }, [adminData]);
  return (
    !isLoading && (
      <Box sx={containerStyle}>
        <div className="text-left mt-50">
          <span
            className="add_light_text cursor-pointer breadcrumbItem"
            onClick={() => history.push(handleClickRoutes())}
            id="add-dataset-breadcrum"
            data-testid="goPrevRoute"
          >
            {breadcrumbFromRoute ?? "Content"}
          </span>
          <span className="add_light_text ml-11">
            <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#424242" }} />
          </span>
          <span className="add_light_text ml-11 fw600">View {Resource}</span>
        </div>
        <Box
          className={
            mobile ? "" : "d-flex justify-content-between align-items-baseline"
          }
        >
          <div className="bold_title mt-50">{`${Resource} Details`}</div>
          {getTokenLocal() &&
          history.location?.state?.tab === 0 &&
          !history.location?.state?.userType ? (
            <Box className={mobile ? "d-flex" : ""} sx={{ minWidth: "45%" }}>
              <CustomDeletePopper
                DeleteItem={resourceName}
                anchorEl={anchorEl}
                handleDelete={handleDelete}
                id={id}
                open={open}
                closePopper={closePopper}
              />
              <Button
                sx={{
                  color: "#424242",
                  fontFamily: "Public Sans",
                  fontWeight: "700",
                  fontSize: mobile ? "11px" : "14px",
                  border: "1px solid #424242",
                  padding: "8px 16px",
                  height: "48px",
                  marginRight: "28px",
                  textTransform: "none",
                  "&:hover": {
                    background: "none",
                    border: "1px solid #424242",
                  },
                }}
                variant="outlined"
                onClick={handleDeletePopper}
              >
                Delete
                <img
                  src={require("../../Assets/Img/delete_grey.svg")}
                  alt="new"
                  style={{
                    fill: "#424242",
                    fontSize: "22px",
                    marginLeft: "4px",
                  }}
                />
              </Button>
              <Button
                sx={{
                  color: "#424242",
                  fontFamily: "Public Sans",
                  fontWeight: "700",
                  fontSize: mobile ? "11px" : "14px",
                  border: "1px solid #424242",
                  padding: "8px 16px",
                  marginRight: "28px",
                  height: "48px",
                  textTransform: "none !important",
                  "&:hover": {
                    background: "none",
                    border: "1px solid #424242",
                  },
                }}
                onClick={handleEdit}
                variant="outlined"
              >
                Edit
                <EditNoteIcon
                  sx={{
                    fill: "#424242",
                    fontSize: "22px",
                    marginLeft: "4px",
                  }}
                />
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <Box className={mobile ? "mt-38" : "d-flex mt-38"}>
          <Box sx={{ width: mobile ? "auto" : "638px" }}>
            <Typography className="view_agriculture_heading text-left ellipsis">
              {resourceName ? resourceName : "NA"}
            </Typography>
            <Typography className="view_datasets_light_text text-left mt-20">
              Description
            </Typography>
            <Typography className="view_datasets_bold_text wordWrap text-left mt-3">
              {resourceDescription ? resourceDescription : "NA"}
            </Typography>
          </Box>
          <Box className={mobile ? "" : "ml-134"}>
            <Typography
              className={`view_datasets_light_text text-left ${
                mobile ? "mt-25" : ""
              }`}
            >
              Published on
            </Typography>
            <Typography className="view_datasets_bold_text text-left mt-3">
              {publishedOn ? dateTimeFormat(publishedOn, false) : "NA"}
            </Typography>
            <Typography className="view_datasets_light_text text-left mt-25">
              No.of files
            </Typography>
            <Typography className="view_datasets_bold_text text-left mt-3">
              {uploadedFiles ? uploadedFiles.length : "1"}
            </Typography>
          </Box>
        </Box>
        <Divider className="mt-50" />
        <Box className="bold_title mt-50">
          {categories && categories.length ? `${Resource} category` : ""}
        </Box>
        <Box className="mt-20">
          <ControlledAccordion
            data={categories}
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
            isCustomArrowColor={true}
            customDetailsStyle={{ display: "inline-block", width: "30%" }}
            addHeaderBackground={true}
            headerBackground={"#F6F6F6"}
          />
        </Box>
        <Divider className="mt-50" />
        <Box className="mt-50">
          <Typography
            sx={{
              fontFamily: "Arial !important",
              fontWeight: "600",
              fontSize: "32px",
              lineHeight: "40px",
              color: "#000000",
              textAlign: "left",
            }}
          >
            {Resource} Collection
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "22px",
              color: "#424242",
              marginTop: "15px",
              fontFamily: "Roboto",
            }}
          >
            <strong>Note:</strong>
            <div
              style={{
                textAlign: "left",
                fontWeight: "400",
                fontSize: "18px",
                lineHeight: "30px",
                color: "#424242",
                marginTop: "15px",
                fontFamily: "Roboto",
              }}
            >
              This {resource} is solely meant to be used as a source of
              information. Even through accuracy is the goal, the person is not
              accountable for the information. Please let the admin know if you
              have any information you think is inaccurate.
            </div>
          </Typography>
        </Box>
        <Box
          className="mt-50"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            borderBottom: "1px solid #3D4A52 !important",
            display: "flex",
          }}
        >
          <Tabs
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#00A94F !important",
              },
              "& .MuiTab-root": {
                color: "#637381 !important",
                borderLeft: "none !important",
                borderTop: "none !important",
                borderRight: "none !important",
              },
              "& .Mui-selected": { color: "#00A94F !important" },
              margin: "auto",
            }}
            variant="scrollable"
            // scrollButtons
            allowScrollButtonsMobile
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Box>
                  <img
                    src={require("../../Assets/Img/asset_file.svg")}
                    width={"37px"}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      marginLeft: "15px",
                      fontFamily: "Roboto",
                      color: "#424242",
                      fontWeight: value === 0 ? 600 : 400,
                      textTransform: "none",
                    }}
                  >
                    Assets
                  </span>
                </Box>
              }
              sx={{
                width: "200px",
              }}
            />
            <Tab
              label={
                <Box>
                  <img
                    src={require("../../Assets/Img/request.svg")}
                    width={"37px"}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      marginLeft: "15px",
                      fontFamily: "Roboto",
                      color: "#424242",
                      fontWeight: value === 1 ? 600 : 400,
                      textTransform: "none",
                    }}
                  >
                    Requests
                  </span>
                </Box>
              }
              sx={{
                width: "200px",
              }}
            />
            {getTokenLocal() &&
              history.location?.state?.tab === 0 &&
              !history.location?.state?.userType && (
                <Tab
                  label={
                    <Box>
                      <img
                        src={require("../../Assets/Img/retrieval.svg")}
                        width={"37px"}
                      />
                      <span
                        style={{
                          fontSize: "15px",
                          marginLeft: "15px",
                          fontFamily: "Roboto",
                          color: "#424242",
                          fontWeight: value === 2 ? 600 : 400,
                          textTransform: "none",
                        }}
                      >
                        Retrieval
                      </span>
                    </Box>
                  }
                  sx={{
                    width: "200px",
                  }}
                />
              )}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ContentTab getAccordionDataForLinks={getAccordionDataForLinks} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RequestTab
            userType={userType}
            resourceId={id}
            usagePolicies={usagePolicies}
            getResource={getResource}
            isOther={history.location?.state?.tab === 1 ? true : false}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RetrievalTab />
        </TabPanel>
        <Divider className="mt-50" />
        <Box className="mt-50">
          <Typography
            sx={{
              fontFamily: "Arial !important",
              fontWeight: "600",
              fontSize: "32px",
              lineHeight: "40px",
              color: "#000000",
              textAlign: "left",
            }}
          >
            Feedback Table
          </Typography>
          <TableContainer
            className="mt-30"
            sx={{
              borderRadius: "12px",
            }}
            component={Paper}
          >
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="simple table"
            >
              <TableHead
                sx={{
                  "& .MuiTableCell-head": {
                    backgroundColor: "#F6F6F6",
                  },
                }}
              >
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Flew Questions</TableCell>
                  <TableCell align="left">Bot Replies</TableCell>
                  <TableCell align="left">Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.length > 0 ? (
                  rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": {
                          backgroundColor: "#DEFFF1",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.questions}</TableCell>
                      <TableCell align="left">{row.replies}</TableCell>
                      <TableCell align="left">
                        {
                          <>
                            {row.rating}
                            <StarIcon
                              style={{
                                height: "18px",
                                marginTop: "-4px",
                                fill: "#FFB400",
                              }}
                            />
                          </>
                        }
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "20px",
                        fontWeight: "400",
                        lineHeight: 3,
                      }}
                      colSpan={12}
                    >
                      Currently, there are no feedbacks available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Divider className="mt-50" />
        <Box className="mt-50">
          <Typography
            sx={{
              fontFamily: "Arial !important",
              fontWeight: "600",
              fontSize: "32px",
              lineHeight: "40px",
              color: "#000000",
              textAlign: "left",
            }}
          >
            Organisation Details
          </Typography>
          <Card className="organisation_icon_card" sx={{ marginTop: "30px" }}>
            <Box className="d-flex h-100 align-items-center">
              {orgDetails?.logo ? (
                <img
                  style={{ width: "100%", padding: "6px" }}
                  src={orgDetails?.logo}
                  alt="org logo"
                />
              ) : (
                <h1 style={{ fontSize: "60px", textAlign: "center" }}>
                  {orgDetails?.name?.split("")[0]?.toUpperCase()}
                </h1>
              )}
            </Box>
          </Card>
          <Row>
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
      </Box>
    )
  );
};

export default ViewResource;
