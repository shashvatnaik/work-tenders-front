import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

import defaultImage from '../images/user-default.png';

const NavBar = (props) => {
  const [isOpen, toggle] = useState(false);
  const { user } = props;
  return (<div>
    <Navbar color="success" light expand="md">
      <NavbarBrand className="white" href="/">Work Tenders</NavbarBrand>
      <NavbarToggler onClick={() => toggle(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {user && user.type ?
            <React.Fragment>
              <img className="profile cursorPointer" alt={user && user.email ? user.email : 'no data'} src={user.profileUrl || defaultImage} />
            </React.Fragment> :
            <React.Fragment>
              <NavItem>
                <Link className='nav-link white' to="/Register">Register</Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link white' to="/about">About</Link>
              </NavItem></React.Fragment>
          }
        </Nav>
      </Collapse>
    </Navbar>
  </div>)
}

export default NavBar;