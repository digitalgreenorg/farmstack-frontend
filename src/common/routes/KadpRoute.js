// import { KadpFarmStackProvider } from "common/components/context/KadpContext/FarmStackProvider";
import { KadpFarmStackProvider } from "features/kadp/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";
const instance = process.env.REACT_APP_INSTANCE;
const Kadp = lazy(() => import("../../features/kadp/src/routes"));

const KadpRoute = () => {
  if (instance !== "KADP") {
    return null;
  }

  return (
    <KadpFarmStackProvider>
      <Route path="/kadp" component={Kadp} />
    </KadpFarmStackProvider>
  );
};

export default KadpRoute;
