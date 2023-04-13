import React from "react";
import { Container } from "react-bootstrap";
import ParticipantFormNew from "../../Components/Card/ParticipantForm/ParticipantFormNew";

const EditParticipantsNew = () => {
  return (
    <Container>
      <ParticipantFormNew
        title={"Edit Participant organisation details"}
        isEditModeOn={true}
      />
    </Container>
  );
};

export default EditParticipantsNew;
