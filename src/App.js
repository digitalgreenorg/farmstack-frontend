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

// const VistaarRoute = lazy(() => import("features/vistaar/src/routes"));
// const EadpRoute = lazy(() => import("features/eadp/src/routes"));
// const KadpRoute = lazy(() => import("features/kadp/src/routes"));

const getMainComponent = (instance) => {
  switch (instance) {
    case "VISTAAR":
      return lazy(() => import("features/vistaar/src/routes"));
    case "EADP":
      return lazy(() => import("features/eadp/src/routes"));
    case "KADP":
      return lazy(() => import("features/kadp/src/routes"));
    default:
      // Returning a default component for unsupported instances
      return () => <div>Instance not supported</div>;
  }
};

const MainComponent = getMainComponent(instance);

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
  // switch (instance) {
  //   case "VISTAAR":
  //     import("features/vistaar/src/routes").then((module) => {
  //       MainComponent = module.default;
  //     });
  //     break;
  //   case "EADP":
  //     import("features/eadp/src/routes").then((module) => {
  //       MainComponent = module.default;
  //     });
  //     break;
  //   case "KADP":
  //     import("features/kadp/src/routes").then((module) => {
  //       MainComponent = module.default;
  //     });
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
