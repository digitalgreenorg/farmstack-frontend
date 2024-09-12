import { FarmStackContext } from "common/components/context/DefaultContext/FarmstackProvider";
import React, { useContext, useEffect, useRef } from "react";
import Dashboard from "../../../../../Da_Registry/index";

const TempDaRegistryFile = () => {
  const { callToast, callLoader } = useContext(FarmStackContext);

  return (
    <><Dashboard /></>
  );
};

export default TempDaRegistryFile;
