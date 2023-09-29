import { Box, Button, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import ResourcesTitleView from "./ResourcesTitleView";
import { CSSTransition } from "react-transition-group";
import AddDataSetCardNew from "../../Components/Datasets_New/AddDataSetCard";
import {
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
  toTitleCase,
} from "../../Utils/Common";
import ResourceCard from "../../Components/Resources/ResourceCard";
import NoData from "../../Components/NoData/NoData";
import ResourceList from "../../Components/Resources/ResourceList";
import UrlConstant from "../../Constants/UrlConstants";
import labels from "../../Constants/labels";

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

const ResourcesTab = ({
  user,
  value,
  setValue,
  history,
  isGrid,
  setIsGrid,
  resources,
  setResources,
  addResource,
  getResources,
  getOtherResources,
  showLoadMoreBtn,
  setResourceUrl,
  setOtherResourceUrl,
  setSearchResourcename,
  searchResourceName,
  debouncedSearchValue,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setSearchResourcename("");
    setValue(newValue);
    setResources([]);
    setResourceUrl(UrlConstant.base_url + UrlConstant.resource_endpoint);
    setOtherResourceUrl(UrlConstant.base_url + UrlConstant.resource_endpoint);
  };

  const handleCardClick = (id) => {
    if (user === "guest") {
      return `/home/resources/view/${id}`;
    } else if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return `/datahub/resources/view/${id}`;
    } else if (isLoggedInUserParticipant()) {
      return `/participant/resources/view/${id}`;
    }
  };

  useEffect(() => {
    if (value === 0 && !searchResourceName) {
      getResources(false);
    }
    if (value === 1 && !searchResourceName) {
      getOtherResources(false);
    }
  }, [value, debouncedSearchValue]);
  return (
    <Box className="w-100">
      <Box>
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
                    My {toTitleCase(labels.renaming_modules.resources)}
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
                    Other Organisations{" "}
                    {toTitleCase(labels.renaming_modules.resources)}
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
            <ResourcesTitleView
              title={
                user !== "guest"
                  ? `My organisation ${labels.renaming_modules.resources}`
                  : `List of ${labels.renaming_modules.resources}`
              }
              isGrid={isGrid}
              setIsGrid={setIsGrid}
              addResource={addResource}
              history={history}
              user={user}
              subTitle={
                user !== "guest"
                  ? `${toTitleCase(
                      labels.renaming_modules.resources
                    )} uploaded by your organization.`
                  : `Browse the list of ${labels.renaming_modules.resources} contributed by organizations.`
              }
              value={0}
            />
            {resources?.length > 0 ? (
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
                  <div className="datasets_card">
                    {user !== "guest" ? (
                      <AddDataSetCardNew
                        history={history}
                        addDataset={addResource}
                        title={`Create new ${labels.renaming_modules.resource}`}
                        description={`Add details about your ${labels.renaming_modules.resource} and make discoverable to others.`}
                      />
                    ) : (
                      ""
                    )}
                    {resources?.map((item, index) => (
                      <ResourceCard
                        index={index}
                        id="dataset-card-in-dataset"
                        key={item?.id}
                        history={history}
                        item={item}
                        value={0}
                        handleCardClick={handleCardClick}
                        userType={user !== "guest" ? "" : "guest"}
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
                  <ResourceList
                    resources={resources}
                    history={history}
                    value={0}
                    handleCardClick={handleCardClick}
                    userType={user !== "guest" ? "" : "guest"}
                  />
                </CSSTransition>
              </>
            ) : (
              <NoData
                title={`There are no ${labels.renaming_modules.resources}`}
                subTitle={
                  user === "guest"
                    ? `As of now there are no ${labels.renaming_modules.resources}.`
                    : `As of now there are no ${labels.renaming_modules.resources}, so add new ${labels.renaming_modules.resource}!`
                }
                primaryButton={
                  user === "guest"
                    ? false
                    : `Add new ${toTitleCase(labels.renaming_modules.resource)}`
                }
                primaryButtonOnClick={() => history.push(addResource())}
              />
            )}

            {showLoadMoreBtn ? (
              <Button
                variant="outlined"
                className={
                  mobile || tablet ? "d_button_style_md" : "d_button_style"
                }
                onClick={() => getResources(true)}
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
            <ResourcesTitleView
              title={`Other organisation ${labels.renaming_modules.resources}`}
              isGrid={isGrid}
              setIsGrid={setIsGrid}
              addResource={addResource}
              history={history}
              user={user}
              subTitle={`Explore ${labels.renaming_modules.resources} uploaded by other organizations.`}
              value={1}
            />
            {resources?.length > 0 ? (
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
                  <div className="datasets_card">
                    {resources?.map((item, index) => (
                      <ResourceCard
                        index={index}
                        id="dataset-card-in-dataset"
                        key={item?.id}
                        history={history}
                        item={item}
                        value={1}
                        handleCardClick={handleCardClick}
                        userType={user !== "guest" ? "" : "guest"}
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
                  <ResourceList
                    resources={resources}
                    history={history}
                    value={1}
                    handleCardClick={handleCardClick}
                    userType={user === "guest" ? "" : "guest"}
                  />
                </CSSTransition>
              </>
            ) : (
              <NoData
                title={`There are no ${labels.renaming_modules.resources}`}
                subTitle={`As of now there are no ${labels.renaming_modules.resources}.`}
              />
            )}

            {showLoadMoreBtn ? (
              <Button
                variant="outlined"
                className={
                  mobile || tablet ? "d_button_style_md" : "d_button_style"
                }
                onClick={() => getOtherResources(true)}
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
      </Box>
    </Box>
  );
};

export default ResourcesTab;
