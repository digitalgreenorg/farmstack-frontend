import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import UrlConstant from "../../Constants/UrlConstants";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import LocalStyle from "./GuestUserLegalNew.module.css";
import HTTPService from "../../Services/HTTPService";
import {
  downloadAttachment,
  GetErrorHandlingRoute,
  goToTop,
} from "../../Utils/Common";
import { Button, Typography } from "@mui/material";
import CustomTabs from "../../Components/Tabs/Tabs";
import { Box } from "@mui/system";
import HTMLReactParser from "html-react-parser";
import NoDataAvailable from "../../Components/Dashboard/NoDataAvailable/NoDataAvailable";

const GuestUserLegalNew = (props) => {
  const [legalData, setLegalData] = useState([]);
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [tabValue, setTabValue] = useState(0);
  const [tabLabels, setTabLabels] = useState([
    // "Confidential",
    // "Agriculture Law",
    // "Terms and Conditions",
    // "Warranty",
    // "Digital green policy",
    // "LOE",
    // "Governing Law",
    // "Secret polic",
    // "security policy",
    // "Governing Lawwwww",
  ]);

  const getLegalData = () => {
    callLoader(true);
    HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.microsite_get_policy,
      "",
      false,
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
    goToTop();
  }, []);

  console.log("on load", tabLabels, tabValue);
  let url = legalData[tabValue]?.file;

  return (
    <Container>

      <Row className={LocalStyle.titleContainer}>
        <div className={LocalStyle.title}>Legal Policies</div>
        <div className="d-flex justify-content-center">
          <div className={LocalStyle.description}>
            <b style={{ fontWeight: "bold" }}>&ldquo;</b>
            Data governance policy documents, providing precise data usage and
            management guidelines within the Farmstack ecosystem. This feature
            promotes responsible data sharing and ensures compliance with
            industry standards.
            <b style={{ fontWeight: "bold" }}>&rdquo;</b>
          </div>
        </div>
      </Row>
      <Row className={LocalStyle.title2}>
        <Typography className={`${GlobalStyle.size24} ${GlobalStyle.bold600}`}>
          Our terms are
        </Typography>
      </Row>
      {tabLabels?.length > 0 ? (
        <>
        {/* <Row lg={12}> */}
          {/* <Col className={LocalStyle.policyTabCol}>
            <CustomTabs
              tabValue={tabValue}
              setTabValue={setTabValue}
              TabLabels={tabLabels}
              // orientation="vertical"
              // filledBackground={true}
              // isPolicy={true}
            />
          </Col> */}
          <Box className="mt-50" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <CustomTabs
          tabValue={tabValue}
          setTabValue={setTabValue}
          TabLabels={tabLabels}
        />
      </Box>
         
        {/* </Row> */}
        <Row lg={12}>
           <Col className={LocalStyle.policyDetailsCol} >
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
              {url ? (
                <Row className={LocalStyle.backButtonContainer}>
                  <Button
                    id={"details-page-load-more-dataset-button"}
                    variant="outlined"
                    className={`${GlobalStyle.primary_button} ${LocalStyle.primary_button}`}
                    onClick={() => downloadAttachment(url)}
                  >
                    <img
                      className={LocalStyle.imgTags}
                      src={require("../../Assets/Img/new_download.svg")}
                    />
                    Download document
                  </Button>
                  <Button
                    id={"details-page-load-more-dataset-button"}
                    variant="outlined"
                    className={`${GlobalStyle.outlined_button} ${LocalStyle.backButton}`}
                    onClick={() => window.open(url, "_blank")}
                  >
                    <img
                      className={LocalStyle.imgTags}
                      src={require("../../Assets/Img/view.svg")}
                    />
                    View document
                  </Button>
                </Row>
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
        </>
      ) : (
        <NoDataAvailable
          message={
            "Unfortunately, it seems that policies have not been established yet."
          }
        />
      )}
    </Container>
  );
};

export default GuestUserLegalNew;
