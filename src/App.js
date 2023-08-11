import React, { useContext, useEffect,useState } from "react";
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

import Newpage from "./Components/Datasets_New/Newpage";
import AllMeasuresPage from "./Components/Datasets_New/AllMeasuresPage";

import OnBoarding from "./Views/Pages/HomeScreen/OnBoarding";
import { FarmStackContext } from "./Components/Contexts/FarmStackContext";
import Loader from "./Components/Loader/Loader";
import Toast from "./Components/Generic/Toast";
import GuestRoutes from "./Layout/GuestRoutes";
import NewError from "./Components/Error/NewError";
import GuestUserContactNew from "./Views/GuestUser/GuestUserContactNew";
import UrlConstant from "./Constants/UrlConstants";
import HTTPService from "./Services/HTTPService";
import { getUserLocal, flushLocalstorage, setRoleLocal } from "./Utils/Common";
import ScrollToTop from "./Components/ScrollTop/ScrollToTop";
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

  const [measures, setMeasures] = useState([]);

  const handleCreateMeasureClick = (measureData) => {
    if (measureData) {
      const newMeasure = { ...measureData, id: Date.now() };
      setMeasures([...measures, newMeasure]);
    }
  };

  const deleteMeasure = (measureId) => {
    const updatedMeasures = measures.filter((item) => item.id !== measureId);
    setMeasures(updatedMeasures);
  };

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
          <Route exact path="/newpage">
          <Newpage
            measures={measures}
            setMeasures={setMeasures}
            createMeasure={handleCreateMeasureClick}
          />
        </Route>
        <Route exact path="/allmeasures" >
          <AllMeasuresPage
            measures={measures}
            setMeasures={setMeasures}
            deleteMeasure={deleteMeasure}
            CreateMeasure={handleCreateMeasureClick}
          />
        </Route>
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
