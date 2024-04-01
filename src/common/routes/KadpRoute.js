import { KadpFarmStackProvider } from "features/kadp/src/Components/Contexts/FarmStackContext";
import React, { lazy } from "react";
import { Route } from "react-router-dom";
const instance = process.env.REACT_APP_INSTANCE;

const Kadp =
  instance === "KADP"
    ? lazy(() => import("../../features/kadp/src/routes"))
    : null;

const KadpRoute = () => {
  return (
    <KadpFarmStackProvider>
      <Route path="/kadp" component={Kadp} />
    </KadpFarmStackProvider>
  );
};

export default KadpRoute;
