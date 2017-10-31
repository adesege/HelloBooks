import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from './Menu';
import Navigation from './sidebar/Navigation';
import { logout } from '../../../actions/auth';

/**
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
  /**
   * Creates an instance of Header.
   * @param {any} props
   * @memberof Header
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  /**
   * @returns {void}
   * @param {any} event
   * @memberof Header
   */
  logout(event) {
    event.preventDefault();
    this.props.logoutAction();
    this.context.router.push('/');
  }


  /**
    * @returns {object} JSX
    * @memberof Header
    */
  render() {
    const {
      children,
      isAuthenticated,
      group
    } = this.props;
    return (
      <div className="row">
        <Menu
          isAuthenticated={isAuthenticated}
          group={group}
          logout={this.logout}
        />
        <Navigation
          isAuthenticated={isAuthenticated}
          group={group}
        />
        { children }
      </div>
    );
  }
}

Header.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  group: PropTypes.string.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  group: state.auth.user.group
});

export default connect(
  mapStateToProps,
  { logoutAction: logout }
)(Header);
