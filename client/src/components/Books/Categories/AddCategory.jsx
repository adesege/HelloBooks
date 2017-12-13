import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'form/InputField';
import Modal from 'Modal';

const propTypes = {
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  category: PropTypes.object.isRequired,
  isEdit: PropTypes.bool,
  isOpenModal: PropTypes.bool.isRequired,
  toggleOpenModal: PropTypes.func.isRequired,
  validationError: PropTypes.object.isRequired
};

/**
 * Renders add category component
 *
 * @param {object} props
 *
 * @returns {JSX} jsx
 */
const AddCategory = (props) => {
  const {
    onChange,
    isLoading,
    onSubmit,
    category,
    isEdit,
    isOpenModal,
    toggleOpenModal,
    validationError
  } = props;
  return (
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
        value={category.name}
      />
      {validationError.name &&
      <p className="form-text text-danger">
        {validationError.name}
      </p>
      }

    </Modal>
  );
};

AddCategory.propTypes = propTypes;

export default AddCategory;
