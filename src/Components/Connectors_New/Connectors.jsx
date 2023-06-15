import React, { useState, useEffect, useContext } from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import AddConnectorCard from "./AddConnectorCard";
import ConnectorCardView from "./ConnectorCardView";
import ConnectorListView from "./ConnectorListView";
import ContainedButton from "../Button/ContainedButton";
import OutlinedButton from "../Button/OutlinedButton";
import style from "./Connector.module.css";
import globalStyle from "../../Assets/CSS/global.module.css";
import ConnectorTitleView from "./ConnectorTitleView";
import { useHistory } from "react-router-dom";
import {
  getTokenLocal,
  getUserLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import { CSSTransition } from "react-transition-group";
import { FarmStackContext } from "../Contexts/FarmStackContext";

const Connectors = () => {
  const [isGrid, setIsGrid] = useState(true);
  const { callLoader } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const [connectors, setConnectors] = useState([]);
  const [connectorUrl, setConnectorUrl] = useState("");
  const [showLoadMore, setShowLoadMore] = useState(true);
  const history = useHistory();

  const addConnector = () => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return "/datahub/connectors/add";
    } else if (isLoggedInUserParticipant()) {
      return "/participant/connectors/add";
    }
  };

  const handleEditConnectorRoute = (id) => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return `/datahub/connectors/edit/${id}`;
    } else if (isLoggedInUserParticipant()) {
      return `/participant/connectors/edit/${id}`;
    }
  };

  const getConnectors = (isLoadMore) => {
    let url = !isLoadMore
      ? UrlConstant.base_url +
        UrlConstant.list_of_connectors +
        "?user=" +
        getUserLocal() +
        "&co_steward=" +
        (isLoggedInUserCoSteward() ? "true" : "false")
      : connectorUrl;
    let accessToken = getTokenLocal() ?? false;
    callLoader(true);
    HTTPService("GET", url, "", false, accessToken)
      .then((response) => {
        callLoader(false);
        if (response.data.next == null) {
          setShowLoadMore(false);
        } else {
          setConnectorUrl(response.data.next);
          setShowLoadMore(true);
        }
        let tempArr = [];
        if (isLoadMore) {
          tempArr = [...connectors, ...response.data.results];
        } else {
          tempArr = [...response.data.results];
        }
        setConnectors(tempArr);
      })
      .catch((e) => {
        callLoader(false);
        console.log(e);
      });
  };

  useEffect(() => {
    getConnectors(false);
  }, []);

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Box
        sx={{
          marginLeft: mobile || tablet ? "30px" : "144px",
          marginRight: mobile || tablet ? "30px" : "144px",
        }}
      >
        <div className="text-left">
          <span className={style.lightTextTitle}>Connectors</span>
        </div>
        <Box className="mb-100">
          <ConnectorTitleView
            title={"List of connectors"}
            isGrid={isGrid}
            setIsGrid={setIsGrid}
            history={history}
            addConnector={addConnector}
            isConnectors={connectors && connectors?.length > 0}
          />
          <Divider className="mb-20 mt-24" />
          {connectors && connectors.length > 0 ? (
            <>
              {/* {isGrid ? ( */}
              <CSSTransition
                appear={isGrid}
                in={isGrid}
                timeout={{
                  appear: 600,
                  enter: 700,
                  exit: 100,
                }}
                classNames="step"
                unmountOnExit
              >
                <div className={style.connectorCard}>
                  <AddConnectorCard
                    history={history}
                    addConnector={addConnector}
                  />
                  {connectors?.map((item) => (
                    <ConnectorCardView
                      history={history}
                      item={item}
                      handleEditConnectorRoute={handleEditConnectorRoute}
                    />
                  ))}
                </div>
              </CSSTransition>
              {/* ) : ( */}
              <CSSTransition
                appear={!isGrid}
                in={!isGrid}
                timeout={{
                  appear: 600,
                  enter: 700,
                  exit: 100,
                }}
                classNames="step"
                unmountOnExit
              >
                {/* <ConnectorListView connectors={connectors} history={history} /> */}
                <ConnectorListView
                  connectors={connectors}
                  history={history}
                  handleEditConnectorRoute={handleEditConnectorRoute}
                />
              </CSSTransition>
              {/* )} */}
              {/* ) : ( */}
              {/* )} */}
              {showLoadMore ? (
                <OutlinedButton
                  text={"Load more"}
                  fontWeight={"700"}
                  fontSize={mobile || tablet ? "14px" : "16px"}
                  width={mobile || tablet ? "162px" : "368px"}
                  height={mobile || tablet ? "36px" : "48px"}
                  mt={"50px"}
                  handleClick={() => getConnectors(true)}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <Box>
              <div
                className={`${globalStyle.bold600} ${globalStyle.size24} ${globalStyle.primary_fontStyle} mt-30`}
              >
                There is no connectors
              </div>
              <div
                className={`${globalStyle.bold400} ${globalStyle.size16} ${globalStyle.primary_fontStyle} mt-20`}
              >
                As of now there is no connectors, so add new connectors!
              </div>
              <ContainedButton
                text={"Add New Connector"}
                fontWeight={"700"}
                fontSize={"16px"}
                width={"246px"}
                height={"48px"}
                mt={"50px"}
                handleClick={() => history.push(addConnector())}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Connectors;
