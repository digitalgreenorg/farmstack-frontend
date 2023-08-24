import React, { useContext, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";
import {
  getTokenLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import { Col, Row } from "react-bootstrap";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ResourcesTab from "./ResourcesTab";

const Resources = (props) => {
  const { user, breadcrumbFromRoute } = props;
  const { callLoader } = useContext(FarmStackContext);
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const [isGrid, setIsGrid] = useState(true);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [resources, setResources] = useState([]);
  const [resourceUrl, setResourceUrl] = useState(
    UrlConstant.base_url + UrlConstant.resource_endpoint
  );
  const [otherResourceUrl, setOtherResourceUrl] = useState(
    UrlConstant.base_url + UrlConstant.resource_endpoint + "?others=true"
  );
  const [guestResourceUrl, setGuestResourceUrl] = useState(
    UrlConstant.base_url + UrlConstant.microsite_resource_endpoint
  );
  const [value, setValue] = useState(0);

  const addResource = () => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return `/datahub/resources/add`;
    } else if (isLoggedInUserParticipant()) {
      return `/participant/resources/add`;
    }
  };
  const getResources = (isLoadMore) => {
    let accessToken = user !== "guest" ? getTokenLocal() : false;
    let url = user !== "guest" ? resourceUrl : guestResourceUrl;
    callLoader(true);
    HTTPService("GET", url, false, false, accessToken)
      .then((response) => {
        callLoader(false);
        if (response.data.next == null) {
          setShowLoadMoreBtn(false);
        } else {
          if (user !== "guest") {
            setResourceUrl(response.data.next);
          } else {
            setGuestResourceUrl(response.data.next);
          }
          setShowLoadMoreBtn(true);
        }
        let tempResources = [];
        if (isLoadMore) {
          tempResources = [...resources, ...response.data.results];
        } else {
          tempResources = [...response.data.results];
        }
        setResources(tempResources);
      })
      .catch((err) => {
        callLoader(false);
        console.log("error", err);
      });
  };
  const getOtherResources = (isLoadMore) => {
    let accessToken = user != "guest" ? getTokenLocal() : false;
    callLoader(true);
    HTTPService("GET", otherResourceUrl, false, false, accessToken)
      .then((response) => {
        callLoader(false);
        if (response.data.next == null) {
          setShowLoadMoreBtn(false);
        } else {
          setOtherResourceUrl(response.data.next);
          setShowLoadMoreBtn(true);
        }
        let tempResources = [];
        if (isLoadMore) {
          tempResources = [...resources, ...response.data.results];
        } else {
          tempResources = [...response.data.results];
        }
        setResources(tempResources);
      })
      .catch((err) => {
        callLoader(false);
        console.log("error", err);
      });
  };
  return (
    <Box
      sx={{
        maxWidth: "100%",
        marginLeft: mobile || tablet ? "30px" : "144px",
        marginRight: mobile || tablet ? "30px" : "144px",
      }}
    >
      <Row>
        <Col>
          <div className="text-left mt-50">
            <span
              className="add_light_text cursor-pointer breadcrumbItem"
              data-testid="go_home"
              onClick={() => {
                breadcrumbFromRoute === "Home"
                  ? history.push("/home")
                  : isLoggedInUserAdmin() || isLoggedInUserCoSteward()
                  ? history.push("/datahub/resources")
                  : history.push("/participant/resources");
              }}
            >
              {breadcrumbFromRoute ? breadcrumbFromRoute : "Resources"}
            </span>
            <span className="add_light_text ml-16">
              <ArrowForwardIosIcon sx={{ fontSize: "14px", fill: "#00ab55" }} />
            </span>
            <span className="add_light_text ml-16 fw600">
              {user
                ? "Resources"
                : value == 0
                ? "My organisation resources"
                : value == 1
                ? "Other organisation resources"
                : ""}
            </span>
          </div>
        </Col>
      </Row>
      <ResourcesTab
        user={user}
        value={value}
        setValue={setValue}
        history={history}
        isGrid={isGrid}
        setIsGrid={setIsGrid}
        resources={resources}
        setResources={setResources}
        addResource={addResource}
        getResources={getResources}
        getOtherResources={getOtherResources}
        showLoadMoreBtn={showLoadMoreBtn}
        setResourceUrl={setResourceUrl}
        setOtherResourceUrl={setOtherResourceUrl}
      />
    </Box>
  );
};

export default Resources;
