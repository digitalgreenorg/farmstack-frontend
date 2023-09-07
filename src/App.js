import React, { useContext, useEffect, Suspense, lazy } from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { FarmStackContext } from "./Components/Contexts/FarmStackContext";
import Loader from "./Components/Loader/Loader";
import Toast from "./Components/Generic/Toast";
import NewError from "./Components/Error/NewError";
import UrlConstant from "./Constants/UrlConstants";
import HTTPService from "./Services/HTTPService";
import { getUserLocal, flushLocalstorage, setRoleLocal } from "./Utils/Common";
import ScrollToTop from "./Components/ScrollTop/ScrollToTop";

// Lazy loading for faster initial load
const OnBoarding = lazy(() => import("./Views/Pages/HomeScreen/OnBoarding"));
const Datahub = lazy(() => import("./Layout/Datahub"));
const Participant = lazy(() => import("./Layout/Participant"));
const GuestRoutes = lazy(() => import("./Layout/GuestRoutes"));
const GuestUserContactNew = lazy(() =>
  import("./Views/GuestUser/GuestUserContactNew")
);
function App() {
  const { isLoading, toastDetail, setAdminData, setIsVerified } =
    useContext(FarmStackContext);
  function getAdminData() {
    let url =
      UrlConstant.base_url + UrlConstant.microsite_admin_organization + "/";
    let method = "GET";
    // let url = UrlConstant.base_url + UrlConstant.microsite_admin_organization
    HTTPService(method, url, "", false, false, false, false, false)
      .then((response) => {
        setAdminData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  let roleId = {
    1: "datahub_admin",
    3: "datahub_participant_root",
    6: "datahub_co_steward",
  };

  const verifyUserDataOfLocal = () => {
    let url = UrlConstant.base_url + UrlConstant.verify_local_data_of_user;
    let userId = getUserLocal();
    if (!userId) {
      flushLocalstorage();
      return;
    }
    let params = { user_id: userId };
    HTTPService("GET", url, params, false, false, false)
      .then((response) => {
        if (!response?.data?.on_boarded) {
          flushLocalstorage();
          return;
        }
        setIsVerified(true);
        setRoleLocal(roleId[response?.data?.role_id]);
      })
      .catch((err) => {
        console.log("error", err);
        setIsVerified(false);
      });
  };
  useEffect(() => {
    verifyUserDataOfLocal();
    getAdminData();
  }, []);
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        {isLoading ? <Loader /> : ""}
        {toastDetail.status ? (
          <Toast message={toastDetail.message} type={toastDetail.type} />
        ) : (
          ""
        )}
        <Router>
          <ScrollToTop />
          <Switch>
            <Route exact path="/login" component={OnBoarding} />
            <Route path="/datahub" component={Datahub} />
            <Route path="/participant" component={Participant} />
            <Route path="/error/:status" component={NewError} />
            <Route path="/home" component={GuestRoutes} />
            <Route exact path="/contact" component={GuestUserContactNew} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
