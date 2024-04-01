import React, { lazy, Suspense } from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Loader from "common/components/Loader";
import ScrollToTop from "common/components/ScrollToTop";

const instance = process.env.REACT_APP_INSTANCE;

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <Router>
          <ScrollToTop />
          <Switch>
            {instance === "VISTAAR" && (
              <Route
                path="/vistaar"
                component={lazy(() => import("common/routes/VistaarRoute"))}
              />
            )}
            {instance === "EADP" && (
              <Route
                path="/eadp"
                component={lazy(() => import("common/routes/EadpRoute"))}
              />
            )}
            {instance === "KADP" && (
              <Route
                path="/kadp"
                component={lazy(() => import("common/routes/KadpRoute"))}
              />
            )}
            <Redirect from="/" to={`/${instance.toLowerCase()}`} />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
