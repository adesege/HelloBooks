import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Collapse, Nav, NavItem, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import classnames from 'classnames';
import NotificationList from './NotificationsList';

const NavigationLinks = ({
  isAuthenticated,
  group,
  isOpen,
  isDropdownOpen,
  toggleDropdown,
  isNotificationDropdownOpen,
  toggleNotificationDropdown,
  logout,
  menuNotifications,
  isNewNotification
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
            <Link className="dropdown-item" to="/books">
              <i className="fa fa-book" /> Books
            </Link>
            {(isAuthenticated && group === 'admin') && (
              <div>
                <DropdownItem header>Books Categories</DropdownItem>
                <Link className="dropdown-item" to="/books/categories">
                  <i className="fa fa-th-list" /> Books Categories
                </Link>
                <DropdownItem divider />
                <Link className="dropdown-item" to="/books/stock-manager">
                  <i className="fa fa-archive" /> Stock Manager
                </Link>
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
      {(isAuthenticated && group === 'admin') && (
        <NavItem>
          <Dropdown isOpen={isNotificationDropdownOpen} toggle={toggleNotificationDropdown}
            id="notifications"
          >
            <DropdownToggle className={classnames("nav-link", { "text-danger": isNewNotification })} tag="a" caret>
              <i className="fa fa-bell" /> Notifications
            </DropdownToggle>
            <DropdownMenu className="pb-0">
              <NotificationList
                notifications={menuNotifications}
                isPagination={false}
              />
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      )}
    </Nav>
    <Nav className="ml-auto mt-sm-0" navbar>
      <NavItem>
        <Link className="nav-link text-danger" onClick={logout} to="#">
          <i className="fa fa-power-off" />
          <span className="d-md-none"> Logout</span>
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
  logout: PropTypes.func.isRequired,
  toggleNotificationDropdown: PropTypes.func.isRequired,
  isNotificationDropdownOpen: PropTypes.bool.isRequired,
  isNewNotification: PropTypes.bool.isRequired,
  menuNotifications: PropTypes.array.isRequired
};
export default NavigationLinks;
