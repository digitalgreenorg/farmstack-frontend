import { KadpFarmStackProvider } from "features/kadp/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Kadp = lazy(() => import("../../features/kadp/src/routes"));

const KadpRoute = () => {
  return (
    <KadpFarmStackProvider>
      <Route path="/kadp" component={Kadp} />
    </KadpFarmStackProvider>
  );
};

export default KadpRoute;
