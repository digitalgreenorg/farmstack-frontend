import React from "react";
import { Redirect } from "react-router-dom";

const withAccess = (Component, isEnabled) => {
  return (props) => {
    if (!isEnabled) {
      return <Redirect to="/not-found" />;
    }
    return <Component {...props} />;
  };
};

export default withAccess;
