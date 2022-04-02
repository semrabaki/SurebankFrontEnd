import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import "./header.css"
import {Navbar,NavbarBrand,NavbarToggler,
    Collapse,Nav,NavItem, NavLink,NavbarText
} from 'reactstrap'
import { useState } from 'react'
import { SiteMenuItem } from './SiteMenuItem'
import AdminMenu from './AdminMenu'
import CustomerMenu from './CustomerMenu'
import { useContext } from 'react'
import { StateContext } from '../../App'

const Header = () => {

  const[menuOpen,setMenuOpen]=useState(false);

 // I want to pass data from the Header.js to other compoenets so I created state obejct
  const state= useContext(StateContext); //I want to get data from state so I use useContext hook we give sttae context that we created in app.js


 // we got the user infor with state from log in above and we are getiing the user role below
 let isCustomer;
 let isAdmin;

 if(state&&state.userInfo){
   isCustomer=hasAnyRole(state.userInfo.roles,["Costumer"]);
   isAdmin=hasAnyRole(state.userInfo.roles,["Admin"]);


 }
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

      {isAdmin?<AdminMenu/>:null}
      {isCustomer?<CustomerMenu/>:null}

</Nav>

      <NavbarText>
        <NavLink tag={Link} to="/register">Register</NavLink>
        <NavLink tag={Link} to="/login">Login</NavLink>
      </NavbarText>
    </Collapse>
  </Navbar>
</div>
  )
}

export default Header