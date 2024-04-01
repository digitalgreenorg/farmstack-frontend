import { EadpFarmStackProvider } from "common/components/context/EadpContext/FarmStackProvider";
import React, { lazy } from "react";
import { Route } from "react-router-dom";

const instance = process.env.REACT_APP_INSTANCE;

const EadpRoute = () => {
  if (instance !== "EADP") {
    return null;
  }
  return (
    <EadpFarmStackProvider>
      <Route
        path="/eadp"
        component={lazy(() => import("../../features/eadp/src/routes"))}
      />
    </EadpFarmStackProvider>
  );
};

export default EadpRoute;
