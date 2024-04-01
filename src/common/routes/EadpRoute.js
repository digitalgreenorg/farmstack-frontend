import { EadpFarmStackProvider } from "features/eadp/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Eadp = lazy(() => import("../../features/eadp/src/routes"));

const EadpRoute = () => {
  return (
    <EadpFarmStackProvider>
      <Route path="/eadp" component={Eadp} />
    </EadpFarmStackProvider>
  );
};

export default EadpRoute;
