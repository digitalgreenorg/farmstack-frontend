import React, { lazy, Suspense } from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "common/components/Loader";
import ScrollToTop from "common/components/ScrollToTop";
import featureRoutes from "features/routes";
const MainComponent = lazy(() => Promise.resolve({ default: featureRoutes }));

const instance = process.env.REACT_APP_INSTANCE;

// const VistaarRoute = lazy(() => import("features/vistaar/src/routes"));
// const EadpRoute = lazy(() => import("features/eadp/src/routes"));
// const KadpRoute = lazy(() => import("features/kadp/src/routes"));

function App() {
  // let MainComponent;
  // switch (instance.toUpperCase()) {
  //   case "VISTAAR":
  //     MainComponent = VistaarRoute;
  //     break;
  //   case "EADP":
  //     MainComponent = EadpRoute;
  //     break;
  //   case "KADP":
  //     MainComponent = KadpRoute;
  //     break;
  //   default:
  //     MainComponent = () => <div>Instance not supported</div>;
  // }
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route path="/" component={MainComponent} />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
