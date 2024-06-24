const fs = require("fs");
const path = require("path");
const configFilePath = path.join(
  __dirname,
  "..",
  "src/configs/datasetConnectorsConfig.js"
);

function toggleConnector(action, fileName) {
  if (!fs.existsSync(configFilePath)) {
    console.error("Config file does not exist.");
    return;
  }

  let config = require(configFilePath);
  // Invalidate require cache to ensure fresh read
  delete require.cache[require.resolve(configFilePath)];

  const connectorIndex = config.datasetConnectors.findIndex(
    (connector) => connector.fileName === fileName
  );

  if (connectorIndex !== -1) {
    config.datasetConnectors[connectorIndex].enable = action === "enable";
    fs.writeFileSync(
      configFilePath,
      `module.exports = ${JSON.stringify(config, null, 2)};\n`
    );
    console.log(`Dataset connector ${fileName} has been ${action}d.`);
  } else {
    console.log(`Dataset connector ${fileName} not found.`);
  }
}

const [action, fileName] = process.argv.slice(2);
console.log("🚀 ~ fileName:", action, fileName);
if (!action || !fileName) {
  console.error("Please specify the action (enable/disable) and the fileName");
  process.exit(1);
}

toggleConnector(action, fileName);
