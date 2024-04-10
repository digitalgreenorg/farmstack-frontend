import React, { lazy, Suspense } from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "common/components/Loader";
import ScrollToTop from "common/components/ScrollToTop";
import featureRoutes from "features/routes";
const MainComponent = lazy(() => Promise.resolve({ default: featureRoutes }));

function App() {
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
