import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import FooterNew from "../Components/Footer/Footer_New";
import NavbarNew from "../Components/Navbar/Navbar_New";
import GuestUserHomeNew from "../Views/GuestUser/GuestUserHomeNew";

const GuestRoutes = () => {
  return (
    <div className="center_keeping_conatiner">
      <NavbarNew loginType={"guest"} />
      <div className="minHeight67vhDatahubPage">
        <Switch>
          <Route exact path="/home/datasets" component={GuestUserHomeNew} />
          <Route exact path="/home" component={GuestUserHomeNew} />
        </Switch>
      </div>
      <FooterNew />
    </div>
  );
};

export default GuestRoutes;
