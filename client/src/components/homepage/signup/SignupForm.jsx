import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FlashMessagesList from '../../flash/FlashMessagesList';
import InputField from '../../form/InputField';
import Button from '../../form/Button';


const SignupForm = (props) => (
  <form onSubmit={props.onSubmit} id="signupForm">
    <FlashMessagesList />
    <InputField
      label="Name"
      name="name"
      onChange={props.onChange}
      value={props.user.name}
      icon="user"
    />

    <InputField
      label="Email address"
      name="email"
      onChange={props.onChange}
      value={props.user.email}
      icon="envelope"
    />

    <InputField
      label="Password"
      type="password"
      name="password"
      onChange={props.onChange}
      icon="lock"
    />
    <InputField
      label="Password again"
      type="password"
      name="confirmPassword"
      onChange={props.onChange}
      icon="lock"
    />


    <div className="row align-items-center mb-4">
      <div className="col-md-3 col-md-6">
        <Button
          disabled={props.isLoading}
          className="btn-success btn-block z-depth-1"
          name="Signup"
          label = "Signup"
          id="signup"
        />
      </div>
      <div className="col-md-6">
        <p
          className="font-small grey-text mb-0 d-flex justify-content-end">
          <Link
            to="/"
            className="blue-text ml-1">I already have an account
          </Link>
        </p>
      </div>

    </div>
  </form>
);

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default SignupForm;
