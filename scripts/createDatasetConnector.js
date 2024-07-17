const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Template file path
const templatePath = path.join(
  __dirname,
  "..",
  "src/default-templates/DatasetConnectorTemplate.js"
);

const configFilePath = path.join(
  __dirname,
  "..",
  "src/configs/datasetConnectorsConfig.js"
);

const targetDir = path.join(
  __dirname,
  "..",
  "src/components/dataset-connectors"
);

const askQuestion = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function createComponent() {
  try {
    const connectorName = await askQuestion(
      "What will be the connector name? "
    );
    if (!connectorName.trim()) {
      console.error("Connector name is required");
      process.exit(1);
    }

    const componentName = await askQuestion(
      "What will be the component name? "
    );
    if (!componentName.trim()) {
      console.error("Component name is required");
      process.exit(1);
    }

    const label = await askQuestion("What will be the label? ");
    // Ensure readline interface is closed after collecting inputs
    rl.close();

    // Set the target path for the new component
    const targetPath = path.join(targetDir, `${connectorName}.js`);

    // Read the template file
    const data = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders in the template
    let result = data
      .replace(/__LABEL__/g, label)
      .replace(/__CONNECTOR_NAME__/g, connectorName)
      .replace(/__COMPONENT_NAME__/g, componentName);

    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Write the new component file
    fs.writeFileSync(targetPath, result, "utf8");
    console.log(
      `Dataset connector ${connectorName} created successfully with component ${componentName}!`
    );
    // New part: Update config file
    const connectorDetails = {
      label: label,
      component: componentName,
      path: `./src/components/dataset-connectors/${connectorName}.js`,
      enable: true,
      fileName: connectorName,
      key: connectorName,
    };

    updateConfigFile(connectorDetails);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

createComponent();

function updateConfigFile(connectorDetails) {
  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(
      configFilePath,
      "module.exports = { datasetConnectors: [] };\n"
    );
  }

  const config = require(configFilePath);
  config.datasetConnectors.push(connectorDetails);

  fs.writeFileSync(
    configFilePath,
    `module.exports = ${JSON.stringify(config, null, 2)};\n`
  );
}
