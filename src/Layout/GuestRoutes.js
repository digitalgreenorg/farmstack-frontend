import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import NavbarNew from "../Components/Navbar/Navbar_New";
import GuestUserHomeNew from "../Views/GuestUser/GuestUserHomeNew";

const GuestRoutes = () => {
  return (
    <div className="center_keeping_conatiner">
      <NavbarNew loginType={"guest"} />
      <div className="minHeight67vhDatahubPage">
        <Switch>
          <Route exact path="/home" component={GuestUserHomeNew} />
          <Route exact path="/datasets" component={GuestUserHomeNew} />
        </Switch>
      </div>
    </div>
  );
};

export default GuestRoutes;
