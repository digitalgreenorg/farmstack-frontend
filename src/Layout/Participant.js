import React, { useState, useEffect, useContext } from "react";
import Home from "../Views/Role/Participant/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import {
  flushLocalstorage,
  GetErrorHandlingRoute,
  getRoleLocal,
  getTokenLocal,
  getUserLocal,
  goToTop,
  isLoggedInUserParticipant,
  setRoleLocal,
} from "../Utils/Common";

import DatasetParticipant from "../Views/Dataset/DatasetParticipant/DatasetParticipant";
// import Participantsettings from "../Views/Settings/ParticipantSettings/Participantsettings";

import DepartmentSettings from "../Views/Settings/ParticipantSettings/DepartmentSettings";
import EditDepartmentSettings from "../Views/Settings/ParticipantSettings/EditDepartmentSettings";
import ViewDepartment from "../Views/Settings/ParticipantSettings/ViewDepartment";
import ProjectDetailView from "../Views/Settings/ParticipantSettings/Project/ProjectDetailView";

import AddProjectParticipant from "../Views/Settings/ParticipantSettings/Project/AddProjectParticipant";
import EditProjectParticipant from "../Views/Settings/ParticipantSettings/Project/EditProjectParticipant";
import DemoDashboardTable from "../Components/Connectors/DemoDashboardTable";
import AddDataset from "../Components/AdminDatasetConnection/AddDataset";
import ViewMetaDatasetDetails from "../Components/AdminDatasetConnection/ViewMetaDatasetDetails";
import NavbarNew from "../Components/Navbar/Navbar_New";
import Connectors from "../Components/Connectors_New/Connectors";
import FooterNew from "../Components/Footer/Footer_New";
import { Divider, useMediaQuery, useTheme } from "@mui/material";
import AddDataSetParticipantNew from "../Components/Datasets_New/AddDataSet";
import DataSets from "../Components/Datasets_New/DataSets";
import DataSetsView from "../Components/Datasets_New/DataSetsView";
import AddConnector from "../Views/Connector_New/AddConnector";
import EditConnector from "../Views/Connector_New/EditConnector";
import EditDataset from "../Components/Datasets_New/EditDataset";
import Settings from "../Components/SettingsNew/Settings";
import HTTPService from "../Services/HTTPService";
import { FarmStackContext } from "../Components/Contexts/FarmStackContext";
import UrlConstant from "../Constants/UrlConstants";
import Fab from "@mui/material/Fab";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import Support from "../Components/Support_New/Support";
import AskSupport from "../Components/Support_New/SupportForm";
import SupportView from "../Components/Support_New/SupportView";
import DashboardNew from "../Views/Dashboard/DashboardNew";
// import SupportFilterStatus from "../Components/Support_New/SupportFilterStatus";

function Participant(props) {
  const [verifyLocalData, setVerifyLocalData] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();
  const { callToast } = useContext(FarmStackContext);
  const [showButton, setShowButton] = useState(false);

  let roleId = {
    1: "datahub_admin",
    3: "datahub_participant_root",
    6: "datahub_co_steward",
  };

  const verifyUserDataOfLocal = () => {
    let url = UrlConstant.base_url + UrlConstant.verify_local_data_of_user;
    let userId = getUserLocal();
    let returnValue = false;
    if (!userId) {
      flushLocalstorage();
      return;
    }
    let params = { user_id: userId };
    HTTPService("GET", url, params, false, false, false)
      .then(async (response) => {
        console.log("response to verify local data in datahub", response);
        if (!response?.data?.on_boarded) {
          flushLocalstorage();
          history.push("/login");
          return;
        }
        let role = roleId[response?.data?.role_id];
        let localRole = getRoleLocal();
        // if (localRole != role) {
        //   history.push("/login");
        //   return;
        // }
        setRoleLocal(role);
        setVerifyLocalData(true);
        console.log(
          "response to verify local data role in datahubasasas",
          getRoleLocal(),
          isLoggedInUserParticipant()
        );
      })
      .catch(async (e) => {
        console.log("error to verify local data", e);
        let error = await GetErrorHandlingRoute(e);
        console.log("error", error);
        if (error?.toast) {
          callToast(
            error?.message ?? "user login details are corrupted",
            error?.status == 200 ? "success" : "error",
            error?.toast
          );
        } else {
          history.push(error?.path);
        }
      });
  };
  const shouldRenderButton = () => {
    const currentPath = window.location.pathname;
    const excludedPaths = [
      "/participant/support",
      "/participant/support/add",
      "/participant/support/view/",
    ]; // Add the paths where the floating button should be excluded
    return !excludedPaths.some((path) => currentPath.includes(path));
  };

  useEffect(() => {
    verifyUserDataOfLocal();
    goToTop(0);
    setShowButton(true);
  }, []);
  return verifyLocalData ? (
    <>
      {getTokenLocal() && isLoggedInUserParticipant() ? (
        <div className="center_keeping_conatiner">
          {/* <ParticipantNavbar /> */}
          <NavbarNew loginType={"participant"} />
          <div
            className={
              mobile
                ? "minHeight67vhParticipantPage" + " " + "mt-70"
                : "minHeight67vhParticipantPage"
            }
          >
            <br />
            <Switch>
              <Route
                exact
                path="/participant/datasets"
                component={DatasetParticipant}
              />
              {/* temporary routes added - start */}
              <Route
                exact
                path="/participant/new_datasets"
                component={DataSets}
              />
              <Route
                exact
                path="/participant/new_datasets/view/:id"
                component={DataSetsView}
              />
              <Route
                exact
                path="/participant/new_datasets/edit/:id"
                component={EditDataset}
              />
              <Route
                exact
                path="/participant/new_datasets/add"
                component={AddDataSetParticipantNew}
              />
              {/* end */}
              {/* <Route
                exact
                path="/participant/connectors"
                component={ConnectorParticipant}
              /> */}
              <Route exact path="/participant/home" component={Home} />
              {/* <Route
                exact
                path="/participant/datasets/add"
                component={AddDataSetParticipant}
              /> */}
              <Route
                exact
                path="/participant/datasets/add"
                component={AddDataset}
              />
              {/* <Route
                exact
                path="/participant/datasets/edit/:id"
                component={EditDatasetParticipant}
              /> */}
              <Route
                exact
                path="/participant/connectors/add"
                component={AddConnector}
              />
              <Route
                exact
                path="/participant/connectors/edit/:id"
                component={EditConnector}
              />
              <Route
                exact
                path="/participant/settings/adddepartment"
                component={DepartmentSettings}
              />
              <Route
                exact
                path="/participant/settings/:id"
                component={Settings}
              />
              {/* <Route
                exact
                path="/participant/settings/adddepartment"
                component={DepartmentSettings}
              /> */}
              <Route
                exact
                path="/participant/settings/editdepartment/:id"
                component={EditDepartmentSettings}
              />
              {/* <Route
              exact
              path="/participant/settings/viewdepartment/:id/"
              component={ViewDepartment}
            /> */}
              <Route
                exact
                path="/participant/settings/project/add"
                component={AddProjectParticipant}
              />
              <Route
                exact
                path="/participant/settings/project/edit/:id"
                component={EditProjectParticipant}
              />
              <Route
                exact
                path="/participant/settings/viewdepartment/:id/"
                component={ViewDepartment}
              />
              <Route
                exact
                path="/participant/settings/viewproject/:id"
                component={ProjectDetailView}
              />
              <Route
                exact
                path="/participant/connectors/detail"
                component={DemoDashboardTable}
              />
              <Route
                exact
                path="/participant/dataset/view/:id"
                component={ViewMetaDatasetDetails}
              />
              {/* {/* <Route */}
              <Route
                exact
                path="/participant/new_dashboard"
                component={DashboardNew}
              />
              {/* <Route
                exact
                path="/participant/connectors"
              >
                <DatasetIntegration />
              </Route> */}
              <Route exact path="/participant/connectors">
                <Connectors />
              </Route>
              <Route exact path="/participant/support">
                <Support />
              </Route>
              <Route exact path="/participant/support/add">
                <AskSupport />
              </Route>
              <Route exact path="/participant/support/view/:id">
                <SupportView />
              </Route>
              {/* <Route
              exact
              path="/participant/connectors/list"
              >
              <ConnectorsList/>
              </Route> */}
            </Switch>
          </div>
          {shouldRenderButton() && showButton && (
            <Fab
              style={{
                position: "fixed",
                bottom: "20px",
                right: "30px",
                zIndex: 1000,
              }}
              onClick={() => {
                props.history.push("/participant/support");
              }}
              className={"fabIcon"}
              id="click-support-icon"
            >
              <AddIcCallRoundedIcon />
            </Fab>
          )}
          <Divider className="mt-50" />
          <FooterNew />
        </div>
      ) : (
        props.history.push("/login")
      )}
    </>
  ) : (
    <></>
  );
}
export default Participant;
