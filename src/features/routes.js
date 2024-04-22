let featureRoutes;
try {
  const moduleName = process.env.REACT_APP_INSTANCE.toLowerCase();
  console.log(`Loading routes from: ./${moduleName}/src/routes/index`);
  featureRoutes = require(`./${moduleName}/src/routes/index`).default;
} catch (error) {
  console.warn(
    `Failed to load routes for ${process.env.REACT_APP_INSTANCE}`,
    error
  );
  featureRoutes = () => <div>Feature set not supported or not found</div>;
}

export default featureRoutes;
