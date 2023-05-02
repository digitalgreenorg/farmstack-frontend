import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const FarmStackContext = React.createContext();

const FarmStackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  //Available options for toast type error, warning, info & success
  const [toastDetail, setToastDetail] = useState({
    status: false,
    type: "",
    message: "",
  });
  const [adminData, setAdminData] = useState(null);

  function callLoader(condtion) {
    setIsLoading(condtion);
  }

  function callToast(message, type, action) {
    setToastDetail({ type: type, message: message, status: action });
  }

  const values = {
    callLoader,
    isLoading,
    toastDetail,
    callToast,
    setAdminData,
    adminData,
  };
  return (
    <FarmStackContext.Provider value={values}>
      {children}
    </FarmStackContext.Provider>
  );
};

export default FarmStackProvider;
