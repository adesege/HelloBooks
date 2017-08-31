import React from 'react';
import { Link } from 'react-router';
import ResetPasswordForm from './ResetPasswordForm';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default () => (
  <div>
    <div className="row">
      <div className="text-desc text-center col-sm-10 offset-sm-1">
        <p className="mb-3">Having trouble signing in to your account? Provide the email address you used to register and we will send you a password reset link</p></div>
    </div>{ /* row */ }
    <div className="card-body mx-4">
      <ResetPasswordForm />
    </div>

    <div className="modal-footer mx-sm-4 mx-3 mb-1 mt-3 d-block text-right px-0">
      <p className="font-small grey-text">
        <Link to="/signup">I don't have an account</Link>
      </p>
      <p className="font-small grey-text">
        <Link to="/">I remember my password</Link>
      </p>
    </div>

  </div>
);
