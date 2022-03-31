import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import "./header.css"
import {Navbar,NavbarBrand,NavbarToggler,
    Collapse,Nav,NavItem, NavLink,NavbarText
} from 'reactstrap'
import { useState } from 'react'
import { SiteMenuItem } from './SiteMenuItem'

const Header = () => {

  const[menuOpen,setMenuOpen]=useState(false);

const toggleMenu=()=>{
   
  setMenuOpen(!menuOpen);
}
// this function is for going to specific part of the page when it is clicked on the menu
const openPage=(name)=>{
  // debugger;
  const element=document.getElementById(name);
  if(element){
    element.scrollIntoView({behavior:"smooth"});
  }
}

  return (
    <div>
  <Navbar
    light
    expand="lg"
  >
  {/* you can add logo or other special thong in navbar brand */}
    <NavbarBrand tag={Link} to="/">
      <img src={logo} style={{width:200}}/>
    </NavbarBrand>
    <NavbarToggler onClick={toggleMenu}/>
    <Collapse isOpen={menuOpen} navbar>
      <Nav
        className="me-auto"
        navbar
      >
      <SiteMenuItem open={openPage} path="/about" name="About"/>
      <SiteMenuItem open={openPage} path="/product" name="Products"/>
      <SiteMenuItem open={openPage} path="/package" name="Packages"/>
      <SiteMenuItem open={openPage} path="/contact" name="Contact"/>

      <NavbarText>
        <NavLink tag={Link} to="/register">Register</NavLink>
        <NavLink tag={Link} to="/login">Login</NavLink>
      </NavbarText>
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