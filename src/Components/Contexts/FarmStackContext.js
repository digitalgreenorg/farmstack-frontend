import React, { useState } from "react";

export const FarmStackContext = React.createContext();

const FarmStackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  function callLoader(condtion) {
    setIsLoading(condtion);
  }
  const values = { callLoader, isLoading };
  return (
    <FarmStackContext.Provider value={values}>
      {children}
    </FarmStackContext.Provider>
  );
};

export default FarmStackProvider;
