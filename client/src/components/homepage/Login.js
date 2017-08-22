import React from 'react';
import { Link } from 'react-router';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default () => (
  <div>
    <form action="/dashboard" method="get" className="row">
      <div className="col-sm-10 offset-sm-1">
        <div className="form-group">
          <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <div className="input-group-addon"><i className="fa fa-user"></i></div>
            <input type="email" className="form-control" id="inlineFormInputGroup" placeholder="Email address"/>
          </div>
        </div> { /* form-group */ }
        <div className="form-group">
          <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <div className="input-group-addon"><i className="fa fa-keyboard-o"></i></div>
            <input type="password" className="form-control" id="inlineFormInputGroup" placeholder="Password"/>
          </div>
        </div> { /* form-group */ }
        <div className="form-group text-center">
          <button type="submit" className="btn btn-success btn-block" name="button">Login</button>
        </div>
      </div>
    </form>
    <div className="row my-3">
      <div className="col-sm-12">
        <div className="row justify-content-center">
          <div className="col-sm-4 col-5">Sign in with:</div>
          <h4 className="col-sm-1 col-1 mr-1 px-0 text-primary"><i className="fa fa-facebook-official"></i></h4>
          <h4 className="col-sm-1 col-1 mr-1 px-0 text-info"><i className="fa fa-twitter"></i></h4>
          <h4 className="col-sm-1 col-1 mr-1 px-0 text-danger"><i className="fa fa-google-plus"></i></h4>
        </div>
      </div>
    </div>
    <div className="row justify-content-center text-center mb-5">
      <div className="col-sm-4">
        <Link to="/signup">Create an account</Link>
      </div>
      <div className="col-sm-4">
        <Link to="/reset-password">I forgot my password</Link>
      </div>
    </div>
  </div>
);
