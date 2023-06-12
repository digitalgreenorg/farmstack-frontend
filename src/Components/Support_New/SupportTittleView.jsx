import React from "react";
import { useState, useContext, useEffect } from "react";
import { Button, Typography, Divider } from "@mui/material";
import { Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import SupportCard from "./SupportCard";
import SupportList from "./SupportList";
import { Row, Col } from "react-bootstrap";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import HTTPService from "../../Services/HTTPService";
import UrlConstants from "../../Constants/UrlConstants";
import {
  GetErrorHandlingRoute,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
  dateTimeFormat,
  getUserMapId,
} from "../../Utils/Common";
import LocalStyle from "./Support.module.css";
import NoData from "../NoData/NoData";

export default function SupportTittleView({
  tabValue,
  setTabValue,
  tabLabels,
  setTabLabels,
  ticketList,
  setTicketList,
  loadMoreUrl,
  setLoadMoreUrl,
  loadMoreButton,
  setLoadMoreButton,
}) {
  const { callLoader, callToast, isLoading } = useContext(FarmStackContext);
  const [isGrid, setIsGrid] = useState(true);
  const history = useHistory();

  const handleAddTicketRoutes = () => {
    if (isLoggedInUserCoSteward()) {
      return `/datahub/support/add`;
    } else if (isLoggedInUserParticipant()) {
      return `/participant/support/add`;
    }
  };
  const getListOfTickets = () => {
    console.log("get list is happening");
     
    let selectedTabs = tabValue === 1 ? true : ""
    let url = UrlConstants.base_url + UrlConstants.support_ticket_tab;
    let payload = {
      others: selectedTabs,
      user_map: getUserMapId()
    };
    callLoader(true);
    HTTPService(
      "POST",
      url,
      JSON.stringify(payload),
      false,
      true
    )
      .then((response) => {
        callLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        if (response?.data?.results) setTicketList(response.data.results);
      })
      .catch(async (e) => {
        callLoader(false);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
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

  const getTicketListOnLoadMore = () => {
    callLoader(true);
    HTTPService("POST", loadMoreUrl, "", false, true)
      .then((response) => {
        callLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) {
            setLoadMoreUrl(response.data.next);
          }
        }
        let datalist = ticketList;
        if (response?.data?.results) {
          let finalDataList = [...datalist, ...response.data.results];
          setTicketList(finalDataList);
        }
      })
      .catch(async (e) => {
        callLoader(false);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
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
  const handleSupportViewRoute = (id) => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return `/datahub/support/view/${id}`;
    } else if (isLoggedInUserParticipant()) {
      return `/participant/support/view/${id}`;
    }
  };

  useEffect(() => {
    getListOfTickets();
  }, []);

  useEffect(() => {
    if (isLoggedInUserAdmin()) {
      setTabLabels(["Co-Steward Tickets", "Other Tickets"]);
    }

    localStorage.removeItem("participantAndCostewardTabValue");
  }, []);
  return (
    <>
      {isLoggedInUserAdmin() || isLoggedInUserCoSteward() ? (
        <Container>
          <div className="d-flex justify-content-between">
            <div className="bold_title">{"List of my ticktes"}</div>
            {ticketList.length > 0 && !isLoading ? (
              <div className="d-flex align-items-center mt-50 mb-20">
                <div
                  className="d-flex mr-30 cursor-pointer"
                  onClick={() => setIsGrid(false)}
                  id="dataset-list-view-id"
                >
                  <img
                    className="mr-7"
                    src={require(`../../Assets/Img/${
                      isGrid ? "list_view_gray.svg" : "list_view_green.svg"
                    }`)}
                  />
                  <Typography
                    sx={{
                      color: !isGrid ? "#00AB55" : "#3D4A52",
                    }}
                  >
                    List view
                  </Typography>
                </div>
                <div
                  className="d-flex cursor-pointer"
                  onClick={() => setIsGrid(true)}
                  id="dataset-grid-view-id"
                >
                  <img
                    className="mr-7"
                    src={require(`../../Assets/Img/${
                      isGrid ? "grid_view_green.svg" : "grid_view_gray.svg"
                    }`)}
                  />
                  <Typography
                    sx={{
                      color: isGrid ? "#00AB55" : "#3D4A52",
                    }}
                  >
                    Grid view
                  </Typography>
                </div>
                {!isLoggedInUserAdmin() && tabValue !== 1 ? (
                  <div className="d-flex">
                    <Button
                      onClick={() => history.push(handleAddTicketRoutes())}
                      sx={{
                        fontFamily: "Montserrat !important",
                        fontWeight: 700,
                        fontSize: "15px",
                        width: "max-content",
                        height: "48px",
                        border: "1px solid rgba(0, 171, 85, 0.48)",
                        borderRadius: "8px",
                        background: "#FFFFFF",
                        color: "#00AB55",
                        textTransform: "none",
                        marginLeft: "52px",
                        "&:hover": {
                          background: "#00AB55",
                          color: "#FFFFFF",
                        },
                      }}
                      id="dataset-add-new-dataset"
                    >
                      + Raise new request
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {" "}
            <Divider />
          </div>
          {tabValue === 0 && (
            <>
              {isGrid ? (
                <>
                  {ticketList.length === 0 && !isLoading ? (
                    <Box p={3}>
                      <NoData
                        title={"There is no tickets"}
                        subTitle={
                          "As of now there is no tickets from co-stewards end"
                        }
                      />
                    </Box>
                  ) : (
                    <div>
                      <Row>
                        {ticketList?.map((data, index) => (
                          <Col
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            style={{ "margin-top": "15px" }}
                          >
                            <SupportCard
                              date={
                                data?.created_at
                                  ? dateTimeFormat(data?.created_at, false)
                                  : "NA"
                              }
                              ticketname={data?.ticket_title}
                              org={data?.user_map?.organization?.name}
                              category={data?.category}
                              ticketstatus={data?.status}
                              index={index}
                              user_name={data?.user_map?.user?.first_name}
                              handleSupportViewRoute={handleSupportViewRoute}
                              supportId={data?.id}

                            />
                          </Col>
                        ))}
                      </Row>
                      <Row style={{ "margin-top": "10px" }}>
                        <Col xs={12} sm={12} md={6} lg={3}></Col>
                        {loadMoreButton ? (
                          <Col xs={12} sm={12} md={6} lg={6}>
                            <Button
                              onClick={() => getTicketListOnLoadMore()}
                              variant="outlied"
                              className={`${LocalStyle.pButtonStyle}`}
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
                  )}
                </>
              ) : (
                <>
                  {ticketList.length > 0 && isLoading ? (
                    <>
                      <div>
                        <SupportList
                          ticketList={ticketList}
                          handleSupportViewRoute={handleSupportViewRoute}
                        />
                      </div>
                      <div>
                        <Row style={{ "margin-top": "10px" }}>
                          <Col xs={12} sm={12} md={6} lg={3}></Col>
                          {loadMoreButton ? (
                            <Col xs={12} sm={12} md={6} lg={6}>
                              <Button
                                onClick={() => getTicketListOnLoadMore()}
                                variant="outlied"
                                className={`${LocalStyle.pButtonStyle}`}
                                style={{ "text-transform": "none" }}
                              >
                                Load more
                              </Button>
                            </Col>
                          ) : (
                            <></>
                          )}
                        </Row>
                      </div>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}{" "}
            </>
          )}
          {tabValue === 1 && (
            <>
              {isGrid ? (
                <>
                  {ticketList.length === 0 && !isLoading ? (
                    <Box p={3}>
                      <NoData
                        title={"There is no tickets"}
                        subTitle={"As of now there is no tickets from others"}
                      />
                    </Box>
                  ) : (
                    <div>
                      <Row>
                        {ticketList?.map((data, index) => (
                          <Col
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            style={{ "margin-top": "15px" }}
                          >
                            <SupportCard
                              date={
                                data?.created_at
                                  ? dateTimeFormat(data?.created_at, false)
                                  : "NA"
                              }
                              ticketname={data?.ticket_title}
                              org={data?.user_map?.organization?.name}
                              category={data?.category}
                              ticketstatus={data?.status}
                              index={index}
                              user_name={data?.user_map?.user?.first_name}
                              handleSupportViewRoute={handleSupportViewRoute}
                              supportId={data?.id}
                            />
                          </Col>
                        ))}
                      </Row>
                      <Row style={{ "margin-top": "10px" }}>
                        <Col xs={12} sm={12} md={6} lg={3}></Col>
                        {loadMoreButton ? (
                          <Col xs={12} sm={12} md={6} lg={6}>
                            <Button
                              onClick={() => getTicketListOnLoadMore()}
                              variant="outlied"
                              className={`${LocalStyle.pButtonStyle}`}
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
                  )}
                </>
              ) : (
                <>
                  <div>
                    <SupportList
                      ticketList={ticketList}
                      handleSupportViewRoute={handleSupportViewRoute}
                    />
                  </div>
                  <div>
                    <Row style={{ "margin-top": "10px" }}>
                      <Col xs={12} sm={12} md={6} lg={3}></Col>
                      {loadMoreButton ? (
                        <Col xs={12} sm={12} md={6} lg={6}>
                          <Button
                            onClick={() => getTicketListOnLoadMore()}
                            variant="outlied"
                            className={`${LocalStyle.pButtonStyle}`}
                            style={{ "text-transform": "none" }}
                          >
                            Load more
                          </Button>
                        </Col>
                      ) : (
                        <></>
                      )}
                    </Row>
                  </div>{" "}
                </>
              )}{" "}
            </>
          )}
        </Container>
      ) : (
        <Container>
          <div className="d-flex justify-content-between">
            <div className="bold_title">{"List of my ticktes"}</div>
            {ticketList.length > 0 && !isLoading ? (
              <div className="d-flex align-items-center mt-50 mb-20">
                <div
                  className="d-flex mr-30 cursor-pointer"
                  onClick={() => setIsGrid(false)}
                  id="dataset-list-view-id"
                >
                  <img
                    className="mr-7"
                    src={require(`../../Assets/Img/${
                      isGrid ? "list_view_gray.svg" : "list_view_green.svg"
                    }`)}
                  />
                  <Typography
                    sx={{
                      color: !isGrid ? "#00AB55" : "#3D4A52",
                    }}
                  >
                    List view
                  </Typography>
                </div>
                <div
                  className="d-flex cursor-pointer"
                  onClick={() => setIsGrid(true)}
                  id="dataset-grid-view-id"
                >
                  <img
                    className="mr-7"
                    src={require(`../../Assets/Img/${
                      isGrid ? "grid_view_green.svg" : "grid_view_gray.svg"
                    }`)}
                  />
                  <Typography
                    sx={{
                      color: isGrid ? "#00AB55" : "#3D4A52",
                    }}
                  >
                    Grid view
                  </Typography>
                </div>
                <div className="d-flex">
                  <Button
                    onClick={() => history.push(handleAddTicketRoutes())}
                    sx={{
                      fontFamily: "Montserrat !important",
                      fontWeight: 700,
                      fontSize: "15px",
                      width: "max-content",
                      height: "48px",
                      border: "1px solid rgba(0, 171, 85, 0.48)",
                      borderRadius: "8px",
                      background: "#FFFFFF",
                      color: "#00AB55",
                      textTransform: "none",
                      marginLeft: "52px",
                      "&:hover": {
                        background: "#00AB55",
                        color: "#FFFFFF",
                      },
                    }}
                    id="dataset-add-new-dataset"
                  >
                    + Raise new request
                  </Button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {" "}
            <Divider />
          </div>
          {isGrid ? (
            <>
              {ticketList.length === 0 && !isLoading ? (
                <Box p={3}>
                  <NoData
                    title={"There is no tickets"}
                    subTitle={
                      "As of now there is no tickets from your end, so rise a ticket!"
                    }
                    primaryButton={"+ Raise new request "}
                    primaryButtonOnClick={() =>
                      history.push(handleAddTicketRoutes())
                    }
                  />
                </Box>
              ) : (
                <div>
                  <Row>
                    {ticketList?.map((data, index) => (
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        style={{ "margin-top": "15px" }}
                      >
                        <SupportCard
                          date={
                            data?.created_at
                              ? dateTimeFormat(data?.created_at, false)
                              : "NA"
                          }
                          ticketname={data?.ticket_title}
                          org={data?.user_map?.organization?.name}
                          category={data?.category}
                          ticketstatus={data?.status}
                          index={index}
                          user_name={data?.user_map?.user?.first_name}
                          handleSupportViewRoute={handleSupportViewRoute}
                          supportId={data?.id}
                        />
                      </Col>
                    ))}
                  </Row>
                  <Row style={{ "margin-top": "10px" }}>
                    <Col xs={12} sm={12} md={6} lg={3}></Col>
                    {loadMoreButton ? (
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <Button
                          onClick={() => getTicketListOnLoadMore()}
                          variant="outlied"
                          className={`${LocalStyle.pButtonStyle}`}
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
              )}
            </>
          ) : (
            <>
              <div>
                <SupportList
                  ticketList={ticketList}
                  handleSupportViewRoute={handleSupportViewRoute}
                />
              </div>
              <div>
                <Row style={{ "margin-top": "10px" }}>
                  <Col xs={12} sm={12} md={6} lg={3}></Col>
                  {loadMoreButton ? (
                    <Col xs={12} sm={12} md={6} lg={6}>
                      <Button
                        onClick={() => getTicketListOnLoadMore()}
                        variant="outlied"
                        className={`${LocalStyle.pButtonStyle}`}
                        style={{ "text-transform": "none" }}
                      >
                        Load more
                      </Button>
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              </div>{" "}
            </>
          )}
        </Container>
      )}
    </>
  );
}
