import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../form/InputField';
import Button from '../../form/Button';
import '../../../assets/js/layouts/dashboard/notification';


const Menu = ({ isAuthenticated, group, logout }) => (
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
        <span className="navbar-toggler-icon" />
      </button>
      <button
        type="button"
        className="btn mr-sm-2 btn-sm btn-danger navbar-toggler-right"
        onClick={logout}>
        <i className="fa fa-power-off" />
      </button>
      <div
        className="d-inline-block dropdown">
        <a
          className="btn btn-sm btn-info dropdown-toggle"
          data-toggle="dropdown"
          href="/notifications"
          id="notificationInfo">
          <i className="fa fa-envelope-open" />
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
            <i className="fa fa-cog" />
          </button>
      }
      <button
        type="button"
        className="btn mr-sm-2 btn-sm btn-outline-info">
        <i className="fa fa-user" />
      </button>
      <form
        className="form-inline hidden-sm-down d-inline-flex">
        <InputField
          type="text"
          className="form-control form-control-sm"
          placeholder="Search here"
          aria-describedby="basic-addon1"
          containerClass="mb-0"
          name="search"
        />
        <Button
          className="btn-sm btn-default"
          id="basic-addon1"
          icon="search" />
      </form>
    </div>
  </nav>
);

Menu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  group: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Menu;
