import ReactDOM from "react-dom/client";
import App from "./App";
import { EadpFarmStackProvider } from "features/eadp/src/Components/Contexts/FarmStackContext";
import { KadpFarmStackProvider } from "features/kadp/src/Components/Contexts/FarmStackContext";
import { VistaarFarmStackProvider } from "features/vistaar/src/Components/Contexts/FarmStackContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
const instance = process.env.REACT_APP_INSTANCE;

// Dynamically select which context provider to use based on the instance
let ProviderComponent;

switch (instance.toUpperCase()) {
  case "VISTAAR":
    ProviderComponent = VistaarFarmStackProvider;
    break;
  case "EADP":
    ProviderComponent = EadpFarmStackProvider;
    break;
  case "KADP":
    ProviderComponent = KadpFarmStackProvider;
    break;
  default:
    // A default provider or null if there's no suitable match
    ProviderComponent = ({ children }) => <>{children}</>; // Simple pass-through component
}

root.render(
  <ProviderComponent>
    <App />
  </ProviderComponent>
);
