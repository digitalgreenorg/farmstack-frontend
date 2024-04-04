// import { EadpFarmStackProvider } from "common/components/context/EadpContext/FarmStackProvider";
import { EadpFarmStackProvider } from "features/eadp/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";
const Eadp = lazy(() => import("../../features/eadp/src/routes"));
const instance = process.env.REACT_APP_INSTANCE;

const EadpRoute = () => {
  if (instance !== "EADP") {
    return null;
  }
  return (
    <EadpFarmStackProvider>
      <Route path="/eadp" component={Eadp} />
    </EadpFarmStackProvider>
  );
};

export default EadpRoute;
