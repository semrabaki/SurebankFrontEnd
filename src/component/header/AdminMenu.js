import React from 'react'
import { Link } from 'react-router-dom'
import { DropdownItem } from 'reactstrap'
import { NavDropdown } from './MenuComponent'

const AdminMenu = () => {
  return (
    //   we created this for putting the menu item
    <NavDropdown
      //icon="th-list"
        //id="entity-menu"
      name="Actions (Admin)"
      style={{maxHeight:"80vh", overflow:"auto"}}
>

<DropdownItem
//   link is coming from react routet dom
       tag={Link}
       to="/admin-dashboard" 
      >
       Dashboard
      </DropdownItem>


      <DropdownItem
       tag={Link}
       to="/alltransactions"
       state={{isAdmin:true}} 
      >
       Transaction Query
      </DropdownItem>

      

      <DropdownItem
       tag={Link}
       to="/user-management" 
      >
       User Management
      </DropdownItem>
      
   
      <DropdownItem tag={Link} to="/messages">
        Messages
      </DropdownItem>
    </NavDropdown>


    


  )
}

export default AdminMenu