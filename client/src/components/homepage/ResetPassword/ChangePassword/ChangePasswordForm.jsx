import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../form/InputField';
import Button from '../../../form/Button';

const propTypes = {
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

/**
 * Change password form component
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const ChangePasswordForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div
      className="alert alert-success bg-white my-5">
    Reset your password below
    </div>
    <InputField
      type="text"
      label="Email"
      name="email"
      value={props.user.email}
      icon="user"
      disabled
    />
    <InputField
      type="password"
      label="New password"
      name="password"
      value={props.user.password}
      onChange={props.onChange}
      icon="key"
    />
    {props.errors.password &&
      <p className="form-text text-danger">
        {props.errors.password}
      </p> }

    <InputField
      type="password"
      label="Confirm password"
      name="confirmPassword"
      value={props.user.confirmPassword}
      onChange={props.onChange}
      icon="key"
    />
    {props.errors.confirmPassword &&
      <p className="form-text text-danger">
        {props.errors.confirmPassword}
      </p> }

    <Button
      disabled={props.isLoading}
      className="btn-danger btn-block"
      name="ResetPassword"
      label = "Change my password"
    />
  </form>
);

ChangePasswordForm.propTypes = propTypes;

export default ChangePasswordForm;
