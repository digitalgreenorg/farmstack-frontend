// import { VistaarFarmStackProvider } from "common/components/context/VistaarContext/FarmStackProvider";
import { VistaarFarmStackProvider } from "features/vistaar/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Vistaar = lazy(() => import("../../features/vistaar/src/routes"));
const instance = process.env.REACT_APP_INSTANCE;

const VistaarRoute = () => {
  if (instance !== "VISTAAR") {
    return null;
  }
  return (
    <VistaarFarmStackProvider>
      <Route path="/vistaar" component={Vistaar} />
    </VistaarFarmStackProvider>
  );
};

export default VistaarRoute;
