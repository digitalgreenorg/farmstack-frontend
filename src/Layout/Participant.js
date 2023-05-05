import React, { useState, useEffect, useContext } from "react";
import ParticipantNavbar from "../Components/Navbar/ParticipantNavbar";
import Home from "../Views/Role/Participant/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import {
  flushLocalstorage,
  GetErrorHandlingRoute,
  getRoleLocal,
  getTokenLocal,
  getUserLocal,
  isLoggedInUserParticipant,
  setRoleLocal,
} from "../Utils/Common";
import AddDataSetParticipant from "../Views/Role/Participant/Dataset/AddDataSetParticipant";
import EditDatasetParticipant from "../Views/Role/Participant/Dataset/EditDatasetParticipant";
import DatasetParticipant from "../Views/Dataset/DatasetParticipant/DatasetParticipant";
// import Participantsettings from "../Views/Settings/ParticipantSettings/Participantsettings";

import AddConnectorParticipant from "../Views/Role/Participant/Connectors/AddConnectorParticipant";
import EditConnectorParticipant from "../Views/Role/Participant/Connectors/EditConnectorParticipant";
import ConnectorParticipant from "../Views/Connector/ConnectorParticipant/ConnectorParticipant";
import DepartmentSettings from "../Views/Settings/ParticipantSettings/DepartmentSettings";
import EditDepartmentSettings from "../Views/Settings/ParticipantSettings/EditDepartmentSettings";
import ViewDepartment from "../Views/Settings/ParticipantSettings/ViewDepartment";
import Footer from "../Components/Footer/Footer";
import ProjectDetailView from "../Views/Settings/ParticipantSettings/Project/ProjectDetailView";

import AddProjectParticipant from "../Views/Settings/ParticipantSettings/Project/AddProjectParticipant";
import EditProjectParticipant from "../Views/Settings/ParticipantSettings/Project/EditProjectParticipant";
import DemoDashboardTable from "../Components/Connectors/DemoDashboardTable";
import AddDataset from "../Components/AdminDatasetConnection/AddDataset";
import ViewMetaDatasetDetails from "../Components/AdminDatasetConnection/ViewMetaDatasetDetails";
import DatasetIntegration from "../Components/Datasets/IntegrationDatasets/DatasetIntegration";
import ConnectorsList from "../Components/IntegrationConnectors/ConnectorsList";
import NavbarNew from "../Components/Navbar/Navbar_New";
import Connectors from "../Components/Connectors_New/Connectors";
import FooterNew from "../Components/Footer/Footer_New";
import { Divider } from "@mui/material";
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

function Participant(props) {
  const [render, reRender] = useState(0);
  const [verifyLocalData, setVerifyLocalData] = useState(false);

  const history = useHistory();
  const { callToast } = useContext(FarmStackContext);
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
          "response to verify local data role in datahub",
          getRoleLocal(),
          isLoggedInUserParticipant()
        );
      })
      .catch(async (e) => {
        console.log("error to verify local data", e);
        let error = await GetErrorHandlingRoute(e);
        if (error.toast) {
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

  useEffect(() => {
    verifyUserDataOfLocal();
  }, []);
  return verifyLocalData ? (
    <>
      {getTokenLocal() && isLoggedInUserParticipant() ? (
        <div className="center_keeping_conatiner">
          {/* <ParticipantNavbar /> */}
          <NavbarNew loginType={"participant"} />
          <div className="minHeight67vhParticipantPage">
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
              {/* <Route
                exact
                path="/participant/connectors"
              >
                <DatasetIntegration />
              </Route> */}
              <Route exact path="/participant/connectors">
                <Connectors />
              </Route>
              {/* <Route
              exact
              path="/participant/connectors/list"
              >
              <ConnectorsList/>
              </Route> */}
            </Switch>
          </div>
          {/* <Footer /> */}
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
