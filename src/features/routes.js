let featureRoutes;
try {
  featureRoutes = require(`./default/src/routes/index`).default;
} catch (error) {
  console.warn(
    `Failed to load routes for ${process.env.REACT_APP_INSTANCE}`,
    error
  );
  featureRoutes = () => <div>Feature set not supported or not found</div>;
}

export default featureRoutes;
