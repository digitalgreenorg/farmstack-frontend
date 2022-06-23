import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar'
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
import AddTeamMember from '../Views/Settings/TeamMembers/AddTeamMember'
import EditTeamMember from '../Views/Settings/TeamMembers/EditTeamMember'
import Settings from '../Views/Settings/Settings/Settings'
import { useParams,useHistory } from 'react-router-dom';
function Datahub(props) {
    const [activePage, setactivePage] = useState("");
    useEffect(() => {
        let urlList=props.location.pathname.split("\/")
        if(urlList.length>2){
            setactivePage(urlList[2]) 
        console.log("urlList",urlList[2])
        }
    }, []);
    return (
        <>
            <Navbar activePage={activePage}/>
            <Switch>
                <Route exact path="/datahub/participants/view/:id" component={ViewParticipants} />
                <Route exact path="/datahub/participants/edit/:id" component={EditParticipants} />
                <Route exact path="/datahub/participants/add" component={AddParticipants} />
                <Route exact path="/datahub/participants/invite" component={InviteParticipants} />
                <Route exact path="/datahub/participants" component={Participants} />
                <Route exact path="/datahub/settings/addmember" component={AddTeamMember} />
                <Route exact path="/datahub/settings/editmember/:id" component={EditTeamMember} />
                <Route exact path="/datahub/settings" component={Settings} />

            </Switch>
        </>
    );
}
export default Datahub;
