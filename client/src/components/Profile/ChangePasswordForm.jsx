import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'form/InputField';
import Modal from 'Modal';

const propTypes = {
  onChangePasswordInput: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  toggleOpenModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  serverErrors: PropTypes.array.isRequired
};

/**
 * Change password component
 *
 * @returns {JSX} JSX
 *
 * @param {object} props - component props
 */
const ChangePassword = ({
  onChangePasswordInput,
  onChangePassword,
  isOpenModal,
  toggleOpenModal,
  isLoading,
  errors,
  serverErrors
}) => (
  <Modal
    isOpenModal={isOpenModal}
    backdrop="static"
    toggleOpenModal={toggleOpenModal}
    title="Change password"
    size="sm"
    btnClass = "btn-success"
    btnLabel= "Change password"
    closeOnClick = {toggleOpenModal}
    btnOnClick={onChangePassword}
    btnDisabled={isLoading}
  >
    <div
      id="changePassword"
      className="mt-4">
      {serverErrors.length !== 0 &&
      <div className="alert alert-danger">{serverErrors}</div>
      }
      <InputField
        placeholder="Current password"
        type="password"
        icon="key"
        name="oldPassword"
        onChange = {onChangePasswordInput}
      />
      {errors.oldPassword && <p className="form-text text-danger">
        {errors.oldPassword}
      </p> }
      <InputField
        placeholder="New password"
        type="password"
        icon="keyboard-o"
        name="password"
        onChange = {onChangePasswordInput}
      />
      {errors.password && <p className="form-text text-danger">
        {errors.password}
      </p> }
      <InputField
        placeholder="New password again"
        type="password"
        icon="keyboard-o"
        name="confirmPassword"
        onChange = {onChangePasswordInput}
      />
      {errors.confirmPassword && <p className="form-text text-danger">
        {errors.confirmPassword}
      </p> }
    </div>
  </Modal>
);

ChangePassword.propTypes = propTypes;

export default ChangePassword;
