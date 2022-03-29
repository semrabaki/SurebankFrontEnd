import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

import {Navbar,NavbarBrand,NavbarToggler,
    Collapse,Nav,NavItem, NavLink,NavbarText
} from 'reactstrap';

const Header = () => {
  return (
    <div>
  <Navbar
    light
    expand="lg"
  >
    <NavbarBrand tag={Link} to="/">
      <img src={logo} style={{width:200}}/>
    </NavbarBrand>
    <NavbarToggler />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>
          <NavLink href="/components/">
            Components
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/reactstrap/reactstrap">
            GitHub
          </NavLink>
        </NavItem>
      </Nav>
      <NavbarText>
        Simple Text
      </NavbarText>
    </Collapse>
  </Navbar>
</div>
  )
}

export default Header