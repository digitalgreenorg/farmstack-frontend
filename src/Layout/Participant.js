import React, { useState, useEffect } from "react";
import ParticipantNavbar from "../Components/Navbar/ParticipantNavbar";
import Home from "../Views/Role/Participant/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import { getTokenLocal,isLoggedInUserParticipant } from "../Utils/Common";
import AddDataSetParticipant from "../Views/Role/Participant/Dataset/AddDataSetParticipant";
import EditDatasetParticipant from "../Views/Role/Participant/Dataset/EditDatasetParticipant";
import DatasetParticipant from "../Views/Dataset/DatasetParticipant/DatasetParticipant";
import Participantsettings from "../Views/Settings/ParticipantSettings/Participantsettings";

function Participant(props) {
  return (
    <>
      {(getTokenLocal() && isLoggedInUserParticipant())? (
        <>
          <ParticipantNavbar />
          <Switch>
            <Route exact path="/participant/datasets" component={DatasetParticipant} />
            <Route exact path="/participant/home" component={Home} />
            <Route
              exact
              path="/participant/datasets/add"
              component={AddDataSetParticipant}
            />
            <Route
              exact
              path="/participant/datasets/edit/:id"
              component={EditDatasetParticipant}
            />
            <Route exact path="/participant/settings/:id" component={Participantsettings} />
          </Switch>
        </>
      ) : (
        props.history.push("/login")
      )}
    </>
  );
}
export default Participant;
