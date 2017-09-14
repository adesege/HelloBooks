import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../modal/Modal';
import { deleteBook } from '../../../actions/books';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onClickOk = this.onClickOk.bind(this);
  }

  closeModal = () => {
    $('#delete-book')
      .find('div button.btn[data-dismiss="modal"]')
      .trigger('click');
  }

  onClickOk(event) {
    event.preventDefault();
    this.props.deleteBook({
      id: this.props.params.id
    }).then(
      () => {

      },
      errors => errors
    );
    this.closeModal();
  }

  componentDidMount() {
    $(document).ready(() => {
      const $deleteBook = $('#delete-book');
      $deleteBook.modal('show');

      $deleteBook.on('hide.bs.modal', (e) => {
        this.context.router.push('/books');
      });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Modal
          modalId="delete-book"
          size="modal-lg"
          btnClass = "btn-warning"
          btnLabel= 'Delete'
          closeLabel = 'Cancel'
          closeClass = 'btn-default'
          btnOnClick= {this.onClickOk}
          btnDisabled={this.state.isLoading}
        >
          <span>Are you sure you want to delete this book? This cannot be undone.</span>
        </Modal>
      </div>
    );
  }
}

DeleteModal.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { deleteBook })(DeleteModal);
