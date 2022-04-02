import React from 'react'
import  {UncontrolledDropdown, DropdownToggle,DropdownMenu} from 'reactstrap'

export const NavDropdown=props=>(

    // it is goginto show this menu in the navigation bar that is why we add inNavbar
    <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret className="d-flex align-items-center">
           <span>{props.name}</span>   
         </DropdownToggle> 
         <DropdownMenu right style={props.style}>

             {props.children}
         </DropdownMenu>

    </UncontrolledDropdown>
     
);