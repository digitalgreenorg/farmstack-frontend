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

const VistaarRoute =
  instance === "VISTAAR"
    ? lazy(() => import("common/routes/VistaarRoute"))
    : null;
const EadpRoute =
  instance === "EADP" ? lazy(() => import("common/routes/EadpRoute")) : null;
const KadpRoute =
  instance === "KADP" ? lazy(() => import("common/routes/KadpRoute")) : null;

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <Router>
          <ScrollToTop />
          <Switch>
            {instance === "VISTAAR" && (
              <Route path="/vistaar" component={VistaarRoute} />
            )}
            {instance === "EADP" && (
              <Route path="/eadp" component={EadpRoute} />
            )}
            {instance === "KADP" && (
              <Route path="/kadp" component={KadpRoute} />
            )}
            <Redirect from="/" to={`/${instance.toLowerCase()}`} />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
