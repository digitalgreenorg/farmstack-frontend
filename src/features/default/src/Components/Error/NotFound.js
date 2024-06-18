import React from "react";
import { useHistory } from "react-router-dom";
import "./NotFound.css"; // Make sure to create this CSS file

const NotFound = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack(); // Navigate back to the previous route
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Oops! Page not found.</h2>
        <p>Sorry, we couldn’t find the page you were looking for.</p>
        <button onClick={goBack} className="go-back-btn">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
