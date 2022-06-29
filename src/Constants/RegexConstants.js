const RegexConstants = {
    APLHABET_REGEX : /[A-Za-z]/,
    NUMBER_REGEX : /^[0-9]*$/,
    // DIGIT_REGEX : /[0-9]/,
    ORG_NAME_REGEX : /^$|^[A-za-z0-9](([^\s])+(\s)?)*$/,
    INVALID_ADDRESS_CHARACTERS : /[!@$%^*(){}\[\]:;"'?]/,
    PINCODE_REGEX : /^[0-9]{0,10}$/,
    WEBSITE_URL_REGEX : /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,

    // NAME_REGEX : /^$|^[A-Z](a-z) /
}

export default RegexConstants