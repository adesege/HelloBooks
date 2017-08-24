import React from 'react';
import $ from 'jquery';
import logoIcon from '../../assets/images/logo-icon.png';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class Navigation extends React.Component {
  componentDidMount() {
    const notiHolder = $('#notificationHolder');
    $('body').on('mouseenter', '#notificationInfo', (e) => {
      notiHolder.show();
    });

    $('body').on('click', (e) => {
      notiHolder.hide();
    });
  }
  render() {
    return (
      <nav className="navbar navbar-light fixed-top justify-content-start bg-faded" id="topNav">
        <div className="navbar-collapse text-center" id="navbarNav">
          <button className="navbar-toggler navbar-toggler-left p-0 align-items-center" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand mr-0 navbar-toggler-right" href="#top">
            <span className="hidden-md-down mr-3">Hello-Books</span>
            <img src={logoIcon} style={{ width: '30px', height: '30px' }} className="d-inline-block align-top" alt=""/>
          </a>
          <div className="d-inline-block dropdown">
            <a className="btn mr-sm-2 btn-sm btn-info dropdown-toggle" data-toggle="dropdown" href="/notifications" id="notificationInfo">
              <i className="fa fa-envelope-open"></i>
              <i className="badge badge-danger">3</i>
            </a>
            <div className="list-group dropdown-menu" id="notificationHolder">
              { [...Array(3)].map((val, index) => (
                <a href="#top" className="list-group-item list-group-item-action flex-column align-items-start" key={index + 1}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Notification {index + 2}</h5>
                    <small>{index} days ago</small>
                  </div>
                  <p className="mb-1 small">Donec id elit non mi porta gravida at eget metus.</p>
                </a>
              ))}
            </div>
          </div>
          <button type="button" className="btn mr-sm-2 btn-sm btn-primary"><i className="fa fa-cog"></i></button>
          <button type="button" className="btn mr-sm-2 btn-sm btn-outline-info"><i className="fa fa-user"></i></button>
          <button type="button" className="btn mr-sm-2 btn-sm btn-danger"><i className="fa fa-power-off"></i></button>
          <form className="form-inline hidden-sm-down d-inline-flex">
            <div className="input-group">
              <input type="text" className="form-control form-control-sm" placeholder="Search here" aria-describedby="basic-addon1"/>
              <button className="input-group-addon input-group-sm" id="basic-addon1"><i className="fa fa-search"></i></button>
            </div>
          </form>
        </div>
      </nav>
    );
  }
}
