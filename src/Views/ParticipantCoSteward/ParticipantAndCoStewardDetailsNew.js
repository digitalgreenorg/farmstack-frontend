import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import CustomCard from "../../Components/Card/CustomCard";
import DatasetCart from "../../Components/DatasetCard/DatasetCard";
import UrlConstants from "../../Constants/UrlConstants";
import labels from "../../Constants/labels";
import { useHistory, useParams } from "react-router-dom";
import LocalStyle from "./ParticipantCoStewardDetails.module.css";
import HTTPService from "../../Services/HTTPService";
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants";
import UrlConstant from "../../Constants/UrlConstants";
import { getUserLocal } from "../../Utils/Common";

const ParticipantAndCoStewardDetailsNew = (props) => {
  let datasets = [0, 0, 0, 0, 0, 0];

  let { isCosteward } = props;

  const [screenlabels, setscreenlabels] = useState(labels["en"]);
  // const [organisationname, setorganisationname] = useState("");
  // const [organisationaddress, setorganisationaddress] = useState("");
  // const [orginsationemail, setorginsationemail] = useState("");
  // const [countryvalue, setcountryvalue] = useState("");
  // const [contactnumber, setcontactnumber] = useState("");
  // const [websitelink, setwebsitelink] = useState("");

  // const [organisationlength, setorganisationlength] = useState(3);
  const [istrusted, setistrusted] = React.useState(false);
  const [isorganisationemailerror, setisorganisationemailerror] =
    useState(false);
  const [iscontactnumbererror, setiscontactnumbererror] = useState(false);
  const [iswebsitelinkrerror, setwebsitelinkerror] = useState(false);
  const [isuseremailerror, setisuseremailerror] = useState(false);
  const [isSuccess, setisSuccess] = useState(true);
  const [isDelete, setisDelete] = useState(false);
  const [isDeleteCoSteward, setisDeleteCoSteward] = useState(false);
  const [isDeleteSuccess, setisDeleteSuccess] = useState(false);

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
  const [coStewardOrParticipantsList, setCoStewardOrParticipantsList] =
    useState([]);
  const [loadMoreButton, setLoadMoreButton] = useState([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState([]);

  const [isLoader, setIsLoader] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const handleLoadMoreButton = () => {
    getListOnClickOfLoadMore();
  };

  const getParticipantsOrCostewardDetails = () => {
    setIsLoader(true);

    HTTPService(
      "GET",
      UrlConstants.base_url + UrlConstants.participant + id + "/",
      "",
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        console.log("reasponce in view details", response.data);
        setLogoPath(response?.organization?.logo);
        setOrganisationName(response?.data?.organization?.name);
        setOrganisationAddress(
          response?.data?.organization?.address?.address ||
            JSON.parse(response?.data?.organization?.address)?.address
        );
        setOrginsationEmail(response?.data?.organization?.org_email);
        setCountryValue(
          response?.data?.organization?.address?.country ||
            JSON.parse(response?.data?.organization?.address)?.country
        );
        setContactNumber(response?.data?.user?.phone_number);
        setWebsiteLink(response?.data?.organization?.website);
        setPincode(
          response?.data?.organization?.address?.pincode ||
            JSON.parse(response?.data?.organization?.address)?.pincode
        );
        setFirstName(response?.data?.user?.first_name);
        setLastName(response?.data?.user?.last_name);
        setUserEmail(response?.data?.user?.email);
        // setorganisationlength(response.data.user.subscription)
        setistrusted(response?.data?.user?.approval_status);
        console.log("otp valid", response.data);
      })
      .catch((e) => {
        setIsLoader(false);
        // history.push(GetErrorHandlingRoute(e));
        console.log(e);
      });
  };

  const getListOfParticipantsOrCosteward = () => {
    setIsLoader(true);

    HTTPService(
      "GET",
      UrlConstants.base_url + UrlConstants.participant + id + "/",
      "",
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
        console.log(err);
      });
  };

  const getCoStewardOrParticipants = () => {
    setIsLoader(true);
    let url =
      UrlConstant.base_url +
      UrlConstant.participant +
      "?on_boarded_by" +
      getUserLocal();

    HTTPService("GET", url, "", false, true)
      .then((response) => {
        setIsLoader(false);
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
      .catch((e) => {
        setIsLoader(false);
        //history.push(GetErrorHandlingRoute(e))
        console.log(e);
      });
  };

  const getListOnClickOfLoadMore = () => {
    setIsLoader(true);
    HTTPService("GET", loadMoreUrl, "", false, true)
      .then((response) => {
        setIsLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        let datalist = coStewardOrParticipantsList;
        if (response?.data?.next) {
          let finalDataList = [...datalist, ...response.data.results];
          setCoStewardOrParticipantsList(finalDataList);
        }
      })
      .catch((e) => {
        setIsLoader(false);
        //history.push(GetErrorHandlingRoute(e))
        console.log(e);
      });
  };

  useEffect(() => {
    getParticipantsOrCostewardDetails();
    getCoStewardOrParticipants();
  }, []);

  return (
    <Container className={LocalStyle.container}>
      <Row>
        <Col xs={12} sm={6} md={4} xl={4} className={LocalStyle.highlitedImg}>
          <img src={require("../../Assets/Img/participant_organization.svg")} />
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
        </Col>
        <Col
          className={LocalStyle.buttonContainer}
          xs={12}
          sm={12}
          md={6}
          xl={6}
        >
          <Button
            variant="outlined"
            className={`${GlobalStyle.outlined_button} ${LocalStyle.outlined_button}`}
          >
            Delete {isCosteward ? "Co-steward" : "Participant"}
          </Button>
          <Button
            variant="outlined"
            className={`${GlobalStyle.outlined_button} ${LocalStyle.outlined_button}`}
          >
            Edit {isCosteward ? "Co-steward" : "Participant"}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Row className={LocalStyle.textRow}>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography
                className={`${GlobalStyle.bold400} ${GlobalStyle.size16} ${LocalStyle.lightText}`}
              >
                Organisation Name
              </Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {organisationName}
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={6} xl={6}>
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
            <Col xs={12} sm={12} md={6} xl={6}>
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
        </Col>
      </Row>
      <Row className={LocalStyle.textRow}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Row>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>First Name</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {firstName}
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={6} xl={6}>
              <Typography>Last Name</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {lastName}
              </Typography>
            </Col>
          </Row>
          <Row className={LocalStyle.textRow}>
            <Col className={GlobalStyle.padding0} xs={12} sm={12} md={6} xl={6}>
              <Typography>Email</Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {userEmail}
              </Typography>
            </Col>
            <Col xs={12} sm={12} md={6} xl={6}>
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

      <Row className={LocalStyle.section}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            // id={title + "-form-title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            List of Datasets
          </Typography>
        </Col>
      </Row>
      <Row>
        {datasets?.map((dataset, index) => {
          return (
            <Col xs={12} sm={12} md={6} xl={4}>
              <DatasetCart />
            </Col>
          );
        })}
      </Row>
      <Row className={LocalStyle.buttonContainer}>
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
      </Row>
      {/* participants */}

      {/* <Row className={LocalStyle.section}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            // id={title + "-form-title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            Co-steward participants
          </Typography>
        </Col>
      </Row>
      <Row>
        {datasets?.map((dataset, index) => {
          return (
            <Col xs={12} sm={12} md={6} xl={4}>
              <CustomCard />
            </Col>
          );
        })}
      </Row> */}
      {isCosteward ? (
        <CoStewardAndParticipantsCard
          title={"Co-steward participants"}
          viewType={false}
          // setViewType={setViewType}
          coStewardOrParticipantsList={coStewardOrParticipantsList}
          loadMoreButton={loadMoreButton}
          handleLoadMoreButton={handleLoadMoreButton}
        />
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
      <hr />
      <Row className={LocalStyle.backButtonContainer}>
        <Button
          id={"details-page-load-more-dataset-button"}
          variant="outlined"
          className={`${GlobalStyle.outlined_button} ${LocalStyle.backButton}`}
        >
          Back
        </Button>
      </Row>
    </Container>
  );
};

export default ParticipantAndCoStewardDetailsNew;
