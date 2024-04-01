import { VistaarFarmStackProvider } from "features/vistaar/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";

const instance = process.env.REACT_APP_INSTANCE;

const VistaarRoute = () => {
  if (instance !== "VISTAAR") {
    return null;
  }
  return (
    <VistaarFarmStackProvider>
      <Route
        path="/vistaar"
        component={lazy(() => import("../../features/vistaar/src/routes"))}
      />
    </VistaarFarmStackProvider>
  );
};

export default VistaarRoute;
