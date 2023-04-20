import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import UrlConstant from "../../Constants/UrlConstants";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import LocalStyle from "./GuestUserLegalNew.module.css";
import HTTPService from "../../Services/HTTPService";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import { Typography } from "@mui/material";
import CustomTabs from "../../Components/Tabs/Tabs";
import { Box } from "@mui/system";

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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <CustomTabs
          tabValue={tabValue}
          setTabValue={setTabValue}
          TabLabels={tabLabels}
          orientation="vertical"
          filledBackground={true}
        />
      </Box>
    </Container>
  );
};

export default GuestUserLegalNew;
