import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FooterNew from "../Components/Footer/Footer_New";
import NavbarNew from "../Components/Navbar/Navbar_New";
import {
  flushLocalstorage,
  getRoleLocal,
  getUserLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
  setRoleLocal,
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
import UrlConstant from "../Constants/UrlConstants";
import HTTPService from "../Services/HTTPService";
import ScrollToTop from "../Components/ScrollTop/ScrollToTop";
import { FarmStackContext } from "../Components/Contexts/FarmStackContext";
import Resources from "../Views/Resources/Resources";
import ViewResource from "../Views/Resources/ViewResource";

const GuestRoutes = () => {
  const { isVerified } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [isVerified, setIsVerified] = useState(false);

  let roleId = {
    1: "datahub_admin",
    3: "datahub_participant_root",
    6: "datahub_co_steward",
  };

  // const verifyUserDataOfLocal = () => {
  //   let url = UrlConstant.base_url + UrlConstant.verify_local_data_of_user;
  //   let userId = getUserLocal();
  //   if (!userId) {
  //     flushLocalstorage();
  //     setIsVerified(false);
  //     return false;
  //   }
  //   let params = { user_id: userId };
  //   HTTPService("GET", url, params, false, false, false)
  //     .then((response) => {
  //       console.log("response to verify local data", url, response);
  //       if (!response?.data?.on_boarded) {
  //         flushLocalstorage();
  //         setIsVerified(false);
  //         return false;
  //       }
  //       setIsVerified(true);
  //       setRoleLocal(roleId[response?.data?.role_id]);
  //       console.log(
  //         "response to verify local data role",
  //         getRoleLocal(),
  //         isLoggedInUserAdmin()
  //       );
  //     })
  //     .catch((err) => {
  //       console.log("error to verify local data", err);
  //       setIsVerified(false);
  //       return true;
  //     });
  //   // setIsVerified(true);
  //   // return true;
  // };
  useEffect(() => {
    // verifyUserDataOfLocal();
  }, []);

  return (
    <div className="center_keeping_conatiner">
      <ScrollToTop />
      {
        <NavbarNew
          loginType={
            isLoggedInUserAdmin() || (isLoggedInUserCoSteward() && isVerified)
              ? "admin"
              : isLoggedInUserParticipant() && isVerified
              ? "participant"
              : "guest"
          }
        />
      }

      {/* {(isLoggedInUserAdmin() || isLoggedInUserCoSteward()) &&
      (isVerified || verifyUserDataOfLocal()) ? (
        <NavbarNew loginType={"admin"} />
      ) : isLoggedInUserParticipant() &&
        (isVerified || verifyUserDataOfLocal()) ? (
        <NavbarNew loginType={"participant"} />
      ) : (
        <NavbarNew loginType={"guest"} />
      )} */}
      {/* <NavbarNew loginType={"guest"} /> */}
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
          <Route exact path="/home/resources" component={Resources} />
          <Route
            exact
            path="/home/resources/view/:id"
            component={ViewResource}
          />
        </Switch>
      </div>
      <Divider className="mt-50" />
      <FooterNew />
    </div>
  );
};

export default GuestRoutes;
