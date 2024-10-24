import React, { useState, useEffect, useContext } from "react";
import { Box, Tab, Tabs, Button, useMediaQuery, useTheme } from "@mui/material";
import "./DataSetsTab.css";
import AddDataSetCardNew from "../AddDataSetCard";
import DataSetCardNew from "../DataSetCard";
import DataSetsTitleView from "./DataSetsTitleView";
import DataSetsListView from "../DataSetsListView";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../../Utils/Common";
import DatasetRequestTable from "../DatasetRequestTable/DatasetRequestTable";
import { CSSTransition } from "react-transition-group";
import NoData from "../../NoData/NoData";
import { Card } from "antd";
import { FarmStackContext } from "common/components/context/DefaultContext/FarmstackProvider";
import labels from "common/constants/labels";

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

  categoryList, // master data
  subCategoryIds, // filter selected categeories
  themesCategories,
  setUpdate,
  categorises,
  geographies,
  dates,
  setIsGrid,
  isGrid,
  setIsGridOther,
  isGridOther,
  searchDatasetsName,
  callApply,
  setShowAllDataset,
  showAllDataset,
  clearAllFilterBackToListingOfCategory,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : "144px",
    marginRight: mobile || tablet ? "30px" : "144px",
  };

  const gridStyle = {
    width: mobile || tablet ? "50%" : "25%",
    textAlign: "center",
    fontFamily: "Arial",
    fontWeight: "600",
    fontSize: "18px",
    cursor: "pointer",
  };
  const exploreButton = {
    color: "#00A94F",
  };
  const { isLoading } = useContext(FarmStackContext);

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

  // useEffect(() => {
  //   setShowAllDataset(false);
  // }, [value]);

  return (
    <Box className="w-100 main_box_for_dataset_listing">
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
                  backgroundColor: "#00A94F !important",
                },
                "& .MuiTab-root": {
                  color: "#637381 !important",
                  borderLeft: "none !important",
                  borderTop: "none !important",
                  borderRight: "none !important",
                },
                "& .Mui-selected": { color: "#00A94F !important" },
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
        {!isLoading && (
          <TabPanel value={value} index={0}>
            <Box className="mb-100">
              {!mobile && !tablet && (
                <DataSetsTitleView
                  user={user}
                  title={
                    user === "guest"
                      ? `List of ${labels.renaming_modules.datasets}`
                      : `My Organisation ${labels.renaming_modules.datasets}`
                  }
                  subTitle={
                    user != "guest"
                      ? `${labels.renaming_modules.datasets} uploaded by your organisation.`
                      : `Browse the list of ${labels.renaming_modules.datasets} contributed by partners.`
                  }
                  isGrid={isGrid}
                  setIsGrid={setIsGrid}
                  history={history}
                  addDataset={addDataset}
                  categorises={categorises}
                  geographies={geographies}
                  dates={dates}
                  searchDatasetsName={searchDatasetsName}
                  showAllDataset={showAllDataset}
                  subCategoryIds={subCategoryIds}
                  themesCategories={themesCategories}
                />
              )}
              {/* {datasetList.length > 0 ? ( */}
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
                    {!showAllDataset &&
                    subCategoryIds?.length <= 0 &&
                    themesCategories?.length > 0 &&
                    !geographies[1] &&
                    !geographies[2] &&
                    !dates[0]?.fromDate &&
                    !dates[0]?.toDate &&
                    searchDatasetsName?.length < 3 ? (
                      <>
                        <Card
                          // style={{ padding: mobile ? "0px" : "0px 24px" }}
                          title={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontFamily: "Arial",
                              }}
                            >
                              <div>Categories : Themes</div>
                              {user !== "guest" && (
                                <Button
                                  onClick={() => history.push(addDataset())}
                                  sx={{
                                    fontFamily: "Arial !important",
                                    fontWeight: 700,
                                    fontSize: "15px",
                                    width: mobile || tablet ? "200px" : "214px",
                                    height: "48px",
                                    border: "1px solid rgba(0, 171, 85, 0.48)",
                                    borderRadius: "8px",
                                    color: "#FFFFFF",
                                    background: "#00A94F",
                                    textTransform: "none",
                                    marginLeft:
                                      mobile || tablet ? "0px" : "52px",
                                    "&:hover": {
                                      background: "#00A94F",
                                    },
                                  }}
                                  id="dataset-add-new-dataset"
                                >
                                  +Add new {labels.renaming_modules.dataset}
                                </Button>
                              )}
                            </div>
                          }
                        >
                          <Card.Grid
                            className={
                              "first_category_card_on_landing_page_dataset"
                            }
                            style={{ ...gridStyle, ...exploreButton }}
                            onClick={() => {
                              setShowAllDataset(true);
                              callApply();
                            }}
                          >
                            {`Explore all ${labels.renaming_modules.datasets}`}
                          </Card.Grid>
                          {themesCategories &&
                            themesCategories?.[0]?.subcategories?.map(
                              (eachMainCategory, index) => {
                                return (
                                  <Card.Grid
                                    className={
                                      "category_card_on_landing_page_dataset"
                                    }
                                    style={gridStyle}
                                    onClick={() => {
                                      // handleCheckBox("theme")
                                      setCategorises({
                                        Themes: eachMainCategory?.name,
                                      });
                                      setUpdate((prev) => prev + 1);
                                    }}
                                  >
                                    {eachMainCategory?.name}
                                  </Card.Grid>
                                );
                              }
                            )}
                        </Card>
                        {/* </div> */}
                      </>
                    ) : // )}

                    datasetList?.length > 0 ? (
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
                    ) : (
                      <NoData
                        title={`There are no ${labels.renaming_modules.datasets}`}
                        subTitle={`As of now there are no ${labels.renaming_modules.datasets}, so add new ${labels.renaming_modules.datasets}!`}
                        primaryButton={`Add new ${labels.renaming_modules.datasets}`}
                        primaryButtonOnClick={() => history.push(addDataset())}
                      />
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
                  {datasetList.length > 0 ? (
                    <DataSetsListView
                      datasets={datasetList}
                      history={history}
                      value={
                        value === 0 && user !== "guest" ? "my_organisation" : ""
                      }
                      handleCardClick={handleCardClick}
                    />
                  ) : (
                    <NoData
                      title={`There are no ${labels.renaming_modules.datasets}`}
                      subTitle={`As of now there are no ${labels.renaming_modules.datasets}, so add new ${labels.renaming_modules.datasets}!`}
                      primaryButton={`Add new ${labels.renaming_modules.datasets}`}
                      primaryButtonOnClick={() => history.push(addDataset())}
                    />
                  )}
                </CSSTransition>
              </>
              {showLoadMoreAdmin &&
              (showAllDataset ||
                !Object.keys(categorises).length <= 0 ||
                geographies[1] ||
                geographies[2] ||
                dates[0]?.fromDate ||
                dates[0]?.toDate ||
                searchDatasetsName?.length >= 3) ? (
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
        )}
        {!isLoading && (
          <TabPanel value={value} index={1}>
            {!showAllDataset &&
            subCategoryIds?.length <= 0 &&
            themesCategories?.length > 0 &&
            !geographies[1] &&
            !geographies[2] &&
            !dates[0]?.fromDate &&
            !dates[0]?.toDate &&
            searchDatasetsName?.length < 3 ? (
              ""
            ) : (
              <div
                style={{
                  alignSelf: "left",
                  textAlign: "center",
                  margin: "20px 0px",
                  cursor: "pointer",
                  // border: "1px solid #00a94f",
                  // display: "inline-block",
                  marginRight: "auto",
                  width: "100px",
                  borderRadius: "5px",
                  fontWeight: "600",
                  display: "none",
                }}
                onClick={clearAllFilterBackToListingOfCategory}
              >
                <ArrowBackIcon /> Back
              </div>
            )}
            <Box className="mb-100">
              <DataSetsTitleView
                title={`Other Organisation ${labels.renaming_modules.datasets}`}
                subTitle={`Explore details of ${labels.renaming_modules.datasets} uploaded by other organisations.`}
                isGrid={isGridOther}
                setIsGrid={setIsGridOther}
                history={history}
                addDataset={addDataset}
                categorises={categorises}
                geographies={geographies}
                dates={dates}
                subCategoryIds={subCategoryIds}
                themesCategories={themesCategories}
              />
              {/* {memberDatasetList.length > 0 ? ( */}
              <>
                {isGridOther ? (
                  <>
                    {!showAllDataset &&
                    subCategoryIds?.length <= 0 &&
                    themesCategories?.length > 0 &&
                    !geographies[1] &&
                    !geographies[2] &&
                    !dates[0]?.fromDate &&
                    !dates[0]?.toDate &&
                    searchDatasetsName?.length < 3 ? (
                      <>
                        <Card
                          title={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                fontFamily: "Arial",
                              }}
                            >
                              <div>Categories : Themes</div>
                              {/* <div>Add new dataset</div> */}
                            </div>
                          }
                        >
                          <Card.Grid
                            className={
                              "first_category_card_on_landing_page_dataset"
                            }
                            style={{ ...gridStyle, ...exploreButton }}
                            onClick={() => {
                              setShowAllDataset(true);
                              callApply();
                            }}
                          >
                            {`Explore all ${labels.renaming_modules.datasets}`}
                          </Card.Grid>
                          {user !== "guest" &&
                            themesCategories &&
                            themesCategories?.[0]?.subcategories?.map(
                              (eachMainCategory, index) => {
                                return (
                                  <Card.Grid
                                    className={
                                      "category_card_on_landing_page_dataset"
                                    }
                                    style={gridStyle}
                                    onClick={() => {
                                      // handleCheckBox("theme")
                                      setCategorises({
                                        Themes: eachMainCategory?.name,
                                      });
                                      setUpdate((prev) => prev + 1);
                                    }}
                                  >
                                    {eachMainCategory?.name}
                                  </Card.Grid>
                                );
                              }
                            )}
                        </Card>
                      </>
                    ) : memberDatasetList.length > 0 ? (
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
                    ) : (
                      <NoData
                        title={`There are no ${labels.renaming_modules.datasets}`}
                        subTitle={`As of now there are no ${labels.renaming_modules.datasets} from other organisation`}
                      />
                    )}
                  </>
                ) : memberDatasetList.length > 0 ? (
                  <DataSetsListView
                    datasets={memberDatasetList}
                    value={value === 1 ? "other_organisation" : ""}
                    history={history}
                    handleCardClick={handleCardClick}
                  />
                ) : (
                  <NoData
                    title={`There are no ${labels.renaming_modules.datasets}`}
                    subTitle={`As of now there are no ${labels.renaming_modules.datasets} from other organisation`}
                  />
                )}
              </>
              {showLoadMoreMember &&
              (showAllDataset ||
                subCategoryIds?.length > 0 ||
                geographies[1] ||
                geographies[2] ||
                dates[0]?.fromDate ||
                dates[0]?.toDate ||
                searchDatasetsName?.length >= 3) ? (
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
        )}
        {!isLoading && (
          <TabPanel value={value} index={2}>
            <DatasetRequestTable />
          </TabPanel>
        )}
      </Box>
    </Box>
  );
};

export default DataSetsTab;
