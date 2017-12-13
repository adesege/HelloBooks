import { deleteBook } from 'actions/books';
import Modal from 'Modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  params: PropTypes.object.isRequired,
  deleteBook: PropTypes.func.isRequired,
  book: PropTypes.object
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Delete book modal
 *
 * @class DeleteModal
 *
 * @extends {Component}
 */
class DeleteModal extends Component {
  /**
   * Creates an instance of DeleteModal.
   *
   * @param {object} props
   *
   * @memberof DeleteModal
  */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isOpenModal: false
    };

    this.onChange = this.onChange.bind(this);
    this.onClickOk = this.onClickOk.bind(this);
    this.toggleOpenModal = this.toggleOpenModal.bind(this);
    this.goToBooksPage = this.goToBooksPage.bind(this);
  }


  /**
   * Lifecycle method invoked when component mounts
   * @returns {undefined}
   * @memberof DeleteModal
  */
  componentDidMount() {
    this.setState({ isOpenModal: true });
  }

  /**
   * Go to books page
   *
   * @returns {undefined}
   *
   * @memberof BooksModal
  */
  goToBooksPage() {
    this.context.router.push('/books');
  }

  /**
   * Toggle delete book modal
   *
   * @returns {undefined}
   *
   * @memberof DeleteModal
 */
  toggleOpenModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  }

  /**
   * Delete a book
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
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
    }).then(() => this.setState({ isOpenModal: false }));
  }


  /**
   * Handle form input onChange event and set state according
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   *  @memberof DeleteModal
  */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  /**
   * Renders a component
   *
   * @returns {JSX} JSX
   *
   * @memberof DeleteModal
  */
  render() {
    return (
      <div>
        <Modal
          isOpenModal={this.state.isOpenModal}
          toggleOpenModal={this.toggleOpenModal}
          size="lg"
          btnClass = "btn-danger"
          btnLabel= "Delete"
          closeLabel = "Cancel"
          closeClass = "btn-success"
          closeOnClick = {this.toggleOpenModal}
          onClosed = {this.goToBooksPage}
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

DeleteModal.propTypes = propTypes;

DeleteModal.contextTypes = contextTypes;

/**
 * Get state from store
 *
 * @param {object} state
 * @param {object} props
 *
 * @returns {object} map state to props
 */
const mapStateToProps = (state, props) => ({
  book: state.books.books
    .find(book =>
      parseInt(book.id, 10) === parseInt(props.params.id, 10))
});

export { DeleteModal };

export default connect(mapStateToProps, { deleteBook })(DeleteModal);
