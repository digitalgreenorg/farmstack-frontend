// import { EadpFarmStackProvider } from "./features/eadp/src/Components/Contexts/FarmStackContext";
// import { VistaarFarmStackProvider } from "./features/vistaar/src/Components/Contexts/FarmStackContext";
// import { KadpFarmStackProvider } from "features/kadp/src/Components/Contexts/FarmStackContext";
// import React from "react";
// import ReactDOM from "react-dom";
// import "./features/vistaar/src/Assets/CSS/common.css";
// import App from "./App";

// const instance = process.env.REACT_APP_INSTANCE;

// const FarmStackProviderWrapper =
//   instance === "EADP"
//     ? EadpFarmStackProvider
//     : instance === "KADP"
//     ? KadpFarmStackProvider
//     : VistaarFarmStackProvider;

// ReactDOM.render(
//   <FarmStackProviderWrapper>
//     <App />
//   </FarmStackProviderWrapper>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom";
import "./features/vistaar/src/Assets/CSS/common.css";
import App from "./App";

const instance = process.env.REACT_APP_INSTANCE;

const getFarmStackProvider = async (instance) => {
  switch (instance) {
    case "EADP":
      return (
        await import("./features/eadp/src/Components/Contexts/FarmStackContext")
      ).EadpFarmStackProvider;
    case "KADP":
      return (
        await import("features/kadp/src/Components/Contexts/FarmStackContext")
      ).KadpFarmStackProvider;
    case "VISTAAR":
    default:
      return (
        await import(
          "./features/vistaar/src/Components/Contexts/FarmStackContext"
        )
      ).VistaarFarmStackProvider;
  }
};

getFarmStackProvider(instance).then((FarmStackProviderWrapper) => {
  ReactDOM.render(
    <FarmStackProviderWrapper>
      <App />
    </FarmStackProviderWrapper>,
    document.getElementById("root")
  );
});
