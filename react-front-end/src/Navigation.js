import React, { Component } from 'react'
import {Nav, Navbar, NavLink, NavbarBrand, NavItem} from 'reactstrap'


class Navigation extends Component {
    state = {}
    render() {
      
        return(
            <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Expense Tracker</NavbarBrand>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink href="/home">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/categories">Categories</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/expenses">Expenses</NavLink>
                  </NavItem>
                </Nav>
            </Navbar>
          </div>
        );
    }
}

export default Navigation;