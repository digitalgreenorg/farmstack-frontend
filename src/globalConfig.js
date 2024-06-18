/**
 * Configuration settings for the Ethiopia Agricultural Data Sharing Platform.
 *
 * @typedef {Object} EnableSubBanners
 * @property {boolean} first - Enable the first sub-banner.
 * @property {boolean} second - Enable the second sub-banner.
 * @property {boolean} third - Enable the third sub-banner.
 *
 * @typedef {Object} EnableSections
 * @property {boolean} datasets - Flag to enable the datasets section.
 * @property {boolean} co_stewards - Flag to enable the co-stewards section.
 * @property {boolean} participants - Flag to enable the participants section.
 * @property {boolean} connectors - Flag to enable the connectors section.
 * @property {boolean} resources - Flag to enable the resources section.
 *
 * @typedef {Object} DynamicLabelling
 * @property {string} datasets - Label for datasets.
 * @property {string} co_steward - Label for co-stewards.
 * @property {string} participants - Label for participants.
 * @property {string} contents - Label for contents section.
 * @property {string} connectors - Label for use cases (connectors).
 *
 * @typedef {Object} Config
 * @property {string} title - Title of the platform.
 * @property {boolean} enableBanner - Flag to enable or disable the banner.
 * @property {string} banner - Banner type, with 'DEFAULT' as the default setting.
 * @property {string} navBar - Navigation bar style, with 'DEFAULT' as the default setting.
 * @property {EnableSubBanners} enableSubBanners - Flags to enable specific sub-banners.
 * @property {EnableSections} enableSections - Flags to enable specific sections on the platform.
 * @property {DynamicLabelling} dynamicLabelling - Dynamic labels for different sections of the platform.
 * @property {string} footer - Footer style, with 'DEFAULT' as the default setting.
 * @property {boolean} enableFooter - Flag to enable or disable the footer.
 * @property {boolean} enableAI - Flag to enable AI features.
 *
 * @module globalConfig
 */

const rawConfig = process.env.REACT_APP_CONFIG_JSON;

let globalConfig;

try {
  globalConfig = JSON.parse(rawConfig);
} catch (error) {
  console.error("Failed to parse configuration from environment:", error);
  // Handle the error appropriately, perhaps default to a basic configuration
  globalConfig = {}; // Provide some default configuration or rethrow the error
}

export default globalConfig;
