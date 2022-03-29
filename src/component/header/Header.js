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

const openPage=(name)=>{
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
      <SiteMenuItem path="/about" name="About"/>
      <SiteMenuItem path="/product" name="Products"/>
      <SiteMenuItem path="/package" name="Packages"/>
      <SiteMenuItem path="/contact" name="Contact"/>
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