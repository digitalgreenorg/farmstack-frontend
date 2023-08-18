import React from "react";
import Connectors from "./Connectors";

const GuestUserConnectors = () => {
  return (
    <div>
      <Connectors user="guest" breadcrumbFromRoute={"Home"} />
      
    </div>
  );
};

export default GuestUserConnectors;