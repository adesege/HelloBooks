import 'assets/scss/layouts/dashboard/navbar.scss';
import logo from 'assets/images/logo.png';
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import { ioNewNotifications } from 'assets/js/socket';
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
      isDropdownOpen: false,
      isNotificationDropdownOpen: false,
      menuNotifications: [],
      isNewNotification: false
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNotificationDropdown = this.toggleNotificationDropdown.bind(this);
    this.onNewNotifications = this.onNewNotifications.bind(this);
  }

  /**
   * @returns {undefined}
   * @memberof Menu
   */
  componentDidMount() {
    if (this.props.group === 'admin') {
      this.onNewNotifications();
    }
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
   * @returns {void}
   * @memberof Menu
   */
  toggleNotificationDropdown() {
    this.setState({
      isNotificationDropdownOpen: !this.state.isNotificationDropdownOpen
    }, () => {
      if (this.state.isNotificationDropdownOpen) {
        this.setState({
          isNewNotification: false
        });
      }
    });
  }

  /**
   * @returns {undefined}
   * @memberof Menu
   */
  onNewNotifications() {
    ioNewNotifications((error, data) => {
      if (!error) {
        const { menuNotifications } = this.state;
        const notification = data.notifications.concat(menuNotifications).slice(0, 5);
        this.setState({
          menuNotifications: notification,
          isNewNotification: !!data.isNew
        });
      }
    });
  }

  /**
   * @returns {object} JSX
   * @memberof Menu
   */
  render() {
    const {
      isAuthenticated,
      group,
      logout
    } = this.props;
    return (
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
          onClick={this.toggleNavbar} />
        <NavigationLinks
          isOpen = {this.state.isOpen}
          isAuthenticated = {isAuthenticated}
          group = {group}
          logout = {logout}
          isDropdownOpen = {this.state.isDropdownOpen}
          toggleDropdown = {this.toggleDropdown}
          isNotificationDropdownOpen = {this.state.isNotificationDropdownOpen}
          toggleNotificationDropdown = {this.toggleNotificationDropdown}
          menuNotifications={this.state.menuNotifications}
          isNewNotification={this.state.isNewNotification}
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
