import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../modal/Modal';

const DeleteCategory = ({ onDeleteSubmit, isLoading }) => (

  <Modal
    modalId="delete-modal"
    size="modal-lg"
    btnClass = "btn-danger deleteBtn"
    btnLabel= "Delete"
    btnOnClick={onDeleteSubmit}
    btnDisabled={isLoading}
    closeLabel="Cancel"
  >
    <span>
  Are you sure you want to delete this category?
  This action cannot be undone
    </span>
  </Modal>);

DeleteCategory.propTypes = {
  onDeleteSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
export default DeleteCategory;
