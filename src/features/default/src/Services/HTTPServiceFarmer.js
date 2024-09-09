import axios from "axios";
import { getTokenLocal } from "../Utils/Common";

const HTTPService = async (
  method,
  url,
  data = null,
  isFormData = false,
  isAuthorization = true,  // Default to true for auth tokens, but false when using shared key
  jwttoken = null,  // JWT token, used only if isAuthorization is true
  withCredentials = false,  // Credentials, like cookies, are optional
  customHeaders = {}  // Custom headers (e.g., X-SHARED-KEY)
) => {
  // If isAuthorization is false, skip Authorization headers
  let headers = {
    "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    ...customHeaders,  // Add custom headers (like X-SHARED-KEY) if provided
  };

  // Add Authorization header if isAuthorization is true and token is present
  if (isAuthorization && jwttoken) {
    headers["Authorization"] = `Bearer ${jwttoken || getTokenLocal()}`;
  }

  try {
    // Make the API request using Axios
    const response = await axios({
      method,
      url,
      headers,
      withCredentials,  // Whether to send credentials such as cookies
      params: method === "GET" ? data : undefined,  // Use params for GET requests
      data: method !== "GET" ? data : undefined,  // Use data for non-GET requests
    });

    return response;
  } catch (error) {
    // Handle errors (this can be customized)
    throw error;
  }
};

export default HTTPService;
