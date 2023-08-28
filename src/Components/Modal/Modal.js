import React, { useState } from "react";
import "./Modal.css";
import Axios from "axios";
import { getTokenLocal } from "../../Utils/Common";
import UrlConstant from "../../Constants/UrlConstants";

// ModalComponent handles the creation of an API based on user input.
const ModalComponent = ({ file, closeModal }) => {
  // States for various inputs and responses
  const [endpointName, setEndpointName] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [endpointNameError, setEndpointNameError] = useState("");
  const [selectedColumnsError, setSelectedColumnsError] = useState("");
  const [apiError, setApiError] = useState(null);
  
  // Get the user's access token
  let accesstoken = getTokenLocal();
  
  // Function to handle checkbox changes
  const handleCheckboxChange = (e, columnId) => {
    if (e.target.checked) {
      setSelectedColumns([...selectedColumns, columnId]);
    } else {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnId));
    }
  };
  
  // API URL for creating an endpoint
  const url = UrlConstant.base_url + UrlConstant.create_api;
  
  // Data object to be sent in the API request
  const data = {
    selected_columns: selectedColumns,
    endpoint: endpointName,
    dataset_file_id: file.id,
  };

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEndpointNameError("");
    setSelectedColumnsError("");
    
    // Validation: Check if endpointName and selectedColumns are empty
    if (!endpointName) {
      setEndpointNameError("Endpoint name is required.");
      return;
    }
    if (selectedColumns.length === 0) {
      setSelectedColumnsError("At least one column must be selected.");
      return;
    }

    // API request to create the endpoint
    Axios({
      method: "post",
      url,
      data: data,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accesstoken,
      },
    })
      .then((response) => {
        setApiResponse(response.data);
      })
      .catch((error) => {
        console.log(error.response?.data.error);
        setApiError(error.response?.data.error);
      });
  };

  // Function to handle copying the access key to the clipboard
  const handleCopyAccessKey = () => {
    if (apiResponse && apiResponse.api.access_key) {
      navigator.clipboard.writeText(apiResponse.api.access_key);
      setSnackbarMessage("Copied!!");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Publish API</h2>
        {!apiResponse ? (
          <form onSubmit={handleSubmit}>
            <label>Endpoint Name</label>
            <input
              type="text"
              value={endpointName}
              onChange={(e) => setEndpointName(e.target.value)}
              required
            />
            {endpointNameError && (
              <div className="error-message">{endpointNameError}</div>
            )}
            <label>Select Columns</label>
            {file.content.length > 0 &&
              Object.keys(file.content[0]).map((columnName) => (
                <div key={columnName}>
                  <input
                    type="checkbox"
                    id={columnName}
                    checked={selectedColumns.includes(columnName)}
                    onChange={(e) => handleCheckboxChange(e, columnName)}
                  />
                  <label htmlFor={columnName}>{columnName}</label>
                </div>
              ))}
            {selectedColumnsError && (
              <div className="error-message">{selectedColumnsError}</div>
            )}
            {apiError && <div className="error-message">{apiError}</div>}
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div className="api-response">
            {apiResponse && (
              <>
                <p>API created successfully!</p>
                <p>
                  <a
                    href={`${UrlConstant.base_url_without_slash}${apiResponse.api.endpoint}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`${UrlConstant.base_url_without_slash}${apiResponse.api.endpoint}/`}
                  </a>
                </p>
                <p>Selected Columns:</p>
                {apiResponse.api.selected_columns.map((column, index) => (
                  <span key={index}>
                    {column}
                    <br />
                  </span>
                ))}
                <p>Access Key:</p>
                <div className="access-key-container">
                  <span>{apiResponse.api.access_key}</span>
                  <button onClick={handleCopyAccessKey}>Copy</button>
                </div>
              </>
            )}
          </div>
        )}
        {snackbarMessage && (
          <div className="snackbar">
            <p>{snackbarMessage}</p>
          </div>
        )}
        <button className="close-button" type="button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
