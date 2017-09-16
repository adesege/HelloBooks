import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../modal/Modal';

/* eslint-disable require-jsdoc, class-methods-use-this */
class DeleteCategory extends React.Component {
  render() {
    const { onDeleteSubmit, isLoading } = this.props;
    return (
      <Modal
        modalId="delete-modal"
        size="modal-lg"
        btnClass = "btn-danger deleteBtn"
        btnLabel= 'Delete'
        btnOnClick={ onDeleteSubmit }
        btnDisabled={isLoading}
        closeLabel="Cancel"
      >
        <span>
  Are you sure you want to delete this category? This action cannot be undone
        </span>
      </Modal>);
  }
}

DeleteCategory.propTypes = {
  onDeleteSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
export default DeleteCategory;
