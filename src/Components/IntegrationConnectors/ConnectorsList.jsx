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
export default function ConnectorsList() {
  const [createdDate, setCreatedDate] = useState("");
  const [connectorName, setConnectorName] = useState("");
  const [description, setDesription] = useState("")
  const [usedDatasets, setUsedDatasets] = useState("")
  const [providers, setProviders] = useState("")
  const [isLoader, setIsLoader] = useState(false);
  const [isShowLoadMoreButton, setisShowLoadMoreButton] = useState(false)
  const history = useHistory()
  const getListOfConnectors = () => {
    setIsLoader(true);
    HTTPService(
      "GET",
      
      "",
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        console.log("connectors list", response.data);
        // if (response.data.next == null) {
        //   setisShowLoadMoreButton(false);
        // } else {
        //   setisShowLoadMoreButton(true);
        //   setparticipantUrl(response.data.next);
        // }
        // setparticipantList(response.data.results);
      })
      .catch((e) => {
        setIsLoader(false);
        history.push(GetErrorHandlingRoute(e));
      });
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
      "float": "right"
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
        <Col xs={12} sm={12} md={6} lg={6} style={{ paddingRight: "20px" }}>
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
            <Col xs={12} sm={6} md={4} lg={4}>
              <ConnectorCard
                firsttext={"Last Updated on: 25/1/1998"}
                secondtext={"Random string check for cards"}
                descriptiontext={"API reference docs for the React Card component. Learn about the props, CSS, and other APIs of this exported module."}
                useddataset={5}
                providers={3}
              >
              </ConnectorCard>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <ConnectorCard
                firsttext={"Last Updated on: 25/1/1998"}
                secondtext={"Random string check for cards"}
                descriptiontext={"API reference docs for the React Card component. Learn about the props, CSS, and other APIs of this exported module."}
                useddataset={5}
                providers={3}
              >
              </ConnectorCard>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <ConnectorCard
                firsttext={"Last Updated on: 25/1/1998"}
                secondtext={"Random string check for cards"}
                descriptiontext={"API reference docs for the React Card component. Learn about the props, CSS, and other APIs of this exported module."}
                useddataset={5}
                providers={3}
              >
              </ConnectorCard>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <ConnectorCard
                firsttext={"Last Updated on: 25/1/1998"}
                secondtext={"Random string check for cards"}
                descriptiontext={"API reference docs for the React Card component. Learn about the props, CSS, and other APIs of this exported module."}
                useddataset={5}
                providers={3}
              >
              </ConnectorCard>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <ConnectorCard
                firsttext={"Last Updated on: 25/1/1998"}
                secondtext={"Random string check cards"}
                descriptiontext={"API reference docs for the React Card component. Learn about the props, CSS, and other APIs of this exported module."}
                useddataset={5}
                providers={3}
              >
              </ConnectorCard>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <ConnectorCard
                firsttext={"Last Updated on: 25/1/1998"}
                secondtext={"Random string check cards"}
                descriptiontext={"API reference docs for the React Card component. Learn about the props, CSS, and other APIs of this exported module."}
                useddataset={13}
                providers={3}
              >
              </ConnectorCard>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <ConnectorCard
                firsttext={"Last Updated on: 25/1/1998"}
                secondtext={"Random string check cards"}
                descriptiontext={"API reference docs for the React Card component. Learn about the props, CSS, and other APIs of this exported module."}
                useddataset={12}
                providers={3}
              >
              </ConnectorCard>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <ConnectorCard
                firsttext={"Last Updated on: 25/1/1998"}
                secondtext={"Random string check cards"}
                descriptiontext={"API reference docs for the React Card component. Learn about the props, CSS, and other APIs of this exported module."}
                useddataset={11}
                providers={3}
              >
              </ConnectorCard>
            </Col>
          </Row>
          <Row style={{ "margin-top": "10px" }}>
                    <Col xs={12} sm={12} md={6} lg={3}></Col>
                    {/* {isCoStewardShowLoadMoreButton ? ( */}
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <Button
                          // onClick={() => getCoStewardListOnloadMore()}
                          variant="outlined"
                          className="cancelbtn"
                          style={{ "text-transform": "none" }}
                        >
                          Load more
                        </Button>
                      </Col>
                    {/* ) : (
                      <></>
                    )} */}
                  </Row>
    </div>
  )
}

