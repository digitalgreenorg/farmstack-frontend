import React from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Views/Login/Login";
import ProfileScreen from "./Views/Login/ProfileScreen";
import OrganisationScreen from "./Views/Login/OrganisationScreen";
import BrandingScreen from "./Views/Login/BrandingScreen";
import Policies from "./Views/Login/Policies";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/profile" component={ProfileScreen} />
          <Route exact path="/login/org" component={OrganisationScreen} />
          <Route exact path="/login/branding" component={BrandingScreen} />
          <Route exact path="/login/policies" component={Policies} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
