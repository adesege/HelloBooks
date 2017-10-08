import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Document, Page } from 'react-pdf';
import {
  addBook,
  updateBookCover,
  updateBook,
  getBook,
  setBooks
} from '../../../actions/books';
import Modal from '../../modal/Modal';
import Button from '../../form/Button';
import InputField from '../../form/InputField';
import Textarea from '../../form/TextareaField';
import { addFlashMessage } from '../../../actions/flashMessages';
import UploadBookCover from './UploadBookCover';
import { isImage, isPDF } from '../../../utils';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class BooksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      isLoading: false,
      showCoverBook: false,
      imageSrc: '',
      book: {
        id: this.props.book ? this.props.book.id : null,
        title: this.props.book ? this.props.book.title : '',
        description: this.props.book ? this.props.book.description : '',
        book_url: this.props.book ? this.props.book.bookURL : '',
        stock_quantity: '',
        stock_record_date: '',
        isbn: this.props.book ? this.props.book.ISBN : '',
        published_date: this.props.book ? this.props.book.publishedDate : '',
        author: this.props.book ? this.props.book.author : '',
        book_category_id: this.props.book ? this.props.book.bookCategoryId : '',
        coverPhotoPath: this.props.book ? this.props.book.coverPhotoPath : '',
        documentPath: this.props.book ? this.props.book.documentPath : '',
        oldImageURL: this.props.book ? this.props.book.coverPhotoPath : ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onClickOpenBookCover = this.onClickOpenBookCover.bind(this);
    this.onChangeUploadInput = this.onChangeUploadInput.bind(this);
    this.onChangeUploadFile = this.onChangeUploadFile.bind(this);
    this.onClickOk = this.onClickOk.bind(this);
    this.closeOnClick = this.closeOnClick.bind(this);
  }

  closeOnClick(event) {
    event.preventDefault();
    this.setState({ showCoverBook: false });
  }

  closeModal() {
    $('#add-books')
      .find('div button.btn[data-dismiss="modal"]')
      .trigger('click');
  }

  onClickSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });

    if (this.props.params.id) {
      this.props.updateBook(this.state.book)
        .then(
          () => {
            this.setState({ isLoading: false });
            this.closeModal();
          },
          (errors) => {
            const errorMessage =
            typeof errors === 'object' ? errors.response.data : errors;
            this.setState({
              errors: errorMessage,
              isLoading: false
            });
          }
        );
    } else {
      this.props.addBook(this.state.book)
        .then(
          (response) => {
            this.closeModal();
            this.props.addFlashMessage({
              type: 'success',
              text: response.data
            });
          },
          (errors) => {
            const errorMessage =
            typeof errors === 'object' ? errors.response.data : errors;
            this.setState({
              isLoading: false,
              errors: errorMessage
            });
          }
        );
    }
  }

  onClickOpenBookCover(event) {
    event.preventDefault();
    const $parent = $(event.target).parents('span').attr('target');
    const $target = $(`#${$parent}`);
    $target.click();
  }

  onChangeUploadInput(event) {
    const files = $(event.target)[0].files;
    if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

    if (isImage(files[0].type)) { // only image file
      const reader = new FileReader(); // instance of the FileReader
      reader.readAsDataURL(files[0]); // read the local file
      reader.onloadend = (result) => { // set image data as background of div
        this.setState({ showCoverBook: true, imageSrc: result.target.result });
      };
    }
  }

  onChangeUploadFile(event) {
    const files = $(event.target)[0].files;
    if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

    if (isPDF(files[0].type)) { // only image file
      this.setState({ fileData: files[0] });
    }
  }

  onClickOk() {
    this.setState({ showCoverBook: false });
  }

  onChange(e) {
    const { book } = this.state;
    const newBook = {
      ...book,
      [e.target.name]: e.target.value
    };
    this.setState({ book: newBook });
  }

  componentDidMount() {
    $(document).ready(() => {
      const $addBooks = $('#add-books');
      $addBooks.modal('show');

      $addBooks.on('hide.bs.modal', (e) => {
        this.context.router.push('/books');
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id && this.props.book !== nextProps.book) {
      this.setState({
        book: {
          id: nextProps.book.id,
          title: nextProps.book.title,
          description: nextProps.book.description,
          book_url: nextProps.book.bookURL,
          isbn: nextProps.book.ISBN,
          published_date: nextProps.book.publishedDate,
          author: nextProps.book.author,
          book_category_id: nextProps.book.bookCategoryId,
          coverPhotoPath: nextProps.book.coverPhotoPath,
          documentPath: nextProps.book.documentPath
        }
      });
    }
    if (this.props.coverPhotoPath !== nextProps.coverPhotoPath) {
      this.setState({
        book: {
          ...this.state.book,
          coverPhotoPath: nextProps.coverPhotoPath
        }
      });
    }
  }


  render() {
    const { showCoverBook, fileData, errors } = this.state;
    const { coverPhotoPath, id: bookId } = this.state.book;

    const headerOptions = [
      (
        <span
          key="triggerUpload"
          target="triggerUploadInput"
          className="d-inline-flex">
          <InputField
            type="file"
            id="triggerUploadInput"
            name="triggerUploadInput"
            hide={true}
            onChange={this.onChangeUploadInput} />

          <Button
            className="btn-sm btn-default"
            icon="image"
            onClick = {this.onClickOpenBookCover}
          >
            <span className="hidden-xs-down">{coverPhotoPath ? 'Change' : 'Add'} cover</span>
          </Button>
        </span>
      ),
      (<span key="triggerUploadDoc" className="d-inline-flex">
        <InputField
          type="file"
          id="triggerUploadDoc"
          hide={true}
          name="triggerUploadDoc"
          onChange={this.onChangeUploadFile} />

        <Button
          key="triggerUploadDoc"
          className="btn-sm btn-default"
          target="triggerUploadDoc"
          icon="folder"
          onClick = {this.onClickOpenBookCover}
        >
          <span className="hidden-xs-down">{fileData ? 'Change' : 'Add'} file</span>
        </Button>
      </span>
      )
    ];
    return (
      <div>
        <Modal
          modalId="add-books"
          title={ showCoverBook ? 'Upload cover photo' : 'Manage a book' }
          size="modal-lg"
          headerOptions={headerOptions}
          btnClass = "btn-success"
          btnLabel= { showCoverBook ? 'Ok' : 'Submit' }
          closeLabel = { showCoverBook ? 'Cancel' : 'Close' }
          closeOnClick = { showCoverBook ? this.closeOnClick : '' }
          btnOnClick={ showCoverBook ? this.onClickOk : this.onClickSubmit }
          btnDisabled={this.state.isLoading}
        >
          {errors && <div className="alert alert-danger">{errors.message || errors}</div> }

          { showCoverBook ?
            (
              <UploadBookCover
                id="upload-cover"
                imageSrc={this.state.imageSrc} />
            )

            : (
              <div>
                <div className="row" id="addBookForm">
                  <div className="col-sm-9 mdb-form form-sm">
                    <InputField
                      label="Title"
                      name="title"
                      value={this.state.book.title}
                      onChange={this.onChange} />
                  </div>
                  <div className="col-sm-3 mdb-form form-sm">
                    <select
                      className="form-control"
                      name="book_category_id"
                      value={this.state.book.book_category_id}
                      onChange={this.onChange}>
                      <option value="">Please select a category...</option>
                      <option value="1">Category 1</option>
                      <option value="2">Category 2</option>
                      <option value="3">Category 3</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <InputField
                      label="Book author"
                      name="author"
                      value={this.state.book.author}
                      onChange={this.onChange} />
                  </div>
                  { !bookId &&
                  <div className="col-sm-6">
                    <InputField
                      label="Number of copies"
                      name="stock_quantity"
                      value={this.state.book.stock_quantity}
                      onChange={this.onChange} />
                  </div>
                  }
                  { !bookId &&
                  <div className="col-sm-6">
                    <InputField
                      label="Stock date"
                      name="stock_record_date"
                      value={this.state.book.stock_record_date}
                      onChange={this.onChange} />
                  </div>
                  }
                  <div className="col-sm-6">
                    <InputField
                      label="ISBN"
                      name="isbn"
                      value={this.state.book.isbn}
                      onChange={this.onChange} />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Book url"
                      name="book_url"
                      value={this.state.book.book_url}
                      onChange={this.onChange} />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Date published"
                      name="published_date"
                      value={this.state.book.published_date}
                      onChange={this.onChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="mdb-form">
                      <Textarea
                        name="description"
                        placeholder="Description for this book"
                        rows="5"
                        style={{ minHeight: '200px' }}
                        value={this.state.book.description}
                        onChange={this.onChange} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  {coverPhotoPath && <div className="col-sm-5">
                    <img src={coverPhotoPath} alt="Book cover" style={{ width: 'auto', height: '300px' }} />
                  </div>
                  }
                  {fileData && <div className="col-sm-7">
                    <Document
                      file={fileData}
                    >
                      <Page
                        pageNumber={1}
                        width={250}
                      />
                    </Document>
                  </div>
                  }
                </div>
              </div>
            )}
        </Modal>
      </div>
    );
  }
}

BooksModal.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
  if (props.params.id && state.books && state.books) {
    return {
      book: state.books.find(item => item.id === parseInt(props.params.id, 10)),
      coverPhotoPath: state.cropper.coverPhotoPath
    };
  }
  return {
    book: null,
    coverPhotoPath: state.cropper.coverPhotoPath
  };
};

export default connect(mapStateToProps, {
  addFlashMessage,
  addBook,
  updateBookCover,
  updateBook,
  getBook,
  setBooks
})(BooksModal);
