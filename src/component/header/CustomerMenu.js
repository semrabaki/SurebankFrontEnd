import React from 'react'

import { Link } from 'react-router-dom'
import { DropdownItem } from 'reactstrap'
import { NavDropdown } from './MenuComponent'
const CustomerMenu = () => {
  return (
    <NavDropdown
      //icon="th-list"
       /// id="entity-menu"
      name="Actions (Customer)"
      style={{maxHeight:"80vh", overflow:"auto"}}
>

      <DropdownItem
       tag={Link}
       to="/dashboard" 
      >
       Dashboard
      </DropdownItem>


      <DropdownItem
       tag={Link}
       to="/recipient" 
      >
       Recipients
      </DropdownItem>

      <DropdownItem
       tag={Link}
       to="/deposit" 
      >
       Deposit
      </DropdownItem>

      <DropdownItem
       tag={Link}
       to="/withdraw" 
      >
       WithDraw
      </DropdownItem>

      <DropdownItem
       tag={Link}
       to="/transfer" 
      >
       Transfer
      </DropdownItem>


      <DropdownItem
       tag={Link}
       to="/transactions" 
      >
       Transactions
      </DropdownItem>

    </NavDropdown>
  )
}

export default CustomerMenu