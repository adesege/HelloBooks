import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Document, Page } from 'react-pdf';
import cloudinary from 'cloudinary';
import {
  saveBooks,
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
import '../../../config/cloudinary';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class BooksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      isLoading: false,
      showCoverBook: false,
      imageSrc: '',
      coverPhotoPath: this.props.book ? this.props.book.coverPhotoPath : '',
      documentPath: this.props.book ? this.props.book.documentPath : '',
      done: false
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

  coverPhotoOptions = () => ({
    crop: 'limit',
    width: 250,
    height: 435,
    eager: [
      { width: 125, height: 218, crop: 'fill', format: 'jpg' }
    ]
  });

  closeModal = () => {
    $('#add-books')
      .find('div button.btn[data-dismiss="modal"]')
      .trigger('click');
  }

  onClickSubmit(event) {
    event.preventDefault();
    const { coverPhotoPath } = this.state;
    delete this.state.imageSrc;
    this.setState({ isLoading: true });

    if (coverPhotoPath) {
      if (this.props.params.id) {
        this.props.updateBook(this.state).then(
          (response) => {
            if (coverPhotoPath.match(/^data:image/)) {
              cloudinary.v2.uploader.upload(
                coverPhotoPath,
                this.coverPhotoOptions(),
                (error, result) => {
                  if (error) {
                    this.setState({ errors: 'There was an error uploading this cover photo' });
                  } else {
                    this.props.updateBookCover({
                      id: this.props.params.id,
                      coverPhotoPath: result.secure_url
                    }).then(
                      () => { },
                      (errors) => {
                        this.setState({ errors: errors.response.data });
                        return false;
                      });
                  }
                });
            }
            this.closeModal();
            this.props.addFlashMessage({
              type: 'success',
              text: response.data
            });
          },
          (errors) => {
            console.log(errors);
            this.setState({ errors: errors.response.data });
          });
        this.setState({ isLoading: false });
      } else {
        this.props.saveBooks(this.state)
          .then(
            (response) => {
              const data = response.data;
              cloudinary.v2.uploader.upload(
                coverPhotoPath,
                this.coverPhotoOptions(),
                (error, result) => {
                  if (error) {
                    this.setState({ errors: 'There was an error uploading this cover photo' });
                  } else {
                    this.props.updateBookCover({
                      id: data.id,
                      coverPhotoPath: result.secure_url
                    }).then(
                      () => {
                        this.props.addBook(data);
                        this.props.addFlashMessage({
                          type: 'success',
                          text: data
                        });

                        this.closeModal();
                      },
                      (errors) => {
                        this.setState({ errors: errors.response.data });
                      });
                  }
                });

              this.setState({
                isLoading: false
              });
            },
            (errors) => {
              this.setState({
                isLoading: false,
                errors: errors.response.data
              });
            });
      }
    } else {
      this.setState({
        isLoading: false,
        errors: 'You must upload a book cover for this book'
      });
    }
  }

  componentDidMount() {
    $(document).ready(() => {
      const $addBooks = $('#add-books');
      $addBooks.modal('show');

      $addBooks.on('hide.bs.modal', (e) => {
        this.context.router.push('/books');
      });
      if (this.props.params.id) {
        this.props.getBook({
          id: this.props.params.id
        }).then(
          (data) => { },
          (errors) => {
            this.props.addFlashMessage({
              type: 'error',
              text: errors.response.data
            });
          });
      }
    });
  }

  onClickOpenBookCover(event) {
    event.preventDefault();
    const $parent = $(event.target).parent().attr('target');
    const $target = $(`#${$parent}`);
    $target.click();
  }

  onChangeUploadInput(event) {
    const files = $(event.target)[0].files;
    if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

    if (/^image/.test(files[0].type)) { // only image file
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

    if (/^application\/pdf/.test(files[0].type)) { // only image file
      this.setState({ fileData: files[0] });
      // $preview.html(files[0].name).addClass('mt-3')
    }
  }

  onClickOk() {
    this.setState({ showCoverBook: false });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id && this.props.book !== nextProps.book) {
      this.setState({
        id: nextProps.book.id,
        title: nextProps.book.title,
        description: nextProps.book.description,
        book_url: nextProps.book.bookURL,
        isbn: nextProps.book.ISBN,
        published_date: nextProps.book.publishedDate,
        author: nextProps.book.author,
        book_category_id: nextProps.book.bookCategoryId,
        coverPhotoPath: nextProps.book.coverPhotoPath,
        documentPath: nextProps.book.documentPath,
      });
    }
    if (this.props.coverPhotoPath !== nextProps.coverPhotoPath) {
      this.setState({ coverPhotoPath: nextProps.coverPhotoPath });
    }
  }


  render() {
    const { showCoverBook, coverPhotoPath, fileData, id: bookId, errors } = this.state;

    const headerOptions = [
      (
        <span key="triggerUpload" className="d-inline-flex">
          <InputField
            type="file"
            id="triggerUploadInput"
            name="triggerUploadInput"
            hide={true}
            onChange={this.onChangeUploadInput} />

          <Button
            className="btn-sm btn-default"
            icon="image"
            target="triggerUploadInput"
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
                      value={this.state.title}
                      onChange={this.onChange} />
                  </div>
                  <div className="col-sm-3 mdb-form form-sm">
                    <select
                      className="form-control"
                      name="book_category_id"
                      value={this.state.book_category_id}
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
                      value={this.state.author}
                      onChange={this.onChange} />
                  </div>
                  { !bookId &&
                  <div className="col-sm-6">
                    <InputField
                      label="Number of copies"
                      name="stock_quantity"
                      value={this.state.stock_quantity}
                      onChange={this.onChange} />
                  </div>
                  }
                  { !bookId &&
                  <div className="col-sm-6">
                    <InputField
                      label="Stock date"
                      name="stock_record_date"
                      value={this.state.stock_record_date}
                      onChange={this.onChange} />
                  </div>
                  }
                  <div className="col-sm-6">
                    <InputField
                      label="ISBN"
                      name="isbn"
                      value={this.state.isbn}
                      onChange={this.onChange} />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Book url"
                      name="book_url"
                      value={this.state.book_url}
                      onChange={this.onChange} />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Date published"
                      name="published_date"
                      value={this.state.published_date}
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
                        value={this.state.description}
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
                        width="250"
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
  if (props.params.id && state.books && state.books.message) {
    return {
      book: state.books.message.find(item => item.id === parseInt(props.params.id, 10)),
      coverPhotoPath: state.cropper.coverPhotoPath
    };
  }
  return {
    book: null,
    coverPhotoPath: state.cropper.coverPhotoPath
  };
};

export default connect(mapStateToProps, {
  saveBooks,
  addFlashMessage,
  addBook,
  updateBookCover,
  updateBook,
  getBook,
  setBooks
})(BooksModal);
