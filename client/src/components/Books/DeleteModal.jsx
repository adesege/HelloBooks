import { deleteBook } from 'actions/books';
import Modal from 'Modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      isLoading: false,
      isOpenModal: false
    };

    this.onChange = this.onChange.bind(this);
    this.onClickOk = this.onClickOk.bind(this);
    this.toggleOpenModal = this.toggleOpenModal.bind(this);
    this.goToBooksPage = this.goToBooksPage.bind(this);
  }


  /**
     * @returns {void}
     * @memberof DeleteModal
     */
  componentDidMount() {
    this.setState({ isOpenModal: true });
  }

  /**
 * @returns {void}
 * @memberof BooksModal
 */
  goToBooksPage() {
    this.context.router.push('/books');
  }

  /**
 * @returns {void}
 * @memberof DeleteModal
 */
  toggleOpenModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
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
    }).then(() => this.setState({ isOpenModal: false }));
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

DeleteModal.propTypes = {
  params: PropTypes.object.isRequired,
  deleteBook: PropTypes.func.isRequired,
  book: PropTypes.object
};

DeleteModal.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  book: state.books.books
    .find(book =>
      parseInt(book.id, 10) === parseInt(props.params.id, 10))
});

export default connect(mapStateToProps, { deleteBook })(DeleteModal);
