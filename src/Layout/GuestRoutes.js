import React, { useContext,  lazy } from "react";
import {  Switch, Route } from "react-router-dom";
import FooterNew from "../Components/Footer/Footer_New";
import NavbarNew from "../Components/Navbar/Navbar_New";
import {
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../Utils/Common";
import GuestUserDatatsets from "../Views/Dataset/GuestUserDataset";
import GuestUserHomeNew from "../Views/GuestUser/GuestUserHomeNew";
import GuestUserLegalNew from "../Views/GuestUser/GuestUserLegalNew";
import GuestUserViewDataset from "../Components/GuestUser/GuestUserViewDataset";
import GuestUserParticipants from "../Views/GuestUser/GuestUserParticipants";
import GuestUserParticipantsDetails from "../Views/GuestUser/GuestUserParticipantsDetails";
import GuestUserContactNew from "../Views/GuestUser/GuestUserContactNew";
import GuestUserCoStewardNew from "../Views/GuestUser/GuestUserCoStewardNew";
import GuestUserCostewardDetailsNew from "../Views/GuestUser/GuestUserCostewardDetailsNew";
import RegisterParticipants from "../Components/GuestUser/RegisterParticipants";
import { Divider, useMediaQuery, useTheme } from "@mui/material";
import GetStarted from "../Views/GetStarted/GetStarted";
import ScrollToTop from "../Components/ScrollTop/ScrollToTop";
import { FarmStackContext } from "../Components/Contexts/FarmStackContext";

import GuestUserResources from "../Views/Resources/Guest/GuestUserResources";
import GuestUserViewResource from "../Views/Resources/Guest/GuestUserViewResource";

const GuestRoutes = () => {
  const { isVerified } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="center_keeping_conatiner">
      <ScrollToTop />
      {
        <NavbarNew
          loginType={
            (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) && isVerified
              ? "admin"
              : isLoggedInUserParticipant() && isVerified
              ? "participant"
              : "guest"
          }
        />
      }
      <div
        className={
          mobile
            ? "minHeight67vhDatahubPage" + " " + "mt-70"
            : "minHeight67vhDatahubPage"
        }
      >
        <br />
        <Switch>
          <Route exact path="/home" component={GuestUserHomeNew} />
          <Route exact path="/home/get-started" component={GetStarted} />
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
          <Route exact path="/home/resources" component={GuestUserResources} />
          <Route
            exact
            path="/home/resources/view/:id"
            component={GuestUserViewResource}
          />
        </Switch>
      </div>
      <Divider className="mt-50" />
      <FooterNew />
    </div>
  );
};

export default GuestRoutes;
