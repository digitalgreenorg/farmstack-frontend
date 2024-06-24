// src/templates/DatasetConnectorTemplate.js

import React from "react";

const Postgresql = ({ children, ...props }) => {
  return (
    <div>
      {/* Your default dataset connector logic goes here */}
      {children}
    </div>
  );
};

export default Postgresql;
