import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Collapse, Nav, NavItem, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

const NavigationLinks = ({
  isAuthenticated,
  group,
  isOpen,
  isDropdownOpen,
  toggleDropdown,
  logout
}) => (
  <Collapse isOpen={isOpen} navbar>
    <Nav className="mt-3 mt-sm-0" navbar>
      <NavItem>
        <Link className="nav-link" to="/dashboard">
          <i className="fa fa-th-large" /> Dashboard
        </Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/books/histories">
          <i className="fa fa-bookmark" /> History
        </Link>
      </NavItem>
      <NavItem>
        <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle className="nav-link" tag="a" caret>
            <i className="fa fa-bars" /> Books
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Books</DropdownItem>
            <DropdownItem tag="a" href="/books">
              <i className="fa fa-book" /> Books
            </DropdownItem>
            {(isAuthenticated && group === 'admin') && (
              <div>
                <DropdownItem header>Books Categories</DropdownItem>
                <DropdownItem tag="a" href="/books/categories">
                  <i className="fa fa-th-list" /> Books Categories
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag="a" href="/books/stock-manager">
                  <i className="fa fa-archive" /> Stock Manager
                </DropdownItem>
              </div>)
            }
          </DropdownMenu>
        </Dropdown>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/me">
          <i className="fa fa-user" /> Profile
        </Link>
      </NavItem>
    </Nav>
    <Nav className="ml-auto mt-3 mt-sm-0" navbar>
      <NavItem>
        <Link className="nav-link text-danger btn" onClick={logout} to="#">
          <i className="fa fa-power-off" />
        </Link>
      </NavItem>
    </Nav>
  </Collapse>
);

NavigationLinks.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  group: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
export default NavigationLinks;
