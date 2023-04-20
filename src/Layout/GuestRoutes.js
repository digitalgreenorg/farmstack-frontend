import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import DataSetsListView from "../Components/Datasets_New/DataSetsListView";
import FooterNew from "../Components/Footer/Footer_New";
import GuestUserDatasets from "../Components/GuestUser/GuestUserDatasets";
import NavbarNew from "../Components/Navbar/Navbar_New";
import GuestUserDatatsets from "../Views/Dataset/GuestUserDataset";
import GuestUserHomeNew from "../Views/GuestUser/GuestUserHomeNew";
import GuestUserLegalNew from "../Views/GuestUser/GuestUserLegalNew";

const GuestRoutes = () => {
  return (
    <div className="center_keeping_conatiner">
      <NavbarNew loginType={"guest"} />
      <div className="minHeight67vhDatahubPage">
        <Switch>
          <Route exact path="/home" component={GuestUserHomeNew} />
          <Route exact path="/home/datasets" component={GuestUserDatatsets} />
          <Route exact path="/home/legal" component={GuestUserLegalNew} />
        </Switch>
      </div>
      <FooterNew />
    </div>
  );
};

export default GuestRoutes;
