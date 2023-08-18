import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const FarmStackContext = React.createContext();

const FarmStackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [accountData, setAccountData] = useState(null);
  //Available options for toast type error, warning, info & success
  const [toastDetail, setToastDetail] = useState({
    status: false,
    type: "",
    message: "",
  });
  const [adminData, setAdminData] = useState(null);

  // logged in user onboarding status
  const [isVerified, setIsVerified] = useState(false);

  //category
  const [allCategories, setAllCategories] = useState([]);
  const [categoryNamesList, setCategoryNameList] = useState([]);
  function callLoader(condtion) {
    setIsLoading(condtion);
  }

  function callToast(message, type, action) {
    setToastDetail({ type: type, message: message, status: action });
  }

  //complete dashboard contexts
  const [
    allDatasetFilesAvailableInsideTheDatasetViewed,
    setAllDatasetFilesAvailableInsideTheDatasetViewed,
  ] = useState([]);

  //when user gives user_map in dataset detail api and receives the permission for access to file
  const [allDatasetFilesAsPerUsagePolicy, setAllDatasetFilesAsPerUsagePolicy] =
    useState([]);

  //selectedFileDetails
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);

  const values = {
    callLoader,
    isLoading,
    toastDetail,
    callToast,
    setAdminData,
    adminData,
    setAccountData,
    accountData,
    setIsVerified,
    isVerified,

    //dataset dashboard details contexts
    allDatasetFilesAvailableInsideTheDatasetViewed,
    setAllDatasetFilesAvailableInsideTheDatasetViewed,
    allDatasetFilesAsPerUsagePolicy,
    setAllDatasetFilesAsPerUsagePolicy,
    selectedFileDetails,
    setSelectedFileDetails,
  };
  return (
    <FarmStackContext.Provider value={values}>
      {children}
    </FarmStackContext.Provider>
  );
};

export default FarmStackProvider;
