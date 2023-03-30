import React, { useState, useEffect } from "react";
import ParticipantNavbar from "../Components/Navbar/ParticipantNavbar";
import Home from "../Views/Role/Participant/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import { getTokenLocal, isLoggedInUserParticipant } from "../Utils/Common";
import AddDataSetParticipant from "../Views/Role/Participant/Dataset/AddDataSetParticipant";
import EditDatasetParticipant from "../Views/Role/Participant/Dataset/EditDatasetParticipant";
import DatasetParticipant from "../Views/Dataset/DatasetParticipant/DatasetParticipant";
import Participantsettings from "../Views/Settings/ParticipantSettings/Participantsettings";

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
import ParticipantMain from "../Pages/ParticipantMain";
import DataSets from "../Pages/DataSets";
import AddDataSetParticipantNew from "../Views/Role/Participant/Dataset/AddDataSetParticipantNew";
import DataSetsView from "../Pages/DataSetsView";

function Participant(props) {
  return (
    <>
      {getTokenLocal() && isLoggedInUserParticipant() ? (
        <div className="center_keeping_conatiner">
          <ParticipantNavbar />
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
                path="/participant/new_datasets/view"
                component={DataSetsView}
              />
              <Route
                exact
                path="/participant/new_participants"
                component={ParticipantMain}
              />
              <Route
                exact
                path="/participant/new_datasets/add"
                component={AddDataSetParticipantNew}
              />
              {/* end */}
              <Route
                exact
                path="/participant/connectors"
                component={ConnectorParticipant}
              />
              <Route exact path="/participant/home" component={Home} />
              <Route
                exact
                path="/participant/datasets/add"
                component={AddDataSetParticipant}
              />
              <Route
                exact
                path="/participant/datasets/edit/:id"
                component={EditDatasetParticipant}
              />
              <Route
                exact
                path="/participant/connectors/add"
                component={AddConnectorParticipant}
              />
              <Route
                exact
                path="/participant/connectors/edit/:id"
                component={EditConnectorParticipant}
              />
              <Route
                exact
                path="/participant/settings/adddepartment"
                component={DepartmentSettings}
              />
              <Route
                exact
                path="/participant/settings/:id"
                component={Participantsettings}
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
            </Switch>
          </div>
          <Footer />
        </div>
      ) : (
        props.history.push("/participant/login")
      )}
    </>
  );
}
export default Participant;
