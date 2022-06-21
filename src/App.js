import React from 'react';
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
function App() {
  return (
    <React.Fragment>
      <Router >
        <Switch>
        <Route path="/datahub" component={Datahub} />
          <Route  path="/login" component={Login} />
          <Route  path="/login/profile" component={ProfileScreen} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
