const rawConfig = process.env.REACT_APP_CONFIG_JSON;
const globalConfig = JSON.parse(rawConfig);

export default globalConfig;
