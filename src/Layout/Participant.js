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
function Datahub(props) {
  return (
    <>
      {getTokenLocal() ? (
        <>
          <ParticipantNavbar />
          <Switch>
          <Route
              exact
              path="/participant/home"
              component={Home}
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
