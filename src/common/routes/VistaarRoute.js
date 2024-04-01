import { VistaarFarmStackProvider } from "features/vistaar/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";

const VistaarRoute = () => {
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
