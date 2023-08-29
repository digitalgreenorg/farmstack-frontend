import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import AddCoSteward from "../Components/CoSteward/AddCoSteward";
import AddTeamMember from "../Views/Settings/TeamMembers/AddTeamMember";
import EditTeamMember from "../Views/Settings/TeamMembers/EditTeamMember";
import Settings from "../Components/SettingsNew/Settings";

import {
  flushLocalstorage,
  getTokenLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  setRoleLocal,
  getUserLocal,
  GetErrorHandlingRoute,
  goToTop,
} from "../Utils/Common";

import Dashboard from "../Views/Dashboard/Dashboard";

// import DemoDashboardTable from "../Components/Connectors/DemoDashboardTable";

import DepartmentSettings from "../Views/Settings/ParticipantSettings/DepartmentSettings";
import ViewDepartment from "../Views/Settings/ParticipantSettings/ViewDepartment";
import EditDepartmentSettings from "../Views/Settings/ParticipantSettings/EditDepartmentSettings";
import AddDataset from "../Components/AdminDatasetConnection/AddDataset";

// import ConnectorsList from "../Components/IntegrationConnectors/ConnectorsList";
import ParticipantsAndCoStewardNew from "../Views/ParticipantCoSteward/ParticipantAndCoStewardNew";
import ParticipantsAndCoStewardDetailsNew from "../Views/ParticipantCoSteward/ParticipantAndCoStewardDetailsNew";
import NavbarNew from "../Components/Navbar/Navbar_New";
import Connectors from "../Components/Connectors_New/Connectors";
import { Divider, useMediaQuery, useTheme } from "@mui/material";
import FooterNew from "../Components/Footer/Footer_New";
import CostewardDetailsNew from "../Views/ParticipantCoSteward/CostewardDetailsNew";
import AddParticipantNew from "../Views/Participants/AddParticipantNew";
import EditParticipantsNew from "../Views/Participants/EditParticipantsNew";
import DataSetsView from "../Components/Datasets_New/DataSetsView";
import AddConnector from "../Views/Connector_New/AddConnector";
import EditConnector from "../Views/Connector_New/EditConnector";
import DataSets from "../Components/Datasets_New/DataSets";
import AddDataSetParticipantNew from "../Components/Datasets_New/AddDataSet";
import ParticipantApproveNew from "../Views/ParticipantCoSteward/ParticipantsApproveNew";
import InviteParticipantsNew from "../Views/Participants/InviteParticipantsNew";
import EditDataset from "../Components/Datasets_New/EditDataset";
import UrlConstant from "../Constants/UrlConstants";
import HTTPService from "../Services/HTTPService";
import { FarmStackContext } from "../Components/Contexts/FarmStackContext";
import DashboardNew from "../Views/Dashboard/DashboardNew";
import Fab from "@mui/material/Fab";
import Support from "../Components/Support_New/Support";
import SupportView from "../Components/Support_New/SupportView";
import AskSupport from "../Components/Support_New/SupportForm";
import AddIcCallRoundedIcon from "@mui/icons-material/AddIcCallRounded";
import CostewardsParticipant from "../Views/ParticipantCoSteward/CostewardsParticipant";
import TableWithFilteringForApi from "../Components/Table/TableWithFilteringForApi";
import ViewDashboardAndApiRequesting from "../Components/Datasets_New/ViewDashboardAndApiRequesting";
import Resources from "../Views/Resources/Resources";
import AddResource from "../Views/Resources/AddResource";
import EditResource from "../Views/Resources/EditResource";
import ViewResource from "../Views/Resources/ViewResource";

function Datahub(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [verifyLocalData, setVerifyLocalData] = useState(false);
  // const { isVerified } = useContext(FarmStackContext);

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
        setRoleLocal(role);
        setVerifyLocalData(true);
      })
      .catch(async (e) => {
        console.log("error to verify local data", e);
        let error = await GetErrorHandlingRoute(e);
        if (error?.toast) {
          callToast(
            error?.message ?? "user login details are corrupted",
            error.status == 200 ? "success" : "error",
            error.toast
          );
        } else {
          history.push(error?.path);
        }
      });
  };
  const shouldRenderButton = () => {
    const currentPath = window.location.pathname;
    const excludedPaths = [
      "/datahub/support",
      "/datahub/support/add",
      "/datahub/support/view/",
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
      {getTokenLocal() &&
      (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) ? (
        <div className="center_keeping_conatiner">
          {/* <Navbar /> */}
          <NavbarNew loginType={"admin"} />
          <div
            className={
              mobile
                ? "minHeight67vhDatahubPage" + " " + "mt-70"
                : "minHeight67vhDatahubPage"
            }
          >
            <br />
            <Switch>
              <Route
                exact
                path="/datahub/participants/view/:id"
                component={ParticipantsAndCoStewardDetailsNew}
              />
              <Route
                exact
                path="/datahub/costeward/participants/view/:id"
                component={CostewardsParticipant}
              />
              <Route
                exact
                path="/datahub/participants/edit/:id"
                component={EditParticipantsNew}
              />
              <Route
                exact
                path="/datahub/costeward/view/:id"
                component={CostewardDetailsNew}
              />
              <Route
                exact
                path="/datahub/participants/view/approve/:id"
                component={ParticipantApproveNew}
              />

              <Route
                exact
                path="/datahub/costeward/edit/:id"
                component={EditParticipantsNew}
              />
              <Route
                exact
                path="/datahub/participants/add"
                component={AddParticipantNew}
              />
              <Route exact path="/datahub/dashboard" component={Dashboard} />
              <Route
                exact
                path="/datahub/new_dashboard"
                component={DashboardNew}
              />

              <Route
                exact
                path="/datahub/participants/invite"
                component={InviteParticipantsNew}
              />
              {/* <Route
                exact
                path="/datahub/participants"
                component={Participants}
              /> */}
              {/* <Route exact path="/datahub/datasets/add" component={AddDataset} /> */}
              <Route
                exact
                path="/datahub/datasets/add"
                component={AddDataset}
              />
              {/* <Route
                exact
                path="/datahub/datasets/edit/:id"
                component={EditDataset}
              /> */}
              {/* temporary routes added - start */}
              <Route exact path="/datahub/new_datasets" component={DataSets} />
              <Route
                exact
                path="/datahub/new_datasets/view/:id"
                component={DataSetsView}
              />
              <Route
                exact
                path="/datahub/new_datasets/edit/:id"
                component={EditDataset}
              />
              <Route
                exact
                path="/datahub/new_datasets/add"
                component={AddDataSetParticipantNew}
              />
              {/* end */}
              <Route
                exact
                path="/datahub/settings/addmember"
                component={AddTeamMember}
              />
              <Route
                exact
                path="/datahub/settings/editmember/:id"
                component={EditTeamMember}
              />
              <Route
                exact
                path="/datahub/settings/adddepartment"
                component={DepartmentSettings}
              />
              <Route
                exact
                path="/datahub/settings/viewdepartment/:id/"
                component={ViewDepartment}
              />
              <Route
                exact
                path="/datahub/settings/editdepartment/:id"
                component={EditDepartmentSettings}
              />
              {/* /> */}
              <Route exact path="/datahub/settings/:id" component={Settings} />
              <Route exact path="/datahub/support" component={Support} />
              {/* <Route exact path="/datahub/datasets" component={DatasetAdmin} /> */}
              {/* <Route
                exact
                path="/datahub/connectors/add"
                component={AddConnectorParticipant}
              /> */}
              {/* temp added add connectors route */}
              <Route
                exact
                path="/datahub/connectors/add"
                component={AddConnector}
              />
              {/* end */}
              {/* temp added edit connectors route */}
              <Route
                exact
                path="/datahub/connectors/edit/:id"
                component={EditConnector}
              />
              {/* end */}
              {/* <Route
                exact
                path="/datahub/connectors/edit/:id"
                component={EditConnectorParticipant}
              /> */}
              {/* <Route
                exact
                path="/datahub/connectors"
                component={ConnectorParticipant}
              /> */}
              {/* <Route
                exact
                path="/datahub/settings/project/add"
                component={AddProjectParticipant}
              />
              <Route
                exact
                path="/datahub/settings/viewproject/:id"
                component={ProjectDetailView}
              />
              <Route
                exact
                path="/datahub/settings/project/edit/:id"
                component={EditProjectParticipant}
              /> */}
              {/* <Route
                exact
                path="/datahub/connectors/detail"
                component={DemoDashboardTable}
              /> */}
              <Route
                exact
                path="/datahub/dataset/view/:id"
                component={DataSetsView}
              />
              <Route
                exact
                path="/datahub/participants"
                component={ParticipantsAndCoStewardNew}
              />
              <Route
                exact
                path="/datahub/participants/addcosteward"
                component={AddCoSteward}
              />

              {/* <Route
                exact
                path="/datahub/connectors"
              >
                <DatasetIntegration />
              </Route> */}
              {/* temp added Connectors route */}
              <Route exact path="/datahub/connectors">
                <Connectors />
              </Route>
              {/* end */}
              {/* <Route exact path="/datahub/connectors/list">
                <ConnectorsList />
              </Route> */}
              <Route exact path="/datahub/resources" component={Resources} />
              <Route
                exact
                path="/datahub/resources/add"
                component={AddResource}
              />
              <Route
                exact
                path="/datahub/resources/edit/:id"
                component={EditResource}
              />
              <Route
                exact
                path="/datahub/resources/view/:id"
                component={ViewResource}
              />
              <Route exact path="/datahub/support">
                <Support />
              </Route>
              <Route exact path="/datahub/support/add">
                <AskSupport />
              </Route>
              <Route exact path="/datahub/support/view/:id">
                <SupportView />
              </Route>
              <Route exact path="/datahub/test">
                <TableWithFilteringForApi />
              </Route>
              <Route exact path="/datahub/dashboard-api-request/:datasetid">
                <ViewDashboardAndApiRequesting />
              </Route>
            </Switch>
          </div>
          {/* <Footer /> */}
          {shouldRenderButton() && showButton && (
            <Fab
              style={{
                position: "fixed",
                bottom: "20px",
                right: "30px",
                zIndex: 1000,
              }}
              onClick={() => {
                props.history.push("/datahub/support");
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
export default Datahub;
