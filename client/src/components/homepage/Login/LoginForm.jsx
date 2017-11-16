import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FlashMessagesList from '../../flash/FlashMessagesList';
import InputField from '../../form/InputField';
import Button from '../../form/Button';


const LoginForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <FlashMessagesList />
    <InputField
      type="email"
      label="Email address"
      name="email"
      value={props.user.email}
      onChange={props.onChange}
      icon="user"
    />
    {props.validationError.email &&
      <p className="form-text text-danger">
        {props.validationError.email}
      </p>
    }

    <InputField
      type="password"
      label="Password"
      name="password"
      onChange={props.onChange}
      icon="lock"
    >
      {props.validationError.password &&
      <p className="form-text text-danger">
        {props.validationError.password}
      </p>
      }
      <p
        className="font-small d-flex justify-content-end">
        Forgot
        <Link
          to="/reset-password"
          className="blue-text ml-1">
        Password?
        </Link>
      </p>
    </InputField>

    <Button
      disabled={props.isLoading}
      className="btn-success btn-block"
      name="Login"
      label = "Login"
      id="login"
    />
  </form>
);

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  validationError: PropTypes.object.isRequired
};

export default LoginForm;
