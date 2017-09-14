import React from 'react';
import DateTime from 'react-datetime';
import Modal from '../../modal/Modal';
import '../../../assets/scss/datetime.scss';

/* eslint-disable require-jsdoc, class-methods-use-this */
class BorrowBookModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {

  }
  render() {
    return (
      <Modal
        modalId="borrow-book"
        title='Borrow book'
        size="modal-sm"
        btnClass = "btn-success"
        btnLabel= 'Go'
        closeLabel = 'Cancel'
        btnOnClick={this.onSubmit}
        btnDisabled={this.state.isLoading}
      >
        <form>
          <DateTime timeFormat={false} closeOnSelect={true} inputProps={{ readOnly: true }} />
        </form>
      </Modal>
    );
  }
}

export default BorrowBookModal;
