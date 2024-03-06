import React, { useContext, useEffect, lazy, Suspense } from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ScrollToTop from "./features/vistaar/src/Components/ScrollTop/ScrollToTop";
import Loader from "./features/vistaar/src/Components/Loader/Loader";

const Vistaar = lazy(() => import("./features/vistaar/src/routes"));

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route path="/vistaar" component={Vistaar} />
            <Redirect from="/" to="/vistaar" />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
