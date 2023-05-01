import React from "react";
import GuestUserParticipants from "./GuestUserParticipants";

function GuestUserCoStewardNew() {
  return (
    <>
      {/* routing in GuestUserParticipants component is based on title if title is being changed routing condition need to be update */}
      <GuestUserParticipants
        title="Co-stewards - Community builders"
        description="Uniting Participants for a Better Tomorrow who enable  Powerful Networks for Agricultural Innovation."
      />
    </>
  );
}

export default GuestUserCoStewardNew;
