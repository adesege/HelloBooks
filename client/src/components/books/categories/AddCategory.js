import React from 'react';
import InputField from '../../form/InputField';
import Modal from '../../modal/Modal';

// const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class AddCategory extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.onClick = this.onClick.bind(this);
  // }
  // onClick(event) {
  //   event.preventDefault();
  //   $('#toggleAdd').click(() => {
  //     $('#addCategory').toggleClass('hidden-xl-down');
  //   });
  // }


  componentDidMount() {
  }

  render() {
    const { onChange, isLoading, onSubmit, name, isEdit } = this.props;
    return (
      <Modal
        modalId="category"
        title={ isEdit ? 'Edit category' : 'Add a category' }
        size="modal-sm"
        btnClass = "btn-success"
        btnLabel= { isEdit ? 'Edit' : 'Add' }
        btnOnClick={ onSubmit }
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

      </Modal>);
  }
}

export default AddCategory;
