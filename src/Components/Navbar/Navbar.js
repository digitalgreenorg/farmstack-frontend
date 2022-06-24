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
import LocalStorageConstants from '../../Constants/LocalStorageConstants'
const Navbar = (props) => {
  const [screenlabels, setscreenlabels] = useState(labels['en']);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem(LocalStorageConstants.KEYS.JWTToken);
    props.history.push('/login');
  }
  return (
    <>
      <Nav id="datahubnavbar">
        {/* <Bars /> */}
        <img
          src={require('../../Assets/Img/farmstack.jpg')}
          alt="new"
          style={{ width: '150px', height: '24px', 'margin-top': '15px' }}
        />
        <NavMenu>
          <NavLink to='/datahub/participants' activeStyle>
            <img className="boldimage"
              src={require('../../Assets/Img/bold_participants.svg')}
              alt="new"
            />
            <img className="nonboldimage"
              src={require('../../Assets/Img/participants.svg')}
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
          <NavLink to='/datahub/settings' activeStyle>
            <img className="boldimage"
              src={require('../../Assets/Img/bold_settings.svg')}
              alt="new"
            />
            <img className="nonboldimage"
              src={require('../../Assets/Img/settings.svg')}
              alt="new"
            />&nbsp;&nbsp;{screenlabels.navbar.Settings}
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn onClick={handleLogout}>
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
