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
import Login from "./Views/Login/Login";
import ProfileScreen from "./Views/Login/ProfileScreen";
import Participants from "./Views/Participants/Participants";
import AddParticipants from "./Views/Participants/AddParticipants";
import EditParticipants from "./Views/Participants/EditParticipants";
import ViewParticipants from "./Views/Participants/ViewParticipants";
import Datahub from "./Layout/Datahub";
import Participant from "./Layout/Participant";
import Error from "./Components/Error/Error";
import SessionExpired from "./Components/SessionExpired/SessionExpired";
import GuestUserHome from "./Views/GuestUser/GuestUserHome";
import GuestUserLegal from "./Views/GuestUser/GuestUserLegal";
import GuestUserContact from "./Views/GuestUser/GuestUserContact";
import AddParticipantRegistrationForm from "./Components/PatricipantRegistration/AddParticipantRegistrationform";
import ViewMetaDatasetDetails from "./Components/AdminDatasetConnection/ViewMetaDatasetDetails";
import Viewdetails from "./Components/GuestUser/Viewdetails";
import GuestUserMainHomePage from "./Views/GuestUser/GuestUserMainHomePage";
import OnBoarding from "./Views/Pages/HomeScreen/OnBoarding";
import FarmStackProvider, {
  FarmStackContext,
} from "./Components/Contexts/FarmStackContext";
import Loader from "./Components/Loader/Loader";
import Toast from "./Components/Generic/Toast";
import GuestRoutes from "./Layout/GuestRoutes";
import GuestUserDatasets from "./Components/GuestUser/GuestUserDatasets";
import NewError from "./Components/Error/NewError";
import GuestUserContactNew from "./Views/GuestUser/GuestUserContactNew";
import UrlConstant from "./Constants/UrlConstants";
import HTTPService from "./Services/HTTPService";
import {
  getUserLocal,
  flushLocalstorage,
  setUserId,
  setRoleLocal,
  getRoleLocal,
  isLoggedInUserAdmin,
} from "./Utils/Common";
function App() {
  const { isLoading, toastDetail, setAdminData } = useContext(FarmStackContext);
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
        console.log("error");
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
        console.log("response to verify local data", response);
        if (!response?.data?.on_boarded) {
          flushLocalstorage();
          return;
        }
        setRoleLocal(roleId[response?.data?.role_id]);
        console.log(
          "response to verify local data role",
          getRoleLocal(),
          isLoggedInUserAdmin()
        );
      })
      .catch((err) => {
        console.log("error to verify local data", err);
      });
  };
  useEffect(() => {
    // verifyUserDataOfLocal();
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
        <Switch>
          {/* <Route exact path="/login" component={Login} />
          <Route exact path="/login/profile" component={ProfileScreen} />
          <Route exact path="/login/org" component={OrganisationScreen} />
          <Route exact path="/login/branding" component={BrandingScreen} />
          <Route exact path="/login/policies" component={Policies} />
        <Route  path="/login/profile" component={ProfileScreen} /> */}
          {/* <Route exact path="/datahub/login" component={Login} /> */}
          {/* <Route exact path="/participant/login" component={Login} /> */}
          <Route exact path="/login" component={OnBoarding} />
          <Route path="/datahub" component={Datahub} />
          <Route path="/participant" component={Participant} />
          <Route path="/sessionexpired" component={SessionExpired} />
          <Route path="/error/:status" component={NewError} />
          <Route path="/home" component={GuestRoutes} />
          {/* <Route exact path="/home/viewdataset/:id" component={Viewdetails} /> */}
          <Route exact path="/legal" component={GuestUserLegal} />
          <Route exact path="/contact" component={GuestUserContactNew} />
          <Route
            exact
            path="/participantregistration"
            component={AddParticipantRegistrationForm}
          />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
