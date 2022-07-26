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
import { getTokenLocal } from "../Utils/Common";
import AddDataSetParticipant from "../Views/Role/Participant/Dataset/AddDataSetParticipant";
import EditDatasetParticipant from "../Views/Role/Participant/Dataset/EditDatasetParticipant";

function Datahub(props) {
  return (
    <>
      {getTokenLocal() ? (
        <>
          <ParticipantNavbar />
          <Switch>
            <Route exact path="/participant/datasets" component={Home} />
            <Route exact path="/participant/home" component={Home} />
            <Route
              exact
              path="/participant/dataset/add"
              component={AddDataSetParticipant}
            />
            <Route
              exact
              path="/participant/dataset/edit/:id"
              component={EditDatasetParticipant}
            />
          </Switch>
        </>
      ) : (
        props.history.push("/login")
      )}
    </>
  );
}
export default Datahub;
