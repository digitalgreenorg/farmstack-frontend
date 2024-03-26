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
import ScrollToTop from "./features/vistaar/src/Components/ScrollTop/ScrollToTop";
import Loader from "./features/vistaar/src/Components/Loader/Loader";

const Vistaar = lazy(() => import("./features/vistaar/src/routes"));
const Ethopia = lazy(() => import("./features/eadp/src/routes"));
const Kenya = lazy(() => import("./features/kadp/src/routes"));
const instance = process.env.REACT_APP_INSTANCE;

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <Router>
          <ScrollToTop />
          <Switch>
            {instance === "VISTAAR" && (
              <Route path="/vistaar" component={Vistaar} />
            )}
            {instance === "EADP" && <Route path="/eadp" component={Ethopia} />}
            {instance === "KADP" && <Route path="/kadp" component={Kenya} />}
            <Redirect from="/" to={`/${instance.toLowerCase()}`} />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
