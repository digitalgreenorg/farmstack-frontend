import React from "react";
import ReactDOM from "react-dom";
import "./features/vistaar/src/Assets/CSS/common.css";
import App from "./App";
import FarmStackProvider from "./features/vistaar/src/Components/Contexts/FarmStackContext";

ReactDOM.render(
  <FarmStackProvider>
    <App />
  </FarmStackProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
