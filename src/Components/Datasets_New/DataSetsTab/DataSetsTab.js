import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs, Divider, Button, Typography } from "@mui/material";
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
  state,
  getDataSets,
  getOtherDataSets,
  datasetList,
  memberDatasetList,
  filteredDatasetList,
  filteredMemberDatasetList,
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
  clearFilter,
  setFilterState,
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const [isGridOther, setIsGridOther] = useState(true);
  const [isGridSteward, setIsGridSteward] = useState(true);

  const handleChange = (event, newValue) => {
    setType("");
    setCategorises([]);
    setGeographies([]);
    setDates([{ fromDate: null, toDate: null }]);
    setFromDate("");
    setToDate("");
    setSearchDatasetsName("");
    // clearFilter();
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
      <Box sx={{ marginLeft: "144px", marginRight: "144px" }}>
        {user !== "guest" ? (
          <Box
            sx={{
              marginTop: "63px",
              borderBottom: 1,
              borderColor: "divider",
              borderBottom: "1px solid #3D4A52 !important",
            }}
          >
            <Tabs
              className="tabs"
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
                  >
                    Requests
                  </span>
                }
              />
              {/* <Tab label={<span className={value == 2 ? 'tab_header_selected' : 'tab_header'}>Co-steward</span>} /> */}
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
              isGrid={isGrid}
              setIsGrid={setIsGrid}
              history={history}
              addDataset={addDataset}
            />
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
              <div className="datasets_card">
                {user !== "guest" ? (
                  <AddDataSetCardNew
                    history={history}
                    addDataset={addDataset}
                  />
                ) : (
                  ""
                )}
                {datasetList?.map((item) => (
                  <DataSetCardNew
                    key={item?.id}
                    history={history}
                    item={item}
                    value={
                      value === 0 && user !== "guest" ? "my_organisation" : ""
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
                value={value === 0 && user !== "guest" ? "my_organisation" : ""}
                handleCardClick={handleCardClick}
              />
            </CSSTransition>
            {showLoadMoreAdmin ? (
              <Button
                variant="outlined"
                className="d_button_style"
                onClick={() => getDataSets(true)}
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
              isGrid={isGridOther}
              setIsGrid={setIsGridOther}
              history={history}
              addDataset={addDataset}
            />
            {isGridOther ? (
              <div className="datasets_card">
                {memberDatasetList?.map((item) => (
                  <DataSetCardNew
                    key={item?.id}
                    value={value === 1 ? "other_organisation" : ""}
                    history={history}
                    item={item}
                    handleCardClick={handleCardClick}
                  />
                ))}
              </div>
            ) : (
              <DataSetsListView
                datasets={memberDatasetList}
                value={value === 1 ? "other_organisation" : ""}
                history={history}
                handleCardClick={handleCardClick}
              />
            )}
            {showLoadMoreMember ? (
              <Button
                variant="outlined"
                className="d_button_style"
                onClick={() => getOtherDataSets(true)}
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
