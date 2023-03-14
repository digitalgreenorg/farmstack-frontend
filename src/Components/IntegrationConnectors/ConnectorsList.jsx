import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ConnectorCard from "../IntegrationConnectors/ConnectorCard"
import { Button } from "@mui/material";
import THEME_COLORS from "../../Constants/ColorConstants";
import Loader from "../Loader/Loader";
import HTTPService from "../../Services/HTTPService";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import { useHistory } from "react-router-dom";
import UrlConstant from "../../Constants/UrlConstants";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function ConnectorsList() {
  const [isLoader, setIsLoader] = useState(false);
  const [isShowLoadMoreButton, setisShowLoadMoreButton] = useState(false)
  const [connectorList, setConnectorList] = useState([]);
  const [connectorUrl, setConnectorUrl] = useState("");
  const [gridView, setGridView] = useState(true);      //change of list and grid view state

  const history = useHistory()
  const useStyles = {
    marginrowtoptab50px: { "margin-top": "50px" },
    marginrowtop: { "margin-top": "20px" },
    background: {
      "margin-left": "120px",
      "margin-right": "120px",
      background: "#FCFCFC",
      
    },
    marginrowtop10px: { "margin-top": "30px" },
    marginrowtop50: { "margin-top": "50px" },
    addButton: {
      "border-radius": "8px",
      "background": "#c09507",
      "width": "176px",
      "height": "48px",
      "color": "#FFFFFF",
      "font-family": "Open Sans",
      "font-style": "normal",
      "font-weight": "700",
      "font-size": "14px",
      "align-item": "right",
      "border-color": THEME_COLORS.THEME_COLOR,
    },
    cardtext: {
      color: "#A3B0B8",
      "margin-top": "30px",
      "font-size": "14px",
      'font-family': 'Open Sans',
      'font-style': 'normal',
      'font-weight': 400,
      'font-size': '14px',
      'line-height': '19px',
      'text-align': 'center',
    },
  }
  useEffect(() => {
    getListOfConnectors()
  }, [])

  const getListOfConnectors = () => {
    setIsLoader(true);
    HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.list_of_connectors,
      "",
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        console.log("connectors list", response.data);
        if (response.data.next == null) {
          setisShowLoadMoreButton(false);
        } else {
          setConnectorUrl(response.data.next);
          setisShowLoadMoreButton(true);
        }
        setConnectorList(response.data.results);
      })
      .catch((e) => {
        setIsLoader(false);
        history.push(GetErrorHandlingRoute(e));
      });
  }

  //list of connectors will display when loadmore button clicks
  const connectorsListOnLoadMore = () => {
    setIsLoader(true);
    HTTPService(
      "GET",
      connectorUrl,
      "",
      false,
      true
    ).then((response) => {
      setIsLoader(false);
      if (response.data.next == null) {
        setisShowLoadMoreButton(false)
      } else {
        setisShowLoadMoreButton(true);
        setConnectorUrl(response.data.next);
      }
      let initialList = connectorList;
      let totalListOfConnectors = [...initialList, ...response.data.results];
      setConnectorList(totalListOfConnectors);
    }).catch((e) => {
      setIsLoader(false);
      history.push(GetErrorHandlingRoute(e));
    })
  }

  return (
    <div
      className="minHeight501pxsettingpagemaindiv"
      style={useStyles.background}
    >
      {isLoader ? <Loader /> : ""}
      <Row style={useStyles.marginrowtop50}>
        <Col xs={12} sm={12} md={6} lg={6} style={{ "text-align": "left" }}>
          <span className="mainheading">
            {"List of Connectors"}
          </span>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} style={{ textAlign: "right" }}>
          {/* <Button
            //  Button should render to List view of connector's component when click
            onClick={() => setGridView(false)}
            style={{ "color": "#c09507" }}
            startIcon={<FormatListBulletedIcon />}
            variant="text">
            List View
          </Button> */}
          {/* <Button
          //  Button should render to Grid view of connector's component when click
            onClick={() => setGridView(true)}
            style={{ "color": "#c09507", }}
            startIcon={<ViewModuleIcon />}
            variant="text">
            Grid View
          </Button> */}
          <Button
            //  Button should render to add new connector component when click
            // onClick={() =>}
            variant="outlined"
            style={useStyles.addButton}
          >
            + New Connector
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <img
            src={require('../../Assets/Img/line.svg')}
            style={{ width: "100%" }}
            alt="new"
          />
        </Col>
      </Row>
      {gridView === true ? <>
        <Row>
          {connectorList.map((list, index) => (
            <Col xs={12} sm={6} md={4} lg={4}>
              <ConnectorCard
                firsttext={list.updated_at}
                secondtext={list?.name}
                useddataset={list?.dataset_count}
                providers={list?.providers_count}
                index={index}
              >
              </ConnectorCard>
            </Col>))}
        </Row>
        <Row style={{ "margin-top": "10px" }}>
          <Col xs={12} sm={12} md={6} lg={3}></Col>
          {isShowLoadMoreButton ? (
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button
                onClick={() => connectorsListOnLoadMore()}
                variant="outlined"
                className="cancelbtn"
                style={{ "text-transform": "none" }}
              >
                Load more
              </Button>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </> : <>
        {/* list view component render here when list view button clicks */}
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={{ marginTop: "100px" }}>
            <span style={useStyles.cardtext}>"Currently, there are no connectors available in the list format"</span>
          </Col>
        </Row>
      </>}
    </div>
  )
}

