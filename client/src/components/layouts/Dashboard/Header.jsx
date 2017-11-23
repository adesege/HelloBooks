import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';
import { ioJoin } from 'assets/js/socket';
import Menu from './Menu';

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
   * @returns {undefined}
   * @memberof Header
   */
  componentDidMount() {
    const { user } = this.props;
    if (user && user.group === 'admin') {
      ioJoin();
    }
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
      user
    } = this.props;
    return (
      <div className="">
        <Menu
          isAuthenticated={isAuthenticated}
          group={user.group}
          logout={this.logout}
        />
        { children }
      </div>
    );
  }
}

Header.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logoutAction: logout }
)(Header);
