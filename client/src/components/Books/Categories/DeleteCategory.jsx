import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'Modal';

const propTypes = {
  onDeleteSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  toggleOpenModal: PropTypes.func.isRequired
};

/**
 * Renders delete category component
 *
 * @param {object} props
 *
 * @returns {JSX} jsx
 */
const DeleteCategory = ({
  onDeleteSubmit,
  isLoading,
  isOpenModal,
  toggleOpenModal
}) => (
  <Modal
    isOpenModal={isOpenModal}
    toggleOpenModal={toggleOpenModal}
    size="lg"
    btnClass = "btn-danger deleteBtn"
    btnLabel= "Delete"
    btnOnClick={onDeleteSubmit}
    btnDisabled={isLoading}
    closeLabel="Cancel"
    closeOnClick = {toggleOpenModal}
  >
    <span>
      Are you sure you want to delete this category?
      This action cannot be undone
    </span>
  </Modal>);

DeleteCategory.propTypes = propTypes;

export default DeleteCategory;
