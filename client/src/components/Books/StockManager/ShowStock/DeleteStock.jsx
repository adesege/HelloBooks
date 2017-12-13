import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'Modal';

const propTypes = {
  onDeleteSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  toggleOpenDeleteModal: PropTypes.func.isRequired
};

/**
 * Delete stock modal component
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const DeleteStock = ({
  onDeleteSubmit,
  isLoading,
  isOpenModal,
  toggleOpenDeleteModal
}) => (
  <Modal
    isOpenModal={isOpenModal}
    backdrop="static"
    toggleOpenModal={toggleOpenDeleteModal}
    btnClass = "btn-danger deleteBtn"
    btnLabel= "Delete"
    btnOnClick={onDeleteSubmit}
    closeOnClick={toggleOpenDeleteModal}
    btnDisabled={isLoading}
    closeLabel="Cancel"
  >
    <span>
    Are you sure you want to delete this stock? This action cannot be undone
    </span>
  </Modal>);

DeleteStock.propTypes = propTypes;

export default DeleteStock;
