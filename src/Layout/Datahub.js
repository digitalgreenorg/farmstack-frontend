import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import Participants from "../Views/Participants/Participants";
import AddParticipants from "../Views/Participants/AddParticipants";
import EditParticipants from "../Views/Participants/EditParticipants";
import ViewParticipants from "../Views/Participants/ViewParticipants";
import InviteParticipants from "../Views/Participants/InviteParticipants";
import AddTeamMember from "../Views/Settings/TeamMembers/AddTeamMember";
import EditTeamMember from "../Views/Settings/TeamMembers/EditTeamMember";
import Settings from "../Views/Settings/Settings/Settings";
import Support from "../Views/Support/Support";
import AddDataset from "../Views/Dataset/DatasetAdmin/AddDataset";
import DatasetAdmin from '../Views/Dataset/DatasetAdmin/DatasetAdmin'
import EditDataset from "../Views/Dataset/DatasetAdmin/EditDataset";
import { useParams, useHistory } from "react-router-dom";
import { getTokenLocal } from "../Utils/Common";
import SampleDataSet from "../Views/Support/SampleDataSet";
function Datahub(props) {
  // const [activePage, setactivePage] = useState("");
  // useEffect(() => {
  // }, []);
  return (
    <>
      {getTokenLocal() ? (
        <>
          <Navbar />
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
              path="/datahub/participants/add"
              component={AddParticipants}
            />
            <Route
              exact
              path="/datahub/participants/invite"
              component={InviteParticipants}
            />
            <Route
              exact
              path="/datahub/participants"
              component={Participants}
            />
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
            <Route exact path="/datahub/settings/:id" component={Settings} />
            <Route exact path="/datahub/support" component={Support} />
            {/* <Route exact path="/datahub/dataset" component={SampleDataSet} /> */}
            <Route exact path="/datahub/datasets" component={DatasetAdmin}/>
          </Switch>
        </>
      ) : (
        props.history.push("/login")
      )}
    </>
  );
}
export default Datahub;
