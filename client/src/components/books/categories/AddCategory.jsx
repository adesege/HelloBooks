import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../form/InputField';
import Modal from '../../modal/Modal';

const AddCategory = ({
  onChange, isLoading, onSubmit, name, isEdit
}) => (
  <Modal
    modalId="category"
    title={isEdit ? 'Edit category' : 'Add a category'}
    size="modal-sm"
    btnClass = "btn-success"
    btnLabel= {isEdit ? 'Edit' : 'Add'}
    btnOnClick={onSubmit}
    btnDisabled={isLoading}
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
  isEdit: PropTypes.bool
};
export default AddCategory;
