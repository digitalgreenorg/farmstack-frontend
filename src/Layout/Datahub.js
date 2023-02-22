import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import AddCoSteward from "../Components/CoSteward/AddCoSteward";
import ParticipantCoStewardManagement from "../Views/ParticipantCoSteward/ParticipantCoStewardManagement"
import Participants from "../Views/Participants/Participants";
import AddParticipants from "../Views/Participants/AddParticipants";
import EditParticipants from "../Views/Participants/EditParticipants";
import ViewParticipants from "../Views/Participants/ViewParticipants";
import InviteParticipants from "../Views/Participants/InviteParticipants";
import AddTeamMember from "../Views/Settings/TeamMembers/AddTeamMember";
import EditTeamMember from "../Views/Settings/TeamMembers/EditTeamMember";
import Settings from "../Views/Settings/Settings/Settings";
import Support from "../Views/Support/Support";
// import AddDataset from "../Views/Dataset/DatasetAdmin/AddDataset";
import DatasetAdmin from '../Views/Dataset/DatasetAdmin/DatasetAdmin'
import EditDataset from "../Views/Dataset/DatasetAdmin/EditDataset";
import { useParams, useHistory } from "react-router-dom";
import { getTokenLocal, isLoggedInUserAdmin, isLoggedInUserCoSteward } from "../Utils/Common";
import SampleDataSet from "../Views/Support/SampleDataSet";
import Footer from "../Components/Footer/Footer";
import Dashboard from "../Views/Dashboard/Dashboard";
import AddConnectorParticipant from "../Views/Role/Participant/Connectors/AddConnectorParticipant";
import EditConnectorParticipant from "../Views/Role/Participant/Connectors/EditConnectorParticipant";
import ConnectorParticipant from "../Views/Connector/ConnectorParticipant/ConnectorParticipant";
import DemoDashboardTable from "../Components/Connectors/DemoDashboardTable";
import AddProjectParticipant from "../Views/Settings/ParticipantSettings/Project/AddProjectParticipant";
import ProjectDetailView from "../Views/Settings/ParticipantSettings/Project/ProjectDetailView";
import EditProjectParticipant from "../Views/Settings/ParticipantSettings/Project/EditProjectParticipant";
import DepartmentSettings from "../Views/Settings/ParticipantSettings/DepartmentSettings";
import ViewDepartment from "../Views/Settings/ParticipantSettings/ViewDepartment";
import EditDepartmentSettings from "../Views/Settings/ParticipantSettings/EditDepartmentSettings";
import AddDataset from "../Components/AdminDatasetConnection/AddDataset";
import ViewMetaDatasetDetails from "../Components/AdminDatasetConnection/ViewMetaDatasetDetails";
import ViewCoSteward from "../Components/Participants/ViewCoSteword";
import EditCoSteward from "../Components/Participants/EditCoSteward";
import DatasetIntegration from "../Components/Datasets/IntegrationDatasets/DatasetIntegration";
function Datahub(props) {
  // const [activePage, setactivePage] = useState("");
  // useEffect(() => {
  // }, []);
  return (
    <>
      {(getTokenLocal() && (isLoggedInUserAdmin() || isLoggedInUserCoSteward()))? (
        <div className="center_keeping_conatiner">

          <Navbar />
          <div className="minHeight67vhDatahubPage">
            <Switch>
            <Route
                exact
                path="/datahub/participants/view/:id"
                component={ViewParticipants}
              />
              <Route
                exact
                path="/datahub/participants/edit/:id"
                component={EditParticipants}
              />
              <Route
                exact
                path="/datahub/costeward/view/:id"
                component={ViewCoSteward}
              />
              <Route
                exact
                path="/datahub/costeward/edit/:id"
                component={EditCoSteward}
              />
              <Route
                exact
                path="/datahub/participants/add"
                component={AddParticipants}
              />
              <Route
                exact
                path="/datahub/dashboard"
                component={Dashboard}
              />

              <Route
                exact
                path="/datahub/participants/invite"
                component={InviteParticipants}
              />
              {/* <Route
                exact
                path="/datahub/participants"
                component={Participants}
              /> */}
              {/* <Route exact path="/datahub/datasets/add" component={AddDataset} /> */}
              <Route exact path="/datahub/datasets/add" component={AddDataset} />
              <Route
                exact
                path="/datahub/datasets/edit/:id"
                component={EditDataset}
              />
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
              <Route exact path="/datahub/settings/:id" component={Settings} />
              <Route exact path="/datahub/support" component={Support} />
              {/* <Route exact path="/datahub/dataset" component={SampleDataSet} /> */}
              <Route exact path="/datahub/datasets" component={DatasetAdmin} />
              <Route
                exact
                path="/datahub/connectors/add"
                component={AddConnectorParticipant}
              />
              <Route
                exact
                path="/datahub/connectors/edit/:id"
                component={EditConnectorParticipant}
              />
              <Route
                exact
                path="/datahub/connectors"
                component={ConnectorParticipant}
              />
              <Route
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
              />
              <Route
                exact
                path="/datahub/connectors/detail"
                component={DemoDashboardTable}
              />
              <Route
              exact
              path="/datahub/dataset/view/:id"
              component={ViewMetaDatasetDetails}
              />
              <Route
              exact
              path="/datahub/participants"
              component={ParticipantCoStewardManagement}
              />
               <Route 
              exact
              path="/datahub/participants/addcosteward"
              component={AddCoSteward}      
              />
               <Route
              exact
              path="/datahub/integration"     
              >
              <DatasetIntegration/>
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      ) : (
        props.history.push("/login")
      )}
    </>
  );
}
export default Datahub;
