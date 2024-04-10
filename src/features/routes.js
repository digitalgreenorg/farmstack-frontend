let featureRoutes;
const instance = process.env.REACT_APP_INSTANCE;

switch (instance) {
  case "VISTAAR":
    featureRoutes = require("./vistaar/src/routes/index").default;
    break;
  case "EADP":
    featureRoutes = require("./eadp/src/routes/index").default;
    break;
  case "KADP":
    featureRoutes = require("./kadp/src/routes/index").default;
    break;
  default:
    featureRoutes = () => <div>Instance not supported</div>;
    break;
}

export default featureRoutes;
