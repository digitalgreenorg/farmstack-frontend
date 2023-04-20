import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import UrlConstant from "../../Constants/UrlConstants";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import LocalStyle from "./GuestUserLegalNew.module.css";
import HTTPService from "../../Services/HTTPService";
import { downloadAttachment, GetErrorHandlingRoute } from "../../Utils/Common";
import { Button, Typography } from "@mui/material";
import CustomTabs from "../../Components/Tabs/Tabs";
import { Box } from "@mui/system";
import HTMLReactParser from "html-react-parser";

const GuestUserLegalNew = (props) => {
  const [legalData, setLegalData] = useState([]);
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [tabValue, setTabValue] = useState(0);
  const [tabLabels, setTabLabels] = useState([
    "Confidential",
    "Agriculture Law",
    "Terms and Conditions",
    "Warranty",
    "Digital green policy",
    "LOE",
    "Governing Law",
    "Secret polic",
    "security policy",
    "Governing Lawwwww",
  ]);

  const getLegalData = () => {
    callLoader(true);
    HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.microsite_get_policy,
      "",
      false,
      false
    )
      .then((response) => {
        callLoader(false);
        console.log(response, "updated responmse");
        response = response?.data;
        setLegalData(response);
        let tmpLabels = [];
        if (response) {
          response.forEach((policy, index) => {
            tmpLabels.push(policy.name);
          });
          setTabLabels(tmpLabels);
          console.log("tmpLabels", tmpLabels);
        } else {
          console.log("something is wrong in .then");
        }
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

  console.log("on load", tabLabels, tabValue);
  let url = UrlConstant.base_url + legalData[tabValue]?.file;

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
      <Row className={LocalStyle.title2}>
        <Typography className={`${GlobalStyle.size24} ${GlobalStyle.bold500}`}>
          Our terms are
        </Typography>
      </Row>
      <Row>
        <Col className={LocalStyle.policyTabCol} lg={4}>
          <CustomTabs
            tabValue={tabValue}
            setTabValue={setTabValue}
            TabLabels={tabLabels}
            orientation="vertical"
            filledBackground={true}
            isPolicy={true}
          />
        </Col>
        <Col className={LocalStyle.policyDetailsCol} lg={8}>
          <div className={LocalStyle.policyDetailsMainContainer}>
            <div className={LocalStyle.policyDetailsContainer}>
              <Typography
                className={`${GlobalStyle.size32} ${GlobalStyle.bold600} ${LocalStyle.policyDetailsTitle}`}
              >
                {legalData[tabValue]?.name}
              </Typography>
              <Typography
                className={`${GlobalStyle.size16} ${GlobalStyle.bold400} ${LocalStyle.policyDetailsDescription}`}
              >
                {legalData[tabValue]?.description
                  ? HTMLReactParser(legalData[tabValue]?.description)
                  : ""}
              </Typography>
            </div>
            <Row className={LocalStyle.backButtonContainer}>
              <Button
                id={"details-page-load-more-dataset-button"}
                variant="outlined"
                className={`${GlobalStyle.primary_button} ${LocalStyle.primary_button}`}
                onClick={() => downloadAttachment(url)}
              >
                Download document
              </Button>
              <Button
                id={"details-page-load-more-dataset-button"}
                variant="outlined"
                className={`${GlobalStyle.outlined_button} ${LocalStyle.backButton}`}
                onClick={() => window.open(url, "_blank")}
              >
                View document
              </Button>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GuestUserLegalNew;
