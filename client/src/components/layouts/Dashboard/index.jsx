import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';
import { ioJoin, ioNewNotifications } from 'assets/js/socket';
import removeBookBg from 'assets/js/removeBookBg';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const propTypes = {
  children: PropTypes.node,
  auth: PropTypes.object.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Dashboard component
 *
 * @class Dashboard
 *
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
  /**
   * Creates an instance of Dashboard.
   *
   * @param {object} props
   *
   * @memberof Dashboard
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

    this.logout = this.logout.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNotificationDropdown = this.toggleNotificationDropdown
      .bind(this);
    this.onNewNotifications = this.onNewNotifications.bind(this);
  }

  /**
   * Lifecycle method invoked when component mounts
   *
   * @returns {undefined}
   *
   * @memberof Dashboard
  */
  componentDidMount() {
    removeBookBg();
    const { user } = this.props.auth;
    if (user && user.group === 'admin') {
      ioJoin();
      this.onNewNotifications();
    }
  }
  /**
   * Logout method
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof Dashboard
  */
  logout(event) {
    event.preventDefault();
    this.props.logoutAction();
    this.context.router.push('/');
  }

  /**
   * Toggle navbar visibility
   *
   * @returns {undefined}
   *
   * @memberof Menu
  */
  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  /**
   * Toggle books dropdown
   *
   * @returns {undefined}
   *
   * @memberof Dashboard
   */
  toggleDropdown() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  }

  /**
   * Toggle notification dropdown
   *
   * @returns {undefined}
   *
   * @memberof Dashboard
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
   * Set state when there is a new notification
   *
   * @returns {undefined}
   *
   * @memberof Dashboard
  */
  onNewNotifications() {
    ioNewNotifications((error, data) => {
      if (!error) {
        const { menuNotifications } = this.state;
        const notification = data.notifications
          .concat(menuNotifications).slice(0, 5);
        this.setState({
          menuNotifications: notification,
          isNewNotification: !!data.isNew
        });
      }
    });
  }

  /**
   * Renders component
   *
   * @returns  {JSX} JSX
   *
   * @memberof Dashboard
  */
  render() {
    return (
      <div>
        <Header
          auth={{ ...this.props.auth }}
          logout={this.logout}
          navigationLinks={{
            ...this.state,
            toggleDropdown: this.toggleDropdown,
            toggleNotificationDropdown: this.toggleNotificationDropdown,
            toggleNavbar: this.toggleNavbar
          }}
        />
        <Content>
          {this.props.children}
        </Content>
        <Footer/>
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;
Dashboard.contextTypes = contextTypes;

/**
 * Get state from store
 *
 * @param {object} state
 *
 * @returns {object} map state to props
 */
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutAction: logout }
)(Dashboard);
