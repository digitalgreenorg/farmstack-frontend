import { EadpFarmStackProvider } from "features/eadp/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";
const instance = process.env.REACT_APP_INSTANCE;
const Eadp =
  instance === "EADP"
    ? lazy(() => import("../../features/eadp/src/routes"))
    : null;
const EadpRoute = () => {
  return (
    <EadpFarmStackProvider>
      <Route path="/eadp" component={Eadp} />
    </EadpFarmStackProvider>
  );
};

export default EadpRoute;
