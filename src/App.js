import React from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './Views/Login/Login'
import ProfileScreen from './Views/Login/ProfileScreen'
import Participants from './Views/Participants/Participants'
import AddParticipants from './Views/Participants/AddParticipants'
import EditParticipants from './Views/Participants/EditParticipants'
import ViewParticipants from './Views/Participants/ViewParticipants'
import Datahub from './Layout/Datahub'
import Participant from './Layout/Participant'
import Error from "./Components/Error/Error";
import SessionExpired from "./Components/SessionExpired/SessionExpired";
import GuestUserHome from "./Views/GuestUser/GuestUserHome";
import GuestUserLegal from "./Views/GuestUser/GuestUserLegal";
import GuestUserContact from "./Views/GuestUser/GuestUserContact";
import AddParticipantRegistrationForm from "./Components/PatricipantRegistration/AddParticipantRegistrationform"
import ViewMetaDatasetDetails from "./Components/AdminDatasetConnection/ViewMetaDatasetDetails";
import Viewdetails from "./Components/GuestUser/Viewdetails";
import GuestUserMainHomePage from "./Views/GuestUser/GuestUserMainHomePage";
import AccountSetting from "./Components/SettingsNew/AccountSettings";
import OrganisationSettings from "./Components/SettingsNew/OrganisationSettings";
import Settings from "./Components/SettingsNew/Settings";
import ParticipantCoStewardManagement from "./Views/ParticipantCoSteward/ParticipantCoStewardManagement";
import ParticipantsAndCoStewardNew from "./Views/ParticipantCoSteward/ParticipantAndCoStewardNew";


function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {/* <Route exact path="/login" component={Login} />
          <Route exact path="/login/profile" component={ProfileScreen} />
          <Route exact path="/login/org" component={OrganisationScreen} />
          <Route exact path="/login/branding" component={BrandingScreen} />
          <Route exact path="/login/policies" component={Policies} />
          <Route  path="/login/profile" component={ProfileScreen} /> */}
          {/* <Route exact path="/datahub/login" component={Login} /> */}
          {/* <Route exact path="/participant/login" component={Login} /> */}
          <Route exact path="/login" component={Login} />
          <Route path="/datahub" component={Datahub} />
          <Route path="/participant" component={Participant} />
          <Route path="/sessionexpired" component={SessionExpired} />
          <Route path="/error" component={Error} />
          <Route exact path="/home" component={GuestUserMainHomePage} />
          <Route exact path="/home/viewdataset/:id" component={Viewdetails} />
          <Route exact path="/legal" component={GuestUserLegal} />
          <Route exact path="/contact" component={GuestUserContact} />
          <Route exact path="/participantregistration" component={AddParticipantRegistrationForm} />
          <Route exact path="/account" component={AccountSetting} />
          <Route exact path="/organisation" component={OrganisationSettings} />
          <Route exact path="/settings" component={Settings} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
