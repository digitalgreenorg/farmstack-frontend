import { FarmStackContext } from "common/components/context/DefaultContext/FarmstackProvider";
import React, { useContext, useEffect, useRef } from "react";

const TempFarmerFile = () => {
  const { callToast, callLoader } = useContext(FarmStackContext);
  const iframeRef = useRef(null);

  useEffect(() => {
    callLoader(true);

    const iframe = iframeRef.current;
    const sendMessage = () => {
      iframe.contentWindow.postMessage(
        {},
        "https://farmer-registry-stage.digiext.org/dashboard"
      );
    };

    iframe.onload = sendMessage;

    // If the iframe is already loaded
    if (
      iframe &&
      iframe.contentWindow &&
      iframe.contentWindow.document.readyState === "complete"
    ) {
      sendMessage();
    }
    callLoader(false);
  }, []);

  return (
    <div>
      <iframe
        ref={iframeRef}
        src="https://farmer-registry-stage.digiext.org/dashboard"
        style={{ width: "100%", height: "800px", border: "none" }}
        title="Farmer Dashboard"
      />
    </div>
  );
};

export default TempFarmerFile;
