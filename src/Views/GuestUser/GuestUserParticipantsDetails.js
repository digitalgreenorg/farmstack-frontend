import React from "react";
import { Container, Row } from "react-bootstrap";
import ParticipantAndCoStewardDetailsNew from "../ParticipantCoSteward/ParticipantAndCoStewardDetailsNew";
import LocalStyle from "./GuestUserParticipantsDetails.module.css";
import { useMediaQuery, useTheme } from "@mui/material";

function GuestUserParticipantsDetails(props) {
  const { userTypeCosteward } = props;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : "144px",
    marginRight: mobile || tablet ? "30px" : "144px",
  };
  return (
    <div style={containerStyle}>
      <Row className={LocalStyle.titleContainer}>
        <div
          className={mobile || tablet ? LocalStyle.title_sm : LocalStyle.title}
        >
          {userTypeCosteward ?? "Explore our participant"}
        </div>
        <div className="d-flex justify-content-center">
          <div
            className={
              mobile
                ? LocalStyle.description_sm
                : tablet || miniLaptop
                ? LocalStyle.description_md
                : LocalStyle.description
            }
          >
            Meet the Change Makers: Our Community Members Who Are Transforming
            Agriculture.
          </div>
        </div>
      </Row>
      <ParticipantAndCoStewardDetailsNew
        userTypeCosteward={userTypeCosteward}
        title={userTypeCosteward}
        user="guest"
        isCosteward={userTypeCosteward ? true : false}
      />
    </div>
  );
}

export default GuestUserParticipantsDetails;
