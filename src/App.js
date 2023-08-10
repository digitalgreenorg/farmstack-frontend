import React, { useContext, useEffect } from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Datahub from "./Layout/Datahub";
import Participant from "./Layout/Participant";

import OnBoarding from "./Views/Pages/HomeScreen/OnBoarding";
import { FarmStackContext } from "./Components/Contexts/FarmStackContext";
import Loader from "./Components/Loader/Loader";
import Toast from "./Components/Generic/Toast";
import GuestRoutes from "./Layout/GuestRoutes";
import NewError from "./Components/Error/NewError";
import GuestUserContactNew from "./Views/GuestUser/GuestUserContactNew";
import UrlConstant from "./Constants/UrlConstants";
import HTTPService from "./Services/HTTPService";
import ScrollToTop from "./Components/ScrollTop/ScrollToTop";

function App() {
  const { isLoading, toastDetail, setAdminData, setIsVerified, isVerified } =
    useContext(FarmStackContext);
  function getAdminData() {
    let url =
      UrlConstant.base_url + UrlConstant.microsite_admin_organization + "/";
    let method = "GET";
    HTTPService(method, url, "", false, false, false, false, false)
      .then((response) => {
        setAdminData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  useEffect(() => {
    getAdminData();
  }, []);
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default App;
