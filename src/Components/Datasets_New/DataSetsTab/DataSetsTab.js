import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs, Button, useMediaQuery, useTheme } from "@mui/material";
import "./DataSetsTab.css";
import AddDataSetCardNew from "../AddDataSetCard";
import DataSetCardNew from "../DataSetCard";
import DataSetsTitleView from "./DataSetsTitleView";
import DataSetsListView from "../DataSetsListView";
import {
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../../Utils/Common";
import DatasetRequestTable from "../DatasetRequestTable/DatasetRequestTable";
import { CSSTransition } from "react-transition-group";
import NoData from "../../NoData/NoData";
import CategoryCard from "../CategoryBasedList/CategoryCard";
import { Col, Row } from "react-bootstrap";
import { Card } from "antd";

const gridStyle = {
  width: "25%",
  textAlign: "center",
  fontFamily: "Montserrat",
  fontWeight: "600",
  fontSize: "18px",
  cursor: "pointer",
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const DataSetsTab = ({
  history,
  addDataset,

  getDataSets,
  getOtherDataSets,
  datasetList,
  memberDatasetList,

  showLoadMoreAdmin,
  showLoadMoreMember,
  value,
  setValue,
  user,
  setType,
  setCategorises,
  setGeographies,
  setDates,
  setFromDate,
  setToDate,
  setSearchDatasetsName,

  setFilterState,
  filterState,

  categoryList, // all categories
  setUpdate,
  categorises,
  handleCheckBox,
  geographies,
  dates,
  setIsGrid,
  isGrid,
  setIsGridOther,
  isGridOther,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : "144px",
    marginRight: mobile || tablet ? "30px" : "144px",
  };

  const handleChange = (event, newValue) => {
    setType("");
    setCategorises([]);
    setGeographies([]);
    setDates([{ fromDate: null, toDate: null }]);
    setFromDate("");
    setToDate("");
    setSearchDatasetsName("");
    setFilterState({});
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 0) {
      getDataSets(false);
    }
    if (value === 1) {
      getOtherDataSets(false);
    }
  }, [value]);

  const handleCardClick = (id) => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return `/datahub/new_datasets/view/${id}`;
    } else if (isLoggedInUserParticipant()) {
      return `/participant/new_datasets/view/${id}`;
    } else if (user === "guest") {
      return `/home/datasets/${id}`;
    }
  };

  return (
    <Box className="w-100">
      <Box sx={containerStyle}>
        {user !== "guest" ? (
          <Box
            sx={{
              marginTop: "63px",
              borderColor: "divider",
              borderBottom: "1px solid #3D4A52 !important",
            }}
          >
            <Tabs
              className="tabs"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#00AB55 !important",
                },
                "& .MuiTab-root": {
                  color: "#637381 !important",
                  borderLeft: "none !important",
                  borderTop: "none !important",
                  borderRight: "none !important",
                },
                "& .Mui-selected": { color: "#00AB55 !important" },
              }}
              value={value}
              onChange={handleChange}
            >
              <Tab
                sx={{
                  "&.MuiButtonBase-root": {
                    minWidth: "180px",
                  },
                }}
                label={
                  <span
                    className={
                      value == 0 ? "tab_header_selected" : "tab_header"
                    }
                    id="dataset-my-orgnanisation-tab"
                  >
                    My Organisation
                  </span>
                }
              />
              <Tab
                sx={{
                  "&.MuiButtonBase-root": {
                    minWidth: "200px",
                  },
                }}
                label={
                  <span
                    className={
                      value == 1 ? "tab_header_selected" : "tab_header"
                    }
                    id="dataset-other-organisation-tab"
                  >
                    Other Organisation
                  </span>
                }
              />
              <Tab
                sx={{
                  "&.MuiButtonBase-root": {
                    minWidth: "200px",
                  },
                }}
                label={
                  <span
                    className={
                      value == 2 ? "tab_header_selected" : "tab_header"
                    }
                    id="dataset-requests-tab"
                  >
                    Requests
                  </span>
                }
              />
            </Tabs>
          </Box>
        ) : (
          ""
        )}
        <TabPanel value={value} index={0}>
          <Box className="mb-100">
            <DataSetsTitleView
              user={user}
              title={
                user === "guest"
                  ? "List of datasets"
                  : "My organisation datasets"
              }
              subTitle={
                user != "guest"
                  ? "Datasets uploaded by your organization."
                  : "Browse the list of datasets contributed by partiicpants."
              }
              isGrid={isGrid}
              setIsGrid={setIsGrid}
              history={history}
              addDataset={addDataset}
              categorises={categorises}
              geographies={geographies}
              dates={dates}
            />
            {datasetList.length > 0 ? (
              <>
                <CSSTransition
                  in={isGrid}
                  timeout={{
                    appear: 600,
                    enter: 700,
                    exit: 100,
                  }}
                  classNames="step"
                  unmountOnExit={true}
                >
                  <>
                    {console.log(categorises, "categorises1")}
                    {console.log(geographies, "geographies1")}
                    {console.log(dates, "dates1")}
                    {/* {console.log(
                      !filterState?.category?.length >= 0,
                      "!filterState?.category?.length >= 0"
                    )}
                    {console.log(
                      !filterState.geography__contains?.state?.name,
                      "!filterState.geography__contains?.state?.name"
                    )}
                    {console.log(
                      !filterState.geography__contains?.city?.name,
                      "!filterState.geography__contains?.city?.name"
                    )}
                    {console.log(
                      !filterState?.updated_at__range >= 0,
                      "!filterState?.updated_at__range >= 0 "
                    )} */}
                    {/* no category has been selected */}
                    {Object.keys(categorises).length <= 0 &&
                    !geographies[1] &&
                    !geographies[2] &&
                    !dates[0]?.fromDate &&
                    !dates[0]?.toDate &&
                    user !== "guest" ? (
                      <>
                        {/* <h3 style={{ fontWeight: "600" }}>Categories</h3> */}

                        {/* <div
                          style={{
                            height: "425px",
                            overflowY: "auto",
                            display: "grid",
                            gridTemplateColumns: "auto auto auto auto auto",
                            gap: "20px",
                            margin: "20px 0px",
                          }}
                        > */}
                        <Card
                          title={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontFamily: "Montserrat",
                              }}
                            >
                              <div>Categories : Themes</div>
                              <Button
                                onClick={() => history.push(addDataset())}
                                sx={{
                                  fontFamily: "Montserrat !important",
                                  fontWeight: 700,
                                  fontSize: "15px",
                                  width: "149px",
                                  height: "48px",
                                  border: "1px solid rgba(0, 171, 85, 0.48)",
                                  borderRadius: "8px",
                                  color: "#FFFFFF",
                                  background: "#00AB55",
                                  textTransform: "none",
                                  marginLeft: "52px",
                                  "&:hover": {
                                    background: "#00AB55",
                                  },
                                }}
                                id="dataset-add-new-dataset"
                              >
                                + New dataset
                              </Button>
                            </div>
                          }
                        >
                          {console.log(categorises, "categorises")}
                          {user !== "guest" &&
                            categoryList &&
                            categoryList["Themes"]?.map(
                              (eachMainCategory, index) => {
                                return (
                                  <Card.Grid
                                    style={gridStyle}
                                    onClick={() => {
                                      // handleCheckBox("theme")
                                      setCategorises({
                                        Themes: [eachMainCategory],
                                      });
                                      setUpdate((prev) => prev + 1);
                                    }}
                                  >
                                    {eachMainCategory}
                                  </Card.Grid>

                                  // <CategoryCard
                                  //   setUpdate={setUpdate}
                                  //   eachMainCategory={eachMainCategory}
                                  //   setCategorises={setCategorises}
                                  //   subCategories={
                                  //     categoryList[eachMainCategory]
                                  //   }
                                  //   handleCheckBox={handleCheckBox}
                                  // />
                                );
                              }
                            )}
                        </Card>
                        {/* </div> */}
                      </>
                    ) : (
                      // )}

                      <div className="datasets_card">
                        {user !== "guest" ? (
                          <AddDataSetCardNew
                            history={history}
                            addDataset={addDataset}
                          />
                        ) : (
                          ""
                        )}

                        {datasetList?.map((item, index) => (
                          <DataSetCardNew
                            index={index}
                            id="dataset-card-in-dataset"
                            key={item?.id}
                            history={history}
                            item={item}
                            value={
                              value === 0 && user !== "guest"
                                ? "my_organisation"
                                : ""
                            }
                            handleCardClick={
                              user === "guest"
                                ? () => {
                                    return `/home/datasets/${item.id}`;
                                  }
                                : handleCardClick
                            }
                          />
                        ))}
                      </div>
                    )}
                  </>
                </CSSTransition>
                <CSSTransition
                  in={!isGrid}
                  timeout={{
                    appear: 600,
                    enter: 700,
                    exit: 100,
                  }}
                  classNames="step"
                  unmountOnExit={true}
                >
                  <DataSetsListView
                    datasets={datasetList}
                    history={history}
                    value={
                      value === 0 && user !== "guest" ? "my_organisation" : ""
                    }
                    handleCardClick={handleCardClick}
                  />
                </CSSTransition>
              </>
            ) : (
              <NoData
                title={"There are no datasets"}
                subTitle={
                  "As of now there are no datasets, so add new datasets!"
                }
                primaryButton={"Add new Dataset "}
                primaryButtonOnClick={() => history.push(addDataset())}
              />
            )}

            {/* {!filterState?.category?.length >= 0 &&
                    !filterState.geography__contains?.state?.name &&
                    !filterState.geography__contains?.city?.name &&
                    !filterState?.updated_at__range >= 0 ? */}

            {console.log(
              "load more",
              showLoadMoreAdmin,
              !Object.keys(categorises).length <= 0 && geographies[1],
              geographies[2],
              dates,
              user
            )}
            {showLoadMoreAdmin &&
            (!Object.keys(categorises).length <= 0 ||
              geographies[1] ||
              geographies[2] ||
              dates[0]?.fromDate ||
              dates[0]?.toDate ||
              user == "guest") ? (
              <Button
                variant="outlined"
                className={
                  mobile || tablet ? "d_button_style_md" : "d_button_style"
                }
                onClick={() => getDataSets(true)}
                id="dataset-loadmore-btn"
                data-testid="load_more_admin"
              >
                Load more
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box className="mb-100">
            <DataSetsTitleView
              title={"Other organisation datasets"}
              subTitle=" Explore details of datasets uploaded by other organizations."
              isGrid={isGridOther}
              setIsGrid={setIsGridOther}
              history={history}
              addDataset={addDataset}
              categorises={categorises}
              geographies={geographies}
              dates={dates}
            />
            {memberDatasetList.length > 0 ? (
              <>
                {isGridOther ? (
                  <>
                    {Object.keys(categorises).length <= 0 &&
                    !geographies[1] &&
                    !geographies[2] &&
                    !dates[0]?.fromDate &&
                    !dates[0]?.toDate ? (
                      <>
                        {/* <h3 style={{ fontWeight: "600" }}>Themes</h3>

                        <div
                          style={{
                            height: "425px",
                            overflowY: "auto",
                            display: "grid",
                            gridTemplateColumns: "auto auto auto auto auto",
                            gap: "20px",
                            margin: "20px 0px",
                          }}
                        >
                          {console.log(categorises, "categorises")}
                          {user !== "guest" &&
                            categoryList &&
                            categoryList["Themes"]?.map(
                              (eachMainCategory, index) => {
                                return (
                                  <CategoryCard
                                    setUpdate={setUpdate}
                                    eachMainCategory={eachMainCategory}
                                    setCategorises={setCategorises}
                                    subCategories={
                                      categoryList[eachMainCategory]
                                    }
                                  />
                                );
                              }
                            )}
                        </div> */}
                        <Card
                          title={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                fontFamily: "Montserrat",
                              }}
                            >
                              <div>Categories : Themes</div>
                              {/* <div>Add new dataset</div> */}
                            </div>
                          }
                        >
                          {console.log(categorises, "categorises")}
                          {user !== "guest" &&
                            categoryList &&
                            categoryList["Themes"]?.map(
                              (eachMainCategory, index) => {
                                return (
                                  <Card.Grid
                                    style={gridStyle}
                                    onClick={() => {
                                      // handleCheckBox("theme")
                                      setCategorises({
                                        Themes: [eachMainCategory],
                                      });
                                      setUpdate((prev) => prev + 1);
                                    }}
                                  >
                                    {eachMainCategory}
                                  </Card.Grid>

                                  // <CategoryCard
                                  //   setUpdate={setUpdate}
                                  //   eachMainCategory={eachMainCategory}
                                  //   setCategorises={setCategorises}
                                  //   subCategories={
                                  //     categoryList[eachMainCategory]
                                  //   }
                                  //   handleCheckBox={handleCheckBox}
                                  // />
                                );
                              }
                            )}
                        </Card>
                      </>
                    ) : (
                      <div className="datasets_card">
                        {memberDatasetList?.map((item, index) => (
                          <DataSetCardNew
                            index={index}
                            key={item?.id}
                            value={value === 1 ? "other_organisation" : ""}
                            history={history}
                            item={item}
                            handleCardClick={handleCardClick}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <DataSetsListView
                    datasets={memberDatasetList}
                    value={value === 1 ? "other_organisation" : ""}
                    history={history}
                    handleCardClick={handleCardClick}
                  />
                )}
              </>
            ) : (
              <NoData
                title={"There are no datasets"}
                subTitle={
                  "As of now there are no datasets from other organisation"
                }
              />
            )}
            {(showLoadMoreMember && !Object.keys(categorises).length <= 0) ||
            geographies[1] ||
            geographies[2] ||
            dates[0]?.fromDate ||
            dates[0]?.toDate ? (
              <Button
                variant="outlined"
                className={
                  mobile || tablet ? "d_button_style_md" : "d_button_style"
                }
                onClick={() => getOtherDataSets(true)}
                id="dataset-list-view-load-more-btn"
                data-testid="load_more_member"
              >
                Load more
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DatasetRequestTable />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default DataSetsTab;
