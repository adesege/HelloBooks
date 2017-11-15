import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'Modal';
import InputField from 'form/InputField';

const AddStock = ({
  quantity,
  onChange,
  isLoading,
  onSubmit,
  isOpenModal,
  toggleOpenModal
}) => (
  <Modal
    isOpenModal={isOpenModal}
    backdrop="static"
    toggleOpenModal={toggleOpenModal}
    closeOnClick={toggleOpenModal}
    title="Add a stock"
    size="modal-sm"
    btnClass = "btn-success"
    btnLabel= "Add"
    btnDisabled={isLoading}
    btnOnClick={onSubmit}
  >
    <form>
      <InputField
        type="number"
        name="quantity"
        placeholder="Number of copies"
        icon="hashtag"
        value={quantity}
        onChange={onChange}
      />
    </form>
  </Modal>
);

AddStock.propTypes = {
  quantity: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isOpenModal: PropTypes.bool.isRequired,
  toggleOpenModal: PropTypes.func.isRequired
};

export default AddStock;
