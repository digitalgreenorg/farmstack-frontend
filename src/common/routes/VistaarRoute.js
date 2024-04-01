import { VistaarFarmStackProvider } from "features/vistaar/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Vistaar = lazy(() => import("../../features/vistaar/src/routes"));

const VistaarRoute = () => {
  return (
    <VistaarFarmStackProvider>
      <Route path="/vistaar" component={Vistaar} />
    </VistaarFarmStackProvider>
  );
};

export default VistaarRoute;
