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

import {Link} from 'react-router-dom';

const NavBar = (props) => {
  const [isOpen, toggle] = useState(false);
  const { user } = props;
  return (<div>
    <Navbar color="success" light expand="md">
      <NavbarBrand className="white" href="/">Work Tenders</NavbarBrand>
      <NavbarToggler onClick={() => toggle(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link className='nav-link white' to="/Register">Register</Link>
          </NavItem>
          <NavItem>
            <Link className='nav-link white' to="/about">About</Link>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            {/* <DropdownToggle nav caret>
                  Options
                </DropdownToggle> */}
            {/* <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu> */}
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  </div>)
}

export default NavBar;