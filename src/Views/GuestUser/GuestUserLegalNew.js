import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import UrlConstant from "../../Constants/UrlConstants";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import LocalStyle from "./GuestUserLegalNew.module.css";
import HTTPService from "../../Services/HTTPService";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import { Typography } from "@mui/material";

const GuestUserLegalNew = (props) => {
  const [legalData, setLegalData] = useState([]);
  const { callLoader, callToast } = useContext(FarmStackContext);

  const getLegalData = () => {
    callLoader(true);
    HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.microsite_legal_documents,
      "",
      false,
      false
    )
      .then((response) => {
        callLoader(false);
        console.log(response, "updated responmse");
        response = response.data;
        let arr = [
          {
            title: "Governing laws",
            content: response.content.governing_law,
            download: response.documents.governing_law,
          },
          {
            title: "Warranties",
            content: response.content.warranty,
            download: response.documents.warranty,
          },
          {
            title: "Limitation of liabilities",
            content: response.content.limitations_of_liabilities,
            download: response.documents.limitations_of_liabilities,
          },
          {
            title: "Policy",
            content: response.content.privacy_policy,
            download: response.documents.privacy_policy,
          },
          {
            title: "Terms of use",
            content: response.content.tos,
            download: response.documents.tos,
          },
        ];
        console.log(arr, "ARRRRR");
        setLegalData([...arr]);
      })
      .catch((e) => {
        callLoader(false);
        console.log("error", GetErrorHandlingRoute(e));
        callToast(GetErrorHandlingRoute(e).message, "error", true);
      });
  };
  useEffect(() => {
    getLegalData();
  }, []);

  return (
    <Container>
      <Row className={LocalStyle.titleContainer}>
        <div className={LocalStyle.title}>List of datasets</div>
        <div className="d-flex justify-content-center">
          <div className={LocalStyle.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
            tellus scelerisque, imperdiet augue id, accumsan dolor. Integer ac
            neque quis metus pretium tempus.
          </div>
        </div>
      </Row>
      <Row className={LocalStyle.alignLeft}>
        <Typography className={`${GlobalStyle.size24} ${GlobalStyle.bold500}`}>
          Our terms are
        </Typography>
      </Row>
    </Container>
  );
};

export default GuestUserLegalNew;
