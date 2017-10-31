import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../modal/Modal';
import { deleteBook } from '../../../actions/books';
import { closeCustomModal } from '../../../assets/js/modal';

const { $ } = window;


/**
 * @class DeleteModal
 * @extends {Component}
 */
class DeleteModal extends Component {
  /**
     * Creates an instance of DeleteModal.
     * @param {any} props
     * @memberof DeleteModal
     */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onClickOk = this.onClickOk.bind(this);
  }


  /**
     * @returns {void}
     * @memberof DeleteModal
     */
  componentDidMount() {
    $(document).ready(() => {
      const $deleteBook = $('#delete-book');
      $deleteBook.modal('show');

      $deleteBook.on('hide.bs.modal', (e) => {
        this.context.router.push('/books');
      });
    });
  }

  /**
     * @returns {void}
     * @param {any} event
     * @memberof DeleteModal
     */
  onClickOk(event) {
    event.preventDefault();
    const {
      book,
      params
    } = this.props;
    this.props.deleteBook({
      id: params.id,
      documentPath: book.documentPath,
      coverPhotoPath: book.coverPhotoPath
    });
    closeCustomModal('#delete-book');
  }


  /**
     *
     * @returns {void}
     * @param {any} event
     * @memberof DeleteModal
     */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  /**
     * @returns {void}
     * @memberof DeleteModal
     */
  render() {
    return (
      <div>
        <Modal
          modalId="delete-book"
          size="modal-lg"
          btnClass = "btn-warning"
          btnLabel= "Delete"
          closeLabel = "Cancel"
          closeClass = "btn-default"
          btnOnClick= {this.onClickOk}
          btnDisabled={this.state.isLoading}
        >
          <span>
            Are you sure you want to delete this book?
            This cannot be undone.
          </span>
        </Modal>
      </div>
    );
  }
}

DeleteModal.propTypes = {
  params: PropTypes.object.isRequired,
  deleteBook: PropTypes.func.isRequired
};

DeleteModal.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  book: state.books
    .find(book =>
      parseInt(book.id, 10) === parseInt(props.params.id, 10))
});

export default connect(mapStateToProps, { deleteBook })(DeleteModal);
