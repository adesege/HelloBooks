import React from 'react';
import PropTypes from 'prop-types';
import FlashMessagesList from 'components/FlashMessagesList';
import InputField from 'form/InputField';
import Button from 'form/Button';

const propTypes = {
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

/**
 * Reset password form
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
*/
const ResetPasswordForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <FlashMessagesList />
    <InputField
      type="email"
      label="Email address"
      name="email"
      value={props.user.email}
      onChange={props.onChange}
      icon="envelope"
    />
    {props.errors.email &&
      <p className="form-text text-danger">
        {props.errors.email}
      </p> }

    <Button
      disabled={props.isLoading}
      className="btn-danger btn-block"
      name="ResetPassword"
      label = "Send me the link"
    />
  </form>
);

ResetPasswordForm.propTypes = propTypes;

export default ResetPasswordForm;
