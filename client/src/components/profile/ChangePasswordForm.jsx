import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'form/InputField';
import Modal from 'Modal';

const ChangePassword = ({
  onChangePasswordInput,
  onChangePassword,
  isOpenModal,
  toggleOpenModal,
  isLoading
}) => (
  <Modal
    isOpenModal={isOpenModal}
    backdrop="static"
    toggleOpenModal={toggleOpenModal}
    title="Change password"
    size="lg"
    btnClass = "btn-success"
    btnLabel= "Change password"
    closeOnClick = {toggleOpenModal}
    btnOnClick={onChangePassword}
    btnDisabled={isLoading}
  >
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
    </div>
  </Modal>
);

ChangePassword.propTypes = {
  onChangePasswordInput: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  toggleOpenModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
export default ChangePassword;
