import 'assets/scss/layouts/dashboard/navbar.scss';
import logo from 'assets/images/logo.png';
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import NavigationLinks from './NavigationLinks';

/**
 * @class Menu
 * @extends {React.Component}
 */
class Menu extends React.Component {
  /**
   * Creates an instance of Menu.
   * @param {any} props
   * @memberof Menu
   */
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isDropdownOpen: false
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  /**
   * @returns {void}
   * @memberof Menu
   */
  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  /**
   * @returns {void}
   * @memberof Menu
   */
  toggleDropdown() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  }

  /**
   * @returns {object} JSX
   * @memberof Menu
   */
  render() {
    const { isAuthenticated, group, logout } = this.props;
    return (
      <Navbar color="faded" light expand="md" className="dashboard-navbar fixed-top bg-light">
        <NavbarBrand href="/">
          <img src={logo} className="img img-fluid" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <NavigationLinks
          isOpen = {this.state.isOpen}
          isAuthenticated = {isAuthenticated}
          group = {group}
          logout = {logout}
          isDropdownOpen = {this.state.isDropdownOpen}
          toggleDropdown = {this.toggleDropdown}
        />
      </Navbar>
    );
  }
}

Menu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  group: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Menu;
