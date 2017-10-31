import React from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';
import InputField from '../form/InputField';

const ChangePassword = ({ onChangePasswordInput, onChangePassword }) => (

  <div
    id="changePassword"
    className="mt-4 hidden-xl-down">
    <InputField
      placeholder="Current password"
      type="password"
      icon="key"
      name="currentPassword"
      onChange = {onChangePasswordInput}
    />
    <InputField
      placeholder="New password"
      type="password"
      icon="keyboard-o"
      name="password"
      onChange = {onChangePasswordInput}
    />
    <InputField
      placeholder="New password again"
      type="password"
      icon="keyboard-o"
      name="passwordConfirm"
      onChange = {onChangePasswordInput}
    />
    <Button
      className="btn-sm btn-success btn-block"
      label="Change password"
      onClick = {onChangePassword}
    />
  </div>
);

ChangePassword.propTypes = {
  onChangePasswordInput: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired
};
export default ChangePassword;
