import { Typography, Card, useTheme, useMediaQuery, Box } from "@mui/material";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import CustomCard from "../Card/CustomCard";
import LocalStyle from "./CostewardAndParticipants.module.css";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import EmptyFile from "../Datasets_New/TabComponents/EmptyFile";

const CoStewardAndParticipantsCard = (props) => {
  const {
    coStewardOrParticipantsList,
    viewType,
    setViewType,
    title, // card is being render based in title if title is changing check all condition based on title
    handleLoadMoreButton,
    loadMoreButton,
    user,
    guestUser,
    isCosteward,
  } = props;
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : "144px",
    marginRight: mobile || tablet ? "30px" : "144px",
  };
  // if(!viewType) viewType = "grid"

  const handleViewDataset = (id) => {
    if (guestUser && isCosteward) {
      history.push(`/home/costeward/view/${id}`);
    } else if (guestUser && !isCosteward) {
      history.push(`/home/participants/view/${id}`);
    } else if (title == "Participants" || title == "Co-steward participants") {
      history.push(`/datahub/participants/view/${id}`);
    } else if (title == "Co-steward") {
      history.push(`/datahub/costeward/view/${id}`);
    } else if (title == "New participant requests") {
      history.push(`/datahub/participants/view/approve/${id}`);
    }
    // if (
    //   (title == "Participants" || title == "Co-steward participants") &&
    //   user == "guest"
    // ) {
    //   history.push(`/home/participants/view/${id}`);
    // } else if (title == "Participants" || title == "Co-steward participants") {
    //   history.push(`/datahub/participants/view/${id}`);
    // } else if (title == "Co-steward") {
    //   history.push(`/datahub/costeward/view/${id}`);
    // } else if (title == "New participant requests") {
    //   history.push(`/datahub/participants/view/approve/${id}`);
    // } else if (title == "Our Participants are") {
    //   history.push(`/home/participants/view/${id}`);
    // } else if (title == "Our co-stewards are") {
    //   history.push(`/home/costeward/view/${id}`);
    // }
  };

  // console.log("props in CoStewardAndParticipantsCard", props);
  let index = 0;
  //   const viewType = grid
  return (
    <>
      <Row
        className={
          mobile ? LocalStyle.titleContainerSm : LocalStyle.titleContainer
        }
      >
        <Box>
          <Typography
            id={title?.split(" ")[0]   + "title"}
            className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
          >
            {title}
          </Typography>
        </Box>
        {viewType === "list" && title === "Participants" ? (
          <Col
            className={LocalStyle.listViewButton}
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            {title == "Participants" ? (
              <Row>
                <Col lg={6}>
                  <div>
                    <Button
                      id="add-participant-submit-button"
                      onClick={() =>
                        history.push("/datahub/participants/invite")
                      }
                      className={`${GlobalStyle.outlined_button} ${LocalStyle.primary}`}
                    >
                      + Invite Participants
                    </Button>
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <Button
                      id="add-participant-submit-button"
                      onClick={() => history.push("/datahub/participants/add")}
                      className={`${GlobalStyle.primary_button} ${LocalStyle.primary}`}
                    >
                      Add New Participants
                    </Button>
                  </div>
                </Col>
              </Row>
            ) : (
              ""
            )}
            <Row className={LocalStyle.listAndGridViewTextContainer}>
              <div
                id={title?.split(" ")[0]   + "grid-view"}
                className={LocalStyle.viewType}
                onClick={() => setViewType("grid")}
              >
                <img
                  className={LocalStyle.listAndgridViewImg}
                  src={
                    viewType === "grid"
                      ? require("../../Assets/Img/grid_view_active.svg")
                      : viewType === "list"
                      ? require("../../Assets/Img/grid_view.svg")
                      : ""
                  }
                />
                <span
                  id={title?.split(" ")[0]   + "grid-view-title"}
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
                id={title?.split(" ")[0]   + "list-view"}
                onClick={() => setViewType("list")}
                className={LocalStyle.viewType}
              >
                <img
                  className={LocalStyle.listAndgridViewImg}
                  src={
                    viewType === "list"
                      ? require("../../Assets/Img/list_view_active.svg")
                      : require("../../Assets/Img/list_view.svg")
                  }
                />
                <span
                  id={title?.split(" ")[0]   + "list-view-title"}
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
            </Row>
          </Col>
        ) : viewType && setViewType ? (
          <Col
            className={LocalStyle.listAndGridViewButton}
            xs={6}
            sm={6}
            md={6}
            xl={6}
          >
            {title == "Participants" ? (
              <div>
                <Button
                  id="add-participant-submit-button"
                  onClick={() => history.push("/datahub/participants/invite")}
                  className={`${GlobalStyle.primary_button} ${LocalStyle.primary}`}
                >
                  + Invite Participants
                </Button>
              </div>
            ) : (
              ""
            )}
            <div
              id={title?.split(" ")[0]  + "grid-view"}
              className={LocalStyle.viewType}
              onClick={() => setViewType("grid")}
            >
              <img
                className={LocalStyle.listAndgridViewImg}
                src={
                  viewType === "grid"
                    ? require("../../Assets/Img/grid_view_active.svg")
                    : viewType === "list"
                    ? require("../../Assets/Img/grid_view.svg")
                    : ""
                }
              />
              <span
                id={title?.split(" ")[0]  + "grid-view-title"}
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
              id={title?.split(" ")[0]  + "list-view"}
              onClick={() => setViewType("list")}
              className={LocalStyle.viewType}
            >
              <img
                className={LocalStyle.listAndgridViewImg}
                src={
                  viewType === "list"
                    ? require("../../Assets/Img/list_view_active.svg")
                    : require("../../Assets/Img/list_view.svg")
                }
              />
              <span
                id={title?.split(" ")[0]  + "list-view-title"}
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
        ) : (
          ""
        )}
      </Row>
      {/* {viewType === "grid" || !viewType ? ( */}
      <CSSTransition
        appear={viewType === "grid" || !viewType}
        in={viewType === "grid" || !viewType}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      >
        <Row
          id={title?.split(" ")[0]  + "grid-card-container-id"}
          className={LocalStyle.cardContainer}
        >
          {title == "Participants" ? (
            <Col
              id={title?.split(" ")[0]  + "grid-card-id"}
              className={GlobalStyle.padding0}
              xs={12}
              sm={12}
              md={6}
              xl={4}
              onClick={() => history.push("/datahub/participants/add")}
            >
              <Card
                id={`${title ? title?.split(" ")[0]  : "title"}-card-${index ? index : ""}`}
                className={LocalStyle.card}
              >
                {/* <div
                  id={`${title ? title : "title"}-card-title-${
                    index ? index : ""
                  }`}
                  className={LocalStyle.content_title}
                >
                  
                </div> */}
                <Typography
                  id={title?.split(" ")[0]  + "title"}
                  className={`${GlobalStyle.size20} ${GlobalStyle.bold700} ${LocalStyle.addTitle}`}
                >
                  Add New Participant
                </Typography>
                <div className={LocalStyle.img_container}>
                  <img
                    className={LocalStyle.img}
                    id={`${title ? title?.split(" ")[0]  : "title"}-card-img-${
                      index ? index : ""
                    }`}
                    src={require("../../Assets/Img/add_img.svg")}
                    alt="new"
                  />
                </div>
                <div
                  id={`${title ? title?.split(" ")[0]  : "title"}-card-title-${
                    index ? index : ""
                  }`}
                  className={LocalStyle.addCardDescription}
                >
                  Add details about your dataset and make discoverable to other
                  participants in our network.
                </div>
              </Card>
            </Col>
          ) : (
            ""
          )}
          {coStewardOrParticipantsList?.map((participant, index) => {
            let id = participant?.user_id;
            return (
              <Col
                id={title?.split(" ")[0]  + "grid-card-id"+index}
                className={GlobalStyle.padding0}
                xs={12}
                sm={12}
                md={6}
                xl={4}
                onClick={() => handleViewDataset(id)}
              >
                <CustomCard
                  image={participant?.organization?.logo}
                  title={participant?.organization?.name}
                  subTitle1="Datasets"
                  subTitle2={
                    title == "Participants" || title == "Our Participants are"
                      ? "Root user"
                      : "No.of participants"
                  }
                  subTitle1Value={participant?.dataset_count}
                  subTitle2Value={
                    title == "Participants" || title == "Our Participants are"
                      ? participant?.user?.first_name
                      : participant?.number_of_participants
                  }
                  index={index}
                />
              </Col>
            );
          })}
          {/* {!coStewardOrParticipantsList?.length ? (
            <div style={{ margin: "auto" }}>
              <EmptyFile text="Nothing found!" />
            </div>
          ) : (
            ""
          )} */}
        </Row>
      </CSSTransition>
      {/* ) : ( */}
      <CSSTransition
        appear={viewType !== "grid"}
        in={viewType !== "grid"}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      >
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
            ) : title === "Participants" ||
              title === "New participant requests" ? (
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
          {/* <hr /> */}
          <div className={LocalStyle.cardContainerList}>
            {coStewardOrParticipantsList?.map((item, index) => {
              return (
                <>
                  <Row
                    id={title + "-list-view-" + index}
                    className="d-flex justify-content-between mb-20 mt-20 cursor-pointer"
                  >
                    {title === "Co-steward" ? (
                      <>
                        <Col
                          onClick={() => handleViewDataset(item?.user_id)}
                          id={title?.split(" ")[0]  + "list-view-title-" + index}
                          className={
                            LocalStyle.content_title +
                            " datasets_list_view_text datasets_list_view_name green_text w-100 text-left"
                          }
                          xs={4}
                          sm={4}
                          md={4}
                          xl={4}
                        >
                          {item?.organization?.name}
                        </Col>
                        <Col
                          xs={4}
                          sm={4}
                          md={4}
                          xl={4}
                          id={title + " list-view-datasets-no-" + index}
                        >
                          {item?.dataset_count}
                        </Col>
                        <Col
                          id={title + " list-view-participant-no-" + index}
                          xs={4}
                          sm={4}
                          md={4}
                          xl={4}
                        >
                          {item?.number_of_participants}
                        </Col>
                      </>
                    ) : title === "Participants" ||
                      title === "New participant requests" ? (
                      <>
                        <Col
                          onClick={() => handleViewDataset(item?.user_id)}
                          id={title?.split(" ")[0]  + "list-view-title-" + index}
                          className={LocalStyle.content_title}
                          xs={6}
                          sm={6}
                          md={6}
                          xl={6}
                        >
                          {item?.organization?.name}
                        </Col>
                        <Col
                          id={title?.split(" ")[0]  + " list-view-datasets-no-" + index}
                          xs={6}
                          sm={6}
                          md={6}
                          xl={6}
                        >
                          {item?.dataset_count}
                        </Col>
                      </>
                    ) : (
                      ""
                    )}
                  </Row>
                  {/* <hr /> */}
                </>
              );
            })}
          </div>
        </>
      </CSSTransition>

      {/* // )} */}
      {/* </Row> */}
      {loadMoreButton ? (
        <Box className={LocalStyle.buttonContainer}>
          <Button
            onClick={handleLoadMoreButton}
            variant="outlined"
            className={`${
              mobile || tablet
                ? LocalStyle.pButtonStyleMd
                : LocalStyle.pButtonStyle
            }`}
            id={title?.split(" ")[0]  + "-load-more-button"}
          >
            Load more
          </Button>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default CoStewardAndParticipantsCard;
