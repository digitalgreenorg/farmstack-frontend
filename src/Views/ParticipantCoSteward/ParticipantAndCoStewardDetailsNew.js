import {
  Button,
  Card,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import DatasetCart from "../../Components/DatasetCard/DatasetCard";
import UrlConstants from "../../Constants/UrlConstants";
import labels from "../../Constants/labels";
import { useHistory, useParams } from "react-router-dom";
import LocalStyle from "./ParticipantCoStewardDetails.module.css";
import HTTPService from "../../Services/HTTPService";
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants";
import UrlConstant from "../../Constants/UrlConstants";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import CustomDeletePopper from "../../Components/DeletePopper/CustomDeletePopper";
import NoData from "../../Components/NoData/NoData";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const ParticipantAndCoStewardDetailsNew = (props) => {
  // to show as participants page pass isCosteward = true
  //  as participants request pass isParticipantRequest = true
  let {
    isCosteward,
    isParticipantRequest,
    user,
    userTypeCosteward,
    breadcrumbFromRoute,
    isCostewardsParticipant,
  } = props;
  const { callLoader, callToast } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const [istrusted, setistrusted] = React.useState(false);

  const [logoPath, setLogoPath] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationAddress, setOrganisationAddress] = useState("");
  const [orginsationEmail, setOrginsationEmail] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [pincode, setPincode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [datasetList, setDatasetList] = useState([]);
  const [orgId, setOrgId] = useState("");
  const [userId, setUserId] = useState("");
  const [coStewardOrParticipantsList, setCoStewardOrParticipantsList] =
    useState([]);
  const [loadMoreButton, setLoadMoreButton] = useState([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState([]);
  const [datasetLoadMoreUrl, setDatasetLoadMoreUrl] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDeletePopper = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const closePopper = () => {
    setOpen(false);
  };

  // const canBeOpen = open && Boolean(anchorEl);
  // const idNew = canBeOpen ? "transition-popper" : undefined;

  const handleLoadMoreButton = () => {
    getListOnClickOfLoadMore();
  };

  const getParticipantsOrCostewardDetails = () => {
    callLoader(true);
    let isAuthorization = user == "guest" ? false : true;
    let url = UrlConstants.base_url + UrlConstants.participant + id + "/";
    let params = {};
    if (user == "guest") {
      url =
        UrlConstants.base_url +
        // UrlConstants.microsite_participant_end_point +
        "microsite/participant/" +
        id +
        "/";
    }
    console.log("userTypeCosteward", userTypeCosteward);
    if (userTypeCosteward == "Our co-stewards") {
      params = { co_steward: "True" };
    }
    console.log("usertype", url, user);
    HTTPService("GET", url, params, false, isAuthorization)
      .then((response) => {
        // callLoader(false);
        console.log("reasponce in view details of user", response.data);
        if (response?.data?.organization_id) {
          setOrgId(response?.data?.organization_id);
        }
        if (response?.data?.user_id) {
          setUserId(response?.data?.user_id);
        }
        if (response?.data?.organization?.logo) {
          setLogoPath(response?.data?.organization?.logo);
        }
        if (response?.data?.organization?.name) {
          setOrganisationName(response?.data?.organization?.name);
        }
        if (response?.data?.organization?.address?.address) {
          setOrganisationAddress(
            response?.data?.organization?.address?.address
          );
        }
        if (response?.data?.organization?.org_email) {
          setOrginsationEmail(response?.data?.organization?.org_email);
        }
        if (response?.data?.organization?.address?.country) {
          setCountryValue(response?.data?.organization?.address?.country);
        }
        if (response?.data?.user?.phone_number) {
          setContactNumber(response?.data?.user?.phone_number);
        }
        if (response?.data?.organization?.website) {
          setWebsiteLink(response?.data?.organization?.website);
        }
        if (response?.data?.organization?.address?.pincode) {
          setPincode(response?.data?.organization?.address?.pincode);
        }
        if (response?.data?.user?.first_name) {
          setFirstName(response?.data?.user?.first_name);
        }
        if (response?.data?.user?.last_name) {
          setLastName(response?.data?.user?.last_name);
        }
        if (response?.data?.user?.email) {
          setUserEmail(response?.data?.user?.email);
        }
        // setorganisationlength(response.data.user.subscription)
        if (response?.data?.user?.approval_status) {
          setistrusted(response?.data?.user?.approval_status);
        }
        if (response?.data?.next) setLoadMoreUrl(response?.data?.next);
        else setLoadMoreUrl("");

        getDatasetOfParticipantOrCoSteward(
          false,
          response?.data?.user_id,
          response?.data?.organization_id
        ); //Get dataset list of this user
      })
      .catch(async (e) => {
        callLoader(false);
        // let error = GetErrorHandlingRoute(e);
        // console.log("Error obj", error);
        // callToast(error.message, "error", true);
        // console.log(e);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
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

  const getCoStewardOrParticipants = () => {
    callLoader(true);
    let url =
      UrlConstant.base_url + UrlConstant.participant + "?on_boarded_by=" + id;
    let isAuthorization = user == "guest" ? false : true;
    let params = {};
    if (user == "guest") {
      url =
        UrlConstants.base_url +
        // UrlConstants.microsite_participant_end_point +
        "microsite/participant/" +
        "?on_boarded_by=" +
        id;
    }
    console.log("userTypeCosteward", userTypeCosteward);
    if (userTypeCosteward == "Our co-stewards are") {
      params = { co_steward: "True" };
    }
    HTTPService("GET", url, params, false, isAuthorization)
      .then((response) => {
        callLoader(false);
        console.log("responce in getCoStewardOrParticipants", response);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        if (response?.data?.results)
          setCoStewardOrParticipantsList(response.data.results);
      })
      .catch(async (e) => {
        callLoader(false);
        // let error = GetErrorHandlingRoute(e);
        // console.log("Error obj", error);
        // callToast(error.message, "error", true);
        // console.log(e);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
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

  const getListOnClickOfLoadMore = () => {
    callLoader(true);
    HTTPService("GET", loadMoreUrl, "", false, true)
      .then((response) => {
        callLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        let datalist = coStewardOrParticipantsList;
        if (response?.data?.results) {
          let finalDataList = [...datalist, ...response.data.results];
          setCoStewardOrParticipantsList(finalDataList);
        }
      })
      .catch(async (e) => {
        callLoader(false);
        // let error = GetErrorHandlingRoute(e);
        // callToast(error.message, "error", true);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
        if (error?.toast) {
          callToast(
            error?.message || "Something went wrong",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        if (error?.path) {
          history.push(error.path);
        }
        console.log(e);
      });
  };

  const deleteParticipants = (reject) => {
    callLoader(true);
    HTTPService(
      "DELETE",
      UrlConstants.base_url + UrlConstants.participant + id + "/",
      "",
      false,
      true
    )
      .then((response) => {
        callLoader(false);
        console.log("otp valid", response);
        if (response.status === 204) {
          if (reject) {
            callToast("Rejected successfully!", "success", true);
          } else {
            callToast("Deleted successfully!", "success", true);
          }
          history.go(-1);
        }
      })
      .catch(async (e) => {
        callLoader(false);
        // let error = GetErrorHandlingRoute(e);
        // console.log("Error obj", error);
        // callToast(error.message, "error", true);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
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
        console.log("err", e);
      });
  };

  const getDatasetOfParticipantOrCoSteward = (loadMore, user_id, org_id) => {
    let url = UrlConstants.base_url + UrlConstants.costeward_onboarded_dataset;
    let isAuthorization = true;
    if (user == "guest") {
      url = UrlConstant.base_url + UrlConstant.guest_dataset_filtered_data;
      isAuthorization = false;
    }
    if (loadMore) {
      if (isCosteward) callLoader(true);
      url = datasetLoadMoreUrl;
    }
    let payload = {
      user_id: user_id,
      org_id: org_id,
      others: false,
    };

    HTTPService("POST", url, payload, false, isAuthorization)
      .then((res) => {
        callLoader(false);
        // if (isParticipantRequest) {
        // }
        console.log("res", res);
        let data = [...datasetList, ...res?.data?.results];
        setDatasetList(data);
        if (res?.data?.next) setDatasetLoadMoreUrl(res.data.next);
        else setDatasetLoadMoreUrl("");
      })
      .catch(async (e) => {
        callLoader(false);
        // let error = GetErrorHandlingRoute(e);
        // console.log("Error obj", error);
        // callToast(error.message, "error", true);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
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
        console.log("err", e);
      });
  };

  const approveParticipantsRequest = (unApprovedId, approval_endpoint) => {
    console.log("in getCoStewardOrParticipantsOnLoad");
    let method = "GET";
    let payload = "";
    callLoader(true);
    let url = "";
    if (approval_endpoint) {
      url = UrlConstant.base_url + UrlConstant.participant + unApprovedId + "/";
      method = "PUT";
      payload = {
        approval_status: true,
        id: orgId,
      };
    }

    console.log("reject url", url);
    HTTPService(method, url, payload, false, true)
      .then((response) => {
        callLoader(false);

        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        if (response?.data?.results) {
          setCoStewardOrParticipantsList(response.data.results);
        }
        if (approval_endpoint) {
          callToast("Approved successfully", "success", true);
          history.go(-1);
        }
      })
      .catch(async (e) => {
        callLoader(false);
        // let error = GetErrorHandlingRoute(e);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
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
        console.log("Error obj", error);
        callToast(error.message, "error", true);
      });
  };

  useEffect(() => {
    getParticipantsOrCostewardDetails();
    if (!isParticipantRequest) {
      getCoStewardOrParticipants();
    }
  }, []);
  console.log("logoPath", logoPath);

  return (
    <Box
      className={
        mobile || tablet ? LocalStyle.container : LocalStyle.containerMain
      }
    >
      <Row>
        <Col>
          <div className="text-left mt-50">
            <span
              className="add_light_text cursor-pointer breadcrumbItem"
              data-testid="route-breadcrubm-button"
              onClick={() => {
                let last_route = localStorage.getItem("last_route");
                localStorage.removeItem("last_route");
                if (last_route) {
                  history.push(last_route);
                } else {
                  history.push("/datahub/participants/");
                }
              }}
            >
              {breadcrumbFromRoute ?? "Participant"}
            </span>
            <span className="add_light_text ml-16">
              <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#00ab55" }} />
            </span>
            <span className="add_light_text ml-16 fw600" data-testid="label-breadcrumb">
              {isCosteward && !isParticipantRequest
                ? "Co-Steward details"
                : !isCosteward && !isParticipantRequest
                ? "Participant details"
                : "New Participants requests details"}
              {/* {isParticipantRequest ? "" : ""} */}
            </span>
          </div>
        </Col>
      </Row>
      <Row
        className={
          mobile ? "justify-content-center mt-20" : "justify-content-start"
        }
      >
        <Col xs={12} sm={6} md={4} xl={4}>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: mobile ? "100%" : "275px !important",
              height: "262px",
              background: "#ffffff",
              border: "1px solid #f2f3f5",
              boxShadow: "-40px 40px 80px rgba(145, 158, 171, 0.16)",
              borderRadius: "16px",
            }}
            className={
              mobile ? LocalStyle.highlitedImgSm : LocalStyle.highlitedImg
            }
          >
            {logoPath ? (
              <img
                src={UrlConstant.base_url_without_slash + logoPath}
                style={{ width: "179px", height: "90px" }}
                
              />
            ) : (
              <h1 className={LocalStyle.firstLetterOnLogo}>
                {organisationName?.split("")[0]?.toUpperCase()}
              </h1>
            )}
          </Card>
        </Col>
      </Row>
      <Row className={LocalStyle.section}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            // id={title + "-form-title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            {isCosteward ? "Co-steward details" : "Participants details"}
          </Typography>
          <Typography
            className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
          >
            {isCosteward
              ? "Explore details of co-steward organization."
              : !isCosteward && !isParticipantRequest
              ? "Dive into the details of participants empowering community."
              : "Organization who have requested to join your community."}
          </Typography>
        </Col>
        <Col
          className={`${LocalStyle.buttonContainer} ${mobile ? "mt-20" : ""}`}
          xs={12}
          sm={12}
          md={6}
          xl={6}
        >
          {!isParticipantRequest &&
          !userTypeCosteward &&
          user !== "guest" &&
          !isCostewardsParticipant ? (
            <>
              <CustomDeletePopper
                DeleteItem={organisationName}
                anchorEl={anchorEl}
                handleDelete={() => deleteParticipants(false)}
                id={id}
                open={open}
                closePopper={closePopper}
              />

              <Button
                variant="outlined"
                sx={{
                  color: "#FF5630",
                  fontFamily: "Public Sans",
                  fontWeight: "700",
                  fontSize: mobile ? "9px" : "15px",
                  border: "1px solid rgba(255, 86, 48, 0.48)",
                  width: "200px",
                  height: "48px",
                  marginRight: "28px",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    background: "none",
                    border: "1px solid rgba(255, 86, 48, 0.48)",
                  },
                }}
                style={{ marginRight: "0px" }}
                onClick={handleDeletePopper}
                data-testid="delete-button"
              >
                Delete {isCosteward ? "Co-steward" : "Participant"}
                <DeleteOutlineIcon
                  sx={{
                    fill: "#FF5630",
                    fontSize: "22px",
                    marginLeft: "4px",
                  }}
                />
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#00AB55",
                  fontFamily: "Public Sans",
                  fontWeight: "700",
                  fontSize: mobile ? "9px" : "15px",
                  border: "1px solid rgba(0, 171, 85, 0.48)",
                  width: "200px",
                  height: "48px",
                  textTransform: "none !important",
                  "&:hover": {
                    background: "none",
                    border: "1px solid rgba(0, 171, 85, 0.48)",
                  },
                }}
                data-testid="edit-button"
                onClick={(e) =>
                  history.push(
                    `/datahub/${
                      isCosteward ? "costeward" : "participants"
                    }/edit/${id}`
                  )
                }
              >
                Edit {isCosteward ? "Co-steward" : "Participant"}
                <EditIcon
                  sx={{
                    fill: "#00AB55",
                    fontSize: "22px",
                    marginLeft: "4px",
                    marginBottom: "2px",
                  }}
                />
              </Button>
            </>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Row className={LocalStyle.textRow}>
            <Col xs={12} sm={12} md={6} xl={6} data-testid="check_org_Name">
              <Typography
                className={`${GlobalStyle.bold400} ${GlobalStyle.size16} ${LocalStyle.lightText}`}
                
              >
                Organisation Name
              </Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
                data-testid="org_Name"
              >
                {organisationName}
              </Typography>
            </Col>
            <Col
              className={mobile ? "mt-30" : ""}
              xs={12}
              sm={12}
              md={6}
              xl={6}
            >
              <Typography>Website Link</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {websiteLink}
              </Typography>
            </Col>
          </Row>
          <Row className={LocalStyle.textRow}>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>Email</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {orginsationEmail}
              </Typography>
            </Col>
            <Col
              className={mobile ? "mt-20" : ""}
              xs={12}
              sm={12}
              md={6}
              xl={6}
            >
              <Typography>Address</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {organisationAddress}
              </Typography>
            </Col>
          </Row>
          <Row className={LocalStyle.textRow}>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>Country</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {countryValue}
              </Typography>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={LocalStyle.section}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            // id={title + "-form-title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            {isCosteward
              ? "Co-steward user details"
              : "Participant Root User Details"}
          </Typography>
          <Typography
            className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
          >
            {" "}
            {"Profile of the designated representative."}{" "}
          </Typography>
        </Col>
      </Row>
      <Row className={LocalStyle.textRow}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Row>
            <Col
              className={mobile ? "mt-20" : ""}
              xs={12}
              sm={12}
              md={6}
              xl={6}
            >
              <Typography>First Name</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {firstName}
              </Typography>
            </Col>
            <Col
              className={mobile ? "mt-20" : ""}
              xs={12}
              sm={12}
              md={6}
              xl={6}
            >
              <Typography>Last Name</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {lastName}
              </Typography>
            </Col>
          </Row>
          <Row className={mobile ? "" : "mt-30"}>
            <Col
              className={mobile ? "mt-20" : ""}
              xs={12}
              sm={12}
              md={6}
              xl={6}
            >
              <Typography>Email</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {userEmail}
              </Typography>
            </Col>
            <Col
              className={mobile ? "mt-20" : ""}
              xs={12}
              sm={12}
              md={6}
              xl={6}
            >
              <Typography>Contact Number</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {contactNumber}
              </Typography>
            </Col>
          </Row>
        </Col>
      </Row>
      {!isParticipantRequest ? (
        <>
          <Row className={LocalStyle.section}>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography
                // id={title + "-form-title"}
                className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
              >
                {isCosteward ? "Costeward Datasets" : "Participant Datasets"}
              </Typography>
              <Typography
                className={`${GlobalStyle.textDescription} text-left ${GlobalStyle.bold400} ${GlobalStyle.highlighted_text}`}
              >
                {" "}
                {isCosteward
                  ? "Browse the list of datasets contributed by this co-steward."
                  : "Browse the list of datasets contributed by this partiicpant."}{" "}
              </Typography>
            </Col>
          </Row>
          <Row>
            {datasetList?.map((dataset, index) => {
              console.log("datasetslist", dataset);
              return (
                <Col
                  onClick={() =>
                    user == "guest"
                      ? history.push(`/home/datasets/${dataset.id}`)
                      : history.push(`/datahub/new_datasets/view/${dataset.id}`)
                  }
                  xs={12}
                  sm={12}
                  md={6}
                  xl={4}
                  data-testid="view-dataset-detail"
                >
                  <DatasetCart
                    publishDate={dataset?.created_at}
                    title={dataset?.name}
                    orgnisationName={dataset?.organization?.name}
                    city={dataset?.organization?.address?.city}
                    category={Object.keys(dataset?.category)}
                    update={dataset?.updated_at}
                  />
                </Col>
              );
            })}
            {datasetList.length == 0 ? (
              <Box className={LocalStyle.noDataBox} p={3}>
                <NoData
                  title={""}
                  subTitle={"As of now there are no datasets"}
                  // primaryButton={"Add participant"}
                  // primaryButtonOnClick={() =>
                  //   history.push("/datahub/participants/add")
                  // }
                />
              </Box>
            ) : (
              ""
            )}
          </Row>
        </>
      ) : (
        ""
      )}
      {datasetLoadMoreUrl ? (
        <Row className={LocalStyle.buttonContainer}>
          <Button
            data-testid="load-more-button-test"
            id={"details-page-load-more-dataset-button"}
            variant="outlined"
            className={`${GlobalStyle.outlined_button} ${LocalStyle.loadMoreButton}`}
            onClick={() =>
              getDatasetOfParticipantOrCoSteward(true, userId, orgId)
            } // passing true will call loadmore api
          >
            Load more
          </Button>
        </Row>
      ) : (
        ""
      )}

      {isCosteward ? (
        <CoStewardAndParticipantsCard
          title={"Co-steward participants"}
          subTitle="Explore the participants who are part of this co-steward's community."
          user={user}
          guestUser={user}
          viewType={false}
          isCostewardsParticipant={user ? false : true}
          // setViewType={setViewType}
          coStewardOrParticipantsList={coStewardOrParticipantsList}
          loadMoreButton={loadMoreButton}
          handleLoadMoreButton={handleLoadMoreButton}
        />
      ) : (
        ""
      )}

      {!coStewardOrParticipantsList?.length && isCosteward ? (
        <Box className={LocalStyle.noDataBox} p={3}>
          <NoData
            title={"There are no participants"}
            subTitle={"As of now there are no participants"}
            // primaryButton={"Add participant"}
            // primaryButtonOnClick={() =>
            //   history.push("/datahub/participants/add")
            // }
          />
        </Box>
      ) : (
        ""
      )}
      {/* <Row className={LocalStyle.buttonContainer}>
        <Col xs={0} sm={0} md={2} lg={4}></Col>
        <Col xs={12} sm={12} md={8} lg={4}>
          <Button
            id={"details-page-load-more-dataset-button"}
            variant="outlined"
            className={`${GlobalStyle.outlined_button} ${LocalStyle.loadMoreButton}`}
          >
            Load more
          </Button>
        </Col>
      </Row> */}

      {isParticipantRequest ? (
        <>
          <hr />
          <Row className={LocalStyle.backButtonContainer}>
            <Button
              id={"details-page-load-more-dataset-button"}
              variant="outlined"
              className={`${GlobalStyle.primary_button} ${LocalStyle.primary_button}`}
              onClick={() => approveParticipantsRequest(id, true)}
              data-testid="approve-button-test"
            >
              Approve
            </Button>
            <Button
              id={"details-page-load-more-dataset-button"}
              variant="outlined"
              className={`${GlobalStyle.outlined_button} ${LocalStyle.backButton}`}
              onClick={() => deleteParticipants(true)}
              data-testid="reject-button-test"
            >
              Reject
            </Button>
            <Button
              id={"details-page-load-more-dataset-button"}
              variant="outlined"
              className={`${GlobalStyle.outlined_button} ${LocalStyle.borderNone}`}
              onClick={() => history.go(-1)}
              data-testid="back-button-test"
            >
              Back
            </Button>
          </Row>
        </>
      ) : (
        <Box className={LocalStyle.backButtonContainerAlingCenter}>
          <Button
            id={"details-page-load-more-dataset-button"}
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "16px",
              width: mobile ? "245px" : "350px",
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
            onClick={() => history.go(-1)}
            data-testid="back-con-button"
          >
            Back
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ParticipantAndCoStewardDetailsNew;
