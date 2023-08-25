import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalStyle from "./Connector.module.css";
import HTTPService from "../../Services/HTTPService";
import UrlConstants from "../../Constants/UrlConstants";
import DatasetCart from "../DatasetCard/DatasetCard";
import {
  getTokenLocal,
  GetErrorHandlingRoute,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import CustomCard from "../Card/CustomCard";

export default function GuestUserConnectorDetailsView() {
  const { id } = useParams();
  const [connectorName, setConnectorName] = useState("");
  const [connectorDescription, setConnectorDescription] = useState("");
  const [datasetDetail, setDatasetDetail] = useState([]);
  const [participantList, setParticipantList] = useState([]);
  const { callToast, callLoader } = useContext(FarmStackContext);
  const history = useHistory();

  const handleCardClick = (id) => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return `/datahub/new_datasets/${id}`;
    } else if (isLoggedInUserParticipant()) {
      return `/participant/new_datasets/${id}`;
    } else {
      return `/home/datasets/${id}`;
    }
  };

  const handleRoutePartDetail = (id) => {
    history.push(`/home/participants/view/${id}`);
  }

  const handleRouteBreadCrums = () => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return "/datahub/connectors";
    } else if (isLoggedInUserParticipant()) {
      return "/participant/connectors";
    } else {
      return "/home/connectors";
    }
  };
  const getConnectorDetail = () => {
    let accessToken = getTokenLocal() ?? false;
    callLoader(true);
    HTTPService(
      "GET",
      UrlConstants.base_url + UrlConstants.guest_user_connector_view + id + "/",
      "",
      false,
      accessToken
    )
      .then((response) => {
        callLoader(false);
        setConnectorName(response?.data?.name);
        setConnectorDescription(response?.data?.description);
        setDatasetDetail(response?.data?.dataset_and_organizations?.datasets);
        setParticipantList(response?.data?.dataset_and_organizations?.organizations);
      })
      .catch(async (e) => {
        callLoader(false);
        let error = await GetErrorHandlingRoute(e);
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
    getConnectorDetail();
  }, []);
  return (
    <Box className={LocalStyle.containerMain}>
      <Row>
        <Col style={{ marginBottom: "20px" }}>
          <div className="text-left mt-50">
            <span
              className="add_light_text cursor-pointer breadcrumbItem"
              onClick={() => history.push(handleRouteBreadCrums())}
            >
              Connector
            </span>
            <span className="add_light_text ml-16">
              <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#00ab55" }} />
            </span>
            <span className="add_light_text ml-16 fw600">
              Connector details
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} xl={6} className={LocalStyle.textRow}>
          <Typography
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            Connector Details
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} xl={12}>
          <Row className={LocalStyle.textRow}>
            <Col xs={12} sm={12} md={12} xl={12}>
              <Typography
                className={`${GlobalStyle.bold400} ${GlobalStyle.size16} ${LocalStyle.lightText}`}
              >
                Connector Name
              </Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {connectorName ? connectorName : ""}
              </Typography>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} xl={12}>
          <Row className={LocalStyle.textRow}>
            <Col xs={12} sm={12} md={12} xl={12}>
              <Typography
                className={`${GlobalStyle.bold400} ${GlobalStyle.size16} ${LocalStyle.lightText}`}
              >
                Connector Description
              </Typography>
              <Typography
                className={`${GlobalStyle.bold600} ${GlobalStyle.size16} ${LocalStyle.highlitedText}`}
              >
                {connectorDescription ? connectorDescription : ""}
              </Typography>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            Integrated Datasets
          </Typography>
        </Col>
      </Row>
      <Row>
        {datasetDetail?.map((dataset, index) => {
          return (
            <Col
              onClick={() => history.push(handleCardClick(dataset?.id))}
              id={`dataset-${index}-view-card`}
              xs={12}
              sm={12}
              md={6}
              xl={4}
            >
              <DatasetCart
                publishDate={dataset?.created_at}
                title={dataset?.name}
                orgnisationName={dataset?.organization?.name}
                geography={dataset?.geography}
                category={Object.keys(dataset?.category)}
                update={dataset?.updated_at}
              />
            </Col>
          );
        })}
      </Row>
      <Row style={{marginTop: "20px"}}>
        <Col xs={12} sm={12} md={6} xl={6}>
          <Typography
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            Participants
          </Typography>
        </Col>
      </Row>
      <Row>
        {participantList?.map((participant, index) => {
          return (
            <Col
            onClick={() => history.push(handleRoutePartDetail(participant?.id))}
            className={GlobalStyle.padding0}
              id={`dataset-${index}-view-card`}
              xs={12}
              sm={12}
              md={6}
              xl={4}
            >
          <CustomCard
          image={participant?.logo}
          title={participant?.name}
          subTitle1={ "Datasets"
          }
          subTitle2={"Org email"}
          subTitle1Value={participant?.dataset_count}
          subTitle2Value={participant?.org_email}
          index={index}
          />
            </Col>
          );
        })}
      </Row>
    </Box>
  );
}
