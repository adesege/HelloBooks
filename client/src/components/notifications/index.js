import React from 'react';
import LeftSidebar from './sidebar/Left';
import user from '../../assets/images/user.png';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class Notifications extends React.Component {
  render() {
    return (
      <div>
        <h4 className="title mb-2 mr-4">Notifications</h4>
        <div className="mb-4"><small>You can view all your notifications here</small></div>
        <div className="row">
          <LeftSidebar />
          <div className="col-sm-8 col-md-8 col-lg-9">
            { [...Array(12)].map((val, index) => (
              <div className="row mb-3 bordered p-2 mx-auto">
                <div className="col-sm-2 col-4 col-md-4 text-center px-0 col-lg-2"><img className="rounded-circle img-thumbnail w-100" alt="" src={user} style={{ borderRadius: '50px' }}/>
                  <p className="small font-weight-bold mb-1">User's name</p>
                  <p className="small">
                    <i className='fa fa-calendar'></i>
              Feb 14th, 2017
                  </p>
                </div>
                <div className="col-sm-10 col-8 col-md-8 col-lg-10 pr-0">
                  <p className="title font-weight-bold mb-1">A very good notification title <span className="text-success mx-3 small">read</span><span className="text-warning small">unread</span></p>
                  <p className="small mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <div className="p-2 text-center text-lg-left">
                    <button className="btn btn-sm btn-success mr-2 mb-2" type="button" data-toggle="tooltip" title="Returned book"><i className='fa fa-check'></i> <span className="hidden-xs-down">returned</span></button>
                    <button className="btn btn-sm btn-info mr-2 mb-2" type="button" data-toggle="tooltip" title="Borrowed book"><i className='fa fa-info'></i> <span className="hidden-xs-down">borrowed</span></button>
                    <button className="btn btn-sm btn-warning mr-2 mb-2" type="button" data-toggle="tooltip" title="User has been surcharged"><i className='fa fa-check'></i> <span className="hidden-xs-down">surcharged</span></button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-primary bg-light btn-block mb-3">See more</button>
          </div>
        </div>
      </div>
    );
  }
}
