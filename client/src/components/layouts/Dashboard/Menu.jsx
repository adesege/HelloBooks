import 'assets/scss/layouts/dashboard/navbar.scss';
import logo from 'assets/images/logo.png';
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import NavigationLinks from './NavigationLinks';

const propTypes = {
  auth: PropTypes.object.isRequired,
  navigationLinks: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

/**
 * Menu component
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const Menu = ({
  auth,
  navigationLinks,
  logout,
}) => (
  <Navbar
    color="faded" light
    expand="md"
    className="dashboard-navbar fixed-top bg-light">
    <NavbarBrand
      href="/">
      <img src={logo}
        className="img img-fluid" />
    </NavbarBrand>
    <NavbarToggler
      onClick={navigationLinks.toggleNavbar} />
    <NavigationLinks
      {...auth}
      {...navigationLinks}
      logout={logout}
    />
  </Navbar>
);

Menu.propTypes = propTypes;

export default Menu;
