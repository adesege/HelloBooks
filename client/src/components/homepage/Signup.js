import React from 'react';
import { Link } from 'react-router';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default () => (
  <div>
    <div className="row">
      <div className="text-desc text-center col-sm-10 offset-sm-1">
        <p className="mb-3">It takes less than 30 seconds to create an account. We just need some little details from you.</p>
      </div>
    </div>
    <form action="/dashboard" method="post" className="row">
      <div className="col-sm-10 offset-sm-1">
        <div className="form-group">
          <label className="sr-only">Name</label>
          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <div className="input-group-addon"><i className="fa fa-user"></i></div>
            <input type="text" className="form-control" placeholder="Your full name"/>
          </div>
        </div> { /* form-group */ }
        <div className="form-group">
          <label className="sr-only">Email address</label>
          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <div className="input-group-addon"><i className="fa fa-envelope"></i></div>
            <input type="email" className="form-control" placeholder="Email address"/>
          </div>
        </div> { /* form-group */ }
        <div className="form-group">
          <label className="sr-only">Password</label>
          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <div className="input-group-addon"><i className="fa fa-key"></i></div>
            <input type="password" className="form-control" placeholder="Your password"/>
          </div>
        </div> { /* form-group */ }
        <div className="form-group">
          <label className="sr-only">Confirm password</label>
          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <div className="input-group-addon"><i className="fa fa-keyboard-o"></i></div>
            <input type="password" className="form-control" placeholder="Your password again"/>
          </div>
        </div> { /* form-group */ }
        <div className="form-group text-center">
          <button type="submit" className="btn btn-success btn-block" name="button">Create my account</button>
        </div>
      </div>
    </form>
    <div className="row justify-content-center text-center mb-5">
      <div className="col-sm-6">
        <Link to="/">I already have an account</Link>
      </div>
    </div>
  </div>
);
