import React from 'react';
import { Link } from 'react-router';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default () => (
  <div>
    <div className="row">
      <div className="text-desc text-center col-sm-10 offset-sm-1">
        <p className="mb-3">Having trouble signing in to your account? Provide the email address you used to register and we will send you a password reset link</p></div>
    </div>{ /* row */ }
    <form action="/login" method="post" className="row">
      <div className="col-sm-10 offset-sm-1">
        <div className="form-group">
          <label className="sr-only" htmlFor="inlineFormInputGroup">Email address</label>
          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <div className="input-group-addon"><i className="fa fa-envelope"></i></div>
            <input type="email" className="form-control" placeholder="Your Email address"/>
          </div>
        </div> { /* form-group */ }
        <div className="form-group text-center">
          <button type="submit" className="btn btn-danger btn-block" name="button">Send me the link</button>
        </div>
      </div>
    </form>
    <div className="row justify-content-center text-center mb-5">
      <div className="col-sm-4">
        <Link to="/signup">I don't have an account</Link>
      </div>
      <div className="col-sm-4">
        <Link to="/">I remember my password</Link>
      </div>
    </div>
  </div>
);
