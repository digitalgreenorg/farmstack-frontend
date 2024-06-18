import React from "react";
import ParticipantAndCoStewardDetailsNew from "../ParticipantCoSteward/ParticipantAndCoStewardDetailsNew";

function GuestUserParticipantsDetails(props) {
  const { userTypeCosteward, breadcrumbFromRoute } = props;

  return (
    <div>
      <ParticipantAndCoStewardDetailsNew
        userTypeCosteward={userTypeCosteward}
        title={userTypeCosteward}
        user="guest"
        isCosteward={userTypeCosteward ? true : false}
        breadcrumbFromRoute={breadcrumbFromRoute ?? "Home"}
      />
    </div>
  );
}

export default GuestUserParticipantsDetails;
