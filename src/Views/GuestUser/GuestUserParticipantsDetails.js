import React from "react";
import { Container, Row } from "react-bootstrap";
import ParticipantAndCoStewardDetailsNew from "../ParticipantCoSteward/ParticipantAndCoStewardDetailsNew";
import LocalStyle from "./GuestUserParticipantsDetails.module.css";

function GuestUserParticipantsDetails(props) {
  const { userTypeCosteward } = props;
  return (
    <div>
      <Row className={LocalStyle.titleContainer}>
        <div className={LocalStyle.title}>
          {userTypeCosteward ?? "Our participants"}
        </div>
        <div className="d-flex justify-content-center">
          <div className={LocalStyle.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
            tellus scelerisque, imperdiet augue id, accumsan dolor. Integer ac
            neque quis metus pretium tempus.
          </div>
        </div>
      </Row>
      <ParticipantAndCoStewardDetailsNew
        userTypeCosteward={userTypeCosteward}
        user="guest"
        isCosteward={userTypeCosteward ? true : false}
      />
    </div>
  );
}

export default GuestUserParticipantsDetails;
