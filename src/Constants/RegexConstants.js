const RegexConstants = {
  APLHABET_REGEX: /[A-Za-z]/,
  TEXT_REGEX: /^[A-Za-z]*$/,
  NUMBER_REGEX: /^[0-9]*$/,
  // DIGIT_REGEX : /[0-9]/,
  ORG_NAME_REGEX: /^$|^[A-za-z0-9](([^\s])+(\s)?)*$/,
  INVALID_ADDRESS_CHARACTERS: /[!@$%^*(){}\[\]:;"'?]/,
  PINCODE_REGEX: /^[0-9]{0,10}$/,
  WEBSITE_URL_REGEX:
    /^((https?|ftp|smtp):\/\/)?(www.)?[a-zA-Z0-9]+\.[a-zA-Z]+(\/[a-zA-Z0-9#]+\/?)*$/,
  NO_SPACE_REGEX: /^([^\s])*$/,
  //   DATE_SET_REGEX: /^$|^[A-za-z][0-9]?(([^\s])+(\s)?)*$/,
  // DATA_SET_REGEX: /^$|^[a-zA-Z][A-Za-z0-9_&@-]?(([^\s])+(\s)?)*$/,
  DATA_SET_REGEX: /^$|^[a-zA-Z0-9.][a-zA-Z0-9. ]*$/,
  connector_name: /^$|^[a-zA-Z0-9][a-zA-Z0-9 ]*$/,
  CROP_SET_REGEX: /^$|^[a-zA-Z][ A-Za-z0-9_-]*$/,
  // GEO_SET_REGEX: /^$|^[a-zA-Z\s]?(([^\s])+(\s)?)*$/,
  GEO_SET_REGEX: /^$|^[a-zA-Z0-9][a-zA-Z0-9 ]*$/,
  // DES_SET_REGEX: /^$|^[a-zA-Z][A-Za-z0-9]?(([^\s])+(\s)?)*$/
  DES_SET_REGEX: /^$|^[a-zA-Z0-9.][a-zA-Z0-9. ]*$/,
  city_name: /^$|^[a-zA-Z][a-zA-Z ]*$/,
  address: /^$|^[a-zA-Z0-9#,][a-zA-Z0-9#, ]*$/,
};

export default RegexConstants;
