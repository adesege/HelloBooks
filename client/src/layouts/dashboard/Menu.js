import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import InputField from '../../components/form/InputField';
import Button from '../../components/form/Button';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class Menu extends React.Component {
  componentDidMount() {
    const notiHolder = $('#notificationHolder');
    $('body').on('mouseenter', '#notificationInfo', (e) => {
      notiHolder.show();
    });

    $('body').on('click', (e) => {
      notiHolder.hide();
    });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.context.router.push('/');
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { group } = this.props.auth.user;
    return (
      <nav
        className="navbar navbar-light fixed-top justify-content-start bg-faded"
        id="topNav">
        <div
          className="navbar-collapse text-center"
          id="navbarNav">
          <button
            className="navbar-toggler navbar-toggler-left p-0 align-items-center"
            type="button"
            data-toggle="collapse"
            data-target="#sidebar"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <button
            type="button"
            className="btn mr-sm-2 btn-sm btn-danger navbar-toggler-right"
            onClick={this.logout.bind(this)}>
            <i className="fa fa-power-off"></i>
          </button>
          <div
            className="d-inline-block dropdown">
            <a
              className="btn btn-sm btn-info dropdown-toggle"
              data-toggle="dropdown"
              href="/notifications"
              id="notificationInfo">
              <i className="fa fa-envelope-open"></i>
              <i className="badge badge-danger">3</i>
            </a>
            <div
              className="list-group dropdown-menu"
              id="notificationHolder">
              { [...Array(3)].map((val, index) => (
                <a
                  href="#top"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                  key={index + 1}>
                  <div
                    className="d-flex w-100 justify-content-between">
                    <h5
                      className="mb-1">Notification {index + 2}
                    </h5>
                    <small>{index} days ago</small>
                  </div>
                  <p
                    className="mb-1 small">
                  Donec id elit non mi porta gravida at eget metus.
                  </p>
                </a>
              ))}
            </div>
          </div>
          {(isAuthenticated && group === 'admin') &&
          <button
            type="button"
            className="btn mr-sm-2 btn-sm btn-primary">
            <i className="fa fa-cog"></i>
          </button>
          }
          <button
            type="button"
            className="btn mr-sm-2 btn-sm btn-outline-info">
            <i className="fa fa-user"></i>
          </button>
          <form
            className="form-inline hidden-sm-down d-inline-flex">
            <InputField
              type="text"
              className="form-control form-control-sm"
              placeholder="Search here"
              aria-describedby="basic-addon1"
              containerClass="mb-0"
            />
            <Button
              className="btn-sm btn-default"
              id="basic-addon1"
              icon="search" />
          </form>
        </div>
      </nav>
    );
  }
}

Menu.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};
Menu.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, { logout })(Menu);
