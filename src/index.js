import { EadpFarmStackProvider } from "./features/eadp/src/Components/Contexts/FarmStackContext";
import { VistaarFarmStackProvider } from "./features/vistaar/src/Components/Contexts/FarmStackContext";
import { KadpFarmStackProvider } from "features/kadp/src/Components/Contexts/FarmStackContext";
import React from "react";
import ReactDOM from "react-dom";
import "./features/vistaar/src/Assets/CSS/common.css";
import App from "./App";

const instance = process.env.REACT_APP_INSTANCE;

const FarmStackProviderWrapper =
  instance === "EADP"
    ? EadpFarmStackProvider
    : instance === "KADP"
    ? KadpFarmStackProvider
    : VistaarFarmStackProvider;

ReactDOM.render(
  <FarmStackProviderWrapper>
    <App />
  </FarmStackProviderWrapper>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
