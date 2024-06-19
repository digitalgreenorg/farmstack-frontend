import React from "react";
import GuestUserParticipants from "./GuestUserParticipants";
import globalConfig from "globalConfig";

function GuestUserCoStewardNew() {
  return (
    <>
      <GuestUserParticipants
        title={`${globalConfig?.dynamicLabelling?.co_stewards} - Community builders`}
        description="Uniting Participants for a Better Tomorrow who enable  Powerful Networks for Agricultural Innovation."
        isCosteward={true}
        breadcrumbFromRoute={"Home"}
      />
    </>
  );
}

export default GuestUserCoStewardNew;
