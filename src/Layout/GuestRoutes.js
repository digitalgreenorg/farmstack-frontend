import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import ViewDataSet from "../Components/Datasets/viewDataSet";
import DataSetsListView from "../Components/Datasets_New/DataSetsListView";
import FooterNew from "../Components/Footer/Footer_New";
import GuestUserDatasets from "../Components/GuestUser/GuestUserDatasets";
import NavbarNew from "../Components/Navbar/Navbar_New";
import { getUserLocal } from "../Utils/Common";
import GuestUserDatatsets from "../Views/Dataset/GuestUserDataset";
import GuestUserHomeNew from "../Views/GuestUser/GuestUserHomeNew";
import GuestUserLegalNew from "../Views/GuestUser/GuestUserLegalNew";
import DataSetsView from "../Components/Datasets_New/DataSetsView";
import GuestUserViewDataset from "../Components/GuestUser/GuestUserViewDataset";
import GuestUserParticipants from "../Views/GuestUser/GuestUserParticipants";
import GuestUserParticipantsDetails from "../Views/GuestUser/GuestUserParticipantsDetails";
import GuestUserContactNew from "../Views/GuestUser/GuestUserContactNew";
import GuestUserCoStewardNew from "../Views/GuestUser/GuestUserCoStewardNew";
import GuestUserCostewardDetailsNew from "../Views/GuestUser/GuestUserCostewardDetailsNew";
import RegisterParticipants from "../Components/GuestUser/RegisterParticipants";

const GuestRoutes = () => {
  return (
    <div className="center_keeping_conatiner">
      {getUserLocal() ? (
        <NavbarNew loginType={"admin"} />
      ) : (
        <NavbarNew loginType={"guest"} />
      )}
      {/* <NavbarNew loginType={"guest"} /> */}
      <div className="minHeight67vhDatahubPage">
        <Switch>
          <Route exact path="/home" component={GuestUserHomeNew} />
          <Route exact path="/home/datasets" component={GuestUserDatatsets} />
          <Route
            exact
            path="/home/datasets/:id"
            component={GuestUserViewDataset}
          />
          <Route
            exact
            path="/home/participants"
            component={GuestUserParticipants}
          />
          <Route exact path="/home/register" component={RegisterParticipants} />
          <Route
            exact
            path="/home/participants/view/:id"
            component={GuestUserParticipantsDetails}
          />
          <Route
            exact
            path="/home/costeward"
            component={GuestUserCoStewardNew}
          />
          <Route
            exact
            path="/home/costeward/view/:id"
            component={GuestUserCostewardDetailsNew}
          />
          <Route exact path="/home/legal" component={GuestUserLegalNew} />
          <Route exact path="/home/contact" component={GuestUserContactNew} />
        </Switch>
      </div>
      <FooterNew />
    </div>
  );
};

export default GuestRoutes;
