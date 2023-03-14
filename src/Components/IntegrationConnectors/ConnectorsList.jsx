import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ConnectorCard from "../IntegrationConnectors/ConnectorCard"
import AddIcon from '@mui/icons-material/Add';
import { InputAdornment } from "@mui/material";
import { Button } from "@mui/material";
import Loader from "../Loader/Loader";
import HTTPService from "../../Services/HTTPService";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import { useHistory } from "react-router-dom";
import UrlConstant from "../../Constants/UrlConstants";
export default function ConnectorsList() {
  const [isLoader, setIsLoader] = useState(false);
  const [isShowLoadMoreButton, setisShowLoadMoreButton] = useState(false)
  const [connectorList, setConnectorList] = useState([]);
  const [connectorUrl, setConnectorUrl]= useState("");
  const history = useHistory()

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
      if(response.data.next == null){
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
  const useStyles = {
    marginrowtoptab50px: { "margin-top": "50px" },
    marginrowtop: { "margin-top": "20px" },
    background: {
      "margin-left": "70px",
      "margin-right": "70px",
      background: "#FCFCFC",
    },
    marginrowtop10px: { "margin-top": "30px" },
    marginrowtop50: { "margin-top": "50px" },
    addButton: {
      "border-radius": "2px",
      "background": "#c09507",
      "width": "166px",
      "height": "48px",
      "color": "#FFFFFF",
      "font-family": "Open Sans",
      "font-style": "normal",
      "font-weight": "700",
      "font-size": "14px",
      "align-item": "right",
    }


  }

  return (

    <div
      className="minHeight501pxsettingpagemaindiv"
      style={useStyles.background}
    >
     {isLoader ? <Loader /> : ""}
      <Row style={useStyles.marginrowtop50}>
        <Col xs={12} sm={12} md={6} lg={6}>
          <span className="mainheading" style={{ float: 'left', 'margin-left': '15px', paddingTop: "30px" }}>
            {"List of Connectors"}
          </span>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} style={{ textAlign: "right"}}>
          <Button
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddIcon />
                </InputAdornment>
              ),
            }}
            // onClick={() =>}
            variant="outlined"
            style={useStyles.addButton}
          >
            New Connector
          </Button></Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <img
            src={require('../../Assets/Img/line.svg')}
            style={{ width: "1300px" }}
            alt="new"
          />
        </Col>
      </Row>
      <Row>
           {connectorList.map((list, index) => (
            <Col xs={12} sm={6} md={4} lg={4}>
              <ConnectorCard
                firsttext={"Last Updated on: " + list.createdDate}
                secondtext={list?.name}
                useddataset={list?.usedDatasets}
                providers={list?.providers}
                index={index}
              >
              </ConnectorCard>
            </Col> ))}
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
    </div>
  )
}

