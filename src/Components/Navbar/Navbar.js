import React, { useState } from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import labels from '../../Constants/labels';
const Navbar = () => {
  const [screenlabels, setscreenlabels] = useState(labels['en']);
  return (
    <>
      <Nav>
        {/* <Bars /> */}
        <img
          src={require('../../Assets/Img/farmstack.jpg')}
          alt="new"
          style={{ width: '150px', height: '24px', 'margin-top': '15px' }}
        />
        <NavMenu>
          <NavLink to='/datahub/participants' activeStyle>
            <img
              src={require('../../Assets/Img/bold_participants.svg')}
              alt="new"
            />&nbsp;&nbsp;{screenlabels.navbar.Participants}
          </NavLink>
          <NavLink to='/Participant' activeStyle>
            <img
              src={require('../../Assets/Img/network.svg')}
              alt="new"
            />&nbsp;&nbsp;{screenlabels.navbar.NetworkActivity}
          </NavLink>
          <NavLink to='/Participnts' activeStyle>
            <img
              src={require('../../Assets/Img/support.svg')}
              alt="new"
            />&nbsp;&nbsp;{screenlabels.navbar.Support}
          </NavLink>
          <NavLink to='/Paricipants' activeStyle>
            <img
              src={require('../../Assets/Img/settings.svg')}
              alt="new"
            />&nbsp;&nbsp;{screenlabels.navbar.Settings}
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'> <img
            src={require('../../Assets/Img/account.svg')}
            alt="new"
          />&nbsp;&nbsp;{screenlabels.navbar.Signout}</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
