import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from "@mui/material/Button";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';
import Participants from '../Views/Participants/Participants'
import AddParticipants from '../Views/Participants/AddParticipants'
import EditParticipants from '../Views/Participants/EditParticipants'
import ViewParticipants from '../Views/Participants/ViewParticipants'
import InviteParticipants from '../Views/Participants/InviteParticipants'
function Datahub(props) {
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path="/datahub/participants/view/:id" component={ViewParticipants} />
                <Route exact path="/datahub/participants/edit/:id" component={EditParticipants} />
                <Route exact path="/datahub/participants/add" component={AddParticipants} />
                <Route exact path="/datahub/participants/invite" component={InviteParticipants} />
                <Route exact path="/datahub/participants" component={Participants} />
            </Switch>
        </>
    );
}
export default Datahub;
