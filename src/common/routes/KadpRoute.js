import { KadpFarmStackProvider } from "features/kadp/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";
const instance = process.env.REACT_APP_INSTANCE;

const KadpRoute = () => {
  if (instance !== "KADP") {
    return null;
  }

  return (
    <KadpFarmStackProvider>
      <Route
        path="/kadp"
        component={lazy(() => import("../../features/kadp/src/routes"))}
      />
    </KadpFarmStackProvider>
  );
};

export default KadpRoute;
