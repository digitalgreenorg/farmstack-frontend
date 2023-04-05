import { Typography, Card } from "@mui/material";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import CustomCard from "../Card/CustomCard";
import LocalStyle from "./CostewardAndParticipants.module.css";

const CoStewardAndParticipantsCard = (props) => {
  const { coStewardOrParticipantsData, viewType, setViewType, title } = props;

  //   const viewType = grid
  return (
    <>
      <Row className={LocalStyle.titleContainer}>
        <Col xs={6} sm={6} md={8} xl={8}>
          <Typography
            id={title + "title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            {title}
          </Typography>
        </Col>
        <Col
          className={LocalStyle.listAndGridViewButton}
          xs={6}
          sm={6}
          md={4}
          xl={4}
        >
          <div
            id={title + "grid-view"}
            className={LocalStyle.viewType}
            onClick={() => setViewType("grid")}
          >
            <img
              src={
                viewType === "grid"
                  ? require("../../Assets/Img/grid_view_active.svg")
                  : require("../../Assets/Img/grid_view.svg")
              }
            />
            <span
              id={title + "grid-view-title"}
              className={
                viewType === "grid"
                  ? `${LocalStyle.activeView}`
                  : `${LocalStyle.inActiveView} ` +
                    `${GlobalStyle.size16} ${GlobalStyle.bold400}`
              }
            >
              Grid view
            </span>
          </div>
          <div
            id={title + "list-view"}
            onClick={() => setViewType("list")}
            className={LocalStyle.viewType}
          >
            <img
              src={
                viewType === "list"
                  ? require("../../Assets/Img/list_view_active.svg")
                  : require("../../Assets/Img/list_view.svg")
              }
            />
            <span
              id={title + "list-view-title"}
              className={
                viewType === "list"
                  ? `${LocalStyle.activeView}`
                  : `${LocalStyle.inActiveView} ` +
                    `${GlobalStyle.size16} ${GlobalStyle.bold400}`
              }
            >
              List view
            </span>
          </div>
        </Col>
      </Row>
      {viewType === "grid" ? (
        <Row
          id={title + "grid-card-container-id"}
          className={LocalStyle.cardContainer}
        >
          {coStewardOrParticipantsData?.map((item) => {
            return (
              <Col
                id={title + "grid-card-id"}
                className={GlobalStyle.padding0}
                xs={12}
                sm={12}
                md={6}
                xl={4}
              >
                <CustomCard />
              </Col>
            );
          })}
        </Row>
      ) : (
        <>
          <Row>
            {title === "Co-steward" ? (
              <>
                <Col
                  className={`${LocalStyle.listHeader1} ${GlobalStyle.size16} ${GlobalStyle.bold600}`}
                  xs={4}
                  sm={4}
                  md={4}
                  xl={4}
                >
                  Co-steward organisation name
                </Col>
                <Col
                  className={`${GlobalStyle.size16} ${GlobalStyle.bold600}`}
                  xs={4}
                  sm={4}
                  md={4}
                  xl={4}
                >
                  No.of datasets
                </Col>
                <Col
                  className={`${GlobalStyle.size16} ${GlobalStyle.bold600}`}
                  xs={4}
                  sm={4}
                  md={4}
                  xl={4}
                >
                  No.of participants
                </Col>
              </>
            ) : title === "Participants" ? (
              <>
                <Col
                  className={`${LocalStyle.listHeader1} ${GlobalStyle.size16} ${GlobalStyle.bold600}`}
                  xs={6}
                  sm={6}
                  md={6}
                  xl={6}
                >
                  Organisation name
                </Col>
                <Col
                  className={`${GlobalStyle.size16} ${GlobalStyle.bold600}`}
                  xs={6}
                  sm={6}
                  md={6}
                  xl={6}
                >
                  No.of datasets
                </Col>
              </>
            ) : (
              ""
            )}
          </Row>
          <hr />
          <div className={LocalStyle.cardContainerList}>
            {coStewardOrParticipantsData?.map((item, index) => {
              return (
                <>
                  <Row id={title + "-list-view-" + index}>
                    {title === "Co-steward" ? (
                      <>
                        <Col
                          id={title + " list-view-title-" + index}
                          className={LocalStyle.content_title}
                          xs={4}
                          sm={4}
                          md={4}
                          xl={4}
                        >
                          International Center for Tropical Agriculture
                        </Col>
                        <Col
                          xs={4}
                          sm={4}
                          md={4}
                          xl={4}
                          id={title + " list-view-datasets-no-" + index}
                        >
                          03
                        </Col>
                        <Col
                          id={title + " list-view-participant-no-" + index}
                          xs={4}
                          sm={4}
                          md={4}
                          xl={4}
                        >
                          03
                        </Col>
                      </>
                    ) : title === "Participants" ? (
                      <>
                        <Col
                          id={title + " list-view-title-" + index}
                          className={LocalStyle.content_title}
                          xs={6}
                          sm={6}
                          md={6}
                          xl={6}
                        >
                          International Center for Tropical Agriculture
                        </Col>
                        <Col
                          id={title + " list-view-datasets-no-" + index}
                          xs={6}
                          sm={6}
                          md={6}
                          xl={6}
                        >
                          03
                        </Col>
                      </>
                    ) : (
                      ""
                    )}
                  </Row>
                  <hr />
                </>
              );
            })}
          </div>
        </>
      )}
      {/* </Row> */}
      <Row className={LocalStyle.buttonContainer}>
        <Col xs={0} sm={0} md={2} lg={4}></Col>
        <Col xs={12} sm={12} md={8} lg={4}>
          <Button
            id={title + "-load-more-button"}
            variant="outlined"
            className={`${GlobalStyle.outlined_button} ${LocalStyle.loadMoreButton}`}
          >
            Load more
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CoStewardAndParticipantsCard;
