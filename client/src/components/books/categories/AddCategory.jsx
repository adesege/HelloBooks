import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'form/InputField';
import Modal from 'Modal';

const AddCategory = ({
  onChange,
  isLoading,
  onSubmit,
  name,
  isEdit,
  isOpenModal,
  toggleOpenModal
}) => (
  <Modal
    isOpenModal={isOpenModal}
    toggleOpenModal={toggleOpenModal}
    title={isEdit ? 'Edit category' : 'Add a category'}
    size="modal-sm"
    btnClass = "btn-success"
    btnLabel= {isEdit ? 'Edit' : 'Add'}
    btnOnClick={onSubmit}
    btnDisabled={isLoading}
    closeOnClick = {toggleOpenModal}
  >
    <InputField
      type="text"
      placeholder="Name of the category"
      icon="pencil"
      name="name"
      onChange={onChange}
      value={name}
    />

  </Modal>
);

AddCategory.propTypes = {
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  isEdit: PropTypes.bool,
  isOpenModal: PropTypes.bool.isRequired,
  toggleOpenModal: PropTypes.func.isRequired
};
export default AddCategory;
