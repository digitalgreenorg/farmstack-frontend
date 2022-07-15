import { useHistory } from "react-router-dom";
import LocalStorageConstants from "../Constants/LocalStorageConstants";
import RegexConstants from "../Constants/RegexConstants";
import React from 'react'
import ReactDOM from 'react-dom'
import SESSION_CONSTANTS from "../Constants/OtherConstants";

export const setTokenLocal = (token) => {
  localStorage.setItem(
    LocalStorageConstants.KEYS.JWTToken,
    JSON.stringify(token)
  );
};
export const getTokenLocal = () => {
  const tokenString = localStorage.getItem(LocalStorageConstants.KEYS.JWTToken);
  const userToken = JSON.parse(tokenString);
  return userToken;
};
export const setUserId = (token) => {
  localStorage.setItem(LocalStorageConstants.KEYS.user, JSON.stringify(token));
};
export const getUserLocal = () => {
  const tokenString = localStorage.getItem(LocalStorageConstants.KEYS.user);
  const userToken = JSON.parse(tokenString);
  return userToken;
};

/*
  Generic Method to check regex match between a string and a regex pattern 
  */
export const validateInputField = (newFieldValue, regex) => {
  if (newFieldValue.match(regex)) {
    return true;
  }
  return false;
};

/*
  Generic Method used to disallow leading spaces and consecutive spaces
  in an input field.
  Returns true after preveting input if user attempted invalid space input.
  */
export const handleUnwantedSpace = (fieldValue, e) => {
  if ((fieldValue == "" || fieldValue.endsWith(" ")) && e.keyCode === 32) {
    e.preventDefault();
    return true;
  }
};
/*
  Generic Method used to disallow invalid characters in address fields.
  Used as handler method for onKeyDown attribute in TextField
  */
export const handleAddressCharacters = (fieldValue, e) => {
  if (!handleUnwantedSpace(fieldValue, e)) {
    if (e.key.match(RegexConstants.INVALID_ADDRESS_CHARACTERS)) {
      e.preventDefault();
    }
  }
};

/*
  Generic Method used to disallow invalid characters in Name fields.
  Used as handler method for onKeyDown attribute in TextField
  */
export const handleNameFieldEntry = (fieldValue, e) => {
  if (!handleUnwantedSpace(fieldValue, e)) {
    if (!e.key.match(RegexConstants.APLHABET_REGEX)) {
      e.preventDefault();
    }
  }
};

const GetErrorHandlingRoute = (e) => {
  if (e.response != null && e.response != undefined && e.response.status == SESSION_CONSTANTS.SESSION_TIMEOUT)
  {
    console.log(e.response.status);
    return('/sessionexpired');
  }
  else
  {
    return('/error');
  }
};

export default GetErrorHandlingRoute;
